import { PromptCard } from '../PromptCard'

export type PromptItem = {
  icon: string
  text: string
}

type PromptGridProps = {
  prompts: PromptItem[]
  onPromptSelect?: (prompt: PromptItem) => void
}

export function PromptGrid({ prompts, onPromptSelect }: PromptGridProps) {
  return (
    <div className="mb-8 grid w-full max-w-5xl grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
      {prompts.map((item) => (
        <PromptCard key={item.text} icon={item.icon} text={item.text} onClick={() => onPromptSelect?.(item)} />
      ))}
    </div>
  )
}