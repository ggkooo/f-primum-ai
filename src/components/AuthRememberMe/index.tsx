type AuthRememberMeProps = {
  label?: string
}

export function AuthRememberMe({ label = 'Remember me for 30 days' }: AuthRememberMeProps) {
  return (
    <label className="flex cursor-pointer items-center gap-3 pt-1">
      <input type="checkbox" className="h-4 w-4 shrink-0 rounded accent-[#006b1f]" />
      <span className="text-xs text-zinc-500">{label}</span>
    </label>
  )
}
