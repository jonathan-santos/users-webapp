let userId

const onPageLoad = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  userId = urlParams.get('id')
  
  document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault()
    saveUser()
  })

  if (userId) {
    loadUser()
  }
}

const loadUser = async () => {
  try {
    const res = await fetch('/api/users/' + userId)

    if (!res.ok) {
      throw new Error
    }

    const user = await res.json(res)
    document.querySelector('h1').innerHTML = user.name
    document.querySelector('button').innerHTML = 'Update'
    document.querySelector('#name').value = user.name
    document.querySelector('#age').value = user.age
  } catch (error) {
    alert('Could not load user')
  }
}

const saveUser = async () => {
  const user = {
    name: document.querySelector('#name').value,
    age: document.querySelector('#age').value
  }

  try {
    let res

    if (userId) {
      res = await updateUser(user)
    } else {
      res = await saveNewUser(user)
    }

    if (!res.ok) {
      const action = userId ? 'updating' : 'saving new'
      alert(`There\'s been an error ${action} user`)
      return
    }

    window.location.href = './'
  } catch (error) {
    const action = userId ? 'update' : 'save'
    alert(`Could not ${action} the user`)
  }
}

const updateUser = (user) => (
  fetch('/api/users/' + userId, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
)


const saveNewUser = (user) => (
  fetch('/api/users', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
)

onPageLoad()
