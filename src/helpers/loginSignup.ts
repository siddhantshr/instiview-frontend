export const loginUser = async (username: string, password: string) => {
    try {
        const response = await fetch('https://api-vouch.sidshr.in/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: username, password: password }),
        })
        return response
    } catch (_error) {
        throw new Error('Login failed')
    }
}

export const signupUser = async (username: string, password: string) => {
    try {
        const response = await fetch(
            'https://api-vouch.sidshr.in/api/register/',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            },
        )
        return response
    } catch (_error) {
        throw new Error('Signup failed')
    }
}
