const request = require('./request')
const cheerio = require('cheerio')

/**
 * @param {number} page
 * @returns {string[]}
 */
async function getAttractions(page) {
  const body = await request({
    url: 'http://www.mafengwo.cn/ajax/router.php',
    method: 'post',
    form: {
      sAct: 'KMdd_StructWebAjax|GetPoisByTag',
      iMddid: 10083,
      iTagId: 0,
      iPage: page,
    },
  })
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

/**
 * @param {string} url
 * @returns {object}
 */
async function getAttractionData(url) {
  const location = await getLocation(url.match(/(\d+).html/)[1])
  const html = await request(url)
  const $ = cheerio.load(html)
  const $detail = $('.mod-detail dd')
  return {
    url: url,
    name: $('h1').text(),
    name_en: $('.en').text(),
    description: $('.summary').text().replace(/\s+/g, ''),
    city: $('.drop .hd').text(),
    phone: $('.tel .content').text(),
    website: $('.item-site .content').text(),
    time_cost: $('.item-time .content').text(),
    traffic: $detail.eq(0).text().trim(),
    ticket: $detail.eq(1).text().trim(),
    opening_time: $detail.eq(2).text().trim(),
    address: $('.mod-location .sub').text(),
    latitude: location.lat,
    longitude: location.lng,
  }
}

/**
 * @param {string|number} poi_id
 * @returns {{lat: number, lng: number}}
 */
async function getLocation(poi_id) {
  const response = await request(
    `http://www.mafengwo.cn/poi/__pagelet__/pagelet/poiLocationApi?params={"poi_id":"${poi_id}"}`)
  return JSON.parse(response).data['controller_data']['poi']
}

exports.getAttractions = getAttractions
exports.getAttractionData = getAttractionData
exports.getLocation = getLocation
