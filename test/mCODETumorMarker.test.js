const { loadELM, loadJSONFixture, loadValueSets } = require('../testing-harness/fixtureLoader');
const { mapValueSets } = require('../testing-harness/valueSetMapper');
const { execute } = require('../testing-harness/execution');
// eslint-disable-next-line import/order
// const { FunctionRef } = require('cql-execution/lib/elm/expressions');

let executionResults;
// let executionTestResults;
// let setupResults;
beforeAll(() => {
  // Set up necessary data for cql-execution
  const valueSets = loadValueSets('../valuesets');
  const valueSetMap = mapValueSets(valueSets);
  const elm = loadELM();

  elm.push(loadJSONFixture(__dirname, './fixtures/elm/mCODETumorMarker.test.json'));
  const patientBundle = loadJSONFixture(
    __dirname, './fixtures/patients/Bundle-mCODECQLExample01.json',
  );

  executionResults = execute(elm, patientBundle, valueSetMap, 'mCODE');
  // executionTestResults = execute(elm, patientBundle, valueSetMap, 'mCODETumorMarkerTest');
  // setupResults = setup('mCODE', elm, patientBundle, valueSetMap);
  console.log(executionResults);
});

test('Can identify Tumor Markers By Value Set', () => {
  const result = executionResults.patientResults.mCODEPatientExample01['Test Tumor Markers By Value Set'];
  expect(result).not.toBeNull();
  expect(result.length).toBe(1);
});
test('Can identify Tumor Marker Code"', () => {
  const result = executionResults.patientResults.mCODEPatientExample01['Test Tumor Marker Code'];
  expect(result).not.toBeNull();
});
test('Can identify Tumor Marker Value', () => {
  const result = executionResults.patientResults.mCODEPatientExample01['Test Tumor Marker Value'];
  expect(result).not.toBeNull();
});
