const path = require('path');
const { $$readFileSync } = require('./file-create');

module.exports = function (showCaseComponentPath, components) {
  for (let filename in components) {
    generateComponent(showCaseComponentPath, filename, components[filename]);
  }
}

function generateComponent(showCaseComponentPath, filename, component) {
  $$readFileSync(path.join(showCaseComponentPath, `./${filename}.ts`), component.ts);
}
