const sqlite3 = require('sqlite3')
const path = require('path')

const openDB = () => (
  new sqlite3.Database(path.resolve(__dirname, 'database.db'))
)

const runDBOperation = (operation, sql, params) => {
  const promise = new Promise((resolve, reject) => {
    const db = openDB()

    db[operation](sql, params, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        const errorMsg = `SQLITE3 ERROR running ${sql}: ${error}`
        console.error(errorMsg)
        reject(errorMsg)
      }
    })

    db.close()
  })

  return promise
}

const run = (sql, params = []) => (
  runDBOperation('run', sql, params)
)

const get = (sql, params = []) => (
  runDBOperation('get', sql, params)
)

const all = (sql, params = []) => (
  runDBOperation('all', sql, params)
)

module.exports = {
  run,
  get,
  all
}