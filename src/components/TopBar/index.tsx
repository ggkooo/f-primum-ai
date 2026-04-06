type TopBarProps = {
  logoSrc: string
  appName: string
}

export function TopBar({ logoSrc, appName }: TopBarProps) {
  return (
    <header className="z-20 mb-5 flex items-center md:hidden">
      <div className="flex items-center gap-2 md:hidden">
        <img src={logoSrc} alt={appName} className="h-8 w-8 rounded-lg" />
        <span className="font-display text-lg font-bold text-zinc-900">{appName}</span>
      </div>
    </header>
  )
}