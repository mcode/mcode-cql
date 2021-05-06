const path = require('path');
const { defaultLoadElm, loadJSONFixture, defaultLoadValuesets, mapValueSets, execute } = require('cql-testing-harness');

let executionResults;
let mCODEExecutionResults;
beforeAll(() => {
  // Set up necessary data for cql-execution
  const valueSets = defaultLoadValuesets();
  const valueSetMap = mapValueSets(valueSets);
  const elm = defaultLoadElm();

  const patientBundle = loadJSONFixture(path.join(__dirname, './fixtures/patients/mcode-extraction-patient-1.json'));
  mCODEExecutionResults = execute(elm, patientBundle, valueSetMap, 'mCODE');
  executionResults = execute(elm, patientBundle, valueSetMap, 'mCodeTNMPathologicalPrimaryTumorCategoryTest');
});

const patientId = '123';

test('Test Observation', () => {
  const expr = executionResults.patientResults[patientId]['Test Observation'];
  expect(expr).not.toBeNull();
  expect(expr.id.value).toBe('mCODETNMPathologicalPrimaryTumorCategoryExample01');
});

test('Test TNM Pathological Primary Tumor Categories', () => {
  const expr = mCODEExecutionResults.patientResults[patientId]['TNM Pathological Primary Tumor Categories'];
  expect(expr).not.toBeNull();
  expect(expr.length).toBe(2);
  expect(expr[0].id.value).toBe('mCODETNMPathologicalPrimaryTumorCategoryExample01');
});

test('Test Is TNM Pathological Primary Tumor Category', () => {
  const expr = executionResults.patientResults[patientId]['Test Is TNM Pathological Primary Tumor Category'];
  expect(expr).not.toBeNull();
  expect(expr).toBe(true);
});

test('Test Current TNM Pathological Primary Tumor Categories', () => {
  const expr = executionResults.patientResults[patientId]['Test Current TNM Pathological Primary Tumor Categories'];
  expect(expr).not.toBeNull();
  expect(expr.length).toBe(1);
  expect(expr[0].id.value).toBe('mCODETNMPathologicalPrimaryTumorCategoryExample01');
});

test('Test Latest TNM Pathological Primary Tumor Categories', () => {
  const expr = executionResults.patientResults[patientId]['Test Latest TNM Pathological Primary Tumor Categories'];
  expect(expr).not.toBeNull();
  expect(expr.length).toBe(1);
  expect(expr[0].id.value).toBe('mCODETNMPathologicalPrimaryTumorCategoryExample02');
});

test('Test Earliest TNM Pathological Primary Tumor Categories', () => {
  const expr = executionResults.patientResults[patientId]['Test Earliest TNM Pathological Primary Tumor Categories'];
  expect(expr).not.toBeNull();
  expect(expr.length).toBe(1);
  expect(expr[0].id.value).toBe('mCODETNMPathologicalPrimaryTumorCategoryExample01');
});
