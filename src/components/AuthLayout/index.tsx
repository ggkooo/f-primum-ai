import type { ReactNode } from 'react'

type AuthLayoutProps = {
  children: ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="h-screen w-screen overflow-hidden bg-[#f3f4f6]">
      <main className="mesh-gradient relative flex h-full w-full items-center justify-center overflow-hidden px-4">
        <div className="ai-sphere pointer-events-none absolute right-0 top-0 h-80 w-80 translate-x-1/3 -translate-y-1/3" />
        <div className="ai-sphere pointer-events-none absolute bottom-0 left-0 h-64 w-64 -translate-x-1/3 translate-y-1/3 opacity-30" />
        <div className="slide-up relative z-10 w-full max-w-md">{children}</div>
      </main>
    </div>
  )
}
