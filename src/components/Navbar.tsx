import React, { useState } from 'react';
import { Sparkles, Menu, X, Search, Globe } from 'lucide-react';
import { STORE_CONFIG } from '../config/storeConfig';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  onOpenCustomModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCustomModal,
}) => {
  const { t, language, toggleLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const handleNavClick = (targetId: string) => {
    setMobileMenuOpen(false);
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EAE5DE] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 sm:py-4 relative flex items-center justify-between">
        
        {/* Left Slot: Mobile Hamburger on Mobile / Desktop Navigation Links on Desktop */}
        <div className="flex items-center w-20 lg:w-auto lg:flex-1">
          {/* Mobile Hamburger Button (Clean, Borderless, Minimalist) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            aria-label={mobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={mobileMenuOpen}
            className="lg:hidden w-10 h-10 -ms-2 flex items-center justify-center text-[#1A1A1A] hover:opacity-60 transition-opacity border-0 outline-none focus:outline-none focus:ring-0 bg-transparent cursor-pointer active:scale-95"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 stroke-[1.75]" /> : <Menu className="w-5 h-5 stroke-[1.75]" />}
          </button>

          {/* Navigation Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-7 text-xs font-semibold tracking-wider text-[#4A4A4A]">
            <button
              onClick={() => handleNavClick('experience')}
              type="button"
              className="hover:text-black transition-colors cursor-pointer py-1 relative group"
            >
              <span>{t.nav.about}</span>
              <span className="absolute bottom-0 right-0 left-0 h-[1.5px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform origin-right" />
            </button>
            
            <button
              onClick={() => handleNavClick('catalog')}
              type="button"
              className="hover:text-black transition-colors cursor-pointer py-1 relative group"
            >
              <span>{t.nav.catalog}</span>
              <span className="absolute bottom-0 right-0 left-0 h-[1.5px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform origin-right" />
            </button>

            <button
              onClick={() => handleNavClick('custom-perfume')}
              type="button"
              className="hover:text-black transition-colors cursor-pointer py-1 relative group"
            >
              <span>{t.nav.bespoke}</span>
              <span className="absolute bottom-0 right-0 left-0 h-[1.5px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform origin-right" />
            </button>

            <button
              onClick={() => handleNavClick('reviews')}
              type="button"
              className="hover:text-black transition-colors cursor-pointer py-1 relative group"
            >
              <span>{t.nav.reviews}</span>
              <span className="absolute bottom-0 right-0 left-0 h-[1.5px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform origin-right" />
            </button>

            <button
              onClick={() => handleNavClick('location')}
              type="button"
              className="hover:text-black transition-colors cursor-pointer py-1 relative group"
            >
              <span>{t.nav.boutique}</span>
              <span className="absolute bottom-0 right-0 left-0 h-[1.5px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform origin-right" />
            </button>
          </div>
        </div>

        {/* Center Slot: Minimalist Cartouche Insignia Logo (Sole Framed Element, 100% Mathematically Centered) */}
        <div className="flex-1 shrink-0 flex justify-center">
          <button
            onClick={scrollToTop}
            type="button"
            className="flex flex-col items-center group cursor-pointer focus:outline-none"
          >
            <div className="border border-[#1A1A1A] px-4 sm:px-6 py-1.5 sm:py-2 transition-transform group-hover:scale-[1.02] bg-[#FAF8F5]">
              <span className="font-serif tracking-[0.25em] text-xs sm:text-sm font-semibold text-[#1A1A1A] uppercase block">
                PARFUMERIE
              </span>
              <span className="font-serif text-sm sm:text-lg font-bold tracking-[0.3em] text-[#1A1A1A] uppercase block -mt-0.5">
                LA ROSA
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-1 sm:mt-1.5">
              <span className="text-[10px] sm:text-[11px] font-bold text-[#1A1A1A] tracking-wider">
                {language === 'ar' ? STORE_CONFIG.nameAr : 'HAUTE PARFUMERIE'}
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-[0.2em] font-medium text-[#736B63] uppercase">
                • FRENDA
              </span>
            </div>
          </button>
        </div>

        {/* Right Slot: Actions (Language Switcher on Mobile / Full CTAs on Desktop) */}
        <div className="flex items-center justify-end gap-2.5 w-20 lg:w-auto lg:flex-1">
          {/* Language Switcher in Navbar (Clean, Borderless, Minimalist on Mobile) */}
          <button
            onClick={toggleLanguage}
            type="button"
            aria-label="Toggle Language"
            className="inline-flex items-center gap-1 py-1 px-1 sm:px-2.5 text-xs font-bold uppercase tracking-wider text-[#1A1A1A] hover:opacity-60 transition-opacity border-0 outline-none focus:outline-none focus:ring-0 bg-transparent cursor-pointer shrink-0 active:scale-95"
          >
            <Globe className="w-3.5 h-3.5 text-[#736B63]" />
            <span>{language === 'ar' ? 'EN' : 'عربي'}</span>
          </button>

          {/* Quick Search Jump to Catalog (Desktop only) */}
          <button
            onClick={() => handleNavClick('catalog')}
            type="button"
            aria-label={t.nav.searchLabel}
            className="p-2 text-[#4A4A4A] hover:text-black transition-colors cursor-pointer hidden sm:block"
          >
            <Search className="w-4 h-4 stroke-[1.75]" />
          </button>

          {/* Primary Minimalist CTA Button (Desktop only) */}
          <button
            onClick={onOpenCustomModal}
            type="button"
            className="hidden sm:inline-flex items-center gap-1.5 btn-minimal-black text-xs font-semibold tracking-wider uppercase px-4 py-2.5 rounded-sm cursor-pointer shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C6A88F]" />
            <span>{t.nav.customOrder}</span>
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF8F5] border-b border-[#EAE5DE] px-6 py-6 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-4 text-sm font-semibold text-[#1A1A1A]">
            
            {/* Mobile Language Switcher */}
            <div className="flex items-center justify-between pb-3 border-b border-[#EAE5DE]">
              <span className="text-xs text-[#736B63] uppercase tracking-wider">
                Language / اللغة
              </span>
              <button
                onClick={toggleLanguage}
                type="button"
                className="inline-flex items-center gap-2 border border-[#1A1A1A] px-3 py-1 rounded-sm text-xs font-bold uppercase"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'English (EN)' : 'العربية (AR)'}</span>
              </button>
            </div>

            <button
              onClick={() => handleNavClick('experience')}
              type="button"
              className="text-start py-2 border-b border-[#EAE5DE] hover:text-[#C6A88F] transition-colors"
            >
              {t.nav.about}
            </button>
            <button
              onClick={() => handleNavClick('catalog')}
              type="button"
              className="text-start py-2 border-b border-[#EAE5DE] hover:text-[#C6A88F] transition-colors"
            >
              {t.nav.catalog}
            </button>
            <button
              onClick={() => handleNavClick('custom-perfume')}
              type="button"
              className="text-start py-2 border-b border-[#EAE5DE] hover:text-[#C6A88F] transition-colors"
            >
              {t.nav.bespoke}
            </button>
            <button
              onClick={() => handleNavClick('reviews')}
              type="button"
              className="text-start py-2 border-b border-[#EAE5DE] hover:text-[#C6A88F] transition-colors"
            >
              {t.nav.reviews}
            </button>
            <button
              onClick={() => handleNavClick('location')}
              type="button"
              className="text-start py-2 border-b border-[#EAE5DE] hover:text-[#C6A88F] transition-colors"
            >
              {t.nav.boutique}
            </button>

            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCustomModal();
                }}
                type="button"
                className="w-full flex items-center justify-center gap-2 btn-minimal-black py-3 rounded-sm text-xs uppercase tracking-wider font-semibold"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C6A88F]" />
                <span>{t.nav.customOrder}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
