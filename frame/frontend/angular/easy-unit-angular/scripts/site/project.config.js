const angularJson = require('../angular.json');
const easyUnitDocProject = angularJson.projects['easy-unit-doc'];

module.exports = {
  // 输出文件的路径地址, `site`为输出文件名
  output: easyUnitDocProject.sourceRoot,
  root: easyUnitDocProject.root,
  component: {
    // 组件前缀
    prefix: easyUnitDocProject.prefix,
    // 组件Demo名称
    demoPrefix: easyUnitDocProject.prefix.firstUpperCase() + 'Demo',
    demoSuffix: 'Component'
  }
}
