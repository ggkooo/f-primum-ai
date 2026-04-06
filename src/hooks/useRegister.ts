import { useCallback } from 'react'
import { registerRequest } from '../services/auth'
import type { RegisterRequest } from '../types'
import { useAsyncAction } from './useAsyncAction'

export function useRegister() {
  const { execute, isLoading, error } = useAsyncAction()

  const register = useCallback(async (payload: RegisterRequest) => {
    return execute(() => registerRequest(payload), 'Unable to create your account right now.')
  }, [execute])

  return {
    register,
    isLoading,
    error,
  }
}
