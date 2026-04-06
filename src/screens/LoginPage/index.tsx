import { useNavigate } from 'react-router-dom'
import logo from '../../assets/img/logo.png'
import { AuthCard } from '../../components/AuthCard'
import { AuthForgotPassword } from '../../components/AuthForgotPassword'
import { AuthHeader } from '../../components/AuthHeader'
import { AuthLayout } from '../../components/AuthLayout'
import { AuthPasswordField } from '../../components/AuthPasswordField'
import { AuthRememberMe } from '../../components/AuthRememberMe'
import { AuthSeparator } from '../../components/AuthSeparator'
import { AuthSubmitButton } from '../../components/AuthSubmitButton'
import { AuthSwitchLink } from '../../components/AuthSwitchLink'
import { AuthTextField } from '../../components/AuthTextField'

export function LoginPage() {
  const navigate = useNavigate()

  return (
    <AuthLayout>
      <AuthHeader
        logoSrc={logo}
        appName="PrimumAI"
        title="Welcome back"
        subtitle="Sign in to continue to PrimumAI."
      />

      <AuthCard>
        <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
          <AuthTextField
            label="Email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
          />

          <AuthPasswordField
            label="Password"
            placeholder="Your password"
            autoComplete="current-password"
            labelAction={<AuthForgotPassword />}
          />

          <AuthRememberMe />

          <AuthSubmitButton icon="login">Sign In</AuthSubmitButton>
        </form>

        <AuthSeparator />
        <AuthSwitchLink
          question="Don't have an account?"
          actionLabel="Create one"
          onAction={() => navigate('/register')}
        />
      </AuthCard>
    </AuthLayout>
  )
}
