const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const { Client } = require('cql-translation-service-client');

const cqlPath = process.argv[2] ? path.resolve(process.argv[2]) : path.join(__dirname, '../../cql');
const buildPath = process.argv[3] ? path.resolve(process.argv[3]) : path.join(__dirname, '../../output-elm');
const includeSrc = process.argv[4] ? Boolean(process.argv[4]) : false;

dotenv.config();
const TRANSLATION_SERVICE_URL = !process.env.TRANSLATION_SERVICE_URL
  ? 'http://localhost:8080/cql/translator'
  : process.env.TRANSLATION_SERVICE_URL;
const client = new Client(TRANSLATION_SERVICE_URL);

/**
 * Translate all cql
 *
 * @returns {Object} ELM from translator, or {} if nothing to translate
 */
function loadCQL(pathToLoad) {
  const cqlFiles = fs.readdirSync(pathToLoad).filter((f) => path.extname(f) === '.cql');
  const cqlRequestBody = {};

  cqlFiles.forEach((f) => {
    const cqlFilePath = path.join(pathToLoad, f);

    // Check if ELM already exists to see if translation is needed
    const correspondingElm = fs
      .readdirSync(buildPath)
      .find((elmFile) => path.basename(elmFile, '.json') === path.basename(f, '.cql'));
    let includeCQL = true;

    // If ELM exists in build, compare timestamps
    if (correspondingElm) {
      const cqlStat = fs.statSync(cqlFilePath);
      const elmStat = fs.statSync(path.join(buildPath, correspondingElm));

      // cql file was modified more recently
      includeCQL = cqlStat.mtimeMs > elmStat.mtimeMs;
    }

    if (includeCQL) {
      cqlRequestBody[path.basename(f, '.cql')] = {
        cql: fs.readFileSync(cqlFilePath, 'utf8'),
      };
      console.log(`CQL changes detected: GENERATING translation for ${cqlFilePath}`);
    } else {
      console.log(`No CQL changes detected: skipping translation for ${cqlFilePath}`);
    }
  });

  return cqlRequestBody;
}

/**
 * Translate all cql
 *
 * @returns {Object} ELM from translator, or {} if nothing to translate
 */
async function translateCQL() {
  let cqlRequestBody = loadCQL(cqlPath);
  if (includeSrc) {
    cqlRequestBody = { ...cqlRequestBody, ...loadCQL(path.join(__dirname, '../../cql')) };
  }

  if (Object.keys(cqlRequestBody).length > 0) {
    const elm = await client.convertCQL(cqlRequestBody);
    return elm;
  }

  return {};
}

/**
 * Find any errors found in the ELM annotation
 *
 * @param {Object} elm ELM JSON to look for errors in
 * @returns {Array} annotations with severity error
 */
function processErrors(elm) {
  const errors = [];

  // Check annotations for errors. If no annotations, no errors
  if (elm.library.annotation) {
    elm.library.annotation.forEach((a) => {
      if (a.errorSeverity === 'error') {
        errors.push(a);
      }
    });
  }

  return errors;
}

translateCQL()
  .then((libraries) => {
    Object.entries(libraries).forEach(([libName, elm]) => {
      const errors = processErrors(elm);
      if (errors.length === 0) {
        if (fs.existsSync(path.join(cqlPath, `${libName}.cql`))) {
          const elmPath = path.join(buildPath, `${libName}.json`);
          fs.writeFileSync(elmPath, JSON.stringify(elm), 'utf8');
          console.log(`Wrote ELM to ${elmPath}`);
        }
      } else {
        console.error('Error translating to ELM');
        console.error(errors);
        process.exit(1);
      }
    });
  })
  .catch((e) => {
    console.error(`HTTP error translating CQL: ${e.message}`);
    console.error(e.stack);
    process.exit(1);
  });
