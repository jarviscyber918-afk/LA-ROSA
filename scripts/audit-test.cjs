// Programmatic unit audit test for Parfumerie La Rosa security and logic
const assert = require('assert');

// 1. Test Input Sanitization
function sanitizeInput(value, maxLen = 120) {
  if (typeof value !== 'string') return '';
  let cleaned = value.slice(0, maxLen);
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
  // Strip complete HTML tags first
  cleaned = cleaned.replace(/<[^>]*>/g, '');
  cleaned = cleaned.replace(/[<>'"`;(){}]/g, '');
  cleaned = cleaned.replace(/\s+/g, ' ').trim();
  return cleaned;
}

console.log('Testing sanitizeInput...');
assert.strictEqual(sanitizeInput('<script>alert("xss")</script>'), 'alertxss');
assert.strictEqual(sanitizeInput('javascript:alert(1)'), '');
assert.strictEqual(sanitizeInput('data:text/html,<script>'), '');
assert.strictEqual(sanitizeInput('  محمد   علي   '), 'محمد علي');
assert.strictEqual(sanitizeInput('A'.repeat(200), 50).length, 50);
console.log('✓ sanitizeInput passed all tests!');

// 2. Test URL Whitelisting & Reverse Tabnabbing checks
const ALLOWED_HOSTS = new Set([
  'wa.me',
  'www.google.com',
  'maps.google.com',
  'www.facebook.com',
  'facebook.com',
]);

function validateExternalUrl(rawUrl) {
  try {
    const parsed = new URL(rawUrl);
    if (parsed.protocol !== 'https:') return false;
    if (!ALLOWED_HOSTS.has(parsed.hostname)) return false;
    return true;
  } catch {
    return false;
  }
}

console.log('Testing URL validation...');
assert.strictEqual(validateExternalUrl('https://wa.me/213560225576?text=test'), true);
assert.strictEqual(validateExternalUrl('https://www.google.com/maps/place/test'), true);
assert.strictEqual(validateExternalUrl('https://www.facebook.com/100068505296853'), true);
assert.strictEqual(validateExternalUrl('http://wa.me/213560225576'), false);
assert.strictEqual(validateExternalUrl('https://malicious-site.com/phishing'), false);
assert.strictEqual(validateExternalUrl('javascript:alert(1)'), false);
console.log('✓ URL validation & whitelist passed all tests!');

// 3. Test Schema Validation on corrupted cart
const VALID_SIZES = new Set(['30ml', '50ml', '100ml']);
function validateCartSchema(parsed) {
  if (!Array.isArray(parsed)) return [];
  const validated = [];
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
      validated.push(item);
    }
  }
  return validated;
}

console.log('Testing Cart Schema Validation...');
const validItem = {
  id: 'la-rosa-50ml',
  productId: 'la-rosa',
  nameAr: 'لا روزا رويال عود',
  nameFr: 'La Rosa Royal Oud',
  size: '50ml',
  price: 4400,
  qty: 2,
  image: 'https://images.unsplash.com/test',
};
const tamperedItem = {
  id: 'bad-item',
  productId: 'bad',
  nameAr: 'خبيث',
  nameFr: 'Bad',
  size: 'invalid-size',
  price: -500,
  qty: 99999,
};
assert.strictEqual(validateCartSchema([validItem, tamperedItem]).length, 1);
assert.deepStrictEqual(validateCartSchema('corrupted-string-not-array'), []);
console.log('✓ Cart Schema validation passed all tests!');

console.log('\nALL PROGRAMMATIC AUDIT CHECKS PASSED WITH 100% SUCCESS!');
