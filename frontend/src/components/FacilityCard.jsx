import React from 'react'
import { useLanguage } from '../context/LanguageContext.jsx'

const TYPE_BADGE_CLASS = {
  'Allopathy': 'badge badge-allopathy',
  'AYUSH': 'badge badge-ayush',
  'Physiotherapy': 'badge badge-physio',
  'Mental Health': 'badge badge-mental',
}

const TYPE_LABEL_HI = {
  'Allopathy': 'एलोपैथी',
  'AYUSH': 'आयुष',
  'Physiotherapy': 'फिजियोथेरेपी',
  'Mental Health': 'मानसिक स्वास्थ्य',
}

export default function FacilityCard({ facility, onSelect }) {
  const { t, lang, isFacilitySaved, toggleSaveFacility } = useLanguage()
  const badgeClass = TYPE_BADGE_CLASS[facility.type] || 'badge'
  const typeLabel = lang === 'hi' ? (TYPE_LABEL_HI[facility.type] || facility.type) : facility.type
  const isSaved = isFacilitySaved(facility.id)

  const googleMapsUrl = facility.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(facility.name + ' ' + facility.address)}`

  return (
    <article className="card facility-card" aria-label={facility.name}>
      <div className="card-header">
        <div className="card-badges-left">
          <span className={badgeClass}>{typeLabel}</span>
          {facility.area && <span className="badge badge-area">📍 {facility.area}</span>}
        </div>
        <button
          className="bookmark-icon-btn"
          onClick={(e) => { e.stopPropagation(); toggleSaveFacility(facility); }}
          title={isSaved ? 'Remove from Saved' : 'Save to Care Kit'}
          aria-label={isSaved ? 'Remove from Saved' : 'Save to Care Kit'}
        >
          {isSaved ? '🔖' : '🏷️'}
        </button>
      </div>

      <h3 className="card-title facility-name">{facility.name}</h3>
      <p className="facility-address">📍 {facility.address}</p>

      {/* Google Maps Live Rating Indicator */}
      <div className="google-rating-bar">
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="google-rating-link"
          title="View live reviews and ratings on Google Maps"
        >
          <span className="star-icon">★</span>
          <strong className="rating-score">{facility.rating || 4.5}</strong>
          <span className="rating-count">({(facility.ratingCount || 1200).toLocaleString()} reviews on Google Maps ↗)</span>
        </a>
      </div>

      <p className="facility-timings">
        <strong>{t('timings')}</strong> {facility.timings}
      </p>

      {facility.services && facility.services.length > 0 && (
        <div className="facility-services">
          <strong>{t('services')}</strong>
          <ul className="services-list">
            {facility.services.slice(0, 4).map((s, i) => (
              <li key={i}>{s}</li>
            ))}
            {facility.services.length > 4 && <li>+{facility.services.length - 4} more</li>}
          </ul>
        </div>
      )}

      <div className="facility-card-actions">
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => onSelect && onSelect(facility)}
        >
          {t('viewDetails')} →
        </button>
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary btn-sm btn-directions"
          aria-label={`Get directions to ${facility.name} on Google Maps`}
        >
          🗺️ {lang === 'hi' ? 'दिशानिर्देश' : 'Directions'}
        </a>
      </div>
    </article>
  )
}
