const { loadELM, loadJSONFixture, loadValueSets } = require('../testing-harness/fixtureLoader');
const { mapValueSets } = require('../testing-harness/valueSetMapper');
const { setup } = require('../testing-harness/execution');

let testSetup;
beforeAll(() => {
  // Set up necessary data for cql-execution
  const valueSets = loadValueSets('../valuesets');
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

test('Test Is TNM Clinical Stage Group', () => {
  const expr = testSetup.library.expressions['Test Is TNM Clinical Stage Group'];
  const values = expr.exec(testSetup.context);

  expect(values).not.toBeNull();
  expect(values).toBe(true);
});

test.todo('Test Is TNM Clinical Stage Group False');

test('Test Current TNM Clinical Stage Groups', () => {
  const expr = testSetup.library.expressions['Test Current TNM Clinical Stage Groups'];
  const values = expr.exec(testSetup.context);

  expect(values).not.toBeNull();
  expect(values.length).toBe(1);
  expect(values[0].id.value).toBe('d07680cd7040d712e15f332ffa5d6523843b65dc55ca72b215225252fed7335f');
});

test('Test Latest TNM Clinical Stage Group', () => {
  const expr = testSetup.library.expressions['Test Latest TNM Clinical Stage Group'];
  const values = expr.exec(testSetup.context);

  expect(values).not.toBeNull();
  expect(values.id.value).toBe('d07680cd7040d712e15f332ffa5d6523843b65dc55ca72b215225252fed7335f');
});

test('Test TNM Clinical Stage Group Categories', () => {
  const expr = testSetup.library.expressions['Test TNM Clinical Stage Group Categories'];
  const values = expr.exec(testSetup.context);

  expect(values).not.toBeNull();
  expect(values.length).toBe(3);
  expect(values[0].id.value).toBe('a121869e84dc63c7b6e98b6f299e168a9d212048a1c05ddc8ea06ac01427a74e');
});
