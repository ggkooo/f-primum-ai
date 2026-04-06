import { apiRequest } from '../api'
import type { ConversationResponse, ConversationsResponse } from '../../types'

export function getConversations(): Promise<ConversationsResponse> {
  return apiRequest<ConversationsResponse>({
    path: '/conversations',
    method: 'GET',
  })
}

export function getConversationById(conversationId: string): Promise<ConversationResponse> {
  return apiRequest<ConversationResponse>({
    path: `/conversations/${conversationId}`,
    method: 'GET',
  })
}

export function deleteConversationById(conversationId: string): Promise<unknown> {
  return apiRequest<unknown>({
    path: `/conversations/${conversationId}`,
    method: 'DELETE',
  })
}
