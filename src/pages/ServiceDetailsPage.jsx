import { useNavigate } from 'react-router-dom'
import BookingStepper from '../components/BookingStepper'

function ServiceDetailsPage({ form, updateForm }) {
  const navigate = useNavigate()

  function submitDetails(event) {
    event.preventDefault()
    navigate('/technicians')
  }

  return (
    <section className="booking-workspace page-shell">
      <BookingStepper activeStep={2} />

      <form className="details-panel" onSubmit={submitDetails}>
        <div className="section-heading compact">
          <span className="eyebrow">Step 2</span>
          <h2>Service details</h2>
          <p>Tell the technician where to visit and what needs inspection.</p>
        </div>
        <div className="form-grid">
          <label>
            Full name
            <input name="name" value={form.name} onChange={updateForm} placeholder="Enter customer name" />
          </label>
          <label>
            Phone number
            <input
              name="phone"
              value={form.phone}
              onChange={updateForm}
              inputMode="tel"
              placeholder="Enter mobile number"
            />
          </label>
          <label className="span-two">
            Address
            <input name="address" value={form.address} onChange={updateForm} placeholder="House no, area, city" />
          </label>
          <label>
            Preferred date
            <input name="date" type="date" value={form.date} onChange={updateForm} />
          </label>
          <label>
            Preferred time
            <input name="time" type="time" value={form.time} onChange={updateForm} />
          </label>
          <label>
            Warranty status
            <select name="warranty" value={form.warranty} onChange={updateForm}>
              <option>Unknown</option>
              <option>Under warranty</option>
              <option>Out of warranty</option>
            </select>
          </label>
          <label>
            Pincode
            <input name="pincode" value={form.pincode} onChange={updateForm} inputMode="numeric" />
          </label>
          <label className="span-two">
            Issue description
            <textarea
              name="issue"
              value={form.issue}
              onChange={updateForm}
              rows="4"
              placeholder="Describe what is not working"
            />
          </label>
        </div>
        <div className="page-actions">
          <button className="confirm-button" type="submit">Find matching technicians</button>
        </div>
      </form>

      <aside className="booking-assist-panel">
        <span className="eyebrow">Before technician visit</span>
        <h3>Helpful details improve matching.</h3>
        <ul>
          <li>Use the exact pincode for nearby technicians.</li>
          <li>Mention sounds, leakage, error codes, or power issues.</li>
          <li>Select warranty status if you know it.</li>
        </ul>
      </aside>
    </section>
  )
}

export default ServiceDetailsPage
