const request = require('request-promise')
const proxies = require('./proxies').proxies

/**
 * @returns {string}
 */
module.exports = async function (options) {
  if (typeof options === 'string') {
    options = {
      url: options,
    }
  }
  options.headers = {
    'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36',
  }
  options.timeout = 6000
  for (let i = 0; i < 10; i += 1) {
    try {
      options.proxy = proxies[parseInt(Math.random() * proxies.length)]
      return await request(options)
    } catch (error) {
      console.warn(options.proxy, error.message)
    }
  }
}