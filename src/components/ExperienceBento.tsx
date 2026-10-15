import React from 'react';
import { Droplets, Compass, Gift, Clock, Award, Sparkles, HeartHandshake } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ExperienceBentoProps {
  onOpenCustomModal: () => void;
}

export const ExperienceBento: React.FC<ExperienceBentoProps> = ({ onOpenCustomModal }) => {
  const { t, language } = useLanguage();

  return (
    <section id="experience" className="scroll-mt-28 py-20 bg-[#FAF8F5] border-b border-[#EAE5DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#736B63] block mb-2">
            {t.experience.subtitle}
          </span>
          <h2 className={`text-2xl sm:text-3xl lg:text-4xl text-[#1A1A1A] leading-tight mb-4 ${
            language === 'ar' ? 'font-alexandria font-bold' : 'font-serif font-normal'
          }`}>
            {t.experience.title} <span className="text-[#C6A88F] font-bold">{t.experience.titleHighlight}</span> {t.experience.titleEnd}
          </h2>
          <p className="text-[#59524C] text-sm sm:text-base leading-relaxed">
            {t.experience.description}
          </p>
        </div>

        {/* Minimalist Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Bento Card 1: Wide (md:col-span-2) - High Concentration & Longevity */}
          <div className="md:col-span-2 bg-white border border-[#EAE5DE] hover:border-[#1A1A1A] p-8 sm:p-10 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 rounded-none border border-[#1A1A1A] flex items-center justify-center text-[#1A1A1A]">
                  <Droplets className="w-5 h-5 stroke-[1.5]" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#736B63] bg-[#F4F0EA] px-3 py-1">
                  {t.experience.card1Badge}
                </span>
              </div>

              <h3 className={`text-xl sm:text-2xl text-[#1A1A1A] mb-4 ${
                language === 'ar' ? 'font-alexandria font-bold' : 'font-serif font-normal'
              }`}>
                {t.experience.card1Title}
              </h3>
              <p className="text-[#59524C] text-sm sm:text-base leading-relaxed mb-8">
                {t.experience.card1Desc}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-6 border-t border-[#EAE5DE] text-xs font-medium text-[#1A1A1A]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C6A88F] shrink-0" />
                <span>{t.experience.pureOils}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#736B63]" />
                <span>{t.experience.hours48}</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#736B63]" />
                <span>{t.experience.guarantee}</span>
              </div>
            </div>
          </div>

          {/* Bento Card 2: Standard (md:col-span-1) - Rare Curated Fragrances */}
          <div className="md:col-span-1 bg-white border border-[#EAE5DE] hover:border-[#1A1A1A] p-8 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-none border border-[#1A1A1A] flex items-center justify-center text-[#1A1A1A] mb-8">
                <Compass className="w-5 h-5 stroke-[1.5]" />
              </div>
              <h3 className={`text-lg sm:text-xl text-[#1A1A1A] mb-3 ${
                language === 'ar' ? 'font-alexandria font-bold' : 'font-serif font-normal'
              }`}>
                {t.experience.card2Title}
              </h3>
              <p className="text-[#59524C] text-sm leading-relaxed mb-6">
                {t.experience.card2Desc}
              </p>
            </div>
            <div className="text-xs font-semibold tracking-wider text-[#1A1A1A] uppercase pt-4 border-t border-[#EAE5DE]">
              {t.experience.card2Link}
            </div>
          </div>

          {/* Bento Card 3: Standard (md:col-span-1) - Boutique Consultation */}
          <div className="md:col-span-1 bg-white border border-[#EAE5DE] hover:border-[#1A1A1A] p-8 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-none border border-[#1A1A1A] flex items-center justify-center text-[#1A1A1A] mb-8">
                <HeartHandshake className="w-5 h-5 stroke-[1.5]" />
              </div>
              <h3 className={`text-lg sm:text-xl text-[#1A1A1A] mb-3 ${
                language === 'ar' ? 'font-alexandria font-bold' : 'font-serif font-normal'
              }`}>
                {t.experience.card3Title}
              </h3>
              <p className="text-[#59524C] text-sm leading-relaxed mb-6">
                {t.experience.card3Desc}
              </p>
            </div>
            <div className="text-xs font-semibold tracking-wider text-[#1A1A1A] uppercase pt-4 border-t border-[#EAE5DE]">
              {t.experience.card3Link}
            </div>
          </div>

          {/* Bento Card 4: Wide (md:col-span-2) - Royal Gift Packaging */}
          <div className="md:col-span-2 bg-white border border-[#EAE5DE] hover:border-[#1A1A1A] p-8 sm:p-10 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 rounded-none border border-[#1A1A1A] flex items-center justify-center text-[#1A1A1A]">
                  <Gift className="w-5 h-5 stroke-[1.5]" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#736B63] bg-[#F4F0EA] px-3 py-1">
                  {t.experience.card4Badge}
                </span>
              </div>

              <h3 className={`text-xl sm:text-2xl text-[#1A1A1A] mb-4 ${
                language === 'ar' ? 'font-alexandria font-bold' : 'font-serif font-normal'
              }`}>
                {t.experience.card4Title}
              </h3>
              <p className="text-[#59524C] text-sm sm:text-base leading-relaxed mb-8">
                {t.experience.card4Desc}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-[#EAE5DE]">
              <span className="text-xs text-[#736B63] leading-relaxed">
                {t.experience.card4Notice}
              </span>
              
              <button
                onClick={onOpenCustomModal}
                type="button"
                className="w-full sm:w-auto btn-minimal-black text-xs font-semibold uppercase tracking-wider px-6 py-3 rounded-sm cursor-pointer inline-flex items-center justify-center gap-2"
              >
                <Gift className="w-4 h-4 text-[#C6A88F]" />
                <span>{t.experience.card4Button}</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
