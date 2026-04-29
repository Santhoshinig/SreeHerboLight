import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { products, features, testimonials } from '../data'
import Icon from '../components/Icon'
import { useCart } from '../context/CartContext'
import isoIcon from '../images/iso_icon.png'
import organicIcon from '../images/organic_icon.png'
import safeIcon from '../images/safe_icon.png'
import natureIcon from '../images/nature_icon.png'
import safeHomeIcon from '../images/safe_home_icon.png'
import traditionIcon from '../images/tradition_icon.png'
import ingredientsIcon from '../images/ingredients_icon.png'

/* ── Product Card ──────────────────────────── */
function ProductCard({ product, onCheckout }) {
  const { cart, addToCart, wishlist, toggleWishlist } = useCart()
  const inCart = cart.some(item => item.id === product.id)
  const isWish = wishlist.some(item => item.id === product.id)
  
  return (
    <article className="phool-card-pro">
      <div className="phool-card-top">
        <Link to={`/product/${product.id}`}>
          <div className="phool-img-wrap">
            <img src={product.image} alt={product.name} className="phool-real-img" />
            {product.badge && <span className="phool-badge-red">{product.badge}</span>}
          </div>
        </Link>
        <button className="phool-shop-now" onClick={() => onCheckout({ product, quantity: 1 })}>
          <span>BUY NOW</span>
          <Icon name="ArrowRight" size={12} />
        </button>
        <button 
          className={`phool-wishlist-btn ${isWish ? 'active' : ''}`}
          onClick={() => toggleWishlist(product)}
        >
          <Icon name="Heart" size={18} fill={isWish ? "var(--primary)" : "none"} color={isWish ? "var(--primary)" : "#666"} />
        </button>
      </div>

      <div className="phool-body">
        <Link to={`/product/${product.id}`}><h3 className="phool-title">{product.name}</h3></Link>
        
        <div className="phool-rating-row">
          <Stars count={Math.round(product.rating)} />
          <span className="phool-rating-text">({product.rating})</span>
        </div>

        <div className="phool-badges-row">
          <img src={isoIcon} alt="ISO 9001" className="phool-trust-icon" title="ISO 9001 Certified" />
          <img src={organicIcon} alt="Organic" className="phool-trust-icon" title="100% Organic" />
          <img src={safeIcon} alt="Safe" className="phool-trust-icon" title="Safe & Lab Tested" />
        </div>
        
        <button
          className={`phool-add-btn ${inCart ? 'added' : ''}`}
          onClick={() => addToCart(product)}
        >
          <div className="phool-btn-label">{inCart ? 'ADDED' : 'ADD TO CART'}</div>
          <div className="phool-btn-price">
            {product.originalPrice && <span className="phool-old-price">₹ {product.originalPrice}</span>}
            <span>₹ {product.price}.00</span>
          </div>
        </button>
      </div>
    </article>
  )
}

function Stars({ count }) {
  return (
    <div className="stars">
      {[1,2,3,4,5].map(i => (
        <Icon key={i} name="Star" size={14} fill={i <= count ? "#e8a830" : "none"} color={i <= count ? "#e8a830" : "#ccc"} />
      ))}
    </div>
  )
}

