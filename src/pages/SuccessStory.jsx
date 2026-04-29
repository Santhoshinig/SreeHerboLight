import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import bgImage from '../images/panchakavya_products_category_1777263520616.png'

export default function SuccessStory() {
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

  return (
    <main className="aesthetic-story-page">
      {/* Aesthetic Hero */}
      <section className="story-hero-aesthetic">
        <div className="story-hero-bg">
          <img src={bgImage} alt="Heritage" />
          <div className="story-hero-overlay"></div>
        </div>
        <div className="story-hero-content">
          <div className="breadcrumb-aesthetic">
            <Link to="/">Home</Link> <span className="sep">/</span> <span>Our Story</span>
          </div>
          <h1 className="story-title-main">A Legacy of Purity</h1>
          <p className="story-subtitle-main">Rooted in traditional wisdom and a relentless pursuit of 100% chemical-free natural wellness.</p>
        </div>
      </section>

      {/* Magazine Style Founder Section */}
      <section className="founder-aesthetic-section">
        <div className="founder-grid-aesthetic">
          <div className="founder-img-wrapper reveal">
            <div className="founder-img-frame">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" alt="Dr. Meenachi Ganesan" className="founder-photo" />
            </div>
            <div className="founder-badge-aesthetic">
              <span className="badge-text">Founder & Visionary</span>
            </div>
          </div>

          <div className="founder-text-wrapper reveal">
            <h4 className="story-eyebrow-aesthetic">THE JOURNEY</h4>
            <h2 className="founder-name-aesthetic">Dr. Meenachi Ganesan</h2>
            <p className="founder-credentials">M.A, M.Phil, M.Ed, PhD (English), M.A, B.Ed (Hindi)</p>
            
            <div className="founder-story-body">
              <p className="lead-paragraph">
                Meet the visionary founder of Sree Herbolight, a trailblazing entrepreneur who has traversed a remarkable journey from a distinguished academic background to an illustrious career in the education sector.
              </p>
              <p>
                Embracing her passion for herbalism and natural wellness, she made a bold transition to entrepreneurship, establishing Sree Herbolight as a beacon of holistic health and beauty solutions. Today, under her astute leadership, the company flourishes, testament to her unwavering dedication and innovative spirit.
              </p>
              <p>
                Her commitment to purity and traditional Ayurvedic principles has made Sree HerboLight a household name, providing safe and effective alternatives to chemical-laden products.
              </p>
            </div>
            
            <div className="signature-aesthetic">
              Dr. Meenachi
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Elegant */}
      <section className="vm-aesthetic-section reveal">
        <div className="vm-aesthetic-grid">
          <div className="vm-card-aesthetic">
            <div className="vm-icon-wrap">
              <Icon name="Target" size={32} color="#4caf50" strokeWidth={1.5} />
            </div>
            <h3 className="vm-title">Our Vision</h3>
            <p className="vm-desc">To be a global leader in natural wellness, bringing the untouched purity of nature into every home and sacred space.</p>
          </div>
          <div className="vm-divider"></div>
          <div className="vm-card-aesthetic">
            <div className="vm-icon-wrap">
              <Icon name="Leaf" size={32} color="#4caf50" strokeWidth={1.5} />
            </div>
            <h3 className="vm-title">Our Mission</h3>
            <p className="vm-desc">To preserve ancient traditional wisdom while meticulously crafting modern, chemical-free herbal solutions that genuinely enhance life.</p>
          </div>
        </div>
      </section>
    </main>
  )
}
