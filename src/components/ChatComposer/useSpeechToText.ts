import { useEffect, useRef, useState } from 'react'
import type { SpeechRecognitionInstance } from './speechRecognition.types'

type UseSpeechToTextParams = {
  language?: string
  onTranscriptChange: (nextValue: string) => void
  getCurrentText: () => string
}

type UseSpeechToTextReturn = {
  isListening: boolean
  isSpeechSupported: boolean
  speechError: string | null
  toggleSpeech: () => void
}

function composePromptWithSpeech(baseText: string, finalTranscript: string, interimTranscript = '') {
  const parts = [baseText.trim(), finalTranscript.trim(), interimTranscript.trim()].filter(Boolean)
  return parts.join(' ')
}

export function useSpeechToText({
  language = 'pt-BR',
  onTranscriptChange,
  getCurrentText,
}: UseSpeechToTextParams): UseSpeechToTextReturn {
  const [isListening, setIsListening] = useState(false)
  const [speechError, setSpeechError] = useState<string | null>(null)
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null)
  const baseTextBeforeSpeechRef = useRef('')
  const finalTranscriptRef = useRef('')
  const SpeechRecognitionApi = window.SpeechRecognition ?? window.webkitSpeechRecognition
  const isSpeechSupported = Boolean(SpeechRecognitionApi)

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop()
    }
  }, [])

  function toggleSpeech() {
    if (!SpeechRecognitionApi) {
      setSpeechError('Voice input is not supported in this browser.')
      return
    }

    if (isListening) {
      recognitionRef.current?.stop()
      setIsListening(false)
      return
    }

    const recognition = new SpeechRecognitionApi()
    recognition.lang = language
    recognition.continuous = true
    recognition.interimResults = true

    baseTextBeforeSpeechRef.current = getCurrentText()
    finalTranscriptRef.current = ''

    recognition.onresult = (event) => {
      let finalTranscript = ''
      let interimTranscript = ''

      for (let index = 0; index < event.results.length; index += 1) {
        const result = event.results[index]
        if (result.isFinal) {
          finalTranscript += result[0].transcript
        } else {
          interimTranscript += result[0].transcript
        }
      }

      finalTranscriptRef.current = finalTranscript
      onTranscriptChange(composePromptWithSpeech(baseTextBeforeSpeechRef.current, finalTranscript, interimTranscript))
    }

    recognition.onerror = () => {
      setSpeechError('Could not transcribe audio. Please try again.')
      setIsListening(false)
    }

    recognition.onend = () => {
      onTranscriptChange(composePromptWithSpeech(baseTextBeforeSpeechRef.current, finalTranscriptRef.current))
      setIsListening(false)
    }

    recognitionRef.current = recognition
    setSpeechError(null)
    setIsListening(true)
    recognition.start()
  }

  return {
    isListening,
    isSpeechSupported,
    speechError,
    toggleSpeech,
  }
}