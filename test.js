const assert = require('assert')
const mafengwo = require('./mafengwo')
const proxies = require('./proxies')
const request = require('request')

describe('mafengwo', function () {
  this.timeout(6000)

  describe('getAttractions', () => {
    it('should return urls array', async () => {
      const attractions = await mafengwo.getAttractions(1)
      attractions.forEach(item => {
        assert.notEqual(item.match('http://www.mafengwo.cn/poi'), null)
      })
    })

    it('should return null when overflow', async () => {
      const attractions = await mafengwo.getAttractions(100)
      assert.equal(attractions, null)
    })
  })

  describe('getLocation', () => {
    it('should return location of Grand Palace', async () => {
      const location = await mafengwo.getLocation(14375)
      assert(location.lat, '13.750317747733')
      assert(location.lng, '100.49154366005')
    })
  })

  describe('getAttractionData', () => {
    it('should return data of Grand Palace', async () => {
      const data = await mafengwo.getAttractionData('http://www.mafengwo.cn/poi/14375.html')
      assert(data.name, '大皇宫')
      assert(data.website, 'http://www.palaces.thai.net/')
    })
  })
})

describe('proxies', function () {
  this.timeout(10000)

  it('check remote ip', async () => {
    for (const i in proxies) {
      await new Promise((resolve, reject) => {
        request({
          url: 'http://ip.cn',
          proxy: proxies[i],
          timeout: 5000,
          headers: {
            'user-agent': 'curl/7.47.0',
          },
        }, (error, response, body) => {
          console.log(proxies[i])
          if (!error && body) {
            console.log(body)
            resolve()
          } else {
            reject(error)
          }
        })
      })
    }
  })
})
