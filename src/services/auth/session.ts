import type { AuthSession, StoredAuthSession } from '../../types'

export const AUTH_SESSION_KEY = 'primumai.auth'
export const REMEMBER_ME_TTL_MS = 15 * 24 * 60 * 60 * 1000
export const DEFAULT_SESSION_TTL_MS = 3 * 60 * 60 * 1000

function isAuthSession(value: unknown): value is AuthSession {
  if (!value || typeof value !== 'object') {
    return false
  }

  const candidate = value as Partial<AuthSession>

  return (
    typeof candidate.accessToken === 'string' &&
    typeof candidate.tokenType === 'string' &&
    Boolean(candidate.user) &&
    typeof candidate.user?.name === 'string'
  )
}

function isStoredAuthSession(value: unknown): value is StoredAuthSession {
  if (!isAuthSession(value)) {
    return false
  }

  const candidate = value as Partial<StoredAuthSession>
  return typeof candidate.expiresAt === 'number' && Number.isFinite(candidate.expiresAt)
}

function resolveSessionTtl(rememberMe: boolean): number {
  return rememberMe ? REMEMBER_ME_TTL_MS : DEFAULT_SESSION_TTL_MS
}

function sanitizeStoredSession(session: StoredAuthSession): AuthSession {
  return {
    accessToken: session.accessToken,
    tokenType: session.tokenType,
    user: session.user,
  }
}

function parseStoredSession(rawValue: string): StoredAuthSession | null {
  try {
    const parsed = JSON.parse(rawValue) as unknown

    if (!isStoredAuthSession(parsed)) {
      return null
    }

    return parsed
  } catch {
    return null
  }
}

export function saveAuthSession(auth: AuthSession, rememberMe: boolean) {
  const ttl = resolveSessionTtl(rememberMe)
  const payload: StoredAuthSession = {
    ...auth,
    expiresAt: Date.now() + ttl,
  }

  window.localStorage.removeItem(AUTH_SESSION_KEY)
  window.sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(payload))
}

export function getAuthSession(): AuthSession | null {
  const raw = window.sessionStorage.getItem(AUTH_SESSION_KEY)

  if (!raw) {
    // Clean up legacy values from old versions that used localStorage.
    window.localStorage.removeItem(AUTH_SESSION_KEY)
    return null
  }

  const parsed = parseStoredSession(raw)

  if (!parsed) {
    clearAuthSession()
    return null
  }

  if (parsed.expiresAt <= Date.now()) {
    clearAuthSession()
    return null
  }

  return sanitizeStoredSession(parsed)
}

export function clearAuthSession() {
  window.localStorage.removeItem(AUTH_SESSION_KEY)
  window.sessionStorage.removeItem(AUTH_SESSION_KEY)
}

export function isAuthenticated(): boolean {
  const session = getAuthSession()

  return Boolean(session?.accessToken)
}
