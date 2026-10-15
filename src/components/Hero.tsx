import React from 'react';
import { ArrowLeft, ArrowUpLeft, Star, Award, Sparkles } from 'lucide-react';
import { STORE_CONFIG } from '../config/storeConfig';
import { safeOpenExternal } from '../utils/security';
import { Product } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onOpenCustomModal: () => void;
  heroProduct: Product;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenCustomModal,
  heroProduct,
}) => {
  const { t, language } = useLanguage();

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHeroInquiry = () => {
    const text = language === 'ar'
      ? `مرحباً Parfumerie La Rosa (فرندة)، أود الاستفسار عن توفر هذا العطر المعروض في الواجهة لتجربته بالمحل:\n- العطر: ${heroProduct.nameAr} (${heroProduct.nameFr})\n- الحجم: 50 مل\n- التركيز: ${heroProduct.concentration}\nيرجى إعلامي بتوفره ومواعيد استقبال الزبائن بفرندة. شكراً!`
      : `Hello Parfumerie La Rosa (Frenda), I would like to inquire about this boutique showcase fragrance to sample at your boutique:\n- Fragrance: ${heroProduct.nameFr} (${heroProduct.nameAr})\n- Flacon Size: 50ml\n- Concentration: ${heroProduct.concentration}\nPlease let me know availability and visiting hours in Frenda. Thank you!`;
    const url = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
    safeOpenExternal(url);
  };

  return (
    <section className="relative bg-[#FAF8F5] pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-[#EAE5DE] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Editorial Content (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-start">
            
            {/* Editorial Label */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#736B63] mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6A88F]" />
              <span>{t.hero.badge}</span>
            </div>

            {/* Headline */}
            <h1 className={`text-2xl sm:text-5xl lg:text-6xl text-[#1A1A1A] leading-[1.3] tracking-tight mb-5 ${
              language === 'ar' ? 'font-alexandria font-bold' : 'font-serif font-normal'
            }`}>
              {t.hero.titleLine1}{' '}
              <span className={`block mt-2 ${
                language === 'ar' ? 'font-alexandria font-normal text-[#59524C]' : 'font-serif italic text-[#736B63]'
              }`}>
                {t.hero.titleLine2}
              </span>
            </h1>

            {/* Editorial Description */}
            <p className="text-[#59524C] text-sm sm:text-base leading-relaxed max-w-2xl mb-8 font-normal">
              {t.hero.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto mb-10">
              <button
                onClick={scrollToCatalog}
                type="button"
                className="inline-flex items-center justify-center gap-2 btn-minimal-black text-xs font-semibold tracking-wider uppercase px-7 py-3.5 rounded-sm cursor-pointer"
              >
                <span>{t.hero.browseCatalog}</span>
                <ArrowLeft className={`w-3.5 h-3.5 ${language === 'en' ? 'rotate-180' : ''}`} />
              </button>

              <button
                onClick={onOpenCustomModal}
                type="button"
                className="inline-flex items-center justify-center gap-2 btn-minimal-outline text-xs font-semibold tracking-wider uppercase px-6 py-3.5 rounded-sm cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C6A88F]" />
                <span>{t.hero.bespokeButton}</span>
              </button>
            </div>

            {/* 3-Column Trust Metrics */}
            <div className="w-full grid grid-cols-3 gap-4 pt-6 border-t border-[#EAE5DE]">
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-[#1A1A1A] font-alexandria font-bold text-lg sm:text-2xl">
                  <Star className="w-4 h-4 fill-[#1A1A1A] text-[#1A1A1A]" />
                  <span dir="ltr">5.0</span>
                </div>
                <span className="text-[11px] sm:text-xs text-[#736B63] font-medium mt-0.5">
                  {t.hero.googleRating}
                </span>
              </div>

              <div className={`flex flex-col ${language === 'ar' ? 'border-r pr-2.5 sm:pr-4' : 'border-l pl-2.5 sm:pl-4'} border-[#EAE5DE]`}>
                <div className="text-[#1A1A1A] font-alexandria font-bold text-lg sm:text-2xl">
                  <span dir="ltr">+14.9K</span>
                </div>
                <span className="text-[11px] sm:text-xs text-[#736B63] font-medium mt-0.5">
                  {t.hero.facebookFollowers}
                </span>
              </div>

              <div className={`flex flex-col ${language === 'ar' ? 'border-r pr-2.5 sm:pr-4' : 'border-l pl-2.5 sm:pl-4'} border-[#EAE5DE]`}>
                <div className="flex items-center gap-1.5 text-[#1A1A1A] font-alexandria font-bold text-lg sm:text-2xl">
                  <Award className="w-4 h-4 text-[#1A1A1A]" />
                  <span dir="ltr">100%</span>
                </div>
                <span className="text-[11px] sm:text-xs text-[#736B63] font-medium mt-0.5">
                  {t.hero.guaranteedLongevity}
                </span>
              </div>
            </div>

          </div>

          {/* Gallery Showcase Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative group bg-white border border-[#EAE5DE] p-6 shadow-sm transition-all duration-500 hover:shadow-md">
              
              {/* Header Badges */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-semibold text-[#1A1A1A] border border-[#1A1A1A] px-2.5 py-0.5 uppercase tracking-wider">
                  {t.hero.exclusiveRelease}
                </span>
                <span className="text-[11px] font-medium text-[#736B63]">
                  {heroProduct.concentration}
                </span>
              </div>

              {/* Museum Bottle Image Showcase with Smooth Hover Zoom */}
              <div className="relative aspect-[4/5] bg-[#FAF8F5] overflow-hidden mb-5 flex items-center justify-center">
                <img
                  src={heroProduct.image}
                  alt={language === 'ar' ? heroProduct.nameAr : heroProduct.nameFr}
                  loading="lazy"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== STORE_CONFIG.fallbackPerfumeImage) {
                      target.src = STORE_CONFIG.fallbackPerfumeImage;
                    }
                  }}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm border border-[#EAE5DE] px-3 py-1 rounded-full text-xs font-semibold text-[#1A1A1A] shadow-sm">
                  {heroProduct.scentBadge || 'خشب وعود معتق'}
                </div>
              </div>

              {/* Title & Scent Notes */}
              <div className="mb-4 text-start">
                <h3 className={`text-xl sm:text-2xl text-[#1A1A1A] mb-1 ${
                  language === 'ar' ? 'font-alexandria font-bold' : 'font-serif font-bold'
                }`}>
                  {language === 'ar' ? heroProduct.nameAr : heroProduct.nameFr}
                </h3>
                <p className="text-xs uppercase tracking-widest text-[#736B63] font-medium">
                  {language === 'ar' ? heroProduct.nameFr : heroProduct.nameAr}
                </p>
                <p className="text-xs text-[#59524C] mt-2 leading-relaxed">
                  {heroProduct.tagline}
                </p>
              </div>

              {/* Olfactory Notes Box */}
              <div className="bg-[#FAF8F5] p-3 border border-[#EAE5DE] mb-5 text-xs text-[#59524C] space-y-1 text-start">
                <p><span className="font-bold text-[#1A1A1A]">{t.hero.topNotes}</span> {heroProduct.notes.top}</p>
                <p><span className="font-bold text-[#1A1A1A]">{t.hero.heartNotes}</span> {heroProduct.notes.heart}</p>
                <p><span className="font-bold text-[#1A1A1A]">{t.hero.baseNotes}</span> {heroProduct.notes.base}</p>
              </div>

              {/* Guide Price & Action Buttons */}
              <div className="flex items-center justify-between mb-4 pt-3 border-t border-[#EAE5DE]">
                <span className="text-xs text-[#736B63]">{t.hero.heroSize}</span>
                <div className="font-alexandria text-xl sm:text-2xl font-bold text-[#1A1A1A]">
                  <span dir="ltr">{heroProduct.prices['50ml'].toLocaleString('fr-DZ')}</span> <span className="text-sm font-normal text-[#736B63]">{t.catalog.currency}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  onClick={scrollToCatalog}
                  type="button"
                  className="w-full flex items-center justify-center gap-1.5 btn-minimal-outline py-2.5 text-xs font-semibold uppercase tracking-wider rounded-sm cursor-pointer"
                >
                  <span>{t.hero.exploreNotes}</span>
                  <ArrowLeft className={`w-3.5 h-3.5 ${language === 'en' ? 'rotate-180' : ''}`} />
                </button>

                <button
                  onClick={handleHeroInquiry}
                  type="button"
                  className="w-full flex items-center justify-center gap-1.5 bg-[#1B4332] hover:bg-[#143225] text-white py-2.5 text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
                >
                  <span>{t.hero.inquireAvailability}</span>
                  <ArrowUpLeft className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
