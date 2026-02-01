import { useEffect } from 'react'
import { useState } from 'react'
import type { EventData } from './types'
import BlueTickIcon from '../../assets/bluetick.svg'
import { postRatingHelper } from '../../helpers/postRating'

interface EventDetailProps {
    event: EventData
    isCurrent?: boolean
}

const EventDetail = ({ event, isCurrent }: EventDetailProps) => {
    const [isExpanded, setIsExpanded] = useState(false)
    useEffect(() => {
        setIsExpanded(false)
    }, [event.id])
    const textToShow =
        isExpanded || !(event.description.length > 150)
            ? event.description
            : event.description.slice(0, 150) + '...'
    const [isAttended, setIsAttended] = useState(false)
    const [userRating, setUserRating] = useState(0)
    const [hoverRating, setHoverRating] = useState(0)
    const [successfullyRated, setSuccessfullyRated] = useState(false)

    useEffect(() => {
        const postRating = async () => {
            try {
                const resp = await postRatingHelper(event.id, userRating)
                if (resp) {
                    setSuccessfullyRated(true)
                } else {
                    setSuccessfullyRated(false)
                }
            } catch (error) {
                console.error('Error posting rating:', error)
                setSuccessfullyRated(false)
            }
        }

        if (userRating > 0) {
            postRating()
        }
    }, [userRating])

    return (
        <div
            className=""
            style={{
                backgroundColor: '#0E0F13',
                border: '2px solid #2B2F3A',
                height: 'fit-content',
                padding: '18px',
                marginLeft: '100px',
                marginRight: '100px',
                marginTop: '50px',
                paddingTop: '32px',
                borderRadius: '15px',
                paddingBottom: '18px',
            }}
        >
            {/* Image */}
            <div
                className="w-100 mb-4 overflow-hidden position-relative"
                style={{ height: '280px' }}
            >
                <img
                    src={event.image}
                    className="w-100 h-100"
                    style={{ objectFit: 'cover', borderRadius: '15px' }}
                />
            </div>

            {/* Title */}
            <div
                className="d-flex justify-content-between align-items-start mb-3"
                style={{ paddingLeft: '59px' }}
            >
                <div>
                    <h2
                        className="fw-medium mb-0"
                        style={{ color: '#EDEEF3', fontSize: '44px' }}
                    >
                        {event.title}
                    </h2>
                    <p
                        className="mb-1"
                        style={{ color: '#B2B6C7', fontSize: '14px' }}
                    >
                        organised by {event.organizer}
                    </p>
                </div>
                <button
                    className="btn btn-sm text-white"
                    style={{ paddingRight: '61px', fontSize: '12px' }}
                >
                    More <i className="bi bi-chevron-down"></i>
                </button>
            </div>

            {/* Description */}
            <div className="mb-4" style={{ paddingLeft: '59px' }}>
                <p
                    className="mb-0"
                    style={{ color: 'white', fontSize: '12px' }}
                >
                    ABOUT
                </p>
                <p
                    className=""
                    style={{
                        maxWidth: '90%',
                        color: '#EDEEF3',
                        fontSize: '14px',
                    }}
                >
                    {textToShow}
                    {event.description.length > 150 && (
                        <span
                            className="ms-1 fw-bold"
                            onClick={() => setIsExpanded(!isExpanded)}
                            style={{ cursor: 'pointer', color: '#522991' }}
                        >
                            {isExpanded ? ' Show Less' : ' Read More'}
                        </span>
                    )}
                </p>
            </div>

            {/* More Info */}
            <div className="row" style={{ maxWidth: '100%' }}>
                {/* Time, Venue, Date */}
                <div
                    className="col-md"
                    style={{ paddingLeft: '59px', maxWidth: '37%' }}
                >
                    <div
                        className="h-100 d-flex flex-column justify-content-center"
                        style={{
                            backgroundColor: '#0E0F13',
                            border: '2px solid #2B2F3A',
                            borderRadius: '15px',
                            paddingLeft: '30px',
                            paddingRight: '40px',
                            paddingTop: '10px',
                        }}
                    >
                        {!isCurrent && (
                            <p
                                className="mb-2 fw-medium"
                                style={{ fontSize: '16px', color: '#FFFFFF' }}
                            >
                                Happened At
                            </p>
                        )}
                        <InfoRow
                            icon="geo-alt"
                            label="Location"
                            value={event.location}
                        />
                        <InfoRow
                            icon="calendar-event"
                            label="Date"
                            value={event.date}
                        />
                        <InfoRow icon="clock" label="Time" value={event.time} />
                    </div>
                </div>

                {/* Ratings */}
                <div className="col-md" style={{ maxWidth: '42%' }}>
                    <div className="d-flex flex-column gap-3 h-100">
                        {/* Ratings Summary */}
                        <div
                            className="d-flex flex-column justify-content-center"
                            style={{
                                backgroundColor: '#0E0F13',
                                border: '2px solid #2B2F3A',
                                borderRadius: '15px',
                                padding: '20px',
                                flex: 1,
                            }}
                        >
                            <p
                                className="mb-2 "
                                style={{ fontSize: '16px', color: '#FFFFFF' }}
                            >
                                Ratings Summary:
                            </p>
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center">
                                    <div
                                        className="text-warning me-2"
                                        style={{ fontSize: '1.2rem' }}
                                    >
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <i
                                                key={star}
                                                className={`bi bi-star${star <= Math.floor(event.rating) ? '-fill' : ''} me-1`}
                                            ></i>
                                        ))}
                                    </div>
                                    <span
                                        className=""
                                        style={{
                                            fontSize: '16px',
                                            color: '#EDEEF3',
                                        }}
                                    >
                                        ({event.rating}/5)
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* 2. BOTTOM BOX: Rate Here */}
                        <div
                            className="d-flex flex-column justify-content-center"
                            style={{
                                backgroundColor: '#0E0F13',
                                border: '2px solid #2B2F3A',
                                borderRadius: '15px',
                                padding: '20px',
                                flex: 1,
                            }}
                        >
                            <small
                                className="text-white mb-2 d-block"
                                style={{ fontSize: '1rem' }}
                            >
                                Rate Here: ✨
                            </small>

                            <div className="d-flex align-items-center justify-content-between">
                                <div
                                    className="d-flex align-items-center"
                                    style={{
                                        fontSize: '1.5rem',
                                        cursor: 'pointer',
                                    }}
                                    onMouseLeave={() => setHoverRating(0)}
                                >
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <i
                                            key={star}
                                            className={`bi bi-star${star <= (hoverRating || userRating) ? '-fill' : ''} me-2`}
                                            style={{
                                                color:
                                                    star <=
                                                    (hoverRating || userRating)
                                                        ? '#f6ac16'
                                                        : '#6c757d',
                                            }}
                                            onMouseEnter={() =>
                                                setHoverRating(star)
                                            }
                                            onClick={() => setUserRating(star)}
                                        ></i>
                                    ))}
                                </div>
                                <span
                                    className="fw-light"
                                    style={{
                                        fontSize: '16px',
                                        color: '#EDEEF3',
                                    }}
                                >
                                    Rate out of 5
                                </span>
                            </div>
                            <small
                                className="text-center mt-2 d-block"
                                style={{ fontSize: '10px', color: '#B2B6C7' }}
                            >
                                {successfullyRated
                                    ? 'Thank you for rating!'
                                    : 'You have already rated this event.'}
                            </small>
                        </div>
                    </div>
                </div>
                <div className="col-md" style={{ maxWidth: '21%' }}>
                    <div
                        className="d-flex flex-column justify-content-center align-items-center"
                        style={{
                            backgroundColor: '#0E0F13',
                            border: '2px solid #2B2F3A',
                            borderRadius: '15px',
                            paddingTop: '10px',
                            paddingBottom: '10px',
                        }}
                    >
                        <p
                            className="mb-2"
                            style={{ fontSize: '10px', color: '#EDEEF3' }}
                        >
                            Total Registerations
                        </p>
                        <span
                            className=""
                            style={{ fontSize: '16px', color: '#FFFFFF' }}
                        >
                            1000+{' '}
                            {/* Do we have to add Number of registerations???*/}
                        </span>
                    </div>
                    <div
                        className="d-flex align-items-center justify-content-center gap-2"
                        onClick={() => setIsAttended(!isAttended)}
                        style={{ cursor: 'pointer', padding: '10px' }}
                    >
                        {/* Blue */}
                        <div
                            className="d-flex justify-content-center align-items-center gap-2"
                            style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                color: '#0d6efd',
                                paddingTop: '100px',
                            }}
                        >
                            <img
                                src={BlueTickIcon}
                                alt="BlueTick"
                                width="34"
                                height="34"
                            />

                            <span
                                style={{
                                    color: 'rgba(237, 238, 243, 0.6)',
                                    fontSize: '16px',
                                    fontWeight: '500',
                                }}
                            >
                                Mark as {isCurrent ? 'Interested' : 'Attended'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="text-end mt-3 "
                style={{ fontSize: '10px', color: '#B2B6C7' }}
            >
                *Clubs/Teams/People cancel events that are only added by them
            </div>
        </div>
    )
}

const InfoRow = ({
    icon,
    label,
    value,
}: {
    icon: string
    label: string
    value: string
}) => (
    <div className="d-flex align-items-center mb-3">
        <i
            className={`bi bi-${icon} text-info me-3`}
            style={{ fontSize: '25px' }}
        ></i>
        <div>
            <small
                className="d-block"
                style={{ fontSize: '10px', color: '#B2B6C7' }}
            >
                {label}
            </small>
            <strong className="" style={{ fontSize: '20px', color: '#B2B6C7' }}>
                {value}
            </strong>
        </div>
    </div>
)

export default EventDetail
