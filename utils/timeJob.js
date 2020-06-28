const schedule = require('node-schedule');
const config = require('./../config');

const rule = new schedule.RecurrenceRule();

rule.hour = config.timeJob;
rule.minute = 0;

/* 定时任务 */
function timeJob (cb) {
  schedule.scheduleJob(rule, function () {
      console.log('定时任务执行一次');
      cb && cb();
  });
}

module.exports = timeJob;
