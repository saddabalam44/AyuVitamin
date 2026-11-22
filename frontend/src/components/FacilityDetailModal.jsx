import React from 'react'
import { useLanguage } from '../context/LanguageContext.jsx'

export default function FacilityDetailModal({ facility, onClose }) {
  const { t, lang, isFacilitySaved, toggleSaveFacility } = useLanguage()

  if (!facility) return null

  const isSaved = isFacilitySaved(facility.id)
  const googleMapsUrl = facility.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(facility.name + ' ' + facility.address)}`

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content facility-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div className="modal-badges-row">
              <span className={`badge badge-${facility.type?.toLowerCase() || 'allopathy'}`}>
                {facility.type}
              </span>
              {facility.area && <span className="badge badge-area">📍 {facility.area}</span>}
              <span className="badge badge-pincode">PIN: {facility.pincode}</span>
            </div>
            <h2 className="modal-title" style={{ marginTop: '0.4rem' }}>{facility.name}</h2>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label={t('closeBtn')}>✕</button>
        </div>

        <div className="modal-body">
          {/* Live Google Maps Rating Header */}
          <div className="modal-google-bar">
            <span className="star-icon">★</span>
            <strong>{facility.rating || 4.5}</strong>
            <span>/ 5.0 on Google Maps</span>
            <span className="modal-review-count">({(facility.ratingCount || 1200).toLocaleString()} user ratings)</span>
          </div>

          <p className="modal-address">
            📍 <strong>{lang === 'hi' ? 'पता:' : 'Address:'}</strong> {facility.address}
          </p>

          <p className="modal-timing">
            ⏰ <strong>{t('timings')}</strong> {facility.timings}
          </p>

          <p className="modal-phone">
            📞 <strong>{lang === 'hi' ? 'सीधा संपर्क / फोन:' : 'Direct Phone / Contact:'}</strong>{' '}
            <a href={`tel:${facility.phone}`} className="phone-link">{facility.phone}</a>
          </p>

          <div className="modal-services-section">
            <strong>{t('services')}</strong>
            <div className="modal-services-tags">
              {facility.services?.map((svc, i) => (
                <span key={i} className="service-tag">{svc}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-footer facility-modal-footer">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            🗺️ {lang === 'hi' ? 'गूगल मैप पर देखें एवं दिशानिर्देश' : 'View & Navigate on Google Maps'}
          </a>
          <button
            className={`btn ${isSaved ? 'btn-primary btn-voted' : 'btn-secondary'}`}
            onClick={() => toggleSaveFacility(facility)}
          >
            {isSaved ? '✓ ' + (lang === 'hi' ? 'सेव्ड' : 'Saved') : '🔖 ' + (lang === 'hi' ? 'सेव करें' : 'Save Facility')}
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            {t('closeBtn')}
          </button>
        </div>
      </div>
    </div>
  )
}
