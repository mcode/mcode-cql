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
  const patientBundle = loadJSONFixture(__dirname, './fixtures/patients/mcode-extraction-patient-1.json');

  testSetup = setup('mCodeTNMClinicalStageGroupTest', elm, patientBundle, valueSetMap);
});

test('Test Reference id', () => {
  const expr = testSetup.library.expressions['Test Reference id'];
  const values = expr.exec(testSetup.context);

  expect(values).not.toBeNull();
  expect(values).toBe('a121869e84dc63c7b6e98b6f299e168a9d212048a1c05ddc8ea06ac01427a74e');
});

test('Test is TNM Clinical Stage Group', () => {
  const expr = testSetup.library.expressions['Test is TNM Clinical Stage Group'];
  const values = expr.exec(testSetup.context);

  expect(values).not.toBeNull();
  expect(values).toBe(true);
});

test('Test TNM Clinical Stage Group Categories', () => {
  const expr = testSetup.library.expressions['Test TNM Clinical Stage Group Categories'];
  const values = expr.exec(testSetup.context);

  expect(values).not.toBeNull();
  expect(values.length).toBe(3);
});
