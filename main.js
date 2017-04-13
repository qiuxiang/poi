'use strict'
const mafengwo = require('./mafengwo')
const NeDB = require('nedb')
const db = new NeDB({filename: 'database', autoload: true})

async function loadData(url) {
  return new Promise(resolve =>
    db.findOne({url: url}, (error, data) => resolve(data))
  )
}

async function fetchData(url) {
  const data = await loadData(url)
  if (data === null) {
    const data = await mafengwo.getAttractionData(url)
    console.log(data)
    db.insert(data)
  }
}

async function main() {
  for (let page = 1; page <= 63; page += 1) {
    const attractions = await mafengwo.getAttractions(page)
    console.log(page)
    for (let i = 0; i < attractions.length; i += 1) {
      await fetchData(attractions[i])
    }
  }
}

main()

// db.find({}, (error, data) => console.log(JSON.stringify(data)))
