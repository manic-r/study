/**
 * 解析MD文件内容。
 */
const YFM = require('yaml-front-matter');

module.exports = function (file) {
  const resultMap = {};
  // 解析MD文件内容
  const meta = YFM.loadFront(file);
  // 根据Title获取对应的语言
  const language = Object.keys(meta.title);
  const remark = require('remark')();
  const ast = remark.parse(meta.__content);
  // 移除meta.__content属性
  delete meta.__content;
  // 当除了Title中设定的语言类型时，其它标题将被视为无效，内容也被忽略
  let rowLanuage;
  ast.children.forEach(child => {
    if (child.type === 'heading' && child.depth === 2) {
      rowLanuage = child.children[0].value;
      if (language.includes(rowLanuage)) {
        resultMap[rowLanuage] = resultMap[rowLanuage] || { demo: {} };
      }
    } else {
      if (!!resultMap[rowLanuage]) {
        const demo = resultMap[rowLanuage].demo;
        if (Object.isNullMap(demo)) {
          resultMap[rowLanuage].demo = remark.stringify(child);
        } else {
          resultMap[rowLanuage].demo = demo + remark.stringify(child);
        }
      }
    }
  })
  resultMap.meta = meta;
  return resultMap;
}