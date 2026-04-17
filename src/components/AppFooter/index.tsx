export function AppFooter() {
  return (
    <footer className="mt-5 flex w-full max-w-4xl flex-col items-center justify-between gap-3 py-3 text-[11px] text-zinc-500 md:flex-row">
      <p className="flex items-center gap-1">
        <span className="material-symbols-outlined text-sm">info</span>
        O PrimumAI pode cometer erros. Sempre revise as respostas.
      </p>
      <div className="flex items-center gap-5">
        <span>Use shift + enter para nova linha</span>
        <div className="flex gap-4">
          <a className="transition hover:text-zinc-700" href="#">
            Política de Privacidade
          </a>
          <a className="transition hover:text-zinc-700" href="#">
            Termos de Uso
          </a>
        </div>
      </div>
    </footer>
  )
}