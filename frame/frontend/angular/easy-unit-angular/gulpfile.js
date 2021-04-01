const path = require('path');

const prefix = './scripts/gulp';
const tsConfigPath = path.join(__dirname, `${prefix}/tsconfig.json`);

console.log(tsConfigPath)
require('ts-node').register({
  project: tsConfigPath
});

require(`${prefix}/gulpfile.ts`);


///////////////////////..
// const { src } = require('gulp');
// const gulpClean = require('gulp-clean');

// function copy() {
//   return src('site', { read: false, allowEmpty: true }).pipe(gulpClean());
// }
// copy()