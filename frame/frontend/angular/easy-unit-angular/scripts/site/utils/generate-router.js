
const path = require('path');
const { $$readFileSync } = require('./file-create');
const logger = require('../debugger/console-write');

module.exports = {
  component
}

function component (showCasePath, componentsMap) {
  const mapping = {};
  for (const dir in componentsMap) {
    const { docs } = componentsMap[dir];
    Object.keys(docs).forEach(language => {
      mapping[language] || (mapping[language] = {});
      const oneLanguage = mapping[language];
      const meta = docs[language].meta;
      oneLanguage[dir] || (oneLanguage[dir] = []);
      oneLanguage[dir].push(meta.type);
    })
  }
  // TODO: 判断多个语言中的每一个map是否相同，相同则取任意一个
  // TODO: 现在先不做处理了 直接取一个
  /**
    {
      'en-US': { hello: [ 'Data Display' ], table: [ 'Data Display' ] },
      'zh-CN': { hello: [ '数据展示' ], table: [ '数据展示' ] }
    }
   */
  const target = Object.values(mapping)[0] || {};
  const menus = [];
  const menuMapping = {};
  Object.keys(target).forEach(route => {
    const parent = target[route][0] || 'Default';
    menuMapping[parent] || (menuMapping[parent] = []);
    menuMapping[parent].push(route);
  });
  Object.keys(menuMapping).forEach(key => {
    const routes = menuMapping[key];
    const menu = { open: true, children: [] };
    routes.forEach(name => {
      menu.title = `${name}.type`;
      menu.children.push({ title: `${name}.title`, subtitle: `${name}.subtitle` });
    });
    menus.push(menu);
  });
  const output = path.join(showCasePath, `./assets`);
  $$readFileSync(path.join(output, `./menu.json`), JSON.stringify(menus, null, false));
}
