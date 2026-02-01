import type { EventData } from './types'
import EventList from './EventList'
import { useState, useEffect } from 'react'
import EventsHeader from './EventsPageHeader'
import EventDetails from './EventDetails'
import { useSearchParams } from 'react-router-dom'
import { apiFetch } from '../../services/api'

const EventsPageCurrent = () => {
    const [searchParams] = useSearchParams()
    const id = searchParams.get('id')

    const [events, setEvents] = useState<EventData[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null)
    const [error, setError] = useState<string | null>(null)

    // use RequestInit to fetch from api
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await apiFetch('events/')
                if (res.ok) {
                    const data = await res.json()
                    let eventsList: EventData[] = []

                    for (const event of data['upcoming']) {
                        const dateObj = new Date(event.startTime)
                        eventsList.push({
                            id: event.id,
                            title: event.title,
                            organizer: 'IITB',
                            description: event.content,
                            image: event.imageURL,
                            date: dateObj.toLocaleDateString(),
                            time: dateObj.toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                            }),
                            location: event.location,
                            rating: event.rating || 0,
                            reviewCount: event.reviewCount || 0,
                        })
                    }

                    setEvents(eventsList)
                    if (id) {
                        const event = eventsList.find(
                            (event: EventData) => event.id === Number(id),
                        )
                        if (event) {
                            setSelectedEvent(event)
                        }
                    } else {
                        setSelectedEvent(eventsList[0])
                    }
                } else {
                    setError('Could not load events')
                }
            } catch (_error) {
                setError('Could not load events')
            } finally {
                setLoading(false)
            }
        }

        fetchEvents()
    }, [id])

    if (loading) {
        return (
            <p className="text-center mt-5 text-light fs-4">
                Loading events...
            </p>
        )
    }

    if (error) {
        return <p className="text-center mt-5 text-danger fs-4">{error}</p>
    }

    if (events.length === 0) {
        return (
            <p className="text-center mt-5 text-light fs-4">
                No current events available.
            </p>
        )
    }

    return (
        <div
            className="container-fluid min-vh-100"
            style={{ backgroundColor: '#16181F' }}
        >
            <div className="row min-vh-100">
                <div
                    className="col-md-3 col-lg-3 overflow-auto"
                    style={{
                        height: '100vh',
                        minHeight: 0,
                        paddingTop: '30px',
                        borderRight: ' 1px solid rgba(237, 238, 243, 0.1) ',
                        borderTopRightRadius: '16px',
                        borderBottomRightRadius: '16px',
                    }}
                >
                    {/* Events list */}
                    <EventList
                        events={events}
                        selectedId={selectedEvent.id}
                        onSelect={setSelectedEvent}
                    />
                </div>

                {/* Main content */}

                <div
                    className="col-md-9 col-lg-9 overflow-auto p-4"
                    style={{ backgroundColor: '#0E0F13' }}
                >
                    {/* Header */}
                    <EventsHeader upcoming={true} />

                    {/* Event Details */}
                    <EventDetails event={selectedEvent} isCurrent={true} />

                    {/* Footer */}
                    <div
                        className="text-center mt-1 "
                        style={{ fontSize: '10px', color: '#B2B6C7' }}
                    >
                        **InstiView is not responsible for the content/matter
                        that is represented by the above Club/Team/Person**
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventsPageCurrent
