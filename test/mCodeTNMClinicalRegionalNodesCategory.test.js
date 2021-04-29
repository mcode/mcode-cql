const path = require('path');
const { defaultLoadElm, loadJSONFixture, defaultLoadValuesets, mapValueSets, execute } = require('cql-testing-harness');

let mCODEExecutionResults;
let executionResults;
beforeAll(() => {
  // Set up necessary data for cql-execution
  const valueSets = defaultLoadValuesets();
  const valueSetMap = mapValueSets(valueSets);
  const elm = defaultLoadElm();

  const patientBundle = loadJSONFixture(path.join(__dirname, './fixtures/patients/mcode-extraction-patient-1.json'));

  mCODEExecutionResults = execute(elm, patientBundle, valueSetMap, 'mCODE');
  executionResults = execute(elm, patientBundle, valueSetMap, 'mCodeTNMClinicalRegionalNodesCategoryTest');
});

const patientId = '123';

test('Test TNM Clinical Regional Nodes Categories', () => {
  const expr = mCODEExecutionResults.patientResults[patientId]['TNM Clinical Regional Nodes Categories'];
  expect(expr).not.toBeNull();
  expect(expr.length).toBe(2);
  expect(expr[0].id.value).toBe('891fbf6bd0bdf928474c239da9bd6a59f042974b3a801c7d8c1ef483ace93f05');
});

test('Test Is TNM Clinical Regional Nodes Category', () => {
  const expr = executionResults.patientResults[patientId]['Test Is TNM Clinical Regional Nodes Category'];
  expect(expr).not.toBeNull();
  expect(expr).toBe(true);
});

test('Test Current TNM Clinical Regional Nodes Categories', () => {
  const expr = executionResults.patientResults[patientId]['Test Current TNM Clinical Regional Nodes Categories'];
  expect(expr).not.toBeNull();
  expect(expr.length).toBe(1);
  expect(expr[0].id.value).toBe('891fbf6bd0bdf928474c239da9bd6a59f042974b3a801c7d8c1ef483ace93f05');
});

test('Test Latest TNM Clinical Regional Nodes Categories', () => {
  const expr = executionResults.patientResults[patientId]['Test Latest TNM Clinical Regional Nodes Categories'];
  expect(expr).not.toBeNull();
  expect(expr.length).toBe(1);
  expect(expr[0].id.value).toBe('891fbf6bd0bdf928474c239da9bd6a59f042974b3a801c7d8c1ef483ace93f05');
});
