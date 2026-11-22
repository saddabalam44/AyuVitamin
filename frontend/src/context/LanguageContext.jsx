import React, { createContext, useContext, useState, useEffect } from 'react'

const translations = {
  en: {
    // Navbar
    brand: 'AyuVitamin',
    navHome: 'Home',
    navAbout: 'About',
    navSaved: 'Care Kit',
    langToggle: 'हिं',
    // Emergency Quick Bar
    emergencyBarTitle: 'Emergency Helplines:',
    emergency112: '🚨 Emergency: 112',
    ambulance108: '🚑 Ambulance: 108',
    mentalHelpline: '🧠 Mental Health: 9152987821 (iCall)',
    // HomePage
    tagline: 'Understand your options. Find your next step.',
    heroDesc: 'India’s multilingual healthcare guidance platform. Search health concerns, explore evidence-based information, high-rated Home Remedies, and locate nearby Allopathy, AYUSH, Physiotherapy, and Mental Health services.',
    searchPlaceholder: 'Search a health concern… e.g. cough, diabetes, back pain, anxiety, acidity',
    searchBtn: 'Search',
    exampleTopics: 'Trending Topics:',
    emergencyBanner: '🚨 Medical emergency? Call 112 or go to your nearest hospital immediately.',
    disclaimer: 'AyuVitamin provides general public health information and supportive care options. It does not replace advice from a qualified healthcare professional.',
    // Stats Bar
    statFacilities: 'Curated Facilities Across Indian Cities',
    statTopics: 'Evidence-Based Health Topics',
    statUpchaar: 'High-Rated Home Remedies',
    statPrivacy: '100% Privacy — Zero Personal Data Retained',
    // Care Navigator
    navigatorTitle: '🧭 Ayu Care Navigator — Where should you seek care?',
    navigatorSubtitle: 'Not sure which discipline you need? Use our interactive 2-step decision helper.',
    navStep1: 'Step 1: What is your primary symptom area?',
    navStep2: 'Step 2: Are there any urgent warning signs?',
    navOptionAcute: '🤒 Sudden Fever, Cough or Infection',
    navOptionChronic: '🩸 Blood Sugar, BP or Metabolic Condition',
    navOptionPain: '🦴 Muscle, Joint or Back Stiffness',
    navOptionStress: '🧠 Stress, Anxiety or Sleep Issues',
    navOptionDigestion: '🍲 Acidity, Gas or Indigestion',
    navRedFlagYes: '⚠️ Yes (Severe chest pain, breathlessness, confusion, or sudden weakness)',
    navRedFlagNo: '✅ No severe warning signs — mild to moderate discomfort',
    navRecommendationTitle: 'Care Recommendation:',
    navResetBtn: 'Start Over',
    navViewMatching: 'View Matching Care Options →',
    // Domains Grid
    exploreDomains: 'Explore Healthcare Disciplines in India',
    domainAllopathyTitle: 'Modern Medicine (Allopathy)',
    domainAllopathyDesc: 'Primary healthcare, diagnostics, prescription medication, and acute disease management.',
    domainAyushTitle: 'AYUSH & Traditional Care',
    domainAyushDesc: 'Ayurveda, Yoga, Naturopathy, Unani, Siddha, and Homeopathy for holistic prevention.',
    domainPhysioTitle: 'Physiotherapy & Rehab',
    domainPhysioDesc: 'Post-injury rehabilitation, musculoskeletal alignment, ergonomics, and mobility therapy.',
    domainMentalTitle: 'Mental Health Support',
    domainMentalDesc: 'Psychotherapy, confidential counselling helplines, stress and anxiety support.',
    domainGhareluTitle: 'Home Remedies',
    domainGhareluDesc: 'Time-tested home comfort remedies with community ratings and safety guidelines.',
    domainProgramsTitle: 'National Health Missions',
    domainProgramsDesc: 'Government health schemes including Anaemia Mukt Bharat, NVBDCP, and public clinics.',
    // ResultsPage
    searchingFor: 'Results for',
    ayuGuideTitle: 'Ayu Guide 🌿',
    demoModeBadge: 'Curated Public Health Reference',
    sourceCitation: 'Source:',
    resourcesTitle: 'Educational Resources & Official Portals',
    facilitiesTitle: 'Nearby Healthcare Services',
    filterAll: 'All',
    filterAllopathy: 'Allopathy',
    filterAyush: 'AYUSH',
    filterPhysio: 'Physiotherapy',
    filterMental: 'Mental Health',
    cityFilterPlaceholder: 'Filter by city, area, or PIN code (e.g. Tolichowki, 500008, Hitec City, 500081)…',
    useLocationBtn: '📍 Live Location',
    locationDetected: 'Detected nearby area: ',
    popularAreas: 'Quick Areas:',
    visitResource: 'Visit Official Resource →',
    demoListing: '',
    demoResource: 'Official Portal',
    noResults: (query) => `No results found for "${query}". Try searching another condition or browse common topics on the home page. In case of health concerns, always consult a qualified healthcare practitioner.`,
    loading: 'Loading trustworthy health information…',
    errorMsg: 'Could not connect to the server. Please ensure the backend is running on port 3001.',
    keyPoints: 'Clinical Key Points',
    timings: 'Operating Hours:',
    services: 'Specialties & Services:',
    emergencyNote: '🚨 In a medical emergency, call 112 or visit the nearest hospital emergency department.',
    noFacilities: 'No facilities match your active filter. Try clicking on one of the quick area chips above.',
    noResources: 'No educational resources found for this specific topic.',
    // Audio & Action Buttons
    listenBtn: 'Listen (Audio)',
    stopListenBtn: 'Stop Audio',
    copyBtn: 'Copy Info',
    copied: 'Copied to clipboard!',
    viewDetails: 'View Details & Contact',
    // Home Remedies
    ghareluTitle: '🌿 High-Rated Home Remedies (Supportive Care)',
    ghareluSubtitle: 'Traditional home comfort practices & wellness remedies. Supportive only — does not replace professional medical care.',
    ghareluBadge: 'Home Remedy',
    safetyTipLabel: 'Safety Caution:',
    helpfulBtn: 'Helpful',
    helpfulVotes: 'helpful votes',
    demoRatingBadge: 'Community Rating',
    // Saved Care Kit Modal
    savedModalTitle: 'My Care Kit (Saved Items)',
    savedModalEmpty: 'You have not saved any remedies or healthcare facilities yet. Click "Save" on any card to save it here for offline reference.',
    savedFacilities: 'Saved Facilities',
    savedUpchaar: 'Saved Home Remedies',
    removeBtn: 'Remove',
    closeBtn: 'Close',
    // AboutPage
    aboutTitle: 'About AyuVitamin',
    aboutMission: 'Our Mission',
    aboutMissionText: 'AyuVitamin helps people across India navigate care options, understand plain-language health information, and discover local healthcare services. We believe every citizen deserves transparent, unbiased health guidance in their own language.',
    aboutWhat: 'What AyuVitamin Is',
    aboutWhatText: 'A free, educational care-navigation tool providing curated health summaries, links to trusted official portals (Vikaspedia, WHO, MoHFW), high-rated supportive Home Remedies, and facility listings across India.',
    aboutWhatNot: 'What AyuVitamin Is Not',
    aboutWhatNotText: 'AyuVitamin is not a medical diagnosis tool, prescription generator, telemedicine service, or replacement for a healthcare practitioner.',
    aboutDisclaimer: 'Medical Disclaimer',
    aboutDisclaimerText: 'All health information provided is for general educational purposes only. Always consult a qualified healthcare professional for medical advice, diagnosis, or treatment.',
    aboutLinks: 'Trusted Public Health Portals',
    // Footer
    footerTagline: 'Understand your options. Find your next step.',
    footerDisclaimer: 'General health information only. Not a substitute for professional medical advice.',
    footerCopyright: '© 2026 AyuVitamin. Built for public health education & care navigation in India.',
  },
  hi: {
    // Navbar
    brand: 'आयुविटामिन',
    navHome: 'होम',
    navAbout: 'हमारे बारे में',
    navSaved: 'केयर किट',
    langToggle: 'EN',
    // Emergency Quick Bar
    emergencyBarTitle: 'आपातकालीन हेल्पलाइन:',
    emergency112: '🚨 आपातकाल: 112',
    ambulance108: '🚑 एम्बुलेंस: 108',
    mentalHelpline: '🧠 मानसिक स्वास्थ्य: 9152987821 (iCall)',
    // HomePage
    tagline: 'अपने विकल्पों को समझें। अगला कदम उठाएं।',
    heroDesc: 'भारत का बहुभाषी स्वास्थ्य मार्गदर्शन मंच। स्वास्थ्य संबंधी समस्याओं की खोज करें, साक्ष्य-आधारित जानकारी, उच्च-रेटेड घरेलू उपचार (Home Remedies) और एलोपैथी, आयुष, फिजियोथेरेपी व मानसिक स्वास्थ्य सेवाएं खोजें।',
    searchPlaceholder: 'स्वास्थ्य समस्या खोजें… जैसे खांसी, जुकाम, मधुमेह, पीठ दर्द, तनाव, एसिडिटी',
    searchBtn: 'खोजें',
    exampleTopics: 'लोकप्रिय विषय:',
    emergencyBanner: '🚨 चिकित्सा आपातकाल? तुरंत 112 पर कॉल करें या नज़दीकी अस्पताल जाएं।',
    disclaimer: 'आयुविटामिन केवल सामान्य सार्वजनिक स्वास्थ्य जानकारी प्रदान करता है। यह किसी योग्य स्वास्थ्य पेशेवर की सलाह का विकल्प नहीं है।',
    // Stats Bar
    statFacilities: 'भारतीय शहरों में सत्यापित स्वास्थ्य केंद्र',
    statTopics: 'साक्ष्य-आधारित स्वास्थ्य विषय',
    statUpchaar: 'उच्च-रेटेड घरेलू उपचार (Home Remedies)',
    statPrivacy: '100% गोपनीयता — कोई व्यक्तिगत डेटा संग्रहीत नहीं',
    // Care Navigator
    navigatorTitle: '🧭 आयु केयर नेविगेटर — आपको कहाँ परामर्श लेना चाहिए?',
    navigatorSubtitle: 'उलझन में हैं कि कौन सी स्वास्थ्य सेवा चुनें? हमारे 2-चरणीय निर्णय सहायक का उपयोग करें।',
    navStep1: 'चरण 1: आपकी मुख्य समस्या क्या है?',
    navStep2: 'चरण 2: क्या कोई गंभीर या आपातकालीन लक्षण हैं?',
    navOptionAcute: '🤒 अचानक बुखार, खांसी या संक्रमण',
    navOptionChronic: '🩸 ब्लड शुगर, बीपी या मेटाबॉलिक स्थिति',
    navOptionPain: '🦴 मांसपेशियों, जोड़ों या पीठ में अकड़न',
    navOptionStress: '🧠 तनाव, घबराहट या नींद की समस्या',
    navOptionDigestion: '🍲 एसिडिटी, गैस या अपच',
    navRedFlagYes: '⚠️ हाँ (सीने में तेज दर्द, सांस लेने में तकलीफ, या अत्यधिक कमजोरी)',
    navRedFlagNo: '✅ कोई गंभीर आपातकालीन लक्षण नहीं — हल्का या मध्यम कष्ट',
    navRecommendationTitle: 'देखभाल की सिफारिश:',
    navResetBtn: 'पुनः आरंभ करें',
    navViewMatching: 'संबंधित विकल्प देखें →',
    // Domains Grid
    exploreDomains: 'भारत में स्वास्थ्य सेवा प्रणालियों को जानें',
    domainAllopathyTitle: 'आधुनिक चिकित्सा (एलोपैथी)',
    domainAllopathyDesc: 'प्राथमिक स्वास्थ्य सेवा, नैदानिक परीक्षण, दवाएं और तीव्र बीमारियों का प्रबंधन।',
    domainAyushTitle: 'आयुष एवं पारंपरिक चिकित्सा',
    domainAyushDesc: 'समग्र स्वास्थ्य और रोकथाम के लिए आयुर्वेद, योग, प्राकृतिक चिकित्सा, यूनानी व होम्योपैथी।',
    domainPhysioTitle: 'फिजियोथेरेपी एवं पुनर्वास',
    domainPhysioDesc: 'चोट के बाद पुनर्वास, जोड़ों का लचीलापन और गतिशीलता में सुधार।',
    domainMentalTitle: 'मानसिक स्वास्थ्य सहायता',
    domainMentalDesc: 'परामर्श, तनाव प्रबंधन, मनोवैज्ञानिक सहायता और नि:शुल्क हेल्पलाइन।',
    domainGhareluTitle: 'घरेलू उपचार (Home Remedies)',
    domainGhareluDesc: 'समुदाय रेटिंग और सुरक्षा सावधानियों के साथ समय-परीक्षित घरेलू आराम के उपाय।',
    domainProgramsTitle: 'राष्ट्रीय स्वास्थ्य कार्यक्रम',
    domainProgramsDesc: 'एनीमिया मुक्त भारत, वेक्टर जनित रोग नियंत्रण व अन्य सरकारी योजनाएं।',
    // ResultsPage
    searchingFor: 'परिणाम:',
    ayuGuideTitle: 'आयु गाइड 🌿',
    demoModeBadge: 'प्रमाणित सार्वजनिक स्वास्थ्य संदर्भ',
    sourceCitation: 'स्रोत:',
    resourcesTitle: 'शैक्षिक संसाधन एवं आधिकारिक पोर्टल',
    facilitiesTitle: 'नज़दीकी स्वास्थ्य सेवाएं',
    filterAll: 'सभी',
    filterAllopathy: 'एलोपैथी',
    filterAyush: 'आयुष',
    filterPhysio: 'फिजियोथेरेपी',
    filterMental: 'मानसिक स्वास्थ्य',
    cityFilterPlaceholder: 'शहर, क्षेत्र या पिन कोड से फ़िल्टर करें (जैसे Tolichowki, 500008, Hitec City, 500081)…',
    useLocationBtn: '📍 लाइव लोकेशन',
    locationDetected: 'आस-पास का क्षेत्र: ',
    popularAreas: 'प्रमुख क्षेत्र:',
    visitResource: 'आधिकारिक संसाधन देखें →',
    demoListing: '',
    demoResource: 'आधिकारिक पोर्टल',
    noResults: (query) => `"${query}" के लिए कोई परिणाम नहीं मिला। अन्य शब्द खोजें या होम पेज पर लोकप्रिय विषय देखें। स्वास्थ्य संबंधी चिंता के लिए हमेशा योग्य डॉक्टर से परामर्श लें।`,
    loading: 'विश्वसनीय स्वास्थ्य जानकारी लोड हो रही है…',
    errorMsg: 'सर्वर से कनेक्ट नहीं हो सका। कृपया सुनिश्चित करें कि बैकएंड पोर्ट 3001 पर चल रहा है।',
    keyPoints: 'मुख्य चिकित्सीय बिंदु',
    timings: 'खुलने का समय:',
    services: 'विशेषज्ञताएं एवं सेवाएं:',
    emergencyNote: '🚨 चिकित्सा आपातकाल में तुरंत 112 पर कॉल करें या नज़दीकी अस्पताल जाएं।',
    noFacilities: 'आपके फ़िल्टर के लिए कोई सुविधा नहीं मिली। ऊपर दिए गए किसी क्षेत्र पर क्लिक करें।',
    noResources: 'इस विषय के लिए कोई विशिष्ट शैक्षिक संसाधन नहीं मिला।',
    // Audio & Action Buttons
    listenBtn: 'सुनें (ऑडियो)',
    stopListenBtn: 'रोकें',
    copyBtn: 'कॉपी करें',
    copied: 'कॉपी हो गया!',
    viewDetails: 'विवरण व संपर्क देखें',
    // Home Remedies
    ghareluTitle: '🌿 उच्च-रेटेड घरेलू उपचार (Home Remedies)',
    ghareluSubtitle: 'समय-परीक्षित पारंपरिक आरामदायक उपाय। केवल सहायक देखभाल के लिए — चिकित्सीय उपचार का विकल्प नहीं।',
    ghareluBadge: 'घरेलू उपचार',
    safetyTipLabel: 'सुरक्षा सावधानी:',
    helpfulBtn: 'मददगार',
    helpfulVotes: 'लोगों ने उपयोगी पाया',
    demoRatingBadge: 'समुदाय रेटिंग',
    // Saved Care Kit Modal
    savedModalTitle: 'मेरी केयर किट (सेव की गई जानकारी)',
    savedModalEmpty: 'आपने अभी तक कोई उपाय या स्वास्थ्य केंद्र सेव नहीं किया है। कार्ड पर "सेव करें" दबाकर यहाँ जोड़ें।',
    savedFacilities: 'सेव किए गए स्वास्थ्य केंद्र',
    savedUpchaar: 'सेव किए गए घरेलू उपचार',
    removeBtn: 'हटाएं',
    closeBtn: 'बंद करें',
    // AboutPage
    aboutTitle: 'आयुविटामिन के बारे में',
    aboutMission: 'हमारा मिशन',
    aboutMissionText: 'आयुविटामिन भारत भर के लोगों को स्वास्थ्य विकल्पों को समझने, सरल भाषा में जानकारी पाने और नज़दीकी स्वास्थ्य सेवाएं खोजने में सक्षम बनाता है।',
    aboutWhat: 'आयुविटामिन क्या है',
    aboutWhatText: 'एक मुफ़्त, निष्पक्ष देखभाल-नेविगेशन उपकरण जो चयनित स्वास्थ्य सारांश, आधिकारिक पोर्टल (विकासपीडिया, WHO, MoHFW), उच्च-रेटेड घरेलू उपचार और स्वास्थ्य केंद्र लिस्टिंग प्रदान करता है।',
    aboutWhatNot: 'आयुविटामिन क्या नहीं है',
    aboutWhatNotText: 'आयुविटामिन चिकित्सा निदान उपकरण, टेलीमेडिसिन सेवा, दवा पर्चा जनरेटर या डॉक्टर का विकल्प नहीं है।',
    aboutDisclaimer: 'चिकित्सीय अस्वीकरण',
    aboutDisclaimerText: 'प्रदान की गई सभी स्वास्थ्य जानकारी केवल सामान्य शैक्षिक उद्देश्यों के लिए है। हमेशा योग्य डॉक्टर से परामर्श लें।',
    aboutLinks: 'विश्वसनीय स्वास्थ्य पोर्टल',
    // Footer
    footerTagline: 'अपने विकल्पों को समझें। अगला कदम उठाएं।',
    footerDisclaimer: 'केवल सामान्य स्वास्थ्य जानकारी। पेशेवर चिकित्सा सलाह का विकल्प नहीं।',
    footerCopyright: '© 2026 आयुविटामिन। भारत में सार्वजनिक स्वास्थ्य शिक्षा एवं मार्गदर्शन हेतु निर्मित।',
  }
}

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en')
  const [savedItems, setSavedItems] = useState(() => {
    try {
      const saved = localStorage.getItem('ayuvitamin_saved')
      return saved ? JSON.parse(saved) : { facilities: [], upchaar: [] }
    } catch {
      return { facilities: [], upchaar: [] }
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('ayuvitamin_saved', JSON.stringify(savedItems))
    } catch (e) {
      console.warn('Could not save to localStorage:', e)
    }
  }, [savedItems])

  function toggleSaveFacility(facility) {
    setSavedItems(prev => {
      const exists = prev.facilities.some(f => f.id === facility.id)
      if (exists) {
        return { ...prev, facilities: prev.facilities.filter(f => f.id !== facility.id) }
      }
      return { ...prev, facilities: [...prev.facilities, facility] }
    })
  }

  function toggleSaveUpchaar(upchaar) {
    setSavedItems(prev => {
      const exists = prev.upchaar.some(u => u.id === upchaar.id)
      if (exists) {
        return { ...prev, upchaar: prev.upchaar.filter(u => u.id !== upchaar.id) }
      }
      return { ...prev, upchaar: [...prev.upchaar, upchaar] }
    })
  }

  function isFacilitySaved(id) {
    return savedItems.facilities.some(f => f.id === id)
  }

  function isUpchaarSaved(id) {
    return savedItems.upchaar.some(u => u.id === id)
  }

  function t(key, ...args) {
    const val = translations[lang]?.[key] ?? translations['en']?.[key] ?? key
    if (typeof val === 'function') return val(...args)
    return val
  }

  return (
    <LanguageContext.Provider value={{
      lang,
      setLang,
      t,
      savedItems,
      toggleSaveFacility,
      toggleSaveUpchaar,
      isFacilitySaved,
      isUpchaarSaved
    }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
