import React from 'react';
import { MessageCircle } from 'lucide-react';
import { STORE_CONFIG } from '../config/storeConfig';
import { safeOpenExternal } from '../utils/security';
import { useLanguage } from '../context/LanguageContext';

export const BottomActionDock: React.FC = () => {
  const { language } = useLanguage();

  const handleOpenWhatsApp = () => {
    const text = language === 'ar'
      ? 'مرحباً Parfumerie La Rosa (فرندة)، أود الاستفسار عن تشكيلة العطور المتوفرة وأوقات استقبال الزبائن بالمتجر.'
      : 'Hello Parfumerie La Rosa (Frenda), I would like to inquire about your available perfume collections and boutique visiting hours.';
    const url = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
    safeOpenExternal(url);
  };

  return (
    <aside aria-label="Boutique Concierge" className="fixed bottom-6 end-6 z-40">
      <button
        onClick={handleOpenWhatsApp}
        type="button"
        aria-label="Direct WhatsApp Concierge"
        className="w-12 h-12 rounded-full bg-[#1B4332] hover:bg-[#143225] text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer group"
        title={language === 'ar' ? 'استفسار عبر واتساب' : 'Inquire on WhatsApp'}
      >
        <MessageCircle className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
        <span className="sr-only">WhatsApp Concierge</span>
      </button>
    </aside>
  );
};
