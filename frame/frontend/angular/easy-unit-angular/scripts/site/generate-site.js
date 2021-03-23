/**
 * 解析文件，定义模块组件层级，得到相应数据
 */
const path = require('path');
const fs = require('fs-extra');
// 输出文件的路径地址, `site`为输出文件名
const showCasePath = path.resolve(__dirname, `../../src`);
console.log(showCasePath)

function generate(target) {
  // 复制组件发布工程
  fs.copySync(path.resolve(__dirname, `./_site/doc`), showCasePath);
  /**
   * 解析组件库, `components`为组件库
   * 目录结构：
   * - components
   *   - ${组件名称}
   */
  const rootPath = path.resolve(__dirname, `../../components`);
  const rootDir = fs.existsSync(rootPath) ? fs.readdirSync(rootPath) : [];
  console.log('rootDir', rootDir);
  rootDir.forEach(componentName => {
    // 获取每一行的组件文件夹路径
    const componentDirPath = path.join(rootPath, `./${componentName}`);
    // 判断组件路径是否是文件夹，如果是进行解析
    if (fs.statSync(componentDirPath).isDirectory()) {

    }
  })
}

module.exports = generate;