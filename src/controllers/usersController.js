const { users } = require('../data/mock')

const index = (req, res) => {
  res.status(200).json(users)
}

const get = (req, res) => {
  const userFound = users.find(user => (
    user.id === parseInt(req.params.id)
  ))

  if (userFound) {
    res.status(200).json(userFound)
  } else {
    res.status(404).json('User not found')
  }
}

const create = (req, res) => {
  const lastUser = users[users.length - 1]
  const newUserId = lastUser ? lastUser.id + 1 : 0

  users.push({
    id: newUserId,
    name: req.body.name,
    age: req.body.age
  })

  res.sendStatus(201)
}

module.exports = {
  index,
  get,
  create
}
