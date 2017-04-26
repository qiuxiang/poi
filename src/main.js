const mafengwo = require('./mafengwo')
const async = require('async')
const NeDB = require('nedb')
const db = new NeDB({filename: 'output/mafengwo.db', autoload: true})
const queue = async.queue((url, callback) => {
  db.findOne({url: url}, (error, data) => {
    if (data) {
      callback()
    } else {
      mafengwo.getAttractionData(url).then(callback)
    }
  })
}, 4)

function push(urls) {
  return new Promise(resolve => queue.push(urls, data => {
    if (data) {
      console.log(data.name)
      db.insert(data)
    }
    if (queue.idle()) {
      resolve()
    }
  }))
}

async function main() {
  for (let page = 1; page <= 63; page += 1) {
    console.log(page)
    const attractions = await mafengwo.getAttractions(page)
    await push(attractions)
  }
}

main()
