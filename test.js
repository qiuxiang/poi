const assert = require('assert')
const mafengwo = require('./mafengwo')
const proxies = require('./proxies')
const request = require('request')

describe('mafengwo', () => {
  describe('getAttractions', () => {
    it('should return urls array', () => {
      return mafengwo.getAttractions(1).then(attractions => {
        attractions.forEach(item => {
          assert.notEqual(item.match('http://www.mafengwo.cn/poi'), null)
        })
      })
    })

    it('should return null when overflow', () => {
      return mafengwo.getAttractions(100).then(attractions => {
        assert.equal(attractions, null)
      })
    })
  })

  describe('getLocation', () => {
    it('should return location of Grand Palace', () => {
      return mafengwo.getLocation(14375).then(data => {
        assert(data.lat, '13.750317747733')
        assert(data.lng, '100.49154366005')
      })
    })
  })

  describe('getAttractionData', () => {
    it('should return data of Grand Palace', () => {
      return mafengwo.getAttractionData('http://www.mafengwo.cn/poi/14375.html').then(data => {
        console.log(data)
        assert(data.name, '大皇宫')
        assert(data.website, 'http://www.palaces.thai.net/')
      })
    })
  })
})

describe('proxies', function () {
  this.timeout(6000)

  function checkRemoteIP(proxy) {
    return new Promise(resolve => {
      request({
        url: 'http://ip.cn',
        proxy: proxy,
        timeout: 5000,
        headers: {
          'user-agent': 'curl/7.47.0',
        },
      }, (error, response, body) => {
        console.log(proxy)
        console.log(body)
        resolve()
      })
    })
  }

  it('check remote ip', () => {
    return Promise.all(proxies.map(proxy => checkRemoteIP(proxy)))
  })
})
