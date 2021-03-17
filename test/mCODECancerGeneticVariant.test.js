const { loadELM, loadJSONFixture, loadValueSets } = require('./helpers/fixtureLoader');
const { mapValueSets } = require('./helpers/valueSetMapper');
const { execute, setup } = require('./helpers/execution');
// eslint-disable-next-line import/order
const { FunctionRef } = require('cql-execution/lib/elm/expressions');

let executionResults;
let setupResults;
beforeAll(() => {
  // Set up necessary data for cql-execution
  const valueSets = loadValueSets();
  const valueSetMap = mapValueSets(valueSets);
  const elm = loadELM();
  elm.push(loadJSONFixture(__dirname, './fixtures/FHIRHelpers.json'));
  const patientBundle = loadJSONFixture(__dirname, './fixtures/patients/Bundle-mCODECancerGeneticVariantExample01.json');

  executionResults = execute(elm, patientBundle, valueSetMap, 'mCODECancerGeneticVariant');
  setupResults = setup('mCODECancerGeneticVariant', elm, patientBundle, valueSetMap);
  console.log(executionResults);
});

test('Can identify Cancer Genetic Variants', () => {
  const result = executionResults.patientResults.mCODEPatientExample01['Cancer Genetic Variants'];
  // eslint-disable-next-line no-unused-expressions
  expect(result).not.null;
  expect(result.length).toBe(1);
});

test('Can identify Gene Studied', () => {
  const functionRef = new FunctionRef({
    type: 'FunctionRef',
    name: 'Gene Studied',
    operand: [{ type: 'First', source: { type: 'ExpressionRef', name: 'Cancer Genetic Variants' } }],
  });
  const values = functionRef.exec(setupResults.context);
  // eslint-disable-next-line no-unused-expressions
  expect(values).not.null;
  expect(values.length).toBe(1);
  expect(values[0].coding[0].code.value).toBe('HGNC:11389');
});
