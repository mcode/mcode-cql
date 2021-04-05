const { loadELM, loadJSONFixture, loadValueSets } = require('./helpers/fixtureLoader');
const { mapValueSets } = require('./helpers/valueSetMapper');
const { setup } = require('./helpers/execution');

let testSetup;
beforeAll(() => {
  // Set up necessary data for cql-execution
  const valueSets = loadValueSets();
  const valueSetMap = mapValueSets(valueSets);
  const elm = loadELM();

  elm.push(loadJSONFixture(__dirname, './fixtures/elm/mCodeTNMClinicalStageGroup.test.json'));
  const patientBundle = loadJSONFixture(
    __dirname,
    './fixtures/patients/mcode-extraction-patient-1.json',
  );

  testSetup = setup('mCodeTNMClinicalStageGroupTest', elm, patientBundle, valueSetMap);
});

test('Test is TNM Clinical Stage Group', () => {
  const executionTestResults = testSetup.executor.exec_expression('Test is TNM Clinical Stage Group', testSetup.patientSource);
  const values = executionTestResults.patientResults['123']['Test is TNM Clinical Stage Group'];

  expect(values).not.toBeNull();
  expect(values).toBe(true);
});

test('Test TNM Clinical Stage Group Categories', () => {
  const executionTestResults = testSetup.executor.exec_expression('Test TNM Clinical Stage Group Categories', testSetup.patientSource);
  const values = executionTestResults.patientResults['123']['Test TNM Clinical Stage Group Categories'];

  expect(values).not.toBeNull();
  expect(values.length).toBe(3);
});
