import { Fragment, useMemo, useState } from 'react'
import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react'

const WEEK = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function pad(n) {
  return String(n).padStart(2, '0')
}

function toIsoLocal(d) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

function startOfMonth(year, month) {
  return new Date(year, month, 1)
}

function daysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

function buildCalendarCells(year, month) {
  const firstDay = startOfMonth(year, month).getDay()
  const totalDays = daysInMonth(year, month)
  const prevDays = daysInMonth(year, month - 1)

  const cells = []
  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({
      day: prevDays - i,
      inMonth: false,
      year: month === 0 ? year - 1 : year,
      month: month === 0 ? 11 : month - 1,
    })
  }
  for (let d = 1; d <= totalDays; d++) {
    cells.push({ day: d, inMonth: true, year, month })
  }
  let next = 1
  while (cells.length < 42) {
    cells.push({
      day: next++,
      inMonth: false,
      year: month === 11 ? year + 1 : year,
      month: month === 11 ? 0 : month + 1,
    })
  }
  return cells
}

function CalendarDaysIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function ClockIcon({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function ChevronLeft({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ChevronRight({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function sameDay(a, b) {
  return (
    a &&
    b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export default function DeadlinePicker({ value, onChange, trigger }) {
  const initial = value ? new Date(value) : null

  const [date, setDate] = useState(initial)
  const [hour, setHour] = useState(initial ? initial.getHours() : 9)
  const [minute, setMinute] = useState(initial ? initial.getMinutes() : 0)

  const [viewYear, setViewYear] = useState((initial ?? new Date()).getFullYear())
  const [viewMonth, setViewMonth] = useState((initial ?? new Date()).getMonth())

  const cells = useMemo(() => buildCalendarCells(viewYear, viewMonth), [viewYear, viewMonth])
  const today = new Date()

  const commit = (d, h = hour, m = minute) => {
    if (!d) return
    const next = new Date(d)
    next.setHours(h, m, 0, 0)
    onChange(toIsoLocal(next))
  }

  const handlePrev = () => {
    if (viewMonth === 0) {
      setViewMonth(11)
      setViewYear((y) => y - 1)
    } else {
      setViewMonth((m) => m - 1)
    }
  }
  const handleNext = () => {
    if (viewMonth === 11) {
      setViewMonth(0)
      setViewYear((y) => y + 1)
    } else {
      setViewMonth((m) => m + 1)
    }
  }

  const handleSelect = (cell) => {
    const d = new Date(cell.year, cell.month, cell.day)
    setDate(d)
    if (!cell.inMonth) {
      setViewYear(cell.year)
      setViewMonth(cell.month)
    }
    commit(d, hour, minute)
  }

  return (
    <Popover className="inline-block">
      {({ close }) => (
        <>
          <PopoverButton as={Fragment}>{trigger}</PopoverButton>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-150"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <PopoverPanel
              anchor={{ to: 'top end', gap: 10 }}
              className="flex flex-col gap-3 z-[60] w-[20rem] rounded-xl border border-white/15 bg-[#15121f]/95 p-3 text-[12px] text-white shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)] backdrop-blur-2xl"
            >
              <div className="mb-3 flex items-center gap-2 text-violet-300">
                <CalendarDaysIcon size={14} />
                <span className="text-xs uppercase tracking-[0.18em] text-white/60">Deadline</span>
              </div>

              <div className="flex flex-col">
                <div className="mb-2 flex items-center justify-between px-1">
                  <div className="text-sm text-white/90">
                    {MONTHS[viewMonth]} {viewYear}
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={handlePrev}
                      aria-label="Previous month"
                      className="flex h-7 w-7 items-center justify-center rounded-md bg-white/5 text-white/70 transition-colors hover:bg-white/10"
                    >
                      <ChevronLeft />
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      aria-label="Next month"
                      className="flex h-7 w-7 items-center justify-center rounded-md bg-white/5 text-white/70 transition-colors hover:bg-white/10"
                    >
                      <ChevronRight />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-7">
                  {WEEK.map((w) => (
                    <div
                      key={w}
                      className="flex h-6 w-7 items-center justify-center text-[10px] uppercase tracking-wider text-white/40"
                    >
                      {w}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7">
                  {cells.map((cell, i) => {
                    const cellDate = new Date(cell.year, cell.month, cell.day)
                    const isSelected = sameDay(date, cellDate)
                    const isToday = sameDay(today, cellDate)
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleSelect(cell)}
                        className={[
                          'h-7 w-7 inline-flex items-center justify-center rounded-md text-[11px] transition-colors',
                          cell.inMonth ? 'text-white/80' : 'text-white/25',
                          isSelected
                            ? 'bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white'
                            : isToday
                            ? 'ring-1 ring-violet-400/50'
                            : 'hover:bg-white/10',
                        ].join(' ')}
                      >
                        {cell.day}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="mt-3 border-t border-white/10 pt-3">
                <div className="mb-2 flex items-center gap-2 text-violet-300">
                  <ClockIcon size={12} />
                  <span className="text-[11px] uppercase tracking-[0.18em] text-white/60">Time</span>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={hour}
                    onChange={(e) => {
                      const h = parseInt(e.target.value, 10)
                      setHour(h)
                      commit(date, h, minute)
                    }}
                    className="flex-1 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs text-white outline-none focus:border-violet-400/50 [color-scheme:dark]"
                  >
                    {Array.from({ length: 24 }, (_, i) => (
                      <option key={i} value={i} className="bg-[#15121f]">
                        {pad(i)}
                      </option>
                    ))}
                  </select>
                  <span className="text-white/40">:</span>
                  <select
                    value={minute}
                    onChange={(e) => {
                      const m = parseInt(e.target.value, 10)
                      setMinute(m)
                      commit(date, hour, m)
                    }}
                    className="flex-1 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs text-white outline-none focus:border-violet-400/50 [color-scheme:dark]"
                  >
                    {Array.from({ length: 12 }, (_, i) => i * 5).map((m) => (
                      <option key={m} value={m} className="bg-[#15121f]">
                        {pad(m)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    onChange('')
                    setDate(null)
                    close()
                  }}
                  className="text-[11px] text-white/50 transition-colors hover:text-white/90"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={() => close()}
                  className="rounded-md bg-gradient-to-br from-violet-500 to-fuchsia-500 px-2.5 py-1 text-[11px] text-white"
                >
                  Done
                </button>
              </div>
            </PopoverPanel>
          </Transition>
        </>
      )}
    </Popover>
  )
}
