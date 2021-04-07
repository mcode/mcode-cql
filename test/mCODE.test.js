const path = require('path');
const { loadJSONFromDirectory } = require('../testing-harness/fixtureLoader');
const { mapValueSets } = require('../testing-harness/valueSetMapper');
const { execute } = require('../testing-harness/execution');

let executionResults;
beforeAll(() => {
  // Set up necessary data for cql-execution
  const valueSets = loadJSONFromDirectory(path.resolve(__dirname, '../valuesets'));
  const valueSetMap = mapValueSets(valueSets);
  const elm = loadJSONFromDirectory(path.resolve(__dirname, '../output-elm'));
  const patientBundles = loadJSONFromDirectory(path.resolve(__dirname, './fixtures/patients'));

  executionResults = execute(elm, patientBundles, valueSetMap);
  console.log(executionResults);
});

test('Can identify PrimaryCancerConditions', () => {});

test('Can identify SecondaryCancerConditions', () => {});

test('Can identify CancerDiseaseStatus', () => {});
