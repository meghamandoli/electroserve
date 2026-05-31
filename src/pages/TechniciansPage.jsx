import { useNavigate } from 'react-router-dom'
import BookingStepper from '../components/BookingStepper'

function TechniciansPage({
  activeAppliance,
  activeCompany,
  form,
  selectedTechnician,
  setBookingConfirmed,
  setSelectedTechnician,
  visibleTechnicians,
}) {
  const navigate = useNavigate()

  return (
    <section className="technician-section page-shell">
      <div className="booking-workspace nested-workspace">
        <BookingStepper activeStep={3} />
        <div>
          <div className="section-heading">
            <span className="eyebrow">Step 3</span>
            <h2>Available technicians</h2>
            <p>
              Showing technicians for {activeCompany.name}, {activeAppliance.name}, pincode{' '}
              {form.pincode || 'any'}.
            </p>
          </div>
          <div className="technician-grid">
            {visibleTechnicians.map((technician) => (
              <button
                className={`technician-card ${selectedTechnician === technician.id ? 'is-active' : ''}`}
                key={technician.id}
                type="button"
                onClick={() => {
                  setSelectedTechnician(technician.id)
                  setBookingConfirmed(false)
                }}
              >
                <span className="avatar">{technician.name.split(' ').map((part) => part[0]).join('')}</span>
                <span className="technician-meta">
                  <strong>{technician.name}</strong>
                  <small>{technician.experience} experience | {technician.jobs} jobs</small>
                </span>
                <span className="badge success">Verified</span>
                <span className="metric">{technician.rating} rating</span>
                <span className="metric">{technician.slot}</span>
                <span className="charge">Rs. {technician.charge} visit</span>
              </button>
            ))}
          </div>
          <div className="page-actions">
            <button className="confirm-button" type="button" onClick={() => navigate('/confirmation')}>
              Continue to confirmation
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TechniciansPage
