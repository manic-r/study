const path = require('path');
const { $$readFileSync } = require('../utils/file-create');

function write(filename, file) {
  $$readFileSync(path.join(process.cwd(), `./logs/${filename}`), file);
}

module.exports = {
  write
}
