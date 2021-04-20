const { component } = require('../project.config');

module.exports = function (codeStr) {
  // 多个空格合并成一个
  codeStr = codeStr.replace(/\s+/g, ' ');
  // TODO: 先实现，后续替换成正则
  const { demoPrefix, demoSuffix } = component;
  const target = `export class ${demoPrefix}`;
  const className = codeStr.substring(
    codeStr.indexOf(target) + target.length - demoPrefix.length,
    codeStr.indexOf(`${demoSuffix} {`) + demoSuffix.length
  );
  return className;
}
