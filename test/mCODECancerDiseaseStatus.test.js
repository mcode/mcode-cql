const path = require('path');
const { defaultLoadElm, loadJSONFixture, defaultLoadValuesets, mapValueSets, execute } = require('cql-testing-harness');

let executionResults;
beforeAll(() => {
  // Set up necessary data for cql-execution
  const valueSets = defaultLoadValuesets();
  const valueSetMap = mapValueSets(valueSets);
  const elm = defaultLoadElm();

  const patientBundle = loadJSONFixture(path.join(__dirname, './fixtures/patients/Bundle-mCODECQLExample01.json'));

  executionResults = execute(elm, [patientBundle], valueSetMap, 'mCODECancerDiseaseStatusTest');
});

const patientId = 'mCODECQLExample01';

test('Can Identify Cancer Disease Statuses', () => {
  const expr = executionResults.patientResults[patientId]['Test Cancer Disease Statuses'];
  expect(expr.id.value).toBe('mCODECancerDiseaseStatusExample01');
});

test('Can Identify TestCondition', () => {
  const expr = executionResults.patientResults[patientId]['Test Condition'];
  expect(expr).not.toBeNull();
  expect(expr.id.value).toBe('f3be0f34-992b-48fb-ac47-f29b7f1365ef');
});

test('Can identify Test Cancer Disease Status Data Value"', () => {
  const expr = executionResults.patientResults[patientId]['Test Cancer Disease Status Data Value'];
  expect(expr.coding[0].code.value).toBe('268910001');
});

test('Can identify Test Latest Condition Cancer Disease Status', () => {
  const expr = executionResults.patientResults[patientId]['Test Latest Condition Cancer Disease Status'];
  expect(expr.id.value).toBe('mCODECancerDiseaseStatusExample02');
});

test('Can identify Test Condition Cancer Disease Statuses', () => {
  const expr = executionResults.patientResults[patientId]['Test Condition Cancer Disease Statuses'];
  expect(expr.length).toBe(2);
});
