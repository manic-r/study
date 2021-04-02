const angularJson = require('../../angular.json');
const easyUnitDocProject = angularJson.projects['easy-unit-doc'];
const path = require('path');

const baseUrl = process.cwd();

module.exports = {
  // 输出文件的路径地址, `site`为输出文件名
  output: easyUnitDocProject.sourceRoot,
  root: easyUnitDocProject.root,
  logOutput: path.join(baseUrl, 'logs'),
  component: {
    // 组件基本位置
    base: path.join(baseUrl, 'components'),
    // 组件前缀
    prefix: easyUnitDocProject.prefix,
    // 组件Demo名称
    demoPrefix: easyUnitDocProject.prefix.firstUpperCase() + 'Demo',
    demoSuffix: 'Component'
  }
};
