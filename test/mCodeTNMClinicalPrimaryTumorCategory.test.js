const { loadELM, loadJSONFixture, loadValueSets } = require('../testing-harness/fixtureLoader');
const { mapValueSets } = require('../testing-harness/valueSetMapper');
const { setup } = require('../testing-harness/execution');

let testSetup;
beforeAll(() => {
  // Set up necessary data for cql-execution
  const valueSets = loadValueSets('../valuesets');
  const valueSetMap = mapValueSets(valueSets);
  const elm = loadELM();

  elm.push(loadJSONFixture(__dirname, './fixtures/elm/mCodeTNMClinicalPrimaryTumorCategory.test.json'));
  const patientBundle = loadJSONFixture(__dirname, './fixtures/patients/mcode-extraction-patient-1.json');

  testSetup = setup('mCodeTNMClinicalPrimaryTumorCategoryTest', elm, patientBundle, valueSetMap);
});

test('Test Is TNM Clinical Primary Tumor Category', () => {
  const expr = testSetup.library.expressions['Test Is TNM Clinical Primary Tumor Category'];
  const values = expr.exec(testSetup.context);

  expect(values).not.toBeNull();
  expect(values).toBe(true);
});

test('Test Latest TNM Clinical Primary Tumor Categories', () => {
  const expr = testSetup.library.expressions['Test Latest TNM Clinical Primary Tumor Categories'];
  const values = expr.exec(testSetup.context);

  expect(values).not.toBeNull();
  expect(values.length).toBe(1);
  expect(values[0].id.value).toBe('a121869e84dc63c7b6e98b6f299e168a9d212048a1c05ddc8ea06ac01427a74e');
});