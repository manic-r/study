import { parallel, series, task, watch } from "gulp";
import { execNodeTask } from '../util/task-handle';
import { join } from 'path';
import { debounce } from 'lodash';
import { green, yellow } from "chalk";

const detectPort = require('detect-port');
const siteGenerate = require('../../site/generate-site');
const projectConfig = require('../../site/project.config');

const docsGlob = join(projectConfig.component.base, `**/doc/*.+(md|txt)`);
const demoGlob = join(projectConfig.component.base, `**/demo/*.+(md|ts)`);

task('watch:site', () => {
  const globs = [docsGlob, demoGlob].map(p => p.replace(/\\/g, '/'));
  watch(globs).on(
    'change',
    debounce(path => {
      const p = path.replace(/\\/g, '/');
      const execArray = new RegExp(`/${projectConfig.component.dir}/(.+)/(doc|demo)/`).exec(p);
      if (execArray && execArray[1]) {
        const component = execArray[1];
        console.log(yellow('检测到组件 '), green(component), yellow(' 变更, 已重新编译.'))
        siteGenerate(component);
      }
    }, 3000)
  )
});

task('init:site', done => {
  try {
    siteGenerate();
  } catch (error) {
    console.log('捕捉异常：进行重新编译', error.code, error.message)
  }
  done();
});

task('serve:site', done => {
  detectPort(4200).then((port: number) => {
    execNodeTask('@angular/cli', 'ng', ['serve', '--port', port === 4200 ? '4200' : '0', '--open'])(done);
  })
})

task('start:dev', series('init:site', parallel('watch:site', 'serve:site')));
