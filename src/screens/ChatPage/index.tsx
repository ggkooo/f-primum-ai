import { useNavigate } from 'react-router-dom'
import logo from '../../assets/img/logo.png'
import { MainPanel } from '../../components/MainPanel'
import { Sidebar } from '../../components/Sidebar'
import { clearAuthSession, getAuthSession } from '../../services/auth'

const chats = [
  { id: 1, title: 'Project Alpha Brainstorm' },
  { id: 2, title: 'Marketing Strategy' },
  { id: 3, title: 'Code Refactor' },
]

const prompts = [
  { icon: 'lightbulb', text: 'Get fresh perspectives on tricky problems' },
  { icon: 'psychology', text: 'Brainstorm creative ideas' },
  { icon: 'edit_note', text: 'Rewrite message for maximum impact' },
  { icon: 'summarize', text: 'Summarize key points' },
]

export function ChatPage() {
  const navigate = useNavigate()
  const authSession = getAuthSession()
  const userName = authSession?.user.name ?? 'User'
  const userInitial = userName.charAt(0).toUpperCase() || 'U'

  const handleLogout = () => {
    clearAuthSession()
    navigate('/login', { replace: true })
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#f3f4f6]">
      <main className="mesh-gradient relative flex h-full w-full overflow-hidden">
        <Sidebar
          logoSrc={logo}
          appName="PrimumAI"
          chats={chats}
          userInitial={userInitial}
          userName={userName}
          planName="Personal Plan"
          onOpenSettings={() => {
            // Settings screen is not implemented yet.
          }}
          onLogout={handleLogout}
        />

        <MainPanel
          logoSrc={logo}
          appName="PrimumAI"
          greeting={`Good evening, ${userName}`}
          title="Can I help you with anything?"
          prompts={prompts}
          composerPlaceholder="How can PrimumAI help you today?"
        />
      </main>
    </div>
  )
}
