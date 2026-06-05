import { NavLink } from 'react-router-dom'

function Topbar({ currentUser, logoutUser }) {
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
        {currentUser ? (
          <>
            <span className="user-chip">{currentUser.name}</span>
            <button type="button" onClick={logoutUser}>Logout</button>
          </>
        ) : (
          <NavLink className="signin-link" to="/login">Sign in</NavLink>
        )}
      </div>
    </nav>
  )
}

export default Topbar
