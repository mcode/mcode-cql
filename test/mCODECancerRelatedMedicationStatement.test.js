const path = require('path');
const { execute, defaultLoadElm, loadJSONFixture, defaultLoadValuesets, mapValueSets } = require('cql-testing-harness');

let executionResults;
beforeAll(() => {
  // Set up necessary data for cql-execution
  const valueSets = defaultLoadValuesets();
  const valueSetMap = mapValueSets(valueSets);
  const elm = defaultLoadElm();

  const patientBundle = loadJSONFixture(path.join(__dirname, './fixtures/patients/Bundle-mCODECQLExample01.json'));

  executionResults = execute(elm, patientBundle, valueSetMap, 'mCODECancerRelatedMedicationStatementTest');
});

const patientId = 'mCODECQLExample01';

test('Can Identify Cancer Related Medication Statement Medication', () => {
  const expr = executionResults.patientResults[patientId]['Test CancerRelatedMedicationStatement Medication'];
  expect(expr.coding[0].code.value).toBe('583214');
});

test('Can identify Test CancerRelatedMedicationStatement Termination Reason', () => {
  const expr = executionResults.patientResults[patientId]['Test CancerRelatedMedicationStatement Termination Reason'];
  expect(expr).not.toBeNull();
  expect(expr[0].code.value).toBe('182992009');
});

test('Can identify Test CancerRelatedMedicationStatement Treatment Intent', () => {
  const expr = executionResults.patientResults[patientId]['Test CancerRelatedMedicationStatement Treatment Intent'];
  expect(expr).not.toBeNull();
  expect(expr[0].code.value).toBe('373808002');
});
