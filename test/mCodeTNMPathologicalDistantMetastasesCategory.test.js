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
  executionResults = execute(elm, patientBundle, valueSetMap, 'mCodeTNMClinicalDistantMetastasesCategoryTest');
});

const patientId = '123';

test('Test TNM Clinical Distant Metastases Categories', () => {
  const expr = mCODEExecutionResults.patientResults[patientId]['TNM Clinical Distant Metastases Categories'];

  expect(expr).not.toBeNull();
  expect(expr.length).toBe(2);
  expect(expr[1].id.value).toBe('72f00994860c396a7905153220ad183b16740c840b3719b46bb200c2061864a3-2');
});

test('Test Is TNM Clinical Distant Metastases Category', () => {
  const expr = executionResults.patientResults[patientId]['Test Is TNM Clinical Distant Metastases Category'];

  expect(expr).not.toBeNull();
  expect(expr).toBe(true);
});

test('Test Current TNM Clinical Distant Metastases Categories', () => {
  const expr = executionResults.patientResults[patientId]['Test Current TNM Clinical Distant Metastases Categories'];

  expect(expr).not.toBeNull();
  expect(expr.length).toBe(1);
  expect(expr[0].id.value).toBe('72f00994860c396a7905153220ad183b16740c840b3719b46bb200c2061864a3');
});

test('Test Latest TNM Clinical Distant Metastases Categories', () => {
  const expr = executionResults.patientResults[patientId]['Test Latest TNM Clinical Distant Metastases Categories'];

  expect(expr).not.toBeNull();
  expect(expr.length).toBe(1);
  expect(expr[0].id.value).toBe('72f00994860c396a7905153220ad183b16740c840b3719b46bb200c2061864a3');
});
