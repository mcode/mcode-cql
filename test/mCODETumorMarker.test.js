const path = require('path');
const { execute, defaultLoadElm, loadJSONFixture, defaultLoadValuesets, mapValueSets } = require('cql-testing-harness');

let executionResults;
beforeAll(() => {
  const valueSets = defaultLoadValuesets();
  const testValueSet = loadJSONFixture(
    path.join(__dirname, './fixtures/valuesets/ValueSet-test-her2-tumor-marker-vs.json'),
  );
  valueSets.push(testValueSet);
  const valueSetMap = mapValueSets(valueSets);
  const elm = defaultLoadElm();

  const patientBundle = loadJSONFixture(path.join(__dirname, './fixtures/patients/Bundle-mCODECQLExample01.json'));

  executionResults = execute(elm, patientBundle, valueSetMap, 'mCODETumorMarkerTest');
});

const patientId = 'mCODECQLExample01';

test('Can Identify Tumor Marker Test', () => {
  const expr = executionResults.patientResults[patientId]['Test Tumor Marker'];
  expect(expr.id.value).toBe('53a6e3e8-fbcd-4cdf-8e8f-28de9ec5d234');
});

test('Can identify Tumor Markers By Value Set', () => {
  const expr = executionResults.patientResults[patientId]['Test Tumor Markers By Value Set'];
  expect(expr).not.toBeNull();
  expect(expr.length).toBe(2);
});

test('Can identify Tumor Marker Code', () => {
  const expr = executionResults.patientResults[patientId]['Test Tumor Marker Code'];
  expect(expr).not.toBeNull();
  expect(expr.coding[0].code.value).toBe('48676-1');
});

test('Can identify Tumor Marker Value', () => {
  const expr = executionResults.patientResults[patientId]['Test Tumor Marker Data Value'];
  expect(expr).not.toBeNull();
  expect(expr.coding[0].code.value).toBe('260385009');
});
