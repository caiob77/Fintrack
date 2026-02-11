import queryString from 'query-string'

import api from '@/lib/axios'

export const TransactionService = {
  /**
   * Cria uma transação para o usuário autenticado.
   * @param {Object} variables - Usuário a ser criado.
   * @param {string} variables.name - Nome da transação.
   * @param {string} variables.date - Data da transação (YYYY-MM-DD).
   * @param {number} variables.amount - Valor da transação.
   * @param {string} variables.type - Tipo da transação (EARNING/EXPENSE/INVESTMENT).
   */
  create: async (variables) => {
    const response = await api.post('/transactions/me', {
      name: variables.name,
      date: variables.date,
      amount: variables.amount,
      type: variables.type,
    })
    return response.data
  },
  /**
   * Retorna as transações do usuário autenticado.
   * @param {Object} variables
   * @param {string} variables.from - Data inicial (YYYY-MM-DD).
   * @param {string} variables.to - Data final (YYYY-MM-DD).
   */
  getAll: async (variables) => {
    const query = queryString.stringify({ from: variables.from, to: variables.to })
    const response = await api.get(`/transactions/me?${query}`)
    return response.data
  },
  /**
   * Atualiza uma transação do usuário autenticado.
   * @param {Object} variables - Dados da transação.
   * @param {string} variables.id - ID da transação.
   * @param {string} variables.name - Nome da transação.
   * @param {string} variables.date - Data da transação (YYYY-MM-DD).
   * @param {number} variables.amount - Valor da transação.
   * @param {string} variables.type - Tipo da transação (EARNING/EXPENSE/INVESTMENT).
   */
        update: async (variables) => {
    const response = await api.patch(`/transactions/me/${variables.id}`, {
      name: variables.name,
      date: variables.date,
      amount: variables.amount,
      type: variables.type,
    })
    return response.data
  },
  /**
   * Retorna as transações do usuário autenticado.
   * @param {Object} variables
   * @param {string} variables.id - ID da transação a ser deletada.
   */
        delete: async (variables) => {
    const response = await api.delete(`/transactions/me/${variables.id}`)
    return response.data
  },
}