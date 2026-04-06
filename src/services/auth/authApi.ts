import { apiRequest } from '../api'
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../../types'

export function loginRequest(payload: LoginRequest): Promise<LoginResponse> {
  return apiRequest<LoginResponse, LoginRequest>({
    path: '/login',
    method: 'POST',
    body: payload,
  })
}

export function registerRequest(payload: RegisterRequest): Promise<RegisterResponse> {
  return apiRequest<RegisterResponse, RegisterRequest>({
    path: '/register',
    method: 'POST',
    body: payload,
  })
}
