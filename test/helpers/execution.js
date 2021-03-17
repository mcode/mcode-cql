const cql = require('cql-execution');
const { Repository } = require('cql-execution');
const { PatientSource } = require('cql-exec-fhir');

const MAIN_LIB_ID = 'mCODE';

/**
 *
 * @param {String} libraryId main library
 * @param {Array} elmJSONs array of ELM JSON objects
 * @param {Object} patientBundle patient record to execute against
 * @param {Object} valueSetMap valueSetMap for CodeService
 * @param {parameters} execution parameters
 * @returns {Object} test context
 */
function setup(libraryId, elmJSONs, patientBundle, valueSetMap, parameters = {}) {
  const mainELM = elmJSONs.find((e) => e.library.identifier.id === libraryId);

  // Resolve dependencies
  const repository = new Repository(elmJSONs);
  const library = repository.resolve(libraryId, mainELM.library.identifier.version);

  const codeService = new cql.CodeService(valueSetMap);
  const executor = new cql.Executor(library, codeService, parameters);

  // Load array of patient bundles (1 patient for now)
  const patientSource = new PatientSource.FHIRv400();
  patientSource.loadBundles([patientBundle]);

  const testSetup = {};
  testSetup.library = library;
  testSetup.patientSource = patientSource;
  testSetup.context = new cql.PatientContext(
    testSetup.library, patientSource.currentPatient(), codeService, parameters,
  );
  testSetup.executor = executor;

  return testSetup;
}

/**
 *
 * @param {Array} elmJSONs array of ELM JSON objects
 * @param {Object} patientBundle patient record to execute against
 * @param {Object} valueSetMap valueSetMap for CodeService
 * @returns {Object} cql-execution-results
 */
function execute(elmJSONs, patientBundle, valueSetMap, libraryId = MAIN_LIB_ID) {
  // 'main' ELM is the mcode library
  const testSetup = setup(libraryId, elmJSONs, patientBundle, valueSetMap);

  return testSetup.executor.exec(testSetup.patientSource);
}

module.exports = {
  execute, setup,
};
