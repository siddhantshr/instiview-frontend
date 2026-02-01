import { redirectToLogin } from '../utils/redirect'
import {
    getRefreshToken,
    setAccessToken,
    setTokens,
    clearTokens,
} from '../utils/tokens'

const API_URL = 'https://api-vouch.sidshr.in/api/'

export const login = async (email: string, password: string) => {
    const response = await fetch(`${API_URL}auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
        throw new Error('Login failed')
    }

    const data = await response.json()
    setTokens(data.accessToken, data.refreshToken, data.username)
}

export const logout = () => {
    clearTokens()
    redirectToLogin()
}

export const refreshAccessToken = async () => {
    const refreshToken = getRefreshToken()
    if (!refreshToken) {
        logout()
        throw new Error('No refresh token available')
    }

    const response = await fetch(`${API_URL}token/refresh/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: refreshToken }),
    })

    if (!response.ok) {
        logout()
        throw new Error('Refresh token expired')
    }

    const data = await response.json()
    setAccessToken(data.access)
    return data.access
}
