const db = require('../data/db')

const index = async (req, res) => {
  const users = await db.all('SELECT * FROM users')
  res.status(200).json(users)
}

const get = async (req, res) => {
  const userFound = await db.get('SELECT * FROM users WHERE id = ?', [
    req.params.id
  ])

  if (userFound) {
    res.status(200).json(userFound)
  } else {
    res.status(404).json('User not found')
  }
}

const create = (req, res) => {
  db.run('INSERT INTO users(name, age) VALUES(?, ?)', [
    req.body.name,
    req.body.age
  ])

  res.sendStatus(201)
}

const update = async (req, res) => {
  const foundUser = await db.get('SELECT * FROM users WHERE id = ?', [
    req.params.id
  ])
  
  if (foundUser) {
    await db.run('UPDATE users SET name = ?, age = ? WHERE id = ?', [
      req.body.name,
      req.body.age,
      req.params.id
    ])

    res.sendStatus(204)
  } else {
    res.sendStatus(404)
  }
}

const remove = async (req, res) => {
  await db.run('DELETE FROM users WHERE id = ?', [
    req.params.id
  ])

  res.sendStatus(204)
}

module.exports = {
  index,
  get,
  create,
  update,
  remove
}
