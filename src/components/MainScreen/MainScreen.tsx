import { useEffect, useState } from 'react'
import NavMainScreen from './NavMainScreen'
import { Link } from 'react-router-dom'
import styles from './MainScreen.module.css'
import IITBlogo from '../../assets/a6371bb1bc5c10af6705a1160e2316543b265585.png'
import ProfileButton from '../../assets/3ca8ab14a39dc09cb18dd60e3cae4e2429071635.png'
import EventCardMain from '../MainScreen/EventCardsMain'
import type { EventData } from '../EventsPage/types'
import { fetchEventsHelper } from '../../helpers/getEvents'

const MainScreen = () => {
    const [inputValue, setInputValue] = useState('')
    const [_searchTerm, setSearchTerm] = useState('')
    const username = localStorage.getItem('username') || 'User'
    const [upcomingEvents, setUpcomingEvents] = useState<EventData[]>([])
    const [pastEvents, setPastEvents] = useState<EventData[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                await fetchEventsHelper(true).then((events) => {
                    console.log(events)
                    setUpcomingEvents(events.slice(0, 3))
                })
                await fetchEventsHelper(false).then((events) => {
                    setPastEvents(events.slice(0, 3))
                })
            } catch (_error) {
                setError('Could not load events')
            } finally {
                console.log(upcomingEvents, pastEvents)
                setLoading(false)
            }
        }

        fetchEvents()
    }, [])

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

    if (upcomingEvents.length === 0 && pastEvents.length === 0) {
        return (
            <p className="text-center mt-5 text-light fs-4">
                No current events available.
            </p>
        )
    }

    return (
        <div
            className="login-page min-vh-100 d-flex flex-column text-white"
            style={{ backgroundColor: '#0E0F13' }}
        >
            <NavMainScreen />
            <div
                className=" Heading "
                style={{
                    position: 'absolute',
                    top: '172px',
                    left: '62px',
                    width: '1316px',
                    height: '87px',
                    fontFamily: 'Manrope, sans-serif',
                    fontSize: '64px',
                    fontWeight: 700,
                    color: '#B2B6C7',

                    textAlign: 'center',
                    lineHeight: '1.2',
                }}
            >
                Where campus events live beyond the day!
            </div>
            <div
                style={{
                    position: 'absolute',
                    width: '126px',
                    height: '48px',
                    top: '32px',
                    left: '1265px',
                }}
            >
                <div
                    className="d-flex align-items-center justify-content-center gap-2"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '10px',
                        background: 'linear-gradient(-90deg, #5B6CFF, #374199)',
                        whiteSpace: 'nowrap',
                        color: '#EDEEF3',
                        fontFamily: 'Manrope, sans-serif',
                        fontWeight: 400,
                        fontSize: '12px',
                        borderRadius: '10px',
                        border: '1px #7684FF solid',
                        textDecoration: 'none',
                    }}
                >
                    <img src={ProfileButton} alt="" width={25} height={25} />
                    <div>
                        Logged in as &gt;
                        <span
                            style={{
                                fontFamily: 'Manrope, sans-serif',
                                fontWeight: 700,
                                fontSize: '16px',
                            }}
                        >
                            <br />
                            {username}
                        </span>
                    </div>
                </div>
            </div>
            {/* <div
                className="mb-2"
                style={{
                    position: 'absolute',
                    maxWidth: '100%',
                    width: '320px',
                    height: '40px',
                    top: '320px',
                    left: '560px',
                }}
            >
                <i
                    className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3"
                    style={{ color: '#EDEEF3' }}
                ></i>
                <input
                    type="text"
                    className="placeholder form-control rounded-pill ps-5 py-2"
                    placeholder="Search for Events"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    style={{
                        backgroundColor: '#16181F',
                        border: '1px solid #2B2F3A',
                        color: 'white',
                        cursor: 'text',
                    }}
                ></input>
                <button
                    onClick={() => setSearchTerm(inputValue)}
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
                >
                    Search
                </button>
            </div> */}

            <div className="mt-4">
                <div className="d-flex align-items-center justify-content-center gap-3">
                    <span
                        className="text-light"
                        style={{
                            position: 'absolute',
                            left: '532px',
                            top: '384px',
                            width: '134px',
                            height: '22px',
                            fontFamily: 'Manrope, sans-serif',
                            fontSize: '16px',
                            fontWeight: 600,
                        }}
                    >
                        Choose Category
                    </span>

                    <Link
                        to="/events"
                        className={styles.categoryButton}
                        style={{
                            position: 'absolute',
                            left: '676px',
                            top: '384px',
                            width: '72px',
                            height: '24px',
                            fontFamily: 'Manrope, sans-serif',
                            fontSize: '13px',
                            fontWeight: 600,
                            paddingTop: '6px',
                            paddingBottom: '6px',
                            paddingLeft: '27px',
                            paddingRight: '27px',
                            gap: '10px',
                        }}
                    >
                        New
                    </Link>

                    <Link
                        to="/toprated"
                        className={styles.categoryButton}
                        style={{
                            position: 'absolute',
                            left: '756px',
                            top: '384px',
                            width: '72px',
                            height: '24px',
                            fontFamily: 'Manrope, sans-serif',
                            fontSize: '13px',
                            fontWeight: 600,
                            paddingTop: '6px',
                            paddingBottom: '6px',
                            paddingLeft: '27px',
                            paddingRight: '27px',
                            gap: '10px',
                        }}
                    >
                        Top Rated
                    </Link>
                    <Link
                        to="/popular"
                        className={styles.categoryButton}
                        style={{
                            position: 'absolute',
                            left: '836px',
                            top: '384px',
                            width: '72px',
                            height: '24px',
                            fontFamily: 'Manrope, sans-serif',
                            fontSize: '13px',
                            fontWeight: 600,
                            paddingTop: '6px',
                            paddingBottom: '6px',
                            paddingLeft: '27px',
                            paddingRight: '27px',
                            gap: '10px',
                        }}
                    >
                        Popular
                    </Link>
                </div>
            </div>
            <div
                style={{
                    position: 'absolute',
                    left: '134px',
                    top: '461px',
                    width: '266px',
                    height: '44px',

                    fontFamily: 'Manrope, sans-serif',
                    fontSize: '32px',
                    fontWeight: 600,
                    lineHeight: '1',
                    letterSpacing: '0%',
                    whiteSpace: 'nowrap',
                    color: '#EDEEF3',
                }}
            >
                Upcoming events
            </div>

            <Link
                to="/eventspagecurrent"
                className="btn btn-transparent text-white"
                style={{
                    position: 'absolute',
                    top: '494px',
                    left: '1084px',
                    gap: '3px',
                    width: '78px',
                    height: '24px',
                    whiteSpace: 'nowrap',
                }}
            >
                See all &gt;
            </Link>

            <div
                className="card"
                style={{
                    position: 'absolute',
                    top: '528px',
                    left: '133px',
                    borderRadius: '18px',
                    borderColor: 'black',
                }}
            >
                <EventCardMain event={upcomingEvents[0]} />
            </div>
            <div
                className="card"
                style={{
                    position: 'absolute',
                    top: '528px',
                    left: '486px',
                    borderRadius: '18px',
                    borderColor: 'black',
                }}
            >
                <EventCardMain event={upcomingEvents[1]} />
            </div>
            <div
                className="card"
                style={{
                    position: 'absolute',
                    top: '528px',
                    left: '839px',
                    borderRadius: '18px',
                    borderColor: 'black',
                }}
            >
                <EventCardMain event={upcomingEvents[2]} />
            </div>
            <div
                style={{
                    position: 'absolute',
                    left: '135px',
                    top: '832px',
                    width: '179px',
                    height: '44px',

                    fontFamily: 'Manrope, sans-serif',
                    fontSize: '32px',
                    fontWeight: 600,
                    lineHeight: '1',
                    letterSpacing: '0%',
                    whiteSpace: 'nowrap',
                    color: '#EDEEF3',
                }}
            >
                Past events
            </div>
            <Link
                to="/eventspagepast"
                className="btn btn-transparent text-white"
                style={{
                    position: 'absolute',
                    top: '865px',
                    left: '1084px',
                    gap: '3px',
                    width: '78px',
                    height: '24px',
                    whiteSpace: 'nowrap',
                }}
            >
                See all &gt;
            </Link>

            <div
                className="card"
                style={{
                    position: 'absolute',
                    top: '899px',
                    left: '134px',
                    borderRadius: '18px',
                    borderColor: 'black',
                }}
            >
                <EventCardMain event={pastEvents[0]} />
            </div>
            <div
                className="card"
                style={{
                    position: 'absolute',
                    top: '899px',
                    left: '487px',
                    borderRadius: '18px',
                    borderColor: 'black',
                }}
            >
                <EventCardMain event={pastEvents[1]} />
            </div>
            <div
                className="card"
                style={{
                    position: 'absolute',
                    top: '899px',
                    left: '840px',
                    borderRadius: '18px',
                    borderColor: 'black',
                }}
            >
                <EventCardMain event={pastEvents[2]} />
            </div>
            <div
                className="d-flex gap-3"
                style={{
                    position: 'absolute',
                    width: '493px',
                    height: '55px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    top: '1205px',
                    justifyContent: 'center',
                }}
            >
                <Link
                    to="/addevents"
                    className="btn btn-dark"
                    style={{
                        background: 'linear-gradient(90deg, #5B6CFF, #374199)',
                        fontFamily: 'Manrope, sans-serif',
                        fontWeight: 600,
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    Add Event(s) &gt;
                </Link>
            </div>
            <div
                style={{
                    position: 'absolute',
                    width: '206px',
                    height: '44px',
                    top: '1325px',
                    left: '138px',
                    fontFamily: 'Manrope, sans-serif',
                    fontWeight: 600,
                    lineHeight: '100%',
                    fontSize: '32px',
                    color: '#EDEEF3',
                }}
            >
                Most Awaited
            </div>
            <div
                style={{
                    position: 'absolute',
                    width: '615px',
                    height: '87px',
                    top: '1772px',
                    left: '138px',
                    fontFamily: 'Manrope, sans-serif',
                    fontWeight: 600,
                    fontSize: '64px',
                    lineHeight: '100%',
                    color: '#EDEEF3',
                }}
            >
                Techfest
                <span
                    style={{
                        fontFamily: 'Manrope, sans-serif',
                        fontWeight: 400,
                        fontSize: '32px',
                        fontStyle: 'semibold',
                    }}
                >
                    -A Simulated Paradigm
                </span>
            </div>
            <div
                style={{
                    position: 'absolute',

                    height: '30px',
                    top: '1862px',
                    left: '138px',
                    fontFamily: 'Manrope, sans-serif',
                    fontWeight: 600,
                    fontSize: '32px',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                    background: 'linear-gradient(90deg, #5B6CFF, #374199)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}
            >
                A celebration of innovation, technology, and ideas
            </div>
            <div
                style={{
                    position: 'absolute',
                    width: '211px',
                    height: '27px',
                    top: '1875px',
                    left: '1139px',
                    fontFamily: 'Manrope, sans-serif',
                    fontWeight: 600,
                    fontSize: '20px',
                    color: '#EDEEF3',
                }}
            >
                22nd - 25th December
            </div>
            <div
                style={{
                    position: 'absolute',
                    top: '1932px',
                    left: '138px',
                    fontFamily: 'Manrope, sans-serif',
                    fontWeight: 500,
                    fontSize: '24px',
                    background: 'linear-gradient(90deg, #7684FF, #474F99)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}
            >
                Techfest is IIT Bombay’s annual technology festival that
                showcases innovation through competitions, lectures, workshops,
                and large-scale exhibitions, making technology accessible,
                engaging, and impactful for students across disciplines.
            </div>
            <div
                style={{
                    position: 'absolute',
                    width: '391px',
                    height: '49px',
                    top: '2082px',
                    left: '138px',
                    fontFamily: 'Manrope, sans-serif',
                    fontWeight: 600,
                    fontSize: '36px',
                    color: '#EDEEF3',
                    whiteSpace: 'nowrap',
                }}
            >
                Grab Your Tickets Now!
            </div>
            <div
                style={{
                    position: 'absolute',
                    width: '287px',
                    height: '22px',
                    top: '2103px',
                    left: '1063px',
                    fontFamily: 'Manrope, sans-serif',
                    fontWeight: 300,
                    fontSize: '16px',
                    color: '#EDEEF3',
                }}
            >
                Registration is mandatory for all visitors
            </div>
            <div
                style={{
                    position: 'absolute',
                    width: '302px',
                    height: '22px',
                    top: '2341px',
                    left: '569px',
                    fontFamily: 'Manrope, sans-serif',
                    fontWeight: 300,
                    fontSize: '16px',
                    color: '#EDEEF3',
                }}
            >
                An initiative by the Students of IIT Bombay
            </div>
            <Link
                to="/termsandconditions"
                className="btn btn-transparent text-#EDEEF3"
                style={{
                    position: 'absolute',
                    top: '2346px',
                    left: '1173px',

                    width: '177px',
                    height: '27px',
                    fontFamily: 'Manrope, sans-serif',
                    fontWeight: 300,
                    fontSize: '20px',
                    color: '#EDEEF3',
                    whiteSpace: 'nowrap',
                }}
            >
                Terms & Conditions
            </Link>
            <div
                style={{
                    position: 'absolute',
                    width: '100px',
                    height: '98px',
                    top: '2269px',
                    left: '138px',
                }}
            >
                <img src={IITBlogo} alt="" width={100} height={98} />
            </div>
            <div
                className="btn text-white"
                style={{
                    position: 'absolute',
                    width: '211px',
                    height: '40px',
                    top: '1800px',
                    left: '1139px',
                    borderRadius: '10px',
                    border: '1px',
                    background: 'linear-gradient(90deg, #5B6CFF, #374199)',
                    borderColor: '#2B2F3A',
                    color: '#EDEEF3',
                    fontFamily: 'Manrope, sans-serif',
                }}
            >
                <a
                    href="https://techfest.org/"
                    style={{ textDecoration: 'none', color: 'white' }}
                >
                    Link to official Website &gt;
                </a>
            </div>
        </div>
    )
}

export default MainScreen
