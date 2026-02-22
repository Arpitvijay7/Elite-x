import { useEffect, useRef, useState } from 'react'
import {
  Droplets, Leaf, Ban, Coffee, ShieldCheck, ZapOff, CheckCircle2,
  Mail, Phone,
} from 'lucide-react'
import './App.css'

import heroSplash from './assets/hero-splash.png'
import canSand    from './assets/can-sand.png'
import storeFridge from './assets/store-fridge.png'
import cansTop    from './assets/cans-top.png'

const FEATURES = [
  { Icon: Droplets,     label: 'Sparkling Water Base',           note: 'Our clean, bubbly foundation' },
  { Icon: Leaf,         label: 'Only Natural',                   note: 'No synthetic anything, ever' },
  { Icon: Ban,          label: 'No Artificial Sweetener',        note: 'Real taste, zero compromise' },
  { Icon: Coffee,       label: 'Caffeine from Coffee Beans',     note: 'Naturally sourced energy' },
  { Icon: ShieldCheck,  label: 'No Artificial Preservatives',    note: 'Fresh by design' },
  { Icon: ZapOff,       label: 'No Artificial Caffeine',         note: 'Clean stimulation only' },
  { Icon: CheckCircle2, label: 'No Artificial Additives',        note: 'What you see is what you get' },
]

const FLAVORS = [
  {
    id: 'watermelon',
    tag: 'WMB-01',
    name: 'Watermelon',
    sub: '× Blueberry',
    desc: 'A burst of juicy summer watermelon fused with sweet, cool blueberry. Refreshing from the first sip.',
    accent: '#e8a0b4',
    bg: 'linear-gradient(150deg, #1a0d11 0%, #2e1420 50%, #160d13 100%)',
  },
  {
    id: 'pineapple',
    tag: 'PNB-02',
    name: 'Pineapple',
    sub: '× Blueberry',
    desc: 'Bright, tropical pineapple cuts through with a wave of fresh blueberry. Clean energy, bold taste.',
    accent: '#8dd4df',
    bg: 'linear-gradient(150deg, #0a1315 0%, #0f2429 50%, #081113 100%)',
  },
]

function useInView(ref, threshold = 0.15) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [ref, threshold])
  return visible
}

