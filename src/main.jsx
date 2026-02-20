import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import HomePage from './pages/home.jsx'
import LoginPage from './pages/login.jsx'
import SignupPage from './pages/signup.jsx'
import NotFoundPage from './pages/not-found.jsx'
import TermsPage from './pages/terms.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { AuthContextProvider } from './contexts/auth.jsx'
import { AvatarContextProvider } from './contexts/avatar.jsx'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <QueryClientProvider client={queryClient}>
         <AuthContextProvider>
            <AvatarContextProvider>
               <BrowserRouter>
                  <Routes>
                     <Route path="/" element={<Navigate to="/home" replace />} />
                     <Route path="/home" element={<HomePage />} />
                     <Route path="/login" element={<LoginPage />} />
                     <Route path="/signup" element={<SignupPage />} />
                     <Route path="/terms" element={<TermsPage />} />
                     <Route path="*" element={<NotFoundPage />} />
                  </Routes>
               </BrowserRouter>
               <Toaster />
            </AvatarContextProvider>
         </AuthContextProvider>
         <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
  </StrictMode>,
)
