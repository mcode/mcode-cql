const { loadELM, loadJSONFixture, loadValueSets } = require('../testing-harness/fixtureLoader');
const { mapValueSets } = require('../testing-harness/valueSetMapper');
const { execute } = require('../testing-harness/execution');

let executionResults;
beforeAll(() => {
  // Set up necessary data for cql-execution
  const valueSets = loadValueSets('../valuesets');
  const valueSetMap = mapValueSets(valueSets);
  const elm = loadELM();
  const patientBundle = loadJSONFixture(__dirname, './fixtures/mcode-extraction-patient-1.json');

  executionResults = execute(elm, patientBundle, valueSetMap);
  console.log(executionResults);
});

test('Can identify PrimaryCancerConditions', () => { });

test('Can identify SecondaryCancerConditions', () => { });

test('Can identify CancerDiseaseStatus', () => { });
