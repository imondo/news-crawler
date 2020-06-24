const fs = require('fs');
const path = require('path');

module.exports = function(dir, data) {
  fs.writeFile( path.resolve(__dirname, `../database/${dir}.json`), JSON.stringify({
    data
  }), function (err) {
    console.log(err);
    if (err) throw err;
    console.log('写入完成');
  });
}