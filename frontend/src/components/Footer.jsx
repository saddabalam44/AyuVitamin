import React from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext.jsx'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span aria-hidden="true">🌿</span> {t('brand')}
          <p className="footer-tagline">{t('footerTagline')}</p>
        </div>

        <div className="footer-links">
          <Link to="/about" className="footer-link">{t('navAbout')}</Link>
          <a
            href="https://vikaspedia.in/health"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            Vikaspedia Health
          </a>
          <a
            href="https://www.mohfw.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            MoHFW India
          </a>
          <a
            href="https://www.who.int/india"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            WHO India
          </a>
        </div>

        <div className="footer-bottom">
          <p className="footer-disclaimer">{t('footerDisclaimer')}</p>
          <p className="footer-copyright">{t('footerCopyright')}</p>
        </div>
      </div>
    </footer>
  )
}
