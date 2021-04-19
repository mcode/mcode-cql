const path = require('path');
const { defaultLoadElm, loadJSONFixture, defaultLoadValuesets } = require('../testing-harness/fixtureLoader');
const { mapValueSets } = require('../testing-harness/valueSetMapper');
const { setup } = require('../testing-harness/execution');
// const { execute } = require('../testing-harness/execution');

let testSetup;
// let executionResults;
beforeAll(() => {
  const valueSets = defaultLoadValuesets();
  const testValueSet = loadJSONFixture(
    path.join(__dirname, './fixtures/valuesets/ValueSet-test-her2-tumor-marker-vs.json'),
  );
  valueSets.push(testValueSet);
  const valueSetMap = mapValueSets(valueSets);
  const elm = defaultLoadElm();

  const patientBundle = loadJSONFixture(path.join(__dirname, './fixtures/patients/Bundle-mCODECQLExample01.json'));

  testSetup = setup('mCODETumorMarkerTest', elm, patientBundle, valueSetMap);
//  executionResults = execute(elm, patientBundle, valueSetMap, 'mCODE');
});
test('Can Identify Tumor Marker Test', () => {
  const expr = testSetup.library.expressions['Test Tumor Marker'];
  const values = expr.exec(testSetup.context);
  expect(values.id.value).toBe('53a6e3e8-fbcd-4cdf-8e8f-28de9ec5d234');
});
test('Can identify Tumor Markers By Value Set', () => {
  const expr = testSetup.library.expressions['Test Tumor Markers By Value Set'];
  const values = expr.exec(testSetup.context);
  expect(values).not.toBeNull();
  expect(values.length).toBe(2);
});
test('Can identify Tumor Marker Code"', () => {
  const expr = testSetup.library.expressions['Test Tumor Marker Code'];
  const values = expr.exec(testSetup.context);
  expect(values).not.toBeNull();
  expect(values.coding[0].code.value).toBe('48676-1');
});
test('Can identify Tumor Marker Value', () => {
  const expr = testSetup.library.expressions['Test Tumor Marker Data Value'];
  const values = expr.exec(testSetup.context);
  expect(values).not.toBeNull();
  expect(values.coding[0].code.value).toBe('260385009');
});
