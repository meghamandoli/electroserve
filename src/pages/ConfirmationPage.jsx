import { useNavigate } from 'react-router-dom'
import BookingStepper from '../components/BookingStepper'

function ConfirmationPage({
  activeAppliance,
  activeCompany,
  activeTechnician,
  bookingConfirmed,
  createBooking,
  form,
  formError,
}) {
  const navigate = useNavigate()

  function confirmAndOpenDashboard() {
    const bookingCreated = createBooking()
    if (bookingCreated) {
      navigate('/dashboard')
    }
  }

  return (
    <section className="booking-workspace page-shell">
      <BookingStepper activeStep={4} />
      <div className="confirmation-panel route-confirmation">
        <div className="confirmation-copy">
          <span className="eyebrow">Final step</span>
          <h2>Booking summary</h2>
          <p>
            {activeCompany.name} {activeAppliance.name} service for {form.name || 'customer'} at{' '}
            {form.address || 'selected address'}.
          </p>
        </div>
        <div className="summary-list">
          <span><strong>Company</strong>{activeCompany.name}</span>
          <span><strong>Appliance</strong>{activeAppliance.name}</span>
          <span><strong>Technician</strong>{activeTechnician.name}</span>
          <span><strong>Slot</strong>{form.date} at {form.time}</span>
          <span><strong>Warranty</strong>{form.warranty}</span>
          <span><strong>Status</strong>{bookingConfirmed ? 'Technician assigned' : 'Ready to confirm'}</span>
        </div>
        <button className="confirm-button" type="button" onClick={confirmAndOpenDashboard}>
          Confirm booking
        </button>
        {formError && <p className="form-error">{formError}</p>}
        {bookingConfirmed && <p className="success-message">Booking saved to your customer dashboard.</p>}
      </div>
    </section>
  )
}

export default ConfirmationPage
