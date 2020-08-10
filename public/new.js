document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault()
  saveUser()
})

const saveUser = async () => {
  const user = {
    name: document.querySelector('#name').value,
    age: document.querySelector('#age').value
  }

  try {
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })

    if (!res.ok) {
      throw new Error
    }

    window.location.href = './'

    console.log('yay')
  } catch (error) {
    alert('Could not save user')
    return
  }
}