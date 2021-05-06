const path = require('path');
const { root, component } = require('../project.config');
const { $$outputFileSync } = require('./file-create');
const CodeAnalysis = require('./code.analysis');
const Handlebars = require('handlebars')
const fs = require('fs');

module.exports = function (showCasePath, componentsMap, isOne = false) {
  const importModuleData = [];
  for (let dir in componentsMap) {
    // Module data handler.
    const moduleData = { components: [], name: dir.firstUpperCase(), path: dir };
    const componentData = { selector: { prefix: component.prefix, name: dir }, name: dir.firstUpperCase() };
    const htmlData = { name: dir };
    const output = path.join(showCasePath, `./${root}/${dir}`);
    const { module, components, docs } = componentsMap[dir];
    // demo component.
    for (let name in components) {
      moduleData.components.push({
        component: CodeAnalysis(components[name].ts),
        filename: name
      });
      $$outputFileSync(path.join(output, `./${name}.ts`), components[name].ts);
    }
    // External Module.
    generateImportModule(output, module);
    // Main Module.
    generateModule(output, moduleData);
    // Main Component.
    generateComponent(output, componentData);
    // Main Html
    generateHtml(output, htmlData);
    // Module import data.
    importModuleData.push({ name: dir.firstUpperCase(), basename: dir });
  }
  // Module Import.
  if (!isOne) {
    importModule(path.join(showCasePath, `./${root}`), { info: importModuleData });
  }
}

function generateImportModule(showCasePath, module) {
  $$outputFileSync(path.join(showCasePath, `./module.ts`), module);
}

function generateModule(showCasePath, context) {
  const url = path.join(__dirname, `../template/index.module.hbs`);
  const output = path.join(showCasePath, `index.module.ts`);
  $$outputFileSync(output, handleTemplate(url, context));
}

function generateComponent(showCasePath, context) {
  const url = path.join(__dirname, `../template/index.component.hbs`);
  const output = path.join(showCasePath, `index.component.ts`);
  $$outputFileSync(output, handleTemplate(url, context));
}

function generateHtml(showCasePath, context) {
  const url = path.join(__dirname, `../template/index.html.hbs`);
  const output = path.join(showCasePath, `index.component.html`);
  context.prefix = '{{';
  context.suffix = '}}';
  $$outputFileSync(output, handleTemplate(url, context));
}

function importModule(showCasePath, context) {
  const url = path.join(__dirname, `../template/import.module.hbs`);
  const output = path.join(showCasePath, `import.module.ts`);
  $$outputFileSync(output, handleTemplate(url, context));
}

function handleTemplate(url, context) {
  const template = fs.readFileSync(url, 'utf8');
  return Handlebars.compile(template)(context);
}
