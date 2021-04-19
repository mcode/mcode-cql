const dotenv = require('dotenv');
const { defaultLoadElm, defaultLoadPatients, defaultLoadValuesets } = require('../testing-harness/fixtureLoader');
const { mapValueSets } = require('../testing-harness/valueSetMapper');
const { execute } = require('../testing-harness/execution');

// Initialize the env variables
dotenv.config();

let executionResults;
beforeAll(() => {
  // Set up necessary data for cql-execution
  const valueSets = defaultLoadValuesets();
  const valueSetMap = mapValueSets(valueSets);
  const elm = defaultLoadElm();
  const patientBundles = defaultLoadPatients();

  executionResults = execute(elm, patientBundles, valueSetMap);
  // console.log(executionResults);
});

test('Can identify PrimaryCancerConditions', () => {});

test('Can identify SecondaryCancerConditions', () => {});

test('Can identify CancerDiseaseStatus', () => {});
