const { loadELM, loadJSONFixture, loadValueSets } = require('../testing-harness/fixtureLoader');
const { mapValueSets } = require('../testing-harness/valueSetMapper');
const { setup } = require('../testing-harness/execution');

let testSetup;
beforeAll(() => {
  // Set up necessary data for cql-execution
  const valueSets = loadValueSets('../valuesets');
  const valueSetMap = mapValueSets(valueSets);
  const elm = loadELM();

  elm.push(loadJSONFixture(__dirname, './fixtures/elm/mCODECancerRelatedMedicationStatement.test.json'));
  const patientBundle = loadJSONFixture(__dirname, './fixtures/patients/Bundle-mCODECQLExample01.json');

  testSetup = setup('mCODECancerRelatedMedicationStatementTest', elm, patientBundle, valueSetMap);
});

test('Can Identify Cancer Related Medication Statement Medication', () => {
  const expr = testSetup.library.expressions['Test CancerRelatedMedicationStatement Medication'];
  const values = expr.exec(testSetup.context);
  expect(values.coding[0].code.value).toBe('583214');
});
test('Can identify Test CancerRelatedMedicationStatement Termination Reason', () => {
  const expr = testSetup.library.expressions['Test CancerRelatedMedicationStatement Termination Reason'];
  const values = expr.exec(testSetup.context);
  expect(values).not.toBeNull();
  expect(values[0].code.value).toBe('182992009');
});
test('Can identify Test CancerRelatedMedicationStatement Treatment Intent', () => {
  const expr = testSetup.library.expressions['Test CancerRelatedMedicationStatement Treatment Intent'];
  const values = expr.exec(testSetup.context);
  expect(values).not.toBeNull();
  expect(values[0].code.value).toBe('373808002');
});
