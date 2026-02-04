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