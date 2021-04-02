const { loadJSONFromDirectory } = require('./helpers/fixtureLoader');
const { mapValueSets } = require('./helpers/valueSetMapper');
const { execute } = require('./helpers/execution');

let executionResults;
beforeAll(() => {
  // Set up necessary data for cql-execution
  const valueSets = loadJSONFromDirectory(__dirname, './fixtures/valuesets');
  const valueSetMap = mapValueSets(valueSets);
  const elm = loadJSONFromDirectory(__dirname, '../build');
  const patientBundles = loadJSONFromDirectory(__dirname, './fixtures/patients');

  executionResults = execute(elm, patientBundles, valueSetMap);
  console.log(executionResults);
});

test('Can identify PrimaryCancerConditions', () => {});

test('Can identify SecondaryCancerConditions', () => {});

test('Can identify CancerDiseaseStatus', () => {});
