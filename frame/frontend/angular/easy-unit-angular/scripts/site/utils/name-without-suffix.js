module.exports = function (name) {
  const suffixes = ['md', 'ts'];
  let result = name;
  suffixes.forEach(suffix => result = result.replace(createRegex(suffix), ''));
  return result;
}

function createRegex(suffix) {
  return new RegExp(`[.${suffix}]{${suffix.length + 1}}$`);
}
