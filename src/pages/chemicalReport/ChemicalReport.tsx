import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import Loader from '../../molecules/loader'
import getChemicalHistory from './helpers/chemicalReport.getChemicalHistory'
import getCurrentCount from '../dashboard/organisms/chemicalSection/helpers/chemicalSection.getCurrentCount'
import getAllUserData from '../../helpers/getAllUserData'
import { FaHome } from 'react-icons/fa'
import getItemName from '../../helpers/getItemName'
import chemicalDetail from '../../constants/chemicalDetail'

const ChemicalReport = () => {
  const chemicalId = new URLSearchParams(window.location.search).get(
    'chemicalId',
  )

  const [currentCount, setCurrentCount] = useState(0)
  const [isHistoryLoading, setIsHistoryLoading] = useState(true)
  const [isCurrentCountLoading, setIsCurrentCountLoading] = useState(true)
  const [userData, setUserData] = useState(null)
  const [reportData, setReportData] = useState([])

  useEffect(() => {
    getAllUserData().then((data) => setUserData(data))

    getCurrentCount(chemicalId).then((count) => {
      setCurrentCount(count)
      setIsCurrentCountLoading(false)
    })

    getChemicalHistory(chemicalId).then((data) => {
      setReportData(data)
      setIsHistoryLoading(false)
    })
  }, [chemicalId])

  const getUserName = (userId) => {
    if (!userData) return userId
    const userInfo = userData[userId]
    if (userInfo?.firstName) {
      return userInfo.firstName + ' ' + userInfo.lastName
    }
    return userId
  }

  const renderReportRow = (data, index) => {
    const badgeStyles =
      data.type === 'add'
        ? 'bg-emerald-500/10 text-emerald-300'
        : 'bg-rose-500/10 text-rose-300'
    return (
      <tr key={index} className="hover:bg-slate-900/50">
        <td
          className={`whitespace-nowrap px-5 py-4 text-slate-200 ${badgeStyles}`}
        >
          {index + 1}
        </td>
        <td className={`px-5 py-4 text-slate-200 ${badgeStyles}`}>
          {data.date}
        </td>
        <td className={`px-5 py-4 text-slate-200 ${badgeStyles}`}>
          {data.count}
        </td>
        <td className={`px-5 py-4 text-slate-200 ${badgeStyles}`}>
          {getUserName(data.updatedBy)}
        </td>
      </tr>
    )
  }

  const renderReportData = () => {
    return (
      <div className="overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-900/95 shadow-soft ring-1 ring-white/10">
        <table className="min-w-full border-collapse text-left text-sm text-slate-200">
          <thead className="bg-slate-950/80 text-slate-100">
            <tr>
              <th className="py-4 px-5">Sr. No.</th>
              <th className="py-4 px-5">Date</th>
              <th className="py-4 px-5">Count</th>
              <th className="py-4 px-5">Updated By</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((reportDataElement, index) =>
              renderReportRow(reportDataElement, index),
            )}
          </tbody>
        </table>
      </div>
    )
  }

  const redirectToDashboard = () => {
    window.location.href = '/dashboard'
  }

  if (!chemicalId) {
    return <Navigate to="/dashboard" />
  }

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <div className="flex flex-col gap-4 rounded-[2rem] border border-slate-800 bg-slate-950/95 p-6 shadow-soft ring-1 ring-white/10 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-cyan-400 transition hover:bg-slate-800"
              onClick={redirectToDashboard}
            >
              <FaHome className="text-xl" />
            </button>
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">
                Chemical report
              </p>
              <h1 className="text-2xl font-semibold text-white">
                {getItemName(chemicalDetail, chemicalId)} Overview
              </h1>
            </div>
          </div>
          {!isCurrentCountLoading && (
            <div className="rounded-3xl bg-slate-900 px-5 py-3 text-lg font-semibold text-white">
              Current count : {currentCount}
            </div>
          )}
        </div>
        {isHistoryLoading ? <Loader /> : renderReportData()}
      </div>
    </div>
  )
}

export default ChemicalReport
