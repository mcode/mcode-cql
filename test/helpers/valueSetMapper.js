/**
 * Translate ValueSet resources into CodeService map object
 * cql-execution has no concept of a FHIR ValueSet, only an enumeration of codes by some OID
 * iterate through the codes listed in a FHIR ValueSet and map to the required object
 * see https://github.com/cqframework/cql-execution/blob/master/src/cql-code-service.js
 *
 * NOTE: This uses the `compose` attribue of the ValueSet to get code. This is incorrect and
 * should be using the `expansion`. But current mCODE ValueSets have `compose` only
 *
 * @param {Array} valueSetResources array of FHIR ValueSet JSON resources
 * @returns {Object} valueSetMap for CodeService in cql-execution
 */
function mapValueSets(valueSetResources) {
  const valueSets = {};
  valueSetResources.forEach((valueSet) => {
    if (valueSet.compose && valueSet.url) {
      // Grab id for this valueset (should match FHIR ValueSet url)
      const valueSetId = valueSet.url;
      if (!valueSets[valueSetId]) {
        valueSets[valueSetId] = {};
      }

      // Grab ValueSet version. This usually is not used.
      let version = valueSet.version || '';
      if (version === 'N/A') {
        version = '';
      }

      // Create array for valueset members.
      if (!valueSets[valueSetId][version]) {
        valueSets[valueSetId][version] = [];
      }

      // NOTE: This should be using ValueSet.expansion as mentioned above.
      // Iterate over include components and add all concepts
      valueSet.compose.include.forEach((include) => {
        if (include.concept) {
          include.concept.forEach((concept) => {
            if (concept.code && include.system) {
              valueSets[valueSetId][version].push({
                code: concept.code,
                system: include.system,
                version: include.version,
                display: concept.display,
              });
            }
          });
        }
      });
    } else {
      // TODO: Handle situation when ValueSet does not have url or compose.
    }
  });
  return valueSets;
}

module.exports = {
  mapValueSets,
};
