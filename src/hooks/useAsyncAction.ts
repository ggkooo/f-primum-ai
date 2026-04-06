import { useCallback, useEffect, useRef, useState } from 'react'

type AsyncActionState = {
  isLoading: boolean
  error: string | null
}

function resolveFallbackMessage(error: unknown, fallbackMessage: string): string {
  if (error instanceof Error && error.message) {
    return error.message
  }

  return fallbackMessage
}

export function useAsyncAction() {
  const [state, setState] = useState<AsyncActionState>({
    isLoading: false,
    error: null,
  })
  const requestIdRef = useRef(0)
  const isMountedRef = useRef(true)

  useEffect(() => {
    return () => {
      isMountedRef.current = false
    }
  }, [])

  const setSafeState = useCallback((nextState: AsyncActionState, requestId: number) => {
    if (!isMountedRef.current) {
      return
    }

    if (requestIdRef.current !== requestId) {
      return
    }

    setState(nextState)
  }, [])

  const execute = useCallback(
    async <T>(action: () => Promise<T>, fallbackErrorMessage: string): Promise<T> => {
      const requestId = requestIdRef.current + 1
      requestIdRef.current = requestId
      setSafeState({ isLoading: true, error: null }, requestId)

      try {
        const result = await action()
        setSafeState({ isLoading: false, error: null }, requestId)
        return result
      } catch (error) {
        const message = resolveFallbackMessage(error, fallbackErrorMessage)
        setSafeState({ isLoading: false, error: message }, requestId)
        throw error
      }
    },
    [setSafeState],
  )

  return {
    execute,
    isLoading: state.isLoading,
    error: state.error,
  }
}
