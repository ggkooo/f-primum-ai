const authInputClass =
  'w-full rounded-xl border border-white/40 bg-white/60 px-4 py-3 text-sm text-[#26312b] placeholder:text-zinc-400 outline-none ring-0 transition focus:border-[#9ffe9e] focus:bg-white/80 focus:ring-2 focus:ring-[#9ffe9e]/30 backdrop-blur-sm'

type AuthTextFieldProps = {
  label: string
  type: 'text' | 'email'
  placeholder: string
  autoComplete: string
  name?: string
  value?: string
  required?: boolean
  disabled?: boolean
  onChange?: (value: string) => void
}

export function AuthTextField({
  label,
  type,
  placeholder,
  autoComplete,
  name,
  value,
  required,
  disabled,
  onChange,
}: AuthTextFieldProps) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-500">{label}</label>
      <input
        name={name}
        type={type}
        value={value}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(event) => onChange?.(event.target.value)}
        className={authInputClass}
      />
    </div>
  )
}
