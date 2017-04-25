const fs = require('fs')
const NeDB = require('nedb')
const name = 'mafengwo'
const db = new NeDB({filename: `../output/${name}.db`, autoload: true})
db.find({}, (error, data) =>
  fs.writeFile(`../output/${name}.json`, JSON.stringify(data)))
