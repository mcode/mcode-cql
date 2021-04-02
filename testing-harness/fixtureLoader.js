const fs = require('fs');
const path = require('path');

/**
 * Load a directory of JSON files
 *
 * @param {string} currentDir current path of file trying to do the loading
 * @param {string} relativePathToDir relative path from the caller of where directory is located
 * @returns {Array} array of JSON parsed fixtures
 */
function loadJSONFromDirectory(currentDir, relativePathToDir) {
  const p = path.resolve(path.join(currentDir, relativePathToDir));
  const filesInDir = fs.readdirSync(p).filter((f) => path.extname(f) === '.json');
  return filesInDir.map((f) => JSON.parse(fs.readFileSync(path.join(p, f), 'utf8')));
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

module.exports = {
  loadJSONFixture,
  loadJSONFromDirectory,
};
