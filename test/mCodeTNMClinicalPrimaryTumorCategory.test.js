const path = require('path');
// eslint-disable-next-line object-curly-newline
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
  testSetup = setup('mCodeTNMClinicalPrimaryTumorCategoryTest', elm, patientBundle, valueSetMap);
});

test('Test TNM Clinical Primary Tumor Categories', () => {
  const expr = mCodeTestSetup.library.expressions['TNM Clinical Primary Tumor Categories'];
  const values = expr.exec(mCodeTestSetup.context);

  expect(values).not.toBeNull();
  expect(values.length).toBe(1);
  expect(values[0].id.value).toBe('a121869e84dc63c7b6e98b6f299e168a9d212048a1c05ddc8ea06ac01427a74e');
});

test('Test Is TNM Clinical Primary Tumor Category', () => {
  const expr = testSetup.library.expressions['Test Is TNM Clinical Primary Tumor Category'];
  const values = expr.exec(testSetup.context);

  expect(values).not.toBeNull();
  expect(values).toBe(true);
});

test('Test Current TNM Clinical Primary Tumor Categories', () => {
  const expr = testSetup.library.expressions['Test Current TNM Clinical Primary Tumor Categories'];
  const values = expr.exec(testSetup.context);

  expect(values).not.toBeNull();
  expect(values.length).toBe(1);
  expect(values[0].id.value).toBe('a121869e84dc63c7b6e98b6f299e168a9d212048a1c05ddc8ea06ac01427a74e');
});

test('Test Latest TNM Clinical Primary Tumor Categories', () => {
  const expr = testSetup.library.expressions['Test Latest TNM Clinical Primary Tumor Categories'];
  const values = expr.exec(testSetup.context);

  expect(values).not.toBeNull();
  expect(values.length).toBe(1);
  expect(values[0].id.value).toBe('a121869e84dc63c7b6e98b6f299e168a9d212048a1c05ddc8ea06ac01427a74e');
});

test('Test Earliest TNM Clinical Primary Tumor Categories', () => {
  const expr = testSetup.library.expressions['Test Earliest TNM Clinical Primary Tumor Categories'];
  const values = expr.exec(testSetup.context);

  expect(values).not.toBeNull();
  expect(values.length).toBe(1);
  expect(values[0].id.value).toBe('a121869e84dc63c7b6e98b6f299e168a9d212048a1c05ddc8ea06ac01427a74e');
});
