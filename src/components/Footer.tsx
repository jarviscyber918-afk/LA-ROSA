import React from 'react';
import { Phone, MessageCircle, MapPin, ThumbsUp, Sparkles } from 'lucide-react';
import { STORE_CONFIG } from '../config/storeConfig';
import { safeOpenExternal } from '../utils/security';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t, language } = useLanguage();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenWhatsApp = () => {
    const text = language === 'ar'
      ? 'مرحباً Parfumerie La Rosa، أود التواصل معكم بخصوص عطوركم الفاخرة.'
      : 'Hello Parfumerie La Rosa, I would like to get in touch regarding your luxury perfumes.';
    const url = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
    safeOpenExternal(url);
  };

  const handleOpenFacebook = () => {
    safeOpenExternal(STORE_CONFIG.facebookUrl);
  };

  const handleOpenGoogleMaps = () => {
    safeOpenExternal(STORE_CONFIG.googleMapsDirectUrl);
  };

  return (
    <footer className="bg-[#F4F0EA] border-t border-[#EAE5DE] pt-16 pb-16 text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
          
          {/* Brand & Cartouche Insignia */}
          <div className="space-y-4">
            <div className="inline-block border border-[#1A1A1A] px-4 py-1.5 bg-[#FAF8F5]">
              <span className="font-serif tracking-[0.25em] text-xs font-semibold text-[#1A1A1A] uppercase block">
                PARFUMERIE LA ROSA
              </span>
              <span className="text-[10px] tracking-[0.2em] font-medium text-[#736B63] uppercase block mt-0.5">
                FRENDA • HAUTE PARFUMERIE
              </span>
            </div>

            <p className="text-xs text-[#59524C] leading-relaxed">
              {t.footer.tagline}
            </p>

            <div className="pt-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#1A1A1A] border border-[#1A1A1A] px-3 py-1">
                Extrait de Parfum 100%
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1A1A1A] mb-4 pb-2 border-b border-[#EAE5DE]">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#59524C] font-medium">
              <li>
                <button
                  onClick={() => scrollToSection('experience')}
                  type="button"
                  className="hover:text-[#1A1A1A] transition-colors cursor-pointer"
                >
                  {t.nav.about}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('catalog')}
                  type="button"
                  className="hover:text-[#1A1A1A] transition-colors cursor-pointer"
                >
                  {t.nav.catalog}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('custom-perfume')}
                  type="button"
                  className="hover:text-[#1A1A1A] transition-colors cursor-pointer"
                >
                  {t.nav.bespoke}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('reviews')}
                  type="button"
                  className="hover:text-[#1A1A1A] transition-colors cursor-pointer"
                >
                  {t.nav.reviews}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('location')}
                  type="button"
                  className="hover:text-[#1A1A1A] transition-colors cursor-pointer"
                >
                  {t.nav.boutique}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1A1A1A] mb-4 pb-2 border-b border-[#EAE5DE]">
              {t.footer.contactTitle}
            </h4>
            <ul className="space-y-3 text-xs text-[#59524C]">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#1A1A1A] shrink-0 mt-0.5" />
                <span>{STORE_CONFIG.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#1A1A1A] shrink-0" />
                <a
                  href={STORE_CONFIG.telLink}
                  dir="ltr"
                  className="hover:text-[#1A1A1A] font-bold tracking-wider text-[#1A1A1A]"
                >
                  {STORE_CONFIG.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#1B4332] shrink-0" />
                <button
                  onClick={handleOpenWhatsApp}
                  dir="ltr"
                  type="button"
                  className="hover:text-[#1A1A1A] font-bold tracking-wider cursor-pointer text-[#1B4332]"
                >
                  +213 560 22 55 76
                </button>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1A1A1A] mb-4 pb-2 border-b border-[#EAE5DE]">
              {t.footer.communityTitle}
            </h4>
            <div className="space-y-2">
              <button
                onClick={handleOpenFacebook}
                type="button"
                className="w-full flex items-center justify-between p-3 bg-white border border-[#EAE5DE] hover:border-[#1A1A1A] text-xs text-[#1A1A1A] transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <ThumbsUp className="w-4 h-4" />
                  <span>{t.footer.facebookFollow}</span>
                </span>
                <span className="text-xs">←</span>
              </button>

              <button
                onClick={handleOpenGoogleMaps}
                type="button"
                className="w-full flex items-center justify-between p-3 bg-white border border-[#EAE5DE] hover:border-[#1A1A1A] text-xs text-[#1A1A1A] transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{t.footer.googleMapsReview}</span>
                </span>
                <span className="text-xs">←</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#EAE5DE] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#736B63]">
          <p>
            {t.footer.copyright.replace('{year}', new Date().getFullYear().toString())}
          </p>

          <div className="flex items-center gap-2 text-xs text-[#736B63]">
            <Sparkles className="w-3.5 h-3.5 text-[#C6A88F]" />
            <span>{t.footer.securityBadge}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
