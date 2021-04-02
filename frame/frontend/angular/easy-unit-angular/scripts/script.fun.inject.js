// 根据指定的数值分组遍历数据
Array.prototype.forEachOfNext = function (callbackfn) {
  // 获取遍历次数
  for (let i = 0; i < this.length; i++) {
    const isLast = i + 1 == this.length;
    callbackfn(this[i], this[i + 1], isLast);
  }
}

// 判断Map是否为空
Object.isNullMap = function (map) {
  return Object.keys(map).length === 0;
}

// 首字母大写
String.prototype.firstUpperCase = function () {
  return this.replace(/\b(\w)(\w*)/g, function (_, $1, $2) {
    return $1.toUpperCase() + $2//.toLowerCase();
  });
}
