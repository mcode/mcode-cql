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
  const patientBundle = loadJSONFixture(__dirname, './fixtures/patients/Bundle-mCODECQLExample01.json');

  executionResults = execute(elm, patientBundle, valueSetMap, 'mCODEPrimaryCancerCondition');
  setupResults = setup('mCODEPrimaryCancerCondition', elm, patientBundle, valueSetMap);
  console.log(executionResults);
});

test('Can identify Cancer Condition Code', () => {
  const functionRef = new FunctionRef({
    type: 'FunctionRef',
    name: 'mCODEPrimaryCancerCondition',
    operand: [{ type: 'First', source: { type: 'ExpressionRef', name: 'Cancer Genetic Variants' } }],
  });
  const values = functionRef.exec(setupResults.context);

  expect(values).not.toBeNull();
  expect(values.length).toBe(1);
  expect(values[0].coding[0].code.value).toBe('HGNC:11389');
});
