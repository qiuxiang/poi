const assert = require('assert')
const mafengwo = require('./mafengwo')

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
