const table = document.querySelector('table')
const URL = 'http://localhost:3333'

const getUsers = async () => {
  try {
    const res = await fetch(URL + '/api/users')
    const users = await res.json()
    
    users.forEach(user => createTableRow(user))
  }
  catch (error) {
    alert('Could not get users...')
  }
}

const createTableRow = (user) => {
  const newRow = document.createElement('tr')

  for (prop in user) {
    const newData = createTableData(user[prop])
    newRow.appendChild(newData)
  }
  
  table.appendChild(newRow)
}

const createTableData = (value) => {
  const newData = document.createElement('td')
  newData.innerHTML = value
  return newData
}

getUsers()
