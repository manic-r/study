const logger = require('../debugger/console-write');
const yaml = require('json2yaml');
const path = require('path');

module.exports = function (showCasePath, componentsMap) {
  const language = {};
  for (const dir in componentsMap) {
    const row = componentsMap[dir];
    const langs = Object.keys(row.docs);
    langs.forEach(lang => {
      const meta = row.docs[lang].meta;
      language[lang] || (language[lang] = {});
      const data = language[lang];
      data[dir] || (data[dir] = { /* meta: {} */ });
      data[dir].title = meta.title;
      data[dir].subtitle = meta.subtitle || '';
      data[dir].type = meta.type;
    })
  }
  logger.write('language.json', language);
  const output = path.join(`${showCasePath}`, `./assets/i18n`);
  console.log(output)
  for (const lang in language) {
    const toYaml = yaml.stringify(language[lang]);

    logger.write(`language.${lang}.yaml`, toYaml, false);
  }
}
