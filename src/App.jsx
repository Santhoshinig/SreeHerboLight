import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import './styles.css'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Category from './pages/Category'
import SuccessStory from './pages/SuccessStory'
import Icon from './components/Icon'
import { navLinks, footerLinks } from './data'

import { CartProvider, useCart } from './context/CartContext'

import SideDrawer from './components/SideDrawer'
import CheckoutModal from './components/CheckoutModal'
import AuthModal from './components/AuthModal'
import Newsletter from './components/Newsletter'

/* ── Global Header ─────────────────────────── */


import { products } from './data'

function Header({ onOpenDrawer, onSearch, user, onOpenAuth }) {
  const [scrolled, setScrolled] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [hoveredMega, setHoveredMega] = useState(null)
  
  const location = useLocation()
  const { cartCount, cartTotal, wishlistCount } = useCart()
  
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  const handleSearchChange = (val) => {
    setSearchValue(val)
    if (val.trim().length > 1) {
      const filtered = products.filter(p => 
        p.name.toLowerCase().includes(val.toLowerCase()) || 
        p.category.toLowerCase().includes(val.toLowerCase())
      ).slice(0, 5)
      setSuggestions(filtered)
    } else {
      setSuggestions([])
    }
    onSearch(val)
  }

  return (
    <header className={`site-header ${scrolled ? 'header-scrolled' : ''}`}>
      {/* 1. Fire Top Bar */}
      <div className="top-promo-bar-pro">
        <div className="promo-inner-pro">
          <div className="promo-socials" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <a href="#" aria-label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                <path fill="#fff" d="M16.671 15.542l.532-3.469h-3.328V9.823c0-.949.465-1.874 1.956-1.874h1.514V5.002s-1.374-.235-2.686-.235c-2.741 0-4.533 1.662-4.533 4.669v2.638H7.078v3.469h3.047v8.385a12.09 12.09 0 003.75 0v-8.385h2.796z"/>
              </svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="20" height="20" rx="6" fill="url(#ig-grad)"/>
                <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="white" strokeWidth="2"/>
                <circle cx="16.5" cy="7.5" r="1.5" fill="white"/>
                <rect x="4" y="4" width="16" height="16" rx="4" stroke="white" strokeWidth="2"/>
                <defs>
                  <linearGradient id="ig-grad" x1="2" y1="22" x2="22" y2="2" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#F58529"/>
                    <stop offset="0.3" stopColor="#DD2A7B"/>
                    <stop offset="0.7" stopColor="#8134AF"/>
                    <stop offset="1" stopColor="#515BD4"/>
                  </linearGradient>
                </defs>
              </svg>
            </a>
            <a href="#" aria-label="Youtube">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.083 0 12 0 12s0 3.917.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.872.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.917 24 12 24 12s0-3.917-.502-5.814z" fill="#FF0000"/>
                <path d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="#FFFFFF"/>
              </svg>
            </a>
            <a href="#" aria-label="X">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect width="24" height="24" rx="4" fill="black"/>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="white"/>
              </svg>
            </a>
          </div>
          <div className="promo-text-pro">
            <Icon name="Truck" size={18} color="#fff" />
            <span style={{ color: '#fff' }}>Free Shipping On All Orders Above ₹399</span>
          </div>
          <div className="promo-empty" />
        </div>
      </div>

      {/* 2. Main Header */}
      <div className="header-main-row-pro">
        <div className="header-inner-pro">
          <Link to="/" className="site-logo-pro">
            <img src="/images/logo.webp" alt="Sree HerboLight" className="header-logo-img-pro" />
          </Link>

          <div className="header-search-pro">
            <div className="search-bar-pro" style={{ borderColor: '#2d5a27' }}>
              <Icon name="Search" size={20} color="#2d5a27" strokeWidth={1.5} />
              <input 
                type="text" 
                value={searchValue}
                placeholder="Search for Agarbatti, Camphor..." 
                style={{ color: '#2d5a27' }}
                onChange={(e) => handleSearchChange(e.target.value)}
                onBlur={() => setTimeout(() => setSuggestions([]), 200)}
              />
            </div>
            
            {suggestions.length > 0 && (
              <div className="search-suggestions-pro">
                {suggestions.map(p => (
                  <Link key={p.id} to={`/product/${p.id}`} className="suggestion-item-pro" onClick={() => setSuggestions([])}>
                    <div className="suggestion-icon"><Icon name={p.icon || 'Sparkles'} size={16} color="#2d5a27" strokeWidth={1.5} /></div>
                    <div className="suggestion-info">
                      <span className="suggestion-name">{p.name}</span>
                      <span className="suggestion-cat">{p.category}</span>
                    </div>
                    <span className="suggestion-price">₹{p.price}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="header-actions-pro">
            <button className="hdr-btn-pro" onClick={onOpenAuth} style={{ borderColor: 'var(--primary)' }}>
              <Icon name="User" size={20} color="var(--primary)" strokeWidth={1.5} />
              <span style={{ color: 'var(--primary)' }}>{user ? user.name.split(' ')[0] : 'Account'}</span>
            </button>
            {user && (
              <button className="hdr-btn-pro" onClick={() => onOpenDrawer('orders')} style={{ borderColor: 'var(--accent)', background: 'rgba(255, 154, 0, 0.05)' }}>
                <Icon name="Package" size={20} color="var(--accent)" strokeWidth={1.5} />
                <span style={{ color: 'var(--accent)' }}>My Orders</span>
              </button>
            )}
            <button className="hdr-btn-pro cart-btn-pro" onClick={() => onOpenDrawer('cart')} style={{ background: 'var(--primary)', color: '#fff' }}>
              <Icon name="ShoppingCart" size={20} color="#fff" strokeWidth={1.5} />
              <span>Rs. {cartTotal.toLocaleString()}.00 ({cartCount})</span>
            </button>
            <button className="hdr-btn-wish-icon-only" onClick={() => onOpenDrawer('wishlist')}>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Icon name="Heart" size={24} color="#2d5a27" strokeWidth={1.5} />
                {wishlistCount > 0 && (
                  <span style={{ 
                    position: 'absolute', 
                    top: '-6px', 
                    right: '-8px', 
                    background: '#2d5a27', 
                    color: '#fff', 
                    fontSize: '10px', 
                    fontWeight: '800', 
                    padding: '2px 5px', 
                    borderRadius: '10px',
                    minWidth: '14px',
                    textAlign: 'center'
                  }}>
                    {wishlistCount}
                  </span>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Navigation Bar */}
      <nav className="header-nav-pro">
        <div className="nav-inner-pro">
          {navLinks.map(l => (
            <div 
              key={l.label} 
              className="nav-item-pro"
              onMouseEnter={() => setHoveredMega(l.mega ? l.label : null)}
              onMouseLeave={() => setHoveredMega(null)}
            >
              <Link to={l.href} className="nav-link-pro">
                {l.label}
              </Link>

              {l.mega && hoveredMega === l.label && (
                <div className="mega-menu-pro">
                  <div className="mega-inner-pro">
                    <div className="mega-columns-pro">
                      {l.mega.columns.map(col => (
                        <div key={col.title} className="mega-col-pro">
                          <h4 className="mega-title-pro">{col.title}</h4>
                          <ul className="mega-list-pro">
                            {col.links.map(link => (
                              <li key={link}><a href="#">{link}</a></li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className="mega-promo-pro">
                      <img src={l.mega.image} alt={l.label} />
                      <div className="mega-promo-overlay-pro">
                        <span>Explore {l.label}</span>
                        <Icon name="ArrowRight" size={16} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>
    </header>
  )
}




/* ── Global Footer ─────────────────────────── */
function Footer({ onOpenDrawer }) {
  const handleLinkClick = (e, link) => {
    if (link === 'My Orders') {
      e.preventDefault()
      onOpenDrawer('orders')
    }
  }

  return (
    <footer className="site-footer">
      <div className="footer-body">
        <div className="footer-inner">
          <div className="footer-brand-col">
            <Link to="/" className="footer-logo">
              <img src="/images/logo.webp" alt="Sree HerboLight" className="footer-logo-img" />
            </Link>
            <p className="footer-brand-desc">
              Sacred aromatics crafted from nature's finest — for your home, pooja room, and the people you love.
            </p>
            <div className="footer-socials">
              <a href="#" className="social-icon-btn" aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="social-icon-btn" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="social-icon-btn" aria-label="Youtube">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.14 1 12 1 12s0 3.86.42 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.86 23 12 23 12s0-3.86-.42-5.58z"></path><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"></polygon></svg>
              </a>
              <a href="#" className="social-icon-btn" aria-label="Twitter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group} className="footer-links-col">
              <h4 className="footer-col-title">{group}</h4>
              <ul className="footer-link-list">
                {links.map(link => <li key={link}><a href="#" className="footer-link" onClick={(e) => handleLinkClick(e, link)}>{link}</a></li>)}
              </ul>
            </div>
          ))}

          <div className="footer-contact-col">
            <h4 className="footer-col-title">Contact</h4>
            <div className="footer-address">
              <p><Icon name="Phone" size={16} color="#ff9a00" /> +91 98765 43210</p>
              <p><Icon name="Mail" size={16} color="#ff9a00" /> hello@sreeherbolight.in</p>
              <p><Icon name="MapPin" size={16} color="#ff9a00" /> No. 12, Temple Street, Chennai – 600 001</p>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 SreeHerboLight · All rights reserved · Made with ❤️ in India</p>
        <div className="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
          <a href="#">Sitemap</a>
        </div>
      </div>
    </footer>
  )
}

function Main() {
  const [drawerType, setDrawerType] = useState(null)
  const [checkoutData, setCheckoutData] = useState(null) // { product, quantity } or null (for cart)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [user, setUser] = useState(null)
  const [authOpen, setAuthOpen] = useState(false)
  const [orders, setOrders] = useState([])

  const handleOrderSuccess = (order) => {
    setOrders(prev => [order, ...prev])
  }

  const handleOpenCheckout = (data = null) => {
    if (!user) {
      setCheckoutData(data) // Save where they wanted to go
      setAuthOpen(true)
      return
    }
    setCheckoutData(data)
    setCheckoutOpen(true)
  }

  const handleLogin = (userData) => {
    setUser(userData)
    // If they were trying to checkout, continue
    if (checkoutData !== undefined) {
      setCheckoutOpen(true)
    }
  }

  return (
    <div className="page">
      <Header 
        onOpenDrawer={setDrawerType} 
        onSearch={setSearchTerm} 
        user={user} 
        onOpenAuth={() => setAuthOpen(true)} 
      />
      <Routes>
        <Route path="/" element={<Home searchTerm={searchTerm} onCheckout={handleOpenCheckout} />} />
        <Route path="/product/:id" element={<ProductDetail onCheckout={handleOpenCheckout} />} />
        <Route path="/category/:id" element={<Category searchTerm={searchTerm} />} />
        <Route path="/shop" element={<Category all={true} searchTerm={searchTerm} />} />
        <Route path="/success-story" element={<SuccessStory />} />
      </Routes>
      <Newsletter />
      <Footer onOpenDrawer={setDrawerType} />

      <SideDrawer 
        type={drawerType} 
        isOpen={!!drawerType} 
        onClose={() => setDrawerType(null)} 
        onCheckout={() => handleOpenCheckout(null)}
        orders={orders}
      />

      <CheckoutModal 
        isOpen={checkoutOpen} 
        onClose={() => { setCheckoutOpen(false); setCheckoutData(null); }} 
        product={checkoutData?.product}
        quantity={checkoutData?.quantity}
        onOrderSuccess={handleOrderSuccess}
        onViewOrders={() => setDrawerType('orders')}
      />

      <AuthModal 
        isOpen={authOpen} 
        onClose={() => setAuthOpen(false)} 
        onLogin={handleLogin} 
      />
    </div>
  )
}
export default function App() {
  return (
    <Router>
      <CartProvider>
        <Main />
      </CartProvider>
    </Router>
  )
}
