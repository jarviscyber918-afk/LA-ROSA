import React from 'react';
import { MapPin, Phone, Clock, Navigation, ExternalLink, ThumbsUp } from 'lucide-react';
import { STORE_CONFIG } from '../config/storeConfig';
import { safeOpenExternal } from '../utils/security';
import { useLanguage } from '../context/LanguageContext';

export const LocationSection: React.FC = () => {
  const { t, language } = useLanguage();

  const handleOpenGoogleMaps = () => {
    safeOpenExternal(STORE_CONFIG.googleMapsDirectUrl);
  };

  const handleOpenWhatsApp = () => {
    const text = language === 'ar'
      ? 'مرحباً Parfumerie La Rosa، أود الاستفسار عن موقع المحل أو تشكيلة العطور المتوفرة اليوم.'
      : 'Hello Parfumerie La Rosa, I would like to inquire about your boutique location and available perfumes today.';
    const url = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
    safeOpenExternal(url);
  };

  const handleOpenFacebook = () => {
    safeOpenExternal(STORE_CONFIG.facebookUrl);
  };

  return (
    <section id="location" className="scroll-mt-28 py-20 bg-[#FAF8F5] border-b border-[#EAE5DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#736B63] block mb-2">
            {t.location.subtitle}
          </span>
          <h2 className={`text-2xl sm:text-3xl lg:text-4xl text-[#1A1A1A] leading-tight mb-4 ${
            language === 'ar' ? 'font-alexandria font-bold' : 'font-serif font-normal'
          }`}>
            {t.location.title} <span className="text-[#C6A88F] font-bold">{t.location.titleHighlight}</span>
          </h2>
          <p className="text-sm sm:text-base text-[#59524C]">
            {t.location.description}
          </p>
        </div>

        {/* Content Layout: Contact & Hours (5 cols) + Sandboxed Map (7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Contact Details (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-white border border-[#EAE5DE] p-5 sm:p-8 shadow-sm">
            <div>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#EAE5DE]">
                <div className="w-10 h-10 border border-[#1A1A1A] flex items-center justify-center text-[#1A1A1A]">
                  <MapPin className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div>
                  <h3 className="font-alexandria text-base font-bold text-[#1A1A1A]">
                    {t.location.exactAddress}
                  </h3>
                  <p className="text-xs text-[#736B63]">{t.location.addressSub}</p>
                </div>
              </div>

              <p className="text-sm text-[#3D3532] leading-relaxed mb-6 font-medium">
                {STORE_CONFIG.address}
              </p>

              {/* Working Hours */}
              <div className="mb-8 bg-[#FAF8F5] p-5 border border-[#EAE5DE] space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#1A1A1A] mb-2 uppercase tracking-wider">
                  <Clock className="w-4 h-4 stroke-[1.5]" />
                  <span>{t.location.hoursTitle}</span>
                </div>
                {STORE_CONFIG.openingHours.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs text-[#59524C]">
                    <span className="font-semibold text-[#1A1A1A]">{item.days}:</span>
                    <span>{item.hours}</span>
                  </div>
                ))}
              </div>

              {/* Contact Information */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-[#736B63]">{t.location.phoneTitle}</span>
                  <a
                    href={STORE_CONFIG.telLink}
                    dir="ltr"
                    className="font-bold text-[#1A1A1A] hover:underline tracking-wider"
                  >
                    {STORE_CONFIG.phone}
                  </a>
                </div>

                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-[#736B63]">{t.location.whatsAppTitle}</span>
                  <button
                    onClick={handleOpenWhatsApp}
                    dir="ltr"
                    type="button"
                    className="font-bold text-[#1B4332] hover:underline tracking-wider cursor-pointer"
                  >
                    +213 560 22 55 76
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-4 border-t border-[#EAE5DE]">
              <button
                onClick={handleOpenGoogleMaps}
                type="button"
                className="w-full flex items-center justify-center gap-2 btn-minimal-black py-3.5 px-4 text-xs font-semibold uppercase tracking-wider rounded-sm cursor-pointer"
              >
                <Navigation className="w-4 h-4" />
                <span>{t.location.mapsButton}</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={STORE_CONFIG.telLink}
                  className="flex items-center justify-center gap-1.5 btn-minimal-outline py-2.5 px-3 text-xs font-semibold uppercase tracking-wider rounded-sm text-center"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{t.location.callButton}</span>
                </a>

                <button
                  onClick={handleOpenFacebook}
                  type="button"
                  className="flex items-center justify-center gap-1.5 btn-minimal-outline py-2.5 px-3 text-xs font-semibold uppercase tracking-wider rounded-sm cursor-pointer"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{t.location.facebookButton}</span>
                </button>
              </div>
            </div>

          </div>

          {/* Hardened Sandboxed Google Maps Iframe (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-[#EAE5DE] p-3 shadow-sm flex flex-col justify-between min-h-[420px]">
            <div className="relative w-full h-full min-h-[380px] overflow-hidden bg-[#FAF8F5] border border-[#EAE5DE]">
              
              <iframe
                title="Google Maps Location of Parfumerie La Rosa Frenda"
                src={STORE_CONFIG.googleMapsEmbedIframe}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '380px' }}
                loading="lazy"
                sandbox="allow-scripts allow-same-origin allow-popups"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />

              <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm border border-[#1A1A1A] px-3.5 py-1.5 shadow-sm text-xs">
                <span className="font-semibold text-[#1A1A1A]">Parfumerie La Rosa • Frenda</span>
              </div>
            </div>

            <div className="flex items-center justify-between px-3 pt-3 text-[11px] text-[#736B63]">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#1B4332]" />
                <span>{t.location.sandboxNotice}</span>
              </span>
              <button
                onClick={handleOpenGoogleMaps}
                type="button"
                className="text-[#1A1A1A] hover:underline flex items-center gap-1 font-medium cursor-pointer"
              >
                <span>{t.location.zoomMap}</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
