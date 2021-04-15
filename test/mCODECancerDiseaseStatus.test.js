const path = require('path');
const { defaultLoadElm, loadJSONFixture, defaultLoadValuesets } = require('../testing-harness/fixtureLoader');
const { mapValueSets } = require('../testing-harness/valueSetMapper');
const { setup } = require('../testing-harness/execution');

let testSetup;
beforeAll(() => {
  // Set up necessary data for cql-execution
  const valueSets = defaultLoadValuesets();
  const valueSetMap = mapValueSets(valueSets);
  const elm = defaultLoadElm();

  const patientBundle = loadJSONFixture(path.join(__dirname, './fixtures/patients/Bundle-mCODECQLExample01.json'));

  testSetup = setup('mCODECancerDiseaseStatusTest', elm, patientBundle, valueSetMap);
});

test('Can Identify CancerDiseaseStatus', () => {
  const expr = testSetup.library.expressions['Test CancerDiseaseStatus'];
  const values = expr.exec(testSetup.context);
  expect(values.id.value).toBe('mCODECancerDiseaseStatusExample01');
});

test('Can Identify TestCondition', () => {
  const expr = testSetup.library.expressions['Test Condition'];
  const values = expr.exec(testSetup.context);
  expect(values).not.toBeNull();
  expect(values.id.value).toBe('f3be0f34-992b-48fb-ac47-f29b7f1365ef');
});
test('Can identify Test Cancer Disease Status Data Value"', () => {
  const expr = testSetup.library.expressions['Test Cancer Disease Status Data Value'];
  const values = expr.exec(testSetup.context);
  expect(values.coding[0].code.value).toBe('268910001');
});
test('Can identify Test Latest Condition Cancer Disease Status', () => {
  const expr = testSetup.library.expressions['Test Latest Condition Cancer Disease Status'];
  const values = expr.exec(testSetup.context);
  expect(values.id.value).toBe('mCODECancerDiseaseStatusExample01');
});
test('Can identify Test Condition Cancer Disease Status', () => {
  const expr = testSetup.library.expressions['Test Condition Cancer Disease Status'];
  const values = expr.exec(testSetup.context);
  expect(values.length).toBe(2);
});

