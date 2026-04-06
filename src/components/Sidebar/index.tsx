type ChatItem = {
  id: number | string
  title: string
}

type SidebarProps = {
  logoSrc: string
  appName: string
  chats: ChatItem[]
  userInitial: string
  userName: string
  planName: string
  onChatSelect?: (chatId: ChatItem['id']) => void
  onChatDelete?: (chatId: ChatItem['id']) => void
  onNewChat?: () => void
}

export function Sidebar({
  logoSrc,
  appName,
  chats,
  userInitial,
  userName,
  planName,
  onChatSelect,
  onChatDelete,
  onNewChat,
}: SidebarProps) {
  return (
    <aside className="hidden h-full w-72 shrink-0 flex-col border-r border-white/20 bg-white/30 backdrop-blur-md md:flex">
      <div className="px-6 py-5">
        <div className="flex items-center gap-2">
          <img src={logoSrc} alt={appName} className="h-8 w-8 rounded-lg" />
          <span className="font-display text-xl font-bold tracking-tight text-zinc-900">{appName}</span>
        </div>
      </div>

      <div className="flex-1 overflow-hidden px-3 py-4">
        <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">Chats</p>
        <div className="space-y-1">
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => onChatSelect?.(chat.id)}
              className="group flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition hover:bg-white/20"
            >
              <span className="truncate text-sm text-[#26312b]">{chat.title}</span>
              <span
                className="material-symbols-outlined ml-2 shrink-0 scale-0 text-sm text-zinc-500 transition group-hover:scale-100"
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
      </div>

      <div className="mt-auto space-y-3 border-t border-white/10 p-4">
        <button
          onClick={onNewChat}
          className="flex w-full items-center gap-2 rounded-lg border border-white/40 bg-white/15 px-3 py-2 text-sm font-medium text-[#26312b] transition hover:border-white/60 hover:bg-white/25"
        >
          <span className="material-symbols-outlined text-base">add</span>
          New Chat
        </button>
        <button className="flex w-full items-center gap-3 rounded-xl p-2 text-left transition hover:bg-white/25">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-white bg-[#9ffe9e] font-bold text-[#00631d]">
            {userInitial}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-[#26312b]">{userName}</p>
            <p className="truncate text-[10px] text-zinc-500">{planName}</p>
          </div>
          <span className="material-symbols-outlined ml-auto text-zinc-500">more_vert</span>
        </button>
      </div>
    </aside>
  )
}