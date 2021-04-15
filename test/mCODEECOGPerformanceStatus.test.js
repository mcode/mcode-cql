const path = require('path');
const { defaultLoadElm, loadJSONFixture, defaultLoadValuesets } = require('../testing-harness/fixtureLoader');
const { mapValueSets } = require('../testing-harness/valueSetMapper');
const { execute } = require('../testing-harness/execution');

// eslint-disable-next-line import/order
// const { FunctionRef } = require('cql-execution/lib/elm/expressions');

let executionResults;
beforeAll(() => {
  // Set up necessary data for cql-execution
  const valueSets = defaultLoadValuesets();
  const valueSetMap = mapValueSets(valueSets);
  const elm = defaultLoadElm();

  const patientBundle = loadJSONFixture(path.join(__dirname, './fixtures/patients/Bundle-mCODECQLExample01.json'));

  executionResults = execute(elm, patientBundle, valueSetMap, 'mCODE');
  console.log(executionResults);
});

test('Can Get ECOG Performance Statuses', () => {
  const values = executionResults.patientResults.mCODECQLExample01.ECOGPerformanceStatus;
  expect(values).not.toBeNull();
  expect(values.length).toBe(2);
});

test('Can Get Most Recent ECOG Performance Status', () => {
  const values = executionResults.patientResults.mCODECQLExample01['Most Recent ECOG Performance Status'];
  expect(values).not.toBeNull();
  expect(values.id.value).toBe('mCODEECOGPerformanceStatusExample02');
});

test('Can Get Most Recent ECOG Performance Status Data Value', () => {
  const values = executionResults.patientResults.mCODECQLExample01['Most Recent ECOG Performance Status Data Value'];
  expect(values).not.toBeNull();
  expect(values.value).toBe(0);
});
