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

// 对比两个对象的值是否完全相等 返回值 true/false
Object.isObjectValueEqual = function (a, b) {
  //取对象a和b的属性名
  var aProps = Object.getOwnPropertyNames(a);
  var bProps = Object.getOwnPropertyNames(b);
  //判断属性名的length是否一致
  if (aProps.length != bProps.length) {
    return false;
  }
  //循环取出属性名，再判断属性值是否一致
  for (var i = 0; i < aProps.length; i++) {
    var propName = aProps[i];
    if (a[propName] !== b[propName]) {
      return false;
    }
  }
  return true;
}
