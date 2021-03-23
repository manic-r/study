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

const date: Date = new Date('2021-03-22');
import * as moment from 'moment';
console.log(date, moment(date).add('31', 'days').format('YYYY-MM-DD'))


// /front/deposit/account-transaction/retrieve-list
// accountId: "11111"
// categories: []
// endDateTime: ""
// fetchCount: 50
// fetchScheduledTransaction: true
// fetchStartKey: null
// keyWord: ""
// retrieveTime: null
// startDateTime: ""

// /front/saving-box/auto-inner-transfer-reservation/retrieve-list
// accountDiv: "2"
// categoryList: null
// inquiryPeriodEndDate: "2021-04-22"
// inquiryPeriodStartDate: "2021-03-22"
// keyWord: ""
// purposeDepositId: ""

// /front/saving-box/purpose-deposit-transaction/retrieve-list
// accountDiv: "2"
// categoryList: null
// inquiryPeriodEndDate: "2021-03-22"
// inquiryPeriodStartDate: "2019-09-21"
// keyWord: ""
// purposeDepositId: ""
// retrieveTime: "2021-03-22T06:00:02.740Z"


// endDate: now -> startDate: 548 前
// retrieveTime -> now   预金调用Grpc
// startDate: now -> endDate: 31 后

// 预约
///  /front/saving-box/auto-inner-transfer-reservation/retrieve-list
// AutoInnerTransferReservationController
// retrieveList  131

// 履历
///  /front/saving-box/purpose-deposit-transaction/retrieve-list
// PurposeDepositTransactionController
// retrieveList 159
// PurposeDepositTransactionServiceImpl 295
