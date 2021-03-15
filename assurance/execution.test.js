const { execute } = require('../test/helpers/execution');
const { mapValueSets } = require('../test/helpers/valueSetMapper');
const { loadELM, loadJSONFixture, loadValueSets } = require('../test/helpers/fixtureLoader');

let valueSetMap;
let elm;
let patientBundle;

beforeEach(() => {
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
  elm = loadJSONFixture(__dirname, 'fixtures/elm/testLib.json');
  patientBundle = loadJSONFixture(__dirname, './fixtures/patients/test-patient-1.json');
});

test('Should properly recognize resources in execution', () => {
  const expectedCondition = patientBundle.entry[0].resource;
  const executionResults = execute([elm], patientBundle, valueSetMap, 'testLib');
  const patientID = '123';

  expect(executionResults.patientResults[patientID].Condition).toHaveLength(1);
  // eslint-disable-next-line no-underscore-dangle
  expect(executionResults.patientResults[patientID].Condition[0]._json).toEqual(expectedCondition);
});

test('Should properly load patient resource from bundle', () => {
  const executionResults = execute([elm], patientBundle, valueSetMap, 'testLib');
  const patientID = '123';

  // eslint-disable-next-line no-underscore-dangle
  const returnedPatient = executionResults.patientResults[patientID].Patient._json;
  expect(returnedPatient).toEqual(patientBundle.entry[1].resource);
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
  const valueSets = loadValueSets();
  const mcodeVSMap = mapValueSets(valueSets);
  const mcodeElm = loadELM();

  // Running the execution utility without a libraryID argument
  const executionResults = execute(mcodeElm, patientBundle, mcodeVSMap);

  const patientID = '123';

  // Exectuion utility should run with an assumed mCODE libraryID
  expect(executionResults.localIdPatientResultsMap[patientID]).toHaveProperty('mCODE');
});
