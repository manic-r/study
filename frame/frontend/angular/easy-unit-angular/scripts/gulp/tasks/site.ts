import { parallel, series, task, watch } from "gulp";
import { execNodeTask } from '../util/task-handle';
import { join, resolve } from 'path';
import { debounce } from 'lodash';
import { green, yellow } from "chalk";

const detectPort = require('detect-port');
const fs = require('fs-extra');
const siteGenerate = require('../../site/generate-site');
const projectConfig = require('../../site/project.config');

const docsGlob = join(projectConfig.component.base, `**/doc/*.+(md|txt)`);
const demoGlob = join(projectConfig.component.base, `**/demo/*.+(md|ts)`);
const siteGlob = resolve(__dirname, `../../site/_site/doc`);

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

task('watch:doc-web', () => {
  const globs = (siteGlob + '/**').replace(/\\/g, '/');
  watch(globs).on(
    'change',
    debounce(path => {
      const place = path.replace(siteGlob, '').replace(/\\/g, '/').replace('/', '');
      const output = join(process.cwd(), projectConfig.output);
      console.log(yellow('检测到模板代码 '), green(place), yellow(' 变更, 已同步.'))
      fs.copySync(path, join(output, place));
    }, 3000)
  )
})

task('init:site', done => {
  try {
    siteGenerate();
  } catch (error) {
    console.log('捕捉异常：进行重新编译', error.code, error.message)
  }
  done();
});

task('serve:site', done => {
  const argv = process.argv.splice(3);
  const portIndex = argv.lastIndexOf('--port');
  const port = portIndex === -1 ? 4200 : argv[portIndex + 1];
  detectPort(port).then((p: number) => {
    if (port != p) {
      if (portIndex === -1) {
        argv.push(...['--port', '0']);
      } else {
        argv[portIndex + 1] = '0';
      }
    }
    argv.unshift('serve');
    execNodeTask('@angular/cli', 'ng', argv)(done);
  })
})

task('start:dev', series('init:site', parallel('watch:site', 'watch:doc-web', 'serve:site')));
