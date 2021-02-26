const fs = require('fs');
const path = require('path');
const { translateCQL } = require('../test/helpers/testHelper');

/**
 * Find any errors found in the ELM annotation
 *
 * @param {Object} elm ELM JSON to look for errors in
 * @returns {Array} annotations with severity error
 */
function processErrors(elm) {
  const errors = [];
  elm.library.annotation.forEach((a) => {
    if (a.errorSeverity === 'error') {
      errors.push(a);
    }
  });

  return errors;
}

translateCQL()
  .then((libraries) => {
    const buildPath = path.join(__dirname, '../build');
    Object.entries(libraries).forEach(([libName, elm]) => {
      const errors = processErrors(elm);
      if (errors.length === 0) {
        const elmPath = path.join(buildPath, `${libName}.json`);
        fs.writeFileSync(elmPath, JSON.stringify(elm), 'utf8');
        console.log(`Wrote ELM to ${elmPath}`);
      } else {
        console.error('Error translating to ELM');
        console.error(errors);
        process.exit(1);
      }
    });
  })
  .catch((e) => {
    console.error(`HTTP error translating CQL: ${e.message}`);
    console.error(e.stack);
    process.exit(1);
  });
