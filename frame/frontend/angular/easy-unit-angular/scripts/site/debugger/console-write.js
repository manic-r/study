const { $$readFileSync } = require('../utils/file-create');
const { logOutput } = require('../project.config');
const path = require('path');

function write(filename, file, isJson = true) {
  $$readFileSync(path.join(logOutput, filename), isJson ? JSON.stringify(file, null, 2) : file);
}

module.exports = {
  write
}
