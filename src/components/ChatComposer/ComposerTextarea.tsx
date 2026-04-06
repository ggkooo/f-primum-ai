import type { RefObject } from 'react'

type ComposerTextareaProps = {
  value: string
  placeholder: string
  isExpanded: boolean
  textareaRef: RefObject<HTMLTextAreaElement | null>
  onChange: (nextValue: string) => void
  onFocus?: () => void
  onBlur?: () => void
}

export function ComposerTextarea({
  value,
  placeholder,
  isExpanded,
  textareaRef,
  onChange,
  onFocus,
  onBlur,
}: ComposerTextareaProps) {
  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      onFocus={onFocus}
      onBlur={onBlur}
      className={`w-full resize-none rounded-lg border-0 bg-transparent p-2 text-[#26312b] outline-none ring-0 placeholder:text-zinc-500 transition-all duration-300 ease-out focus:border-0 focus:outline-none focus:ring-0 ${
        isExpanded ? 'min-h-[92px] text-lg' : 'min-h-[38px] text-sm'
      }`}
      placeholder={placeholder}
    />
  )
}