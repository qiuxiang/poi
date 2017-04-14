const request = require('request')
const proxies = require('./proxies')

module.exports = function (options) {
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