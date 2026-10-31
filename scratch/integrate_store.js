const fs = require('fs');

const indexHtmlPath = 'index.html';
let content = fs.readFileSync(indexHtmlPath, 'utf8');

// ============================================================================
// 1. HEADER: Add "🚗 Garajım" Button & Dropdown (Prompt ADIM 2.A)
// ============================================================================
const headerCartButtonTag = '<!-- Off-Canvas Sepet Açma Butonu -->';
const headerGarageHtml = `<!-- 🚗 Garajım Butonu & Açılır Dropdown (Prompt ADIM 2.A) -->
        <div class="relative" id="header-garage-wrapper">
          <button type="button" class="group relative inline-flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer min-h-[40px] sm:min-h-[44px]" id="btn-header-garage" onclick="toggleHeaderGarageDropdown(event)" title="Kayıtlı Müşteri Araçlarım (Garajım)">
            <span class="text-sm">🚗</span>
            <span class="hidden sm:inline">Garajım</span>
            <span class="bg-white/25 text-white text-[11px] sm:text-xs font-black px-1.5 sm:px-2 py-0.5 rounded-full shadow-xs" id="header-garage-count-badge">0</span>
          </button>

          <!-- Garajım Dropdown Listesi -->
          <div class="absolute right-0 mt-2 w-80 sm:w-96 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200/90 p-4 z-50 hidden" id="header-garage-dropdown">
            <div class="flex items-center justify-between pb-3 border-b border-slate-100 mb-2">
              <div class="flex items-center gap-2">
                <span class="text-base">🚗</span>
                <span class="font-bold text-sm text-slate-900">Garajımdaki Kayıtlı Araçlar</span>
              </div>
              <span class="text-[11px] text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200" id="header-garage-pill-count">0 Araç</span>
            </div>
            <p class="text-[11px] text-slate-500 mb-2 font-medium">Plaka veya müşteriye tıklayarak şasiyi doğrudan aratın:</p>
            <div class="max-h-64 overflow-y-auto space-y-2 text-xs" id="header-garage-vehicle-list">
              <div class="text-center py-6 text-slate-400">Garajınız yükleniyor...</div>
            </div>
            <div class="pt-2.5 mt-2 border-t border-slate-100 flex justify-end">
              <button type="button" class="text-xs text-blue-600 font-bold hover:underline flex items-center gap-1" onclick="openSaveGarageModalManual()">
                <span>+ Yeni Araç Kaydet</span>
              </button>
            </div>
          </div>
        </div>

        `;

if (content.includes(headerCartButtonTag) && !content.includes('id="btn-header-garage"')) {
  content = content.replace(headerCartButtonTag, headerGarageHtml + headerCartButtonTag);
  console.log('1. Header Garage button added successfully!');
} else {
  console.log('1. Header Garage button already present or target not found.');
}

// ============================================================================
// 2. SIDEBAR: Add "Akıllı Garaj (Hızlı Araç Seçimi)" Panel (Prompt ADIM 2.B)
// ============================================================================
const sidebarBentoTileTag = '<!-- Bento Tile 1: Araç Markaları Bento Grid';
const sidebarGarageHtml = `<!-- Akıllı Garaj (Hızlı Araç Seçimi) Paneli (Prompt ADIM 2.B) -->
        <div class="bg-gradient-to-br from-blue-50/80 via-indigo-50/40 to-white backdrop-blur-md border border-blue-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl p-4 mb-4" id="sidebar-garage-panel">
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-2">
              <span class="text-base">🚗</span>
              <label class="text-[11px] font-bold uppercase tracking-wider text-blue-900" for="sidebar-garage-select">Akıllı Garaj (Hızlı Araç)</label>
            </div>
            <span class="text-[10px] bg-blue-100 text-blue-700 font-extrabold px-2 py-0.5 rounded-full border border-blue-200" id="sidebar-garage-count-badge">0 Araç</span>
          </div>
          <p class="text-[11px] text-slate-500 mb-2.5 font-medium leading-relaxed">
            Kayıtlı müşteri aracınızı seçerek uyumlu parçaları otomatik listeleyin.
          </p>
          <div class="relative">
            <select id="sidebar-garage-select" onchange="handleSidebarGarageSelect(this)" class="w-full min-h-[42px] pl-3 pr-8 py-2 bg-white hover:bg-slate-50 border border-blue-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer appearance-none shadow-xs">
              <option value="">-- 🚗 Garajımdan Araç Seçiniz --</option>
            </select>
            <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-blue-400">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>

        `;

if (content.includes(sidebarBentoTileTag) && !content.includes('id="sidebar-garage-panel"')) {
  content = content.replace(sidebarBentoTileTag, sidebarGarageHtml + sidebarBentoTileTag);
  console.log('2. Sidebar Garage panel added successfully!');
} else {
  console.log('2. Sidebar Garage panel already present or target not found.');
}

