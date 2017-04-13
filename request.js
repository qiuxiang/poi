const request = require('request')

const proxies = [
  // 'http://127.0.0.1:8081',
  'http://127.0.0.1:8082',
  'http://127.0.0.1:8083',
  'http://127.0.0.1:8084',
  'http://127.0.0.1:8084',
  // 'http://127.0.0.1:8085',
  'http://127.0.0.1:8086',
  'http://127.0.0.1:8087',
  'http://127.0.0.1:8088',
  'http://127.0.0.1:8089',
  'http://127.0.0.1:8090',
  'http://127.0.0.1:8091',
  'http://127.0.0.1:8092',
  'http://127.0.0.1:8093',
  'http://127.0.0.1:8094',
  'http://127.0.0.1:8095',
]

module.exports = function _request(options) {
  if (typeof options === 'string') {
    options = {
      url: options,
    }
  }
  options.headers = {
    'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36',
  }
  options.timeout = 6000
  options.proxy = proxies[parseInt(Math.random() * proxies.length)]
  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if (error || response.statusCode === 200) {
        resolve(body)
      } else {
        reject()
      }
    })
  })
}