import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import logo from '../../assets/img/logo.png'
import { MainPanel } from '../../components/MainPanel'
import { Sidebar } from '../../components/Sidebar'
import { useConversations } from '../../hooks'
import { createChat } from '../../services/chat'
import { deleteConversationById, getConversationById, getConversations } from '../../services/conversations'
import { clearAuthSession, getAuthSession } from '../../services/auth'
import type { Conversation, ConversationDetails } from '../../types'

type ChatPageLocationState = {
  bootstrapConversation?: ConversationDetails
}

const THINKING_UPDATES = [
  'Thinking... organizing the main symptoms.',
  'Almost there... connecting relevant clinical patterns.',
  'Refining the analysis... checking associated signs.',
  'Structuring the reply... prioritizing clarity and safety.',
  'Adjusting context... correlating anamnesis details.',
  'Validating consistency... preparing the next step.',
  'Finalizing the reasoning... preparing focused questions.',
  'Consolidating details... the answer is almost ready.',
]

const PENDING_CONVERSATION_PREFIX = 'pending-new-chat-'

function isPendingConversationId(conversationId: string): boolean {
  return conversationId.startsWith(PENDING_CONVERSATION_PREFIX)
}

function toConversationListItem(conversation: ConversationDetails): Conversation {
  return {
    id: conversation.id,
    user_id: conversation.user_id,
    title: conversation.title,
    last_message_at: conversation.last_message_at,
    created_at: conversation.created_at,
    updated_at: conversation.updated_at,
    clinical_stage: conversation.clinical_stage,
    clinical_snapshot: conversation.clinical_snapshot,
  }
}

const prompts = [
  { icon: 'monitor_heart', text: 'Review symptoms and guide the next anamnesis questions' },
  { icon: 'assignment', text: 'Summarize the clinical picture from the reported symptoms' },
  { icon: 'warning', text: 'Identify red flags and indicate whether urgent evaluation is needed' },
  { icon: 'lab_profile', text: 'Organize possible differential hypotheses and recommended next steps' },
]

