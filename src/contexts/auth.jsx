import { createContext, useState, useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import api from '@/lib/axios'
import { toast } from 'sonner'

export const AuthContext = createContext({
    user: null,
    login: () => {},
    signup: () => {},
})

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const signupMutation = useMutation({
        mutationKey: ['signup'],
        mutationFn: async (variables) => {
            const response = await api.post('/users', {
            firstName: variables.firstName,
            lastName: variables.lastName,
            email: variables.email,
            password: variables.password,
        })
        return response.data
        },
    })
    useEffect(() => {
        const init = async () => {
                const accessToken = localStorage.getItem('accessToken')
                const refreshToken = localStorage.getItem('refreshToken')
                if (!accessToken && !refreshToken) return;
                try {
                    const response = await api.get('/users/me', {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    }) 
                    if (response.status === 200) {
                        setUser(response.data)
                    }
                } catch (error) {
                    localStorage.removeItem('accessToken')
                    localStorage.removeItem('refreshToken')
                    console.error(error)
                }
        }
        init()
    }, [user]) 
    const loginMutation = useMutation({
        mutationKey: ['login'],
        mutationFn: async (variables) => {
            const response = await api.post('/users/login', {
            email: variables.email,
            password: variables.password,
        })
        return response.data
        },
    })
    const signup = (data) => { signupMutation.mutate(data, {
        onSuccess: (createdUser) => {
            const accessToken = createdUser.accessToken
            const refreshToken = createdUser.refreshToken
            setUser(createdUser)
            localStorage.setItem('accessToken', accessToken)
            localStorage.setItem('refreshToken', refreshToken) 
            toast.success('Conta criada com sucesso')
        },
        onError: () => {
            toast.error('Erro ao criar conta')
        },
    })
}
   return (
    <AuthContext.Provider 
    value={{ user, login: () => {}, signup: () => {} }}>
        {children}
    </AuthContext.Provider>
   )
}

