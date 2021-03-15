const cql = require('cql-execution');
const { PatientSource } = require('cql-exec-fhir');

/**
 *
 * @param {Array} elmJSONs array of ELM JSON objects
 * @param {Object} patientBundle patient record to execute against
 * @param {Object} valueSetMap valueSetMap for CodeService
 * @param {Object} libraryID the library ID of the cql library corresponding to the ELM
 * @returns {Object} cql-execution-results
 */
function execute(elmJSONs, patientBundle, valueSetMap, libraryID = 'mCODE') {
  // 'main' ELM is the mcode library
  const mainELM = elmJSONs.find((e) => e.library.identifier.id === libraryID);

  // Resolve dependencies
  const repository = new cql.Repository(elmJSONs);
  const library = repository.resolve(libraryID, mainELM.library.identifier.version);

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
