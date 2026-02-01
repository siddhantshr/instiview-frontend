import { apiFetch } from '../services/api'

export const postRatingHelper = async (eventId: number, rating: number) => {
    const res = await apiFetch(`events/${eventId}/reviews/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rating: rating, comment: 'null' }),
    })
    if (res.ok) {
        return true
    } else if (res.status === 409) {
        return false
    } else {
        throw new Error('Could not post rating')
    }
}
