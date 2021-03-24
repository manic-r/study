/**
 * 解析文件，定义模块组件层级，得到相应数据
 */
const path = require('path');
const fs = require('fs-extra');
const angularJson = require('../../angular.json');
const handleDemoMd = require('./utils/parse-demo-md');
// const handleDemoTS = require('./utils/parse-demo-ts');
// const mapMerge = require('deepmerge');
const nameWithoutSuffix = require('./utils/name-without-suffix');
const { collapseTextChangeRangesAcrossMultipleVersions } = require('typescript');
// 输出文件的路径地址, `site`为输出文件名
const sourceRoot = angularJson.projects['easy-unit-angular-doc'].sourceRoot;
const showCasePath = path.resolve(__dirname, `../../${sourceRoot}`);
console.log('showCasePath', showCasePath, angularJson.projects['easy-unit-angular-doc'].sourceRoot)

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
   *     - doc     ->    API 说明文档
   *     - style   ->    组件样式
   */
  const rootPath = path.resolve(__dirname, `../../components`);
  const rootDir = fs.existsSync(rootPath) ? fs.readdirSync(rootPath) : [];
  console.log('rootDir', rootDir);
  /**
   * 存储每一个components对应的组件。
   * 即：每当components下有一个子集文件夹${name}则会有一个对应的Key: name
   */
  const componentsMap = {};
  rootDir.forEach(componentName => {
    // 获取每一行的组件文件夹路径
    const componentDirPath = path.join(rootPath, `./${componentName}`);
    console.log('componentDirPath', componentDirPath)
    // 判断组件路径是否是文件夹，如果是进行解析
    if (fs.statSync(componentDirPath).isDirectory()) {
      // 获取demo路径
      const demoDirPath = path.join(componentDirPath, './demo');
      console.log('demoDirPath', demoDirPath)
      // 获取demo中的内容
      const demoDir = fs.existsSync(demoDirPath) ? fs.readdirSync(demoDirPath) : [];
      /**
       * 存储每一个组件实例demo中的对象。
       * 即：每当components -> ${组件} -> demo -> ${实例1}则会有一个对应的Key: 实例1
       */
      let demoMap = {};
      demoDir.forEach(demoName => {
        const primaryKey = nameWithoutSuffix(demoName);
        demoMap[primaryKey] = {};
        console.log('输出内容：', demoName)
        // .MD文件处理
        // demoMap = mapMerge(demoMap, handleDemoMD(demoDirPath, demoName));
        if (/.md$/.test(demoName)) {
          function handleDemoMdLocal() {
            const resultMap = {};
            // 读取MD文件内容
            const demoMarkDownFile = fs.readFileSync(path.join(demoDirPath, demoName));
            handleDemoMd(demoMarkDownFile);
            return resultMap;
          }
          console.log(handleDemoMdLocal())
        } else if (/.ts$/.test(demoName)) {

        }
        // .TS文件处理
        // demoMap = mapMerge(demoMap, handleDemoTS(demoName));
      });
    }
  })
}

generate()

module.exports = generate;
