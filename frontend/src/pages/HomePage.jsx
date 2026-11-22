import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext.jsx'
import SearchBar from '../components/SearchBar.jsx'
import CareNavigator from '../components/CareNavigator.jsx'

const EXAMPLE_CHIPS = [
  { en: 'Cough & Cold', hi: 'खांसी एवं जुकाम' },
  { en: 'Diabetes', hi: 'मधुमेह (शुगर)' },
  { en: 'Back Pain', hi: 'पीठ एवं कमर दर्द' },
  { en: 'Anxiety & Stress', hi: 'चिंता व मानसिक तनाव' },
  { en: 'Blood Pressure', hi: 'हाई बीपी' },
  { en: 'Acidity & Gas', hi: 'एसिडिटी व अपच' },
  { en: 'Dengue Fever', hi: 'डेंगू बुखार' }
]

export default function HomePage() {
  const { t, lang } = useLanguage()
  const navigate = useNavigate()

  function handleSearch(query) {
    navigate(`/results?q=${encodeURIComponent(query)}&lang=${lang}`)
  }

  function handleChip(chip) {
    const query = lang === 'hi' ? chip.hi : chip.en
    navigate(`/results?q=${encodeURIComponent(query)}&lang=${lang}`)
  }

  function handleDomainClick(query, type) {
    navigate(`/results?q=${encodeURIComponent(query)}&type=${type || 'All'}&lang=${lang}`)
  }

  return (
    <div className="homepage">
      {/* Emergency banner */}
      <div className="emergency-banner" role="alert">
        {t('emergencyBanner')}
      </div>

      {/* Hero */}
      <section className="hero" aria-label="Search for health information">
        <div className="container hero-inner">
          <div className="hero-badge-pill">
            <span>🇮🇳 India's Public Health & Care Navigation System</span>
          </div>
          <div className="hero-logo" aria-hidden="true">🌿</div>
          <h1 className="hero-brand">AyuVitamin</h1>
          <p className="hero-tagline">{t('tagline')}</p>
          <p className="hero-desc">{t('heroDesc')}</p>

          <SearchBar onSearch={handleSearch} />

          {/* Example chips */}
          <div className="example-chips" aria-label="Example search topics">
            <span className="chips-label">{t('exampleTopics')}</span>
            {EXAMPLE_CHIPS.map((chip) => (
              <button
                key={chip.en}
                className="chip"
                onClick={() => handleChip(chip)}
                aria-label={`Search for ${lang === 'hi' ? chip.hi : chip.en}`}
              >
                {lang === 'hi' ? chip.hi : chip.en}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Live Stats Ticker */}
      <section className="stats-ticker-bar" aria-label="Platform Highlights">
        <div className="container stats-ticker-inner">
          <div className="stat-item">
            <span className="stat-number">20+</span>
            <span className="stat-label">{t('statFacilities')}</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">12</span>
            <span className="stat-label">{t('statTopics')}</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">25+</span>
            <span className="stat-label">{t('statUpchaar')}</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">100%</span>
            <span className="stat-label">{t('statPrivacy')}</span>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="container homepage-content">
        {/* Interactive Care Navigator Widget */}
        <CareNavigator />

        {/* Explore Healthcare Disciplines Grid */}
        <section className="domains-section" aria-label={t('exploreDomains')}>
          <div className="section-header-box text-center">
            <h2 className="section-title text-center">{t('exploreDomains')}</h2>
            <p className="section-subtitle text-center">
              {lang === 'hi'
                ? 'अपनी जरूरत के अनुसार सही स्वास्थ्य प्रणाली चुनें — एलोपैथी, आयुष, फिजियोथेरेपी या मानसिक स्वास्थ्य।'
                : 'Select the right discipline for your specific health needs across India’s healthcare landscape.'}
            </p>
          </div>

          <div className="domains-grid">
            <div className="domain-card" onClick={() => handleDomainClick('hospital', 'Allopathy')}>
              <div className="domain-icon">🩺</div>
              <h3 className="domain-title">{t('domainAllopathyTitle')}</h3>
              <p className="domain-desc">{t('domainAllopathyDesc')}</p>
              <span className="domain-link">Explore Facilities →</span>
            </div>

            <div className="domain-card" onClick={() => handleDomainClick('ayush', 'AYUSH')}>
              <div className="domain-icon">🌿</div>
              <h3 className="domain-title">{t('domainAyushTitle')}</h3>
              <p className="domain-desc">{t('domainAyushDesc')}</p>
              <span className="domain-link">Explore AYUSH Centers →</span>
            </div>

            <div className="domain-card" onClick={() => handleDomainClick('physiotherapy', 'Physiotherapy')}>
              <div className="domain-icon">🦴</div>
              <h3 className="domain-title">{t('domainPhysioTitle')}</h3>
              <p className="domain-desc">{t('domainPhysioDesc')}</p>
              <span className="domain-link">Explore Physiotherapy →</span>
            </div>

            <div className="domain-card" onClick={() => handleDomainClick('anxiety', 'Mental Health')}>
              <div className="domain-icon">🧠</div>
              <h3 className="domain-title">{t('domainMentalTitle')}</h3>
              <p className="domain-desc">{t('domainMentalDesc')}</p>
              <span className="domain-link">Explore Mental Health →</span>
            </div>

            <div className="domain-card" onClick={() => handleDomainClick('cold', 'All')}>
              <div className="domain-icon">🍵</div>
              <h3 className="domain-title">{t('domainGhareluTitle')}</h3>
              <p className="domain-desc">{t('domainGhareluDesc')}</p>
              <span className="domain-link">Browse Rated Remedies →</span>
            </div>

            <div className="domain-card" onClick={() => handleDomainClick('anemia', 'All')}>
              <div className="domain-icon">🏛️</div>
              <h3 className="domain-title">{t('domainProgramsTitle')}</h3>
              <p className="domain-desc">{t('domainProgramsDesc')}</p>
              <span className="domain-link">Explore Government Initiatives →</span>
            </div>
          </div>
        </section>
      </div>

      {/* Disclaimer */}
      <div className="homepage-disclaimer container">
        <p className="disclaimer-text">ℹ️ {t('disclaimer')}</p>
      </div>
    </div>
  )
}
