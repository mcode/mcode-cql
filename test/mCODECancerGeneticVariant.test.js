const path = require('path');
const { defaultLoadElm, loadJSONFixture, defaultLoadValuesets } = require('../testing-harness/fixtureLoader');
const { mapValueSets } = require('../testing-harness/valueSetMapper');
const { execute, setup } = require('../testing-harness/execution');

let executionResults;
let testSetup;
beforeAll(() => {
  // Set up necessary data for cql-execution
  const valueSets = defaultLoadValuesets();
  const valueSetMap = mapValueSets(valueSets);
  const elm = defaultLoadElm();

  const patientBundle = loadJSONFixture(
    path.join(__dirname, './fixtures/patients/Bundle-mCODECancerGeneticVariantExample01.json'),
  );

  executionResults = execute(elm, patientBundle, valueSetMap, 'mCODE');
  testSetup = setup('mCODECancerGeneticVariantTest', elm, patientBundle, valueSetMap);
  console.log(executionResults);
});

test('Can identify Cancer Genetic Variants', () => {
  const result = executionResults.patientResults.mCODEPatientExample01['Cancer Genetic Variants'];

  expect(result).not.toBeNull();
  expect(result.length).toBe(1);
});

test('Can identify Gene Studied', () => {
  const expr = testSetup.library.expressions['Test Gene Studied'];
  const values = expr.exec(testSetup.context);

  expect(values).not.toBeNull();
  expect(values.length).toBe(1);
  expect(values[0].coding[0].code.value).toBe('HGNC:11389');
});

test('Can Filter Genetic Variants', () => {
  //  const values = executionTestResults.patientResults.mCODEPatientExample01['Test Gene Studied'];
  const expr = testSetup.library.expressions['Test Filter Cancer Genetic Variants'];
  const values = expr.exec(testSetup.context);
  expect(values).not.toBeNull();
  expect(values.length).toBe(1);
});

test('Can identify Genetic Variant Data Value', () => {
  const expr = testSetup.library.expressions['Test Genetic Variant Value'];
  const values = expr.exec(testSetup.context);
  expect(values).not.toBeNull();
  expect(values.coding[0].code.value).toBe('LA9633-4');
});

test('Can identify Genetic Variant Method', () => {
  const expr = testSetup.library.expressions['Test Genetic Variant Method'];
  const values = expr.exec(testSetup.context);
  expect(values).not.toBeNull();
  expect(values.coding[0].code.value).toBe('LA26398-0');
});
