import React, { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext.jsx'

export default function AyuGuideCard({ guide }) {
  const { t, lang } = useLanguage()
  const [isPlaying, setIsPlaying] = useState(false)
  const [copied, setCopied] = useState(false)

  if (!guide) return null

  const title = lang === 'hi' ? (guide.title_hi || guide.title) : guide.title
  const summary = lang === 'hi' ? (guide.summary_hi || guide.summary) : guide.summary
  const keyPoints = lang === 'hi' ? (guide.keyPoints_hi || guide.keyPoints) : guide.keyPoints

  // Speech synthesizer
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, [lang])

  function handleToggleSpeech() {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this browser.')
      return
    }

    if (isPlaying) {
      window.speechSynthesis.cancel()
      setIsPlaying(false)
      return
    }

    window.speechSynthesis.cancel()
    const textToSpeak = `${title}. ${summary}. ${keyPoints ? keyPoints.join('. ') : ''}`
    const utterance = new SpeechSynthesisUtterance(textToSpeak)
    utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-IN'
    utterance.rate = 0.95

    utterance.onend = () => setIsPlaying(false)
    utterance.onerror = () => setIsPlaying(false)

    window.speechSynthesis.speak(utterance)
    setIsPlaying(true)
  }

  function handleCopy() {
    const textToCopy = `${title}\n\nSummary:\n${summary}\n\nSource: ${guide.source}\n${guide.sourceUrl || ''}`
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    })
  }

  return (
    <section className="card ayu-guide-card" aria-label="Ayu Guide health information">
      <div className="ayu-guide-header">
        <div className="ayu-guide-title-box">
          <h2 className="ayu-guide-title">{t('ayuGuideTitle')}</h2>
          <span className="badge badge-demo ayu-demo-badge">
            {t('demoModeBadge')}
          </span>
        </div>

        <div className="ayu-action-btns">
          <button
            className={`btn btn-secondary btn-sm ${isPlaying ? 'btn-audio-active' : ''}`}
            onClick={handleToggleSpeech}
            aria-label={isPlaying ? t('stopListenBtn') : t('listenBtn')}
          >
            {isPlaying ? '⏹ ' + t('stopListenBtn') : '🔊 ' + t('listenBtn')}
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={handleCopy}
            aria-label="Copy health summary"
          >
            {copied ? '✓ ' + t('copied') : '📋 ' + t('copyBtn')}
          </button>
        </div>
      </div>

      <h3 className="ayu-topic-title">{title}</h3>
      <p className="ayu-summary">{summary}</p>

      {keyPoints && keyPoints.length > 0 && (
        <div className="ayu-keypoints">
          <strong>{t('keyPoints')}:</strong>
          <ul className="keypoints-list">
            {keyPoints.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="ayu-source">
        <span className="source-label">{t('sourceCitation')}</span>{' '}
        {guide.sourceUrl ? (
          <a
            href={guide.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="source-link"
          >
            {guide.source} ↗
          </a>
        ) : (
          <span>{guide.source}</span>
        )}
      </div>

      <p className="ayu-disclaimer">{guide.disclaimer}</p>
    </section>
  )
}
