const spawn = require('child_process').spawn
const servers = [
  'vip12-us1-2.ssfq.org',
  'vip12-us2-137.ssfq.org',
  'vip12-us3-35.ssfq.org',
  'vip12-us4-106.ssfq.org',
  'vip12-us5-106.ssfq.org',
  'vip12-rb1-84.ssfq.org',
  'vip12-rb2-152.ssfq.org',
  'vip12-rb3-101.ssfq.org',
  'vip12-rb4-233.ssfq.org',
  'vip12-sgp1-254.ssfq.org',
  'vip12-sgp2-73.ssfq.org',
  'vip12-sgp3-39.ssfq.org',
  'vip12-hk1-190.ssfq.org',
  'vip12-hk2-213.ssfq.org',
  'vip12-hk3-119.ssfq.org',
]
servers.forEach((ip, i) => {
  spawn('sslocal', ['-s', ip, '-p', '24343', '-m', 'rc4-md5', '-k', 'lkjhgfdsa', '-l', 1081 + i])
  spawn('polipo', [
    'logFile=polipo.log',
    'diskCacheRoot=',
    'socksParentProxy=127.0.0.1:' + (1081 + i),
    'proxyPort=' + (8081 + i)])
})
