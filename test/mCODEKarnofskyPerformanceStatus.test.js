const path = require('path');
// eslint-disable-next-line object-curly-newline
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

test('Can Get Karnofsky Performance Status', () => {
  const values = executionResults.patientResults.mCODECQLExample01.KarnofskyPerformanceStatus;
  expect(values).not.toBeNull();
  expect(values.length).toBe(2);
});

test('Can Get Most Recent Karnofsky Performance Status Data Value', () => {
  const values = executionResults.patientResults.mCODECQLExample01['Most Recent Karnofsky Performance Status'];
  expect(values).not.toBeNull();
  expect(values.id.value).toBe('mCODEKarnofskyPerformanceStatusExample02');
});

test('Can Get Most Recent Karnofsky Performance Status Data Value', () => {
  // eslint-disable-next-line operator-linebreak
  const values =
    executionResults.patientResults.mCODECQLExample01['Most Recent Karnofsky Performance Status Data Value'];
  expect(values).not.toBeNull();
  expect(values.value).toBe(0);
});
