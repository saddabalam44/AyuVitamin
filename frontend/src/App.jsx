import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import HomePage from './pages/HomePage.jsx'
import ResultsPage from './pages/ResultsPage.jsx'
import AboutPage from './pages/AboutPage.jsx'

export default function App() {
  return (
    <LanguageProvider>
      <div className="app-wrapper">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  )
}
