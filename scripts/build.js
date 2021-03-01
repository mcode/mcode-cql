const fs = require('fs');
const path = require('path');
const { Client } = require('cql-translation-service-client');

const TRANSLATION_SERVICE_URL = 'http://localhost:8080/cql/translator';

const client = new Client(TRANSLATION_SERVICE_URL);

/**
 * Translate all cql
 *
 * @returns {Object} ELM from translator
 */
async function translateCQL() {
  const cqlPath = path.resolve(path.join(__dirname), '../src');
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
    const buildPath = path.join(__dirname, '../build');
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
