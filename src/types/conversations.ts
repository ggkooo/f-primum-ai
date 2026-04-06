export type Conversation = {
  id: string
  user_id: number
  title: string
  last_message_at: string
  created_at: string
  updated_at: string
  clinical_stage: string
  clinical_snapshot: string | null
}

export type ConversationMessage = {
  id: number
  conversation_id: string
  role: 'user' | 'model'
  content: string
  created_at: string
  updated_at: string
}

export type ConversationDetails = Conversation & {
  messages: ConversationMessage[]
}

export type ConversationsResponse = {
  status: string
  data: {
    conversations: Conversation[]
  }
}

export type ConversationResponse = {
  status: string
  data: {
    conversation: ConversationDetails
  }
}
