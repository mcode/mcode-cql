const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const { Client } = require('cql-translation-service-client');

// Initialize process.env with either `.env` or a custom file
const envPath = process.argv[2] ? path.resolve(process.cwd(), process.argv[2]) : path.resolve(process.cwd(), '.env');
dotenv.config({ path: envPath });

// Ensure that env variables are defined
if (!(process.env.INPUT_CQL && process.env.OUTPUT_ELM)) {
  throw Error(`Unable to find ENV values for INPUT_CQL or OUTPUT_ELM in ${envPath}`);
}

const cqlPathString = path.resolve(process.cwd(), process.env.INPUT_CQL);
const buildPathString = path.resolve(process.cwd(), process.env.OUTPUT_ELM);

const TRANSLATION_SERVICE_URL = !process.env.TRANSLATION_SERVICE_URL
  ? 'http://localhost:8080/cql/translator'
  : process.env.TRANSLATION_SERVICE_URL;
const client = new Client(TRANSLATION_SERVICE_URL);

/**
 * Translate all cql
 *
 * @returns {Object} ELM from translator, or {} if nothing to translate
 */
async function translateCQL() {
  const cqlPaths = cqlPathString.split(',');
  const cqlFiles = cqlPaths
    .map((p) => path.resolve(p))
    .map((cqlPath) => {
      const fileNames = fs.readdirSync(cqlPath).filter((f) => path.extname(f) === '.cql');
      return fileNames.map((f) => path.join(cqlPath, f));
    })
    .flat();
  const cqlRequestBody = {};
  let includeCQL = false;

  cqlFiles.forEach((cqlFilePath) => {
    // Check if ELM already exists to see if translation is needed
    const correspondingElm = fs
      .readdirSync(buildPathString)
      .find((elmFile) => path.basename(elmFile, '.json') === path.basename(cqlFilePath, '.cql'));

    // If ELM exists in build, compare timestamps
    if (correspondingElm) {
      const cqlStat = fs.statSync(cqlFilePath);
      const elmStat = fs.statSync(path.join(buildPathString, correspondingElm));

      // cql file was modified more recently
      if (cqlStat.mtimeMs > elmStat.mtimeMs) {
        includeCQL = true;
      }
    } else {
      // No ELM file so need to convert
      includeCQL = true;
    }

    cqlRequestBody[path.basename(cqlFilePath, '.cql')] = {
      cql: fs.readFileSync(cqlFilePath, 'utf8'),
    };
  });

  if (includeCQL && Object.keys(cqlRequestBody).length > 0) {
    const elm = await client.convertCQL(cqlRequestBody);
    return elm;
  }

  if (!includeCQL) {
    console.log(`No CQL changes detected: skipping translation for CQL files in ${cqlPaths.join(', ')}`);
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
        const elmPath = path.join(buildPathString, `${libName}.json`);
        fs.writeFileSync(elmPath, JSON.stringify(elm), 'utf8');
        console.log(`Wrote ELM to ${elmPath}`);
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
