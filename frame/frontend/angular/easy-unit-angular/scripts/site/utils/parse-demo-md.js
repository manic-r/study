/**
 * 解析MD文件内容。
 * ---
 * order: 排序位置
 * title:
 *   ${语言Code1}: ${名称1}
 *   ${语言Code2}: ${名称2}
 * ## ${语言Code1}
 * ${正文.......}
 * ## ${语言Code2}
 * ${正文.......}
 */
const YFM = require('yaml-front-matter');
const MD = require('./marked');

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
  let rowLanguage;
  ast.children.forEach(child => {
    if (child.type === 'heading' && child.depth === 2) {
      rowLanguage = child.children[0].value;
      if (language.includes(rowLanguage)) {
        resultMap[rowLanguage] = resultMap[rowLanguage] || { demo: {} };
      }
    } else {
      if (!!resultMap[rowLanguage]) {
        const demo = resultMap[rowLanguage].demo;
        if (Object.isNullMap(demo)) {
          resultMap[rowLanguage].demo = MD(remark.stringify(child));
        } else {
          resultMap[rowLanguage].demo = demo + MD(remark.stringify(child));
        }
      }
    }
  })
  resultMap.meta = meta;
  return resultMap;
}
