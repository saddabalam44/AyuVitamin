import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext.jsx'

export default function CareNavigator() {
  const { t, lang } = useLanguage()
  const navigate = useNavigate()

  const [step, setStep] = useState(1)
  const [symptomType, setSymptomType] = useState(null)
  const [hasRedFlags, setHasRedFlags] = useState(null)

  function handleReset() {
    setStep(1)
    setSymptomType(null)
    setHasRedFlags(null)
  }

  function handleSymptomSelect(type) {
    setSymptomType(type)
    setStep(2)
  }

  function handleRedFlagSelect(flag) {
    setHasRedFlags(flag)
    setStep(3)
  }

  function getRecommendation() {
    if (hasRedFlags) {
      return {
        isEmergency: true,
        title: lang === 'hi' ? '🚨 तत्काल आपातकालीन देखभाल आवश्यक' : '🚨 Immediate Emergency Evaluation Recommended',
        description: lang === 'hi'
          ? 'आपके द्वारा बताए गए लक्षणों में आपातकालीन चेतावनी संकेत हो सकते हैं। किसी भी वैकल्पिक या घरेलू उपाय में समय न गंवाएं। तुरंत नज़दीकी अस्पताल या 112 पर संपर्क करें।'
          : 'The warning signs you described require urgent clinical evaluation. Do not delay emergency medical care with home remedies. Call 112 or visit the nearest hospital emergency room immediately.',
        primary: 'Modern Medicine (Emergency)',
        query: 'emergency',
        type: 'Allopathy'
      }
    }

    switch (symptomType) {
      case 'acute':
        return {
          isEmergency: false,
          title: lang === 'hi' ? '🩺 एलोपैथी प्राथमिक परामर्श + सहायक घरेलू उपाय' : '🩺 Modern Medicine Primary Evaluation + AYUSH Comfort',
          description: lang === 'hi'
            ? 'अचानक आए बुखार या संक्रमण के लिए पहले किसी एलोपैथिक चिकित्सक से निदान कराएं। साथ ही गले को आराम देने के लिए आयुष काढ़ा या घरेलू उपाय अपना सकते हैं।'
            : 'For sudden fevers, acute infections, or persistent cough, an Allopathy (MBBS/MD) doctor is recommended for clinical diagnosis. Meanwhile, supportive AYUSH kadha and steam offer symptomatic comfort.',
          primary: 'Allopathy',
          query: 'common cold',
          type: 'Allopathy'
        }
      case 'chronic':
        return {
          isEmergency: false,
          title: lang === 'hi' ? '🩸 एकीकृत देखभाल: एलोपैथिक निगरानी + आयुष जीवनशैली' : '🩸 Integrated Care: Allopathy Management + AYUSH Lifestyle',
          description: lang === 'hi'
            ? 'डायबिटीज या बीपी के लिए एलोपैथिक दवाओं को कभी न छोड़ें। जीवनशैली सुधारने व समग्र स्वास्थ्य के लिए प्रमाणित योग व आहार परामर्श सहायक हो सकते हैं।'
            : 'Never discontinue prescribed cardiovascular or diabetes medications. Modern Medicine provides essential monitoring, while AYUSH dietary and yoga habits offer long-term lifestyle support.',
          primary: 'Allopathy & AYUSH',
          query: 'diabetes',
          type: 'Allopathy'
        }
      case 'pain':
        return {
          isEmergency: false,
          title: lang === 'hi' ? '🦴 फिजियोथेरेपी पुनर्वास + पारंपरिक सिकाई' : '🦴 Physiotherapy Rehabilitation + Warm Comfort Care',
          description: lang === 'hi'
            ? 'पीठ या जोड़ों के दर्द के लिए फिजियोथेरेपिस्ट से पोस्चर व व्यायाम सीखें। मांसपेशियों की अकड़न दूर करने के लिए सरसों तेल मालिश या गर्म सिकाई करें।'
            : 'For musculoskeletal stiffness, joint aches, or postural back pain, a certified Physiotherapist helps restore biomechanics, complemented by warm compresses and traditional oil rubs.',
          primary: 'Physiotherapy',
          query: 'back pain',
          type: 'Physiotherapy'
        }
      case 'stress':
        return {
          isEmergency: false,
          title: lang === 'hi' ? '🧠 मानसिक स्वास्थ्य परामर्श + प्राणायाम/ध्यान' : '🧠 Mental Health Counselling + Yogic Mindfulness',
          description: lang === 'hi'
            ? 'तनाव या चिंता के लिए iCall या NIMHANS की हेल्पलाइन पर बात करें। साथ ही मन की शांति के लिए अनुलोम-विलोम प्राणायाम का अभ्यास करें।'
            : 'For anxiety, persistent stress, or sleeplessness, confidential counselling (such as iCall helpline: 9152987821) provides crucial psychological support, enhanced by daily pranayama.',
          primary: 'Mental Health',
          query: 'anxiety',
          type: 'Mental Health'
        }
      case 'digestion':
        return {
          isEmergency: false,
          title: lang === 'hi' ? '🍲 आहार सुधार + पारंपरिक पाचक काढ़ा' : '🍲 Digestive Habit Correction + Herbal Comfort',
          description: lang === 'hi'
            ? 'हल्की गैस व एसिडिटी के लिए भुना जीरा पानी व छाछ पिएं। यदि दर्द लगातार बना रहे तो डॉक्टर से जांच कराएं।'
            : 'Mild bloating and acidity often respond well to roasted cumin-ajwain warm water and fresh buttermilk. Consult an allopathic physician if severe pain or vomiting occurs.',
          primary: 'AYUSH & Allopathy',
          query: 'acidity',
          type: 'AYUSH'
        }
      default:
        return {
          isEmergency: false,
          title: 'Consult Qualified Healthcare Professional',
          description: 'Explore verified facilities across India.',
          query: 'health',
          type: 'All'
        }
    }
  }

  const rec = step === 3 ? getRecommendation() : null

  return (
    <section className="navigator-card card" aria-label={t('navigatorTitle')}>
      <div className="navigator-header">
        <h2 className="navigator-title">{t('navigatorTitle')}</h2>
        <p className="navigator-subtitle">{t('navigatorSubtitle')}</p>
      </div>

      {step === 1 && (
        <div className="navigator-step animate-fade-in">
          <p className="step-prompt"><strong>{t('navStep1')}</strong></p>
          <div className="options-grid">
            <button className="option-btn" onClick={() => handleSymptomSelect('acute')}>
              {t('navOptionAcute')}
            </button>
            <button className="option-btn" onClick={() => handleSymptomSelect('chronic')}>
              {t('navOptionChronic')}
            </button>
            <button className="option-btn" onClick={() => handleSymptomSelect('pain')}>
              {t('navOptionPain')}
            </button>
            <button className="option-btn" onClick={() => handleSymptomSelect('stress')}>
              {t('navOptionStress')}
            </button>
            <button className="option-btn" onClick={() => handleSymptomSelect('digestion')}>
              {t('navOptionDigestion')}
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="navigator-step animate-fade-in">
          <p className="step-prompt"><strong>{t('navStep2')}</strong></p>
          <div className="options-grid">
            <button className="option-btn option-btn--warning" onClick={() => handleRedFlagSelect(true)}>
              {t('navRedFlagYes')}
            </button>
            <button className="option-btn option-btn--safe" onClick={() => handleRedFlagSelect(false)}>
              {t('navRedFlagNo')}
            </button>
          </div>
          <button className="btn btn-secondary back-step-btn" onClick={() => setStep(1)}>
            ← {lang === 'hi' ? 'पीछे जाएं' : 'Back'}
          </button>
        </div>
      )}

      {step === 3 && rec && (
        <div className={`recommendation-box ${rec.isEmergency ? 'recommendation-box--emergency' : ''} animate-fade-in`}>
          <div className="rec-header">
            <h3 className="rec-title">{rec.title}</h3>
            {rec.isEmergency && <span className="badge badge-emergency">EMERGENCY 112</span>}
          </div>
          <p className="rec-desc">{rec.description}</p>
          <div className="rec-actions">
            <button
              className="btn btn-primary rec-cta-btn"
              onClick={() => navigate(`/results?q=${encodeURIComponent(rec.query)}&lang=${lang}`)}
            >
              {t('navViewMatching')}
            </button>
            <button className="btn btn-secondary" onClick={handleReset}>
              {t('navResetBtn')}
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
