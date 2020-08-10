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

const update = (req, res) => {
  const foundUser = users.find(user => user.id === parseInt(req.params.id))
  
  if (foundUser) {
    const updatedUser  = {
      id: foundUser.id,
      name: req.body.name,
      age: req.body.age
    }

    const foundUserIndex = users.findIndex(user => user.id === parseInt(req.params.id))
    users.splice(foundUserIndex, 1, updatedUser)

    res.sendStatus(204)
  } else {
    res.sendStatus(404)
  }
}

const remove = (req, res) => {
  const userIndex = users.findIndex(user => user.id === parseInt(req.params.id))

  users.splice(userIndex, 1)

  res.sendStatus(201)
}

module.exports = {
  index,
  get,
  create,
  update,
  remove
}
