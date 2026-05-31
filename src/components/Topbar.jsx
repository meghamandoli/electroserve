import { NavLink } from 'react-router-dom'

function Topbar() {
  return (
    <nav className="topbar">
      <NavLink className="brand" to="/" aria-label="ElectroServe home">
        <span className="brand-mark">E</span>
        <span>
          <strong>ElectroServe</strong>
          <small>Verified appliance service</small>
        </span>
      </NavLink>
      <div className="nav-actions">
        <NavLink to="/book-service">Book service</NavLink>
        <NavLink to="/technicians">Technicians</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <button type="button">Sign in</button>
      </div>
    </nav>
  )
}

export default Topbar
