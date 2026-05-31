import { Link, useNavigate } from 'react-router-dom'
import { appliances, companies } from '../data/catalog'

function HomePage({
  bookings,
  form,
  selectedAppliance,
  selectedCompany,
  setBookingConfirmed,
  setSelectedAppliance,
  setSelectedCompany,
  updateForm,
}) {
  const navigate = useNavigate()

  function findTechnicians(event) {
    event.preventDefault()
    navigate('/book-service')
  }

  return (
    <>
      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">Customer MVP</span>
          <h1>Book trusted appliance repair in minutes.</h1>
          <p>
            Select your brand, appliance, location, and preferred technician. ElectroServe
            keeps the whole service request visible from booking to completion.
          </p>
          <div className="hero-stats" aria-label="Platform highlights">
            <span><strong>{bookings.length}</strong> saved requests</span>
            <span><strong>18</strong> verified technicians</span>
            <span><strong>4.8</strong> avg rating</span>
          </div>
        </div>

        <form className="quick-card" onSubmit={findTechnicians}>
          <div className="card-heading">
            <span className="icon-tile">QS</span>
            <div>
              <h2>Quick service search</h2>
              <p>Start with brand, appliance, and pincode.</p>
            </div>
          </div>
          <label>
            Company
            <select value={selectedCompany} onChange={(event) => setSelectedCompany(event.target.value)}>
              {companies.map((company) => (
                <option key={company.id} value={company.id}>{company.name}</option>
              ))}
            </select>
          </label>
          <label>
            Appliance
            <select
              value={selectedAppliance}
              onChange={(event) => setSelectedAppliance(event.target.value)}
            >
              {appliances.map((appliance) => (
                <option key={appliance.id} value={appliance.id}>{appliance.name}</option>
              ))}
            </select>
          </label>
          <label>
            Pincode
            <input name="pincode" value={form.pincode} onChange={updateForm} inputMode="numeric" />
          </label>
          <button className="confirm-button" type="submit">Find technicians</button>
        </form>
      </section>

      <section className="section-grid">
        <div className="section-heading">
          <span className="eyebrow">Step 1</span>
          <h2>Select company</h2>
        </div>
        <div className="option-grid">
          {companies.map((company) => (
            <button
              className={`option-card ${selectedCompany === company.id ? 'is-active' : ''}`}
              key={company.id}
              type="button"
              onClick={() => {
                setSelectedCompany(company.id)
                setBookingConfirmed(false)
              }}
            >
              <span className="logo-chip">{company.name.slice(0, 2).toUpperCase()}</span>
              <strong>{company.name}</strong>
              <small>{company.type}</small>
              <em>{company.verified ? 'Verified portal' : 'Partner portal'}</em>
            </button>
          ))}
        </div>
      </section>

      <section className="section-grid">
        <div className="section-heading">
          <span className="eyebrow">Step 2</span>
          <h2>Choose appliance</h2>
        </div>
        <div className="option-grid appliance-grid">
          {appliances.map((appliance) => (
            <button
              className={`option-card ${selectedAppliance === appliance.id ? 'is-active' : ''}`}
              key={appliance.id}
              type="button"
              onClick={() => {
                setSelectedAppliance(appliance.id)
                setBookingConfirmed(false)
              }}
            >
              <span className="appliance-icon">{appliance.short}</span>
              <strong>{appliance.name}</strong>
              <small>{appliance.issues}</small>
            </button>
          ))}
        </div>
        <div className="page-actions">
          <Link className="primary-link" to="/book-service">Continue to service details</Link>
        </div>
      </section>
    </>
  )
}

export default HomePage
