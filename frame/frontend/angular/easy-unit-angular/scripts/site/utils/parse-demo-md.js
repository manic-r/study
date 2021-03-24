/**
 * 解析MD文件内容。
 */
const YFM = require('yaml-front-matter');

module.exports = function (file) {
  console.log('解析MD文件内容');
  console.log(YFM.loadFront(file))
}
