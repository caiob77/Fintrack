import { createContext, useState, useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import api from '@/lib/axios'
import { toast } from 'sonner'

export const AuthContext = createContext({
    user: null,
    login: () => {},
    signup: () => {},
    isInitializing: true,
    logout: () => {},
})

export const useAuthContext = () => {
    return useContext(AuthContext)
} 

const setTokens = (accessToken, refreshToken) => {
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
}

const getTokens = () => {
    return {
        accessToken: localStorage.getItem('accessToken'),
        refreshToken: localStorage.getItem('refreshToken'),
    }
} 

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isInitializing, setIsInitializing] = useState(true)
    
    const signupMutation = useMutation({
        mutationKey: ['signup'],
        mutationFn: async (variables) => {
            const response = await api.post('/users', {
                first_name: variables.firstName,
                last_name: variables.lastName,
                email: variables.email,
                password: variables.password,
            })
            return response.data
        },
    })  
    useEffect(() => {
        const init = async () => {
            setIsInitializing(true)
                const { accessToken, refreshToken } = getTokens()
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
                    setUser(null)
                    localStorage.removeItem('accessToken')
                    localStorage.removeItem('refreshToken')
                    console.error(error)
                }finally {
                    setIsInitializing(false)
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
    const signup = (data) => {
        signupMutation.mutate(data, {
            onSuccess: (createdUser) => {
                setTokens(createdUser.accessToken, createdUser.refreshToken)
                setUser(createdUser)
                toast.success('Conta criada com sucesso')
            },
            onError: (error) => {
                if (error.code === 'ERR_NETWORK' || error.code === 'ERR_CONNECTION_REFUSED') {
                    toast.error('Servidor não está disponível. Verifique se o backend está rodando.')
                } else if (error.response) {
                    // Erro do servidor (4xx, 5xx)
                    const message = error.response.data?.message || error.response.data?.error || 'Erro ao criar conta'
                    toast.error(message)
                    console.error('Erro do servidor:', error.response.data)
                } else {
                    toast.error('Erro ao criar conta')
                    console.error('Erro:', error)
                }
            },
        })
    }
    const login = (data) => {
        loginMutation.mutate(data, {
            onSuccess: (loggedUser) => {
                setTokens(loggedUser.accessToken, loggedUser.refreshToken)
                setUser(loggedUser)
                toast.success('Login realizado com sucesso')
            },
            onError: (error) => {
                if (error.code === 'ERR_NETWORK' || error.code === 'ERR_CONNECTION_REFUSED') {
                    toast.error('Servidor não está disponível. Verifique se o backend está rodando.')
                } else {
                    toast.error('Erro ao fazer login')
                }
            },
        })
    }
    const logout = () => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        setUser(null)
        toast.success('Logout realizado com sucesso')
    }
   return (
    <AuthContext.Provider 
    value={{ user, login, signup, isInitializing, logout }}>
        {children}
    </AuthContext.Provider>
   )
}

