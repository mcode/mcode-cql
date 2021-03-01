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

### Unit Tests

The unit tests will make assertions based on the execution results of the mCODE CQL for a given patient. Before any unit tests are run, the CQL is executed using [cql-execution](https://github.com/cqframework/cql-execution/) and [cql-exec-fhir](https://github.com/cqframework/cql-exec-fhir), and the execution results are stored in a variable to be used for assertions in the unit tests.

To run only the unit tests with the existing ELM in `./build` (and not re-translate the CQL):

``` bash
yarn test:unit
```

### CQL Translation

To only translate the CQL and not do the rest of the build/test steps, spin up a `cql-translation-service` docker container and run the `translate` script:

``` bash
docker run -d -p 8080:8080 cqframework/cql-translation-service
yarn translate
```
