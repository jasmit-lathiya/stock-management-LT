import React, { useState, useEffect } from 'react'
import { getDatabase, ref, child, get } from 'firebase/database'
import cleaningThingDetail, {
  cleaningThingIds,
} from '../../../../constants/cleaningThingDetail'
import CleaningThingCard from './molecules/cleaningThingCard'
import Loader from '../../../../molecules/loader'
import getCurrentCount from './helpers/cleaningThingSection.getCurrentCount'
import updateDatabase from '../cleaningThingSection/helpers/cleaningThingSection.updateDatabase'
import getItemName from '../../../../helpers/getItemName'
import Modal from '../../../../molecules/modal'

const CleaningThingSection = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [cleaningThingActionType, setCleaningThingActionType] = useState('')
  const [actionCleaningThingId, setActionCleaningThingId] = useState('')
  const [editCount, setEditCount] = useState('')
  const [editFormError, setEditFormError] = useState('')
  const [cleaningThingCounts, setCleaningThingCounts] = useState({})

  useEffect(() => {
    const db = getDatabase()
    get(child(ref(db), 'cleaningThingsCurrentCount'))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val()
          const counts = {}
          cleaningThingIds.forEach((cleaningThing) => {
            counts[cleaningThing] = data[cleaningThing]
          })
          setCleaningThingCounts(counts)
        } else {
          console.log('No data available')
        }
      })
      .catch(() => {
        console.log('Some Error')
      })
      .finally(() => setIsLoading(false))
  }, [])

  const onCardAction = (actionType, cleaningThingId) => {
    if (actionType === 'report') {
      window.location.href = `/cleaningThingReport?cleaningThingId=${cleaningThingId}`
    } else {
      setCleaningThingActionType(actionType)
      setActionCleaningThingId(cleaningThingId)
    }
  }

  const renderCleaningThingCards = () => {
    return (
      <div className="grid gap-5 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
        {cleaningThingDetail.map((cleaningThing) => (
          <CleaningThingCard
            data={cleaningThing}
            count={cleaningThingCounts[cleaningThing.id]}
            key={cleaningThing.id}
            onAction={onCardAction}
          />
        ))}
      </div>
    )
  }

  const closeForm = () => {
    setCleaningThingActionType('')
    setActionCleaningThingId('')
  }

  const submitEditCleaningThingForm = (event) => {
    event.preventDefault()

    getCurrentCount(actionCleaningThingId).then((currentCount) => {
      if (
        cleaningThingActionType === 'remove' &&
        Number(currentCount) < Number(editCount)
      ) {
        setEditFormError(`Enter number less than ${Number(currentCount) + 1}`)
      } else {
        let updatedCurrentCount = Number(currentCount)
        if (cleaningThingActionType === 'remove') {
          updatedCurrentCount -= Number(editCount)
        } else {
          updatedCurrentCount += Number(editCount)
        }

        updateDatabase(
          actionCleaningThingId,
          cleaningThingActionType,
          updatedCurrentCount,
          editCount,
        )
        getCurrentCount(actionCleaningThingId).then((currentCount) => {
          setCleaningThingCounts((prev) => ({
            ...prev,
            [actionCleaningThingId]: currentCount,
          }))
          setCleaningThingActionType('')
          setActionCleaningThingId('')
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

  const renderCleaningThingForm = () => {
    return (
      <Modal isOpen={!!actionCleaningThingId} onClose={closeForm}>
        <form
          className="dashboardEditForm w-full max-w-xl rounded-[1.75rem] border border-slate-800 bg-slate-900/95 p-6 shadow-soft ring-1 ring-white/10"
          onSubmit={submitEditCleaningThingForm}
        >
          <div className="formHeader flex items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">
                Cleaning Inventory
              </p>
              <h2 className="text-xl font-semibold text-white">
                Cleaning Things
              </h2>
            </div>
            <button
              type="button"
              className="formCloseBtn rounded-2xl bg-slate-800 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-700"
              onClick={closeForm}
            >
              Close
            </button>
          </div>
          <div className="actionHeader mt-6 text-lg font-semibold text-slate-100">
            {`${cleaningThingActionType.charAt(0).toUpperCase() + cleaningThingActionType.slice(1)} ${getItemName(
              cleaningThingDetail,
              actionCleaningThingId,
            )}`}
          </div>
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
              {cleaningThingActionType.toUpperCase()}
            </button>
          </div>
          {editFormError ? (
            <p className="mt-4 rounded-2xl bg-rose-500/10 px-4 py-3 text-sm text-rose-200 ring-1 ring-rose-500/20">
              {editFormError}
            </p>
          ) : null}
        </form>
      </Modal>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-4">
        <h2 className="text-2xl font-semibold text-white">Cleaning Things</h2>
        <p className="text-sm text-slate-400">
          Manage cleaning assets and review usage details.
        </p>
      </div>
      {isLoading ? <Loader /> : renderCleaningThingCards()}
      {actionCleaningThingId ? renderCleaningThingForm() : null}
    </div>
  )
}

export default CleaningThingSection
