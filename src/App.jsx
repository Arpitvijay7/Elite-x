import { useEffect, useRef, useState } from "react";
import "./App.css";

import logoSymbol from "./assets/logo-symbol.png";
import heroCans from "./assets/hero-cans.png";
import cansSplash from "./assets/cans-splash.png";
import canWatermelon from "./assets/can-watermelon-blueberry.png";
import canPineapple from "./assets/can-pineapple-blueberry.png";
import cansSand from "./assets/cans-sand.png";
import cansSeeds from "./assets/cans-seeds.png";
import cansDark from "./assets/cans-dark.png";
import storeFridge from "./assets/store-fridge-new.png";

const TICKER_ITEMS = [
  "Sparkling Water Based",
  "Naturally Derived Caffeine",
  "No Artificial Flavour",
  "No Artificial Colour",
  "No Preservatives",
  "Essential Electrolytes",
];

const FLAVORS = [
  {
    code: "WMB 01",
    name: "Watermelon",
    accent: "Blueberry",
    tone: "rose",
    image: canWatermelon,
    alt: "Watermelon x Blueberry can",
    desc: "Juicy watermelon layered with smooth blueberry notes for a refreshing, high-clarity finish.",
    bullets: [
      "No artificial flavour",
      "No artificial colour",
      "Electrolyte support",
    ],
  },
  {
    code: "PNB 02",
    name: "Pineapple",
    accent: "Blueberry",
    tone: "ice",
    image: canPineapple,
    alt: "Pineapple x Blueberry can",
    desc: "Bright tropical pineapple balanced with blueberry depth and a clean sparkling lift.",
    bullets: [
      "Naturally derived caffeine",
      "Sparkling water base",
      "No preservatives",
    ],
  },
];

const INGREDIENT_POINTS = [
  {
    title: "Sparkling Water Base",
    text: "A clean carbonated foundation designed for daily drinkability and a crisp flavour profile.",
  },
  {
    title: "Natural Flavours",
    text: "Flavour systems sourced naturally so taste feels real, balanced, and not synthetic.",
  },
  {
    title: "Coffee Bean Caffeine",
    text: "Naturally derived caffeine selected for smooth focus and controlled energy delivery.",
  },
  {
    title: "No Artificial Additives",
    text: "No artificial colour, flavour, or preservatives. Transparent formulation from label to sip.",
  },
];

function useInView(ref, threshold = 0.14) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return visible;
}

