import { useNavigate } from 'react-router-dom'
import { cancelledStatus, getNextStatus, getStatusIndex, getStatusLabel, serviceStatuses } from '../data/statuses'

function DashboardPage({ bookings, startNewBooking, updateBookingStatus }) {
  const navigate = useNavigate()
  const totalBookings = bookings.length
  const activeBookings = bookings.filter(
    (booking) => !['completed', cancelledStatus.id].includes(booking.status),
  ).length
  const completedBookings = bookings.filter((booking) => booking.status === 'completed').length
  const cancelledBookings = bookings.filter((booking) => booking.status === cancelledStatus.id).length

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

      <div className="dashboard-stats" aria-label="Service request summary">
        <SummaryCard label="Total requests" value={totalBookings} tone="blue" />
        <SummaryCard label="Active services" value={activeBookings} tone="amber" />
        <SummaryCard label="Completed" value={completedBookings} tone="green" />
        <SummaryCard label="Cancelled" value={cancelledBookings} tone="red" />
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

function SummaryCard({ label, tone, value }) {
  return (
    <article className={`summary-card tone-${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
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
      <div className="booking-main">
        <div className="booking-title-row">
          <span className="booking-id">{booking.id}</span>
          <span className={`status-pill compact-status status-${booking.status}`}>{statusLabel}</span>
        </div>
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
        <span className="panel-label">Service progress</span>
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
        <div className="timeline-labels">
          {serviceStatuses.map((status) => (
            <span key={status.id}>{status.label.replace('Technician ', '')}</span>
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
