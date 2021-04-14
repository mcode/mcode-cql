const { loadELM, loadJSONFixture, loadValueSets } = require('../testing-harness/fixtureLoader');
const { mapValueSets } = require('../testing-harness/valueSetMapper');
const { setup } = require('../testing-harness/execution');

let testSetup;
beforeAll(() => {
  // Set up necessary data for cql-execution
  const valueSets = loadValueSets('../valuesets');
  const valueSetMap = mapValueSets(valueSets);
  const elm = loadELM();

  elm.push(loadJSONFixture(__dirname, './fixtures/elm/mCODECancerRelatedSurgicalProcedure.test.json'));
  const patientBundle = loadJSONFixture(__dirname, './fixtures/patients/Bundle-mCODECQLExample01.json');

  testSetup = setup('mCODECancerRelatedSurgicalProcedureTest', elm, patientBundle, valueSetMap);
});

test('Can Identify CancerRelatedSurgicalProcedure', () => {
  const expr = testSetup.library.expressions['Test CancerRelatedSurgicalProcedure'];
  const values = expr.exec(testSetup.context);
  expect(values).not.toBeNull();
});
test('Can Identify CancerRelatedSurgicalProcedure Procedure', () => {
  const expr = testSetup.library.expressions['Test CancerRelatedSurgicalProcedure Procedure'];
  const values = expr.exec(testSetup.context);
  expect(values.coding[0].code.value).toBe('122548005');
});

test('Can Identify Test CancerRelatedSurgicalProcedure Treatment Intent', () => {
  const expr = testSetup.library.expressions['Test CancerRelatedSurgicalProcedure Treatment Intent'];
  const values = expr.exec(testSetup.context);
  expect(values).not.toBeNull();
  expect(values[0].code.value).toBe('373808002');
});
