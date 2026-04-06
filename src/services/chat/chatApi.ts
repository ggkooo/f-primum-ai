import { apiRequest } from '../api'
import type { CreateChatRequest, CreateChatResponse } from '../../types'

export function createChat(payload: CreateChatRequest): Promise<CreateChatResponse> {
  return apiRequest<CreateChatResponse, CreateChatRequest>({
    path: '/chat',
    method: 'POST',
    body: payload,
  })
}
