const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const { Client } = require('cql-translation-service-client');

dotenv.config();
const TRANSLATION_SERVICE_URL = !process.env.TRANSLATION_SERVICE_URL
  ? 'http://localhost:8080/cql/translator'
  : process.env.TRANSLATION_SERVICE_URL;
const client = new Client(TRANSLATION_SERVICE_URL);

const cqlPath = process.argv[2] ? path.resolve(process.argv[2]) : path.join(__dirname, '../src');
const buildPath = process.argv[3] ? path.resolve(process.argv[3]) : path.join(__dirname, '../build');

/**
 * Translate all cql
 *
 * @returns {Object} ELM from translator
 */
async function translateCQL() {
  const cqlFiles = fs.readdirSync(cqlPath).filter((f) => path.extname(f) === '.cql');
  const cqlRequestBody = {};

  cqlFiles.forEach((f) => {
    cqlRequestBody[path.basename(f, '.cql')] = {
      cql: fs.readFileSync(path.join(cqlPath, f), 'utf8'),
    };
  });

  const elm = await client.convertCQL(cqlRequestBody);
  return elm;
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
        const elmPath = path.join(buildPath, `${libName}.json`);
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
