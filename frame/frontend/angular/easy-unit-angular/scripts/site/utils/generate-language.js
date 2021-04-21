const logger = require('../debugger/console-write');
const yaml = require('json2yaml');
const path = require('path');
const { $$readFileSync } = require('./file-create');

module.exports = function (showCasePath, componentsMap) {
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
      // data[dir].howToUse = docsInfo.howToUse || '';
      // data[dir].api = docsInfo.api || '';
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
    const toYaml = yaml.stringify(language[lang]);
    $$readFileSync(path.join(output, `./language.${lang}.yaml`), toYaml);
    logger.write(`language.${lang}.yaml`, toYaml, false);
  }
}
