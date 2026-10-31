const fs = require('fs');
const filePath = 'assets/js/api.js';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add getRecommendedTogetherAndLabor function if not present
if (!content.includes('function getRecommendedTogetherAndLabor')) {
  const helperCode = `
  // =========================================================================
  // Birlikte Alınanlar (Cross-Sell / Bakım Kiti) ve Tahmini İşçilik Süresi Motoru (Prompt.md Modül 2 & 3)
  // =========================================================================
  function getRecommendedTogetherAndLabor(name, group, oeCode) {
    const combined = \`\${name || ''} \${group || ''} \${oeCode || ''}\`.toLowerCase();

    // 1. Triger / Sente / Zamanlama Mekanizması
    if (combined.includes('triger') || combined.includes('sente') || combined.includes('zamanlama') || combined.includes('130c15339r')) {
      return {
        estimatedLaborTime: '2.5 Saat',
        recommendedTogether: [
          {
            id: 'rec-wp',
            tenantProductId: 'rec-wp',
            name: 'Devirdaim Su Pompası (Metal Yüksek Debi Çark)',
            oeNumber: '210100495R',
            brand: 'VALEO',
            defaultPrice: 1500,
            unitPrice: 1200,
            discountedPrice: 1200,
            laborTime: '+0.5 Saat',
            reason: 'Triger değişirken devirdaim sökülür; işçilik tasarrufu için birlikte değişmelidir.'
          },
          {
            id: 'rec-vbelt',
            tenantProductId: 'rec-vbelt',
            name: 'V Kayışı (Alternatör Kayışı 6PK1200)',
            oeNumber: '7701477028',
            brand: 'GATES',
            defaultPrice: 400,
            unitPrice: 320,
            discountedPrice: 320,
            laborTime: '+0.2 Saat',
            reason: 'Triger seti söküldüğünde V kayışı da doğrudan serbest kalır.'
          },
          {
            id: 'rec-antifreeze',
            tenantProductId: 'rec-antifreeze',
            name: 'Organik Kırmızı Antifriz Konsantre -37°C (3 Litre)',
            oeNumber: 'AFS-ANT-03',
            brand: 'CASTROL',
            defaultPrice: 350,
            unitPrice: 280,
            discountedPrice: 280,
            laborTime: '+0.1 Saat',
            reason: 'Devirdaim su pompası yenilendiğinde soğutma suyu tamamen tazelenmelidir.'
          }
        ]
      };
    }

    // 2. Fren Balatası / Disk / Kaliper
    if (combined.includes('fren') || combined.includes('balata') || combined.includes('disk') || combined.includes('410601241r')) {
      return {
        estimatedLaborTime: '1 Saat',
        recommendedTogether: [
          {
            id: 'rec-disc',
            tenantProductId: 'rec-disc',
            name: 'Ön Fren Diski Havalandırmalı (280mm Takım)',
            oeNumber: '402060010R',
            brand: 'TRW',
            defaultPrice: 1800,
            unitPrice: 1440,
            discountedPrice: 1440,
            laborTime: '+0.4 Saat',
            reason: 'Aşınmış diske yeni balata takıldığında ötme ve erken aşınma yaşanır.'
          },
          {
            id: 'rec-dot4',
            tenantProductId: 'rec-dot4',
            name: 'DOT-4 Sentetik Fren Hidrolik Sıvısı 500ml',
            oeNumber: 'AFS-DOT4-500',
            brand: 'BREMBO',
            defaultPrice: 200,
            unitPrice: 160,
            discountedPrice: 160,
            laborTime: '+0.2 Saat',
            reason: 'Kaliper pistonları geriye itildiğinde hidrolik basınç ve seviye yenilenmelidir.'
          },
          {
            id: 'rec-spray',
            tenantProductId: 'rec-spray',
            name: 'Balata & Fren Parça Temizleme Spreyi 500ml',
            oeNumber: 'AFS-SPR-500',
            brand: 'WÜRTH',
            defaultPrice: 120,
            unitPrice: 95,
            discountedPrice: 95,
            laborTime: '+0.1 Saat',
            reason: 'Kumpas yuvalarındaki balata tozları ve pası temizlemek için kullanılır.'
          }
        ]
      };
    }

    // 3. Yağ & Filtre Bakım Seti
    if (combined.includes('filtre') || combined.includes('yağ') || combined.includes('yag') || combined.includes('8200768913')) {
      return {
        estimatedLaborTime: '45 Dk',
        recommendedTogether: [
          {
            id: 'rec-air',
            tenantProductId: 'rec-air',
            name: 'Hava Filtresi Paneli',
            oeNumber: '165467674R',
            brand: 'MANN-FILTER',
            defaultPrice: 280,
            unitPrice: 220,
            discountedPrice: 220,
            laborTime: '+15 Dk',
            reason: 'Periyodik bakımda motor ömrü için hava filtresi yağla birlikte değişmelidir.'
          },
          {
            id: 'rec-cabin',
            tenantProductId: 'rec-cabin',
            name: 'Karbonlu Polen Kabin Filtresi',
            oeNumber: '272778970R',
            brand: 'FILTRON',
            defaultPrice: 320,
            unitPrice: 250,
            discountedPrice: 250,
            laborTime: '+15 Dk',
            reason: 'Klima havasının temizliği ve koku önleme için periyodik değişimi önerilir.'
          },
          {
            id: 'rec-oil',
            tenantProductId: 'rec-oil',
            name: '5W-30 C3 Tam Sentetik Motor Yağı (5 Litre)',
            oeNumber: 'AFS-OIL-5W30',
            brand: 'ELF EVOLUTION',
            defaultPrice: 1250,
            unitPrice: 990,
            discountedPrice: 990,
            laborTime: '+20 Dk',
            reason: 'DPF uyumlu tam sentetik motor yağı dolumu.'
          }
        ]
      };
    }

    // 4. Amortisör & Süspansiyon
    if (combined.includes('amortisör') || combined.includes('amortisor') || combined.includes('yay') || combined.includes('salıncak') || combined.includes('543028126r')) {
      return {
        estimatedLaborTime: '2 Saat',
        recommendedTogether: [
          {
            id: 'rec-mount',
            tenantProductId: 'rec-mount',
            name: 'Ön Amortisör Üst Takozu & Bilyası',
            oeNumber: '543A08126R',
            brand: 'SNR',
            defaultPrice: 520,
            unitPrice: 410,
            discountedPrice: 410,
            laborTime: '+0.5 Saat',
            reason: 'Amortisör sökülmüşken takoz ve bilyanın değişmesi direksiyon sertliğini önler.'
          },
          {
            id: 'rec-zrot',
            tenantProductId: 'rec-zrot',
            name: 'Ön Viraj Askı Rotu (Z-Rot Sol/Sağ)',
            oeNumber: '546182198R',
            brand: 'TRW',
            defaultPrice: 300,
            unitPrice: 240,
            discountedPrice: 240,
            laborTime: '+0.2 Saat',
            reason: 'Süspansiyon yenilemede rot başları ve Z-rotlar birlikte kontrol edilmelidir.'
          }
        ]
      };
    }

    // 5. Devirdaim / Soğutma
    if (combined.includes('devirdaim') || combined.includes('termostat') || combined.includes('radyatör') || combined.includes('radyator')) {
      return {
        estimatedLaborTime: '1.5 Saat',
        recommendedTogether: [
          {
            id: 'rec-antifreeze-c',
            tenantProductId: 'rec-antifreeze-c',
            name: 'Organik Kırmızı Antifriz Konsantre -37°C (3 Litre)',
            oeNumber: 'AFS-ANT-03',
            brand: 'CASTROL',
            defaultPrice: 350,
            unitPrice: 280,
            discountedPrice: 280,
            laborTime: '+0.1 Saat',
            reason: 'Soğutma sistemi açıldığında antifrizli su yenilenmelidir.'
          }
        ]
      };
    }

    // Varsayılan
    return {
      estimatedLaborTime: '1 Saat',
      recommendedTogether: []
    };
  }
`;
  // Place before handleMockApi function
  content = content.replace('function handleMockApi(endpoint, options)', helperCode + '\n  function handleMockApi(endpoint, options)');
  console.log('Added helperCode to api.js');
}

