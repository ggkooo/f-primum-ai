import type { ReactNode } from 'react'

type AuthSubmitButtonProps = {
  icon: string
  children: ReactNode
  disabled?: boolean
  isLoading?: boolean
  loadingText?: string
}

export function AuthSubmitButton({ icon, children, disabled, isLoading, loadingText }: AuthSubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled || isLoading}
      className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#9ffe9e] py-3 text-sm font-semibold text-[#006b1f] shadow-[0_4px_20px_rgba(159,254,158,0.5)] transition hover:brightness-105 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
    >
      <span className="material-symbols-outlined text-[18px]">{icon}</span>
      {isLoading ? (loadingText ?? 'Signing in...') : children}
    </button>
  )
}