// ============================================================================
// 3. PRODUCT CARDS: Add "Tahmini İşçilik: X Saat" Badge in renderProductsGrid (Prompt ADIM 2.C)
// ============================================================================
const productCardTitleTarget = '<h3 class="font-bold text-slate-900 text-sm leading-snug line-clamp-2 group-hover:text-[var(--tenant-color)] transition-colors mb-2 cursor-pointer" onclick="openProductDetailModal(\'${tenantProductId}\')" title="${escapeHtml(productName)}">';

const productLaborCalculation = `
        const laborTime = it.estimatedLaborTime || (it.product && it.product.estimatedLaborTime) || (typeof getRecommendedTogetherAndLabor === 'function' ? getRecommendedTogetherAndLabor(productName, category, oeNumber).estimatedLaborTime : null);
        const laborBadgeHtml = (laborTime && String(laborTime).trim() !== '' && String(laborTime).toLowerCase() !== 'null') ? \`
          <div class="mt-1.5 mb-1.5">
            <span class="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200/90 shadow-2xs" title="Montaj ve Değişim İşçilik Süresi">
              <svg class="w-3.5 h-3.5 text-indigo-500 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <span>Tahmini İşçilik: \${escapeHtml(laborTime)}</span>
            </span>
          </div>
        \` : '';
`;

// Insert labor calculation right before the return ` in renderProductsGrid
const productReturnTarget = 'return `\n          <div class="group relative bg-white/90';
if (content.includes(productReturnTarget) && !content.includes('const laborTime = it.estimatedLaborTime')) {
  content = content.replace(productReturnTarget, productLaborCalculation + '\n        ' + productReturnTarget);
  console.log('3a. Product labor calculation inserted!');
}

// Insert laborBadgeHtml right below the compatibleModels in product card
const compatModelsTarget = '${compatibleModels ? `<div class="text-[11px] text-slate-500 font-medium mb-2 truncate">🚗 ${compatibleModels}</div>` : \'\'}';
if (content.includes(compatModelsTarget) && !content.includes('${laborBadgeHtml}')) {
  content = content.replace(compatModelsTarget, compatModelsTarget + '\n                ${laborBadgeHtml}');
  console.log('3b. Product labor badge inserted into card template!');
}

// ============================================================================
// 4. SAYFA ALTI ÇAPRAZ SATIŞ: "💡 Bu parçayı alanlar şunları da aldı (Bakım Kiti)" (Prompt ADIM 2.C)
// ============================================================================
const emptyCatalogTarget = '<!-- 4. ADIM: BOŞ DURUM (Responsive Dynamic Spacing - Prompt Kural 4) -->';
const pageKitSectionHtml = `<!-- Sayfa Altı Çapraz Satış: "💡 Bu parçayı alanlar şunları da aldı (Bakım Kiti)" (Prompt ADIM 2.C) -->
        <section id="page-recommended-kit-section" class="mt-8 transition-all duration-300 hidden">
          <!-- Dinamik Çapraz Satış İçeriği JS ile doldurulur -->
        </section>

        `;

if (content.includes(emptyCatalogTarget) && !content.includes('id="page-recommended-kit-section"')) {
  content = content.replace(emptyCatalogTarget, pageKitSectionHtml + emptyCatalogTarget);
  console.log('4. Page bottom maintenance kit section added successfully!');
}

// ============================================================================
// 5. PRODUCT DETAIL MODAL: Add Labor Time Badge & Maintenance Kit Carousel
// ============================================================================
// Add labor badge in modal title area
const modalTitleTarget = '<h2 id="detail-product-name" class="text-xl sm:text-2xl font-black text-slate-900 leading-snug mb-2"></h2>';
const modalLaborBadgeHtml = `<div class="mb-2">
                <span id="detail-labor-badge" class="hidden inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200/80 shadow-2xs">
                  <svg class="w-3.5 h-3.5 text-indigo-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  <span id="detail-labor-text">Tahmini İşçilik: 1.5 Saat</span>
                </span>
              </div>
              `;

if (content.includes(modalTitleTarget) && !content.includes('id="detail-labor-badge"')) {
  content = content.replace(modalTitleTarget, modalLaborBadgeHtml + modalTitleTarget);
  console.log('5a. Modal labor badge added successfully!');
}

