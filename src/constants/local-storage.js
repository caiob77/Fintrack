export const LOCAL_ACCESS_TOKEN_KEY = 'accessToken'
export const LOCAL_REFRESH_TOKEN_KEY = 'refreshToken'

export const setTokens = (accessToken, refreshToken) => {
    localStorage.setItem(LOCAL_ACCESS_TOKEN_KEY, accessToken)
    localStorage.setItem(LOCAL_REFRESH_TOKEN_KEY, refreshToken)
}

export const getTokens = () => {
    return {
        accessToken: localStorage.getItem(LOCAL_ACCESS_TOKEN_KEY),
        refreshToken: localStorage.getItem(LOCAL_REFRESH_TOKEN_KEY),
    }
}