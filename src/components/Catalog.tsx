import React, { useState, useMemo } from 'react';
import { Search, X, ArrowUpLeft, Info } from 'lucide-react';
import { Product, SizeOption, CategoryTab } from '../types';
import { STORE_CONFIG } from '../config/storeConfig';
import { sanitizeInput, safeOpenExternal } from '../utils/security';
import { useLanguage } from '../context/LanguageContext';

interface CatalogProps {
  products: Product[];
}

export const Catalog: React.FC<CatalogProps> = ({ products }) => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<CategoryTab>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSizes, setSelectedSizes] = useState<Record<string, SizeOption>>({});

  // Category filter tabs
  const tabs: { key: CategoryTab; label: string }[] = [
    { key: 'all', label: t.catalog.tabs.all },
    { key: 'men', label: t.catalog.tabs.men },
    { key: 'women', label: t.catalog.tabs.women },
    { key: 'oriental', label: t.catalog.tabs.oriental },
    { key: 'gifts', label: t.catalog.tabs.gifts },
  ];

  // Handle sanitized search
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = sanitizeInput(e.target.value, 50);
    setSearchQuery(sanitized);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  // Helper for product selected size (defaults to '50ml')
  const getProductSize = (productId: string): SizeOption => {
    return selectedSizes[productId] || '50ml';
  };

  const handleSelectSize = (productId: string, size: SizeOption) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [productId]: size,
    }));
  };

  // Handle Boutique In-Store Sampling Inquiry
  const handleInquireBoutique = (product: Product) => {
    const size = getProductSize(product.id);
    const price = product.prices[size];
    const sizeFormatted = size === '30ml' ? (language === 'ar' ? '30 مل' : '30ml') : size === '50ml' ? (language === 'ar' ? '50 مل' : '50ml') : (language === 'ar' ? '100 مل' : '100ml');

    const text = language === 'ar'
      ? `مرحباً Parfumerie La Rosa (فرندة)، أود الاستفسار عن توفر هذا العطر المعروض لتجربته بمحلكم بفرندة:\n- العطر: ${product.nameAr} (${product.nameFr})\n- الحجم المطلوب: ${sizeFormatted}\n- السعر الاسترشادي: ${price.toLocaleString('fr-DZ')} د.ج\n- التركيز: ${product.concentration}\nيرجى إعلامي بأوقات الاستقبال لزيارة المحل. شكراً لكم!`
      : `Hello Parfumerie La Rosa (Frenda), I would like to inquire about sampling this fragrance at your boutique in Frenda:\n- Perfume: ${product.nameFr} (${product.nameAr})\n- Flacon Volume: ${sizeFormatted}\n- Guide Price: ${price.toLocaleString('fr-DZ')} DZD\n- Concentration: ${product.concentration}\nPlease let me know your visiting hours in Frenda. Thank you!`;

    const url = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
    safeOpenExternal(url);
  };

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = activeTab === 'all' || p.category === activeTab;
      const q = searchQuery.trim().toLowerCase();
      if (!q) return matchesCategory;

      const matchesSearch =
        p.nameAr.toLowerCase().includes(q) ||
        p.nameFr.toLowerCase().includes(q) ||
        p.notes.top.toLowerCase().includes(q) ||
        p.notes.heart.toLowerCase().includes(q) ||
        p.notes.base.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [products, activeTab, searchQuery]);

  return (
    <section id="catalog" className="scroll-mt-28 py-20 bg-[#FAF8F5] border-b border-[#EAE5DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-[#EAE5DE]">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#736B63] block mb-2">
              {t.catalog.subtitle}
            </span>
            <h2 className={`text-2xl sm:text-3xl lg:text-4xl text-[#1A1A1A] tracking-tight ${
              language === 'ar' ? 'font-alexandria font-bold' : 'font-serif font-normal'
            }`}>
              {t.catalog.title}
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#736B63] max-w-md">
            {t.catalog.description}
          </p>
        </div>

        {/* Minimalist Filter Bar & Sanitized Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  type="button"
                  className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-none sm:rounded-sm transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#1A1A1A] text-white shadow-sm'
                      : 'bg-white text-[#736B63] border border-[#EAE5DE] hover:border-[#1A1A1A] hover:text-[#1A1A1A]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Sanitized Search Box */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder={t.catalog.searchPlaceholder}
              maxLength={50}
              className="w-full bg-white border border-[#EAE5DE] rounded-sm px-9 py-2.5 text-xs text-[#1A1A1A] placeholder-[#9E9E9E] focus:outline-none focus:border-[#1A1A1A] transition-colors"
            />
            <Search className={`w-4 h-4 text-[#736B63] absolute top-3 pointer-events-none stroke-[1.5] ${
              language === 'ar' ? 'right-3' : 'left-3'
            }`} />
            
            {searchQuery && (
              <button
                onClick={clearSearch}
                type="button"
                aria-label="Clear Search"
                className={`absolute top-3 text-[#736B63] hover:text-[#1A1A1A] cursor-pointer ${
                  language === 'ar' ? 'left-3' : 'right-3'
                }`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white border border-[#EAE5DE] p-12 text-center max-w-md mx-auto my-12">
            <Info className="w-8 h-8 text-[#736B63] mx-auto mb-3 stroke-[1.5]" />
            <h3 className={`text-lg text-[#1A1A1A] mb-2 ${
              language === 'ar' ? 'font-alexandria font-bold' : 'font-serif font-bold'
            }`}>
              {t.catalog.emptyTitle}
            </h3>
            <p className="text-xs text-[#736B63] mb-6">
              {t.catalog.emptyDesc}
            </p>
            <button
              onClick={clearSearch}
              type="button"
              className="btn-minimal-black px-5 py-2 text-xs uppercase tracking-wider rounded-sm cursor-pointer"
            >
              {t.catalog.viewAll}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => {
              const currentSize = getProductSize(product.id);
              const currentPrice = product.prices[currentSize];

              return (
                <div
                  key={product.id}
                  className="bg-white border border-[#EAE5DE] hover:border-[#1A1A1A] p-6 transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-md"
                >
                  <div>
                    {/* Bottle Image with Smooth Hover Zoom */}
                    <div className="relative aspect-[4/5] bg-[#FAF8F5] overflow-hidden mb-6 flex items-center justify-center">
                      <img
                        src={product.image}
                        alt={language === 'ar' ? product.nameAr : product.nameFr}
                        loading="lazy"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (target.src !== STORE_CONFIG.fallbackPerfumeImage) {
                            target.src = STORE_CONFIG.fallbackPerfumeImage;
                          }
                        }}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />

                      {/* Scent Pill Badge */}
                      {product.scentBadge && (
                        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm border border-[#EAE5DE] px-3 py-1 rounded-full text-[11px] font-semibold text-[#1A1A1A] shadow-sm">
                          {product.scentBadge}
                        </div>
                      )}

                      {/* Top Badges */}
                      <div className="absolute top-3 right-3 flex flex-col gap-1 items-end">
                        {product.isBestSeller && (
                          <span className="bg-[#1A1A1A] text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5">
                            {t.catalog.bestSeller}
                          </span>
                        )}
                        {product.isNew && (
                          <span className="bg-[#C6A88F] text-[#1A1A1A] text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5">
                            {t.catalog.newRelease}
                          </span>
                        )}
                      </div>

                      {/* Subtle Bottom Bar with Concentration */}
                      <div className="absolute bottom-2.5 inset-x-2.5 flex justify-between items-center text-[10px] font-medium text-[#736B63] bg-white/90 backdrop-blur-sm px-2.5 py-1">
                        <span>{product.concentration}</span>
                        <span className="font-serif italic">Extrait</span>
                      </div>
                    </div>

                    {/* Titles */}
                    <div className="mb-4 text-start">
                      <h3 className={`text-lg sm:text-xl text-[#1A1A1A] group-hover:text-black transition-colors mb-1 ${
                        language === 'ar' ? 'font-alexandria font-bold' : 'font-serif font-bold'
                      }`}>
                        {language === 'ar' ? product.nameAr : product.nameFr}
                      </h3>
                      <p className="text-xs uppercase tracking-[0.2em] font-medium text-[#736B63]">
                        {language === 'ar' ? product.nameFr : product.nameAr}
                      </p>
                      <p className="text-xs text-[#59524C] mt-2 line-clamp-2 leading-relaxed">
                        {product.tagline}
                      </p>
                    </div>

                    {/* Olfactory Notes Box */}
                    <div className="bg-[#FAF8F5] p-3 border border-[#EAE5DE] mb-5 text-[11px] text-[#59524C] space-y-1 text-start">
                      <p>
                        <span className="font-bold text-[#1A1A1A]">{t.catalog.top}</span> {product.notes.top}
                      </p>
                      <p>
                        <span className="font-bold text-[#1A1A1A]">{t.catalog.heart}</span> {product.notes.heart}
                      </p>
                      <p>
                        <span className="font-bold text-[#1A1A1A]">{t.catalog.base}</span> {product.notes.base}
                      </p>
                    </div>

                    {/* Bottle Size Selector (Minimalist Pills) */}
                    <div className="mb-6">
                      <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#736B63] mb-2 text-start">
                        {t.catalog.bottleSize}
                      </span>
                      <div className="grid grid-cols-3 gap-2">
                        {(['30ml', '50ml', '100ml'] as SizeOption[]).map((size) => {
                          const isSelected = currentSize === size;
                          const label = size === '30ml' ? (language === 'ar' ? '30 مل' : '30ml') : size === '50ml' ? (language === 'ar' ? '50 مل' : '50ml') : (language === 'ar' ? '100 مل' : '100ml');
                          const priceVal = product.prices[size];

                          return (
                            <button
                              key={size}
                              type="button"
                              onClick={() => handleSelectSize(product.id, size)}
                              className={`py-2 px-1 text-center transition-all border cursor-pointer ${
                                isSelected
                                  ? 'bg-[#1A1A1A] border-[#1A1A1A] text-white shadow-sm'
                                  : 'bg-white border-[#EAE5DE] text-[#59524C] hover:border-[#1A1A1A] hover:text-[#1A1A1A]'
                              }`}
                            >
                              <div className="text-xs font-semibold">{label}</div>
                              <div className="text-[10px] font-mono mt-0.5 opacity-80" dir="ltr">
                                {priceVal.toLocaleString('fr-DZ')} DA
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Guide Price & Boutique Sampling Action */}
                  <div className="pt-4 border-t border-[#EAE5DE]">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs text-[#736B63]">{t.catalog.priceForSize}</span>
                      <div className="font-alexandria text-xl font-bold text-[#1A1A1A]">
                        <span dir="ltr">{currentPrice.toLocaleString('fr-DZ')}</span> <span className="text-xs font-normal text-[#736B63]">{t.catalog.currency}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleInquireBoutique(product)}
                      type="button"
                      className="w-full flex items-center justify-center gap-2 btn-minimal-black py-3 px-4 text-xs font-semibold uppercase tracking-wider rounded-sm transition-all cursor-pointer hover:bg-black"
                    >
                      <span>{t.catalog.inquireButton}</span>
                      <ArrowUpLeft className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
