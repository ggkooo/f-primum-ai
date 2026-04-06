import { useState } from 'react'
import type { ReactNode } from 'react'

const authInputClass =
  'w-full rounded-xl border border-white/40 bg-white/60 px-4 py-3 text-sm text-[#26312b] placeholder:text-zinc-400 outline-none ring-0 transition focus:border-[#9ffe9e] focus:bg-white/80 focus:ring-2 focus:ring-[#9ffe9e]/30 backdrop-blur-sm'

type AuthPasswordFieldProps = {
  label: string
  placeholder: string
  autoComplete: string
  labelAction?: ReactNode
  name?: string
  value?: string
  required?: boolean
  disabled?: boolean
  onChange?: (value: string) => void
}

export function AuthPasswordField({
  label,
  placeholder,
  autoComplete,
  labelAction,
  name,
  value,
  required,
  disabled,
  onChange,
}: AuthPasswordFieldProps) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500">{label}</label>
        {labelAction}
      </div>
      <div className="relative">
        <input
          name={name}
          type={isVisible ? 'text' : 'password'}
          value={value}
          required={required}
          disabled={disabled}
          placeholder={placeholder}
          autoComplete={autoComplete}
          onChange={(event) => onChange?.(event.target.value)}
          className={`${authInputClass} pr-11`}
        />
        <button
          type="button"
          disabled={disabled}
          onClick={() => setIsVisible((value) => !value)}
          className="absolute inset-y-0 right-3 flex items-center text-zinc-400 transition hover:text-zinc-600"
          aria-label={isVisible ? 'Hide password' : 'Show password'}
        >
          <span className="material-symbols-outlined text-[18px]">
            {isVisible ? 'visibility_off' : 'visibility'}
          </span>
        </button>
      </div>
    </div>
  )
}