// 2. Add garage mock endpoints to handleMockApi
if (!content.includes('/garage/vehicles')) {
  const garageCode = `
    // =========================================================================
    // 10d. AKILLI GARAJ (MY GARAGE) YÖNETİMİ (Prompt Modül 1 & 2)
    // =========================================================================

    // GET /garage/vehicles & GET /garage
    if ((cleanEndpoint === '/garage/vehicles' || cleanEndpoint === '/garage') && method === 'GET') {
      if (!store.garageVehicles || store.garageVehicles.length === 0) {
        store.garageVehicles = [
          {
            id: 'grg-1',
            plateNumber: '34 KL 4821',
            customerName: 'Ahmet Usta (Demir Nakliyat)',
            vin: 'VF15R040H52814321',
            vehicleModel: 'Renault Megane IV 1.5 dCi (2020)',
            vehicleBrand: 'Renault',
            createdAt: '2026-10-15T09:30:00.000Z'
          },
          {
            id: 'grg-2',
            plateNumber: '06 BT 992',
            customerName: 'Ali Yılmaz (Öz Ticaret)',
            vin: 'WVWZZZAUZHP129841',
            vehicleModel: 'Volkswagen Golf 7 1.6 TDI (2019)',
            vehicleBrand: 'Volkswagen',
            createdAt: '2026-10-22T14:15:00.000Z'
          },
          {
            id: 'grg-3',
            plateNumber: '35 FZ 104',
            customerName: 'Hasan Kaya (Kaya Lojistik)',
            vin: 'ZFA35600006781290',
            vehicleModel: 'Fiat Egea 1.3 Multijet (2021)',
            vehicleBrand: 'Fiat',
            createdAt: '2026-10-28T11:00:00.000Z'
          },
          {
            id: 'grg-4',
            plateNumber: '16 BUR 77',
            customerName: 'Murat Usta (Bursa Oto Servis)',
            vin: 'WF0DXXGAKDJP18231',
            vehicleModel: 'Ford Focus 1.5 TDCi (2018)',
            vehicleBrand: 'Ford',
            createdAt: '2026-10-29T16:00:00.000Z'
          }
        ];
        saveMockStore(store);
      }
      return {
        success: true,
        count: store.garageVehicles.length,
        data: store.garageVehicles
      };
    }

    // POST /garage/vehicles & POST /garage
    if ((cleanEndpoint === '/garage/vehicles' || cleanEndpoint === '/garage') && method === 'POST') {
      const customerName = String(body.customerName || body.name || '').trim();
      const plateNumber = String(body.plateNumber || body.plate || '').trim().toUpperCase();
      const vin = String(body.vin || body.vinNumber || '').trim().toUpperCase();
      const vehicleModel = String(body.vehicleModel || body.model || body.vehicleInfo || 'Binek Araç').trim();
      const vehicleBrand = String(body.vehicleBrand || body.brand || 'Renault').trim();

      if (!customerName || !plateNumber) {
        return {
          success: false,
          status: 400,
          message: 'Garaja kayıt için "Müşteri Adı" ve "Plaka" alanlarının doldurulması zorunludur.'
        };
      }

      if (!store.garageVehicles) store.garageVehicles = [];

      const newVehicle = {
        id: \`grg-\${Date.now().toString(36)}\`,
        customerName,
        plateNumber,
        vin: vin || 'VF15R040H52814321',
        vehicleModel,
        vehicleBrand,
        createdAt: new Date().toISOString()
      };

      const existingIdx = store.garageVehicles.findIndex(v => v.plateNumber === plateNumber);
      if (existingIdx >= 0) {
        store.garageVehicles[existingIdx] = { ...store.garageVehicles[existingIdx], ...newVehicle, id: store.garageVehicles[existingIdx].id };
      } else {
        store.garageVehicles.unshift(newVehicle);
      }
      saveMockStore(store);

      return {
        success: true,
        message: \`"\${plateNumber}" plakalı araç (\${customerName}) Akıllı Garajınıza başarıyla kaydedildi.\`,
        data: newVehicle
      };
    }

    // DELETE /garage/vehicles/:id & DELETE /garage/:id
    if ((cleanEndpoint.startsWith('/garage/vehicles/') || cleanEndpoint.startsWith('/garage/')) && method === 'DELETE') {
      const parts = cleanEndpoint.split('/');
      const targetId = parts[parts.length - 1];
      if (store.garageVehicles) {
        store.garageVehicles = store.garageVehicles.filter(v => v.id !== targetId && v.plateNumber !== targetId);
        saveMockStore(store);
      }
      return {
        success: true,
        message: 'Araç garajınızdan silindi.'
      };
    }
`;

  // Place before return { success: true
  content = content.replace('// 11. Varsayılan Başarılı Yanıt', garageCode + '\n    // 11. Varsayılan Başarılı Yanıt');
  console.log('Added garage endpoints to api.js');
}

