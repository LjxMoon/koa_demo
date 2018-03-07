const mysql = require('promise-mysql')

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'test',
  connectionLimit: 10
})

// const sqlConnection = (query, values) => {
//   pool.query(query).then((rows) => {
//     values = rows
//   })
// }

module.exports = pool
