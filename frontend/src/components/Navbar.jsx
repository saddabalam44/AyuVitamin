import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext.jsx'
import SavedItemsModal from './SavedItemsModal.jsx'

export default function Navbar() {
  const { t, lang, setLang, savedItems } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)
  const [savedModalOpen, setSavedModalOpen] = useState(false)

  const savedCount = savedItems.facilities.length + savedItems.upchaar.length

  function toggleLang() {
    setLang(lang === 'en' ? 'hi' : 'en')
  }

  return (
    <>
      {/* Top Emergency Hotlines Bar */}
      <div className="top-emergency-bar">
        <div className="container top-emergency-inner">
          <span className="emergency-label">⚡ {t('emergencyBarTitle')}</span>
          <div className="emergency-hotlines">
            <a href="tel:112" className="hotline-pill hotline-pill--red">112 (National)</a>
            <a href="tel:108" className="hotline-pill hotline-pill--amber">108 (Ambulance)</a>
            <a href="tel:9152987821" className="hotline-pill hotline-pill--purple">9152987821 (iCall Mental Health)</a>
          </div>
        </div>
      </div>

      <nav className="navbar" role="navigation" aria-label="Main navigation">
        <div className="container navbar-inner">
          <Link to="/" className="navbar-brand" aria-label="AyuVitamin Home">
            <span className="brand-leaf" aria-hidden="true">🌿</span>
            <div className="brand-text-block">
              <span className="brand-name">{t('brand')}</span>
              <span className="brand-sub">Health & Care Navigation</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="navbar-links">
            <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              {t('navHome')}
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              {t('navAbout')}
            </NavLink>

            {/* Care Kit Trigger */}
            <button
              className="btn btn-secondary nav-carekit-btn"
              onClick={() => setSavedModalOpen(true)}
              aria-label="Open saved care kit"
            >
              🔖 {t('navSaved')} {savedCount > 0 && <span className="carekit-badge">{savedCount}</span>}
            </button>

            {/* Language Toggle */}
            <button
              className="btn btn-secondary lang-toggle"
              onClick={toggleLang}
              aria-label={lang === 'en' ? 'Switch to Hindi' : 'Switch to English'}
            >
              🌐 {lang === 'en' ? 'हिन्दी' : 'English'}
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="hamburger"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className={`hamburger-line ${menuOpen ? 'open' : ''}`}></span>
            <span className={`hamburger-line ${menuOpen ? 'open' : ''}`}></span>
            <span className={`hamburger-line ${menuOpen ? 'open' : ''}`}></span>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="mobile-menu" role="menu">
            <NavLink
              to="/"
              end
              className={({ isActive }) => isActive ? 'mobile-nav-link active' : 'mobile-nav-link'}
              onClick={() => setMenuOpen(false)}
            >
              {t('navHome')}
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) => isActive ? 'mobile-nav-link active' : 'mobile-nav-link'}
              onClick={() => setMenuOpen(false)}
            >
              {t('navAbout')}
            </NavLink>
            <button
              className="btn btn-secondary mobile-carekit-btn"
              onClick={() => { setSavedModalOpen(true); setMenuOpen(false); }}
            >
              🔖 {t('navSaved')} {savedCount > 0 ? `(${savedCount})` : ''}
            </button>
            <button
              className="btn btn-secondary lang-toggle"
              onClick={() => { toggleLang(); setMenuOpen(false) }}
            >
              🌐 {lang === 'en' ? 'हिन्दी में बदलें' : 'Switch to English'}
            </button>
          </div>
        )}
      </nav>

      {/* Saved Items Modal */}
      <SavedItemsModal isOpen={savedModalOpen} onClose={() => setSavedModalOpen(false)} />
    </>
  )
}
