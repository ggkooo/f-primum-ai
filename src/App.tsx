import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ChatPage } from './screens/ChatPage'
import { LoginPage } from './screens/LoginPage'
import { RegisterPage } from './screens/RegisterPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
