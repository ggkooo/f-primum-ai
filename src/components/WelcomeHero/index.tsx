type WelcomeHeroProps = {
  greeting: string
  title: string
}

export function WelcomeHero({ greeting, title }: WelcomeHeroProps) {
  return (
    <div className="mb-8 mt-2 text-center">
      <h2 className="font-display text-2xl font-semibold text-[#26312b] md:text-3xl">{greeting}</h2>
      <h1 className="font-display text-4xl font-extrabold tracking-tight text-[#26312b] md:text-5xl">{title}</h1>
    </div>
  )
}