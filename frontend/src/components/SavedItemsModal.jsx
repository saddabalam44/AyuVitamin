import React from 'react'
import { useLanguage } from '../context/LanguageContext.jsx'

export default function SavedItemsModal({ isOpen, onClose }) {
  const { t, lang, savedItems, toggleSaveFacility, toggleSaveUpchaar } = useLanguage()

  if (!isOpen) return null

  const hasItems = savedItems.facilities.length > 0 || savedItems.upchaar.length > 0

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">🔖 {t('savedModalTitle')}</h2>
          <button className="modal-close-btn" onClick={onClose} aria-label={t('closeBtn')}>✕</button>
        </div>

        <div className="modal-body">
          {!hasItems ? (
            <p className="saved-empty-text">{t('savedModalEmpty')}</p>
          ) : (
            <>
              {savedItems.facilities.length > 0 && (
                <div className="saved-group">
                  <h3 className="saved-group-title">🏥 {t('savedFacilities')} ({savedItems.facilities.length})</h3>
                  <div className="saved-list">
                    {savedItems.facilities.map(f => (
                      <div key={f.id} className="saved-item-row">
                        <div>
                          <strong>{f.name}</strong>
                          <span className="saved-item-sub"> — {f.type} · {f.city}</span>
                        </div>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => toggleSaveFacility(f)}
                          aria-label={`Remove ${f.name}`}
                        >
                          {t('removeBtn')}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {savedItems.upchaar.length > 0 && (
                <div className="saved-group">
                  <h3 className="saved-group-title">🌿 {t('savedUpchaar')} ({savedItems.upchaar.length})</h3>
                  <div className="saved-list">
                    {savedItems.upchaar.map(u => {
                      const title = lang === 'hi' ? (u.title_hi || u.title) : u.title
                      return (
                        <div key={u.id} className="saved-item-row">
                          <div>
                            <strong>{title}</strong>
                            <span className="saved-item-sub"> — ⭐ {u.rating}</span>
                          </div>
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => toggleSaveUpchaar(u)}
                            aria-label={`Remove ${title}`}
                          >
                            {t('removeBtn')}
                          </button>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn btn-primary" onClick={onClose}>
            {t('closeBtn')}
          </button>
        </div>
      </div>
    </div>
  )
}
