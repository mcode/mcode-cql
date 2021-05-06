const path = require('path');
const { execute, defaultLoadElm, loadJSONFixture, defaultLoadValuesets, mapValueSets } = require('cql-testing-harness');

let executionResults;
beforeAll(() => {
  // Set up necessary data for cql-execution
  const valueSets = defaultLoadValuesets();
  const valueSetMap = mapValueSets(valueSets);
  const elm = defaultLoadElm();

  const patientBundle = loadJSONFixture(path.join(__dirname, './fixtures/patients/Bundle-mCODECQLExample01.json'));

  executionResults = execute(elm, patientBundle, valueSetMap, 'mCODECancerRelatedSurgicalProcedureTest');
});

const patientId = 'mCODECQLExample01';

test('Can Identify CancerRelatedSurgicalProcedure', () => {
  const expr = executionResults.patientResults[patientId]['Test CancerRelatedSurgicalProcedure'];
  expect(expr).not.toBeNull();
});

test('Can Identify CancerRelatedSurgicalProcedure Code', () => {
  const expr = executionResults.patientResults[patientId]['Test CancerRelatedSurgicalProcedure Code'];
  expect(expr.coding[0].code.value).toBe('122548005');
});

test('Can Identify Test CancerRelatedSurgicalProcedure Treatment Intent', () => {
  const expr = executionResults.patientResults[patientId]['Test CancerRelatedSurgicalProcedure Treatment Intent'];
  expect(expr).not.toBeNull();
  expect(expr[0].code.value).toBe('373808002');
});
