import { useEffect, useRef, useState } from 'react'
import { ComposerActions } from './ComposerActions'
import { ComposerTextarea } from './ComposerTextarea'
import { ModelSelect } from './ModelSelect'
import { useSpeechToText } from './useSpeechToText'

type ChatComposerProps = {
  placeholder: string
  modelOptions?: string[]
  isSending?: boolean
  onSend?: (message: string) => void | Promise<void>
}

export function ChatComposer({
  placeholder,
  modelOptions = ['PrimumAI 3'],
  isSending = false,
  onSend,
}: ChatComposerProps) {
  const MAX_TEXTAREA_HEIGHT = 220
  const [promptValue, setPromptValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { isListening, isSpeechSupported, speechError, toggleSpeech } = useSpeechToText({
    onTranscriptChange: setPromptValue,
    getCurrentText: () => promptValue,
  })
  const isExpanded = isFocused || isListening || promptValue.trim().length > 0

  useEffect(() => {
    if (!textareaRef.current) {
      return
    }

    const textarea = textareaRef.current
    textarea.style.height = 'auto'
    const nextHeight = Math.min(textarea.scrollHeight, MAX_TEXTAREA_HEIGHT)
    textarea.style.height = `${nextHeight}px`
    textarea.style.overflowY = textarea.scrollHeight > MAX_TEXTAREA_HEIGHT ? 'auto' : 'hidden'
  }, [promptValue])

  const handleSend = async () => {
    const message = promptValue.trim()

    if (!message || isSending) {
      return
    }

    setPromptValue('')
    await onSend?.(message)
  }

  const canSend = promptValue.trim().length > 0

  return (
    <div className="w-full max-w-3xl">
      <div
        className={`rounded-xl border border-[#a3b0a81f] bg-white shadow-[0_20px_40px_rgba(0,107,31,0.06)] transition-all duration-300 ease-out ${
          isExpanded ? 'p-4' : 'p-2.5'
        }`}
      >
        <ComposerTextarea
          value={promptValue}
          placeholder={placeholder}
          isExpanded={isExpanded}
          textareaRef={textareaRef}
          onChange={setPromptValue}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {speechError && <p className="mt-2 text-xs font-medium text-red-600">{speechError}</p>}

        <div
          className={`flex items-center justify-between gap-3 overflow-hidden transition-all duration-300 ease-out ${
            isExpanded ? 'mt-4 max-h-16 opacity-100' : 'mt-1 max-h-10 opacity-90'
          }`}
        >
          <ModelSelect modelOptions={modelOptions} />
          <ComposerActions
            isListening={isListening}
            isSpeechSupported={isSpeechSupported}
            isSending={isSending}
            canSend={canSend}
            onToggleSpeech={toggleSpeech}
            onSend={handleSend}
          />
        </div>
      </div>
    </div>
  )
}