const path = require('path');
const { defaultLoadElm, loadJSONFixture, defaultLoadValuesets } = require('../testing-harness/fixtureLoader');
const { mapValueSets } = require('../testing-harness/valueSetMapper');
const { setup } = require('../testing-harness/execution');

let mCodeTestSetup;
let testSetup;
beforeAll(() => {
  // Set up necessary data for cql-execution
  const valueSets = defaultLoadValuesets();
  const valueSetMap = mapValueSets(valueSets);
  const elm = defaultLoadElm();

  const patientBundle = loadJSONFixture(path.join(__dirname, './fixtures/patients/mcode-extraction-patient-1.json'));

  mCodeTestSetup = setup('mCODE', elm, patientBundle, valueSetMap);
  testSetup = setup('mCodeTNMPathologicalRegionalNodesCategoryTest', elm, patientBundle, valueSetMap);
});

test('Test TNM Pathological Regional Nodes Categories', () => {
  const expr = mCodeTestSetup.library.expressions['TNM Pathological Regional Nodes Categories'];
  const values = expr.exec(mCodeTestSetup.context);

  expect(values).not.toBeNull();
  expect(values.length).toBe(2);
  expect(values[0].id.value).toBe('mCODETNMPathologicalRegionalNodesCategoryExample01');
});

test('Test Is TNM Pathological Regional Nodes Category', () => {
  const expr = testSetup.library.expressions['Test Is TNM Pathological Regional Nodes Category'];
  const values = expr.exec(testSetup.context);

  expect(values).not.toBeNull();
  expect(values).toBe(true);
});

test('Test Current TNM Pathological Regional Nodes Categories', () => {
  const expr = testSetup.library.expressions['Test Current TNM Pathological Regional Nodes Categories'];
  const values = expr.exec(testSetup.context);

  expect(values).not.toBeNull();
  expect(values.length).toBe(1);
  expect(values[0].id.value).toBe('mCODETNMPathologicalRegionalNodesCategoryExample01');
});

test('Test Latest TNM Pathological Regional Nodes Categories', () => {
  const expr = testSetup.library.expressions['Test Latest TNM Pathological Regional Nodes Categories'];
  const values = expr.exec(testSetup.context);

  expect(values).not.toBeNull();
  expect(values.length).toBe(1);
  expect(values[0].id.value).toBe('mCODETNMPathologicalRegionalNodesCategoryExample02');
});