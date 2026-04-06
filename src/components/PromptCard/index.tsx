type PromptCardProps = {
  icon: string
  text: string
  onClick?: () => void
}

export function PromptCard({ icon, text, onClick }: PromptCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center rounded-xl border border-white/20 bg-white/30 p-6 text-center transition-all duration-300 hover:bg-white/50"
    >
      <span className="material-symbols-outlined mb-3 block text-[#006b1f]">{icon}</span>
      <p className="text-sm font-medium leading-snug text-[#26312b]">{text}</p>
    </button>
  )
}