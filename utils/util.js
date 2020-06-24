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
          console.log(err);
          reject(err);
        }
        resolve(data.toString());
      })
    })
  }
}