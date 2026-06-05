import { useEffect, useMemo, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Topbar from './components/Topbar'
import { appliances, companies, technicians } from './data/catalog'
import { getStatusLabel } from './data/statuses'
import AuthPage from './pages/AuthPage'
import ConfirmationPage from './pages/ConfirmationPage'
import DashboardPage from './pages/DashboardPage'
import HomePage from './pages/HomePage'
import ServiceDetailsPage from './pages/ServiceDetailsPage'
import TechniciansPage from './pages/TechniciansPage'
import './App.css'

const storageKey = 'electroserveBookings'
const userStorageKey = 'electroserveCurrentUser'

function normalizeBooking(booking) {
  const legacyStatusMap = {
    'Technician assigned': 'assigned',
    'Ready to confirm': 'submitted',
  }
  const status = legacyStatusMap[booking.status] || booking.status || 'assigned'

  return {
    ...booking,
    status,
    statusLabel: booking.statusLabel || getStatusLabel(status),
  }
}

function App() {
  const [selectedCompany, setSelectedCompany] = useState(companies[0].id)
  const [selectedAppliance, setSelectedAppliance] = useState(appliances[0].id)
  const [selectedTechnician, setSelectedTechnician] = useState(technicians[0].id)
  const [bookingConfirmed, setBookingConfirmed] = useState(false)
  const [formError, setFormError] = useState('')
  const [bookings, setBookings] = useState(() => {
    const storedBookings = window.localStorage.getItem(storageKey)
    return storedBookings ? JSON.parse(storedBookings).map(normalizeBooking) : []
  })
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = window.localStorage.getItem(userStorageKey)
    return storedUser ? JSON.parse(storedUser) : null
  })
  const [form, setForm] = useState({
    pincode: '110001',
    name: '',
    phone: '',
    address: '',
    issue: '',
    date: '2026-06-01',
    time: '10:00',
    warranty: 'Unknown',
  })

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(bookings))
  }, [bookings])

  useEffect(() => {
    if (currentUser) {
      window.localStorage.setItem(userStorageKey, JSON.stringify(currentUser))
    } else {
      window.localStorage.removeItem(userStorageKey)
    }
  }, [currentUser])

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
    visibleTechnicians.find((technician) => technician.id === selectedTechnician) || visibleTechnicians[0]
  const activeCompany = companies.find((company) => company.id === selectedCompany)
  const activeAppliance = appliances.find((appliance) => appliance.id === selectedAppliance)

  function updateForm(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setBookingConfirmed(false)
    setFormError('')
  }

  function createBooking() {
    if (!form.name || !form.phone || !form.address || !form.issue) {
      setFormError('Please fill name, phone, address, and issue before confirming.')
      return false
    }

    const nextBooking = {
      id: `ES-${Date.now().toString().slice(-6)}`,
      company: activeCompany.name,
      appliance: activeAppliance.name,
      technician: activeTechnician.name,
      slot: `${form.date} at ${form.time}`,
      status: 'assigned',
      statusLabel: getStatusLabel('assigned'),
      issue: form.issue,
      pincode: form.pincode,
      createdAt: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
    }

    setBookings((current) => [nextBooking, ...current])
    setBookingConfirmed(true)
    setFormError('')
    return true
  }

  function startNewBooking() {
    setBookingConfirmed(false)
    setFormError('')
  }

  function updateBookingStatus(bookingId, status) {
    setBookings((current) =>
      current.map((booking) =>
        booking.id === bookingId
          ? { ...booking, status, statusLabel: getStatusLabel(status) }
          : booking,
      ),
    )
  }

  function registerUser(authForm) {
    const nextUser = {
      name: authForm.name,
      email: authForm.email,
      phone: authForm.phone,
      role: 'customer',
    }
    setCurrentUser(nextUser)
    return nextUser
  }

  function loginUser(authForm) {
    const nextUser = {
      name: authForm.email.split('@')[0] || 'Customer',
      email: authForm.email,
      phone: '',
      role: 'customer',
    }
    setCurrentUser(nextUser)
    return nextUser
  }

  function logoutUser() {
    setCurrentUser(null)
  }

  return (
    <BrowserRouter>
      <main className="app-shell">
        <Topbar currentUser={currentUser} logoutUser={logoutUser} />
        <Routes>
          <Route
            path="/login"
            element={
              <AuthPage
                authMode="login"
                currentUser={currentUser}
                loginUser={loginUser}
                registerUser={registerUser}
              />
            }
          />
          <Route
            path="/register"
            element={
              <AuthPage
                authMode="register"
                currentUser={currentUser}
                loginUser={loginUser}
                registerUser={registerUser}
              />
            }
          />
          <Route
            path="/"
            element={
              <HomePage
                bookings={bookings}
                form={form}
                selectedAppliance={selectedAppliance}
                selectedCompany={selectedCompany}
                setBookingConfirmed={setBookingConfirmed}
                setSelectedAppliance={setSelectedAppliance}
                setSelectedCompany={setSelectedCompany}
                updateForm={updateForm}
              />
            }
          />
          <Route
            path="/book-service"
            element={<ServiceDetailsPage form={form} updateForm={updateForm} />}
          />
          <Route
            path="/technicians"
            element={
              <TechniciansPage
                activeAppliance={activeAppliance}
                activeCompany={activeCompany}
                form={form}
                selectedTechnician={selectedTechnician}
                setBookingConfirmed={setBookingConfirmed}
                setSelectedTechnician={setSelectedTechnician}
                visibleTechnicians={visibleTechnicians}
              />
            }
          />
          <Route
            path="/confirmation"
            element={
              <ConfirmationPage
                activeAppliance={activeAppliance}
                activeCompany={activeCompany}
                activeTechnician={activeTechnician}
                bookingConfirmed={bookingConfirmed}
                createBooking={createBooking}
                form={form}
                formError={formError}
              />
            }
          />
          <Route
            path="/dashboard"
            element={
              <DashboardPage
                bookings={bookings}
                startNewBooking={startNewBooking}
                updateBookingStatus={updateBookingStatus}
              />
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