/* ── Hero Carousel Component ────────────────── */
function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const slides = [
    { image: '/src/images/1.png' },
    { image: '/src/images/2.png' },
    { image: '/src/images/3.png' },
    { image: '/src/images/4.png' }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <div className="hero-carousel-pro">
      <div className="carousel-inner-pro" style={{ transform: `translateX(-${current * 100}%)` }}>
        {slides.map((s, i) => (
          <div key={i} className="carousel-slide-pro">
            <img src={s.image} alt={`Slide ${i + 1}`} />
          </div>
        ))}
      </div>
      <div className="carousel-dots-pro">
        {slides.map((_, i) => (
          <button 
            key={i} 
            className={`dot-pro ${current === i ? 'active' : ''}`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
      <button className="carousel-nav-btn prev" onClick={() => setCurrent((current - 1 + slides.length) % slides.length)}>
        <Icon name="ChevronLeft" size={24} />
      </button>
      <button className="carousel-nav-btn next" onClick={() => setCurrent((current + 1) % slides.length)}>
        <Icon name="ChevronRight" size={24} />
      </button>
    </div>
  )
}

export default function Home({ searchTerm = '', onCheckout }) {
  const scrollRef = useRef(null)

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 375 // width of card + gap
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 })
  const [selectedTypes, setSelectedTypes] = useState([])
  const [selectedTimes, setSelectedTimes] = useState([])
  const [selectedLengths, setSelectedLengths] = useState([])
  const [selectedBathis, setSelectedBathis] = useState([])
  const [sortBy, setSortBy] = useState('best-selling')
  
  useEffect(() => {
    window.scrollTo(0, 0)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, { threshold: 0.15 })

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const baseProds = products.filter(p => p.featured)

  const filteredProducts = baseProds.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         p.tagline?.toLowerCase().includes(searchTerm.toLowerCase())
    
    if (!matchesSearch) return false
    
    if (p.price < priceRange.min || p.price > priceRange.max) return false
    if (selectedTypes.length > 0 && !selectedTypes.includes(p.category)) return false
    
    // Future-proofing: these fields would need to be added to data.js
    if (selectedTimes.length > 0 && p.burningTime && !selectedTimes.includes(p.burningTime)) return false
    if (selectedLengths.length > 0 && p.length && !selectedLengths.includes(p.length)) return false
    if (selectedBathis.length > 0 && p.bathiType && !selectedBathis.includes(p.bathiType)) return false
    
    return true
  })

  // Sort logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price
    if (sortBy === 'price-high') return b.price - a.price
    if (sortBy === 'alphabetical-az') return a.name.localeCompare(b.name)
    return 0
  })

  const clearAll = () => {
    setPriceRange({ min: 0, max: 500 })
    setSelectedTypes([])
    setSelectedTimes([])
    setSelectedLengths([])
    setSelectedBathis([])
  }

  const toggleFilter = (setFn, value) => {
    setFn(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value])
  }

  const categories = [
    { name: "Combo's", image: '/src/images/combos_category.png', link: '/category/gift-packs' },
    { name: 'Herbal Agarbathi', image: '/src/images/herbal_agarbathi_category_1777263501880.png', link: '/category/agarbatti' },
    { name: 'Panchakavya Products', image: '/src/images/panchakavya_products_category_1777263520616.png', link: '/category/pooja-essentials' },
    { name: 'Rose Water', image: '/src/images/rose_water_category_1777263539013.png', link: '/category/rose-water' },
    { name: 'Camphor', image: '/src/images/camphor_category_1777263590488.png', link: '/category/camphor' },
    { name: 'Body Wash', image: '/src/images/body_wash_category_1777263606152.png', link: '/category/body-wash' },
  ]

  return (
    <main className="shop-main-layout">
      {/* 1. Category Circles Section */}
      <section className="category-circles-section reveal">
        <h2 className="circles-title">Fragrances For Divine Experiences</h2>
        <div className="circles-grid">
          {categories.map(cat => (
            <Link key={cat.name} to={cat.link} className="circle-item" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="circle-img-wrap">
                <img src={cat.image} alt={cat.name} className="circle-img" />
              </div>
              <span className="circle-label">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 2. Hero Carousel Section (CYCLE.in style) */}
      <HeroCarousel />

      {/* 3. Product Grid */}
      <section className="shop-grid-section reveal" style={{ marginTop: '1.5rem' }}>
        <div className="product-grid-pro">
          {sortedProducts.map(p => <ProductCard key={p.id} product={p} onCheckout={onCheckout} />)}
        </div>
      </section>

      {/* 4. Impact / Why Choose Section (Phool Stat Style) */}
      <section className="impact-section reveal">
        <h2 className="impact-title">Why Sree HerboLight?</h2>
        <div className="impact-grid">
          {[
            { label: 'Nature First Always', img: natureIcon },
            { label: 'Safe for Your Home', img: safeHomeIcon },
            { label: 'Inspired by Tradition', img: traditionIcon },
            { label: 'Clean Ingredients', img: ingredientsIcon }
          ].map(item => (
            <div key={item.label} className="impact-item">
              <div className="impact-img-wrap-pro">
                <img src={item.img} alt={item.label} className="impact-cartoon-img" />
              </div>
              <div className="impact-content-pro">
                <span className="impact-stat">{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Customer Experiences (Review Carousel) */}
      <ReviewCarousel />
    </main>
  )
}



/* -- Review Carousel Component ---------------- */
function ReviewCarousel() {
  const [current, setCurrent] = useState(0)
  const reviews = [
    { 
      text: "The fragrance of the jasmine agarbatti is just like fresh flowers from the Madurai market. Absolutely divine!",
      name: "Senthil Kumar",
      stars: 5
    },
    { 
      text: "Sree HerboLight camphor is the purest I have found. No black smoke and the aroma is very peaceful.",
      name: "Meenakshi Ramasamy",
      stars: 5
    },
    { 
      text: "I love that these products are eco-friendly. The temple flower recycling initiative is a great service to nature.",
      name: "Karthik Raja",
      stars: 5
    },
    { 
      text: "The rose water is so refreshing and smells completely natural. It has become a part of my daily morning routine.",
      name: "Priyadharshini S.",
      stars: 4.5
    },
    { 
      text: "Best quality dhoop sticks. They stay lit for a long time and fill the entire house with a calming scent.",
      name: "Velmurugan P.",
      stars: 5
    },
    { 
      text: "Traditional sambrani smell that reminds me of my grandmother's home. Very nostalgic and high quality.",
      name: "Lakshmi Narayanan",
      stars: 5
    },
    { 
      text: "The herbal hand wash is gentle on the skin and the fragrance is very subtle and pleasant.",
      name: "Anandhi J.",
      stars: 4
    },
    { 
      text: "Very impressed with the combo pack. It's a great way to try all their amazing products at once.",
      name: "Saravanan M.",
      stars: 5
    },
    { 
      text: "The agarbattis don't cause any irritation to the eyes or throat. Clearly made from natural ingredients.",
      name: "Sivakumar V.",
      stars: 5
    },
    { 
      text: "High quality products at very reasonable prices. Supporting a local brand feels good!",
      name: "Gayathri Krishnan",
      stars: 4.5
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % reviews.length)
    }, 5000) // 5 seconds
    return () => clearInterval(timer)
  }, [reviews.length, current]) // Added current to dependencies to reset interval on manual skip

  const next = () => setCurrent(prev => (prev + 1) % reviews.length)
  const prev = () => setCurrent(prev => (prev - 1 + reviews.length) % reviews.length)

  return (
    <section className="review-carousel-section reveal">
      <h2 className="review-carousel-title">Customer Experiences</h2>
      
      <div className="review-carousel-main">
        <button className="review-nav-btn prev" onClick={prev}>
          <Icon name="ChevronLeft" size={32} color="#fff" />
        </button>

        <div className="review-carousel-container">
          <div className="review-card-pro" key={current}>
            <p className="review-text-pro">"{reviews[current].text}"</p>
            <p className="review-author-pro">- {reviews[current].name}</p>
            <div className="review-stars-pro">
              {[...Array(5)].map((_, i) => (
                <Icon 
                  key={i} 
                  name="Star" 
                  size={18} 
                  fill={i < Math.floor(reviews[current].stars) ? "#ffbc00" : "none"} 
                  color="#ffbc00" 
                />
              ))}
            </div>
          </div>
        </div>

        <button className="review-nav-btn next" onClick={next}>
          <Icon name="ChevronRight" size={32} color="#fff" />
        </button>
      </div>

      <div className="review-dots-pro">
        {reviews.map((_, i) => (
          <button 
            key={i} 
            className={`review-dot-pro ${current === i ? 'active' : ''}`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </section>
  )
}
