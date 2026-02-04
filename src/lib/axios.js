import axios from 'axios'

// Em desenvolvimento, usa /api (proxy do Vite redireciona)
// Em produção, usa a URL do .env com /api
const baseURL = import.meta.env.VITE_API_BACKEND_URL
  

const api = axios.create({
    baseURL,
})

export default api