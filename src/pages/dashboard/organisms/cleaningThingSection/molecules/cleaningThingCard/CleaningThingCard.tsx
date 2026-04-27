import { FC } from 'react'
import { FaPlus, FaMinus, FaList } from 'react-icons/fa'

type CleaningThingData = {
  id: string | number
  name: string
  alertCount: number
}

type CleaningThingCardProps = {
  onAction: (action: 'add' | 'remove' | 'report', id: string | number) => void
  count: number
  data: CleaningThingData
}

const CleaningThingCard: FC<CleaningThingCardProps> = ({
  onAction,
  count,
  data,
}) => {
  const alert = Number(count) <= Number(data.alertCount)

  return (
    <div className="flex flex-col justify-between rounded-[1.75rem] border border-slate-800 bg-slate-950/95 p-5 shadow-soft ring-1 ring-white/10 transition hover:-translate-y-1 hover:border-cyan-500/40 hover:bg-slate-900">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{data.name}</h3>
        </div>

        <div
          className={`rounded-2xl px-4 py-3 text-sm font-semibold ${
            alert
              ? 'bg-rose-500/15 text-rose-200'
              : 'bg-cyan-500/10 text-cyan-200'
          }`}
        >
          {count}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-3 text-slate-300">
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-cyan-300 transition hover:bg-cyan-500/10"
          onClick={() => onAction('add', data.id)}
        >
          <FaPlus />
        </button>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-rose-300 transition hover:bg-rose-500/10"
          onClick={() => onAction('remove', data.id)}
        >
          <FaMinus />
        </button>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-slate-200 transition hover:bg-slate-700"
          onClick={() => onAction('report', data.id)}
        >
          <FaList />
        </button>
      </div>
    </div>
  )
}

export default CleaningThingCard
