const fs = require('fs');
const path = require('path');
const { Client } = require('cql-translation-service-client');

const TRANSLATION_SERVICE_URL = 'http://localhost:8080/cql/translator';

const client = new Client(TRANSLATION_SERVICE_URL);

/**
 * Translate all cql
 * @returns {Object} ELM from translator
 */
async function translateCQL() {
  const cqlPath = path.resolve(path.join(__dirname), '../../src');
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

module.exports = {
  translateCQL,
};
