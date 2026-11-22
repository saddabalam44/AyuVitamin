import React from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext.jsx'

export default function AboutPage() {
  const { t } = useLanguage()

  return (
    <div className="about-page">
      <div className="container">
        <h1 className="about-title">{t('aboutTitle')}</h1>

        <section className="about-section card">
          <h2>{t('aboutMission')}</h2>
          <p>{t('aboutMissionText')}</p>
        </section>

        <section className="about-section card">
          <h2>✅ {t('aboutWhat')}</h2>
          <p>{t('aboutWhatText')}</p>
          <ul>
            <li>Free to use — no registration required</li>
            <li>Bilingual: English and Hindi interface</li>
            <li>Curated health summaries with source citations</li>
            <li>High-rated supportive home remedies with safety guidance</li>
            <li>Links to official Indian government and WHO resources</li>
            <li>Sample healthcare facility listings across major Indian cities</li>
          </ul>
        </section>

        <section className="about-section card">
          <h2>❌ {t('aboutWhatNot')}</h2>
          <p>{t('aboutWhatNotText')}</p>
          <ul>
            <li>Not a telemedicine or online consultation service</li>
            <li>Not a medical diagnosis or prescription tool</li>
            <li>Home remedies are for comfort & general wellness only, not a replacement for doctors</li>
            <li>Facility listings are <strong>sample/demo data only</strong> and are NOT verified</li>
            <li>Does not store any personal health data</li>
          </ul>
        </section>

        <section className="about-section card about-disclaimer-card">
          <h2>⚠️ {t('aboutDisclaimer')}</h2>
          <p>{t('aboutDisclaimerText')}</p>
          <p>
            <strong>In a medical emergency, call 112 or visit your nearest hospital immediately.</strong>
          </p>
        </section>

        <section className="about-section card">
          <h2>🔗 {t('aboutLinks')}</h2>
          <ul className="about-links-list">
            <li>
              <a href="https://vikaspedia.in/health" target="_blank" rel="noopener noreferrer" className="about-link">
                Vikaspedia Health Portal (vikaspedia.in/health)
              </a>
              — Official Indian Knowledge Initiative for Health & AYUSH
            </li>
            <li>
              <a href="https://www.mohfw.gov.in/" target="_blank" rel="noopener noreferrer" className="about-link">
                Ministry of Health & Family Welfare (mohfw.gov.in)
              </a>
              — Government of India official health portal
            </li>
            <li>
              <a href="https://www.who.int/india" target="_blank" rel="noopener noreferrer" className="about-link">
                WHO India (who.int/india)
              </a>
              — World Health Organization India office
            </li>
            <li>
              <a href="https://nimhans.ac.in/" target="_blank" rel="noopener noreferrer" className="about-link">
                NIMHANS (nimhans.ac.in)
              </a>
              — National Institute of Mental Health and Neurosciences (Helpline: 080-46110007)
            </li>
            <li>
              <a href="https://icallhelpline.org/" target="_blank" rel="noopener noreferrer" className="about-link">
                iCall (icallhelpline.org)
              </a>
              — Free psychosocial counselling helpline: <strong>9152987821</strong>
            </li>
            <li>
              <a href="https://anemiamuktbharat.info/" target="_blank" rel="noopener noreferrer" className="about-link">
                Anaemia Mukt Bharat (anemiamuktbharat.info)
              </a>
              — Government of India national programme
            </li>
          </ul>
        </section>

        <div className="about-back">
          <Link to="/" className="btn btn-primary">← Back to Home</Link>
        </div>
      </div>
    </div>
  )
}
