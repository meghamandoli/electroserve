import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function AuthPage({ authMode, currentUser, loginUser, registerUser }) {
  const navigate = useNavigate()
  const isRegister = authMode === 'register'
  const [authError, setAuthError] = useState('')
  const [authForm, setAuthForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  })

  function updateAuthForm(event) {
    const { name, value } = event.target
    setAuthForm((current) => ({ ...current, [name]: value }))
    setAuthError('')
  }

  function submitAuth(event) {
    event.preventDefault()
    const requiredFields = isRegister ? ['name', 'email', 'phone', 'password'] : ['email', 'password']
    const hasMissingField = requiredFields.some((field) => !authForm[field])

    if (hasMissingField) {
      setAuthError('Please fill all required fields to continue.')
      return
    }

    const nextUser = isRegister ? registerUser(authForm) : loginUser(authForm)
    if (nextUser) {
      navigate('/dashboard')
    }
  }

  return (
    <section className="auth-section page-shell">
      <div className="auth-copy">
        <span className="eyebrow">Customer account</span>
        <h1>{isRegister ? 'Create your ElectroServe account.' : 'Welcome back to ElectroServe.'}</h1>
        <p>
          Use this demo account layer to keep the customer journey realistic while we prepare
          the backend authentication module.
        </p>
        <div className="auth-benefits">
          <span>Saved service requests</span>
          <span>Status tracking</span>
          <span>Faster booking details</span>
        </div>
      </div>

      <form className="auth-card" onSubmit={submitAuth}>
        <div>
          <h2>{isRegister ? 'Register' : 'Sign in'}</h2>
          <p>{currentUser ? `Currently signed in as ${currentUser.name}.` : 'Continue as a customer.'}</p>
        </div>

        {isRegister && (
          <>
            <label>
              Full name
              <input name="name" value={authForm.name} onChange={updateAuthForm} placeholder="Enter full name" />
            </label>
            <label>
              Phone number
              <input
                name="phone"
                value={authForm.phone}
                onChange={updateAuthForm}
                inputMode="tel"
                placeholder="Enter mobile number"
              />
            </label>
          </>
        )}

        <label>
          Email
          <input
            name="email"
            type="email"
            value={authForm.email}
            onChange={updateAuthForm}
            placeholder="customer@example.com"
          />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            value={authForm.password}
            onChange={updateAuthForm}
            placeholder="Enter password"
          />
        </label>

        {authError && <p className="form-error">{authError}</p>}

        <button className="confirm-button" type="submit">
          {isRegister ? 'Create account' : 'Sign in'}
        </button>

        <p className="auth-switch">
          {isRegister ? 'Already have an account?' : 'New to ElectroServe?'}{' '}
          <Link to={isRegister ? '/login' : '/register'}>
            {isRegister ? 'Sign in' : 'Create account'}
          </Link>
        </p>
      </form>
    </section>
  )
}

export default AuthPage
