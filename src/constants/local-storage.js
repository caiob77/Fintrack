export const LOCAL_ACCESS_TOKEN_KEY = 'accessToken'
export const LOCAL_REFRESH_TOKEN_KEY = 'refreshToken'

const normalizeToken = (value) => {
    if (!value) return null
    if (value === 'undefined' || value === 'null' || value === '[object Object]') {
        return null
    }
    return value
}

export const setTokens = (accessToken, refreshToken) => {
    if (!accessToken || !refreshToken) {
        return
    }
    localStorage.setItem(LOCAL_ACCESS_TOKEN_KEY, accessToken)
    localStorage.setItem(LOCAL_REFRESH_TOKEN_KEY, refreshToken)
}

export const getTokens = () => {
    return {
        accessToken: normalizeToken(localStorage.getItem(LOCAL_ACCESS_TOKEN_KEY)),
        refreshToken: normalizeToken(localStorage.getItem(LOCAL_REFRESH_TOKEN_KEY)),
    }
}

export const removeTokens = () => {
    localStorage.removeItem(LOCAL_ACCESS_TOKEN_KEY)
    localStorage.removeItem(LOCAL_REFRESH_TOKEN_KEY)
}