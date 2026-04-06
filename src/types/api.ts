export type ApiSuccessResponse<TData> = {
  status: 'success'
  message: string
  data: TData
}

export type ApiErrorPayload = {
  message?: string
}
