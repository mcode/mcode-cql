# mcode-cql

### Prerequisites

* [Docker](https://docker.com)
* [Node.js](https://nodejs.org/en/)
* [Yarn](https://classic.yarnpkg.com/en/)

Users also need to configure a `.env` file, defining the following values:

```bash
TRANSLATION_SERVICE_URL=http://example.com  # An endpoint exposing a CQL translation service
INPUT_CQL='./cql'                           # Folder(s) containing all CQL to translate
VALUESETS='./valuesets'                     # Folder where CQL-dependent valuesets live
OUTPUT_ELM='./output-elm'                   # Folder where translated ELM will be saved
PATIENTS='./test/fixtures/patients'         # Folder storing patient files used as test fixtures
```

The `INPUT_CQL` value can take multiple directories, separated by a comma, in order to tell the testing harness to look in more than one directory for CQL files.

```
INPUT_CQL='cqlDir1,cqlDir2,cqlDir3'
...
```

Provisional values are provided in the `.env.example` file. To start with these values, simply copy these contents into a new file called `.env`.

See the [cql-testing-harness library](https://github.com/mcode/cql-testing-harness) for a detailed description of the environment.

### Test Script

To run the tests,

``` bash
yarn test
```

This script will do the following:

1. Start a [cql-translation-service](https://github.com/cqframework/cql-translation-service) docker container
2. Translate all CQL in the`INPUT_CQL` directory into ELM JSON and write it to `OUTPUT_ELM`. This will only occur if CQL files in the `INPUT_CQL` have changed and the ELM needs to be updated
3. Run the unit tests present in `./test`

To only do steps 2. and 3. above without starting a new container:

```bash
yarn test -n
```

### Unit Tests

The unit tests will make assertions based on the execution results of the mCODE CQL for a given patient. Before any unit tests are run, the CQL is executed using [cql-execution](https://github.com/cqframework/cql-execution/) and [cql-exec-fhir](https://github.com/cqframework/cql-exec-fhir), and the execution results are stored in a variable to be used for assertions in the unit tests.

To run only the unit tests with the existing ELM in the `OUTPUT_ELM` directory (and not re-translate the CQL):

``` bash
yarn test:unit
```

### CQL Translation

To only translate the CQL and not do the rest of the build/test steps, spin up a `cql-translation-service` docker container and run the `translate` script:

``` bash
docker run --name cql-translation-service --rm -d -p 8080:8080 cqframework/cql-translation-service:latest
yarn translate
```

To stop the docker container once translation is complete, run the following command:

``` bash
docker stop cql-translation-service
```

The default URL used for the translation service is `http://localhost:8080/cql/translator`, however that can be configured by setting the `TRANSLATION_SERVICE_URL` node environment variable. This variable can be set by modifying the `TRANSLATION_SERVICE_URL` value in your `.env` file, or by providing a new value at runtime like so:

``` bash
TRANSLATION_SERVICE_URL=http://example.com/cql/translator yarn translate
```

When translating CQL with a custom URL, `yarn test` should be run with the `-n` flag to prevent the testing harness from starting a new docker container.