function Reveal({ children, className = "", delay = 0, dir = "up" }) {
  const ref = useRef(null);
  const visible = useInView(ref);

  return (
    <div
      ref={ref}
      className={`reveal reveal--${dir} ${visible ? "reveal--in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function Ticker() {
  const loopItems = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="ticker" aria-hidden>
      <div className="ticker__track">
        {loopItems.map((item, i) => (
          <span key={i} className="ticker__item">
            <span className="ticker__dot" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="site">
      <header className={`nav ${scrolled ? "nav--solid" : ""}`}>
        <a href="#top" className="nav__brand">
          {/* <img src={logoSymbol} alt="Elyte" className="nav__logo-img" /> */}
          <span className="nav__brand-text">ELYTE</span>
        </a>

        <nav className="nav__links" aria-label="Main navigation">
          <a href="#story">Story</a>
          <a href="#flavors">Flavours</a>
          <a href="#ingredients">Ingredients</a>
          <a href="#availability">Availability</a>
        </nav>

        <a href="mailto:Contact.elytexenergy@gmail.com" className="nav__cta">
          Contact
        </a>

        <button
          className={`nav__burger ${menuOpen ? "nav__burger--open" : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <div className={`mobile-menu ${menuOpen ? "mobile-menu--open" : ""}`}>
        <a href="#story" onClick={() => setMenuOpen(false)}>
          Story
        </a>
        <a href="#flavors" onClick={() => setMenuOpen(false)}>
          Flavours
        </a>
        <a href="#ingredients" onClick={() => setMenuOpen(false)}>
          Ingredients
        </a>
        <a href="#availability" onClick={() => setMenuOpen(false)}>
          Availability
        </a>
        <a href="mailto:alpha9pvt.ltd@gmail.com" className="mobile-menu__cta">
          Contact
        </a>
      </div>

      <section id="top" className="hero">
        <div className="hero__left">
          <Reveal dir="left" className="hero__eyebrow-wrap">
            <span className="hero__eyebrow">Est. 2026 — India</span>
          </Reveal>

          <h1 className="hero__heading">
            <span className="hero__line hero__line--1">ELYTE</span>
            <span className="hero__line hero__line--2">×</span>
            <span className="hero__line hero__line--3">ENERGY</span>
          </h1>

          <Reveal delay={300} className="hero__sub-wrap">
            <p className="hero__sub">
              Sparkling water based energy.
              <br />
              No synthetic shortcuts. Built for the elite.
            </p>
            <div className="hero__launch">
              <span className="hero__pulse" />
              Coming Soon
            </div>
          </Reveal>
        </div>

        <div className="hero__right">
          <img
            src={heroCans}
            alt="Elyte Watermelon and Pineapple cans"
            className="hero__image"
          />
          <div className="hero__img-label hero__img-label--wm">Watermelon</div>
          <div className="hero__img-label hero__img-label--pn">Pineapple</div>
        </div>

        <a
          href="#story"
          className="hero__scroll-cue"
          aria-label="Scroll to story"
        >
          <span className="hero__scroll-line" />
          <span className="hero__scroll-text">scroll</span>
        </a>
      </section>

      {/* ══ TICKER ══ */}
      <Ticker />

      <section id="story" className="section story">
        <div className="section__head">
          <p className="section__eyebrow">01 / Story</p>
          <h2>Built For Sustainable Energy, Not Artificial Intensity.</h2>
        </div>

        <div className="story__layout">
          <Reveal className="story__image" dir="left">
            <img src={cansDark} alt="Elyte cans studio shot" />
          </Reveal>

          <Reveal className="story__content" delay={120}>
            <h3>Why Elyte Exists</h3>
            <p>
              We built Elyte around one principle: high performance should never
              require synthetic shortcuts. Every decision starts with long-term
              drinkability, ingredient clarity, and brand integrity.
            </p>
            <p>
              This is energy reimagined for professionals, athletes, and
              creators who demand clean input, consistent output, and premium
              taste.
            </p>
            <div className="story__stats">
              <div>
                <strong>0</strong>
                <span>Artificial Additives</span>
              </div>
              <div>
                <strong>2</strong>
                <span>Signature Flavours</span>
              </div>
              <div>
                <strong>2026</strong>
                <span>Retail Launch</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="flavors" className="section flavors">
        <div className="section__head">
          <p className="section__eyebrow">02 / Flavours</p>
          <h2>Two Foundational Profiles. One Clean Standard.</h2>
        </div>

        <div className="flavor-grid">
          {/* Watermelon × Blueberry */}
          <Reveal className="flavor-card flavor-card--rose" delay={0}>
            <div className="flavor-card__inner">
              <div className="flavor-card__info">
                <span className="flavor-card__code">WMB — 01</span>
                <h3 className="flavor-card__name">
                  Watermelon
                  <br />
                  <em>× Blueberry</em>
                </h3>
                <p className="flavor-card__desc">
                  Juicy summer watermelon fused with sweet blueberry.
                  Refreshingly bold, naturally sparkling.
                </p>
                <ul className="flavor-card__tags">
                  <li>No Artificial Colour</li>
                  <li>No Artificial Flavour</li>
                  <li>Essential Electrolytes</li>
                </ul>
                <div className="flavor-card__badge">Coming Soon</div>
              </div>
            </div>
          </Reveal>

          {/* Pineapple × Blueberry */}
          <Reveal className="flavor-card flavor-card--ice" delay={120}>
            <div className="flavor-card__inner">
              <div className="flavor-card__info">
                <span className="flavor-card__code">PNB — 02</span>
                <h3 className="flavor-card__name">
                  Pineapple
                  <br />
                  <em>× Blueberry</em>
                </h3>
                <p className="flavor-card__desc">
                  Bright tropical pineapple cutting through with a wave of fresh
                  blueberry. Clean energy, bold taste.
                </p>
                <ul className="flavor-card__tags">
                  <li>Naturally Derived Caffeine</li>
                  <li>Sparkling Water Base</li>
                  <li>No Preservatives</li>
                </ul>
                <div className="flavor-card__badge">Coming Soon</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="ingredients" className="section ingredients">
        <div className="section__head">
          <p className="section__eyebrow">03 / Ingredients</p>
          <h2>Transparent Ingredient Strategy, End To End.</h2>
        </div>

        <div className="ingredients__layout">
          <Reveal className="ingredients__list" dir="left">
            {INGREDIENT_POINTS.map((item, i) => (
              <div
                key={item.title}
                className="ingredients__item"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </Reveal>

          <Reveal className="ingredients__media" dir="right" delay={120}>
            <img src={cansSand} alt="Elyte cans on dark textured surface" />
          </Reveal>
        </div>
      </section>

      <section id="availability" className="section availability">
        <div className="section__head section__head--light">
          <p className="section__eyebrow">04 / Availability</p>
          <h2>Rolling Out Across India In 2026.</h2>
        </div>

        <div className="availability__layout">
          <Reveal className="availability__card" dir="left">
            <p>
              Distribution is planned through premium grocery, fitness networks,
              and selected retail partners. Priority markets focus on
              high-frequency consumers seeking cleaner alternatives.
            </p>
            <div className="availability__badge">Retail Launch 2026</div>
          </Reveal>

          <Reveal className="availability__media" dir="right" delay={120}>
            <img src={storeFridge} alt="Elyte products in a retail cooler" />
          </Reveal>
        </div>
      </section>

      <footer className="footer">
        <div className="footer__top">
          <div className="footer__brand-col">
            <img src={logoSymbol} alt="Elyte" className="footer__logo-img" />
            <p className="footer__brand-name">ELYTE</p>
            <p className="footer__tagline">
              Sparkling Water Based Energy Drink
            </p>
          </div>

          <div className="footer__nav-col">
            <p className="footer__col-label">Navigation</p>
            <a href="#story">Story</a>
            <a href="#flavors">Flavours</a>
            <a href="#ingredients">Ingredients</a>
            <a href="#availability">Availability</a>
          </div>

          <div className="footer__contact-col">
            <p className="footer__col-label">Contact</p>
            <a href="mailto:Contact.elytexenergy@gmail.com">
              Contact.elytexenergy@gmail.com
            </a>
            <p className="footer__registered">
              Alpha9 Pvt. Ltd. / Registered in India
            </p>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© 2026 Aplha9 Corporation. All rights reserved.</p>
          <p className="footer__disclaimer">
            {/* Elyte is a trademark of Alpha9 Pvt. Ltd. */}
          </p>
        </div>
      </footer>
    </div>
  );
}
