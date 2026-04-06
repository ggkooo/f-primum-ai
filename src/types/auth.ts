import type { ApiSuccessResponse } from './api'

export type LoginRequest = {
  email: string
  password: string
}

export type RegisterRequest = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export type AuthUser = {
  id: number
  name: string
  email: string
  email_verified_at: string | null
  created_at: string
  updated_at: string
}

export type LoginData = {
  access_token: string
  token_type: string
  user: AuthUser
}

export type LoginResponse = ApiSuccessResponse<LoginData>

export type RegisterData = {
  user: Omit<AuthUser, 'email_verified_at'> & {
    email_verified_at?: string | null
  }
}

export type RegisterResponse = ApiSuccessResponse<RegisterData>

export type AuthToken = {
  accessToken: string
  tokenType: string
}

export type AuthSession = AuthToken & {
  user: AuthUser
}

export type StoredAuthSession = AuthSession & {
  expiresAt: number
}
