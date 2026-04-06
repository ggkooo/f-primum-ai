import type { RefObject } from 'react'

type ComposerTextareaProps = {
  value: string
  placeholder: string
  textareaRef: RefObject<HTMLTextAreaElement | null>
  onChange: (nextValue: string) => void
}

export function ComposerTextarea({ value, placeholder, textareaRef, onChange }: ComposerTextareaProps) {
  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="min-h-[92px] w-full resize-none rounded-lg border border-zinc-100 bg-transparent p-2 text-lg text-[#26312b] outline-none placeholder:text-zinc-500 focus:ring-2 focus:ring-[#84faae]"
      placeholder={placeholder}
    />
  )
}