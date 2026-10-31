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
      if (headerPill) headerPill.textContent = `${count} Araç`;

      // Sidebar Sayacı & Select
      const sidebarBadge = document.getElementById('sidebar-garage-count-badge');
      const sidebarSelect = document.getElementById('sidebar-garage-select');
      if (sidebarBadge) sidebarBadge.textContent = `${count} Araç`;

      if (sidebarSelect) {
        const currentVal = sidebarSelect.value;
        sidebarSelect.innerHTML = '<option value="">-- 🚗 Garajımdan Araç Seçiniz --</option>' +
          cachedGarageVehicles.map(v => `
            <option value="${escapeHtml(v.vin)}" ${currentVal === v.vin ? 'selected' : ''}>
              ${escapeHtml(v.plateNumber)} — ${escapeHtml(v.customerName)} (${escapeHtml(v.vehicleModel || 'Binek')})
            </option>
          `).join('');
      }

      // Header Dropdown Listesi
      const listContainer = document.getElementById('header-garage-vehicle-list');
      if (listContainer) {
        if (cachedGarageVehicles.length === 0) {
          listContainer.innerHTML = '<div class="text-center py-6 text-slate-400">Garajınızda henüz kayıtlı araç bulunmuyor.</div>';
        } else {
          listContainer.innerHTML = cachedGarageVehicles.map(v => `
            <div class="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50/80 border border-slate-200/90 hover:border-blue-200 transition-all cursor-pointer flex items-center justify-between group"
                 onclick="selectGarageVehicle('${escapeHtml(v.vin)}', '${escapeHtml(v.plateNumber)}', '${escapeHtml(v.customerName)}', '${escapeHtml(v.vehicleModel)}')">
              <div class="min-w-0 pr-2">
                <div class="flex items-center gap-2 mb-0.5">
                  <span class="font-mono font-black text-xs text-slate-900 bg-white px-1.5 py-0.5 rounded border border-slate-200 shadow-2xs group-hover:border-blue-300">${escapeHtml(v.plateNumber)}</span>
                  <span class="text-[11px] font-bold text-slate-700 truncate">${escapeHtml(v.customerName)}</span>
                </div>
                <div class="text-[10px] text-slate-500 font-medium truncate mb-1">🚗 ${escapeHtml(v.vehicleModel || 'Binek')}</div>
                <div class="font-mono text-[9px] text-blue-600 bg-blue-50/80 px-1.5 py-0.2 rounded inline-block font-semibold">VIN: ${escapeHtml(v.vin)}</div>
              </div>
              <button type="button" class="shrink-0 px-2.5 py-1.5 rounded-lg bg-white group-hover:bg-blue-600 text-blue-600 group-hover:text-white border border-slate-200 group-hover:border-blue-600 text-[10px] font-bold transition-all shadow-2xs">
                Sorgula ➔
              </button>
            </div>
          `).join('');
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
      showGarageFeedbackToast(`🚗 "${plate}" plakalı araç (${customerName}) seçildi. Uyumlu parçalar sorgulanıyor...`);
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
      showGarageFeedbackToast(`"${plateNumber}" plakalı araç Akıllı Garajınıza başarıyla eklendi!`);

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
          modalKitSubtitle.textContent = `"${productName}" ile birlikte değişmesi tavsiye edilen parçalar`;
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
      section.innerHTML = `
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
                    ${escapeHtml(mainProdName)} İle Uyumlu Set
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
            ${kitItems.map(k => renderSingleKitCard(k, true)).join('')}
          </div>
        </div>
      `;
    }

    // Tekil Bakım Kiti Kartı HTML Şablonu
    function renderSingleKitCard(k, isPageBottom = false) {
      const price = parseFloat(k.discountedPrice || k.unitPrice || k.defaultPrice || 500);
      const oe = k.oeNumber || 'OEM';
      const brand = k.brand || 'Orijinal';
      const name = k.name || 'Set Parçası';
      const reason = k.reason || 'İşçilik tasarrufu ve tam uyum için tavsiye edilir.';
      const laborTime = k.laborTime || '+0.3 Saat';

      return `
        <div class="min-w-[240px] max-w-[270px] bg-white rounded-2xl p-4 border border-orange-200/90 shadow-xs hover:border-orange-400 hover:shadow-md transition-all flex flex-col justify-between shrink-0">
          <div>
            <div class="flex items-center justify-between gap-1 mb-2">
              <span class="font-mono text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">${escapeHtml(oe)}</span>
              <span class="text-[10px] font-extrabold px-1.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">${escapeHtml(brand)}</span>
            </div>
            <h4 class="font-bold text-xs text-slate-900 leading-snug line-clamp-2 mb-1.5" title="${escapeHtml(name)}">${escapeHtml(name)}</h4>
            <p class="text-[10px] text-slate-500 font-medium line-clamp-2 mb-2 leading-relaxed">💡 ${escapeHtml(reason)}</p>
            <div class="inline-flex items-center gap-1 text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-md mb-2">
              <span>⏱️ ${escapeHtml(laborTime)}</span>
            </div>
          </div>

          <div class="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
            <div>
              <span class="text-xs sm:text-sm font-black text-slate-900">${price.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺</span>
            </div>
            <button type="button" class="px-3 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-xs transition-all active:scale-95 cursor-pointer flex items-center gap-1"
                    onclick="addRecommendedItemToCart('${k.id}', '${escapeHtml(name)}', ${price}, '${escapeHtml(oe)}')">
              <span>+ Ekle</span>
            </button>
          </div>
        </div>
      `;
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
      showGarageFeedbackToast(`"${name}" sepete eklendi!`);
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
      showGarageFeedbackToast(`💡 ${currentRecommendedKit.length} parçalık Bakım Kiti eksiksiz sepete eklendi!`);

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

