import queryString from 'query-string'

import api from '@/lib/axios'
import { sanitizeDateRange } from '@/helpers/date-range'

const normalizeDateTime = (value) => {
  if (!value) return new Date().toISOString()
  if (value instanceof Date) return value.toISOString()

  const stringValue = String(value).trim()
  if (!stringValue) return new Date().toISOString()

  if (/^\d{4}-\d{2}-\d{2}$/.test(stringValue)) {
    return new Date(`${stringValue}T00:00:00.000Z`).toISOString()
  }

  const parsed = new Date(stringValue)
  if (!Number.isNaN(parsed.getTime())) {
    return parsed.toISOString()
  }

  return stringValue
}

const normalizeType = (value) => {
  const normalized = String(value ?? '').trim().toUpperCase()
  const aliases = {
    EARNINGS: 'EARNING',
    EXPENSES: 'EXPENSE',
    INVESTMENTS: 'INVESTMENT',
    INCOME: 'EARNING',
    GAIN: 'EARNING',
  }
  return aliases[normalized] ?? normalized
}

export const TransactionService = {
  /**
   * Cria uma transação para o usuário autenticado.
   * @param {Object} variables - Dados da transação.
   * @param {string} [variables.user_id] - Workaround temporário enquanto backend exige esse campo.
   * @param {string} variables.name - Nome da transação.
   * @param {string|Date} variables.date - Data da transação (datetime ISO).
   * @param {number} variables.amount - Valor da transação.
   * @param {string} variables.type - Tipo da transação (EARNING/EXPENSE/INVESTMENT).
   */
  create: async (variables) => {
    const payload = {
      name: String(variables.name ?? '').trim(),
      date: normalizeDateTime(variables.date),
      amount: Number(variables.amount),
      type: normalizeType(variables.type),
    }

    const userId = String(variables.user_id ?? '').trim()
    if (userId) {
      payload.user_id = userId
    }

    const response = await api.post('/transactions/me', payload)
    return response.data
  },
  /**
   * Retorna as transações do usuário autenticado.
   * @param {Object} variables
   * @param {string} variables.from - Data inicial (YYYY-MM-DD).
   * @param {string} variables.to - Data final (YYYY-MM-DD).
   */
  getAll: async (variables) => {
    const { from, to } = sanitizeDateRange(variables.from, variables.to)
    const query = queryString.stringify({ from, to })
    const response = await api.get(`/transactions/me?${query}`)
    return response.data
  },
  /**
   * Atualiza uma transação do usuário autenticado.
   * @param {Object} variables - Dados da transação.
   * @param {string} variables.id - ID da transação.
   * @param {string} variables.name - Nome da transação.
   * @param {string|Date} variables.date - Data da transação (datetime ISO).
   * @param {number} variables.amount - Valor da transação.
   * @param {string} variables.type - Tipo da transação (EARNING/EXPENSE/INVESTMENT).
   */
  update: async (variables) => {
    const response = await api.patch(`/transactions/me/${variables.id}`, {
      name: variables.name,
      date: normalizeDateTime(variables.date),
      amount: Number(variables.amount),
      type: normalizeType(variables.type),
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