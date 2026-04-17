type LegalDocument = 'terms' | 'privacy'

type AuthLegalAgreementProps = {
  onOpenDocument: (document: LegalDocument) => void
  checked: boolean
  disabled?: boolean
  onChange: (checked: boolean) => void
}

export function AuthLegalAgreement({ onOpenDocument, checked, disabled, onChange }: AuthLegalAgreementProps) {
  return (
    <label className="flex cursor-pointer items-start gap-3 pt-1">
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-0.5 h-4 w-4 shrink-0 rounded accent-[#006b1f]"
      />
      <span className="text-xs leading-relaxed text-zinc-500">
        Eu concordo com os{' '}
        <button
          type="button"
          className="font-medium text-[#006b1f] hover:underline"
          onClick={(event) => {
            event.preventDefault()
            event.stopPropagation()
            onOpenDocument('terms')
          }}
        >
          Termos de Uso
        </button>{' '}
        e com a{' '}
        <button
          type="button"
          className="font-medium text-[#006b1f] hover:underline"
          onClick={(event) => {
            event.preventDefault()
            event.stopPropagation()
            onOpenDocument('privacy')
          }}
        >
          Política de Privacidade
        </button>
      </span>
    </label>
  )
}
