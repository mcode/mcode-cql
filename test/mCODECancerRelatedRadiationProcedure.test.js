const path = require('path');
// eslint-disable-next-line object-curly-newline
const { defaultLoadElm, loadJSONFixture, defaultLoadValuesets, mapValueSets } = require('cql-testing-harness');
const { setup } = require('./setup');

let testSetup;
beforeAll(() => {
  // Set up necessary data for cql-execution
  const valueSets = defaultLoadValuesets(defaultLoadValuesets);
  const valueSetMap = mapValueSets(valueSets);
  const elm = defaultLoadElm();

  const patientBundle = loadJSONFixture(path.join(__dirname, './fixtures/patients/Bundle-mCODECQLExample01.json'));

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
