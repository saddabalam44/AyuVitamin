import React, { useState } from 'react'
import { useLanguage } from '../context/LanguageContext.jsx'

export default function SearchBar({ onSearch, initialValue = '', compact = false }) {
  const { t } = useLanguage()
  const [value, setValue] = useState(initialValue)

  // Sync if initialValue changes from parent (e.g., navigating back)
  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = value.trim()
    if (trimmed) onSearch(trimmed)
  }

  return (
    <form
      className={compact ? 'search-form search-form--compact' : 'search-form'}
      onSubmit={handleSubmit}
      role="search"
      aria-label="Health concern search"
    >
      <input
        type="search"
        className="search-input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={t('searchPlaceholder')}
        aria-label={t('searchPlaceholder')}
        autoComplete="off"
      />
      <button type="submit" className="btn btn-primary search-btn">
        {t('searchBtn')}
      </button>
    </form>
  )
}
