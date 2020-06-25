const path = require('path');
const fs = require('fs');
const easydate = require('easydate.js');

module.exports = {
  getNowDate() {
    const edate = easydate(new Date());
    return edate.format('yyyy-MM-dd');
  },

  readJsonFile() {
    return new Promise((resolve, reject) => {
      const date = this.getNowDate();
      fs.readFile(path.join( __dirname,  `../database/${date}.json`), (err, data) => {
        if (err) {
          const list = [
            {
              title: '你太早了，每天 6 点开始爬取新闻',
              href: '/',
              hot: false,
              tag: '欢迎您'
            }
          ]
          reject(list);
        } else {
          resolve(JSON.parse(data.toString()).data);
        }
      })
    })
  }
}