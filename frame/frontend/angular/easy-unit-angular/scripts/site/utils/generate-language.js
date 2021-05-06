const logger = require('../debugger/console-write');
const yaml = require('json2yaml');
const path = require('path');
const { $$outputFileSync, $$readFileSync } = require('./file-create');
const jsYaml = require('js-yaml');
const merge = require('deepmerge');

module.exports = function (showCasePath, componentsMap, target) {
  const language = {};
  for (const dir in componentsMap) {
    const row = componentsMap[dir];
    const langs = Object.keys(row.docs);
    langs.forEach(lang => {
      const docsInfo = row.docs[lang];
      const meta = docsInfo.meta;
      language[lang] || (language[lang] = {});
      const data = language[lang];
      data[dir] || (data[dir] = { component: {} });
      data[dir].title = meta.title || '';
      data[dir].subtitle = meta.subtitle || '';
      data[dir].type = meta.type || '未定义';
      data[dir].howToUse = docsInfo.howToUse || '';
      data[dir].api = docsInfo.api || '';
    })
    const langTypes = Object.keys(language);
    const components = Object.keys(row.components);
    components.forEach(component => {
      const rowInfo = row.components[component];
      langTypes.forEach(lang => {
        language[lang][dir].component[component] || (language[lang][dir].component[component] = {});
        const info = language[lang][dir].component[component];
        const demo = rowInfo[lang] && rowInfo[lang].demo;
        const title = rowInfo.meta.title[lang] || '';
        info.demo = demo || '';
        info.title = title || '';
      })
    })
  }
  logger.write('language.json', language);
  const output = path.join(`${showCasePath}`, `./assets/i18n`);
  for (const lang in language) {
    // 输出文件
    const file = path.join(output, `./language.${lang}.yaml`);
    const oldYamlJson = jsYaml.load($$readFileSync(file)) || {};
    const context = merge(oldYamlJson, language[lang]);
    const toYaml = yaml.stringify(context);
    $$outputFileSync(file, toYaml);
    logger.write(`language.${lang}.yaml`, toYaml, false);
  }
}
