const path = require('path');
const { defaultLoadElm, loadJSONFixture, defaultLoadValuesets, mapValueSets } = require('cql-testing-harness');
const { setup } = require('./setup');

let testSetup;
beforeAll(() => {
  // Set up necessary data for cql-execution
  const valueSets = defaultLoadValuesets();
  const valueSetMap = mapValueSets(valueSets);
  const elm = defaultLoadElm();

  const patientBundle = loadJSONFixture(path.join(__dirname, './fixtures/patients/mcode-extraction-patient-1.json'));

  testSetup = setup('mCodeTNMPathologicalStageGroupTest', elm, patientBundle, valueSetMap);
});

test('Test Is TNM Pathological Stage Group', () => {
  const expr = testSetup.library.expressions['Test Is TNM Pathological Stage Group'];
  const values = expr.exec(testSetup.context);

  expect(values).not.toBeNull();
  expect(values).toBe(true);
});

test('Test Is TNM Pathological Stage Group False', () => {
  const expr = testSetup.library.expressions['Test Is TNM Pathological Stage Group False'];
  const values = expr.exec(testSetup.context);

  expect(values).not.toBeNull();
  expect(values).toBe(false);
});

test('Test Current TNM Pathological Stage Groups', () => {
  const expr = testSetup.library.expressions['Test Current TNM Pathological Stage Groups'];
  const values = expr.exec(testSetup.context);

  expect(values).not.toBeNull();
  expect(values.length).toBe(1);
  expect(values[0].id.value).toBe('mCODETNMPathologicalStageGroupExample01');
});

test('Test Latest TNM Pathological Stage Group', () => {
  const expr = testSetup.library.expressions['Test Latest TNM Pathological Stage Group'];
  const values = expr.exec(testSetup.context);

  expect(values).not.toBeNull();
  expect(values.id.value).toBe('mCODETNMPathologicalStageGroupExample02');
});

test('Test Earliest TNM Pathological Stage Group', () => {
  const expr = testSetup.library.expressions['Test Earliest TNM Pathological Stage Group'];
  const values = expr.exec(testSetup.context);

  expect(values).not.toBeNull();
  expect(values.id.value).toBe('mCODETNMPathologicalStageGroupExample01');
});

test('Test TNM Pathological Stage Group Categories', () => {
  const expr = testSetup.library.expressions['Test TNM Pathological Stage Group Categories'];
  const values = expr.exec(testSetup.context);

  expect(values).not.toBeNull();
  expect(values.length).toBe(3);
  expect(values[0].id.value).toBe('mCODETNMPathologicalPrimaryTumorCategoryExample01');
});

test('Test TNM Pathological Stage Group Value', () => {
  const expr = testSetup.library.expressions['Test TNM Pathological Stage Group Value'];
  const values = expr.exec(testSetup.context);

  expect(values).not.toBeNull();
  expect(values.coding[0].code.value).toBe('3C');
});

test('Test TNM Pathological Stage Group Staging System', () => {
  const expr = testSetup.library.expressions['Test TNM Pathological Stage Group Staging System'];
  const values = expr.exec(testSetup.context);

  expect(values).not.toBeNull();
  expect(values.coding[0].code.value).toBe('C146985');
});
