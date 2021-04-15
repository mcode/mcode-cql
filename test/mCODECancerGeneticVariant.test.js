const path = require('path');
const { defaultLoadElm, loadJSONFixture, defaultLoadValuesets } = require('../testing-harness/fixtureLoader');
const { mapValueSets } = require('../testing-harness/valueSetMapper');
const { execute, setup } = require('../testing-harness/execution');
// eslint-disable-next-line import/order
const { FunctionRef } = require('cql-execution/lib/elm/expressions');

let executionResults;
let executionTestResults;
let setupResults;
beforeAll(() => {
  // Set up necessary data for cql-execution
  const valueSets = defaultLoadValuesets();
  const valueSetMap = mapValueSets(valueSets);
  const elm = defaultLoadElm();

  const patientBundle = loadJSONFixture(
    path.join(__dirname, './fixtures/patients/Bundle-mCODECancerGeneticVariantExample01.json'),
  );

  executionResults = execute(elm, patientBundle, valueSetMap, 'mCODE');
  executionTestResults = execute(elm, patientBundle, valueSetMap, 'mCODECancerGeneticVariantTest');
  setupResults = setup('mCODE', elm, patientBundle, valueSetMap);
  console.log(executionResults);
});

test('Can identify Cancer Genetic Variants', () => {
  const result = executionResults.patientResults.mCODEPatientExample01['Cancer Genetic Variants'];

  expect(result).not.toBeNull();
  expect(result.length).toBe(1);
});

test('Can identify Gene Studied', () => {
  const functionRef = new FunctionRef({
    type: 'FunctionRef',
    name: 'Cancer Genetic Variant Gene Studied',
    operand: [{ type: 'First', source: { type: 'ExpressionRef', name: 'Cancer Genetic Variants' } }],
  });
  const values = functionRef.exec(setupResults.context);

  expect(values).not.toBeNull();
  expect(values.length).toBe(1);
  expect(values[0].coding[0].code.value).toBe('HGNC:11389');
});

test('Can identify Gene Studied Test', () => {
  const values = executionTestResults.patientResults.mCODEPatientExample01['Test Gene Studied'];

  expect(values).not.toBeNull();
  expect(values.length).toBe(1);
  expect(values[0].coding[0].code.value).toBe('HGNC:11389');
});
