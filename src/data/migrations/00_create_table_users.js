const db = require('../db')

const run = () => {
  db.run('CREATE TABLE users (name text)')
}

module.exports = run
