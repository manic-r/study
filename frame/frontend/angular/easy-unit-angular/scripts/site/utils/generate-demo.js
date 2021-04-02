const path = require('path');
const { root } = require('../project.config');
const { $$readFileSync } = require('./file-create');

module.exports = function (showCasePath, componentsMap) {
  for (let dir in componentsMap) {
    const output = path.join(showCasePath, `./${root}/${dir}`)
    const { module, components, docs } = componentsMap[dir];
    // demo component.
    for (let name in components) {
      generateComponent(output, name, components[name]);
    }
    // Module.
    generateModule(output, module);
    //
  }
}

function generateComponent(showCasePath, filename, component) {
  $$readFileSync(path.join(showCasePath, `./${filename}.ts`), component.ts);
}

function generateModule(showCasePath, module) {
  $$readFileSync(path.join(showCasePath, `./module.ts`), module);
}
