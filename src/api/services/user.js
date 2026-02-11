import api from '@/lib/axios'

export const UserService = {

    /**
     * Cria um novo usuário
     * @param {Object} variables - Variáveis para criação do usuário
     * @param {string} variables.firstName - Nome do usuário
     * @param {string} variables.lastName - Sobrenome do usuário
     * @param {string} variables.email - Email do usuário
     * @param {string} variables.password - Senha do usuário
     * @returns {Promise<Object>} Resposta da API
     * @returns {string} accessToken - Token de acesso
     * @returns {string} refreshToken - Token de atualização
     */
      signup: async (variables) => {
        const response = await api.post('/users', {
            first_name: variables.firstName,
            last_name: variables.lastName,
            email: variables.email,
            password: variables.password,
        })
        return response.data 

    },
    /**
     * Faz login de um usuário
     * @param {Object} variables - Variáveis para login do usuário
     * @param {string} variables.email - Email do usuário
     * @param {string} variables.password - Senha do usuário
     * @returns {Promise<Object>} Resposta da API
     * @returns {string} accessToken - Token de acesso
     * @returns {string} refreshToken - Token de atualização
     */
    login: async (variables) => {
        const response = await api.post('/users/login', {
            email: variables.email,
            password: variables.password,
        })
        return response.data
    },
    /**
     * Obtém os dados do usuário logado
     * @returns {Promise<Object>} Resposta da API
     * @returns {string} firstName - Nome do usuário
     * @returns {string} lastName - Sobrenome do usuário
     * @returns {string} email - Email do usuário
     */
    getMe: async () => {
        const response = await api.get('/users/me')
        return response.data
    },
    /**
     * Obtém o saldo do usuário
     * @param {Object} variables - Variáveis para obtenção do saldo
     * @param {string} variables.from - Data de início
     * @param {string} variables.to - Data de fim
     * @returns {Promise<Object>} Resposta da API
     * @returns {number} balance - Saldo do usuário
     */
    getBalance: async (variables) => {
        const queryParams = new URLSearchParams()
        queryParams.set('from', variables.from)
        queryParams.set('to', variables.to)
        const response = await api.get(`/users/me/balance?${queryParams.toString()}`)
        return response.data
    },
}
