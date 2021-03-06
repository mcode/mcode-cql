const path = require('path');
const { defaultLoadElm, loadJSONFixture, defaultLoadValuesets, mapValueSets, execute } = require('cql-testing-harness');

let executionResults;
beforeAll(() => {
  // Set up necessary data for cql-execution
  const valueSets = defaultLoadValuesets();
  const valueSetMap = mapValueSets(valueSets);
  const elm = defaultLoadElm();

  const patientBundle = loadJSONFixture(path.join(__dirname, './fixtures/patients/mcode-extraction-patient-1.json'));

  executionResults = execute(elm, patientBundle, valueSetMap, 'mCODEPrimaryCancerConditionTest');
});

test('Test Primary Cancer Condition Body Sites', () => {
  const values = executionResults.patientResults['123']['Test Primary Cancer Condition Body Sites'];

  expect(values).not.toBeNull();
  expect(values.length).toBe(1);
  expect(values[0].coding[0].code.value).toBe('251007');
});

test('Test Primary Cancer Condition Body Site Laterality', () => {
  const values = executionResults.patientResults['123']['Test Primary Cancer Condition Body Site Laterality'];

  expect(values).not.toBeNull();
  expect(values.coding[0].code.value).toBe('7771000');
});

test('Test Primary Cancer Condition Clinical Status', () => {
  const values = executionResults.patientResults['123']['Test Primary Cancer Condition Clinical Status'];

  expect(values).not.toBeNull();
  expect(values.coding[0].code.value).toBe('relapse');
});

test('Test Primary Cancer Condition Code', () => {
  const values = executionResults.patientResults['123']['Test Primary Cancer Condition Code'];

  expect(values).not.toBeNull();
  expect(values.coding[0].code.value).toBe('363346000');
});

test('Test Primary Cancer Condition Date of Diagnosis', () => {
  const values = executionResults.patientResults['123']['Test Primary Cancer Condition Date of Diagnosis'];

  expect(values.value).not.toBeNull();

  const foundDate = new Date(values.value);
  const desiredDate = new Date('2020-07-12');

  // Should be on same day, ignoring timestamp
  expect(foundDate.getFullYear()).toEqual(desiredDate.getFullYear());
  expect(foundDate.getMonth()).toEqual(desiredDate.getMonth());
  expect(foundDate.getDate()).toEqual(desiredDate.getDate());
});

test('Test Primary Cancer Condition Histology Morphology Behavior', () => {
  const values = executionResults.patientResults['123']['Test Primary Cancer Condition Histology Morphology Behavior'];

  expect(values).not.toBeNull();
  expect(values.coding[0].code.value).toBe('2424003');
});

test('Test Primary Cancer Condition Verification Status', () => {
  const values = executionResults.patientResults['123']['Test Primary Cancer Condition Verification Status'];

  expect(values).not.toBeNull();
  expect(values.coding[0].code.value).toBe('confirmed');
});