function FadeIn({ children, delay = 0, className = '', style = {} }) {
  const ref = useRef(null)
  const visible = useInView(ref)
  return (
    <div
      ref={ref}
      className={`fadein ${visible ? 'fadein--visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </div>
  )
}

export default function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="site">

      {/* ── Navbar ── */}
      <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
        <a href="#hero" className="nav__logo">ELYTE</a>
        <ul className="nav__links">
          <li><a href="#story">Story</a></li>
          <li><a href="#ingredients">Ingredients</a></li>
          <li><a href="#flavors">Flavors</a></li>
          <li><a href="#stores">Availability</a></li>
        </ul>
      </nav>

      {/* ── Hero ── */}
      <section id="hero" className="hero">
        <img src={heroSplash} alt="Elyte cans with water splash" className="hero__bg" />
        <div className="hero__overlay" />
        <div className="hero__content">
          <p className="hero__eyebrow">Elyte × Energy</p>
          <h1 className="hero__heading">
            <span className="hero__heading-line">COMING</span>
            <span className="hero__heading-line hero__heading-line--stroke">SOON</span>
          </h1>
          <p className="hero__sub">
            A new standard in clean energy. Pure ingredients,<br />
            bold flavors, built for the elite.
          </p>
          <div className="hero__badge">
            <span className="hero__badge-dot" />
            Launching 2026
          </div>
        </div>
        <a href="#story" className="hero__scroll" aria-label="Scroll down">
          <span />
        </a>
      </section>

      {/* ── Story ── */}
      <section id="story" className="story">
        <div className="story__inner container">
          <FadeIn className="story__text">
            <p className="label">Our Story</p>
            <h2>Energy re-imagined.<br />No compromises.</h2>
            <p className="body-copy">
              We set out to create an energy drink that respects your body. No artificial
              shortcuts, no synthetic junk — just sparkling water, natural caffeine from
              real coffee beans, and flavors that actually taste like fruit.
            </p>
            <p className="body-copy">
              Elyte is for those who want to perform at the highest level, every single day,
              without trading their health for a buzz.
            </p>
          </FadeIn>
          <FadeIn delay={150} className="story__image-wrap">
            <img src={canSand} alt="Elyte cans on dark sand" className="story__image" />
          </FadeIn>
        </div>
      </section>

      {/* ── Ingredients ── */}
      <section id="ingredients" className="ingredients">
        <div className="container">
          <div className="ingredients__layout">

            {/* Left col — heading */}
            <FadeIn className="ingredients__head">
              <p className="label label--light">What's Inside</p>
              <h2>Clean label.<br />Real ingredients.</h2>
              <p className="ingredients__sub">
                Every ingredient has a purpose.<br />
                Nothing hidden, nothing artificial.
              </p>
              <div className="ingredients__rule" />
            </FadeIn>

            {/* Right col — feature rows */}
            <ul className="feature-list">
              {FEATURES.map(({ Icon, label, note }, i) => (
                <FadeIn key={label} delay={i * 55} className="feature-row__wrap">
                  <li className="feature-row">
                    <span className="feature-row__icon">
                      <Icon size={18} strokeWidth={1.75} />
                    </span>
                    <span className="feature-row__body">
                      <span className="feature-row__label">{label}</span>
                      <span className="feature-row__note">{note}</span>
                    </span>
                  </li>
                </FadeIn>
              ))}
            </ul>

          </div>
        </div>
      </section>

      {/* ── Flavors ── */}
      <section id="flavors" className="flavors">
        <FadeIn className="flavors__header">
          <p className="label">Flavor Lineup</p>
          <h2>Pick your energy.</h2>
        </FadeIn>
        <div className="flavor-grid">
          {FLAVORS.map((f, i) => (
            <FadeIn key={f.id} delay={i * 120} className="flavor-panel" style={{ background: f.bg }}>
              <p className="flavor-panel__tag">{f.tag}</p>
              <h3 className="flavor-panel__name" style={{ color: f.accent }}>
                {f.name}<br />
                <span className="flavor-panel__sub">{f.sub}</span>
              </h3>
              <p className="flavor-panel__desc">{f.desc}</p>
              <div className="flavor-panel__badge" style={{ borderColor: f.accent, color: f.accent }}>
                Coming Soon
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── Cans Banner ── */}
      <section className="banner">
        <img src={cansTop} alt="Rows of Elyte cans" className="banner__img" />
        <div className="banner__overlay">
          <FadeIn>
            <p className="banner__text">ELYTE × ENERGY</p>
          </FadeIn>
        </div>
      </section>

      {/* ── Stores ── */}
      <section id="stores" className="stores">
        <FadeIn className="stores__content">
          <p className="label">Availability</p>
          <h2>Coming to a store<br />near you.</h2>
          <div className="stores__divider" />
          <p className="stores__sub">
            Retail partners across the country.<br />
            The wait is almost over.
          </p>
          <div className="stores__badge">
            <span className="hero__badge-dot" style={{ background: 'var(--rose)' }} />
            Retail Launch — 2026
          </div>
        </FadeIn>
        <FadeIn delay={100} className="stores__image-wrap">
          <img src={storeFridge} alt="Elyte refrigerator in store" className="stores__image" />
        </FadeIn>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="footer__inner container">

          {/* Brand column */}
          <div className="footer__brand">
            <p className="footer__logo">ELYTE</p>
            <p className="footer__tagline">Sparkling Water Based Energy Drink</p>
          </div>

          {/* Divider */}
          <div className="footer__vr" />

          {/* Contact column */}
          <div className="footer__contact">
            <p className="footer__contact-heading">Get in Touch</p>
            <a href="mailto:alpha9pvt.ltd@gmail.com" className="footer__contact-item">
              <Mail size={15} strokeWidth={1.8} />
              alpha9pvt.ltd@gmail.com
            </a>
            <a href="tel:+917597857227" className="footer__contact-item">
              <Phone size={15} strokeWidth={1.8} />
              +91 – 7597857227
            </a>
          </div>

        </div>
        <p className="footer__copy">© 2026 Elyte Energy. All rights reserved.</p>
      </footer>

    </div>
  )
}
