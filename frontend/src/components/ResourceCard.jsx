import React from 'react'
import { useLanguage } from '../context/LanguageContext.jsx'

const TYPE_BADGE_CLASS = {
  'article': 'badge badge-resource-article',
  'video': 'badge badge-resource-video',
  'guide': 'badge badge-resource-guide',
}

export default function ResourceCard({ resource }) {
  const { t } = useLanguage()
  const badgeClass = TYPE_BADGE_CLASS[resource.type] || 'badge'

  return (
    <article className="card resource-card" aria-label={resource.title}>
      <div className="card-header">
        <span className={badgeClass}>{resource.type}</span>
        {resource.isDemo && (
          <span className="badge badge-demo" title={resource.demoNote}>
            {t('demoResource')}
          </span>
        )}
      </div>

      <h3 className="card-title resource-title">{resource.title}</h3>
      <p className="resource-source">📌 {resource.source}</p>
      <p className="resource-description">{resource.description}</p>

      {resource.isDemo && resource.demoNote && (
        <p className="demo-note-text">{resource.demoNote}</p>
      )}

      <a
        href={resource.url}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-secondary resource-link"
        aria-label={`Visit resource: ${resource.title}`}
      >
        {t('visitResource')}
      </a>
    </article>
  )
}
