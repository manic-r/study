require('./scripts/script.fun.inject');
const path = require('path');

const prefix = './scripts/gulp';
const tsConfigPath = path.join(__dirname, `${prefix}/tsconfig.json`);

require('ts-node').register({
  project: tsConfigPath
});

require(`${prefix}/gulpfile`);
