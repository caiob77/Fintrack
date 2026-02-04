import api from '@/lib/axios'

export const UserService = {
      signup: async (variables) => {
        const response = await api.post('/users', {
            first_name: variables.firstName,
            last_name: variables.lastName,
            email: variables.email,
            password: variables.password,
        })
        return response.data 

    },
    login: async (variables) => {
        const response = await api.post('/users/login', {
            email: variables.email,
            password: variables.password,
        })
        return response.data
    },
    getMe: async () => {
        const response = await api.get('/users/me')
        return response.data
    },
}
