import { CartItem, SizeOption } from '../types';

/**
 * Strict allowed external hostnames whitelist
 */
const ALLOWED_HOSTS = new Set([
  'wa.me',
  'www.google.com',
  'maps.google.com',
  'www.facebook.com',
  'facebook.com',
]);

/**
 * 1. Strict Input Sanitization & XSS Prevention
 * Strips HTML/script characters, blocks dangerous pseudo-protocols,
 * normalizes whitespace, and enforces hard max length.
 */
export function sanitizeInput(value: string, maxLen = 120): string {
  if (typeof value !== 'string') return '';
  
  // Truncate to maximum permissible length first
  let cleaned = value.slice(0, maxLen);

  // Check for dangerous URI schemes or event triggers
  const lower = cleaned.toLowerCase();
  if (
    lower.includes('javascript:') ||
    lower.includes('data:') ||
    lower.includes('vbscript:') ||
    lower.includes('onload=') ||
    lower.includes('onerror=')
  ) {
    return '';
  }

  // Strip complete HTML tags (e.g., <script>...</script> or <img ... />)
  cleaned = cleaned.replace(/<[^>]*>/g, '');

  // Strip dangerous HTML/script characters: < > ' " ` ; ( ) { }
  cleaned = cleaned.replace(/[<>'"`;(){}]/g, '');

  // Normalize multi-whitespace to single space
  cleaned = cleaned.replace(/\s+/g, ' ').trim();

  return cleaned;
}

/**
 * 2. URL Whitelisting & Reverse-Tabnabbing Defense
 * Validates protocol (https only), verifies hostname is strictly whitelisted,
 * and opens target with noopener, noreferrer, setting opener = null.
 */
export function safeOpenExternal(rawUrl: string): boolean {
  try {
    const parsed = new URL(rawUrl);

    // Enforce HTTPS only
    if (parsed.protocol !== 'https:') {
      console.warn('[Security Violation] Non-HTTPS protocol rejected:', parsed.protocol);
      return false;
    }

    // Check whitelist hostname
    if (!ALLOWED_HOSTS.has(parsed.hostname)) {
      console.warn('[Security Violation] Hostname not in whitelist:', parsed.hostname);
      return false;
    }

    // Open securely with noopener and noreferrer
    const newWindow = window.open(parsed.toString(), '_blank', 'noopener,noreferrer');
    if (newWindow) {
      newWindow.opener = null;
    }
    return true;
  } catch (err) {
    console.error('[Security Exception] Failed to safely parse URL:', err);
    return false;
  }
}

/**
 * 3. Defensive LocalStorage Validation for Cart
 * Validates that data is an Array and each element adheres to CartItem schema.
 * Prevents corrupted or tampered storage from crashing React.
 */
const VALID_SIZES = new Set<SizeOption>(['30ml', '50ml', '100ml']);

export function loadValidatedCart(storageKey = 'la_rosa_cart_v1'): CartItem[] {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      localStorage.removeItem(storageKey);
      return [];
    }

    const validatedItems: CartItem[] = [];
    for (const item of parsed) {
      if (
        item &&
        typeof item === 'object' &&
        typeof item.id === 'string' &&
        typeof item.productId === 'string' &&
        typeof item.nameAr === 'string' &&
        typeof item.nameFr === 'string' &&
        VALID_SIZES.has(item.size) &&
        typeof item.price === 'number' &&
        item.price > 0 &&
        typeof item.qty === 'number' &&
        item.qty > 0 &&
        item.qty <= 50 &&
        typeof item.image === 'string'
      ) {
        validatedItems.push({
          id: sanitizeInput(item.id, 50),
          productId: sanitizeInput(item.productId, 50),
          nameAr: sanitizeInput(item.nameAr, 60),
          nameFr: sanitizeInput(item.nameFr, 60),
          size: item.size,
          price: Math.round(item.price),
          qty: Math.min(50, Math.max(1, Math.round(item.qty))),
          image: item.image,
        });
      }
    }

    return validatedItems;
  } catch (err) {
    console.warn('[Security Fallback] Resetting corrupted localStorage cart:', err);
    try {
      localStorage.removeItem(storageKey);
    } catch {
      // ignore
    }
    return [];
  }
}

export function saveValidatedCart(items: CartItem[], storageKey = 'la_rosa_cart_v1'): void {
  try {
    localStorage.setItem(storageKey, JSON.stringify(items));
  } catch (err) {
    console.warn('[Storage Error] Failed to persist cart to localStorage:', err);
  }
}