// 3. Attach estimatedLaborTime and recommendedTogether in /store/products mapping
const targetProductMap = `appliedDiscountRate: discountRate,
          pricing: {
            listPrice: listPrice,
            discountRate: discountRate,
            savedAmount: parseFloat((listPrice - finalPrice).toFixed(2)),
            finalPrice: finalPrice
          }`;

if (content.includes(targetProductMap) && !content.includes('estimatedLaborTime: laborTime')) {
  const replacementProductMap = `appliedDiscountRate: discountRate,
          estimatedLaborTime: prod.estimatedLaborTime || getRecommendedTogetherAndLabor(prod.name, prod.category, prod.oeNumber).estimatedLaborTime,
          recommendedTogether: (Array.isArray(prod.recommendedTogether) && prod.recommendedTogether.length > 0)
            ? prod.recommendedTogether
            : getRecommendedTogetherAndLabor(prod.name, prod.category, prod.oeNumber).recommendedTogether,
          pricing: {
            listPrice: listPrice,
            discountRate: discountRate,
            savedAmount: parseFloat((listPrice - finalPrice).toFixed(2)),
            finalPrice: finalPrice
          }`;
  content = content.replace(targetProductMap, replacementProductMap);
  console.log('Attached estimatedLaborTime and recommendedTogether to products map!');
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Updated assets/js/api.js successfully!');

