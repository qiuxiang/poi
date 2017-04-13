'use strict'
const spawn = require('child_process').spawn
for (let i = 0; i < 12; i += 1) {
  spawn('polipo', ['socksParentProxy=127.0.0.1:' + (1081 + i), 'proxyPort=' + (8081 + i)])
}
