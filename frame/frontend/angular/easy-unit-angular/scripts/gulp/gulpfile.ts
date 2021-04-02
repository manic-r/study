import { series, task } from 'gulp';

import './tasks/default';
import './tasks/clean';
import './tasks/site';

task('start:dev', series('clean', series('start:dev')))
