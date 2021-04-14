const { loadELM, loadJSONFixture, loadValueSets } = require('../testing-harness/fixtureLoader');
const { mapValueSets } = require('../testing-harness/valueSetMapper');
const { setup } = require('../testing-harness/execution');

let testSetup;
beforeAll(() => {
  // Set up necessary data for cql-execution
  const valueSets = loadValueSets('../valuesets');
  const valueSetMap = mapValueSets(valueSets);
  const elm = loadELM();

  elm.push(loadJSONFixture(__dirname, './fixtures/elm/mCODECancerRelatedRadiationProcedure.test.json'));
  const patientBundle = loadJSONFixture(__dirname, './fixtures/patients/Bundle-mCODECQLExample01.json');

  testSetup = setup('mCODECancerRelatedRadiationProcedureTest', elm, patientBundle, valueSetMap);
});
test('Can Identify CancerRelatedRadiationProcedure', () => {
  const expr = testSetup.library.expressions['Test CancerRelatedRadiationProcedure'];
  const values = expr.exec(testSetup.context);
  expect(values).not.toBeNull();
});
test('Can Identify Cancer Related Radiation Procedure Code', () => {
  const expr = testSetup.library.expressions['Test CancerRelatedRadiationProcedure Code'];
  const values = expr.exec(testSetup.context);
  expect(values.coding[0].code.value).toBe('152198000');
});

test('Can identify Test CancerRelatedRadiationProcedure Treatment Intent', () => {
  const expr = testSetup.library.expressions['Test CancerRelatedRadiationProcedure Treatment Intent'];
  const values = expr.exec(testSetup.context);
  expect(values).not.toBeNull();
  expect(values[0].code.value).toBe('373808002');
});
