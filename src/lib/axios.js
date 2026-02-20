import axios from 'axios'
import { getTokens, setTokens, removeTokens } from '@/constants/local-storage'

// Em dev usa /api para o proxy do Vite (evita CORS). Em produção usa a URL do .env.
const baseURL = import.meta.env.DEV
  ? '/api'
  : (import.meta.env.VITE_API_BACKEND_URL || 'https://finance-app-0y7p.onrender.com/api')

export const api = axios.create({
  baseURL,
})

export default api

api.interceptors.request.use((request) => {
    const accessToken = getTokens().accessToken
    if (!accessToken) {
      return request
    }
    request.headers.Authorization = `Bearer ${accessToken}`
    return request
  })

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (!error.response) return Promise.reject(error)
      const request = error.config
      const refreshToken = getTokens().refreshToken
      if (!refreshToken) {
        return Promise.reject(error)
      }
      if (
        error.response.status === 401 &&
        !request._retry &&
        !request.url.includes('/users/refresh-token')
      ) {
        request._retry = true
        try {
          const response = await api.post('/users/refresh-token', {
            refreshToken,
          })
          const newAccessToken = response.data.accessToken
          const newRefreshToken = response.data.refreshToken
          setTokens(newAccessToken, newRefreshToken)
          request.headers.Authorization = `Bearer ${newAccessToken}`
          return api(request)
        } catch (refreshError) {
          removeTokens()
          window.dispatchEvent(new CustomEvent('auth:session-expired'))
          return Promise.reject(error)
        }
      }
      return Promise.reject(error)
    }
)