import { useNavigate } from 'react-router-dom'

function DashboardPage({ bookings, startNewBooking }) {
  const navigate = useNavigate()

  function handleNewBooking() {
    startNewBooking()
    navigate('/')
  }

  return (
    <section className="dashboard-section page-shell">
      <div className="dashboard-header">
        <div>
          <span className="eyebrow">Customer dashboard</span>
          <h2>Your service requests</h2>
          <p>Confirmed bookings are saved in this browser until we connect the backend.</p>
        </div>
        <button type="button" className="secondary-button" onClick={handleNewBooking}>
          New booking
        </button>
      </div>

      {bookings.length === 0 ? (
        <div className="empty-state">
          <strong>No bookings yet</strong>
          <p>Complete the customer booking flow to see confirmed requests here.</p>
        </div>
      ) : (
        <div className="booking-list">
          {bookings.map((booking) => (
            <article className="booking-card" key={booking.id}>
              <div>
                <span className="booking-id">{booking.id}</span>
                <h3>{booking.company} {booking.appliance}</h3>
                <p>{booking.issue}</p>
              </div>
              <div className="booking-facts">
                <span><strong>Technician</strong>{booking.technician}</span>
                <span><strong>Slot</strong>{booking.slot}</span>
                <span><strong>Pincode</strong>{booking.pincode}</span>
                <span><strong>Created</strong>{booking.createdAt}</span>
              </div>
              <span className="status-pill">{booking.status}</span>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default DashboardPage
