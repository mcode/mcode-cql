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
  executionResults = execute(elm, patientBundle, valueSetMap, 'mCodeTNMPathologicalRegionalNodesCategoryTest');
});

const patientId = '123';

test('Test TNM Pathological Regional Nodes Categories', () => {
  const expr = mCODEExecutionResults.patientResults[patientId]['TNM Pathological Regional Nodes Categories'];

  expect(expr).not.toBeNull();
  expect(expr.length).toBe(2);
  expect(expr[0].id.value).toBe('mCODETNMPathologicalRegionalNodesCategoryExample01');
});

test('Test Is TNM Pathological Regional Nodes Category', () => {
  const expr = executionResults.patientResults[patientId]['Test Is TNM Pathological Regional Nodes Category'];

  expect(expr).not.toBeNull();
  expect(expr).toBe(true);
});

test('Test Current TNM Pathological Regional Nodes Categories', () => {
  const expr = executionResults.patientResults[patientId]['Test Current TNM Pathological Regional Nodes Categories'];

  expect(expr).not.toBeNull();
  expect(expr.length).toBe(1);
  expect(expr[0].id.value).toBe('mCODETNMPathologicalRegionalNodesCategoryExample01');
});

test('Test Latest TNM Pathological Regional Nodes Categories', () => {
  const expr = executionResults.patientResults[patientId]['Test Latest TNM Pathological Regional Nodes Categories'];

  expect(expr).not.toBeNull();
  expect(expr.length).toBe(1);
  expect(expr[0].id.value).toBe('mCODETNMPathologicalRegionalNodesCategoryExample02');
});
