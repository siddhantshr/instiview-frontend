import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { apiFetch } from '../../services/api'

const EventsHeader = ({ upcoming }: { upcoming: boolean }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [_searchParams, setSearchParams] = useSearchParams()

    const handleSearch = async () => {
        try {
            const res = await apiFetch(
                'events/?search=' + encodeURIComponent(searchTerm),
            )
            if (res.ok) {
                const data = await res.json()
                const eventKey = upcoming ? 'upcoming' : 'past'

                if (data[eventKey].length > 0) {
                    const firstEventId = data[eventKey][0].id
                    setSearchParams({ id: firstEventId.toString() })
                } else {
                    setError('Could not find event')
                }
            } else {
                setError('Could not find event')
            }
        } catch (_error) {
            setError('Could not find event')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div
            className="d-flex justify-content-between align-items-start w-100"
            style={{ paddingTop: '40px', paddingBottom: '20px' }}
        >
            <div className="d-none d-md-block" style={{}}></div>
            <div className="d-flex flex-column align-items-center">
                <style>
                    {`
            .placeholder::placeholder {
              color: #EDEEF3 !important;
            }
          `}
                </style>
                {/* Search */}
                <div
                    className="position-relative mb-2"
                    style={{ width: '320px', maxWidth: '100%', height: '40px' }}
                >
                    <i
                        className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3"
                        style={{ color: '#EDEEF3' }}
                    ></i>
                    <input
                        type="text"
                        className="placeholder form-control rounded-pill ps-5 py-2"
                        placeholder="Search for Events"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            backgroundColor: '#16181F',
                            border: '1px solid #2B2F3A',
                            color: 'white',
                            cursor: 'text',
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch()
                            }
                        }}
                    ></input>
                    <button
                        className="btn btn-primary fw-bold rounded-pill position-absolute top-50 end-0 translate-middle-y "
                        style={{
                            width: '60px',
                            background:
                                'linear-gradient(90deg, #5B6CFF 0%, #374199 100%)',
                            border: '1px solid #2B2F3A',
                            fontSize: '12px',
                            marginRight: '15px',
                            color: '#EDEEF3',
                        }}
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>

                {/* Categories */}
                <div className="d-flex gap-2 align-items-center">
                    <span className="small" style={{ color: '#EDEEF3' }}>
                        Choose Category
                    </span>
                    {['New', 'Top Rated', 'Popular'].map((filter) => (
                        <button
                            key={filter}
                            className="btn btn-sm"
                            style={{
                                color: '#ffffff',
                                backgroundColor: '#1A1F2E',
                                fontSize: '12px',
                                border: '1px solid #2B2F3A',
                                borderRadius: '15px',
                                width: '72px',
                            }}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.borderColor = '#16181F')
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.borderColor = '#2B2F3A')
                            }
                        >
                            {filter}
                        </button>
                    ))}
                </div>
                <div className="text-center mt-3 text-white">
                    {loading ? 'Loading...' : null}
                </div>
                <div className="text-danger">{error ? error : null}</div>
            </div>

            {/* Home */}
            <div style={{ paddingLeft: '100px', paddingRight: '20px' }}>
                <Link
                    to="/mainscreen"
                    className="text-white-50 text-decoration-none small hover-white "
                >
                    <i className="bi bi-chevron-left me-1"></i> Back to HOME
                </Link>
            </div>
        </div>
    )
}

export default EventsHeader
