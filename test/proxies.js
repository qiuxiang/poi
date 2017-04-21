const {describe, it} = require('mocha')
const request = require('request-promise')
const proxies = require('../src/proxies').proxies

describe('proxies', function () {
  this.timeout(30000)

  it('check remote ip', async () => {
    for (const i in proxies) {
      const body = await request({
        url: 'http://ip.cn',
        proxy: proxies[i],
        timeout: 6000,
        headers: {
          'user-agent': 'curl/7.47.0',
        },
      })
      console.log(proxies[i])
      console.log(body)
    }
  })
})
