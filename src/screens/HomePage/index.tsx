import { useNavigate } from 'react-router-dom'
import logo from '../../assets/img/logo.png'
import { isAuthenticated } from '../../services/auth'

const valuePillars = [
  {
    icon: 'neurology',
    title: 'Raciocínio clínico assistido',
    description:
      'Conecta sinais, sintomas e contexto em uma linha de raciocínio mais objetiva e auditável.',
  },
  {
    icon: 'assignment',
    title: 'Anamnese estruturada',
    description:
      'Organiza a conversa em blocos clínicos claros para reduzir perda de informação ao longo do atendimento.',
  },
  {
    icon: 'warning',
    title: 'Foco em risco e urgencia',
    description:
      'Ajuda a evidenciar sinais de alerta precocemente para apoiar triagem e tomada de decisão com mais segurança.',
  },
]

const productSignals = [
  { label: 'Contínuo', value: 'Contexto entre interações' },
  { label: 'Prático', value: 'Resumo de conduta acionável' },
  { label: 'Confiável', value: 'Roteiro claro para revisão' },
]

export function HomePage() {
  const navigate = useNavigate()
  const authenticated = isAuthenticated()
  const primaryActionPath = authenticated ? '/chat' : '/register'
  const primaryActionLabel = authenticated ? 'Ir para o chat' : 'Começar agora'

  return (
    <div className="h-screen w-screen overflow-x-hidden overflow-y-auto bg-[#eef1f4]">
      <main className="professional-grid relative min-h-screen w-full overflow-hidden px-4 py-5 md:px-8 md:py-8">
        <div className="soft-glow pointer-events-none absolute -left-20 top-24 h-72 w-72 rounded-full" />
        <div className="soft-glow delay pointer-events-none absolute -bottom-24 right-8 h-72 w-72 rounded-full" />

        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-2.5rem)] w-full max-w-7xl flex-col rounded-3xl border border-white/85 bg-white/88 p-5 shadow-[0_30px_80px_rgba(15,23,42,0.12)] backdrop-blur-md md:p-10">
          <header className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 pb-5">
            <div className="flex items-center gap-3">
              <img src={logo} alt="PrimumAI" className="h-10 w-10 rounded-xl" />
              <div>
                <p className="font-display text-xl font-bold tracking-tight text-zinc-950">PrimumAI</p>
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-zinc-500">Plataforma de Inteligência Clínica</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:border-zinc-400 hover:bg-zinc-100"
                onClick={() => navigate('/login')}
              >
                Entrar
              </button>
              <button
                type="button"
                className="rounded-xl bg-zinc-950 px-4 py-2 text-sm font-semibold text-white shadow-[0_14px_24px_rgba(24,24,27,0.25)] transition hover:bg-zinc-800"
                onClick={() => navigate(primaryActionPath)}
              >
                {primaryActionLabel}
              </button>
            </div>
          </header>

          <section className="grid gap-8 md:grid-cols-[1.08fr_0.92fr] md:items-start">
            <div className="slide-up">
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-600">
                <span className="material-symbols-outlined text-sm">verified</span>
                Produto para atendimento clínico de alta complexidade
              </p>

              <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-zinc-950 md:text-[4rem]">
                IA clínica com experiência de produto de nível global.
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-600 md:text-lg">
                A PrimumAI ajuda equipes de saúde a acelerar anamnese, documentar raciocínio clínico e transformar
                conversa em decisão com mais clareza, consistência e segurança.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  className="rounded-2xl bg-zinc-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
                  onClick={() => navigate(primaryActionPath)}
                >
                  {authenticated ? 'Abrir ambiente clínico' : 'Criar conta'}
                </button>
                <button
                  type="button"
                  className="rounded-2xl border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-700 transition hover:border-zinc-400 hover:bg-zinc-100"
                  onClick={() => navigate('/login')}
                >
                  Acessar plataforma
                </button>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {productSignals.map((signal) => (
                  <div key={signal.label} className="rounded-xl border border-zinc-200 bg-white p-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">{signal.label}</p>
                    <p className="mt-1 text-sm font-semibold text-zinc-900">{signal.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="fade-in rounded-3xl border border-zinc-200 bg-[#fbfcfd] p-5 shadow-[0_20px_50px_rgba(15,23,42,0.08)] md:p-6">
              <div className="mb-5 flex items-center justify-between border-b border-zinc-200 pb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-zinc-500">Assistente PrimumAI</p>
                  <p className="mt-1 font-display text-lg font-bold text-zinc-900">Painel de apoio clínico</p>
                </div>
                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                  Ativo
                </span>
              </div>

              <div className="space-y-3">
                <div className="rounded-xl border border-zinc-200 bg-white p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-zinc-500">Entrada clínica</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-700">
                    Dor torácica há 2 horas, irradiação para membro superior esquerdo, sudorese fria e náuseas.
                  </p>
                </div>
                <div className="rounded-xl border border-zinc-200 bg-white p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-zinc-500">Sintese</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-700">
                    Quadro compatível com síndrome coronariana aguda. Recomenda-se estratificação imediata e protocolo
                    de urgência conforme diretriz local.
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-zinc-200 bg-white p-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-zinc-500">Risco</p>
                    <p className="mt-1 text-sm font-semibold text-zinc-900">Alto</p>
                  </div>
                  <div className="rounded-xl border border-zinc-200 bg-white p-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-zinc-500">Próxima ação</p>
                    <p className="mt-1 text-sm font-semibold text-zinc-900">Encaminhar para avaliação imediata</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-8 grid gap-4 md:grid-cols-3">
            {valuePillars.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.05)]"
              >
                <span className="material-symbols-outlined mb-4 inline-flex rounded-xl border border-zinc-200 bg-zinc-100 p-2 text-zinc-800">
                  {item.icon}
                </span>
                <h2 className="font-display text-xl font-bold text-zinc-900">{item.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">{item.description}</p>
              </article>
            ))}
          </section>

          <section className="mb-4 mt-4 rounded-2xl border border-zinc-200 bg-white p-5 md:p-6">
            <div className="grid gap-5 text-sm md:grid-cols-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-zinc-500">Fluxo</p>
                <p className="mt-2 font-semibold text-zinc-900">Da queixa principal a recomendações de próxima etapa</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-zinc-500">Contexto</p>
                <p className="mt-2 font-semibold text-zinc-900">Memória de interações para continuidade entre atendimentos</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-zinc-500">Confianca</p>
                <p className="mt-2 font-semibold text-zinc-900">Apoio clínico com sinalização clara de pontos críticos</p>
              </div>
            </div>
          </section>

          <footer className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200 pt-5 text-xs text-zinc-500">
            <p className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">info</span>
              PrimumAI não substitui julgamento clínico profissional.
            </p>
            <p>PrimumAI © 2026</p>
          </footer>
        </div>
      </main>
    </div>
  )
}