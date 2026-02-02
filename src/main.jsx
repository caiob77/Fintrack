import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/home.jsx'
import LoginPage from './pages/login.jsx'
import SignupPage from './pages/signup.jsx'
import NotFoundPage from './pages/not-found.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { AuthContextProvider } from './contexts/auth.jsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <QueryClientProvider client={queryClient}>
         <AuthContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
    <Toaster />
    </AuthContextProvider>
    </QueryClientProvider>
  </StrictMode>,
)
