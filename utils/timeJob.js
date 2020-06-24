const schedule = require('node-schedule');

/* 定时任务 */
function timeJob (cb) {
  // 每天上午0点执行一次
  // 注意，这里需要加 minute: 0， 否则10点的每一分钟都执行一次。
  schedule.scheduleJob({ hour: 0, minute: 0 }, function () {
      console.log('定时任务执行一次');
      cb && cb();
  });
}

module.exports = timeJob;
