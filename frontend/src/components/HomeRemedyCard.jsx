import React, { useState } from 'react'
import axios from 'axios'
import { useLanguage } from '../context/LanguageContext.jsx'

export default function HomeRemedyCard({ upchaar }) {
  const { t, lang, isUpchaarSaved, toggleSaveUpchaar } = useLanguage()
  const [votes, setVotes] = useState(upchaar.reviewCount || 100)
  const [hasVoted, setHasVoted] = useState(false)
  const [isVoting, setIsVoting] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const title = lang === 'hi' ? (upchaar.title_hi || upchaar.title) : upchaar.title
  const practice = lang === 'hi' ? (upchaar.practice_hi || upchaar.practice) : upchaar.practice
  const safetyTip = lang === 'hi' ? (upchaar.safetyTip_hi || upchaar.safetyTip) : upchaar.safetyTip
  const isSaved = isUpchaarSaved(upchaar.id)

  async function handleVote() {
    if (hasVoted || isVoting) return
    setIsVoting(true)
    try {
      const res = await axios.post('/api/gharelu-upchaar/vote', { upchaarId: upchaar.id })
      if (res.data && res.data.newCount) {
        setVotes(res.data.newCount)
      } else {
        setVotes(prev => prev + 1)
      }
      setHasVoted(true)
    } catch {
      setVotes(prev => prev + 1)
      setHasVoted(true)
    } finally {
      setIsVoting(false)
    }
  }

  function handleSpeak() {
    if (!('speechSynthesis' in window)) return

    if (isPlaying) {
      window.speechSynthesis.cancel()
      setIsPlaying(false)
      return
    }

    window.speechSynthesis.cancel()
    const textToSpeak = `${title}. ${practice}. ${safetyTip || ''}`
    const utterance = new SpeechSynthesisUtterance(textToSpeak)
    utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-IN'
    utterance.rate = 0.95

    utterance.onend = () => setIsPlaying(false)
    utterance.onerror = () => setIsPlaying(false)

    window.speechSynthesis.speak(utterance)
    setIsPlaying(true)
  }

  return (
    <article className="card gharelu-card" aria-label={title}>
      <div className="gharelu-card-top">
        <div className="gharelu-badges">
          <span className="badge badge-ayush">{t('ghareluBadge')}</span>
          <span className="badge badge-demo">{t('demoRatingBadge')}</span>
        </div>
        <div className="gharelu-rating" aria-label={`Rating ${upchaar.rating} out of 5 stars`}>
          <span className="star-icon">★</span>
          <strong className="rating-score">{upchaar.rating}</strong>
          <span className="rating-max">/5</span>
          <span className="rating-votes">({votes.toLocaleString()} {t('helpfulVotes')})</span>
        </div>
      </div>

      <div className="gharelu-title-row">
        <h3 className="card-title gharelu-title">{title}</h3>
        <button
          className="bookmark-icon-btn"
          onClick={() => toggleSaveUpchaar(upchaar)}
          title={isSaved ? 'Remove from Care Kit' : 'Save to Care Kit'}
          aria-label={isSaved ? 'Remove from Care Kit' : 'Save to Care Kit'}
        >
          {isSaved ? '🔖' : '🏷️'}
        </button>
      </div>

      <p className="gharelu-practice">{practice}</p>

      {safetyTip && (
        <div className="gharelu-safety-box" role="note">
          <span className="safety-icon">⚠️</span>
          <div className="safety-content">
            <strong>{t('safetyTipLabel')} </strong>
            <span>{safetyTip}</span>
          </div>
        </div>
      )}

      <div className="gharelu-card-footer">
        <button
          className={`btn btn-secondary btn-sm ${isPlaying ? 'btn-audio-active' : ''}`}
          onClick={handleSpeak}
          aria-label={isPlaying ? t('stopListenBtn') : t('listenBtn')}
        >
          {isPlaying ? '⏹' : '🔊'}
        </button>
        <button
          className={`btn ${hasVoted ? 'btn-primary btn-voted' : 'btn-secondary btn-helpful'}`}
          onClick={handleVote}
          disabled={hasVoted || isVoting}
          aria-label={hasVoted ? 'Marked as helpful' : 'Vote this home remedy as helpful'}
        >
          {hasVoted ? '✓ ' + t('helpfulBtn') : '👍 ' + t('helpfulBtn')}
        </button>
      </div>
    </article>
  )
}
