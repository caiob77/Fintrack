import axios from 'axios'
import { getTokens } from '@/constants/local-storage'
import { R } from 'react-router/dist/development/index-react-server-client-1TI9M9o1'

// Em desenvolvimento, usa /api (proxy do Vite redireciona)
// Em produção, usa a URL do .env com /api
const baseURL = import.meta.env.VITE_API_BACKEND_URL
  

const api = axios.create({
    baseURL,
})
export default api

api.interceptors.request.use((request) => {
    const { accessToken } = getTokens()
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }   else {
        return redirect('/login')
    }
    return request
}) 

api.interceptors.response.use((response) => response, async (error) => { 
    const refreshToken = getTokens().refreshToken
    if (!refreshToken) {
        return Promise.reject(error) 
    }
    if (error.response.status === 401 && !error.config._retry && !error.config.url.includes('/users/refresh-token')) {
        error.config._retry = true
       try {
         const response = await api.post('/users/refresh-token', {
            refreshToken,
        })
        const newAccessToken = response.data.accessToken
        const newRefreshToken = response.data.refreshToken
        setTokens(newAccessToken, newRefreshToken)
        error.config.headers.Authorization = `Bearer ${newAccessToken}`  
        return api(error.config)
       } catch (error) {
        return Promise.reject(error)
       }
    }
    return Promise.reject(error) 
})