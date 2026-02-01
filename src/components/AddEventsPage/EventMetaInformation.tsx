import { useState } from 'react'
import type { EventFormData } from './types'
import type { ChangeEvent } from 'react'

const headingStyle = { color: '#EDEEF3', fontSize: '32px' }
const subHeadingStyle = { color: '#FFFFFF', fontSize: '16px' }
const inputBoxStyle = {
    border: '2px solid #5B6CFF',
    borderRadius: '15px',
    backgroundColor: '#16181F',
    color: '#EDEEF3',
    fontSize: '16px',
    lineHeight: 'normal',
    fontWeight: 400,
    height: '48px',
    cursor: 'text',
    boxShadow: 'none',
    outline: 'none',
}

const EventMetaInformation = () => {
    const [formData, setFormData] = useState<EventFormData>({
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        organizer: '',
        contactName: '',
        contactEmail: '',
        allowRatings: false,
        makePublic: false,
        image: null,
        imagePreviewUrl: '',
    })
    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    return (
        <div className="mb-5">
            <style>
                {`
            .placeholder::placeholder {
              color: white !important;
                }
         `}
            </style>
            <div className="mb-3">
                <p className="fw-medium" style={headingStyle}>
                    Event Meta Information
                </p>
                <div className="row g-3" style={{ maxWidth: '90%' }}>
                    <Info
                        icon="bi-geo-alt"
                        label="Location"
                        name="location"
                        formData={formData}
                        handleChange={handleChange}
                    />
                    <Info
                        icon="bi-calendar-event"
                        label="Date"
                        name="date"
                        formData={formData}
                        handleChange={handleChange}
                    />
                    <Info
                        icon="bi-clock"
                        label="Time"
                        name="time"
                        formData={formData}
                        handleChange={handleChange}
                    />
                </div>
            </div>
        </div>
    )
}

const Info = ({
    icon,
    label,
    name,
    formData,
    handleChange,
}: {
    icon: string
    label: string
    name: string
    formData: EventFormData
    handleChange: (_e: ChangeEvent<HTMLInputElement>) => void
}) => (
    <div className="col-md-4">
        <label className="form-label" style={subHeadingStyle}>
            {label}
        </label>
        <div className="input-group">
            <span
                className="input-group-text bg-transparent border-end-0"
                style={{
                    ...inputBoxStyle,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                }}
            >
                <i className={`bi ${icon} text-info me-1`}></i>
            </span>
            <input
                type="text"
                name={name}
                className="placeholder form-control bg-transparent border-start-0"
                placeholder={`${label}...`}
                value={formData[name as keyof EventFormData] as string}
                onChange={handleChange}
                style={{
                    ...inputBoxStyle,
                    borderBottomLeftRadius: 0,
                    borderTopLeftRadius: 0,
                }}
            />
        </div>
    </div>
)

export default EventMetaInformation
