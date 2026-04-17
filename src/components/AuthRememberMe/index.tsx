type AuthRememberMeProps = {
  label?: string
  checked?: boolean
  disabled?: boolean
  onChange?: (checked: boolean) => void
}

export function AuthRememberMe({ label = 'Lembrar de mim por 30 dias', checked, disabled, onChange }: AuthRememberMeProps) {
  return (
    <label className="flex cursor-pointer items-center gap-3 pt-1">
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange?.(event.target.checked)}
        className="h-4 w-4 shrink-0 rounded accent-[#006b1f]"
      />
      <span className="text-xs text-zinc-500">{label}</span>
    </label>
  )
}
