import { useState } from 'react'
import { getDatabase, ref, set } from 'firebase/database'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

const NewUserRegistration = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleFieldChange = (id, event) => {
    if (id === 'firstName') setFirstName(event.target.value)
    if (id === 'lastName') setLastName(event.target.value)
    if (id === 'email') setEmail(event.target.value)
    if (id === 'password') setPassword(event.target.value)
  }

  const submitNewUserForm = (event) => {
    event.preventDefault()

    const auth = getAuth()
    const db = getDatabase()

    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        return response.user.uid
      })
      .then((uid) => {
        set(ref(db, `users/${uid}`), {
          firstName: firstName,
          lastName: lastName,
          email: email,
        })

        window.location.reload()
      })
  }

  return (
    <div className="rounded-[1.75rem] border border-slate-800 bg-slate-950/95 p-6 shadow-soft ring-1 ring-white/10">
      <form onSubmit={submitNewUserForm} className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-white">
            New User Registration
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Create a new account for system access.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-300">
            <span>First Name</span>
            <input
              required
              className="w-full rounded-2xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-slate-100 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
              onChange={(event) => handleFieldChange('firstName', event)}
            />
          </label>
          <label className="space-y-2 text-sm text-slate-300">
            <span>Last Name</span>
            <input
              required
              className="w-full rounded-2xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-slate-100 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
              onChange={(event) => handleFieldChange('lastName', event)}
            />
          </label>
        </div>

        <label className="space-y-2 text-sm text-slate-300">
          <span>Email</span>
          <input
            type="email"
            required
            className="w-full rounded-2xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-slate-100 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
            onChange={(event) => handleFieldChange('email', event)}
          />
        </label>

        <label className="space-y-2 text-sm text-slate-300">
          <span>Password</span>
          <input
            required
            className="w-full rounded-2xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-slate-100 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
            onChange={(event) => handleFieldChange('password', event)}
          />
        </label>

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
        >
          Register User
        </button>
      </form>
    </div>
  )
}

export default NewUserRegistration
