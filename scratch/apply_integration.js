const fs = require('fs');

const indexHtmlPath = 'index.html';
let content = fs.readFileSync(indexHtmlPath, 'utf8');

const garageHeader = fs.readFileSync('scratch/garage_header.html', 'utf8');
const garageSidebar = fs.readFileSync('scratch/garage_sidebar.html', 'utf8');
const pageKit = fs.readFileSync('scratch/page_kit.html', 'utf8');
const modalKit = fs.readFileSync('scratch/modal_kit.html', 'utf8');
const saveGarageModal = fs.readFileSync('scratch/save_garage_modal.html', 'utf8');
const garageKitEngine = fs.readFileSync('scratch/garage_kit_engine.js', 'utf8');

// 1. Header: Add "🚗 Garajım" Button & Dropdown
const headerCartButtonTag = '<!-- Off-Canvas Sepet Açma Butonu -->';
if (content.includes(headerCartButtonTag) && !content.includes('id="btn-header-garage"')) {
  content = content.replace(headerCartButtonTag, garageHeader + '\n\n        ' + headerCartButtonTag);
  console.log('1. Header Garage button added!');
} else {
  console.log('1. Header Garage button skipped (already exists or target missing).');
}

// 2. Sidebar: Add "Akıllı Garaj (Hızlı Araç Seçimi)" Panel
const sidebarBentoTileTag = '<!-- Bento Tile 1: Araç Markaları Bento Grid';
if (content.includes(sidebarBentoTileTag) && !content.includes('id="sidebar-garage-panel"')) {
  content = content.replace(sidebarBentoTileTag, garageSidebar + '\n\n        ' + sidebarBentoTileTag);
  console.log('2. Sidebar Garage panel added!');
} else {
  console.log('2. Sidebar Garage panel skipped.');
}

// 3. Product Cards: Labor Badge in renderProductsGrid
const productReturnTarget = 'return `\n          <div class="group relative bg-white/90';
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

if (content.includes(productReturnTarget) && !content.includes('const laborTime = it.estimatedLaborTime')) {
  content = content.replace(productReturnTarget, productLaborCalculation + '\n        ' + productReturnTarget);
  console.log('3a. Product labor calculation inserted!');
}

const compatModelsTarget = "${compatibleModels ? `<div class=\"text-[11px] text-slate-500 font-medium mb-2 truncate\">🚗 ${compatibleModels}</div>` : ''}";
if (content.includes(compatModelsTarget) && !content.includes('${laborBadgeHtml}')) {
  content = content.replace(compatModelsTarget, compatModelsTarget + '\n                ${laborBadgeHtml}');
  console.log('3b. Product labor badge inserted into card template!');
}

// 4. Page Bottom Maintenance Kit Section
const emptyCatalogTarget = '<!-- 4. ADIM: BOŞ DURUM (Responsive Dynamic Spacing - Prompt Kural 4) -->';
if (content.includes(emptyCatalogTarget) && !content.includes('id="page-recommended-kit-section"')) {
  content = content.replace(emptyCatalogTarget, pageKit + '\n\n        ' + emptyCatalogTarget);
  console.log('4. Page bottom maintenance kit section added!');
} else {
  console.log('4. Page bottom maintenance kit skipped.');
}

// 5. Modal Labor Badge & Maintenance Kit Carousel
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
  console.log('5a. Modal labor badge added!');
}

const modalCrossesBlockTarget = '<!-- 2. Blok: Muadiller & Eşdeğer Parçalar (Cross-References) Karuseli -->';
if (content.includes(modalCrossesBlockTarget) && !content.includes('id="detail-kit-section"')) {
  content = content.replace(modalCrossesBlockTarget, modalKit + '\n\n        ' + modalCrossesBlockTarget);
  console.log('5b. Modal kit carousel section added!');
}

// 6. Save Garage Modal before </body>
const bodyCloseTarget = '</body>';
if (content.includes(bodyCloseTarget) && !content.includes('id="modal-save-garage"')) {
  content = content.replace(bodyCloseTarget, saveGarageModal + '\n' + bodyCloseTarget);
  console.log('5c. Save to garage modal added before </body>!');
}

// 7. Hook labor badge and kit renderer into openProductDetailModal
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

// 8. Add Garage & Kit Engine JS
const scriptEndTarget = 'window.initInactivityWatcher = initInactivityWatcher;';
if (content.includes(scriptEndTarget) && !content.includes('function loadGarageVehicles()')) {
  content = content.replace(scriptEndTarget, garageKitEngine + '\n\n    ' + scriptEndTarget);
  console.log('6b. Garage & Kit JavaScript engine added to index.html!');
}

// 9. In loadProducts, trigger maintenance kit
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

