import React, { useState, useEffect } from 'react'
import { getDatabase, ref, child, get } from 'firebase/database'
import chemicalDetail, {
  chemicalIds,
} from '../../../../constants/chemicalDetail'
import ChemicalCard from './molecules/chemicalCard'
import Loader from '../../../../molecules/loader'
import getCurrentCount from './helpers/chemicalSection.getCurrentCount'
import updateDatabase from './helpers/chemicalSection.updateDatabase'
import getItemName from '../../../../helpers/getItemName'
import Modal from '../../../../molecules/modal'

const ChemicalSection = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [chemicalActionType, setChemicalActionType] = useState('')
  const [actionChemicalId, setActionChemicalId] = useState('')
  const [editCount, setEditCount] = useState('')
  const [editFormError, setEditFormError] = useState('')
  const [chemicalCounts, setChemicalCounts] = useState({})

  useEffect(() => {
    const db = getDatabase()
    get(child(ref(db), 'chemicalsCurrentCount'))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val()
          const counts = {}
          chemicalIds.forEach((chemical) => {
            counts[chemical] = data[chemical] || 0
          })
          setChemicalCounts(counts)
        } else {
          console.log('No data available')
        }
      })
      .catch(() => {
        console.log('Some Error')
      })
      .finally(() => setIsLoading(false))
  }, [])

  const onCardAction = (actionType, chemicalId) => {
    if (actionType === 'report') {
      window.location.href = `/chemicalReport?chemicalId=${chemicalId}`
    } else {
      setChemicalActionType(actionType)
      setActionChemicalId(chemicalId)
    }
  }

  const renderChemicalCards = () => {
    return (
      <div className="grid gap-5 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
        {chemicalDetail.map((chemical) => (
          <ChemicalCard
            data={chemical}
            count={chemicalCounts[chemical.id]}
            key={chemical.id}
            onAction={onCardAction}
          />
        ))}
      </div>
    )
  }

  const closeForm = () => {
    setChemicalActionType('')
    setActionChemicalId('')
  }

  const submitEditChemicalForm = (event) => {
    event.preventDefault()

    getCurrentCount(actionChemicalId).then((currentCount) => {
      if (
        chemicalActionType === 'remove' &&
        Number(currentCount) < Number(editCount)
      ) {
        setEditFormError(`Enter number less than ${Number(currentCount) + 1}`)
      } else {
        let updatedCurrentCount = Number(currentCount)
        if (chemicalActionType === 'remove') {
          updatedCurrentCount -= Number(editCount)
        } else {
          updatedCurrentCount += Number(editCount)
        }

        updateDatabase(
          actionChemicalId,
          chemicalActionType,
          updatedCurrentCount,
          editCount,
        )
        getCurrentCount(actionChemicalId).then((currentCount) => {
          setChemicalCounts((prev) => ({
            ...prev,
            [actionChemicalId]: currentCount,
          }))
          setChemicalActionType('')
          setActionChemicalId('')
          setEditFormError('')
          setEditCount('')
        })
      }
    })
  }

  const handleEditQtyChange = (event) => {
    setEditCount(event.target.value)
    setEditFormError('')
  }

  const renderChemicalForm = () => {
    return (
      <Modal isOpen={!!actionChemicalId} onClose={closeForm}>
        <form
          className="dashboardEditForm w-full max-w-xl rounded-[1.75rem] border border-slate-800 bg-slate-900/95 p-6 shadow-soft ring-1 ring-white/10"
          onSubmit={submitEditChemicalForm}
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">
                Inventory action
              </p>
              <h2 className="text-xl font-semibold text-white">Chemicals</h2>
            </div>

            <button
              type="button"
              className="rounded-2xl bg-slate-800 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-700"
              onClick={closeForm}
            >
              Close
            </button>
          </div>

          {/* Action Title */}
          <div className="mt-6 text-lg font-semibold text-slate-100">
            {`${chemicalActionType.charAt(0).toUpperCase() + chemicalActionType.slice(1)} ${getItemName(
              chemicalDetail,
              actionChemicalId,
            )}`}
          </div>

          {/* Input */}
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <label className="w-full">
              <span className="block text-sm font-medium text-slate-300">
                Quantity
              </span>

              <input
                type="number"
                min="1"
                max="999"
                value={editCount}
                onChange={handleEditQtyChange}
                autoFocus
                className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
              />
            </label>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-2xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 sm:w-auto"
            >
              {chemicalActionType.toUpperCase()}
            </button>
          </div>

          {/* Error */}
          {editFormError && (
            <p className="mt-4 rounded-2xl bg-rose-500/10 px-4 py-3 text-sm text-rose-200 ring-1 ring-rose-500/20">
              {editFormError}
            </p>
          )}
        </form>
      </Modal>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-4">
        <h2 className="text-2xl font-semibold text-white">Chemicals</h2>
        <p className="text-sm text-slate-400">
          Review stock levels and manage replenishment.
        </p>
      </div>
      {isLoading ? <Loader /> : renderChemicalCards()}
      {actionChemicalId ? renderChemicalForm() : null}
    </div>
  )
}

export default ChemicalSection
