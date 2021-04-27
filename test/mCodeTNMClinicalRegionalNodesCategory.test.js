const path = require('path');
const { defaultLoadElm, loadJSONFixture, defaultLoadValuesets, mapValueSets } = require('cql-testing-harness');
const { setup } = require('./setup');

let mCodeTestSetup;
let testSetup;
beforeAll(() => {
  // Set up necessary data for cql-execution
  const valueSets = defaultLoadValuesets();
  const valueSetMap = mapValueSets(valueSets);
  const elm = defaultLoadElm();

  const patientBundle = loadJSONFixture(path.join(__dirname, './fixtures/patients/mcode-extraction-patient-1.json'));

  mCodeTestSetup = setup('mCODE', elm, patientBundle, valueSetMap);
  testSetup = setup('mCodeTNMClinicalRegionalNodesCategoryTest', elm, patientBundle, valueSetMap);
});

test('Test TNM Clinical Regional Nodes Categories', () => {
  const expr = mCodeTestSetup.library.expressions['TNM Clinical Regional Nodes Categories'];
  const values = expr.exec(mCodeTestSetup.context);

  expect(values).not.toBeNull();
  expect(values.length).toBe(2);
  expect(values[0].id.value).toBe('891fbf6bd0bdf928474c239da9bd6a59f042974b3a801c7d8c1ef483ace93f05');
});

test('Test Is TNM Clinical Regional Nodes Category', () => {
  const expr = testSetup.library.expressions['Test Is TNM Clinical Regional Nodes Category'];
  const values = expr.exec(testSetup.context);

  expect(values).not.toBeNull();
  expect(values).toBe(true);
});

test('Test Current TNM Clinical Regional Nodes Categories', () => {
  const expr = testSetup.library.expressions['Test Current TNM Clinical Regional Nodes Categories'];
  const values = expr.exec(testSetup.context);

  expect(values).not.toBeNull();
  expect(values.length).toBe(1);
  expect(values[0].id.value).toBe('891fbf6bd0bdf928474c239da9bd6a59f042974b3a801c7d8c1ef483ace93f05');
});

test('Test Latest TNM Clinical Regional Nodes Categories', () => {
  const expr = testSetup.library.expressions['Test Latest TNM Clinical Regional Nodes Categories'];
  const values = expr.exec(testSetup.context);

  expect(values).not.toBeNull();
  expect(values.length).toBe(1);
  expect(values[0].id.value).toBe('891fbf6bd0bdf928474c239da9bd6a59f042974b3a801c7d8c1ef483ace93f05');
});
