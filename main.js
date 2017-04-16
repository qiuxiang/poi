const mafengwo = require('./mafengwo')
const NeDB = require('nedb')
const db = new NeDB({filename: 'database', autoload: true})

async function fetchData(url) {
  const data = await new Promise(resolve =>
    db.findOne({url: url}, (error, data) => resolve(data))
  )
  if (data === null) {
    const data = await mafengwo.getAttractionData(url)
    console.log(data.name)
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
