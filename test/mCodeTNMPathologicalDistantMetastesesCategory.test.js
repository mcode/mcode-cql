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
  testSetup = setup('mCodeTNMClinicalDistantMetastasesCategoryTest', elm, patientBundle, valueSetMap);
});

test('Test TNM Clinical Distant Metastases Categories', () => {
  const expr = mCodeTestSetup.library.expressions['TNM Clinical Distant Metastases Categories'];
  const values = expr.exec(mCodeTestSetup.context);

  expect(values).not.toBeNull();
  expect(values.length).toBe(2);
  expect(values[1].id.value).toBe('72f00994860c396a7905153220ad183b16740c840b3719b46bb200c2061864a3-2');
});

test('Test Is TNM Clinical Distant Metastases Category', () => {
  const expr = testSetup.library.expressions['Test Is TNM Clinical Distant Metastases Category'];
  const values = expr.exec(testSetup.context);

  expect(values).not.toBeNull();
  expect(values).toBe(true);
});

test('Test Current TNM Clinical Distant Metastases Categories', () => {
  const expr = testSetup.library.expressions['Test Current TNM Clinical Distant Metastases Categories'];
  const values = expr.exec(testSetup.context);

  expect(values).not.toBeNull();
  expect(values.length).toBe(1);
  expect(values[0].id.value).toBe('72f00994860c396a7905153220ad183b16740c840b3719b46bb200c2061864a3');
});

test('Test Latest TNM Clinical Distant Metastases Categories', () => {
  const expr = testSetup.library.expressions['Test Latest TNM Clinical Distant Metastases Categories'];
  const values = expr.exec(testSetup.context);

  expect(values).not.toBeNull();
  expect(values.length).toBe(1);
  expect(values[0].id.value).toBe('72f00994860c396a7905153220ad183b16740c840b3719b46bb200c2061864a3');
});
