import { useCallback } from 'react'
import { registerRequest } from '../services/auth'
import type { RegisterRequest } from '../types'
import { useAsyncAction } from './useAsyncAction'

export function useRegister() {
  const { execute, isLoading, error } = useAsyncAction()

  const register = useCallback(async (payload: RegisterRequest) => {
    return execute(() => registerRequest(payload), 'Não foi possível criar sua conta agora.')
  }, [execute])

  return {
    register,
    isLoading,
    error,
  }
}
