import { useState } from 'react'
import type { FormEvent } from 'react'
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
import { useRegister } from '../../hooks'
import { LegalDocumentContent } from '../../components/LegalDocumentContent'
import { LegalModal } from '../../components/LegalModal'

type LegalDocument = 'terms' | 'privacy'

export function RegisterPage() {
  const navigate = useNavigate()
  const { register, isLoading, error } = useRegister()
  const [activeDocument, setActiveDocument] = useState<LegalDocument | null>(null)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [acceptedLegalTerms, setAcceptedLegalTerms] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const modalTitle = activeDocument === 'terms' ? 'Terms of Service' : 'Privacy Policy'

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormError(null)

    if (password !== passwordConfirmation) {
      setFormError('Password confirmation does not match.')
      return
    }

    if (!acceptedLegalTerms) {
      setFormError('You must accept the Terms of Service and Privacy Policy to create an account.')
      return
    }

    try {
      await register({
        name: fullName,
        email,
        password,
        password_confirmation: passwordConfirmation,
      })

      navigate('/login', { replace: true })
    } catch {
      // The hook already sets error state for UI.
    }
  }

  return (
    <AuthLayout>
      <AuthHeader
        logoSrc={logo}
        appName="PrimumAI"
        title="Create your account"
        subtitle="Start your journey with PrimumAI today."
      />

      <AuthCard>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <AuthTextField
            label="Full name"
            type="text"
            name="name"
            placeholder="Your full name"
            autoComplete="name"
            value={fullName}
            required
            disabled={isLoading}
            onChange={setFullName}
          />
          <AuthTextField
            label="Email"
            type="email"
            name="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={email}
            required
            disabled={isLoading}
            onChange={setEmail}
          />
          <AuthPasswordField
            label="Password"
            name="password"
            placeholder="Min. 8 characters"
            autoComplete="new-password"
            value={password}
            required
            disabled={isLoading}
            onChange={setPassword}
          />
          <AuthPasswordField
            label="Confirm password"
            name="password_confirmation"
            placeholder="Repeat your password"
            autoComplete="new-password"
            value={passwordConfirmation}
            required
            disabled={isLoading}
            onChange={setPasswordConfirmation}
          />

          <AuthLegalAgreement
            onOpenDocument={setActiveDocument}
            checked={acceptedLegalTerms}
            disabled={isLoading}
            onChange={setAcceptedLegalTerms}
          />

          {formError ? <p className="text-xs font-medium text-red-600">{formError}</p> : null}
          {error ? <p className="text-xs font-medium text-red-600">{error}</p> : null}

          <AuthSubmitButton
            icon="person_add"
            isLoading={isLoading}
            disabled={!acceptedLegalTerms}
            loadingText="Creating account..."
          >
            Create Account
          </AuthSubmitButton>
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