export function ChatPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams<{ id?: string }>()
  const authSession = getAuthSession()
  const userName = authSession?.user.name ?? 'User'
  const userInitial = userName.charAt(0).toUpperCase() || 'U'
  const { conversations, isLoading: isSidebarLoading, error: sidebarError, refetch: refetchConversations } = useConversations()
  const [chatList, setChatList] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<ConversationDetails | null>(null)
  const [isConversationLoading, setIsConversationLoading] = useState(false)
  const [conversationError, setConversationError] = useState<string | null>(null)
  const [isSendingMessage, setIsSendingMessage] = useState(false)
  const [pendingModelMessageId, setPendingModelMessageId] = useState<number | null>(null)
  const [typingModelMessageId, setTypingModelMessageId] = useState<number | null>(null)
  const [thinkingStatus, setThinkingStatus] = useState(THINKING_UPDATES[0])
  const [quickResponsesEnabled, setQuickResponsesEnabled] = useState(true)
  const [showQuickResponsesOptIn, setShowQuickResponsesOptIn] = useState(false)
  const conversationRequestIdRef = useRef(0)
  const thinkingTimerRef = useRef<number | null>(null)
  const thinkingIndexRef = useRef(0)

  const stopThinkingCycle = useCallback(() => {
    if (thinkingTimerRef.current) {
      window.clearInterval(thinkingTimerRef.current)
      thinkingTimerRef.current = null
    }
  }, [])

  const startThinkingCycle = useCallback(() => {
    stopThinkingCycle()
    thinkingIndexRef.current = 0
    setThinkingStatus(THINKING_UPDATES[0])

    thinkingTimerRef.current = window.setInterval(() => {
      const nextIndex = (thinkingIndexRef.current + 1) % THINKING_UPDATES.length
      thinkingIndexRef.current = nextIndex
      setThinkingStatus(THINKING_UPDATES[nextIndex])
    }, 12000)
  }, [stopThinkingCycle])

  const resolveCreatedConversation = useCallback(
    async (message: string, knownConversationIds: Set<string>) => {
      const normalizedTitle = message.trim().toLowerCase()

      for (let attempt = 0; attempt < 6; attempt += 1) {
        try {
          const response = await getConversations()
          const matchedConversation = response.data.conversations.find((item) => {
            if (knownConversationIds.has(item.id)) {
              return false
            }

            return item.title.trim().toLowerCase() === normalizedTitle
          })

          if (matchedConversation) {
            return matchedConversation
          }
        } catch {
          return null
        }

        await new Promise((resolve) => {
          window.setTimeout(resolve, 500)
        })
      }

      return null
    },
    [],
  )

  const loadConversationById = useCallback(async (chatId: string) => {
    const requestId = conversationRequestIdRef.current + 1
    conversationRequestIdRef.current = requestId
    setSelectedConversation(null)
    setIsConversationLoading(true)
    setConversationError(null)

    try {
      const response = await getConversationById(chatId)

      if (conversationRequestIdRef.current !== requestId) {
        return
      }

      setSelectedConversation(response.data.conversation)
    } catch {
      if (conversationRequestIdRef.current !== requestId) {
        return
      }

      setConversationError('Unable to load this conversation right now.')
    } finally {
      if (conversationRequestIdRef.current === requestId) {
        setIsConversationLoading(false)
      }
    }
  }, [])

  const handleLogout = () => {
    clearAuthSession()
    navigate('/login', { replace: true })
  }

  const handleChatSelect = (chatId: string | number) => {
    navigate(`/chat/${String(chatId)}`)
  }

  const handleNewChat = () => {
    stopThinkingCycle()
    conversationRequestIdRef.current += 1
    setSelectedConversation(null)
    setIsConversationLoading(false)
    setConversationError(null)
    setIsSendingMessage(false)
    setPendingModelMessageId(null)
    setTypingModelMessageId(null)
    setQuickResponsesEnabled(true)
    setShowQuickResponsesOptIn(false)
    navigate('/chat')
  }

  const handleTypingComplete = useCallback((messageId: number) => {
    setTypingModelMessageId((previous) => (previous === messageId ? null : previous))
  }, [])

  const handleQuickResponsesDecision = (enabled: boolean) => {
    setQuickResponsesEnabled(enabled)
    setShowQuickResponsesOptIn(false)
  }

  const handleChatDelete = async (chatId: string | number) => {
    const conversationId = String(chatId)

    try {
      await deleteConversationById(conversationId)
      setChatList((previous) => previous.filter((item) => item.id !== conversationId))
      void refetchConversations()

      if (params.id === conversationId) {
        handleNewChat()
      }
    } catch {
      setConversationError('Unable to delete this conversation right now. Please try again.')
    }
  }

  const handleSendMessage = async (message: string) => {
    setIsSendingMessage(true)
    setConversationError(null)
    setTypingModelMessageId(null)
    startThinkingCycle()

    const nowIso = new Date().toISOString()
    const userMessageId = Date.now()
    const pendingMessageId = userMessageId + 1
    const safeUserId = authSession?.user.id ?? 0
    const baselineConversation = selectedConversation
    const baseMessages = baselineConversation?.messages ?? []
    const activeConversationId =
      baselineConversation?.id && !isPendingConversationId(baselineConversation.id) ? baselineConversation.id : undefined
    const isFirstMessageOfConversation = baseMessages.length === 0
    const pendingConversationId = `${PENDING_CONVERSATION_PREFIX}${userMessageId}`

    if (isFirstMessageOfConversation) {
      setShowQuickResponsesOptIn(true)
    }

    const optimisticConversation: ConversationDetails = {
      id: baselineConversation?.id ?? pendingConversationId,
      user_id: baselineConversation?.user_id ?? safeUserId,
      title: baselineConversation?.title ?? message,
      last_message_at: nowIso,
      created_at: baselineConversation?.created_at ?? nowIso,
      updated_at: nowIso,
      clinical_stage: baselineConversation?.clinical_stage ?? 'anamnesis',
      clinical_snapshot: baselineConversation?.clinical_snapshot ?? null,
      messages: [
        ...baseMessages,
        {
          id: userMessageId,
          conversation_id: baselineConversation?.id ?? pendingConversationId,
          role: 'user',
          content: message,
          created_at: nowIso,
          updated_at: nowIso,
        },
        {
          id: pendingMessageId,
          conversation_id: baselineConversation?.id ?? pendingConversationId,
          role: 'model',
          content: 'Thinking...',
          created_at: nowIso,
          updated_at: nowIso,
        },
      ],
    }

    setPendingModelMessageId(pendingMessageId)
    setSelectedConversation(optimisticConversation)

    if (!activeConversationId) {
      const pendingConversationItem = toConversationListItem(optimisticConversation)

      setChatList((previous) => {
        const withoutPendingDuplicate = previous.filter((item) => item.id !== pendingConversationItem.id)
        return [pendingConversationItem, ...withoutPendingDuplicate]
      })

      const knownConversationIds = new Set(chatList.map((item) => item.id))

      void resolveCreatedConversation(message, knownConversationIds).then((createdConversation) => {
        if (!createdConversation) {
          return
        }

        const bootstrappedPendingConversation: ConversationDetails = {
          ...optimisticConversation,
          id: createdConversation.id,
          title: createdConversation.title,
          created_at: createdConversation.created_at,
          updated_at: createdConversation.updated_at,
          last_message_at: createdConversation.last_message_at,
          clinical_stage: createdConversation.clinical_stage,
          clinical_snapshot: createdConversation.clinical_snapshot,
          messages: optimisticConversation.messages.map((item) => ({
            ...item,
            conversation_id: createdConversation.id,
          })),
        }

        setChatList((previous) => {
          const withoutPendingItem = previous.filter((item) => item.id !== pendingConversationId)
          const withoutRealDuplicate = withoutPendingItem.filter((item) => item.id !== createdConversation.id)
          return [createdConversation, ...withoutRealDuplicate]
        })

        setSelectedConversation((previous) => {
          if (!previous || previous.id !== pendingConversationId) {
            return previous
          }

          return bootstrappedPendingConversation
        })

        if (!params.id) {
          navigate(`/chat/${createdConversation.id}`, {
            replace: true,
            state: { bootstrapConversation: bootstrappedPendingConversation },
          })
        }
      })
    }

    try {
      const response = await createChat({
        message,
        ...(activeConversationId ? { conversation_id: activeConversationId } : {}),
      })
      stopThinkingCycle()

      const finalNowIso = new Date().toISOString()
      const bootstrapConversation: ConversationDetails = {
        id: response.data.conversation_id,
        user_id: optimisticConversation.user_id,
        title: optimisticConversation.title,
        last_message_at: finalNowIso,
        created_at: optimisticConversation.created_at,
        updated_at: finalNowIso,
        clinical_stage: optimisticConversation.clinical_stage,
        clinical_snapshot: optimisticConversation.clinical_snapshot,
        messages: optimisticConversation.messages.map((item) => {
          if (item.id !== pendingMessageId) {
            return {
              ...item,
              conversation_id: response.data.conversation_id,
            }
          }

          return {
            ...item,
            conversation_id: response.data.conversation_id,
            content: response.data.response,
            updated_at: finalNowIso,
          }
        }),
      }

      setPendingModelMessageId(null)
      setTypingModelMessageId(pendingMessageId)
      setSelectedConversation(bootstrapConversation)
      setShowQuickResponsesOptIn(false)

      setChatList((previous) => {
        const sanitizedPrevious = previous.filter((item) => item.id !== pendingConversationId)
        const existingIndex = sanitizedPrevious.findIndex((item) => item.id === response.data.conversation_id)
        const nextItem = toConversationListItem(bootstrapConversation)

        if (existingIndex >= 0) {
          const updated = [...sanitizedPrevious]
          updated[existingIndex] = nextItem
          return updated
        }

        return [nextItem, ...sanitizedPrevious]
      })

      void refetchConversations()

      navigate(`/chat/${response.data.conversation_id}`, {
        state: { bootstrapConversation },
      })
    } catch {
      stopThinkingCycle()
      const errorNowIso = new Date().toISOString()

      setSelectedConversation((previous) => {
        if (!previous) {
          return previous
        }

        return {
          ...previous,
          updated_at: errorNowIso,
          messages: previous.messages.map((item) => {
            if (item.id !== pendingMessageId) {
              return item
            }

            return {
              ...item,
              content: 'Unable to get an AI response right now. Please try again in a moment.',
              updated_at: errorNowIso,
            }
          }),
        }
      })

      setPendingModelMessageId(null)
      setTypingModelMessageId(null)
      setShowQuickResponsesOptIn(false)
      setChatList((previous) => previous.filter((item) => item.id !== pendingConversationId))
      setConversationError('Unable to send your message right now.')
    } finally {
      setIsSendingMessage(false)
    }
  }

  useEffect(() => {
    setChatList((previous) => {
      const pendingItems = previous.filter((item) => isPendingConversationId(item.id))
      return [...pendingItems, ...conversations.filter((item) => !pendingItems.some((pending) => pending.id === item.id))]
    })
  }, [conversations])

  useEffect(() => {
    const routeConversationId = params.id
    const routeState = location.state as ChatPageLocationState | null
    const bootstrapConversation = routeState?.bootstrapConversation

    if (routeConversationId && bootstrapConversation?.id === routeConversationId) {
      setSelectedConversation(bootstrapConversation)
      setIsConversationLoading(false)
      setConversationError(null)
      return
    }

    if (!routeConversationId) {
      conversationRequestIdRef.current += 1
      setSelectedConversation(null)
      setIsConversationLoading(false)
      setConversationError(null)
      setTypingModelMessageId(null)
      return
    }

    setTypingModelMessageId(null)
    void loadConversationById(routeConversationId)
  }, [loadConversationById, location.state, params.id])

  useEffect(() => {
    return () => {
      stopThinkingCycle()
    }
  }, [stopThinkingCycle])

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#f3f4f6]">
      <main className="mesh-gradient relative flex h-full w-full overflow-hidden">
        <Sidebar
          logoSrc={logo}
          appName="PrimumAI"
          chats={chatList.map((c) => ({ id: c.id, title: c.title }))}
          isLoading={isSidebarLoading}
          error={sidebarError}
          userInitial={userInitial}
          userName={userName}
          planName="Personal Plan"
          onNewChat={handleNewChat}
          onChatSelect={handleChatSelect}
          onChatDelete={handleChatDelete}
          onRetryLoad={() => {
            void refetchConversations()
          }}
          onOpenSettings={() => {
            // Settings screen is not implemented yet.
          }}
          onLogout={handleLogout}
        />

        <div className="relative min-w-0 flex flex-1 flex-col p-4">
          <div className="pointer-events-none absolute inset-4 overflow-hidden rounded-3xl">
            <div className="floating-sphere absolute -left-20 -top-8 h-48 w-48 rounded-full" />
            <div className="floating-sphere delay absolute -bottom-12 -right-14 h-44 w-44 rounded-full" />
          </div>

          <div className="relative z-10 flex h-full flex-col overflow-hidden rounded-3xl border border-white/70 bg-white/88 shadow-[0_18px_40px_rgba(15,23,42,0.12)] backdrop-blur-md">
            <MainPanel
              logoSrc={logo}
              appName="PrimumAI"
              greeting={`Good evening, ${userName}`}
              title="Can I help you with anything?"
              prompts={prompts}
              composerPlaceholder="How can PrimumAI help you today?"
              selectedConversation={selectedConversation}
              isConversationLoading={isConversationLoading}
              conversationError={conversationError}
              isSendingMessage={isSendingMessage}
              pendingModelMessageId={pendingModelMessageId}
              typingModelMessageId={typingModelMessageId}
              thinkingStatus={thinkingStatus}
              userName={userName}
              modelName="PrimumAI 3"
              quickResponsesEnabled={quickResponsesEnabled}
              showQuickResponsesOptIn={showQuickResponsesOptIn}
              onTypingComplete={handleTypingComplete}
              onQuickResponsesDecision={handleQuickResponsesDecision}
              onSendMessage={handleSendMessage}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
