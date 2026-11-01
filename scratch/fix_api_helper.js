const fs = require('fs');

const helperCode = `
  // =========================================================================
  // Birlikte Alınanlar (Cross-Sell / Bakım Kiti) ve Tahmini İşçilik Süresi Motoru (Prompt.md Modül 2 & 3)
  // =========================================================================
  function getRecommendedTogetherAndLabor(name, group, oeCode) {
    const combined = \`\${name || ''} \${group || ''} \${oeCode || ''}\`.toLowerCase();

    // 1. Triger / Sente / Zamanlama Mekanizması
    if (combined.includes('triger') || combined.includes('sente') || combined.includes('zamanlama') || combined.includes('130c15339r') || combined.includes('1872496')) {
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
    if (combined.includes('fren') || combined.includes('balata') || combined.includes('disk') || combined.includes('410601241r') || combined.includes('5q0698151b') || combined.includes('77366536')) {
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
    if (combined.includes('filtre') || combined.includes('yağ') || combined.includes('yag') || combined.includes('8200768913') || combined.includes('03n115562')) {
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

function fixApi(path) {
  let content = fs.readFileSync(path, 'utf8');
  if (!content.includes('function getRecommendedTogetherAndLabor(')) {
    content = content.replace('function handleOfflineMock(endpoint, options = {}) {', helperCode + '\n  function handleOfflineMock(endpoint, options = {}) {');
    console.log('Added helper to', path);
  }

  // Also expose on window
  if (!content.includes('window.getRecommendedTogetherAndLabor =')) {
    content = content.replace('window.initInactivityWatcher = initInactivityWatcher;', 'window.getRecommendedTogetherAndLabor = getRecommendedTogetherAndLabor;\n  window.initInactivityWatcher = initInactivityWatcher;');
    console.log('Exposed helper on window in', path);
  }

  fs.writeFileSync(path, content, 'utf8');
}

fixApi('assets/js/api.js');
if (fs.existsSync('c:/Users/Ahmet/Desktop/saas-panel-ui/saas-panel/assets/js/api.js')) {
  fixApi('c:/Users/Ahmet/Desktop/saas-panel-ui/saas-panel/assets/js/api.js');
}

