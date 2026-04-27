import { useState, useEffect } from 'react'

// Assets
import companyLogoImg from '../../../../assets/companyLogoImg.png'
import { getDatabase, ref, child, get } from 'firebase/database'

const DashboardHeader = () => {
  const [userName, setUserName] = useState('')

  useEffect(() => {
    getUserName()
  }, [])

  const getUserName = () => {
    const db = getDatabase()

    const userId = localStorage.getItem('uid')
    get(child(ref(db), `users/${userId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val()
          setUserName(userData.firstName + ' ' + userData.lastName)
        } else {
          console.log('No data available')
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleLogout = () => {
    localStorage.clear()
    window.location.replace('/login')
  }

  return (
    <div className="dashboardHeader flex flex-col gap-6 rounded-[2rem] border border-slate-800 bg-slate-950/90 p-6 shadow-soft ring-1 ring-white/10 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <img
          src={companyLogoImg}
          alt="Company Logo"
          className="h-14 rounded-2xl border border-slate-700 bg-white p-2"
        />
        <div>
          <p className="text-sm uppercase tracking-[0.15em] text-cyan-400">
            Inventory dashboard
          </p>
          <h1 className="text-2xl font-semibold text-white">
            Hello, {userName || 'User'}
          </h1>
        </div>
      </div>

      <button
        className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-cyan-200 transition hover:bg-slate-800"
        onClick={() => handleLogout()}
      >
        Logout
      </button>
    </div>
  )
}

export default DashboardHeader
