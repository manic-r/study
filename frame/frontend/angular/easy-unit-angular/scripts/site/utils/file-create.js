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

function readFileSync(dir, reader) {
  mkdir(dir);
  fs.writeFileSync(dir, reader);
}
module.exports = {
  $$mkdir: mkdir,
  $$readFileSync: readFileSync
}
