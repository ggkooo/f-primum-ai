import { getAuthSession } from '../auth/session'
import type { ApiErrorPayload } from '../../types'

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

type RequestOptions<TBody> = {
  path: string
  method?: RequestMethod
  body?: TBody
  headers?: Record<string, string>
}

export class ApiError extends Error {
  readonly status: number
  readonly data: unknown

  constructor(message: string, status: number, data: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

function ensureLeadingSlash(path: string): string {
  if (!path.startsWith('/')) {
    return `/${path}`
  }

  return path
}

function buildApiUrl(baseUrl: string, prefix: string, path: string): string {
  const sanitizedBaseUrl = baseUrl.replace(/\/+$/, '')
  const normalizedPrefix = prefix ? ensureLeadingSlash(prefix) : ''

  return `${sanitizedBaseUrl}${normalizedPrefix}${ensureLeadingSlash(path)}`
}

function resolveRequestTimeoutMs(): number {
  const timeoutValue = Number(import.meta.env.VITE_API_TIMEOUT_MS)

  if (!Number.isFinite(timeoutValue) || timeoutValue <= 0) {
    return 0
  }

  return timeoutValue
}

async function parseResponseData(response: Response): Promise<unknown> {
  const text = await response.text()

  if (!text) {
    return null
  }

  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

function buildAuthorizationHeader(): string | undefined {
  const authSession = getAuthSession()

  if (!authSession) {
    return undefined
  }

  return `${authSession.tokenType} ${authSession.accessToken}`
}

function buildRequestHeaders(customHeaders?: Record<string, string>): Record<string, string> {
  const authorizationHeader = buildAuthorizationHeader()

  return {
    Accept: 'application/json',
    'x-api-key': import.meta.env.VITE_API_KEY,
    ...(authorizationHeader ? { Authorization: authorizationHeader } : {}),
    ...customHeaders,
  }
}

function serializeRequestBody<TBody>(body: TBody | undefined): string | undefined {
  if (!body) {
    return undefined
  }

  return JSON.stringify(body)
}

export async function apiRequest<TResponse, TBody = unknown>({
  path,
  method = 'GET',
  body,
  headers,
}: RequestOptions<TBody>): Promise<TResponse> {
  const url = buildApiUrl(import.meta.env.VITE_API_BASE_URL, import.meta.env.VITE_API_PREFIX, path)
  const timeoutMs = resolveRequestTimeoutMs()
  const serializedBody = serializeRequestBody(body)
  const requestHeaders = buildRequestHeaders({
    ...(serializedBody ? { 'Content-Type': 'application/json' } : {}),
    ...headers,
  })

  const controller = timeoutMs > 0 ? new AbortController() : undefined
  const timeoutId =
    timeoutMs > 0 && controller
      ? window.setTimeout(() => {
          controller.abort('Request timeout exceeded')
        }, timeoutMs)
      : undefined

  try {
    const response = await fetch(url, {
      method,
      headers: requestHeaders,
      body: serializedBody,
      signal: controller?.signal,
    })

    const parsedBody = await parseResponseData(response)

    if (!response.ok) {
      const payload = parsedBody as ApiErrorPayload | null
      const errorMessage = payload?.message || `A requisição falhou com status ${response.status}`
      throw new ApiError(errorMessage, response.status, parsedBody)
    }

    return parsedBody as TResponse
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Requisição cancelada ou tempo limite excedido')
    }

    throw error
  } finally {
    if (timeoutId) {
      window.clearTimeout(timeoutId)
    }
  }
}
