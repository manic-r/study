/**
 * 解析文件，定义模块组件层级，得到相应数据。
 * 优先获取组件中的doc，加载doc名称当作语言类型，一切以其为主。（以doc的配置创建左侧菜单）
 */
require('./script.fun.inject');
const path = require('path');
const fs = require('fs-extra');
const angularJson = require('../../angular.json');
const handleDemoMd = require('./utils/parse-demo-md');
const handleDocMd = require('./utils/parse-doc-md');
const merge = require('deepmerge');
const { $$readFileSync } = require('./utils/file-create');
const nameWithoutSuffix = require('./utils/name-without-suffix');
// 输出文件的路径地址, `site`为输出文件名
const sourceRoot = angularJson.projects['easy-unit-angular-doc'].sourceRoot;
const showCasePath = path.resolve(__dirname, `../../${sourceRoot}`);

function generate(target) {
  // 复制组件发布工程
  fs.copySync(path.resolve(__dirname, `./_site/doc`), showCasePath);
  /**
   * 解析组件库, `components`为组件库
   * 解析目录结构：
   * - components
   *   - ${组件名称}
   *     - demo    ->    显示的应用实例
   *       - ${实例1}.md
   *       - ${实例1}.ts
   *       - ${实例2}.md
   *       - ${实例2}.ts
   *       - module
   *     - doc     ->    API 说明文档
   *       - ${语言Code1}.md
   *       - ${语言Code2}.md
   *     - style   ->    组件样式
   */
  const rootPath = path.resolve(__dirname, `../../components`);
  const rootDir = fs.existsSync(rootPath) ? fs.readdirSync(rootPath) : [];
  /**
   * 存储每一个components对应的组件。
   * 即：每当components下有一个子集文件夹${name}则会有一个对应的Key: name
   */
  const componentsMap = {};
  rootDir.forEach(componentName => {
    // 获取每一行的组件文件夹路径
    const componentDirPath = path.join(rootPath, `./${componentName}`);
    // 判断组件路径是否是文件夹，如果是进行解析
    if (fs.statSync(componentDirPath).isDirectory()) {
      componentsMap[componentName] = {};
      // ==========================Demo处理================================= //
      // 获取demo路径
      const demoDirPath = path.join(componentDirPath, './demo');
      // 获取demo中的内容
      const demoDir = fs.existsSync(demoDirPath) ? fs.readdirSync(demoDirPath) : [];
      /**
       * 存储每一个组件实例demo中的对象。
       * 即：每当components -> ${组件} -> demo -> ${实例1}则会有一个对应的Key: 实例1
       */
      // const demoQueue = [];
      let demoMap = {};
      demoDir.forEach(demoName => {
        const primaryKey = nameWithoutSuffix(demoName);
        // .MD文件处理
        if (/.md$/.test(demoName)) {
          function handleDemoMdLocal() {
            const resultMap = {};
            // 读取MD文件内容
            const demoMarkDownFile = fs.readFileSync(path.join(demoDirPath, demoName));
            resultMap[primaryKey] = handleDemoMd(demoMarkDownFile);
            return resultMap;
          }
          demoMap = merge(demoMap, handleDemoMdLocal());
        } else if (/.ts$/.test(demoName)) {
          function handleDemoTsLocal() {
            const resultMap = {};
            // 读取TS文件内容
            const demoTsContext = fs.readFileSync(path.join(demoDirPath, demoName), { encoding: 'utf8' });
            resultMap[primaryKey] = { ts: demoTsContext };
            // 写入文件地址
            $$readFileSync(path.join(showCasePath, `./app/${componentName}/${primaryKey}.ts`), resultMap[primaryKey].ts);
            return resultMap;
          }
          // .TS文件处理
          demoMap = merge(demoMap, handleDemoTsLocal());
        } else if (demoName === 'module') {
          function handleModuleLocal() {
            // 读取Module文件内容
            const moduleContext = fs.readFileSync(path.join(demoDirPath, demoName), { encoding: 'utf8' });
            const resultMap = { module: moduleContext };
            // 写入文件地址
            $$readFileSync(path.join(showCasePath, `./app/${componentName}/module.ts`), resultMap.module);
            return resultMap;
          }
          // .module.ts文件处理
          componentsMap[componentName] = merge(componentsMap[componentName], handleModuleLocal());
        }
      });
      componentsMap[componentName] = merge(componentsMap[componentName], { components: demoMap });

      // ==========================doc处理================================= //
      // 获取doc路径
      const docDirPath = path.join(componentDirPath, './doc');
      // 获取demo中的内容
      const docDir = fs.existsSync(docDirPath) ? fs.readdirSync(docDirPath) : [];
      let docMap = {};
      docDir.forEach(docName => {
        docMap
        if (/.md$/.test(docName)) {
          // 读取MD文件内容
          const docMarkDownFile = fs.readFileSync(path.join(docDirPath, docName));
          docMap = merge(docMap, handleDocMd(docMarkDownFile));
        }
      })
      componentsMap[componentName] = merge(componentsMap[componentName], { docs: docMap });
      // TODO:
      $$readFileSync(path.join(process.cwd(), './consoles/componentsMap.json'), JSON.stringify(componentsMap, null, 2))
      // TODO:
    }
  })
}

generate()

module.exports = generate;
