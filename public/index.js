const tableBody = document.querySelector('table tbody')

const onPageLoad = () => {
  getUsers()
  document.querySelector('#delete-all').addEventListener('click', deleteAllUsers)
}

const getUsers = async () => {
  try {
    const res = await fetch('/api/users')
    const users = await res.json()
    
    users.forEach(user => createTableRow(user))
  }
  catch (error) {
    alert('Could not get users...')
  }
}

const deleteUser = async (user, button) => {
  try {
    const res = await fetch('/api/users/' + user.id, {
      method: 'DELETE'
    })

    if (!res.ok) {
      throw new Error
    }
    
    button.parentElement.parentElement.remove()
  } catch (error) {
    alert('Could not delete user')
  }
}

const deleteAllUsers = async () => {
  try {
    const res = await fetch('/api/users', {
      method: 'DELETE'
    })

    if (!res.ok) {
      throw new Error
    }
    
    tableBody.innerHTML = ''
  } catch (error) {
    alert('Could not delete all users')
  }
}

const createTableRow = (user) => {
  const newRow = document.createElement('tr')

  for (prop in user) {
    const newData = createTableData(user[prop])
    newRow.appendChild(newData)
  }

  newRow.appendChild(createEditLink(user))
  newRow.appendChild(createDeleteButton(user))

  tableBody.appendChild(newRow)
}

const createTableData = (value) => {
  const newData = document.createElement('td')
  newData.innerHTML = value
  return newData
}

const createEditLink = (user) => {
  const newData = document.createElement('td')

  const newAnchor = document.createElement('a')
  newAnchor.innerHTML = 'edit'
  newAnchor.classList.add('edit')
  newAnchor.href = '/user.html?id=' + user.id

  newData.appendChild(newAnchor)
  return newData
}

const createDeleteButton = (user) => {
  const newData = document.createElement('td')

  const newButton = document.createElement('button')
  newButton.innerHTML = 'delete'
  newButton.classList.add('delete')
  newButton.addEventListener('click', (e) => deleteUser(user, e.target))

  newData.appendChild(newButton)
  return newData
}

onPageLoad()
