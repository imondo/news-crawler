const request = require('request');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const utils = require('./../utils/util');
const write = require('./../utils/writer');

class Creeper {

  getList(url) {
    return new Promise(resolve => {
      request.get({url, encoding : null}, function(err, res, body) {
        if (err) {
          console.log(err);
        }
        let html =  iconv.decode(body, 'gbk');
        let $ = cheerio.load(html, {decodeEntities: false});
        resolve($);
      });
    })
  }
  
  /* 163网易新闻 */
  async get163List(ctx) {
    const newsList = [];
    const url = 'https://hunan.news.163.com/';
    const $ = await this.getList(url);
    // 热门新闻
    $('.news-feature').each(function(index, elem) {
      let $elem = $(elem);
      $elem.find('a').each(function(index, e) {
        const $e = $(e);
        const title = $e.text();
        const href = $e.attr('href');
        const hot = $e.parents('h5').length > 0;
        newsList.push({
          title,
          href,
          hot, 
          tag: '网易新闻'
        });
      })
    });
    return newsList;
  }

  async getPeopleList(ctx) {
    const newsList = [];
    const url = 'http://hn.people.com.cn';
    const $ = await this.getList(url);
    // 热门新闻
    $('.p1_content').find('a').each(function(index, elem) {
      const $elem = $(elem);
      const title = $elem.text();
      const href = $elem.attr('href');
      const hot = $elem.parents('h4').length > 0;
      if (title) {
        newsList.push({
          title: title,
          href: `${url}${href}`,
          hot,
          tag: '人民网'
        });
      }
    });

    return newsList;
  }

  // 社会新闻
  async getSocietyList() {
    const newsList = [];
    const url = 'http://hn.people.com.cn';
    const $ = await this.getList(url + '/GB/356883/index.html');
    // 热门新闻
    $('.ej_list_box .list_16').each(function(index, e) {
      $(e).find('a').each(function(index, elem) {
        const $elem = $(elem);
        const title = $elem.text();
        const href = $elem.attr('href');
        const hot = $elem.parents('h4').length > 0;
        if (title) {
          newsList.push({
            title: title,
            href: `${url}${href}`,
            hot,
            tag: '社会'
          });
        }
      });
    })

    return newsList;
  }

  sortHotNews(data) {
    data.sort((a, b) => {
      return b.hot - a.hot
    })
    return data;
  }

  async cnNews() {
    const news_163 = this.get163List();
    const news_people = this.getPeopleList();
    const news_society = this.getSocietyList();
    const list = await Promise.all([news_163, news_people, news_society]);
    const filesName = utils.getNowDate();
    const newsList = this.sortHotNews(list.flat(Infinity));
    write(`${filesName}`, newsList);
    return newsList;
  }
}

module.exports = Creeper;
