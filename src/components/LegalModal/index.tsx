import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'

type LegalModalProps = {
  isOpen: boolean
  title: string
  onClose: () => void
  children: ReactNode
}

export function LegalModal({ isOpen, title, onClose, children }: LegalModalProps) {
  useEffect(() => {
    if (!isOpen) {
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-stretch justify-center bg-[#0f172a]/50 p-3 backdrop-blur-sm md:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      <div
        className="fade-in flex h-full w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/50 bg-white/95 shadow-[0_24px_60px_rgba(0,107,31,0.14)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3 border-b border-zinc-200 px-5 py-4 md:px-7 md:py-5">
          <h2 className="font-display text-xl font-bold tracking-tight text-[#26312b] md:text-2xl">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-700"
            aria-label="Close modal"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 text-sm leading-relaxed text-zinc-600 md:px-7 md:py-6 md:text-[15px]">
          {children}
        </div>

        <div className="flex justify-end border-t border-zinc-200 px-5 py-4 md:px-7 md:py-5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-[#9ffe9e] px-4 py-2 text-sm font-semibold text-[#006b1f] transition hover:brightness-105"
          >
            Got it
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
