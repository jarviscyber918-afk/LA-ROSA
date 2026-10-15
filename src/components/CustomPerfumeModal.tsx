import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { CustomPerfumeForm } from './CustomPerfumeSection';
import { useLanguage } from '../context/LanguageContext';

interface CustomPerfumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNotify: (type: 'success' | 'warning' | 'info' | 'error', message: string) => void;
  cooldownRef: React.MutableRefObject<number>;
}

export const CustomPerfumeModal: React.FC<CustomPerfumeModalProps> = ({
  isOpen,
  onClose,
  onNotify,
  cooldownRef,
}) => {
  const { t, language } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-2xl bg-white border border-[#1A1A1A] p-5 sm:p-10 shadow-2xl my-4 sm:my-8 max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close modal"
          className={`absolute top-4 sm:top-6 p-2 text-[#736B63] hover:text-[#1A1A1A] transition-colors cursor-pointer ${
            language === 'ar' ? 'left-4 sm:left-6' : 'right-4 sm:right-6'
          }`}
        >
          <X className="w-5 h-5 stroke-[1.5]" />
        </button>

        {/* Modal Header */}
        <div className="text-start mb-8 pb-4 border-b border-[#EAE5DE]">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#736B63] block mb-1">
            {t.bespoke.subtitle}
          </span>
          <h2 id="modal-title" className={`text-xl sm:text-2xl text-[#1A1A1A] ${
            language === 'ar' ? 'font-alexandria font-bold' : 'font-serif font-bold'
          }`}>
            {t.bespoke.modalTitle}
          </h2>
          <p className="text-xs sm:text-sm text-[#59524C] mt-1.5">
            {t.bespoke.modalDesc}
          </p>
        </div>

        {/* Form */}
        <CustomPerfumeForm
          onNotify={onNotify}
          onSuccess={onClose}
          cooldownRef={cooldownRef}
        />

      </div>
    </div>
  );
};
