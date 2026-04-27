import React, { useState, useEffect } from 'react'

// Firebase
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { getDatabase, child, ref, get } from 'firebase/database'

// Components
import Loader from '../../../../molecules/loader'

// Helpers
import errorCodeMsg from './helpers/loginFormSection.errorCodeMsg'
import saveUserDetails from './helpers/loginFormSection.saveUserDetails'
import NewUserRegistration from './molecules/newUserRegistration/NewUserRegistration'

const LoginFormSection = () => {
  const [emailId, setEmailId] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showSignupPinField, setShowSignupPinField] = useState(false)
  const [signUpPin, setSignUpPin] = useState('')
  const [showNewUserForm, setShowNewUserForm] = useState(false)

  useEffect(() => {
    const db = getDatabase()
    get(child(ref(db), 'signUpPin')).then((snapshot) => {
      setSignUpPin(snapshot.val())
    })
  }, [])

  const handleEmailIdChange = (event) => {
    setEmailId(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const auth = getAuth()

    setIsLoading(true)
    setError('')
    signInWithEmailAndPassword(auth, emailId, password)
      .then((response) => {
        saveUserDetails(response)
        window.location.replace('/dashboard')
      })
      .catch((error) => {
        setError(errorCodeMsg(error))
        setIsLoading(false)
      })
  }

  const renderForm = () => {
    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h2 className="text-3xl font-semibold text-white">Welcome back</h2>
          <p className="mt-2 text-sm text-slate-300">
            Sign in to manage stock, track inventory status, and view detailed
            reports.
          </p>
        </div>

        <div className="space-y-4">
          <label
            className="block text-sm font-medium text-slate-200"
            htmlFor="emailId"
          >
            Business Email
          </label>
          <input
            type="email"
            name="emailId"
            id="emailId"
            placeholder="you@company.com"
            value={emailId}
            className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
            onChange={handleEmailIdChange}
          />
        </div>

        <div className="space-y-4">
          <label
            className="block text-sm font-medium text-slate-200"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
            required
            onChange={handlePasswordChange}
          />
        </div>

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-2xl bg-cyan-500 px-5 py-3 text-base font-semibold text-slate-950 transition hover:bg-cyan-400"
        >
          Sign in
        </button>

        {error ? (
          <p className="rounded-2xl bg-rose-500/10 px-4 py-3 text-sm text-rose-300 ring-1 ring-rose-500/20">
            {error}
          </p>
        ) : null}
      </form>
    )
  }

  const handleSignUpBtnClick = () => {
    setShowSignupPinField(true)
  }

  const handlePinChange = (event) => {
    if (event.target.value === signUpPin) {
      setShowNewUserForm(true)
    }
  }

  const renderSignUpBtn = () => {
    return (
      <div className="mt-6 flex flex-col gap-3 text-sm text-slate-300">
        {showSignupPinField ? (
          <input
            type="password"
            placeholder="Enter sign-up PIN"
            className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
            onChange={handlePinChange}
          />
        ) : (
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white transition hover:border-cyan-500 hover:text-cyan-200"
            onClick={handleSignUpBtnClick}
          >
            Request registration access
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="loginFormSection flex min-h-full flex-col justify-center bg-slate-950 px-8 py-10 sm:px-12">
      <div className="mx-auto w-full max-w-md rounded-[2rem] border border-slate-800 bg-slate-900/95 p-8 shadow-soft ring-1 ring-white/10">
        {isLoading ? <Loader /> : renderForm()}
        {renderSignUpBtn()}
        {showNewUserForm ? <NewUserRegistration /> : null}
      </div>
    </div>
  )
}

export default LoginFormSection
