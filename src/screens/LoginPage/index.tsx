import { useState } from 'react'
import type { FormEvent } from 'react'
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
import { useLogin } from '../../hooks'

export function LoginPage() {
  const navigate = useNavigate()
  const { login, isLoading, error } = useLogin()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      await login({
        email,
        password,
      }, {
        rememberMe,
      })

      navigate('/chat')
    } catch {
      // The hook already updates error state for the UI.
    }
  }

  return (
    <AuthLayout>
      <AuthHeader
        logoSrc={logo}
        appName="PrimumAI"
        title="Bem-vindo de volta"
        subtitle="Entre para continuar no PrimumAI."
      />

      <AuthCard>
        <form className="space-y-4" onSubmit={handleSubmit}>
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
            label="Senha"
            name="password"
            placeholder="Sua senha"
            autoComplete="current-password"
            labelAction={<AuthForgotPassword />}
            value={password}
            required
            disabled={isLoading}
            onChange={setPassword}
          />

          <AuthRememberMe
            label="Lembrar de mim por 15 dias"
            checked={rememberMe}
            disabled={isLoading}
            onChange={setRememberMe}
          />

          {error ? <p className="text-xs font-medium text-red-600">{error}</p> : null}

          <AuthSubmitButton icon="login" isLoading={isLoading}>
            Entrar
          </AuthSubmitButton>
        </form>

        <AuthSeparator />
        <AuthSwitchLink
          question="Não tem conta?"
          actionLabel="Criar conta"
          onAction={() => navigate('/register')}
        />
      </AuthCard>
    </AuthLayout>
  )
}
