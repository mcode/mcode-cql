const { loadELM, loadJSONFixture, loadValueSets } = require('../testing-harness/fixtureLoader');
const { mapValueSets } = require('../testing-harness/valueSetMapper');
const { execute, setup } = require('../testing-harness/execution');

// eslint-disable-next-line import/order
// const { FunctionRef } = require('cql-execution/lib/elm/expressions');

let executionResults;
let setupResults;
beforeAll(() => {
  // Set up necessary data for cql-execution
  const valueSets = loadValueSets('../valuesets');
  const valueSetMap = mapValueSets(valueSets);
  const elm = loadELM();

  const patientBundle = loadJSONFixture(__dirname, './fixtures/patients/Bundle-mCODECQLExample01.json');

  executionResults = execute(elm, patientBundle, valueSetMap, 'mCODE');
  console.log(executionResults);
});

test('Can Get Karnofsky Performance Status', () => {
  const values = executionResults.patientResults.mCODECQLExample01.KarnofskyPerformanceStatus;
  expect(values).not.toBeNull();
  expect(values.length).toBe(2);
});
test('Can Get Karnofsky Performance Status Data Value', () => {
  const values = executionResults.patientResults.mCODECQLExample01.KarnofskyPerformanceStatus;
  expect(values).not.toBeNull();
});
test('Can Get Most Recent Karnofsky Performance Status Data Value', () => {
  const values = executionResults.patientResults.mCODECQLExample01['Most Recent Karnofsky Performance Status'];
  expect(values).not.toBeNull();
  expect(values.id.value).toBe('mCODEKarnofskyPerformanceStatusExample02');
});
