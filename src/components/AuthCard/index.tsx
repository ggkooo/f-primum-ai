import { ReactNode } from 'react'

type AuthCardProps = {
  children: ReactNode
}

export function AuthCard({ children }: AuthCardProps) {
  return (
    <div className="rounded-2xl border border-white/40 bg-white/50 p-8 shadow-[0_24px_60px_rgba(0,107,31,0.09)] backdrop-blur-md">
      {children}
    </div>
  )
}
