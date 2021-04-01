const { loadELM, loadJSONFixture, loadValueSets } = require('./helpers/fixtureLoader');
const { mapValueSets } = require('./helpers/valueSetMapper');
const { execute } = require('./helpers/execution');

let executionResults;
let executionTestResults;
beforeAll(() => {
  // Set up necessary data for cql-execution
  const valueSets = loadValueSets();
  const valueSetMap = mapValueSets(valueSets);
  const elm = loadELM();

  elm.push(loadJSONFixture(__dirname, './fixtures/elm/mCodeTNMClinicalPrimaryTumorCategory.test.json'));
  const patientBundle = loadJSONFixture(
    __dirname,
    './fixtures/patients/mcode-extraction-patient-1.json',
  );

  //executionResults = execute(elm, patientBundle, valueSetMap, 'mCODE');
  executionTestResults = execute(elm, patientBundle, valueSetMap, 'mCodeTNMClinicalPrimaryTumorCategoryTest');
  console.log(executionResults);
  console.log(executionTestResults);
});

test('Test TNM Clinical Stage Group Categories', () => {
  //const values = executionTestResults.patientResults['123']['Test TNM Clinical Stage Group Categories'];

  //expect(values).not.toBeNull();
  //expect(values.length).toBe(3);
});
