'use strict'
const mafengwo = require('./mafengwo')
const NeDB = require('nedb')
const db = new NeDB({filename: 'database', autoload: true})

// for (let page = 1; page <= 12; page += 1) {
//   mafengwo.getAttractions(page).then(attractions => {
//     console.log(page)
//     attractions.forEach(url => {
//       db.findOne({url: url}, (e, data) => {
//         if (data === null) {
//           mafengwo.getAttractionData(url).then(data => db.insert(data))
//         }
//       })
//     })
//   })
// }
db.find({}, (error, data) => console.log(JSON.stringify(data)))
