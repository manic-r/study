import { src, task } from "gulp";

const { logOutput, output } = require('../../site/project.config');
const gulpClean = require('gulp-clean');

task('clean', () => src([logOutput, output], { read: false, allowEmpty: true }).pipe(gulpClean()))

