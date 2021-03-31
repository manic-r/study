/**
 * 解析doc文档。
 * ===================分割线=======================
 * ---
 * category: Components
 * type: ${父类菜单名称1}
 * title: ${标题}                                  *
 * subtitle: ${副标题（可以不设置）}
 * language: ${语言种类（与demo中的语言类型对应）} *
 * cover: ${首页列表中展示时显示的图片}
 * divider: ${自定义分割线} -> false 时为不设定 （默认： `~~~~~~~~~~divider~~~~~~~~~~`）
 * waterfall: ${boolean}  ({ true: 由上到下, false: 由下到上 }, 默认true)
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
 * 声明：文档中只支持将数据分为两段（上下两部分），当出现多个分隔符时，会以第一个为主
 * 注意：上述中标题值可以是`## ${}`结构，并且`## API`为固定项
 * 如果出现多个`## ${}`时，在`## API`上方均显示在页面上方位置
 *                         在`## API`下方，均显示在页面下方位置
 */
const YFM = require('yaml-front-matter');
const MD = require('./marked');

module.exports = function (file) {
  // 解析MD文件内容
  const meta = YFM.loadFront(file);
  if (!meta.language) return {};
  defaultMetaHandle(meta);
  const remark = require('remark')();
  const ast = remark.parse(meta.__content);
  // 当除了Title中设定的语言类型时，其它标题将被视为无效，内容也被忽略
  // 是否是居上
  let isTop = meta.waterfall;
  // 上方的字符串对象
  let topStr = '';
  // 底部的字符串对象
  let bottomStr = '';
  ast.children.forEach(child => {
    if (child.children && child.children[0].value === meta.divider) {
      isTop = !meta.waterfall;
      return true;
    }
    const rowStr = MD(remark.stringify(child));
    isTop ? (topStr += rowStr) : (bottomStr += rowStr);
  })
  const resultMap = {};
  resultMap[meta.language] = {
    meta: {
      category: meta.category,
      type: meta.type,
      title: meta.title,
      subtitle: meta.subtitle,
      cover: meta.cover
    },
    howToUse: topStr,
    api: bottomStr
  };
  return resultMap;
}

function defaultMetaHandle(meta) {
  function isNull(exp) {
    return !(exp === 0 || exp === false || !!exp);
  }
  const defaults = {
    divider: '!==========divider==========!',
    waterfall: true
  }
  for (let key in defaults) {
    if (isNull(meta[key])) {
      meta[key] = defaults[key];
    }
  }
}
