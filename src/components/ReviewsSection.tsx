import React from 'react';
import { Star, Check, ThumbsUp, ArrowUpLeft } from 'lucide-react';
import { REVIEWS } from '../data/reviews';
import { STORE_CONFIG } from '../config/storeConfig';
import { safeOpenExternal } from '../utils/security';
import { useLanguage } from '../context/LanguageContext';

export const ReviewsSection: React.FC = () => {
  const { t, language } = useLanguage();

  const handleOpenFacebook = () => {
    safeOpenExternal(STORE_CONFIG.facebookUrl);
  };

  return (
    <section id="reviews" className="scroll-mt-28 py-20 bg-[#FAF8F5] border-b border-[#EAE5DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#736B63] block mb-2">
            {t.reviews.subtitle}
          </span>
          <h2 className={`text-2xl sm:text-3xl lg:text-4xl text-[#1A1A1A] leading-tight mb-4 ${
            language === 'ar' ? 'font-alexandria font-bold' : 'font-serif font-normal'
          }`}>
            {t.reviews.title} <span className="text-[#C6A88F] font-bold">{t.reviews.titleHighlight}</span> {t.reviews.titleEnd}
          </h2>
          <p className="text-sm sm:text-base text-[#59524C]">
            {t.reviews.description}
          </p>
        </div>

        {/* Minimalist Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white border border-[#EAE5DE] hover:border-[#1A1A1A] p-6 sm:p-8 transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-md"
            >
              <div>
                {/* Rating Stars & Verified Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1 text-[#1A1A1A]">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#1A1A1A] text-[#1A1A1A]" />
                    ))}
                  </div>

                  {rev.verified && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#1B4332] bg-[#F4F0EA] px-2.5 py-0.5">
                      <Check className="w-3 h-3 text-[#1B4332]" />
                      <span>{t.reviews.verified}</span>
                    </span>
                  )}
                </div>

                {/* Review Text */}
                <p className="text-[#3D3532] text-sm leading-relaxed mb-8">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author & Purchase Info */}
              <div className="pt-4 border-t border-[#EAE5DE]">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-[#1A1A1A]">{rev.author}</h3>
                    <p className="text-xs text-[#736B63]">{rev.city}</p>
                  </div>
                  <span className="text-[11px] text-[#736B63]">{rev.date}</span>
                </div>
                
                <div className="mt-2 text-xs text-[#736B63]">
                  {t.reviews.purchased} <span className="text-[#1A1A1A] font-medium">{rev.perfumePurchased}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Facebook Community Button */}
        <div className="text-center">
          <button
            onClick={handleOpenFacebook}
            type="button"
            className="inline-flex items-center gap-2 btn-minimal-outline px-8 py-3.5 text-xs font-semibold uppercase tracking-wider rounded-sm cursor-pointer"
          >
            <ThumbsUp className="w-4 h-4 stroke-[1.5]" />
            <span>{t.reviews.communityBtn}</span>
            <ArrowUpLeft className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
