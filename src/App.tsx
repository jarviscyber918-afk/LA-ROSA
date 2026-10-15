import React, { useState, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ExperienceBento } from './components/ExperienceBento';
import { Catalog } from './components/Catalog';
import { CustomPerfumeSection } from './components/CustomPerfumeSection';
import { CustomPerfumeModal } from './components/CustomPerfumeModal';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { BottomActionDock } from './components/BottomActionDock';
import { ToastContainer } from './components/Toast';

import { PRODUCTS } from './data/products';
import { ToastMessage } from './types';
import { LanguageProvider, useLanguage } from './context/LanguageContext';

const StorefrontContent: React.FC = () => {
  const { language, dir } = useLanguage();

  // 1. Custom Perfume Atelier Modal state
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);

  // 2. Toast Notifications state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // 3. Rate-Limiting Cooldown Guard (4 seconds)
  const inquiryCooldownRef = useRef<number>(0);

  // Toast dispatcher
  const notify = (type: 'success' | 'warning' | 'info' | 'error', message: string) => {
    const newToast: ToastMessage = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      type,
      message,
    };
    setToasts((prev) => [...prev.slice(-3), newToast]);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div
      dir={dir}
      lang={language}
      className={`min-h-screen bg-[#FAF8F5] text-[#1A1A1A] overflow-x-hidden antialiased selection:bg-[#1A1A1A] selection:text-white relative flex flex-col justify-between ${
        language === 'ar' ? 'font-alexandria' : 'font-sans'
      }`}
    >
      {/* Toast Notification Layer */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Navigation */}
      <div>
        <Navbar
          onOpenCustomModal={() => setIsCustomModalOpen(true)}
        />

        {/* Hero Section */}
        <main>
          <Hero
            heroProduct={PRODUCTS[0]}
            onOpenCustomModal={() => setIsCustomModalOpen(true)}
          />

          {/* Bento Grid: Experience and Store Pillars */}
          <ExperienceBento onOpenCustomModal={() => setIsCustomModalOpen(true)} />

          {/* Curated Fragrance Showcase */}
          <Catalog products={PRODUCTS} />

          {/* In-Page Custom Perfume Atelier */}
          <CustomPerfumeSection
            onNotify={notify}
            cooldownRef={inquiryCooldownRef}
          />

          {/* Social Proof & Verified Reviews */}
          <ReviewsSection />

          {/* Location, Contact, and Hardened Sandboxed Map */}
          <LocationSection />
        </main>
      </div>

      {/* Footer */}
      <Footer />

      {/* Discreet Floating WhatsApp Concierge */}
      <BottomActionDock />

      {/* Custom Perfume Modal Dialog */}
      <CustomPerfumeModal
        isOpen={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
        onNotify={notify}
        cooldownRef={inquiryCooldownRef}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <StorefrontContent />
    </LanguageProvider>
  );
};
