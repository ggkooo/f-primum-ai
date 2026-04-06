import { useEffect, useRef, useState } from 'react'

type ChatItem = {
  id: number | string
  title: string
}

type SidebarProps = {
  logoSrc: string
  appName: string
  chats: ChatItem[]
  isLoading?: boolean
  error?: string | null
  userInitial: string
  userName: string
  planName: string
  onChatSelect?: (chatId: ChatItem['id']) => void
  onChatDelete?: (chatId: ChatItem['id']) => void
  onNewChat?: () => void
  onOpenSettings?: () => void
  onLogout?: () => void
  onRetryLoad?: () => void
}

export function Sidebar({
  logoSrc,
  appName,
  chats,
  isLoading = false,
  error = null,
  userInitial,
  userName,
  planName,
  onChatSelect,
  onChatDelete,
  onNewChat,
  onOpenSettings,
  onLogout,
  onRetryLoad,
}: SidebarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!menuContainerRef.current) {
        return
      }

      if (!menuContainerRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('mousedown', handleOutsideClick)

    return () => {
      window.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  return (
    <aside className="hidden h-full w-72 shrink-0 flex-col border-r border-zinc-900/10 bg-white/30 shadow-[inset_-1px_0_0_rgba(255,255,255,0.28)] backdrop-blur-md md:flex">
      <div className="my-12 px-6">
        <div className="flex items-center justify-center gap-2">
          <img src={logoSrc} alt={appName} className="h-8 w-8 rounded-lg" />
          <span className="font-display text-xl font-bold tracking-tight text-zinc-900">{appName}</span>
        </div>
      </div>

      <div className="my-4 px-3">
        <button
          onClick={onNewChat}
          className="flex w-full items-center justify-between rounded-2xl bg-white/40 px-4 py-3 text-sm font-semibold text-[#26312b] shadow-sm ring-1 ring-white/60 transition hover:bg-white/60 hover:shadow-md active:scale-[0.98]"
        >
          New chat
          <span className="material-symbols-outlined text-[20px] text-[#00631d]">edit_square</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-2">
        <p className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">Recent</p>
        {isLoading && chats.length === 0 ? (
          <div className="px-3 py-4 text-sm text-zinc-500">Loading conversations...</div>
        ) : null}

        {!isLoading && error && chats.length === 0 ? (
          <div className="px-3 py-3">
            <div className="rounded-xl border border-red-100 bg-red-50 px-3 py-3 text-sm text-red-600">
              <p>{error}</p>
              <button
                type="button"
                onClick={onRetryLoad}
                className="mt-3 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-red-600 ring-1 ring-red-200 transition hover:bg-red-100"
              >
                Retry
              </button>
            </div>
          </div>
        ) : null}

        {!isLoading && !error && chats.length === 0 ? (
          <div className="px-3 py-4 text-sm text-zinc-500">No conversations yet.</div>
        ) : null}

        {chats.length > 0 ? (
          <div className="space-y-0.5">
            {chats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => onChatSelect?.(chat.id)}
                className="group flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left transition hover:bg-white/30"
              >
                <span className="truncate text-sm text-[#26312b]">{chat.title || 'Untitled conversation'}</span>
                <span
                  className="material-symbols-outlined ml-2 shrink-0 scale-0 text-[18px] text-zinc-400 transition group-hover:scale-100 hover:text-red-500"
                  onClick={(event) => {
                    event.stopPropagation()
                    onChatDelete?.(chat.id)
                  }}
                >
                  delete
                </span>
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <div className="border-t border-white/10 p-4">
        <div className="relative flex items-center gap-1" ref={menuContainerRef}>
          <button className="flex min-w-0 flex-1 items-center gap-3 rounded-xl p-2 text-left transition hover:bg-white/25">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-white bg-[#9ffe9e] font-bold text-[#00631d]">
              {userInitial}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-[#26312b]">{userName}</p>
              <p className="truncate text-[10px] text-zinc-500">{planName}</p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setIsMenuOpen((value) => !value)}
            className="grid h-9 w-9 place-items-center rounded-lg text-zinc-500 transition hover:bg-white/25 hover:text-zinc-700"
            aria-label="Open account menu"
          >
            <span className="material-symbols-outlined text-[20px]">more_vert</span>
          </button>

          {isMenuOpen ? (
            <div className="absolute bottom-12 right-0 z-30 w-44 rounded-xl border border-white/50 bg-white/90 p-1.5 shadow-[0_18px_40px_rgba(0,0,0,0.12)] backdrop-blur-md">
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false)
                  onOpenSettings?.()
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#26312b] transition hover:bg-[#eef8ef]"
              >
                <span className="material-symbols-outlined text-[18px]">settings</span>
                Settings
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false)
                  onLogout?.()
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 transition hover:bg-red-50"
              >
                <span className="material-symbols-outlined text-[18px]">logout</span>
                Logout
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </aside>
  )
}