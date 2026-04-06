export type CreateChatRequest = {
  message: string
  conversation_id?: string
}

export type CreateChatData = {
  conversation_id: string
  response: string
}

export type CreateChatResponse = {
  status: string
  data: CreateChatData
}
