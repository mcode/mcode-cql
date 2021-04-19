const path = require('path');
const { defaultLoadElm, loadJSONFixture, defaultLoadValuesets } = require('../testing-harness/fixtureLoader');
const { mapValueSets } = require('../testing-harness/valueSetMapper');
const { execute } = require('../testing-harness/execution');
// eslint-disable-next-line import/order
const { Date } = require('cql-execution/lib/datatypes/datetime');

let executionResults;
beforeAll(() => {
  // Set up necessary data for cql-execution
  const valueSets = defaultLoadValuesets();
  const valueSetMap = mapValueSets(valueSets);
  const elm = defaultLoadElm();

  const patientBundle = loadJSONFixture(path.join(__dirname, './fixtures/patients/Bundle-mCODECQLExample01.json'));

  executionResults = execute(elm, patientBundle, valueSetMap, 'mCODE');
});

test('Can identify Patient DOB', () => {
  const values = executionResults.patientResults.mCODECQLExample01['Cancer Patient Date Of Birth'];
  expect(values.value).not.toBeNull();
  expect(values.value.sameAs(Date.parse('1953-01-26'), Date.Unit.DAY)).toBe(true);
});

test('Can identify Patient Birth Sex', () => {
  const values = executionResults.patientResults.mCODECQLExample01['Cancer Patient Birth Sex'];
  expect(values.value).not.toBeNull();
  expect(values.value).toBe('M');
});

test('Can identify Patient Current Addresses', () => {
  const values = executionResults.patientResults.mCODECQLExample01['Cancer Patient Current Addresses'];
  expect(values.length).toBe(2);
  expect(values[0]).not.toBeNull();
  expect(values[0].city.value).toBe('Waltham');
  expect(values[0].state.value).toBe('MA');
  expect(values[0].line[0].value).toBe('551 Goodwin Tunnel Suite 44');
  expect(values[0].postalCode.value).toBe('02452');
});

test('Can identify Patient Race Code', () => {
  const values = executionResults.patientResults.mCODECQLExample01['Cancer Patient Race Codes'];
  expect(values[0]).not.toBeNull();
  expect(values[0].code.value).toBe('2106-3');
  expect(values[0].display.value).toBe('White');
});

test('Can identify Patient Race Text', () => {
  const values = executionResults.patientResults.mCODECQLExample01['Cancer Patient Race Text'];
  expect(values).not.toBeNull();
  expect(values.value).toBe('White');
});

test('Can identify Patient Ethnicity Codes', () => {
  const values = executionResults.patientResults.mCODECQLExample01['Cancer Patient Ethnicity Codes'];
  expect(values[0]).not.toBeNull();
  expect(values[0].code.value).toBe('2186-5');
  expect(values[0].display.value).toBe('Not Hispanic or Latino');
});

test('Can identify Patient Ethnicity Text', () => {
  const values = executionResults.patientResults.mCODECQLExample01['Cancer Patient Ethnicity Text'];
  expect(values).not.toBeNull();
  expect(values.value).toBe('Not Hispanic or Latino');
});
