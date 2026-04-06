import { AppFooter } from '../AppFooter'
import { ChatComposer } from '../ChatComposer'
import { PromptGrid, type PromptItem } from '../PromptGrid'
import { TopBar } from '../TopBar'
import { WelcomeHero } from '../WelcomeHero'

type MainPanelProps = {
  logoSrc: string
  appName: string
  greeting: string
  title: string
  prompts: PromptItem[]
  composerPlaceholder: string
}

export function MainPanel({ logoSrc, appName, greeting, title, prompts, composerPlaceholder }: MainPanelProps) {
  return (
    <section className="relative flex min-h-0 flex-1 flex-col overflow-hidden px-4 py-4 md:px-6 md:py-5">
      <div className="ai-sphere pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full" />

      <TopBar logoSrc={logoSrc} appName={appName} />

      <div className="z-10 flex min-h-0 flex-1 flex-col items-center overflow-hidden">
        <div className="flex w-full flex-1 flex-col items-center justify-center">
          <WelcomeHero greeting={greeting} title={title} />
          <PromptGrid prompts={prompts} />
        </div>
        <ChatComposer placeholder={composerPlaceholder} />
        <AppFooter />
      </div>
    </section>
  )
}