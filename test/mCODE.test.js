const dotenv = require('dotenv');
const {
  defaultLoadElm,
  defaultLoadPatients,
  defaultLoadValuesets,
  mapValueSets,
  execute,
} = require('cql-testing-harness');

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
});

test('Can identify PrimaryCancerConditions', () => {});

test('Can identify SecondaryCancerConditions', () => {});

test('Can identify CancerDiseaseStatus', () => {});
