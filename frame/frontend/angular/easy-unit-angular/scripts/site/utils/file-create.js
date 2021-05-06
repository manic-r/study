const fs = require('fs');
const path = require('path');

function mkdir(dir, cb) {
  const pathInfo = path.parse(dir)
  if (!fs.existsSync(pathInfo.dir)) {
    mkdir(pathInfo.dir, function () {
      fs.mkdirSync(pathInfo.dir)
    })
  }
  cb && cb()
}

function outputFileSync(dir, reader) {
  mkdir(dir);
  fs.writeFileSync(dir, reader);
}

function readFileSync(filename) {
  if (fs.existsSync(filename)) {
    return fs.readFileSync(filename, { encoding: 'utf8' });
  } else {
    return null;
  }
}

module.exports = {
  $$mkdir: mkdir,
  $$outputFileSync: outputFileSync,
  $$readFileSync: readFileSync
}
