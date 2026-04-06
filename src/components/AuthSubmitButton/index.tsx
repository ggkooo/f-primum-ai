import { ReactNode } from 'react'

type AuthSubmitButtonProps = {
  icon: string
  children: ReactNode
}

export function AuthSubmitButton({ icon, children }: AuthSubmitButtonProps) {
  return (
    <button
      type="submit"
      className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#9ffe9e] py-3 text-sm font-semibold text-[#006b1f] shadow-[0_4px_20px_rgba(159,254,158,0.5)] transition hover:brightness-105 active:scale-[0.98]"
    >
      <span className="material-symbols-outlined text-[18px]">{icon}</span>
      {children}
    </button>
  )
}
