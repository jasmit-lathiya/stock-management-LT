import React from 'react'

// Assets
import companyLogoImg from '../../../../assets/companyLogoImg.png'

const CompanyLogoSection = () => {
  return (
    <div className="flex flex-col justify-center gap-8 px-10 py-12 text-center text-slate-100  bg-slate-950">
      <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full ring-1 ring-white/10 shadow-xl bg-white">
        <img src={companyLogoImg} alt="Company Logo" className="h-18 w-20" />
      </div>
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight text-white">
          Stock Management
        </h1>
        <p className="mx-auto max-w-sm text-sm leading-6 text-slate-400">
          A modern inventory control experience with secure login, powerful
          analytics, and a polished dashboard for chemical and cleaning
          supplies.
        </p>
      </div>
    </div>
  )
}

export default CompanyLogoSection
