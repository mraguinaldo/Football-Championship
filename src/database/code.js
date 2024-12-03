const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: 'localhost',
  user: "root",
  password: '',
  database: 'FootballChampionship',
})

connection.connect((err) => {
  const sucessMessage = "Connection made successfully"

  if (err) return console.log("Connection not granted", err)

  console.log(sucessMessage)
})


module.exports = connection