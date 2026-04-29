import { useState } from 'react'
import Icon from './Icon'

export default function AuthModal({ isOpen, onClose, onLogin }) {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    // Dummy login
    onLogin({ email, name: email.split('@')[0] })
    onClose()
  }

  return (
    <div className="modal-overlay auth-overlay">
      <div className="auth-modal">
        <button className="modal-close-btn" onClick={onClose}><Icon name="X" size={20} /></button>
        
        <div className="auth-header">
          <div className="auth-logo">
            <img src="/images/logo.webp" alt="Logo" />
          </div>
          <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p>{isLogin ? 'Sign in to continue to Sree HerboLight' : 'Join us for a pure spiritual journey'}</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="pro-input-wrap">
              <label>Full Name</label>
              <input type="text" placeholder="Your Name" className="pro-input" required />
            </div>
          )}
          <div className="pro-input-wrap">
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="name@example.com" 
              className="pro-input" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="pro-input-wrap">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="pro-input" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          {isLogin && <button type="button" className="forgot-pass">Forgot Password?</button>}

          <button type="submit" className="auth-submit-btn">
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="auth-divider">
          <span>or continue with</span>
        </div>

        <button className="google-auth-btn" onClick={() => { onLogin({ name: 'Google User' }); onClose(); }}>
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" />
          Sign in with Google
        </button>

        <p className="auth-switch">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  )
}
