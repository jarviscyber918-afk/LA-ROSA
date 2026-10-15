import React from 'react';
import { Phone, ArrowLeft, Globe } from 'lucide-react';
import { STORE_CONFIG } from '../config/storeConfig';
import { useLanguage } from '../context/LanguageContext';

export const AnnouncementBar: React.FC = () => {
  const { t, language, toggleLanguage } = useLanguage();

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside
      aria-label="Announcement Bar"
      className="relative z-50 bg-[#C6A88F] text-[#1A1A1A] py-2 px-4 text-xs font-medium border-b border-[#B8987E] tracking-normal"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5">
        
        {/* Announcement Message */}
        <div className="flex items-center gap-2 text-center sm:text-start">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A] opacity-60 inline-block shrink-0" />
          <p className="text-[#1A1A1A] font-semibold text-[11px] sm:text-[13px] leading-tight">
            {t.announcement}
          </p>
        </div>

        {/* Action Controls: Phone, Discover button & Language Switcher */}
        <div className="flex items-center justify-center sm:justify-end gap-2.5 sm:gap-4 shrink-0">
          <a
            href={STORE_CONFIG.telLink}
            className="hidden md:inline-flex items-center gap-1.5 text-[#2C221E] hover:text-black transition-colors"
            title="Direct Phone Call"
          >
            <Phone className="w-3.5 h-3.5" />
            <span dir="ltr" className="font-semibold tracking-wider text-xs">
              {STORE_CONFIG.phone}
            </span>
          </a>

          <button
            onClick={scrollToCatalog}
            type="button"
            className="inline-flex items-center gap-1 bg-[#1A1A1A] hover:bg-black text-white font-medium px-3 py-1 rounded-sm text-[11px] sm:text-xs transition-colors cursor-pointer"
          >
            <span>{t.discoverFragrances}</span>
            <ArrowLeft className={`w-3 h-3 ${language === 'en' ? 'rotate-180' : ''}`} />
          </button>

          {/* Smooth Language Switcher */}
          <button
            onClick={toggleLanguage}
            type="button"
            aria-label="Switch Language / تغيير اللغة"
            className="inline-flex items-center gap-1.5 bg-[#FAF8F5]/90 hover:bg-[#FAF8F5] text-[#1A1A1A] border border-[#1A1A1A]/30 px-2.5 py-1 rounded-sm text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer shadow-2xs"
          >
            <Globe className="w-3 h-3 text-[#1A1A1A]" />
            <span>{language === 'ar' ? 'English' : 'العربية'}</span>
          </button>
        </div>

      </div>
    </aside>
  );
};
