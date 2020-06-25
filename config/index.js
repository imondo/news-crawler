module.exports = {
  port: 5080,
  timeJob: { 
    hour: 6,
    minute: 0,
    second: 0
  } // 定时任务，每天 6 点执行一次任务; 注意: 这里需要加 minute: 0， 否则10点的每一分钟都执行一次。
}