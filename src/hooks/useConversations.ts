import { useCallback, useEffect, useState } from 'react'
import { getConversations } from '../services/conversations'
import type { Conversation } from '../types'

type UseConversationsState = {
  conversations: Conversation[]
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function useConversations(): UseConversationsState {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchConversations = useCallback(async () => {
    const response = await getConversations()
    return response.data.conversations
  }, [])

  useEffect(() => {
    let cancelled = false

    async function loadConversations() {
      setIsLoading(true)
      setError(null)

      try {
        const nextConversations = await fetchConversations()

        if (!cancelled) {
          setConversations(nextConversations)
          setError(null)
        }
      } catch {
        if (!cancelled) {
          setError('Unable to load conversations.')
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    void loadConversations()

    return () => {
      cancelled = true
    }
  }, [fetchConversations])

  const refetch = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const nextConversations = await fetchConversations()
      setConversations(nextConversations)
    } catch {
      setError('Unable to load conversations.')
    } finally {
      setIsLoading(false)
    }
  }, [fetchConversations])

  return { conversations, isLoading, error, refetch }
}
