import { useCallback } from 'react'
import { loginRequest, saveAuthSession } from '../services/auth'
import type { AuthSession, LoginRequest, LoginResponse } from '../types'
import { useAsyncAction } from './useAsyncAction'

export type LoginOptions = {
  rememberMe: boolean
}

function mapLoginResponseToSession(response: LoginResponse): AuthSession {
  return {
    accessToken: response.data.access_token,
    tokenType: response.data.token_type,
    user: response.data.user,
  }
}

export function useLogin() {
  const { execute, isLoading, error } = useAsyncAction()

  const login = useCallback(async (credentials: LoginRequest, options: LoginOptions) => {
    return execute(async () => {
      const response = await loginRequest(credentials)
      saveAuthSession(mapLoginResponseToSession(response), options.rememberMe)
      return response
    }, 'Não foi possível entrar agora.')
  }, [execute])

  return {
    login,
    isLoading,
    error,
  }
}
