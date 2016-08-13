export function logIn(user) {
  if (!process.env.BROWSER) {
    return
  }

  localStorage.setItem('jwt', user.token)
}

export function loggedIn() {
  if (!process.env.BROWSER) {
    return true
  }

  const token = localStorage.getItem('jwt')
  return !!token
}

export function token() {
  if (!process.env.BROWSER) {
    return null
  }

  const token = localStorage.getItem('jwt')
  return token
}
