const fs = require('fs');
const path = require('path');

/**
 * Load a directory of JSON files
 *
 * @param {string} pathToDir absolute path from the caller of where directory is located
 * @returns {Array} array of JSON parsed fixtures
 */
function loadJSONFromDirectory(pathToDir) {
  const filesInDir = fs.readdirSync(pathToDir).filter((f) => path.extname(f) === '.json');
  return filesInDir.map((f) => JSON.parse(fs.readFileSync(path.join(pathToDir, f), 'utf8')));
}

/**
 * Load any JSON fixture
 *
 * @param {string} pathToFixture absolute path from the caller of where fixture is located
 * @returns {Object} JSON parsed fixture
 */
function loadJSONFixture(pathToFixture) {
  const f = fs.readFileSync(pathToFixture, 'utf8');
  return JSON.parse(f);
}

module.exports = {
  loadJSONFixture,
  loadJSONFromDirectory,
};