// Add Bakım Kiti Section before 2. Blok: Muadiller in modal
const modalCrossesBlockTarget = '<!-- 2. Blok: Muadiller & Eşdeğer Parçalar (Cross-References) Karuseli -->';
const modalKitSectionHtml = `<!-- Bakım Kiti / Birlikte Alınanlar Çapraz Satış Bloğu (Prompt ADIM 2.C) -->
        <div id="detail-kit-section" class="pt-4 border-t border-zinc-100 hidden">
          <div class="flex items-center justify-between mb-3 flex-wrap gap-2">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center text-base shadow-sm">💡</div>
              <div>
                <h3 class="font-extrabold text-sm sm:text-base text-slate-900 leading-tight">Bu Parçayı Alanlar Şunları da Aldı (Bakım Kiti)</h3>
                <span class="text-[11px] text-slate-500 font-medium" id="detail-kit-subtitle">İşçilik tasarrufu için birlikte değişmesi önerilen parçalar</span>
              </div>
            </div>
            <button type="button" class="text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 px-3.5 py-2 rounded-xl shadow-xs cursor-pointer transition-all active:scale-95 flex items-center gap-1.5" onclick="addAllRecommendedToCart()">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"></path></svg>
              <span>Tüm Bakım Kitini Sepete Ekle</span>
            </button>
          </div>
          <div id="detail-kit-carousel" class="flex gap-3 overflow-x-auto pb-3 pt-1 scrollbar-thin">
            <!-- Dinamik Yatay Kaydırılabilir Kartlar -->
          </div>
        </div>

        `;

if (content.includes(modalCrossesBlockTarget) && !content.includes('id="detail-kit-section"')) {
  content = content.replace(modalCrossesBlockTarget, modalKitSectionHtml + modalCrossesBlockTarget);
  console.log('5b. Modal Maintenance kit carousel section added!');
}

// Add Save to Garage Modal HTML before </body>
const bodyCloseTarget = '</body>';
const saveGarageModalHtml = `
  <!-- ==========================================================================
       GARAJA ARAÇ EKLEME MODALI (Prompt ADIM 2.A & 2.B Destekleyici)
       ========================================================================== -->
  <div id="modal-save-garage-backdrop" class="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 hidden transition-all duration-300" onclick="closeSaveGarageModal()"></div>
  <div id="modal-save-garage" class="fixed inset-0 z-50 flex items-center justify-center p-4 hidden pointer-events-none">
    <div class="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden pointer-events-auto transform transition-all duration-200" onclick="event.stopPropagation()">
      <div class="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
        <div class="flex items-center gap-2.5">
          <div class="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center text-lg">🚗</div>
          <div>
            <h3 class="text-base font-extrabold text-slate-900">Aracı Garajıma Kaydet</h3>
            <p class="text-[11px] text-slate-500 font-medium">Hızlı parça sorgulamak için garaj listenize ekleyin</p>
          </div>
        </div>
        <button type="button" class="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm font-bold cursor-pointer" onclick="closeSaveGarageModal()">&times;</button>
      </div>

      <form id="form-save-garage-manual" onsubmit="submitSaveGarageManual(event)" class="p-6 space-y-3.5">
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1" for="modal-garage-cust-name">Müşteri / Servis Adı <span class="text-rose-500">*</span></label>
          <input type="text" id="modal-garage-cust-name" required placeholder="Örn: Ahmet Usta / Demir Otomotiv" class="w-full h-11 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1" for="modal-garage-plate">Araç Plakası <span class="text-rose-500">*</span></label>
          <input type="text" id="modal-garage-plate" required placeholder="Örn: 34 KL 4821" class="w-full h-11 px-3.5 uppercase font-mono font-bold bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1" for="modal-garage-vin">Şasi Numarası (VIN)</label>
          <input type="text" id="modal-garage-vin" placeholder="Örn: VF15R040H52814321" class="w-full h-11 px-3.5 uppercase font-mono font-bold bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1" for="modal-garage-model">Araç Marka & Model</label>
          <input type="text" id="modal-garage-model" placeholder="Örn: Renault Megane IV 1.5 dCi" class="w-full h-11 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
        </div>

        <div class="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
          <button type="button" class="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer" onclick="closeSaveGarageModal()">Vazgeç</button>
          <button type="submit" id="btn-submit-save-garage" class="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer">Garajıma Ekle</button>
        </div>
      </form>
    </div>
  </div>
`;

if (content.includes(bodyCloseTarget) && !content.includes('id="modal-save-garage"')) {
  content = content.replace(bodyCloseTarget, saveGarageModalHtml + '\n' + bodyCloseTarget);
  console.log('5c. Save to garage modal added before </body>!');
}

