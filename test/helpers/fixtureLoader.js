const fs = require('fs');
const path = require('path');

/**
 * Load all ELM files in build directory as JSON
 *
 * @returns {Array} array of ELM JSON objects
 */
function loadELM() {
  const p = path.join(__dirname, '../../build');
  const elmFiles = fs.readdirSync(p).filter((f) => path.extname(f) === '.json');
  return elmFiles.map((f) => JSON.parse(fs.readFileSync(path.join(p, f), 'utf8')));
}

/**
 * Load any JSON fixture
 *
 * @param {string} currentDir current path of file trying to do the loading
 * @param {string} relativePathToFixture relative path from the caller of where fixture is located
 * @returns {Object} JSON parsed fixture
 */
function loadJSONFixture(currentDir, relativePathToFixture) {
  const p = path.resolve(path.join(currentDir, relativePathToFixture));
  const f = fs.readFileSync(p, 'utf8');
  return JSON.parse(f);
}

/**
 * Load all ValueSets as JSON
 *
 * @returns {Array} array of ValueSet JSON resources
 */
function loadValueSets() {
  const p = path.resolve(path.join(__dirname, '../fixtures/valuesets'));
  const valueSets = fs.readdirSync(p).filter((f) => path.extname(f) === '.json');
  return valueSets.map((f) => JSON.parse(fs.readFileSync(path.join(p, f), 'utf8')));
}

module.exports = {
  loadELM,
  loadJSONFixture,
  loadValueSets,
};
