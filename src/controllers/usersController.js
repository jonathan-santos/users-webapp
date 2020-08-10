const { users } = require('../data/mock')

const index = (req, res) => {
  res.status(200).json(users)
}

const get = (req, res) => {
  const user = users.find(u => (
    u.id === Number(req.params.id)
  ))

  if (!user) {
    res.status(404).json('User not found')
  }
  
  res.status(200).json(user)
}

module.exports = {
  index,
  get
}
