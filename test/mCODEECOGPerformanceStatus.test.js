const path = require('path');
const { defaultLoadElm, loadJSONFixture, defaultLoadValuesets, mapValueSets, execute } = require('cql-testing-harness');

let executionResults;
beforeAll(() => {
  // Set up necessary data for cql-execution
  const valueSets = defaultLoadValuesets();
  const valueSetMap = mapValueSets(valueSets);
  const elm = defaultLoadElm();

  const patientBundle = loadJSONFixture(path.join(__dirname, './fixtures/patients/Bundle-mCODECQLExample01.json'));

  executionResults = execute(elm, patientBundle, valueSetMap, 'mCODE');
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
