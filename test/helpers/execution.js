const cql = require('cql-execution');
const { PatientSource } = require('cql-exec-fhir');

const MAIN_LIB_ID = 'mCODE';

/**
 *
 * @param {Array} elmJSONs array of ELM JSON objects
 * @param {Object} patientBundle patient record to execute against
 * @param {Object} valueSetMap valueSetMap for CodeService
 * @returns {Object} cql-execution-results
 */
function execute(elmJSONs, patientBundle, valueSetMap) {
  // 'main' ELM is the mcode library
  const mainELM = elmJSONs.find((e) => e.library.identifier.id === MAIN_LIB_ID);

  // Resolve dependencies
  const repository = new cql.Repository(elmJSONs);
  const library = repository.resolve(MAIN_LIB_ID, mainELM.library.identifier.version);

  const codeService = new cql.CodeService(valueSetMap);
  const executor = new cql.Executor(library, codeService);

  // Load array of patient bundles (1 patient for now)
  const patientSource = new PatientSource.FHIRv400();
  patientSource.loadBundles([patientBundle]);

  return executor.exec(patientSource);
}

module.exports = {
  execute,
};
