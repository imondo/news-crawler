const schedule = require('node-schedule');
const config = require('./../config');

/* 定时任务 */
function timeJob (cb) {
  schedule.scheduleJob(config.timeJob, function () {
      console.log('定时任务执行一次');
      cb && cb();
  });
}

module.exports = timeJob;
