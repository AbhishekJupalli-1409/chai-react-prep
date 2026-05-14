import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import './App.css'
import ClickSpark from './Components/ClickSpark'
import Topographic from './Components/Topographic'
import DeadlinePicker from './Components/DeadlinePicker'

const TODOS_STORAGE_KEY = '04todolist-todos'

function defaultTodos() {
  return [
    {
      id: nanoid(),
      text: 'Finish the proyectos today and everything by the end every of the day',
      completed: false,
      priority: 'high',
      deadline: '',
    },
  ]
}

function readTodosFromStorage() {
  try {
    const raw = localStorage.getItem(TODOS_STORAGE_KEY)
    if (!raw) return defaultTodos()
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return defaultTodos()
    return parsed.map((t) => ({
      id: String(t.id ?? nanoid()),
      text: String(t.text ?? t.msg ?? ''),
      completed: Boolean(t.completed ?? t.strike),
      priority: ['low', 'medium', 'high'].includes(t.priority) ? t.priority : 'medium',
      deadline: typeof t.deadline === 'string' ? t.deadline : '',
    }))
  } catch {
    return defaultTodos()
  }
}

function ArrowRightIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function SquarePenIcon({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 20h9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function XIcon({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

function ClockIcon({ size = 11 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.2" />
      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  )
}

function SparklesIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3l1.8 4.6L18 9.4l-4.2 1.8L12 16l-1.8-4.8L6 9.4l4.2-1.8L12 3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M19 14l.9 2.1L22 17l-2.1.9L19 20l-.9-2.1L16 17l2.1-.9L19 14z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  )
}

function formatDeadline(value) {
  if (!value) return 'Set deadline'
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return 'Set deadline'
  return d.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export default function App() {
  const [todos, setTodos] = useState(readTodosFromStorage)
  const [inputValue, setInputValue] = useState('')
  const [selectedPriority, setSelectedPriority] = useState('medium')
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    try {
      localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos))
    } catch {
      /* quota / private mode */
    }
  }, [todos])

  const openEdit = (todo) => {
    setEditingId(todo.id)
    setInputValue(todo.text)
    setSelectedPriority(todo.priority)
    setIsPopoverOpen(true)
  }

  const closePopover = () => {
    setIsPopoverOpen(false)
    setEditingId(null)
    setInputValue('')
  }

  const addTodo = () => {
    if (!inputValue.trim()) return
    const newTodo = {
      id: nanoid(),
      text: inputValue.trim(),
      completed: false,
      priority: selectedPriority,
      deadline: '',
    }
    setTodos((prev) => [...prev, newTodo])
    setInputValue('')
    setIsPopoverOpen(false)
  }

  const submitPopover = () => {
    if (!inputValue.trim()) return
    if (editingId !== null) {
      setTodos((prev) =>
        prev.map((t) => (t.id === editingId ? { ...t, text: inputValue.trim() } : t))
      )
      closePopover()
    } else {
      addTodo()
    }
  }

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    )
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const updateDeadline = (id, deadline) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, deadline } : t)))
  }

  return (
    <ClickSpark sparkColor="#f0abfc" sparkSize={10} sparkRadius={14} sparkCount={8} duration={400}>
      <div className="relative flex min-h-screen w-full items-start justify-center overflow-x-hidden bg-[#0b0a14] px-6 py-12 sm:px-10 sm:py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(139,92,246,0.35),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(236,72,153,0.25),transparent_55%),radial-gradient(ellipse_at_center,rgba(59,130,246,0.18),transparent_60%)]" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-screen"
          style={{ ['--stroke-0']: '#a78bfa' }}
        >
          <Topographic />
        </div>

        <div className="relative w-[92%] max-w-[1400px] lg:w-[70%] flex flex-col gap-10">
          <div className="mb-10 text-center">
            <h1
              className="text-white tracking-tight"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 400,
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
              }}
            >
              <span className="text-[44px] sm:text-[52px] lg:text-[60px]">
                My{' '}
                <em className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-rose-200 bg-clip-text text-transparent">
                  Todos
                </em>{' '}
                List
              </span>
            </h1>
            
          </div>

          <div className="mb-8">
            <div
              onClick={() => setIsPopoverOpen(true)}
              className="flex h-[4rem] cursor-text items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-6 py-5 text-base shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-2xl transition-colors hover:border-white/20 mt-[35px] mb-[35px]"
            >
              <span className="flex-1 text-white/30">
                {inputValue || 'What do you need to accomplish today?   A journey of a thousand miles begins with a single step.'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-[43px] mb-[43px]">
            {todos.map((todo) => (
              <div
                key={todo.id}
                className="group relative flex min-h-[220px] flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.07] p-5 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl transition-colors hover:border-white/20"
              >
                <div className="mb-3 flex items-start justify-between">
                  <label className="relative cursor-pointer">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                      className="peer sr-only"
                    />
                    <span className="block h-5 w-5 rounded-md border border-white/30 bg-white/5 transition-all duration-200 peer-checked:border-transparent peer-checked:bg-gradient-to-br peer-checked:from-violet-500 peer-checked:to-fuchsia-500 peer-focus:ring-2 peer-focus:ring-violet-400/40" />
                    <svg
                      className="pointer-events-none absolute left-1 top-1 h-3 w-3 text-white opacity-0 transition-opacity peer-checked:opacity-100"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M2 6.5L5 9.5L10 3" />
                    </svg>
                  </label>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => openEdit(todo)}
                      title="Edit"
                      className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-amber-300 to-orange-500 text-white shadow-[0_4px_12px_-2px_rgba(251,146,60,0.5),inset_0_1px_0_rgba(255,255,255,0.3)] transition-transform hover:scale-105 active:scale-95"
                    >
                      <SquarePenIcon size={12} />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteTodo(todo.id)}
                      title="Delete"
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 to-red-600 text-white shadow-[0_4px_12px_-2px_rgba(239,68,68,0.55),inset_0_1px_0_rgba(255,255,255,0.3)] transition-transform hover:scale-110 active:scale-95"
                    >
                      <XIcon size={12} />
                    </button>
                  </div>
                </div>

                <p
                  className={`mt-1 min-h-0 flex-1 overflow-hidden text-[15px] leading-[1.45] transition-all duration-300 ${
                    todo.completed ? 'text-white/40 line-through' : 'text-white/90'
                  }`}
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 5,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {todo.text}
                </p>
                <div className="mt-4 flex flex-row justify-end">
                <DeadlinePicker
                  value={todo.deadline}
                  onChange={(v) => updateDeadline(todo.id, v)}
                  trigger={
                    <button
                      type="button"
                      className="mt-4 inline-flex shrink-0 cursor-pointer items-center gap-1.5 self-end rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-white/70 transition-colors hover:border-white/20"
                    >
                      <ClockIcon size={11} />
                      <span className="truncate">{formatDeadline(todo.deadline)}</span>
                    </button>
                  }
                />
                </div>
              </div>
            ))}
          </div>

          {todos.length === 0 && (
            <div className="py-16 text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                <SparklesIcon size={18} />
              </div>
              <p
                className="text-white/80"
                style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontStyle: 'italic' }}
              >
                A clear mind awaits.
              </p>
              <p className="mt-1 text-sm text-white/40">Add your first task to begin.</p>
            </div>
          )}
        </div>

        {isPopoverOpen && (
          <div
            className="fixed inset-0 z-50 flex animate-in fade-in items-center justify-center bg-black/40 p-8 backdrop-blur-xl duration-200"
            onClick={closePopover}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl rounded-4xl border border-white/15 bg-white/[0.08] p-2 shadow-[0_30px_80px_-20px_rgba(139,92,246,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-2xl"
            >
              <div className="flex flex-col px-8 py-8" style={{ minHeight: '14rem' }}>
                <textarea
                  autoFocus
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      submitPopover()
                    }
                    if (e.key === 'Escape') closePopover()
                  }}
                  placeholder="What do you need to accomplish?"
                  className="w-full flex-1 resize-none border-none bg-transparent text-left text-white/95 caret-violet-300 outline-none placeholder:text-white/30"
                  style={{ fontSize: '1.75rem', lineHeight: 1.2 }}
                />
                <div className="mt-8 -mb-2 -mr-2 flex justify-end">
                  <button
                    type="button"
                    onClick={submitPopover}
                    title={editingId !== null ? 'Save' : 'Add'}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 via-fuchsia-500 to-rose-500 text-white shadow-[0_8px_20px_-6px_rgba(168,85,247,0.6),inset_0_1px_0_rgba(255,255,255,0.25)]"
                  >
                    <ArrowRightIcon size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ClickSpark>
  )
}
