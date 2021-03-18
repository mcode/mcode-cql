# mcode-cql

## Testing

![testing architecture](https://user-images.githubusercontent.com/16297930/109518787-963a4f00-7a78-11eb-8a0f-5be82a011bb7.png)


### Prerequisites

* [Docker](https://docker.com)
* [Node.js](https://nodejs.org/en/)
* [Yarn](https://classic.yarnpkg.com/en/)

### Test Script

To run the tests,

``` bash
yarn test
```

This script will do the following:

1. Start a [cql-translation-service](https://github.com/cqframework/cql-translation-service) docker container
2. Translate all CQL in the `./src` directory into ELM JSON and write it to `./build`
3. Run the unit tests present in `./test`

To only do steps 2. and 3. above without starting a new container:

```bash
yarn test -n
```

### Unit Tests

The unit tests will make assertions based on the execution results of the mCODE CQL for a given patient. Before any unit tests are run, the CQL is executed using [cql-execution](https://github.com/cqframework/cql-execution/) and [cql-exec-fhir](https://github.com/cqframework/cql-exec-fhir), and the execution results are stored in a variable to be used for assertions in the unit tests.

To run only the unit tests with the existing ELM in `./build` (and not re-translate the CQL):

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

The default URL used for the translation service is `http://localhost:8080/cql/translator`, however that can be configured by setting the `TRANSLATION_SERVICE_URL` node environment variable. To set this variable, create a `.env` file within the base diretory of `mcode-cql` and enter a custom URL like so:
``` bash
TRANSLATION_SERVICE_URL=http://secondUrl.com
```  

### Utility Function Assurance Testing

The `assurance` folder contains tests and fixtures for testing the functionality of the helper functions used in the testing harness. 

Example CQL for assurance testing lives in the `assurance/fixtures/cql` subdirectory. To build this CQL into ELM, spin up a cql-translation-service docker container and run the `yarn:translate` script:
``` bash
docker run -d -p 8080:8080 cqframework/cql-translation-service
yarn translate:assurance
```

To only run the utility function unit tests while excluding mCODE assertion tests, run the `test:assurance` script:
``` bash
yarn test:assurance
```