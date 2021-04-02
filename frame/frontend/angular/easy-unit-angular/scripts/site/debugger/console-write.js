const { $$readFileSync } = require('../utils/file-create');
const { logOutput } = require('../project.config');
const path = require('path');

function write(filename, file) {
  $$readFileSync(path.join(logOutput, filename), file);
}

module.exports = {
  write
}
