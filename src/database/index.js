const connection = require("./code.js")

const Query = (query, dependencyArray) => {
  return new Promise((resolve, reject) => {
    connection.query(query, dependencyArray, (err, result) => {
      if (err) return reject(err)

      const data = JSON.parse(JSON.stringify(result))
      return resolve(data)
    })
  })
}

module.exports = Query