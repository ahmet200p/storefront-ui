// Automated test verifying product card design enlargement and seller badge
const fs = require('fs');
const path = require('path');

console.log('=== STARTING PRODUCT CARD REDESIGN VERIFICATION TESTS ===\n');

const storeHtml = fs.readFileSync(path.join(__dirname, '../store.html'), 'utf8');

// 1. TEST ADIM 1: SATICI (BAYİ) ETİKETİ
console.log('TEST 1: Verifying Seller (Bayi) Badge implementation...');
if (!storeHtml.includes('Satıcı:') || !storeHtml.includes('bg-indigo-50') || !storeHtml.includes('text-indigo-700')) {
  throw new Error('ADIM 1 FAILED: Seller badge with Tailwind styling not found in store.html!');
}
if (!storeHtml.includes('escapeHtml(seller)')) {
  throw new Error('ADIM 1 FAILED: Seller dynamic variable escapeHtml(seller) not found!');
}
console.log('PASS: Seller (Bayi) badge verified in product card template!\n');

// 2. TEST ADIM 2: GRID & GÖRSEL BOYUTLARI
console.log('TEST 2: Verifying Grid column count (lg:grid-cols-3 xl:grid-cols-3)...');
if (!storeHtml.includes('lg:grid-cols-3 xl:grid-cols-3')) {
  throw new Error('ADIM 2 FAILED: Grid container not updated to lg:grid-cols-3 xl:grid-cols-3!');
}
console.log('PASS: Grid column layout verified!\n');

console.log('TEST 3: Verifying enlarged image container (h-56 or h-60 + object-contain)...');
if (!storeHtml.includes('h-56') && !storeHtml.includes('h-60')) {
  throw new Error('ADIM 2 FAILED: Image container height not enlarged to h-56/h-60!');
}
if (!storeHtml.includes('object-contain')) {
  throw new Error('ADIM 2 FAILED: object-contain missing on product image!');
}
console.log('PASS: Enlarged image container height and object-contain verified!\n');

console.log('TEST 4: Verifying enlarged Title and Price fonts...');
if (!storeHtml.includes('text-base font-bold text-slate-900')) {
  throw new Error('ADIM 2 FAILED: Product title font not enlarged to text-base font-bold!');
}
if (!storeHtml.includes('text-lg sm:text-xl font-black')) {
  throw new Error('ADIM 2 FAILED: Price font not enlarged to text-lg sm:text-xl font-black!');
}
console.log('PASS: Enlarged title and price fonts verified!\n');

// 3. TEST DATA INTEGRATION
console.log('TEST 5: Verifying API data mapping for seller...');
global.window = global;
global.document = {
  getElementById: () => ({ value: '', textContent: '', innerHTML: '', classList: { add: () => {}, remove: () => {} }, style: {} }),
  querySelectorAll: () => [],
  addEventListener: () => {}
};
global.localStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {} };
global.sessionStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {} };

require(path.join(__dirname, '../assets/js/api.js'));

(async () => {
  const res = await window.apiFetch('/store/products');
  if (!res.success || !res.data || res.data.length === 0) {
    throw new Error('API fetch failed!');
  }
  const first = res.data[0];
  const seller = first.companyName || first.dealerName || first.sellerName || (first.user && first.user.companyName);
  if (!seller) {
    throw new Error('Seller info missing in API seed/mock data!');
  }
  console.log(`PASS: API products contain seller info: "${seller}"!\n`);

  console.log('🎉 ALL TESTS PASSED SUCCESSFULLY! Product card redesign is 100% complete.');
})().catch(err => {
  console.error(err);
  process.exit(1);
});

