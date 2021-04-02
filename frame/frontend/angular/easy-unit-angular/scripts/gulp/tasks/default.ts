import { parallel, task } from 'gulp';
import { gray, yellow } from 'chalk';
import * as path from 'path';

// 解析package.json -> scripts
function commandParse(): { [key: string]: string } {
  let { scripts, scriptsDes } = require(path.resolve(process.cwd(), './package.json'));
  scriptsDes || (scriptsDes = {});
  const defaultSpace: number = 3;
  let cmdMapper: { [key: string]: string } = {};
  // 最大的字段数长度
  let max: number = 0;
  for (let cmd in scripts) {
    if (scriptsDes[cmd]) {
      max > cmd.length || (max = cmd.length);
      cmdMapper[cmd] = scriptsDes[cmd];
    }
  }
  for (let key in cmdMapper) {
    cmdMapper[key.padEnd(max + defaultSpace)] = cmdMapper[key];
    delete cmdMapper[key];
  }
  return cmdMapper;
}

task('help', (done: Function) => {
  console.log();
  console.log('请指定您要运行的gulp任务, 任务列表：');
  const mapper: { [key: string]: string } = commandParse();
  for (let cmd in mapper) {
    console.log(yellow(cmd), gray(mapper[cmd] ? `${mapper[cmd]}` : ''));
  }
  console.log();
  done();
});

task('default', parallel('help'));
