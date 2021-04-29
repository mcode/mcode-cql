const path = require('path');
const { execute, defaultLoadElm, loadJSONFixture, defaultLoadValuesets, mapValueSets } = require('cql-testing-harness');

let executionResults;
beforeAll(() => {
  // Set up necessary data for cql-execution
  const valueSets = defaultLoadValuesets();
  const valueSetMap = mapValueSets(valueSets);
  const elm = defaultLoadElm();

  const patientBundle = loadJSONFixture(path.join(__dirname, './fixtures/patients/mcode-extraction-patient-1.json'));

  executionResults = execute(elm, patientBundle, valueSetMap, 'mCodeTNMClinicalStageGroupTest');
});

const patientId = '123';

test('Test Reference id', () => {
  const expr = executionResults.patientResults[patientId]['Test Reference id'];

  expect(expr).not.toBeNull();
  expect(expr).toBe('a121869e84dc63c7b6e98b6f299e168a9d212048a1c05ddc8ea06ac01427a74e');
});

test('Test Is TNM Clinical Stage Group', () => {
  const expr = executionResults.patientResults[patientId]['Test Is TNM Clinical Stage Group'];

  expect(expr).not.toBeNull();
  expect(expr).toBe(true);
});

test('Test Is TNM Clinical Stage Group False', () => {
  const expr = executionResults.patientResults[patientId]['Test Is TNM Clinical Stage Group False'];

  expect(expr).not.toBeNull();
  expect(expr).toBe(false);
});

test('Test Current TNM Clinical Stage Groups', () => {
  const expr = executionResults.patientResults[patientId]['Test Current TNM Clinical Stage Groups'];

  expect(expr).not.toBeNull();
  expect(expr.length).toBe(1);
  expect(expr[0].id.value).toBe('d07680cd7040d712e15f332ffa5d6523843b65dc55ca72b215225252fed7335f');
});

test('Test Latest TNM Clinical Stage Group', () => {
  const expr = executionResults.patientResults[patientId]['Test Latest TNM Clinical Stage Group'];

  expect(expr).not.toBeNull();
  expect(expr.id.value).toBe('d07680cd7040d712e15f332ffa5d6523843b65dc55ca72b215225252fed7335f-2');
});

test('Test Earliest TNM Clinical Stage Group', () => {
  const expr = executionResults.patientResults[patientId]['Test Earliest TNM Clinical Stage Group'];

  expect(expr).not.toBeNull();
  expect(expr.id.value).toBe('earliest-cancer-stage-group');
});

test('Test TNM Clinical Stage Group Categories', () => {
  const expr = executionResults.patientResults[patientId]['Test TNM Clinical Stage Group Categories'];

  expect(expr).not.toBeNull();
  expect(expr.length).toBe(3);
  expect(expr[0].id.value).toBe('a121869e84dc63c7b6e98b6f299e168a9d212048a1c05ddc8ea06ac01427a74e');
});

test('Test TNM Clinical Stage Group Value', () => {
  const expr = executionResults.patientResults[patientId]['Test TNM Clinical Stage Group Value'];

  expect(expr).not.toBeNull();
  expect(expr.coding[0].code.value).toBe('3C');
});

test('Test TNM Clinical Stage Group Staging System', () => {
  const expr = executionResults.patientResults[patientId]['Test TNM Clinical Stage Group Staging System'];

  expect(expr).not.toBeNull();
  expect(expr.coding[0].code.value).toBe('C146985');
});
