import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (typeof TRANSLATIONS)['ar'];
  dir: 'rtl' | 'ltr';
  isTransitioning: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('la_rosa_lang_v1');
      if (saved === 'en' || saved === 'ar') {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'ar';
  });

  const [isTransitioning, setIsTransitioning] = useState(false);

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  const setLanguage = (newLang: Language) => {
    if (newLang === language) return;

    // Trigger silky-smooth fade transition
    setIsTransitioning(true);

    setTimeout(() => {
      setLanguageState(newLang);
      try {
        localStorage.setItem('la_rosa_lang_v1', newLang);
      } catch {
        // ignore
      }

      // Update root DOM attributes
      document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = newLang;

      // Small delay so layout recalculation finishes before fading back in
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 200);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
  }, [dir, language]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    toggleLanguage,
    t: TRANSLATIONS[language] as (typeof TRANSLATIONS)['ar'],
    dir,
    isTransitioning,
  };

  return (
    <LanguageContext.Provider value={value}>
      <div
        className={`transition-opacity duration-300 ease-in-out ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
