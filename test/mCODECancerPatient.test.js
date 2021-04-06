const { loadELM, loadJSONFixture, loadValueSets } = require('../testing-harness/fixtureLoader');
const { mapValueSets } = require('../testing-harness/valueSetMapper');
const { execute } = require('../testing-harness/execution');
// eslint-disable-next-line import/order
// const { FunctionRef } = require('cql-execution/lib/elm/expressions');

let executionResults;
beforeAll(() => {
  // Set up necessary data for cql-execution
  const valueSets = loadValueSets('../valuesets');
  const valueSetMap = mapValueSets(valueSets);
  const elm = loadELM();

  const patientBundle = loadJSONFixture(__dirname, './fixtures/patients/Bundle-mCODECQLExample01.json');

  executionResults = execute(elm, patientBundle, valueSetMap, 'mCODE');
  console.log(executionResults);
});

test('Can identify Patient DOB', () => {
  const values = executionResults.patientResults.mCODECQLExample01['Cancer Patient Date Of Birth'];
  expect(values.value).not.toBeNull();
  expect(values.value.year).toBe(1953);
  expect(values.value.month).toBe(1);
  expect(values.value.day).toBe(26);
});
test('Can identify Patient Birth Sex', () => {
  const values = executionResults.patientResults.mCODECQLExample01['Cancer Patient Birth Sex'];
  expect(values.value).not.toBeNull();
  expect(values[0].value).toBe('M');
});
test('Can identify Patient Addresses', () => {
  const values = executionResults.patientResults.mCODECQLExample01['Cancer Patient Current Addresses'];
  expect(values[0]).not.toBeNull();
  expect(values[0].city.value).toBe('Waltham');
  expect(values[0].state.value).toBe('MA');
  expect(values[0].line[0].value).toBe('551 Goodwin Tunnel Suite 44');
  expect(values[0].postalCode.value).toBe('02452');
});
test('Can identify Patient Race', () => {
  const values = executionResults.patientResults.mCODECQLExample01['Cancer Patient Race Codes'];
  expect(values[0]).not.toBeNull();
  expect(values[0].code.value).toBe('2106-3');
  expect(values[0].display.value).toBe('White');
});
test('Can identify Patient Ethnicity', () => {
  const values = executionResults.patientResults.mCODECQLExample01['Cancer Patient Ethnicity Codes'];
  expect(values[0]).not.toBeNull();
  expect(values[0].code.value).toBe('2186-5');
  expect(values[0].display.value).toBe('Not Hispanic or Latino');
});
