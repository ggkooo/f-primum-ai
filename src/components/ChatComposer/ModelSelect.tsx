import { useEffect, useRef, useState } from 'react'

type ModelSelectProps = {
  modelOptions: string[]
}

export function ModelSelect({ modelOptions }: ModelSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedModel, setSelectedModel] = useState(modelOptions[0] ?? 'PrimumAI 3')
  const menuRef = useRef<HTMLDivElement>(null)
  const activeModel = modelOptions.includes(selectedModel) ? selectedModel : (modelOptions[0] ?? 'PrimumAI 3')

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen((open) => !open)}
        className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-zinc-600 transition hover:bg-zinc-100"
      >
        <span className="material-symbols-outlined text-sm">bolt</span>
        {activeModel}
        <span className="material-symbols-outlined text-sm">expand_more</span>
      </button>

      {isOpen && (
        <div className="absolute left-0 top-[calc(100%+8px)] z-30 min-w-[180px] overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-lg">
          {modelOptions.map((modelName) => (
            <button
              key={modelName}
              onClick={() => {
                setSelectedModel(modelName)
                setIsOpen(false)
              }}
              className="flex w-full items-center justify-between px-3 py-2 text-left text-xs font-medium text-zinc-700 transition hover:bg-zinc-100"
            >
              <span>{modelName}</span>
              {activeModel === modelName && <span className="material-symbols-outlined text-sm text-[#006b1f]">check</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}