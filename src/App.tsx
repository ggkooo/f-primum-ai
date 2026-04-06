import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import type { ReactElement } from 'react'
import { ChatPage } from './screens/ChatPage'
import { LoginPage } from './screens/LoginPage'
import { RegisterPage } from './screens/RegisterPage'
import { isAuthenticated } from './services/auth'

function AuthenticatedRoute({ children }: { children: ReactElement }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />
  }

  return children
}

function PublicOnlyRoute({ children }: { children: ReactElement }) {
  if (isAuthenticated()) {
    return <Navigate to="/" replace />
  }

  return children
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AuthenticatedRoute>
              <ChatPage />
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicOnlyRoute>
              <LoginPage />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicOnlyRoute>
              <RegisterPage />
            </PublicOnlyRoute>
          }
        />
        <Route path="/chat" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
