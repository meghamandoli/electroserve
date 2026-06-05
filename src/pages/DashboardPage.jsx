import { useNavigate } from 'react-router-dom'
import { cancelledStatus, getNextStatus, getStatusIndex, getStatusLabel, serviceStatuses } from '../data/statuses'

function DashboardPage({ bookings, startNewBooking, updateBookingStatus }) {
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
            <BookingCard booking={booking} key={booking.id} updateBookingStatus={updateBookingStatus} />
          ))}
        </div>
      )}
    </section>
  )
}

function BookingCard({ booking, updateBookingStatus }) {
  const isCancelled = booking.status === cancelledStatus.id
  const isCompleted = booking.status === 'completed'
  const nextStatus = getNextStatus(booking.status)
  const activeIndex = getStatusIndex(booking.status)
  const statusLabel = booking.statusLabel || getStatusLabel(booking.status)

  return (
    <article className={`booking-card ${isCancelled ? 'is-cancelled' : ''}`}>
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
      <div className="booking-status-panel">
        <span className={`status-pill status-${booking.status}`}>{statusLabel}</span>
        <div className="status-timeline" aria-label={`${booking.id} service progress`}>
          {serviceStatuses.map((status, index) => (
            <span
              className={`timeline-dot ${index <= activeIndex && !isCancelled ? 'is-done' : ''}`}
              key={status.id}
              title={status.label}
            >
              {index + 1}
            </span>
          ))}
        </div>
        <div className="status-actions">
          {nextStatus && !isCancelled && (
            <button type="button" onClick={() => updateBookingStatus(booking.id, nextStatus.id)}>
              Mark {nextStatus.label}
            </button>
          )}
          {!isCompleted && !isCancelled && (
            <button
              className="danger-button"
              type="button"
              onClick={() => updateBookingStatus(booking.id, cancelledStatus.id)}
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </article>
  )
}

export default DashboardPage
