import { useCallback, useEffect, useRef, useState } from 'react'
import { AnamnesisInteractiveCard, inferAnamnesisFields } from '../AnamnesisInteractiveCard'
import { AppFooter } from '../AppFooter'
import { ChatComposer } from '../ChatComposer'
import { PromptGrid, type PromptItem } from '../PromptGrid'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { TopBar } from '../TopBar'
import { WelcomeHero } from '../WelcomeHero'
import type { ConversationDetails } from '../../types'

function normalizeSpeechText(content: string): string {
  return content
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    .replace(/~~([^~]+)~~/g, '$1')
    .replace(/\[(.*?)\]\((.*?)\)/g, '$1')
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/^\s*\d+\.\s+/gm, '')
    .replace(/\n{2,}/g, '. ')
    .replace(/\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function splitSpeechText(content: string): string[] {
  const sentences = content
    .split(/(?<=[.!?;:])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean)

  const chunks: string[] = []
  let currentChunk = ''

  for (const sentence of sentences) {
    const nextChunk = currentChunk ? `${currentChunk} ${sentence}` : sentence

    if (nextChunk.length <= 220) {
      currentChunk = nextChunk
      continue
    }

    if (currentChunk) {
      chunks.push(currentChunk)
    }

    currentChunk = sentence
  }

  if (currentChunk) {
    chunks.push(currentChunk)
  }

  return chunks.length ? chunks : [content]
}

function scorePortugueseVoice(voice: SpeechSynthesisVoice): number {
  const voiceName = voice.name.toLowerCase()
  const voiceLang = voice.lang.toLowerCase()

  let score = 0

  if (voiceLang === 'pt-br') {
    score += 100
  } else if (voiceLang.startsWith('pt-br')) {
    score += 90
  } else if (voiceLang.startsWith('pt-')) {
    score += 70
  } else if (voiceLang.startsWith('pt')) {
    score += 50
  }

  if (voice.localService) {
    score += 15
  }

  if (voice.default) {
    score += 10
  }

  if (voiceName.includes('natural')) {
    score += 80
  }

  if (voiceName.includes('microsoft')) {
    score += 35
  }

  if (voiceName.includes('google')) {
    score += 30
  }

  if (voiceName.includes('francisca') || voiceName.includes('luciana') || voiceName.includes('pt-br')) {
    score += 25
  }

  if (voiceName.includes('brasil') || voiceName.includes('brazil')) {
    score += 20
  }

  return score
}

function getPortugueseVoice(): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return null
  }

  const voices = window.speechSynthesis.getVoices()
  const portugueseVoices = voices.filter((voice) => voice.lang.toLowerCase().startsWith('pt'))

  if (!portugueseVoices.length) {
    return null
  }

  return [...portugueseVoices].sort((left, right) => scorePortugueseVoice(right) - scorePortugueseVoice(left))[0] ?? null
}

type MainPanelProps = {
  logoSrc: string
  appName: string
  greeting: string
  title: string
  prompts: PromptItem[]
  composerPlaceholder: string
  selectedConversation?: ConversationDetails | null
  isConversationLoading?: boolean
  conversationError?: string | null
  isSendingMessage?: boolean
  pendingModelMessageId?: number | null
  typingModelMessageId?: number | null
  thinkingStatus?: string
  userName?: string
  modelName?: string
  quickResponsesEnabled?: boolean
  showQuickResponsesOptIn?: boolean
  onTypingComplete?: (messageId: number) => void
  onQuickResponsesDecision?: (enabled: boolean) => void
  onSendMessage?: (message: string) => void | Promise<void>
}

