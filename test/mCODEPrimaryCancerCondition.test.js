const { loadELM, loadJSONFixture, loadValueSets } = require('./helpers/fixtureLoader');
const { mapValueSets } = require('./helpers/valueSetMapper');
const { execute } = require('./helpers/execution');

let executionResults;
beforeAll(() => {
  // Set up necessary data for cql-execution
  const valueSets = loadValueSets();
  const valueSetMap = mapValueSets(valueSets);
  const elm = loadELM();

  const patientBundle = loadJSONFixture(__dirname, './fixtures/patients/Bundle-mCODECQLExample01.json');

  executionResults = execute(elm, patientBundle, valueSetMap, 'mCODE');
  console.log(executionResults);
});

test('Can identify PrimaryCancerConditions', () => {});
