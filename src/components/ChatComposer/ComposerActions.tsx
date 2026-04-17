type ComposerActionsProps = {
  isListening: boolean
  isSpeechSupported: boolean
  isSending?: boolean
  canSend?: boolean
  onToggleSpeech: () => void
  onSend?: () => void | Promise<void>
}

export function ComposerActions({
  isListening,
  isSpeechSupported,
  isSending = false,
  canSend = true,
  onToggleSpeech,
  onSend,
}: ComposerActionsProps) {
  return (
    <div className="flex items-center gap-2">
      {isListening && (
        <div className="flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700" aria-live="polite">
          <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
          Ouvindo...
        </div>
      )}
      <button
        onClick={onToggleSpeech}
        disabled={!isSpeechSupported}
        title={isSpeechSupported ? 'Iniciar entrada por voz' : 'Entrada por voz indisponivel neste navegador'}
        className={`grid h-9 w-9 place-items-center rounded-full transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40 ${
          isListening ? 'bg-red-100 text-red-700 hover:bg-red-200' : 'text-zinc-500'
        }`}
      >
        <span className="material-symbols-outlined text-[20px]">{isListening ? 'radio_button_checked' : 'mic'}</span>
      </button>
      <button
        onClick={onSend}
        disabled={isSending || !canSend}
        className="ml-1 grid h-10 w-10 place-items-center rounded-full bg-[#006b1f] text-white transition hover:bg-[#005d1a] disabled:cursor-not-allowed disabled:bg-zinc-300"
      >
        <span
          className={`material-symbols-outlined ${isSending ? 'animate-spin' : ''}`}
          style={{ fontVariationSettings: '"FILL" 1' }}
        >
          {isSending ? 'progress_activity' : 'arrow_upward'}
        </span>
      </button>
    </div>
  )
}