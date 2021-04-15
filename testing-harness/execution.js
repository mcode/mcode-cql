const cql = require('cql-execution');
const { Repository } = require('cql-execution');
const { PatientSource } = require('cql-exec-fhir');

/**
 *
 * @param {String} libraryId main library
 * @param {Array} elmJSONs array of ELM JSON objects
 * @param {Array} patientBundles array of patient records to execute against
 * @param {Object} valueSetMap valueSetMap for CodeService
 * @param {parameters} execution parameters
 * @returns {Object} test context
 */
function setup(libraryID, elmJSONs, patientBundles, valueSetMap, parameters = {}) {
  const mainELM = elmJSONs.find((e) => e.library.identifier.id === libraryID);
  if (!mainELM) {
    throw Error(`Cannot find ELM library with library id ${libraryID}`);
  }
  // Resolve dependencies
  const repository = new Repository(elmJSONs);
  const library = repository.resolve(libraryID, mainELM.library.identifier.version);

  const codeService = new cql.CodeService(valueSetMap);
  const executor = new cql.Executor(library, codeService, parameters);

  // Load array of patient bundles
  const patientSource = new PatientSource.FHIRv400();
  if (!Array.isArray(patientBundles)) {
    patientSource.loadBundles([patientBundles]);
  } else {
    patientSource.loadBundles(patientBundles);
  }

  const testSetup = {};
  testSetup.library = library;
  testSetup.patientSource = patientSource;
  testSetup.context = new cql.PatientContext(
    testSetup.library,
    patientSource.currentPatient(),
    codeService,
    parameters,
  );
  testSetup.executor = executor;

  return testSetup;
}

/**
 *
 * @param {Array} elmJSONs array of ELM JSON objects
 * @param {Object} patientBundles array of patient records to execute against
 * @param {Object} valueSetMap valueSetMap for CodeService
 * @param {String} libraryID the library ID of the cql library corresponding to the ELM
 * @returns {Object} cql-execution-results
 */
function execute(elmJSONs, patientBundles, valueSetMap, libraryID = 'mCODE') {
  // 'main' ELM is the mcode library
  const testSetup = setup(libraryID, elmJSONs, patientBundles, valueSetMap);

  return testSetup.executor.exec(testSetup.patientSource);
}

module.exports = {
  execute,
  setup,
};
