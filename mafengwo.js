const request = require('request-promise')
const cheerio = require('cheerio')

function getAttractions(page) {
  return request({
    url: 'http://www.mafengwo.cn/ajax/router.php',
    method: 'post',
    form: {
      sAct: 'KMdd_StructWebAjax|GetPoisByTag',
      iMddid: 10083,
      iTagId: 0,
      iPage: page,
    },
    transform: body => {
      const html = JSON.parse(body).data.list
      if (html) {
        const $ = cheerio.load(html)
        return $('a').map(function () {
          return 'http://www.mafengwo.cn' + $(this).attr('href')
        }).get()
      } else {
        return null
      }
    }
  })
}

function getAttractionData(url) {
  return request(url).then(html => {
    const $ = cheerio.load(html)
    const $detail = $('.mod-detail dd')
    return {
      name: $('h1').text(),
      name_en: $('.en').text(),
      description: $('.summary').text().replace(/\s+/g, ''),
      phone: $('.tel .content').text(),
      website: $('.item-site .content').text(),
      time_cost: $('.item-time .content').text(),
      traffic: $detail.eq(0).text(),
      ticket: $detail.eq(1).text().trim(),
      opening_time: $detail.eq(2).text().trim(),
      address: $('.mod-location .sub').text(),
    }
  })
}

exports.getAttractions = getAttractions
exports.getAttractionData = getAttractionData
