module.exports = {
  NODE_EN: process.argv[process.argv.length - 1],
  port: 5080,
  timeJob: [1, 5, 9, 13, 17, 21]  // 定时任务，每隔 4 小时执行一次任务
  // { 
  //   hour: 6,
  //   minute: 0,
  //   second: 0
  // }
}