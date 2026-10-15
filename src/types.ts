export type SizeOption = '30ml' | '50ml' | '100ml';

export type CategoryTab = 'all' | 'men' | 'women' | 'oriental' | 'gifts';

export interface PerfumeNotes {
  top: string;    // مقدمة العطر
  heart: string;  // قلب العطر
  base: string;   // قاعدة العطر
}

export interface Product {
  id: string;
  nameAr: string;
  nameFr: string;
  tagline: string;
  category: 'men' | 'women' | 'oriental' | 'gifts';
  description: string;
  notes: PerfumeNotes;
  prices: Record<SizeOption, number>;
  image: string;
  isBestSeller?: boolean;
  isNew?: boolean;
  concentration: string;
  scentBadge?: string;
}

export interface CartItem {
  id: string; // unique item key: productId-size
  productId: string;
  nameAr: string;
  nameFr: string;
  size: SizeOption;
  price: number;
  qty: number;
  image: string;
}

export interface CustomPerfumeForm {
  customerName: string;
  fragranceFamily: string;
  bottleVolume: SizeOption;
  concentrationLevel: string;
  receivingMethod: string;
  specialNotes: string;
  company_website: string; // honeypot
}

export interface Review {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  comment: string;
  perfumePurchased: string;
  verified: boolean;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  message: string;
}