// ============================================================================
// 6. JAVASCRIPT: Garage Engine, Kit Engine & Product Detail Integration
// ============================================================================
// In openProductDetailModal, update the labor badge & call maintenance kit renderer
const detailModalLaborHookTarget = 'const titleEl = document.getElementById(\'detail-product-name\');';
const detailModalLaborHook = `
      // Tahmini İşçilik Rozeti Güncellemesi (Prompt ADIM 2.C)
      const detailLaborBadge = document.getElementById('detail-labor-badge');
      const detailLaborText = document.getElementById('detail-labor-text');
      const modalLaborTime = prod.estimatedLaborTime || item.estimatedLaborTime || (typeof getRecommendedTogetherAndLabor === 'function' ? getRecommendedTogetherAndLabor(productName, category, oeNumber).estimatedLaborTime : null);
      if (detailLaborBadge && detailLaborText) {
        if (modalLaborTime && String(modalLaborTime).trim() !== '' && String(modalLaborTime).toLowerCase() !== 'null') {
          detailLaborText.textContent = \`Tahmini İşçilik: \${modalLaborTime}\`;
          detailLaborBadge.classList.remove('hidden');
          detailLaborBadge.classList.add('inline-flex');
        } else {
          detailLaborBadge.classList.add('hidden');
          detailLaborBadge.classList.remove('inline-flex');
        }
      }

      // Bakım Kiti / Çapraz Satış Güncellemesi (Prompt ADIM 2.C)
      if (typeof renderProductMaintenanceKit === 'function') {
        renderProductMaintenanceKit(prod, item);
      }
`;

if (content.includes(detailModalLaborHookTarget) && !content.includes('detailLaborText.textContent = `Tahmini İşçilik:')) {
  content = content.replace(detailModalLaborHookTarget, detailModalLaborHook + '\n      ' + detailModalLaborHookTarget);
  console.log('6a. Modal labor badge & maintenance kit hook added to openProductDetailModal!');
}

