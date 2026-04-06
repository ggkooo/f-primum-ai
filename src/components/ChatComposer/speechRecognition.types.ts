export type SpeechRecognitionAlternative = {
  transcript: string
}

export type SpeechRecognitionResultLike = {
  isFinal: boolean
  0: SpeechRecognitionAlternative
}

export type SpeechRecognitionEventLike = {
  results: ArrayLike<SpeechRecognitionResultLike>
}

export type SpeechRecognitionInstance = {
  continuous: boolean
  interimResults: boolean
  lang: string
  onresult: ((event: SpeechRecognitionEventLike) => void) | null
  onend: (() => void) | null
  onerror: (() => void) | null
  start: () => void
  stop: () => void
}

export type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor
    webkitSpeechRecognition?: SpeechRecognitionConstructor
  }
}