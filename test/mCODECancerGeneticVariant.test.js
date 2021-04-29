const path = require('path');
const { defaultLoadElm, loadJSONFixture, defaultLoadValuesets, mapValueSets, execute } = require('cql-testing-harness');

let executionResults;
let mCODEExecutionResults;
beforeAll(() => {
  const valueSets = defaultLoadValuesets();
  const valueSetMap = mapValueSets(valueSets);
  const elm = defaultLoadElm();

  const patientBundle = loadJSONFixture(
    path.join(__dirname, './fixtures/patients/Bundle-mCODECancerGeneticVariantExample01.json'),
  );

  mCODEExecutionResults = execute(elm, [patientBundle], valueSetMap, 'mCODE');
  executionResults = execute(elm, [patientBundle], valueSetMap, 'mCODECancerGeneticVariantTest');
});

const patientId = 'mCODEPatientExample01';

test('Can identify Cancer Genetic Variants', () => {
  const result = mCODEExecutionResults.patientResults[patientId]['Cancer Genetic Variants'];
  expect(result).not.toBeNull();
  expect(result.length).toBe(2);
});

test('Can Filter Genetic Variants', () => {
  const expr = executionResults.patientResults[patientId]['Test Filter Cancer Genetic Variants'];
  expect(expr).not.toBeNull();
  expect(expr.length).toBe(2);
});

test('Can identify Cancer Genetic Variant Gene Studied', () => {
  const expr = executionResults.patientResults[patientId]['Test Cancer Genetic Variant Gene Studied'];
  expect(expr).not.toBeNull();
  expect(expr.length).toBe(1);
  expect(expr[0].coding[0].code.value).toBe('HGNC:11389');
});

test('Can identify Genetic Variant Data Value', () => {
  const expr = executionResults.patientResults[patientId]['Test Genetic Variant Value'];
  expect(expr).not.toBeNull();
  expect(expr.coding[0].code.value).toBe('LA9633-4');
});

test('Can identify Genetic Variant Method', () => {
  const expr = executionResults.patientResults[patientId]['Test Genetic Variant Method'];
  expect(expr).not.toBeNull();
  expect(expr.coding[0].code.value).toBe('LA26398-0');
});
