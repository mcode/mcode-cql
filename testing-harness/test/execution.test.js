const path = require('path');
const { execute } = require('../execution');
const { mapValueSets } = require('../valueSetMapper');
const { loadJSONFixture, loadJSONFromDirectory } = require('../fixtureLoader');

let valueSetMap;
let elm;
let patientBundle;

beforeAll(() => {
  // Set up necessary data for cql-execution
  valueSetMap = {
    SteamVS: {
      1: [
        {
          code: 'example-code',
          system: 'www.example.com',
        },
      ],
    },
  };
  elm = loadJSONFixture(path.resolve(__dirname, 'fixtures/elm/testLib.json'));
  patientBundle = loadJSONFixture(path.resolve(__dirname, './fixtures/patients/test-patient-1.json'));
});

test('Should properly match on resources in execution', () => {
  const expectedCondition = patientBundle.entry[0].resource;
  const executionResults = execute([elm], patientBundle, valueSetMap, 'testLib');
  const patientID = '123';

  expect(executionResults.patientResults[patientID].Condition).toHaveLength(1);
  expect(executionResults.patientResults[patientID].Condition[0]._json).toEqual(expectedCondition);
});

test('Should exclude resources with values outside of the valueSet Map during execution', () => {
  // Changing the expected code within the valueSetMap to a code not included in the patient bundle
  const alteredVSMap = {
    SteamVS: {
      1: [
        {
          code: 'second-example-code',
          system: 'www.example.com',
        },
      ],
    },
  };
  const executionResults = execute([elm], patientBundle, alteredVSMap, 'testLib');
  const patientID = '123';

  // There should be no matching Condition resources within the execution results
  expect(executionResults.patientResults[patientID].Condition).toHaveLength(0);
});

test('Should properly load patient resource from bundle', () => {
  const executionResults = execute([elm], patientBundle, valueSetMap, 'testLib');
  const patientID = '123';

  const returnedPatient = executionResults.patientResults[patientID].Patient._json;
  expect(returnedPatient).toEqual(patientBundle.entry[1].resource);
});

test('Should properly load multiple patient resources from array', () => {
  const patientBundles = loadJSONFromDirectory(path.resolve(__dirname, './fixtures/patients'));
  const executionResults = execute([elm], patientBundles, valueSetMap, 'testLib');
  const patientIDs = ['123', '456'];

  const returnedPatient1 = executionResults.patientResults[patientIDs[0]].Patient._json;
  expect(returnedPatient1).toEqual(patientBundles[0].entry[1].resource);
  const returnedPatient2 = executionResults.patientResults[patientIDs[1]].Patient._json;
  expect(returnedPatient2).toEqual(patientBundles[1].entry[1].resource);
});

test('Should only load elm JSON with the specified identifier', () => {
  const secondElm = {
    libray: {
      identifier: {
        id: 'fakeId',
        version: '1',
      },
    },
  };

  // Run the execution utility with testLib elm as well as the secondary Elm
  const executionResults = execute([elm, secondElm], patientBundle, valueSetMap, 'testLib');

  const patientID = '123';

  // Exectuion utility should filter included Elm and only use the testLib defintiions
  expect(executionResults.localIdPatientResultsMap[patientID]).toHaveProperty('testLib');
  expect(executionResults.localIdPatientResultsMap[patientID]).not.toHaveProperty('fakeId');
});

test('Should default to loading elm with the mCODE identifier', () => {
  // Pulling elm with the mCODE identifier along with its valueSetMap
  const valueSets = loadJSONFromDirectory(path.resolve(__dirname, '../../valuesets'));
  const mcodeVSMap = mapValueSets(valueSets);
  const mcodeElm = loadJSONFromDirectory(path.resolve(__dirname, '../../output-elm'));

  // Running the execution utility without a libraryID argument
  const executionResults = execute(mcodeElm, patientBundle, mcodeVSMap);

  const patientID = '123';

  // Exectuion utility should run with an assumed mCODE libraryID
  expect(executionResults.localIdPatientResultsMap[patientID]).toHaveProperty('mCODE');
});
