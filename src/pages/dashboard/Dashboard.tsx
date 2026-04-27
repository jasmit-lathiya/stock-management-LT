import React, { useEffect } from 'react'

// Components
import ChemicalSection from './organisms/chemicalSection'
import CleaningThingSection from './organisms/cleaningThingSection'
import DashboardHeader from './organisms/dashboardHeader'

// Helpers
import validateLogin from '../../helpers/validateLogin'

const Dashboard = () => {
  useEffect(() => {
    validateLogin()
  }, [])
  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-10 color-white">
      <div className="mx-auto w-full max-w-[1500px] space-y-8">
        <DashboardHeader />
        <div className="flex flex-col gap-8">
          <div className="space-y-8 rounded-[2rem] border border-slate-800 bg-slate-900/90 p-6 shadow-soft ring-1 ring-white/10">
            <ChemicalSection />
          </div>
          <div className="space-y-8 rounded-[2rem] border border-slate-800 bg-slate-900/90 p-6 shadow-soft ring-1 ring-white/10">
            <CleaningThingSection />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
