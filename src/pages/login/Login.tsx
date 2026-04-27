import React from 'react'

// Components
import CompanyLogoSection from './organisms/companyLogoSection'
import LoginFormSection from './organisms/loginFormSection'

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-slate-950">
      <div className="glass-card grid w-full max-w-6xl overflow-hidden rounded-[2rem] bg-slate-900/90 shadow-soft ring-1 ring-white/10 lg:grid-cols-[1.1fr_0.9fr]">
        <CompanyLogoSection />
        <LoginFormSection />
      </div>
    </div>
  )
}

export default Login
