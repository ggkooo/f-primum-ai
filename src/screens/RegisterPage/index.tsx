import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/img/logo.png'
import { AuthLegalAgreement } from '../../components/AuthLegalAgreement'
import { AuthCard } from '../../components/AuthCard'
import { AuthHeader } from '../../components/AuthHeader'
import { AuthLayout } from '../../components/AuthLayout'
import { AuthPasswordField } from '../../components/AuthPasswordField'
import { AuthSeparator } from '../../components/AuthSeparator'
import { AuthSubmitButton } from '../../components/AuthSubmitButton'
import { AuthSwitchLink } from '../../components/AuthSwitchLink'
import { AuthTextField } from '../../components/AuthTextField'
import { LegalDocumentContent } from '../../components/LegalDocumentContent'
import { LegalModal } from '../../components/LegalModal'

type LegalDocument = 'terms' | 'privacy'

export function RegisterPage() {
  const navigate = useNavigate()
  const [activeDocument, setActiveDocument] = useState<LegalDocument | null>(null)

  const modalTitle = activeDocument === 'terms' ? 'Terms of Service' : 'Privacy Policy'

  return (
    <AuthLayout>
      <AuthHeader
        logoSrc={logo}
        appName="PrimumAI"
        title="Create your account"
        subtitle="Start your journey with PrimumAI today."
      />

      <AuthCard>
        <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
          <AuthTextField label="Full name" type="text" placeholder="Your full name" autoComplete="name" />
          <AuthTextField label="Email" type="email" placeholder="you@example.com" autoComplete="email" />
          <AuthPasswordField label="Password" placeholder="Min. 8 characters" autoComplete="new-password" />
          <AuthPasswordField
            label="Confirm password"
            placeholder="Repeat your password"
            autoComplete="new-password"
          />

          <AuthLegalAgreement onOpenDocument={setActiveDocument} />

          <AuthSubmitButton icon="person_add">Create Account</AuthSubmitButton>
        </form>

        <AuthSeparator />
        <AuthSwitchLink
          question="Already have an account?"
          actionLabel="Sign in"
          onAction={() => navigate('/login')}
        />
      </AuthCard>

      <LegalModal isOpen={activeDocument !== null} title={modalTitle} onClose={() => setActiveDocument(null)}>
        {activeDocument ? <LegalDocumentContent document={activeDocument} /> : null}
      </LegalModal>
    </AuthLayout>
  )
}