export function MainPanel({
  logoSrc,
  appName,
  greeting,
  title,
  prompts,
  composerPlaceholder,
  selectedConversation = null,
  isConversationLoading = false,
  conversationError = null,
  isSendingMessage = false,
  pendingModelMessageId = null,
  typingModelMessageId = null,
  thinkingStatus = 'Thinking...',
  userName = 'You',
  modelName = 'PrimumAI 3',
  quickResponsesEnabled = true,
  showQuickResponsesOptIn = false,
  onTypingComplete,
  onQuickResponsesDecision,
  onSendMessage,
}: MainPanelProps) {
  const [dismissedInteractiveMessageIds, setDismissedInteractiveMessageIds] = useState<number[]>([])
  const [activeTypingMessageId, setActiveTypingMessageId] = useState<number | null>(null)
  const [typedModelContent, setTypedModelContent] = useState('')
  const [speakingMessageId, setSpeakingMessageId] = useState<number | null>(null)
  const speechSequenceRef = useRef(0)

  const interactiveMessageId = selectedConversation?.messages
    .filter((message) => message.role === 'model' && inferAnamnesisFields(message.content).length > 0)
    .at(-1)?.id

  const typingTargetMessage = selectedConversation?.messages.find(
    (message) => message.role === 'model' && message.id === typingModelMessageId,
  )

  useEffect(() => {
    if (!typingTargetMessage || typingTargetMessage.id === pendingModelMessageId) {
      setActiveTypingMessageId(null)
      setTypedModelContent('')
      return
    }

    setActiveTypingMessageId(typingTargetMessage.id)
    setTypedModelContent('')

    const fullContent = typingTargetMessage.content
    let nextCharacterCount = 0
    const typingStepMs = fullContent.length > 240 ? 10 : 18

    const intervalId = window.setInterval(() => {
      nextCharacterCount += 1

      if (nextCharacterCount >= fullContent.length) {
        window.clearInterval(intervalId)
        setActiveTypingMessageId(null)
        setTypedModelContent('')
        onTypingComplete?.(typingTargetMessage.id)
        return
      }

      setTypedModelContent(fullContent.slice(0, nextCharacterCount))
    }, typingStepMs)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [onTypingComplete, pendingModelMessageId, typingTargetMessage])

  useEffect(() => {
    setDismissedInteractiveMessageIds([])
  }, [selectedConversation?.id])

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return
    }

    const handleVoicesChanged = () => {
      window.speechSynthesis.getVoices()
    }

    handleVoicesChanged()
    window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged)

    return () => {
      window.speechSynthesis.cancel()
      window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged)
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return
    }

    window.speechSynthesis.cancel()
    speechSequenceRef.current += 1
    setSpeakingMessageId(null)
  }, [selectedConversation?.id])

  const handleSpeakMessage = useCallback((messageId: number, content: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return
    }

    if (speakingMessageId === messageId) {
      window.speechSynthesis.cancel()
      speechSequenceRef.current += 1
      setSpeakingMessageId(null)
      return
    }

    const speechText = normalizeSpeechText(content)

    if (!speechText) {
      return
    }

    window.speechSynthesis.cancel()
    speechSequenceRef.current += 1
    const currentSequence = speechSequenceRef.current
    const chunks = splitSpeechText(speechText)
    const voice = getPortugueseVoice()

    setSpeakingMessageId(messageId)

    const speakChunk = (chunkIndex: number) => {
      if (speechSequenceRef.current !== currentSequence) {
        return
      }

      const utterance = new SpeechSynthesisUtterance(chunks[chunkIndex])
      utterance.lang = 'pt-BR'
      utterance.rate = 0.9
      utterance.pitch = 0.98

      if (voice) {
        utterance.voice = voice
      }

      utterance.onend = () => {
        if (speechSequenceRef.current !== currentSequence) {
          return
        }

        if (chunkIndex < chunks.length - 1) {
          window.setTimeout(() => {
            speakChunk(chunkIndex + 1)
          }, 120)
          return
        }

        setSpeakingMessageId((previous) => (previous === messageId ? null : previous))
      }

      utterance.onerror = () => {
        if (speechSequenceRef.current !== currentSequence) {
          return
        }

        setSpeakingMessageId((previous) => (previous === messageId ? null : previous))
      }

      window.speechSynthesis.speak(utterance)
    }

    speakChunk(0)
  }, [speakingMessageId])

  return (
    <section className="relative flex min-h-0 flex-1 flex-col overflow-hidden px-4 py-4 md:px-6 md:py-5">
      <div className="ai-sphere pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full" />

      <TopBar logoSrc={logoSrc} appName={appName} />

      <div className="z-10 flex min-h-0 flex-1 flex-col items-center overflow-hidden">
        {isConversationLoading ? (
          <div className="flex w-full flex-1 items-center justify-center">
            <p className="text-sm font-medium text-zinc-500">Loading conversation...</p>
          </div>
        ) : null}

        {!isConversationLoading && conversationError ? (
          <div className="flex w-full flex-1 items-center justify-center">
            <p className="rounded-xl border border-red-100 bg-red-50 px-4 py-2 text-sm font-medium text-red-600">
              {conversationError}
            </p>
          </div>
        ) : null}

        {!isConversationLoading && !conversationError && selectedConversation ? (
          <div className="flex w-full flex-1 flex-col overflow-hidden">
            <div className="mx-auto mb-3 w-full max-w-4xl px-4 md:px-6">
              <h2 className="truncate text-lg font-semibold tracking-tight text-zinc-700 md:text-xl">
                {selectedConversation.title}
              </h2>
            </div>

            <div className="flex-1 overflow-y-auto pb-3">
              <div className="mx-auto w-full max-w-4xl space-y-4 px-4 md:px-6">
                {selectedConversation.messages.map((message) => (
                  <div key={message.id}>
                    <div
                      className={
                        message.role === 'user'
                          ? 'mb-1 flex items-center justify-end'
                          : 'mb-1 flex items-center justify-between gap-3'
                      }
                    >
                      <p
                        className={
                          message.role === 'user'
                            ? 'text-right text-[11px] font-semibold uppercase tracking-wider text-emerald-700/80'
                            : 'text-left text-[11px] font-semibold uppercase tracking-wider text-zinc-500'
                        }
                      >
                        {message.role === 'user' ? userName : modelName}
                      </p>

                      {message.role === 'model' && message.id !== pendingModelMessageId ? (
                        <button
                          type="button"
                          onClick={() => handleSpeakMessage(message.id, message.content)}
                          disabled={message.id === activeTypingMessageId}
                          className="inline-flex items-center gap-1 rounded-full bg-white/80 px-2.5 py-1 text-[11px] font-medium text-zinc-500 ring-1 ring-zinc-200 transition hover:bg-zinc-50 hover:text-zinc-700 disabled:cursor-not-allowed disabled:opacity-50"
                          aria-label={speakingMessageId === message.id ? 'Stop reading this answer aloud' : 'Read this answer aloud in Portuguese'}
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            {speakingMessageId === message.id ? 'stop_circle' : 'volume_up'}
                          </span>
                          {speakingMessageId === message.id ? 'Stop audio' : 'Read aloud'}
                        </button>
                      ) : null}
                    </div>

                    <div
                      className={
                        message.role === 'user'
                          ? 'ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-900 shadow-[0_4px_14px_rgba(16,185,129,0.10)]'
                          : 'mr-auto w-fit max-w-[85%] rounded-2xl rounded-bl-md bg-white px-4 py-3 text-sm leading-6 text-zinc-700 shadow-[0_6px_20px_rgba(24,24,27,0.06)]'
                      }
                    >
                      {message.role === 'model' && message.id === pendingModelMessageId ? (
                        <div className="flex items-center gap-2 text-sm text-zinc-500" aria-live="polite">
                          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                          <span className="animate-pulse">{thinkingStatus}</span>
                        </div>
                      ) : message.role === 'model' && message.id === activeTypingMessageId ? (
                        <p className="whitespace-pre-wrap">
                          {typedModelContent}
                          <span className="ml-0.5 inline-block h-5 w-0.5 animate-pulse bg-emerald-600 align-middle" />
                        </p>
                      ) : message.role === 'model' ? (
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
                            ul: ({ children }) => <ul className="mb-3 list-disc space-y-1 pl-5 last:mb-0">{children}</ul>,
                            ol: ({ children }) => <ol className="mb-3 list-decimal space-y-1 pl-5 last:mb-0">{children}</ol>,
                            li: ({ children }) => <li>{children}</li>,
                            strong: ({ children }) => <strong className="font-semibold text-zinc-900">{children}</strong>,
                            em: ({ children }) => <em className="italic">{children}</em>,
                            code: ({ children }) => (
                              <code className="rounded-md bg-zinc-100 px-1.5 py-0.5 text-[13px] text-zinc-800">{children}</code>
                            ),
                            pre: ({ children }) => (
                              <pre className="mb-3 overflow-x-auto rounded-lg bg-zinc-100 p-3 text-[13px] text-zinc-800">
                                {children}
                              </pre>
                            ),
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      ) : (
                        <p className="whitespace-pre-wrap">{message.content}</p>
                      )}
                    </div>

                    {showQuickResponsesOptIn && message.id === pendingModelMessageId ? (
                      <div className="mr-auto mt-3 w-full max-w-[85%] rounded-2xl bg-white p-4 shadow-[0_8px_24px_rgba(24,24,27,0.08)] ring-1 ring-zinc-200/80">
                        <p className="text-sm font-semibold text-zinc-800">Do you want to enable quick replies?</p>
                        <p className="mt-1 text-xs text-zinc-500">
                          You can answer anamnesis questions using buttons for a faster workflow.
                        </p>
                        <div className="mt-3 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => onQuickResponsesDecision?.(true)}
                            className="rounded-lg bg-emerald-700 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
                          >
                            Enable
                          </button>
                          <button
                            type="button"
                            onClick={() => onQuickResponsesDecision?.(false)}
                            className="rounded-lg bg-zinc-100 px-3 py-1.5 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-200"
                          >
                            Not now
                          </button>
                        </div>
                      </div>
                    ) : null}

                    {quickResponsesEnabled &&
                    selectedConversation?.clinical_stage === 'anamnesis' &&
                    message.role === 'model' &&
                    message.id === interactiveMessageId &&
                    message.id !== activeTypingMessageId &&
                    !dismissedInteractiveMessageIds.includes(message.id) ? (
                      <div className="mr-auto w-full max-w-[85%]">
                        <AnamnesisInteractiveCard
                          messageContent={message.content}
                          onSubmit={({ plainText }) => {
                            setDismissedInteractiveMessageIds((previous) => [...previous, message.id])
                            void onSendMessage?.(plainText)
                          }}
                        />
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {!isConversationLoading && !conversationError && !selectedConversation ? (
          <div className="flex w-full flex-1 flex-col items-center justify-center">
            <WelcomeHero greeting={greeting} title={title} />
            <PromptGrid prompts={prompts} />
          </div>
        ) : null}

        <ChatComposer
          placeholder={composerPlaceholder}
          isSending={isSendingMessage}
          onSend={onSendMessage}
        />
        <AppFooter />
      </div>
    </section>
  )
}