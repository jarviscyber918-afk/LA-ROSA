import React, { useState } from 'react';
import { Send, MessageCircle } from 'lucide-react';
import { SizeOption } from '../types';
import { STORE_CONFIG } from '../config/storeConfig';
import { sanitizeInput, safeOpenExternal } from '../utils/security';
import { useLanguage } from '../context/LanguageContext';

interface CustomPerfumeFormProps {
  onNotify: (type: 'success' | 'warning' | 'info' | 'error', message: string) => void;
  onSuccess?: () => void;
  cooldownRef: React.MutableRefObject<number>;
}

export const CustomPerfumeForm: React.FC<CustomPerfumeFormProps> = ({
  onNotify,
  onSuccess,
  cooldownRef,
}) => {
  const { t, language } = useLanguage();
  const [customerName, setCustomerName] = useState('');
  const [fragranceFamily, setFragranceFamily] = useState(
    language === 'ar'
      ? 'عطور شرقية، عود معتق وعنبر ملكي'
      : 'Oriental, Aged Cambodian Oud & Amber'
  );
  const [bottleVolume, setBottleVolume] = useState<SizeOption>('50ml');
  const [concentrationLevel, setConcentrationLevel] = useState(
    language === 'ar'
      ? 'Extrait de Parfum (35% - تركيز نيش فائق ثبات 48 ساعة+)'
      : 'Extrait de Parfum (35% - High Concentration 48h+ Longevity)'
  );
  const [receivingMethod, setReceivingMethod] = useState(
    language === 'ar'
      ? 'استلام مباشر من محل Parfumerie La Rosa (وسط مدينة فرندة)'
      : 'Boutique Pickup in Central Frenda'
  );
  const [specialNotes, setSpecialNotes] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Anti-Bot Honeypot check
    if (honeypot.trim() !== '') {
      console.warn('[Security Guard] Bot detected via honeypot field.');
      return;
    }

    // 2. Client-side Rate Limiting Cooldown (4 seconds)
    const now = Date.now();
    const timeSinceLastOrder = now - cooldownRef.current;
    if (timeSinceLastOrder < 4000) {
      const waitSeconds = Math.ceil((4000 - timeSinceLastOrder) / 1000);
      onNotify('warning', t.toasts.rateLimitWarning.replace('{seconds}', waitSeconds.toString()));
      return;
    }

    // 3. Strict Input Sanitization
    const cleanName = sanitizeInput(customerName, 60);
    const cleanNotes = sanitizeInput(specialNotes, 200);

    if (!cleanName) {
      onNotify('error', t.toasts.nameRequired);
      return;
    }

    cooldownRef.current = now;
    setIsSubmitting(true);

    const sizeFormatted = bottleVolume === '30ml' ? (language === 'ar' ? '30 مل' : '30ml') : bottleVolume === '50ml' ? (language === 'ar' ? '50 مل' : '50ml') : (language === 'ar' ? '100 مل' : '100ml');

    const lines = language === 'ar'
      ? [
          `🌹 *طلب تركيبة عطرية خاصة — Parfumerie La Rosa* 🌹`,
          `━━━━━━━━━━━━━━━━━━━━`,
          `• *الاسم الكريم:* ${cleanName}`,
          `• *العائلة العطرية:* ${fragranceFamily}`,
          `• *حجم العبوة:* ${sizeFormatted}`,
          `• *درجة التركيز:* ${concentrationLevel}`,
          `• *طريقة الاستلام بفرندة:* ${receivingMethod}`,
        ]
      : [
          `🌹 *Bespoke Perfume Formulation Request — Parfumerie La Rosa* 🌹`,
          `━━━━━━━━━━━━━━━━━━━━`,
          `• *Client Name:* ${cleanName}`,
          `• *Fragrance Family:* ${fragranceFamily}`,
          `• *Flacon Volume:* ${sizeFormatted}`,
          `• *Concentration:* ${concentrationLevel}`,
          `• *Receiving in Frenda:* ${receivingMethod}`,
        ];

    if (cleanNotes) {
      lines.push(language === 'ar' ? `• *ملاحظات وتفضيلات خاصة:* ${cleanNotes}` : `• *Bespoke Notes:* ${cleanNotes}`);
    }

    lines.push(`━━━━━━━━━━━━━━━━━━━━`);
    lines.push(language === 'ar' ? `أرجو مراجعة التوليفة وتحديد السعر وموعد استلامها في المحل بفرندة. شكراً!` : `Please review this bespoke request and confirm price and pickup time in Frenda. Thank you!`);

    const messageText = lines.join('\n');
    const whatsappUrl = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(messageText)}`;

    const opened = safeOpenExternal(whatsappUrl);
    if (opened) {
      onNotify('success', t.toasts.whatsAppSuccess);
      if (onSuccess) {
        onSuccess();
      }
    } else {
      onNotify('error', t.toasts.whatsAppError);
    }

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-start">
      
      {/* Honeypot field */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="company_website">Do not fill</label>
        <input
          type="text"
          id="company_website"
          name="company_website"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Customer Name */}
      <div>
        <label htmlFor="customerName" className="block text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] mb-2">
          {t.bespoke.nameLabel} <span className="text-red-700">*</span>
        </label>
        <input
          id="customerName"
          type="text"
          required
          maxLength={60}
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder={t.bespoke.namePlaceholder}
          className="w-full bg-[#FAF8F5] border border-[#EAE5DE] px-4 py-3 text-xs sm:text-sm text-[#1A1A1A] placeholder-[#9E9E9E] focus:outline-none focus:border-[#1A1A1A] transition-colors rounded-none"
        />
      </div>

      {/* Fragrance Family */}
      <div>
        <label htmlFor="fragranceFamily" className="block text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] mb-2">
          {t.bespoke.familyLabel}
        </label>
        <select
          id="fragranceFamily"
          value={fragranceFamily}
          onChange={(e) => setFragranceFamily(e.target.value)}
          className="w-full bg-[#FAF8F5] border border-[#EAE5DE] px-4 py-3 text-xs sm:text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-colors rounded-none"
        >
          {language === 'ar' ? (
            <>
              <option value="عطور شرقية، عود معتق وعنبر ملكي">عطور شرقية، عود معتق وعنبر ملكي</option>
              <option value="عطور فرنسية كلاسيكية وزهور راقية">عطور فرنسية كلاسيكية وزهور راقية</option>
              <option value="أخشاب دافئة، توابل وجلد فاخر">أخشاب دافئة، توابل وجلد فاخر</option>
              <option value="حمضيات منعشة ونفحات بحرية صيفية">حمضيات منعشة ونفحات بحرية صيفية</option>
              <option value="مسك نقي، وبودرة ملكية خفيفة">مسك نقي، وبودرة ملكية خفيفة</option>
            </>
          ) : (
            <>
              <option value="Oriental, Aged Cambodian Oud & Amber">Oriental, Aged Cambodian Oud & Amber</option>
              <option value="Classic French Floral & Rose Bouquet">Classic French Floral & Rose Bouquet</option>
              <option value="Warm Woods, Spices & Fine Leather">Warm Woods, Spices & Fine Leather</option>
              <option value="Fresh Citrus & Aquatic Marine Breeze">Fresh Citrus & Aquatic Marine Breeze</option>
              <option value="Pure White Musk & Velvet Powder">Pure White Musk & Velvet Powder</option>
            </>
          )}
        </select>
      </div>

      {/* Bottle Volume Selection */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] mb-2">
          {t.bespoke.sizeLabel}
        </label>
        <div className="grid grid-cols-3 gap-2.5">
          {(['30ml', '50ml', '100ml'] as SizeOption[]).map((size) => {
            const isSelected = bottleVolume === size;
            const label = t.bespoke.sizes[size];
            return (
              <button
                key={size}
                type="button"
                onClick={() => setBottleVolume(size)}
                className={`py-2.5 px-2 text-xs font-semibold transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-[#1A1A1A] border-[#1A1A1A] text-white shadow-sm'
                    : 'bg-[#FAF8F5] border-[#EAE5DE] text-[#59524C] hover:border-[#1A1A1A] hover:text-[#1A1A1A]'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Concentration Level */}
      <div>
        <label htmlFor="concentrationLevel" className="block text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] mb-2">
          {t.bespoke.concLabel}
        </label>
        <select
          id="concentrationLevel"
          value={concentrationLevel}
          onChange={(e) => setConcentrationLevel(e.target.value)}
          className="w-full bg-[#FAF8F5] border border-[#EAE5DE] px-4 py-3 text-xs sm:text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-colors rounded-none"
        >
          {language === 'ar' ? (
            <>
              <option value="Extrait de Parfum (35% - تركيز نيش فائق ثبات 48 ساعة+)">
                Extrait de Parfum (35% - تركيز نيش فائق ثبات 48 ساعة+)
              </option>
              <option value="Eau de Parfum (20% - تركيز يومي فواح وناعم)">
                Eau de Parfum (20% - تركيز يومي فواح وناعم)
              </option>
            </>
          ) : (
            <>
              <option value="Extrait de Parfum (35% - High Concentration 48h+ Longevity)">
                Extrait de Parfum (35% - High Concentration 48h+ Longevity)
              </option>
              <option value="Eau de Parfum (20% - Refined Daily Sillage)">
                Eau de Parfum (20% - Refined Daily Sillage)
              </option>
            </>
          )}
        </select>
      </div>

      {/* Receiving Method in Frenda */}
      <div>
        <label htmlFor="receivingMethod" className="block text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] mb-2">
          {t.bespoke.receivingLabel}
        </label>
        <select
          id="receivingMethod"
          value={receivingMethod}
          onChange={(e) => setReceivingMethod(e.target.value)}
          className="w-full bg-[#FAF8F5] border border-[#EAE5DE] px-4 py-3 text-xs sm:text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] transition-colors rounded-none"
        >
          {language === 'ar' ? (
            <>
              <option value="استلام مباشر من محل Parfumerie La Rosa (وسط مدينة فرندة)">
                استلام مباشر من محل Parfumerie La Rosa (وسط مدينة فرندة)
              </option>
              <option value="توصيل شخصي داخل مدينة فرندة">
                توصيل شخصي داخل مدينة فرندة
              </option>
              <option value="توصيل لولاية تيارت والدوائر المجاورة">
                توصيل لولاية تيارت والدوائر المجاورة
              </option>
            </>
          ) : (
            <>
              <option value="Boutique Pickup in Central Frenda">
                Boutique Pickup in Central Frenda
              </option>
              <option value="Direct Personal Delivery within Frenda">
                Direct Personal Delivery within Frenda
              </option>
              <option value="Regional Delivery across Tiaret Province">
                Regional Delivery across Tiaret Province
              </option>
            </>
          )}
        </select>
      </div>

      {/* Special Notes & Custom Requests */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="specialNotes" className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]">
            {t.bespoke.notesLabel}
          </label>
          <span className="text-[10px] text-[#736B63] font-mono" dir="ltr">
            {specialNotes.length}/200
          </span>
        </div>
        <textarea
          id="specialNotes"
          rows={3}
          maxLength={200}
          value={specialNotes}
          onChange={(e) => setSpecialNotes(e.target.value)}
          placeholder={t.bespoke.notesPlaceholder}
          className="w-full bg-[#FAF8F5] border border-[#EAE5DE] px-4 py-3 text-xs sm:text-sm text-[#1A1A1A] placeholder-[#9E9E9E] focus:outline-none focus:border-[#1A1A1A] transition-colors resize-none rounded-none"
        />
      </div>

      {/* Direct Contact Notice */}
      <div className="flex items-center gap-2 text-xs text-[#736B63] bg-[#F4F0EA] p-3 border border-[#EAE5DE]">
        <MessageCircle className="w-4 h-4 text-[#1B4332] shrink-0" />
        <span>{t.bespoke.securityText}</span>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 btn-minimal-black py-4 text-xs font-semibold uppercase tracking-widest transition-all cursor-pointer disabled:opacity-50"
      >
        <Send className="w-4 h-4" />
        <span>{t.bespoke.submitButton}</span>
      </button>

    </form>
  );
};

export const CustomPerfumeSection: React.FC<CustomPerfumeFormProps> = (props) => {
  const { t, language } = useLanguage();

  return (
    <section id="custom-perfume" className="scroll-mt-28 py-20 bg-[#FAF8F5] border-b border-[#EAE5DE] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        
        <div className="bg-white border border-[#EAE5DE] p-8 sm:p-12 shadow-sm">
          
          <div className="text-center max-w-2xl mx-auto mb-10 pb-6 border-b border-[#EAE5DE]">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#736B63] block mb-2">
              {t.bespoke.subtitle}
            </span>
            <h2 className={`text-2xl sm:text-3xl text-[#1A1A1A] mb-3 ${
              language === 'ar' ? 'font-alexandria font-bold' : 'font-serif font-normal'
            }`}>
              {t.bespoke.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#59524C]">
              {t.bespoke.description}
            </p>
          </div>

          <CustomPerfumeForm {...props} />

        </div>

      </div>
    </section>
  );
};
