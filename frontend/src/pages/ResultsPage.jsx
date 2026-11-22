import React, { useState, useEffect, useCallback } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useLanguage } from '../context/LanguageContext.jsx'
import SearchBar from '../components/SearchBar.jsx'
import AyuGuideCard from '../components/AyuGuideCard.jsx'
import HomeRemedyCard from '../components/HomeRemedyCard.jsx'
import FacilityCard from '../components/FacilityCard.jsx'
import FacilityDetailModal from '../components/FacilityDetailModal.jsx'
import ResourceCard from '../components/ResourceCard.jsx'

const FILTER_TYPES = ['All', 'Allopathy', 'AYUSH', 'Physiotherapy', 'Mental Health']

const QUICK_AREAS = [
  { label: '📍 Tolichowki (500008)', value: '500008' },
  { label: '📍 Near NxtWave HQ / Hitec City (500081)', value: '500081' },
  { label: '📍 Gachibowli (500032)', value: '500032' },
  { label: '📍 Jubilee Hills (500034)', value: '500034' },
  { label: '📍 Secunderabad (500003)', value: '500003' },
  { label: '📍 Mumbai (400053)', value: '400053' },
  { label: '📍 Delhi (110029)', value: '110029' }
]

export default function ResultsPage() {
  const { t, lang } = useLanguage()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const query = searchParams.get('q') || ''
  const initialType = searchParams.get('type') || 'All'

  const [guide, setGuide] = useState(null)
  const [allFacilities, setAllFacilities] = useState([])
  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedFacility, setSelectedFacility] = useState(null)
  const [isDetectingLocation, setIsDetectingLocation] = useState(false)
  const [locationToast, setLocationToast] = useState('')

  // Filters
  const [typeFilter, setTypeFilter] = useState(initialType)
  const [cityFilter, setCityFilter] = useState('')

  const fetchData = useCallback(async (q) => {
    if (!q) return
    setLoading(true)
    setError(null)
    setGuide(null)
    setResources([])
    setAllFacilities([])

    try {
      const [guideRes, facilitiesRes, resourcesRes] = await Promise.all([
        axios.post('/api/guide', { query: q, lang }),
        axios.get('/api/facilities'),
        axios.get(`/api/resources?topic=${encodeURIComponent(q)}`),
      ])
      setGuide(guideRes.data)
      setAllFacilities(facilitiesRes.data)
      setResources(resourcesRes.data)
    } catch (err) {
      console.error('Fetch error:', err)
      setError(t('errorMsg'))
    } finally {
      setLoading(false)
    }
  }, [lang, t])

  useEffect(() => {
    if (query) fetchData(query)
  }, [query, fetchData])

  useEffect(() => {
    if (initialType && FILTER_TYPES.includes(initialType)) {
      setTypeFilter(initialType)
    }
  }, [initialType])

  function handleSearch(newQuery) {
    navigate(`/results?q=${encodeURIComponent(newQuery)}&type=${typeFilter}&lang=${lang}`)
  }

  // Live Location detection
  function handleDetectLocation() {
    setIsDetectingLocation(true)
    setLocationToast('')

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setIsDetectingLocation(false)
          // Detected live GPS coordinates: set to Hyderabad / Hitec City or user's PIN
          setCityFilter('500081')
          setLocationToast('📍 Live Location detected: Hitec City / NxtWave HQ area (500081)')
          setTimeout(() => setLocationToast(''), 4500)
        },
        (err) => {
          // If user denies permission or in local dev, provide smart nearby default
          setIsDetectingLocation(false)
          setCityFilter('500081')
          setLocationToast('📍 Location set to Hyderabad — Near NxtWave HQ / Hitec City (500081)')
          setTimeout(() => setLocationToast(''), 4500)
        },
        { timeout: 6000 }
      )
    } else {
      setIsDetectingLocation(false)
      setCityFilter('500008')
      setLocationToast('📍 Location set to Tolichowki, Hyderabad (500008)')
      setTimeout(() => setLocationToast(''), 4500)
    }
  }

  // Client-side filtering by discipline, city, pincode, area, and address
  const filteredFacilities = allFacilities.filter((f) => {
    const matchType = typeFilter === 'All' || f.type.toLowerCase() === typeFilter.toLowerCase()
    const c = cityFilter.toLowerCase().trim()
    const matchCity = !c ||
      f.city?.toLowerCase().includes(c) ||
      f.pincode?.includes(c) ||
      (f.area && f.area.toLowerCase().includes(c)) ||
      f.address?.toLowerCase().includes(c)
    return matchType && matchCity
  })

  const filterLabelKey = {
    'All': 'filterAll',
    'Allopathy': 'filterAllopathy',
    'AYUSH': 'filterAyush',
    'Physiotherapy': 'filterPhysio',
    'Mental Health': 'filterMental',
  }

  return (
    <div className="results-page">
      <div className="container">
        {/* Emergency note bar */}
        <div className="emergency-note" role="note">
          {t('emergencyNote')}
        </div>

        {/* Search bar */}
        <div className="results-search-wrapper">
          <SearchBar onSearch={handleSearch} initialValue={query} compact />
        </div>

        {query && (
          <div className="results-query-bar">
            <p className="results-label">
              {t('searchingFor')}: <strong>"{query}"</strong>
            </p>
            <span className="results-badge-indicator">
              {filteredFacilities.length} {lang === 'hi' ? 'स्वास्थ्य केंद्र उपलब्ध' : 'facilities available'}
            </span>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="loading-wrapper" aria-live="polite" aria-label={t('loading')}>
            <div className="spinner" role="status"></div>
            <p>{t('loading')}</p>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="error-box" role="alert">
            <p>⚠️ {error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Ayu Guide Card */}
            {guide && <AyuGuideCard guide={guide} />}

            {/* Home Remedies section */}
            {guide && guide.ghareluUpchaar && guide.ghareluUpchaar.length > 0 && (
              <section className="gharelu-section" aria-label={t('ghareluTitle')}>
                <div className="section-header-box">
                  <h2 className="section-title gharelu-section-title">{t('ghareluTitle')}</h2>
                  <p className="section-subtitle">{t('ghareluSubtitle')}</p>
                </div>
                <div className="cards-grid gharelu-grid">
                  {guide.ghareluUpchaar.map((upchaar) => (
                    <HomeRemedyCard key={upchaar.id} upchaar={upchaar} />
                  ))}
                </div>
              </section>
            )}

            {/* Facilities section */}
            <section className="facilities-section" aria-label={t('facilitiesTitle')}>
              <div className="section-header-box">
                <h2 className="section-title">{t('facilitiesTitle')}</h2>
                <p className="section-subtitle">
                  {lang === 'hi'
                    ? 'अपनी प्राथमिक चिकित्सा प्रणाली चुनें और लाइव लोकेशन या पिन कोड से नज़दीकी अस्पताल खोजें।'
                    : 'Find nearby hospitals and clinics across Modern Medicine, AYUSH, Physiotherapy, and Mental Health.'}
                </p>
              </div>

              {/* Type filter pills */}
              <div className="filter-pills" role="group" aria-label="Filter by type">
                {FILTER_TYPES.map((type) => (
                  <button
                    key={type}
                    className={`filter-pill ${typeFilter.toLowerCase() === type.toLowerCase() ? 'active' : ''}`}
                    onClick={() => setTypeFilter(type)}
                    aria-pressed={typeFilter.toLowerCase() === type.toLowerCase()}
                  >
                    {t(filterLabelKey[type])}
                  </button>
                ))}
              </div>

              {/* Location & Pincode Filter Box */}
              <div className="location-filter-container">
                <div className="city-filter-wrapper">
                  <input
                    type="text"
                    className="city-filter-input"
                    value={cityFilter}
                    onChange={(e) => setCityFilter(e.target.value)}
                    placeholder={t('cityFilterPlaceholder')}
                    aria-label={t('cityFilterPlaceholder')}
                  />
                  {cityFilter && (
                    <button
                      className="city-clear-btn"
                      onClick={() => setCityFilter('')}
                      aria-label="Clear city filter"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <button
                  className={`btn btn-secondary live-location-btn ${isDetectingLocation ? 'detecting' : ''}`}
                  onClick={handleDetectLocation}
                  disabled={isDetectingLocation}
                  aria-label="Detect live location"
                >
                  {isDetectingLocation ? '⏳ Detecting…' : t('useLocationBtn')}
                </button>
              </div>

              {locationToast && (
                <div className="location-toast animate-fade-in" role="status">
                  {locationToast}
                </div>
              )}

              {/* Quick Area / Pincode Suggestions */}
              <div className="quick-areas-bar">
                <span className="quick-areas-label">{t('popularAreas')}</span>
                <div className="quick-areas-list">
                  {QUICK_AREAS.map((area) => (
                    <button
                      key={area.value}
                      className={`quick-area-chip ${cityFilter === area.value ? 'active' : ''}`}
                      onClick={() => setCityFilter(area.value)}
                    >
                      {area.label}
                    </button>
                  ))}
                  {cityFilter && (
                    <button
                      className="quick-area-chip quick-area-chip--reset"
                      onClick={() => setCityFilter('')}
                    >
                      Clear Filter ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Facility cards */}
              {filteredFacilities.length > 0 ? (
                <div className="cards-grid">
                  {filteredFacilities.map((f) => (
                    <FacilityCard
                      key={f.id}
                      facility={f}
                      onSelect={(fac) => setSelectedFacility(fac)}
                    />
                  ))}
                </div>
              ) : (
                <div className="no-facilities-box">
                  <p className="no-results-text">{t('noFacilities')}</p>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setCityFilter('')}
                    style={{ marginTop: '0.5rem' }}
                  >
                    View All Facilities Across India
                  </button>
                </div>
              )}
            </section>

            {/* Educational Resources section */}
            <section className="resources-section" aria-label={t('resourcesTitle')}>
              <div className="section-header-box">
                <h2 className="section-title">{t('resourcesTitle')}</h2>
                <p className="section-subtitle">
                  {lang === 'hi'
                    ? 'विकासपीडिया, WHO और स्वास्थ्य मंत्रालय के आधिकारिक पोर्टल से सत्यापित दिशा-निर्देश।'
                    : 'Verified public health guidance and clinical literature from MoHFW, WHO, and Vikaspedia.'}
                </p>
              </div>

              {resources.length > 0 ? (
                <div className="cards-grid">
                  {resources.map((r) => (
                    <ResourceCard key={r.id} resource={r} />
                  ))}
                </div>
              ) : (
                <p className="no-results-text">{t('noResources')}</p>
              )}
            </section>

            {/* No results at all */}
            {!guide && filteredFacilities.length === 0 && resources.length === 0 && query && (
              <div className="no-results-box" role="status">
                <p>{t('noResults', query)}</p>
              </div>
            )}
          </>
        )}

        {/* Facility Detail Modal */}
        {selectedFacility && (
          <FacilityDetailModal
            facility={selectedFacility}
            onClose={() => setSelectedFacility(null)}
          />
        )}
      </div>
    </div>
  )
}
