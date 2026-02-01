import { apiFetch } from '../services/api'
import type { EventData } from '../types/eventData'

export const fetchEventsHelper = async (upcoming: boolean) => {
    const res = await apiFetch('events/')

    if (res.ok) {
        const data = await res.json()
        const eventKey = upcoming ? 'upcoming' : 'past'
        let EventsList: EventData[] = []

        for (const event of data[eventKey]) {
            const dateObj = new Date(event.startTime)

            EventsList.push({
                id: event.id,
                title: event.title,
                organizer: 'IITB',
                image: event.imageURL,
                date: dateObj.toLocaleDateString(),
                time: dateObj.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                }),
                location: event.location,
                rating: event.rating || 0,
                reviewCount: event.reviewCount || 0,
                description: event.content,
            })
        }

        return EventsList
    } else {
        throw new Error('Could not fetch events')
    }
}
