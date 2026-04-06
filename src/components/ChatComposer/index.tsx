import { useEffect, useRef, useState } from 'react'
import { ComposerActions } from './ComposerActions'
import { ComposerTextarea } from './ComposerTextarea'
import { ModelSelect } from './ModelSelect'
import { useSpeechToText } from './useSpeechToText'

type ChatComposerProps = {
  placeholder: string
  modelOptions?: string[]
  onSend?: () => void
}

export function ChatComposer({
  placeholder,
  modelOptions = ['PrimumAI 3'],
  onSend,
}: ChatComposerProps) {
  const MAX_TEXTAREA_HEIGHT = 220
  const [promptValue, setPromptValue] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { isListening, isSpeechSupported, speechError, toggleSpeech } = useSpeechToText({
    language: 'pt-BR',
    onTranscriptChange: setPromptValue,
    getCurrentText: () => promptValue,
  })

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

  return (
    <div className="w-full max-w-3xl">
      <div className="rounded-xl border border-[#a3b0a81f] bg-white p-4 shadow-[0_20px_40px_rgba(0,107,31,0.06)]">
        <ComposerTextarea
          value={promptValue}
          placeholder={placeholder}
          textareaRef={textareaRef}
          onChange={setPromptValue}
        />

        {speechError && <p className="mt-2 text-xs font-medium text-red-600">{speechError}</p>}

        <div className="mt-4 flex items-center justify-between gap-3">
          <ModelSelect modelOptions={modelOptions} />
          <ComposerActions
            isListening={isListening}
            isSpeechSupported={isSpeechSupported}
            onToggleSpeech={toggleSpeech}
            onSend={onSend}
          />
        </div>
      </div>
    </div>
  )
}