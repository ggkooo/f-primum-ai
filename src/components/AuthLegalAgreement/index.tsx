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
        I agree to the{' '}
        <button
          type="button"
          className="font-medium text-[#006b1f] hover:underline"
          onClick={(event) => {
            event.preventDefault()
            event.stopPropagation()
            onOpenDocument('terms')
          }}
        >
          Terms of Service
        </button>{' '}
        and{' '}
        <button
          type="button"
          className="font-medium text-[#006b1f] hover:underline"
          onClick={(event) => {
            event.preventDefault()
            event.stopPropagation()
            onOpenDocument('privacy')
          }}
        >
          Privacy Policy
        </button>
      </span>
    </label>
  )
}
