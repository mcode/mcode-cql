const path = require('path');
const { execute, defaultLoadElm, loadJSONFixture, defaultLoadValuesets, mapValueSets } = require('cql-testing-harness');

let executionResults;
beforeAll(() => {
  // Set up necessary data for cql-execution
  const valueSets = defaultLoadValuesets(defaultLoadValuesets);
  const valueSetMap = mapValueSets(valueSets);
  const elm = defaultLoadElm();

  const patientBundle = loadJSONFixture(path.join(__dirname, './fixtures/patients/Bundle-mCODECQLExample01.json'));

  executionResults = execute(elm, patientBundle, valueSetMap, 'mCODECancerRelatedRadiationProcedureTest');
});

const patientId = 'mCODECQLExample01';

test('Can Identify CancerRelatedRadiationProcedure', () => {
  const expr = executionResults.patientResults[patientId]['Test CancerRelatedRadiationProcedure'];
  expect(expr.values).not.toBeNull();
});
test('Can Identify Cancer Related Radiation Procedure Code', () => {
  const expr = executionResults.patientResults[patientId]['Test CancerRelatedRadiationProcedure Code'];
  expect(expr.coding[0].code.value).toBe('152198000');
});

test('Can identify Test CancerRelatedRadiationProcedure Treatment Intent', () => {
  const expr = executionResults.patientResults[patientId]['Test CancerRelatedRadiationProcedure Treatment Intent'];
  expect(expr).not.toBeNull();
  expect(expr[0].code.value).toBe('373808002');
});
