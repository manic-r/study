/**
 * 解析doc文档。
 * ===================分割线=======================
 * ---
 * category: Components
 * type: ${父类菜单名称1}
 * title: ${标题}
 * subtitle: ${副标题（可以不设置）}
 * language: ${语言种类（与demo中的语言类型对应）}
 * cover: ${首页列表中展示时显示的图片}
 * ---
 * ${组件描述}
 *
 * ## ${紧接着在描述下方显示，一般都是作为`如何使用`的位置}
 * ${正文...}
 *
 * ## API （不能变! 固定API说明文档）
 * ${正文...}
 *
 * ===================分割线=======================
 * 注意：上述中标题值可以是`## ${}`结构，并且`## API`为固定项
 * 如果出现多个`## ${}`时，在`## API`上方均显示在页面上方位置
 *                         在`## API`下方，均显示在页面下方位置
 */
const YFM = require('yaml-front-matter');

module.exports = function (file) {
  const resultMap = {};
  // 解析MD文件内容
  const meta = YFM.loadFront(file);
  // 根据Title获取对应的语言
  const language = meta.language;
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
          resultMap[rowLanguage].demo = remark.stringify(child);
        } else {
          resultMap[rowLanguage].demo = demo + remark.stringify(child);
        }
      }
    }
  })
  resultMap.meta = meta;
  return resultMap;
}
