const path = require('path');
const { defaultLoadElm, loadJSONFixture, defaultLoadValuesets, mapValueSets, execute } = require('cql-testing-harness');

let executionResults;
beforeAll(() => {
  // Set up necessary data for cql-execution
  const valueSets = defaultLoadValuesets();
  const valueSetMap = mapValueSets(valueSets);
  const elm = defaultLoadElm();

  const patientBundle = loadJSONFixture(path.join(__dirname, './fixtures/patients/mcode-extraction-patient-1.json'));

  executionResults = execute(elm, patientBundle, valueSetMap, 'mCodeTNMPathologicalStageGroupTest');
});

const patientId = '123';

test('Test Is TNM Pathological Stage Group', () => {
  const expr = executionResults.patientResults[patientId]['Test Is TNM Pathological Stage Group'];
  expect(expr).not.toBeNull();
  expect(expr).toBe(true);
});

test('Test Is TNM Pathological Stage Group False', () => {
  const expr = executionResults.patientResults[patientId]['Test Is TNM Pathological Stage Group False'];
  expect(expr).not.toBeNull();
  expect(expr).toBe(false);
});

test('Test Current TNM Pathological Stage Groups', () => {
  const expr = executionResults.patientResults[patientId]['Test Current TNM Pathological Stage Groups'];
  expect(expr).not.toBeNull();
  expect(expr.length).toBe(1);
  expect(expr[0].id.value).toBe('mCODETNMPathologicalStageGroupExample01');
});

test('Test Latest TNM Pathological Stage Group', () => {
  const expr = executionResults.patientResults[patientId]['Test Latest TNM Pathological Stage Group'];
  expect(expr).not.toBeNull();
  expect(expr.id.value).toBe('mCODETNMPathologicalStageGroupExample02');
});

test('Test Earliest TNM Pathological Stage Group', () => {
  const expr = executionResults.patientResults[patientId]['Test Earliest TNM Pathological Stage Group'];
  expect(expr).not.toBeNull();
  expect(expr.id.value).toBe('mCODETNMPathologicalStageGroupExample01');
});

test('Test TNM Pathological Stage Group Categories', () => {
  const expr = executionResults.patientResults[patientId]['Test TNM Pathological Stage Group Categories'];
  expect(expr).not.toBeNull();
  expect(expr.length).toBe(3);
  expect(expr[0].id.value).toBe('mCODETNMPathologicalPrimaryTumorCategoryExample01');
});

test('Test TNM Pathological Stage Group Value', () => {
  const expr = executionResults.patientResults[patientId]['Test TNM Pathological Stage Group Value'];
  expect(expr).not.toBeNull();
  expect(expr.coding[0].code.value).toBe('3C');
});

test('Test TNM Pathological Stage Group Staging System', () => {
  const expr = executionResults.patientResults[patientId]['Test TNM Pathological Stage Group Staging System'];
  expect(expr).not.toBeNull();
  expect(expr.coding[0].code.value).toBe('C146985');
});
