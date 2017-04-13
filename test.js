const assert = require('assert')
const mafengwo = require('./mafengwo')

describe('getAttractions', () => {
  it('正常情况下应该返回一个链接数组', () => {
    return mafengwo.getAttractions(0).then(attractions => {
      attractions.forEach(item => {
        assert.notEqual(item.match('http://www.mafengwo.cn/poi'), null)
      })
    })
  })

  it('参数超出总页数时返回 null', () => {
    return mafengwo.getAttractions(10000).then(attractions => {
      assert.equal(attractions, null)
    })
  })
})

describe('getAttractionData', () => {
  it('泰国大皇宫', () => {
    return mafengwo.getAttractionData('http://www.mafengwo.cn/poi/14375.html').then(data => {
      console.log(data)
      assert(data.name, '大皇宫')
      assert(data.website, 'http://www.palaces.thai.net/')
      assert(data.address, 'Thanon Na Phra Lan, Phra Borom Maha Ratchawang, Phra Nakhon, Bangkok')
    })
  })
})
