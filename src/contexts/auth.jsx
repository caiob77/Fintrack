import { createContext, useContext, useState, useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { setTokens, getTokens, removeTokens } from '@/constants/local-storage'
import { UserService } from '@/api/services/user' 
import { signupMutationKey, loginMutationKey } from '@/api/hooks/user'


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

const normalizeUser = (payload) => {
    const source = payload?.user ?? payload
    if (!source || typeof source !== 'object') return null

    const hasUserData =
        'email' in source ||
        'id' in source ||
        'firstName' in source ||
        'first_name' in source

    if (!hasUserData) return null

    return {
        ...source,
        firstName: source.firstName ?? source.first_name ?? '',
        lastName: source.lastName ?? source.last_name ?? '',
    }
}

const extractTokens = (payload) => {
    return {
        accessToken: payload?.accessToken ?? payload?.tokens?.accessToken ?? null,
        refreshToken: payload?.refreshToken ?? payload?.tokens?.refreshToken ?? null,
    }
}

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isInitializing, setIsInitializing] = useState(true)
    
    const signupMutation = useMutation({
        mutationKey: signupMutationKey,
        mutationFn: async (variables) => {
            const response = await UserService.signup(variables)
            return response
        },
    })
    const loginMutation = useMutation({
        mutationKey: loginMutationKey,
        mutationFn: async (variables) => {
            const response = await UserService.login(variables)
            return response
        },
    })
    useEffect(() => {
        const init = async () => {
            setIsInitializing(true)
            const { accessToken, refreshToken } = getTokens()
            if (!accessToken && !refreshToken) {
                setIsInitializing(false)
                return
            }
            try {
                const response = await UserService.getMe()
                if (response) {
                    setUser(normalizeUser(response))
                }
            } catch (error) {
                setUser(null)
                removeTokens()
                console.error(error)
            } finally {
                setIsInitializing(false)
            }
        }
        init()
    }, []) 

    const signup = async (data) => {
        try {
          const createdUser = await signupMutation.mutateAsync(data)
          const normalizedUser = normalizeUser(createdUser)
          const { accessToken, refreshToken } = extractTokens(createdUser)
          if (normalizedUser) {
            setUser(normalizedUser)
          }
          if (accessToken && refreshToken) {
            setTokens(accessToken, refreshToken)
          }
          toast.success('Conta criada com sucesso!')
        } catch (error) {
          toast.error(
            'Erro ao criar a conta. Por favor, tente novamente mais tarde.'
          )
          console.error(error)
        }
      }
      // Service Pattern/Layer
      // criar uma camada (arquivo, objeto) que é responsável por chamar uma API
      const login = async (data) => {
        try {
          const loggedUser = await loginMutation.mutateAsync(data)
          const normalizedUser = normalizeUser(loggedUser)
          const { accessToken, refreshToken } = extractTokens(loggedUser)
          if (normalizedUser) {
            setUser(normalizedUser)
          }
          if (accessToken && refreshToken) {
            setTokens(accessToken, refreshToken)
          }
          toast.success('Login realizado com sucesso!')
        } catch (error) {
          toast.error(
            'Erro ao realizar o login. Por favor, verifique suas credenciais.'
          )
          console.error(error)
        }
      }

   const logout = () => {
    removeTokens()
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

