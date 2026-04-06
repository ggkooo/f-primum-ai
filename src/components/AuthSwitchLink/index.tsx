type AuthSwitchLinkProps = {
  question: string
  actionLabel: string
  onAction: () => void
}

export function AuthSwitchLink({ question, actionLabel, onAction }: AuthSwitchLinkProps) {
  return (
    <p className="mt-5 text-center text-sm text-zinc-500">
      {question}{' '}
      <button
        type="button"
        onClick={onAction}
        className="font-semibold text-[#006b1f] transition hover:underline"
      >
        {actionLabel}
      </button>
    </p>
  )
}
