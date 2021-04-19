const path = require('path');
const { defaultLoadElm, loadJSONFixture, defaultLoadValuesets } = require('../testing-harness/fixtureLoader');
const { mapValueSets } = require('../testing-harness/valueSetMapper');
const { setup } = require('../testing-harness/execution');

let testSetup;
beforeAll(() => {
  // Set up necessary data for cql-execution
  const valueSets = defaultLoadValuesets();
  const valueSetMap = mapValueSets(valueSets);
  const elm = defaultLoadElm();

  const patientBundle = loadJSONFixture(path.join(__dirname, './fixtures/patients/mcode-extraction-patient-1.json'));
  mCodeTestSetup = setup('mCODE', elm, patientBundle, valueSetMap);
  testSetup = setup('mCodeTNMPathologicalPrimaryTumorCategoryTest', elm, patientBundle, valueSetMap);
});

test('Test Observation', () => {
  const expr = testSetup.library.expressions['Test Observation'];
  const values = expr.exec(testSetup.context);
  console.log(values);
  expect(values).not.toBeNull();
  expect(values.id.value).toBe('mCODETNMPathologicalPrimaryTumorCategoryExample01');
});

test('Test TNM Pathological Primary Tumor Categories', () => {
  const expr = mCodeTestSetup.library.expressions['TNM Pathological Primary Tumor Categories'];
  const values = expr.exec(mCodeTestSetup.context);

  expect(values).not.toBeNull();
  expect(values.length).toBe(2);
  expect(values[0].id.value).toBe('mCODETNMPathologicalPrimaryTumorCategoryExample01');
});

test('Test Is TNM Pathological Primary Tumor Category', () => {
  const expr = testSetup.library.expressions['Test Is TNM Pathological Primary Tumor Category'];
  const values = expr.exec(testSetup.context);

  expect(values).not.toBeNull();
  expect(values).toBe(true);
});

test('Test Current TNM Pathological Primary Tumor Categories', () => {
  const expr = testSetup.library.expressions['Test Current TNM Pathological Primary Tumor Categories'];
  const values = expr.exec(testSetup.context);

  expect(values).not.toBeNull();
  expect(values.length).toBe(1);
  expect(values[0].id.value).toBe('mCODETNMPathologicalPrimaryTumorCategoryExample01');
});

test('Test Latest TNM Pathological Primary Tumor Categories', () => {
  const expr = testSetup.library.expressions['Test Latest TNM Pathological Primary Tumor Categories'];
  const values = expr.exec(testSetup.context);

  expect(values).not.toBeNull();
  expect(values.length).toBe(1);
  expect(values[0].id.value).toBe('mCODETNMPathologicalPrimaryTumorCategoryExample02');
});

test('Test Earliest TNM Pathological Primary Tumor Categories', () => {
  const expr = testSetup.library.expressions['Test Earliest TNM Pathological Primary Tumor Categories'];
  const values = expr.exec(testSetup.context);

  expect(values).not.toBeNull();
  expect(values.length).toBe(1);
  expect(values[0].id.value).toBe('mCODETNMPathologicalPrimaryTumorCategoryExample01');
});