// Add the garage & kit script block at the end of the script before </script>
const scriptEndTarget = 'window.initInactivityWatcher = initInactivityWatcher;';
const garageKitEngineJs = `
    // =========================================================================
    // AKILLI GARAJ & BAKIM KİTİ MOTORU (Prompt ADIM 2.A, 2.B, 2.C)
    // =========================================================================
    let cachedGarageVehicles = [];
    let currentRecommendedKit = [];
    let currentMainKitProductName = '';

    // 1. GARAJ ARAÇLARINI YÜKLE & SENKRONİZE ET (ADIM 2.A & 2.B)
    async function loadGarageVehicles() {
      try {
        let vehicles = [];
        if (typeof apiFetch === 'function') {
          const res = await apiFetch('/garage/vehicles');
          if (res && res.success && Array.isArray(res.data)) {
            vehicles = res.data;
          }
        }

        // Çevrimdışı / İlk Açılış Yedek Tohum Araçlar
        if (!vehicles || vehicles.length === 0) {
          vehicles = [
            {
              id: 'grg-1',
              plateNumber: '34 KL 4821',
              customerName: 'Ahmet Usta (Demir Nakliyat)',
              vin: 'VF15R040H52814321',
              vehicleModel: 'Renault Megane IV 1.5 dCi (2020)',
              vehicleBrand: 'Renault'
            },
            {
              id: 'grg-2',
              plateNumber: '06 BT 992',
              customerName: 'Ali Yılmaz (Öz Ticaret)',
              vin: 'WVWZZZAUZHP129841',
              vehicleModel: 'Volkswagen Golf 7 1.6 TDI (2019)',
              vehicleBrand: 'Volkswagen'
            },
            {
              id: 'grg-3',
              plateNumber: '35 FZ 104',
              customerName: 'Hasan Kaya (Kaya Lojistik)',
              vin: 'ZFA35600006781290',
              vehicleModel: 'Fiat Egea 1.3 Multijet (2021)',
              vehicleBrand: 'Fiat'
            },
            {
              id: 'grg-4',
              plateNumber: '16 BUR 77',
              customerName: 'Murat Usta (Bursa Oto Servis)',
              vin: 'WF0DXXGAKDJP18231',
              vehicleModel: 'Ford Focus 1.5 TDCi (2018)',
              vehicleBrand: 'Ford'
            }
          ];
        }

        cachedGarageVehicles = vehicles;
        renderGarageDropdowns();
      } catch (err) {
        console.error('[LOAD_GARAGE_ERROR]:', err);
      }
    }

    // Garaj dropdown ve sayaçlarını güncelle
    function renderGarageDropdowns() {
      const count = cachedGarageVehicles.length;

      // Header Sayaçları
      const headerBadge = document.getElementById('header-garage-count-badge');
      const headerPill = document.getElementById('header-garage-pill-count');
      if (headerBadge) headerBadge.textContent = String(count);
      if (headerPill) headerPill.textContent = \`\${count} Araç\`;

      // Sidebar Sayacı & Select
      const sidebarBadge = document.getElementById('sidebar-garage-count-badge');
      const sidebarSelect = document.getElementById('sidebar-garage-select');
      if (sidebarBadge) sidebarBadge.textContent = \`\${count} Araç\`;

      if (sidebarSelect) {
        const currentVal = sidebarSelect.value;
        sidebarSelect.innerHTML = '<option value="">-- 🚗 Garajımdan Araç Seçiniz --</option>' +
          cachedGarageVehicles.map(v => \`
            <option value="\${escapeHtml(v.vin)}" \${currentVal === v.vin ? 'selected' : ''}>
              \${escapeHtml(v.plateNumber)} — \${escapeHtml(v.customerName)} (\${escapeHtml(v.vehicleModel || 'Binek')})
            </option>
          \`).join('');
      }

      // Header Dropdown Listesi
      const listContainer = document.getElementById('header-garage-vehicle-list');
      if (listContainer) {
        if (cachedGarageVehicles.length === 0) {
          listContainer.innerHTML = '<div class="text-center py-6 text-slate-400">Garajınızda henüz kayıtlı araç bulunmuyor.</div>';
        } else {
          listContainer.innerHTML = cachedGarageVehicles.map(v => \`
            <div class="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50/80 border border-slate-200/90 hover:border-blue-200 transition-all cursor-pointer flex items-center justify-between group"
                 onclick="selectGarageVehicle('\${escapeHtml(v.vin)}', '\${escapeHtml(v.plateNumber)}', '\${escapeHtml(v.customerName)}', '\${escapeHtml(v.vehicleModel)}')">
              <div class="min-w-0 pr-2">
                <div class="flex items-center gap-2 mb-0.5">
                  <span class="font-mono font-black text-xs text-slate-900 bg-white px-1.5 py-0.5 rounded border border-slate-200 shadow-2xs group-hover:border-blue-300">\${escapeHtml(v.plateNumber)}</span>
                  <span class="text-[11px] font-bold text-slate-700 truncate">\${escapeHtml(v.customerName)}</span>
                </div>
                <div class="text-[10px] text-slate-500 font-medium truncate mb-1">🚗 \${escapeHtml(v.vehicleModel || 'Binek')}</div>
                <div class="font-mono text-[9px] text-blue-600 bg-blue-50/80 px-1.5 py-0.2 rounded inline-block font-semibold">VIN: \${escapeHtml(v.vin)}</div>
              </div>
              <button type="button" class="shrink-0 px-2.5 py-1.5 rounded-lg bg-white group-hover:bg-blue-600 text-blue-600 group-hover:text-white border border-slate-200 group-hover:border-blue-600 text-[10px] font-bold transition-all shadow-2xs">
                Sorgula ➔
              </button>
            </div>
          \`).join('');
        }
      }
    }

    // Header Garajım Dropdown Aç/Kapa
    function toggleHeaderGarageDropdown(e) {
      if (e) e.stopPropagation();
      const dropdown = document.getElementById('header-garage-dropdown');
      if (dropdown) dropdown.classList.toggle('hidden');
    }

    function closeHeaderGarageDropdown() {
      const dropdown = document.getElementById('header-garage-dropdown');
      if (dropdown) dropdown.classList.add('hidden');
    }

    // Garajdan Araç Seçildiğinde Şasiyi Arama Kutusuna Aktar & Otomatik Sorgula (Prompt ADIM 2.A & 2.B)
    function selectGarageVehicle(vin, plate, customerName, vehicleModel) {
      closeHeaderGarageDropdown();

      const searchInput = document.getElementById('store-search-input');
      const searchTypeSelect = document.getElementById('search-type-select');
      const sidebarSelect = document.getElementById('sidebar-garage-select');

      if (searchTypeSelect) {
        searchTypeSelect.value = 'vin';
      }
      if (searchInput) {
        searchInput.value = vin;
      }
      if (sidebarSelect) {
        sidebarSelect.value = vin;
      }

      // Aramayı doğrudan tetikle (Prompt Kuralı)
      if (typeof handleSearchSubmit === 'function') {
        handleSearchSubmit();
      }

      // Kullanıcıya şık bilgilendirme bildirimi
      showGarageFeedbackToast(\`🚗 "\${plate}" plakalı araç (\${customerName}) seçildi. Uyumlu parçalar sorgulanıyor...\`);
    }

    // Sidebar Garaj Dropdown Değişimi (Prompt ADIM 2.B)
    function handleSidebarGarageSelect(selectEl) {
      const vin = (selectEl.value || '').trim();
      if (!vin) return;

      const vehicle = cachedGarageVehicles.find(v => v.vin === vin);
      const plate = vehicle ? vehicle.plateNumber : '';
      const name = vehicle ? vehicle.customerName : '';
      const model = vehicle ? vehicle.vehicleModel : '';

      selectGarageVehicle(vin, plate, name, model);
    }

    // Garaj Bildirim Toast
    function showGarageFeedbackToast(msg) {
      if (typeof Swal !== 'undefined' && Swal.fire) {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: msg,
          showConfirmButton: false,
          timer: 3500,
          timerProgressBar: true
        });
      } else {
        console.log('[GARAGE]:', msg);
      }
    }

    // Garaja Manuel Araç Ekleme Modalı Kontrolleri
    function openSaveGarageModalManual(prefillVin, prefillModel) {
      closeHeaderGarageDropdown();
      const modal = document.getElementById('modal-save-garage');
      const backdrop = document.getElementById('modal-save-garage-backdrop');
      if (modal) modal.classList.remove('hidden');
      if (backdrop) backdrop.classList.remove('hidden');

      if (prefillVin) {
        const vinInput = document.getElementById('modal-garage-vin');
        if (vinInput) vinInput.value = prefillVin;
      }
      if (prefillModel) {
        const modelInput = document.getElementById('modal-garage-model');
        if (modelInput) modelInput.value = prefillModel;
      }
    }

    function closeSaveGarageModal() {
      const modal = document.getElementById('modal-save-garage');
      const backdrop = document.getElementById('modal-save-garage-backdrop');
      if (modal) modal.classList.add('hidden');
      if (backdrop) backdrop.classList.add('hidden');
    }

    async function submitSaveGarageManual(e) {
      e.preventDefault();
      const nameInput = document.getElementById('modal-garage-cust-name');
      const plateInput = document.getElementById('modal-garage-plate');
      const vinInput = document.getElementById('modal-garage-vin');
      const modelInput = document.getElementById('modal-garage-model');

      const customerName = nameInput ? nameInput.value.trim() : '';
      const plateNumber = plateInput ? plateInput.value.trim().toUpperCase() : '';
      const vin = vinInput ? vinInput.value.trim().toUpperCase() : '';
      const vehicleModel = modelInput ? modelInput.value.trim() : 'Binek Araç';

      if (!customerName || !plateNumber) {
        alert('Lütfen Müşteri Adı ve Plaka alanlarını doldurunuz.');
        return;
      }

      const newVehicle = {
        id: 'grg-' + Date.now().toString(36),
        customerName,
        plateNumber,
        vin: vin || 'VF15R040H' + Math.floor(1000000 + Math.random() * 9000000),
        vehicleModel: vehicleModel || 'Binek Araç',
        createdAt: new Date().toISOString()
      };

      try {
        if (typeof apiFetch === 'function') {
          await apiFetch('/garage/vehicles', {
            method: 'POST',
            body: newVehicle
          });
        }
      } catch (err) {
        console.warn('apiFetch save garage offline:', err);
      }

      cachedGarageVehicles.unshift(newVehicle);
      renderGarageDropdowns();
      closeSaveGarageModal();
      showGarageFeedbackToast(\`"${plateNumber}" plakalı araç Akıllı Garajınıza başarıyla eklendi!\`);

      if (nameInput) nameInput.value = '';
      if (plateInput) plateInput.value = '';
      if (vinInput) vinInput.value = '';
      if (modelInput) modelInput.value = '';
    }

    // 2. ÇAPRAZ SATIŞ / BAKIM KİTİ MOTORU (Prompt ADIM 2.C)
    // Ürün tıklandığında veya detayına girildiğinde sayfa altına ve modal içine yatay kaydırılabilir kit basar
    function renderProductMaintenanceKit(prod, item) {
      if (!prod) return;

      const productName = prod.name || (item && item.name) || 'Parça';
      const category = prod.category || (item && item.category) || 'Otomotiv';
      const oeNumber = prod.oeNumber || (item && item.oeNumber) || '';

      let kitItems = prod.recommendedTogether || (item && item.recommendedTogether);
      if (!Array.isArray(kitItems) || kitItems.length === 0) {
        if (typeof getRecommendedTogetherAndLabor === 'function') {
          const res = getRecommendedTogetherAndLabor(productName, category, oeNumber);
          kitItems = res.recommendedTogether;
        }
      }

      if (!Array.isArray(kitItems) || kitItems.length === 0) {
        // Fallback popüler bakım seti
        kitItems = [
          {
            id: 'rec-oil-std',
            name: '5W-30 Tam Sentetik Motor Yağı (4 Litre)',
            oeNumber: 'CASTROL-5W30',
            brand: 'CASTROL EDGE',
            discountedPrice: 950,
            defaultPrice: 1200,
            laborTime: '+15 Dk',
            reason: 'Periyodik değişimde maksimum motor ömrü ve koruma sağlar.'
          },
          {
            id: 'rec-filter-oil',
            name: 'Yağ Filtresi Kartuş Tipi',
            oeNumber: '152085758R',
            brand: 'MANN-FILTER',
            discountedPrice: 190,
            defaultPrice: 240,
            laborTime: '+10 Dk',
            reason: 'Yağ değişimi sırasında filtre mutlaka yenilenmelidir.'
          },
          {
            id: 'rec-filter-air',
            name: 'Kuru Tip Hava Filtresi',
            oeNumber: '165467674R',
            brand: 'FILTRON',
            discountedPrice: 220,
            defaultPrice: 280,
            laborTime: '+5 Dk',
            reason: 'Motorun temiz hava alması için aynı periyotta değişir.'
          }
        ];
      }

      currentRecommendedKit = kitItems;
      currentMainKitProductName = productName;

      // 1. Modal içindeki Karusel
      const modalKitSection = document.getElementById('detail-kit-section');
      const modalKitCarousel = document.getElementById('detail-kit-carousel');
      const modalKitSubtitle = document.getElementById('detail-kit-subtitle');

      if (modalKitSection && modalKitCarousel) {
        modalKitSection.classList.remove('hidden');
        if (modalKitSubtitle) {
          modalKitSubtitle.textContent = \`"\${productName}" ile birlikte değişmesi tavsiye edilen parçalar\`;
        }
        modalKitCarousel.innerHTML = kitItems.map(k => renderSingleKitCard(k)).join('');
      }

      // 2. Sayfa Altındaki Yatay Kaydırılabilir Alan (Prompt ADIM 2.C)
      renderPageBottomRecommendedKit(productName, kitItems);
    }

    // Sayfa altı yatay kaydırılabilir "Bu parçayı alanlar şunları da aldı" bölümü
    function renderPageBottomRecommendedKit(mainProdName, kitItems) {
      const section = document.getElementById('page-recommended-kit-section');
      if (!section) return;

      if (!kitItems || kitItems.length === 0) {
        section.classList.add('hidden');
        section.innerHTML = '';
        return;
      }

      section.classList.remove('hidden');
      section.innerHTML = \`
        <div class="w-full bg-gradient-to-br from-amber-50/90 via-orange-50/60 to-amber-100/70 border-2 border-orange-300/80 rounded-3xl p-5 sm:p-6 shadow-[0_10px_30px_rgba(249,115,22,0.08)] overflow-hidden">
          <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-orange-200/90">
            <div class="flex items-center gap-3.5">
              <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 text-white flex items-center justify-center font-bold text-2xl shadow-md shadow-orange-500/25 shrink-0">
                💡
              </div>
              <div>
                <div class="flex items-center gap-2 flex-wrap">
                  <h2 class="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                    💡 Bu parçayı alanlar şunları da aldı (Bakım Kiti)
                  </h2>
                  <span class="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-orange-200 text-orange-950 border border-orange-300">
                    \${escapeHtml(mainProdName)} İle Uyumlu Set
                  </span>
                </div>
                <p class="text-xs sm:text-sm text-orange-950 font-medium mt-0.5">
                  Aracı tekrar lifte kaldırmadan işçilikten tasarruf edin; parça değişiminde eksiksiz bakım kiti uygulayın.
                </p>
              </div>
            </div>

            <button type="button" onclick="addAllRecommendedToCart()"
              class="w-full md:w-auto min-h-[44px] px-5 py-2.5 bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 hover:from-orange-700 hover:to-amber-700 active:scale-[0.98] text-white font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition duration-150 shrink-0 cursor-pointer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span>Tüm Bakım Kitini Birlikte Al</span>
            </button>
          </div>

          <!-- Yatay Kaydırılabilir Kartlar -->
          <div class="flex gap-4 overflow-x-auto pt-4 pb-2 scrollbar-thin">
            \${kitItems.map(k => renderSingleKitCard(k, true)).join('')}
          </div>
        </div>
      \`;
    }

    // Tekil Bakım Kiti Kartı HTML Şablonu
    function renderSingleKitCard(k, isPageBottom = false) {
      const price = parseFloat(k.discountedPrice || k.unitPrice || k.defaultPrice || 500);
      const oe = k.oeNumber || 'OEM';
      const brand = k.brand || 'Orijinal';
      const name = k.name || 'Set Parçası';
      const reason = k.reason || 'İşçilik tasarrufu ve tam uyum için tavsiye edilir.';
      const laborTime = k.laborTime || '+0.3 Saat';

      return \`
        <div class="min-w-[240px] max-w-[270px] bg-white rounded-2xl p-4 border border-orange-200/90 shadow-xs hover:border-orange-400 hover:shadow-md transition-all flex flex-col justify-between shrink-0">
          <div>
            <div class="flex items-center justify-between gap-1 mb-2">
              <span class="font-mono text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">\${escapeHtml(oe)}</span>
              <span class="text-[10px] font-extrabold px-1.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">\${escapeHtml(brand)}</span>
            </div>
            <h4 class="font-bold text-xs text-slate-900 leading-snug line-clamp-2 mb-1.5" title="\${escapeHtml(name)}">\${escapeHtml(name)}</h4>
            <p class="text-[10px] text-slate-500 font-medium line-clamp-2 mb-2 leading-relaxed">💡 \${escapeHtml(reason)}</p>
            <div class="inline-flex items-center gap-1 text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-md mb-2">
              <span>⏱️ \${escapeHtml(laborTime)}</span>
            </div>
          </div>

          <div class="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
            <div>
              <span class="text-xs sm:text-sm font-black text-slate-900">\${price.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺</span>
            </div>
            <button type="button" class="px-3 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-xs transition-all active:scale-95 cursor-pointer flex items-center gap-1"
                    onclick="addRecommendedItemToCart('\${k.id}', '\${escapeHtml(name)}', \${price}, '\${escapeHtml(oe)}')">
              <span>+ Ekle</span>
            </button>
          </div>
        </div>
      \`;
    }

    // Tek bir tavsiye parçasını sepete ekle
    function addRecommendedItemToCart(itemId, name, price, oe) {
      if (typeof handleAddToCartClick === 'function') {
        handleAddToCartClick(itemId, oe, name, price, price, 99, '');
      } else {
        cart.push({
          tenantProductId: itemId,
          oeNumber: oe,
          name: name,
          listPrice: price,
          price: price,
          discountedPrice: price,
          qty: 1,
          maxStock: 99,
          imageUrl: ''
        });
        saveCartToStorage();
      }
      showGarageFeedbackToast(\`"\${name}" sepete eklendi!\`);
    }

    // Tüm bakım setini birlikte sepete ekle (Prompt ADIM 2.C)
    function addAllRecommendedToCart() {
      if (!currentRecommendedKit || currentRecommendedKit.length === 0) {
        showGarageFeedbackToast('Eklemeye uygun bakım kiti parçası bulunamadı.');
        return;
      }

      currentRecommendedKit.forEach(item => {
        const price = parseFloat(item.discountedPrice || item.unitPrice || item.defaultPrice || 500);
        const oe = item.oeNumber || 'OEM';
        const name = item.name || 'Set Parçası';

        const existing = cart.find(c => c.tenantProductId === item.id || (c.oeNumber && c.oeNumber === oe));
        if (existing) {
          existing.qty = (parseInt(existing.qty, 10) || 1) + 1;
        } else {
          cart.push({
            tenantProductId: item.id || 'rec-' + Date.now().toString(36),
            oeNumber: oe,
            name: name,
            listPrice: price,
            price: price,
            discountedPrice: price,
            qty: 1,
            maxStock: 99,
            imageUrl: ''
          });
        }
      });

      saveCartToStorage();
      showGarageFeedbackToast(\`💡 \${currentRecommendedKit.length} parçalık Bakım Kiti eksiksiz sepete eklendi!\`);

      // Sepet çekmecesini aç
      if (typeof openCartDrawer === 'function') {
        setTimeout(openCartDrawer, 300);
      }
    }

    // Dış tıklamada header garaj dropdown'unu kapat
    document.addEventListener('click', function(evt) {
      const wrapper = document.getElementById('header-garage-wrapper');
      if (wrapper && !wrapper.contains(evt.target)) {
        closeHeaderGarageDropdown();
      }
    });

    // Açılışta Garajı Yükle
    document.addEventListener('DOMContentLoaded', function() {
      loadGarageVehicles();
    });
`;

