import BasicEventDetails from './BasicEventDetails'
import EventMetaInformation from './EventMetaInformation'
import OrganiserDetails from './OrganiserDetails.tsx'

const AddEventForm = () => {
    return (
        <div className="col-12">
            <div
                className=""
                style={{
                    backgroundColor: '#16181F',
                    border: '1px solid #2B2F3A',
                    borderRadius: '15px',
                    paddingLeft: '38px',
                    paddingTop: '20px',
                    paddingRight: '29px',
                }}
            >
                <BasicEventDetails />
                <EventMetaInformation />
                <OrganiserDetails />

                <div className="d-flex justify-content-center mb-4">
                    <button
                        type="button"
                        // onClick={handleSubmit} have to set this onclick
                        className="btn btn-primary rounded-pill px-4 py-2 fw-bold"
                        style={{
                            background:
                                'linear-gradient(90deg, #5B6CFF 0%, #374199 100%)',
                            border: '1px solid #2B2F3A',
                            color: '#FFFFFF',
                            fontSize: '18px',
                            width: '200px',
                            height: '50px',
                        }}
                    >
                        Publish Event
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddEventForm
