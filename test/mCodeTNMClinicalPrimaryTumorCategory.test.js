const path = require('path');
const { execute, defaultLoadElm, loadJSONFixture, defaultLoadValuesets, mapValueSets } = require('cql-testing-harness');

let mCODEExecutionResults;
let executionResults;
beforeAll(() => {
  // Set up necessary data for cql-execution
  const valueSets = defaultLoadValuesets();
  const valueSetMap = mapValueSets(valueSets);
  const elm = defaultLoadElm();

  const patientBundle = loadJSONFixture(path.join(__dirname, './fixtures/patients/mcode-extraction-patient-1.json'));

  mCODEExecutionResults = execute(elm, patientBundle, valueSetMap, 'mCODE');
  executionResults = execute(elm, patientBundle, valueSetMap, 'mCodeTNMClinicalPrimaryTumorCategoryTest');
});

const patientId = '123';

test('Test TNM Clinical Primary Tumor Categories', () => {
  const expr = mCODEExecutionResults.patientResults[patientId]['TNM Clinical Primary Tumor Categories'];

  expect(expr).not.toBeNull();
  expect(expr.length).toBe(1);
  expect(expr[0].id.value).toBe('a121869e84dc63c7b6e98b6f299e168a9d212048a1c05ddc8ea06ac01427a74e');
});

test('Test Is TNM Clinical Primary Tumor Category', () => {
  const expr = executionResults.patientResults[patientId]['Test Is TNM Clinical Primary Tumor Category'];

  expect(expr).not.toBeNull();
  expect(expr).toBe(true);
});

test('Test Current TNM Clinical Primary Tumor Categories', () => {
  const expr = executionResults.patientResults[patientId]['Test Current TNM Clinical Primary Tumor Categories'];

  expect(expr).not.toBeNull();
  expect(expr.length).toBe(1);
  expect(expr[0].id.value).toBe('a121869e84dc63c7b6e98b6f299e168a9d212048a1c05ddc8ea06ac01427a74e');
});

test('Test Latest TNM Clinical Primary Tumor Categories', () => {
  const expr = executionResults.patientResults[patientId]['Test Latest TNM Clinical Primary Tumor Categories'];

  expect(expr).not.toBeNull();
  expect(expr.length).toBe(1);
  expect(expr[0].id.value).toBe('a121869e84dc63c7b6e98b6f299e168a9d212048a1c05ddc8ea06ac01427a74e');
});

test('Test Earliest TNM Clinical Primary Tumor Categories', () => {
  const expr = executionResults.patientResults[patientId]['Test Earliest TNM Clinical Primary Tumor Categories'];

  expect(expr).not.toBeNull();
  expect(expr.length).toBe(1);
  expect(expr[0].id.value).toBe('a121869e84dc63c7b6e98b6f299e168a9d212048a1c05ddc8ea06ac01427a74e');
});