if (content.includes(scriptEndTarget) && !content.includes('loadGarageVehicles')) {
  content = content.replace(scriptEndTarget, garageKitEngineJs + '\n    ' + scriptEndTarget);
  console.log('6b. Garage & Kit JavaScript engine added to index.html!');
}

// In loadProducts, after renderProductsGrid, also render default maintenance kit if available
const loadProductsGridCallTarget = 'renderProductsGrid();\n      } catch (err) {';
const loadProductsKitHook = `renderProductsGrid();
        // Sayfa ilk yüklendiğinde veya arama yapıldığında bakım kitini tetikle
        if (allProducts && allProducts.length > 0 && typeof renderProductMaintenanceKit === 'function') {
          const firstWithKit = allProducts.find(p => (p.recommendedTogether && p.recommendedTogether.length > 0) || (p.product && p.product.recommendedTogether && p.product.recommendedTogether.length > 0)) || allProducts[0];
          if (firstWithKit) {
            renderProductMaintenanceKit(firstWithKit.product || firstWithKit, firstWithKit);
          }
        }`;

if (content.includes(loadProductsGridCallTarget)) {
  content = content.replace(loadProductsGridCallTarget, loadProductsKitHook + '\n      } catch (err) {');
  console.log('6c. loadProducts maintenance kit trigger hooked!');
}

fs.writeFileSync(indexHtmlPath, content, 'utf8');
console.log('index.html updated successfully!');

