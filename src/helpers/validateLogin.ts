import { getAuth, onAuthStateChanged } from 'firebase/auth'

function logout() {
  localStorage.clear()
  window.location.replace('/login')
}

function validateLogin() {
  const auth = getAuth()

  onAuthStateChanged(auth, (user) => {
    if (
      !localStorage.getItem('uid') ||
      user.uid !== localStorage.getItem('uid')
    ) {
      logout()
    }
  })
}

export default validateLogin
