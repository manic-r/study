import './tasks/default';
import { task } from 'gulp';

task('start:dev', (fun: Function) => {
  console.log(fun.toString())
})
