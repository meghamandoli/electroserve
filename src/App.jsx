import { useMemo, useState } from 'react'
import './App.css'

const companies = [
  { id: 'lg', name: 'LG', type: 'Home appliances', verified: true },
  { id: 'samsung', name: 'Samsung', type: 'Electronics', verified: true },
  { id: 'philips', name: 'Philips', type: 'Kitchen and personal care', verified: true },
  { id: 'whirlpool', name: 'Whirlpool', type: 'Cooling and laundry', verified: true },
  { id: 'hawkins', name: 'Hawkins', type: 'Kitchen appliances', verified: false },
]

const appliances = [
  { id: 'ac', name: 'Air conditioner', short: 'AC', issues: 'Cooling, gas refill, servicing' },
  { id: 'fridge', name: 'Refrigerator', short: 'RF', issues: 'Not cooling, noise, leakage' },
  { id: 'washer', name: 'Washing machine', short: 'WM', issues: 'Drainage, spin, vibration' },
  { id: 'tv', name: 'Television', short: 'TV', issues: 'Display, audio, power' },
  { id: 'mixer', name: 'Mixer grinder', short: 'MX', issues: 'Motor, jar, blade issues' },
]

const technicians = [
  {
    id: 1,
    name: 'Amit Sharma',
    rating: 4.9,
    jobs: 312,
    experience: '7 yrs',
    area: '110001',
    skills: ['ac', 'fridge'],
    companies: ['lg', 'samsung', 'whirlpool'],
    slot: 'Today, 4:30 PM',
    charge: 249,
  },
  {
    id: 2,
    name: 'Neha Verma',
    rating: 4.8,
    jobs: 226,
    experience: '5 yrs',
    area: '110002',
    skills: ['washer', 'fridge'],
    companies: ['lg', 'whirlpool', 'samsung'],
    slot: 'Today, 6:00 PM',
    charge: 299,
  },
  {
    id: 3,
    name: 'Rahul Khan',
    rating: 4.7,
    jobs: 188,
    experience: '4 yrs',
    area: '110001',
    skills: ['tv', 'mixer'],
    companies: ['samsung', 'philips', 'hawkins'],
    slot: 'Tomorrow, 10:00 AM',
    charge: 199,
  },
  {
    id: 4,
    name: 'Priya Nair',
    rating: 4.9,
    jobs: 354,
    experience: '8 yrs',
    area: '110003',
    skills: ['ac', 'washer', 'tv'],
    companies: ['lg', 'samsung', 'philips'],
    slot: 'Tomorrow, 12:30 PM',
    charge: 349,
  },
]

const steps = ['Choose', 'Details', 'Technician', 'Confirm']

function App() {
  const [selectedCompany, setSelectedCompany] = useState(companies[0].id)
  const [selectedAppliance, setSelectedAppliance] = useState(appliances[0].id)
  const [selectedTechnician, setSelectedTechnician] = useState(technicians[0].id)
  const [bookingConfirmed, setBookingConfirmed] = useState(false)
  const [form, setForm] = useState({
    pincode: '110001',
    name: 'Nikhil',
    phone: '9876543210',
    address: 'Sector 12, New Delhi',
    issue: 'Appliance is not working properly and needs inspection.',
    date: '2026-06-01',
    time: '10:00',
    warranty: 'Unknown',
  })

  const matches = useMemo(() => {
    return technicians.filter((technician) => {
      const companyMatch = technician.companies.includes(selectedCompany)
      const applianceMatch = technician.skills.includes(selectedAppliance)
      const locationMatch = !form.pincode || technician.area === form.pincode
      return companyMatch && applianceMatch && locationMatch
    })
  }, [form.pincode, selectedAppliance, selectedCompany])

  const visibleTechnicians = matches.length > 0 ? matches : technicians
  const activeTechnician =
    technicians.find((technician) => technician.id === selectedTechnician) || visibleTechnicians[0]
  const activeCompany = companies.find((company) => company.id === selectedCompany)
  const activeAppliance = appliances.find((appliance) => appliance.id === selectedAppliance)

  function updateForm(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setBookingConfirmed(false)
  }

  return (
    <main className="app-shell">
      <nav className="topbar">
        <a className="brand" href="#top" aria-label="ElectroServe home">
          <span className="brand-mark">E</span>
          <span>
            <strong>ElectroServe</strong>
            <small>Verified appliance service</small>
          </span>
        </a>
        <div className="nav-actions">
          <a href="#booking">Book service</a>
          <a href="#technicians">Technicians</a>
          <button type="button">Sign in</button>
        </div>
      </nav>

      <section className="hero-section" id="top">
        <div className="hero-copy">
          <span className="eyebrow">Customer MVP</span>
          <h1>Book trusted appliance repair in minutes.</h1>
          <p>
            Select your brand, appliance, location, and preferred technician. ElectroServe
            keeps the whole service request visible from booking to completion.
          </p>
          <div className="hero-stats" aria-label="Platform highlights">
            <span><strong>24</strong> active requests</span>
            <span><strong>18</strong> verified technicians</span>
            <span><strong>4.8</strong> avg rating</span>
          </div>
        </div>

        <form className="quick-card" id="booking" onSubmit={(event) => event.preventDefault()}>
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
          <a className="primary-link" href="#details">Find technicians</a>
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
      </section>

      <section className="booking-workspace" id="details">
        <aside className="stepper" aria-label="Booking progress">
          {steps.map((step, index) => (
            <div className="step-item" key={step}>
              <span>{index + 1}</span>
              <strong>{step}</strong>
            </div>
          ))}
        </aside>

        <form className="details-panel" onSubmit={(event) => event.preventDefault()}>
          <div className="section-heading compact">
            <span className="eyebrow">Step 3</span>
            <h2>Service details</h2>
          </div>
          <div className="form-grid">
            <label>
              Full name
              <input name="name" value={form.name} onChange={updateForm} />
            </label>
            <label>
              Phone number
              <input name="phone" value={form.phone} onChange={updateForm} inputMode="tel" />
            </label>
            <label className="span-two">
              Address
              <input name="address" value={form.address} onChange={updateForm} />
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
              <textarea name="issue" value={form.issue} onChange={updateForm} rows="4" />
            </label>
          </div>
        </form>
      </section>

      <section className="technician-section" id="technicians">
        <div className="section-heading">
          <span className="eyebrow">Step 4</span>
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
      </section>

      <section className="confirmation-panel">
        <div>
          <span className="eyebrow">Final step</span>
          <h2>Booking summary</h2>
          <p>
            {activeCompany.name} {activeAppliance.name} service for {form.name} at {form.address}.
          </p>
        </div>
        <div className="summary-list">
          <span><strong>Technician</strong>{activeTechnician.name}</span>
          <span><strong>Slot</strong>{form.date} at {form.time}</span>
          <span><strong>Status</strong>{bookingConfirmed ? 'Technician assigned' : 'Ready to confirm'}</span>
        </div>
        <button className="confirm-button" type="button" onClick={() => setBookingConfirmed(true)}>
          Confirm booking
        </button>
      </section>
    </main>
  )
}

export default App
