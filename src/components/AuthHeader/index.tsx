type AuthHeaderProps = {
  logoSrc: string
  appName: string
  title: string
  subtitle: string
}

export function AuthHeader({ logoSrc, appName, title, subtitle }: AuthHeaderProps) {
  return (
    <div className="fade-in mb-8 flex flex-col items-center gap-1 text-center">
      <div className="mb-3 flex items-center gap-2.5">
        <img src={logoSrc} alt={appName} className="h-9 w-9 rounded-xl" />
        <span className="font-display text-xl font-bold tracking-tight text-zinc-900">{appName}</span>
      </div>
      <h1 className="font-display text-3xl font-extrabold tracking-tight text-[#26312b]">{title}</h1>
      <p className="mt-1 text-sm text-zinc-500">{subtitle}</p>
    </div>
  )
}
