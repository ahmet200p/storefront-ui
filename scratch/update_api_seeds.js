const fs = require('fs');

function updateApiJs(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace or enhance the empty calculated check in GET /store/products
  const targetCheck = `if (brandFilter && brandFilter !== 'all') {
        calculated = calculated.filter(p => (p.vehicleBrand || '').toLowerCase().includes(brandFilter));
      }`;

  const seedInjection = `
      // Otomotiv Seed Kataloğu (Yerel Demo & Çevrimdışı Güvencesi)
      if (calculated.length === 0) {
        const defaultSeeds = [
          {
            name: 'Triger Kayış Kiti & Gergi Rulmanı',
            oeNumber: '130C15339R',
            vehicleBrand: 'Renault',
            category: 'Motor Parçaları',
            partGroup: 'Motor & Mekanik',
            compatibleModels: 'Megane IV, Clio V, Captur II 1.5 dCi',
            defaultPrice: 2850,
            imageUrl: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=400&auto=format&fit=crop&q=80'
          },
          {
            name: 'Ön Fren Balata Takımı (Sensörlü)',
            oeNumber: '410601241R',
            vehicleBrand: 'Renault',
            category: 'Fren Sistemi',
            partGroup: 'Fren Sistemi',
            compatibleModels: 'Megane IV, Clio V, Talisman, Kadjar',
            defaultPrice: 1250,
            imageUrl: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=400&auto=format&fit=crop&q=80'
          },
          {
            name: 'Ön Fren Diski Havalandırmalı (280mm Takım)',
            oeNumber: '402060010R',
            vehicleBrand: 'Renault',
            category: 'Fren Sistemi',
            partGroup: 'Fren Sistemi',
            compatibleModels: 'Megane IV, Clio V, Dacia Duster',
            defaultPrice: 1800,
            imageUrl: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&auto=format&fit=crop&q=80'
          },
          {
            name: 'Yağ Filtresi Vidalı Tip',
            oeNumber: '8200768913',
            vehicleBrand: 'Renault',
            category: 'Filtreler',
            partGroup: 'Filtre & Bakım',
            compatibleModels: 'Renault, Dacia 1.5 dCi Tüm Modeller, Megane IV',
            defaultPrice: 280,
            imageUrl: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&auto=format&fit=crop&q=80'
          },
          {
            name: 'Hava Filtresi Paneli',
            oeNumber: '165467674R',
            vehicleBrand: 'Renault',
            category: 'Filtreler',
            partGroup: 'Filtre & Bakım',
            compatibleModels: 'Megane IV, Clio V, Captur II',
            defaultPrice: 320,
            imageUrl: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&auto=format&fit=crop&q=80'
          },
          {
            name: 'Devirdaim Su Pompası (Metal Yüksek Debi Çark)',
            oeNumber: '210100495R',
            vehicleBrand: 'Renault',
            category: 'Soğutma & Isıtma',
            partGroup: 'Soğutma & Isıtma',
            compatibleModels: 'Renault Clio IV/V, Megane III/IV 1.5 dCi',
            defaultPrice: 1500,
            imageUrl: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&auto=format&fit=crop&q=80'
          },
          {
            name: 'Karbonlu Polen Kabin Filtresi',
            oeNumber: '272778970R',
            vehicleBrand: 'Renault',
            category: 'Filtreler',
            partGroup: 'Filtre & Bakım',
            compatibleModels: 'Megane IV, Talisman, Espace V',
            defaultPrice: 340,
            imageUrl: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&auto=format&fit=crop&q=80'
          },
          {
            name: 'Ön Fren Balata Takımı',
            oeNumber: '5Q0698151B',
            vehicleBrand: 'Volkswagen',
            category: 'Fren Sistemi',
            partGroup: 'Fren Sistemi',
            compatibleModels: 'Golf 7, Passat B8, Octavia III, Leon',
            defaultPrice: 1450,
            imageUrl: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=400&auto=format&fit=crop&q=80'
          },
          {
            name: 'Yağ & Yakıt Filtre Bakım Kiti',
            oeNumber: '03N115562',
            vehicleBrand: 'Volkswagen',
            category: 'Filtreler',
            partGroup: 'Filtre & Bakım',
            compatibleModels: 'Volkswagen Golf 7 1.6 TDI, Passat B8',
            defaultPrice: 850,
            imageUrl: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&auto=format&fit=crop&q=80'
          },
          {
            name: 'Ön Fren Balata Takımı',
            oeNumber: '77366536',
            vehicleBrand: 'Fiat',
            category: 'Fren Sistemi',
            partGroup: 'Fren Sistemi',
            compatibleModels: 'Fiat Egea 1.3 / 1.6 Multijet, 500L',
            defaultPrice: 1100,
            imageUrl: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=400&auto=format&fit=crop&q=80'
          },
          {
            name: 'Triger Kayış & Rulman Seti',
            oeNumber: '1872496',
            vehicleBrand: 'Ford',
            category: 'Motor Parçaları',
            partGroup: 'Motor & Mekanik',
            compatibleModels: 'Ford Focus 1.5 TDCi, C-Max, Kuga',
            defaultPrice: 2950,
            imageUrl: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=400&auto=format&fit=crop&q=80'
          }
        ];

        calculated = defaultSeeds.map((seed, sIdx) => {
          const listP = seed.defaultPrice;
          const discAmt = discountRate > 0 ? listP * (discountRate / 100) : 0;
          const finP = parseFloat((listP - discAmt).toFixed(2));
          const lr = getRecommendedTogetherAndLabor(seed.name, seed.partGroup, seed.oeNumber);
          return {
            tenantProductId: \`tp-seed-\${sIdx + 1}\`,
            productId: \`prod-seed-\${sIdx + 1}\`,
            oeNumber: seed.oeNumber,
            name: seed.name,
            category: seed.category,
            vehicleBrand: seed.vehicleBrand,
            compatibleModels: seed.compatibleModels,
            partGroup: seed.partGroup,
            imageUrl: seed.imageUrl,
            images: [seed.imageUrl],
            stock: 25,
            isDiscounted: discountRate > 0,
            defaultPrice: listP,
            customPrice: listP,
            discountedPrice: finP,
            appliedDiscountRate: discountRate,
            pricing: {
              listPrice: listP,
              discountRate: discountRate,
              savedAmount: parseFloat((listP - finP).toFixed(2)),
              finalPrice: finP
            },
            estimatedLaborTime: lr.estimatedLaborTime,
            recommendedTogether: lr.recommendedTogether
          };
        });
      }
`;

  if (!content.includes('tp-seed-')) {
    content = content.replace(targetCheck, seedInjection + '\n      ' + targetCheck);
    console.log('Seeded products injected into', filePath);
  }

  // Enhanced searchFilter that maps VIN & Plate from store.garageVehicles
  const oldSearchFilter = `if (searchFilter) {
        calculated = calculated.filter(p => 
          (p.name || '').toLowerCase().includes(searchFilter) ||
          (p.oeNumber || '').toLowerCase().includes(searchFilter) ||
          (p.vehicleBrand || '').toLowerCase().includes(searchFilter) ||
          (p.compatibleModels || '').toLowerCase().includes(searchFilter) ||
          (p.partGroup || '').toLowerCase().includes(searchFilter)
        );
      }`;

  const newSearchFilter = `if (searchFilter) {
        // Akıllı Garaj: Şasi No (VIN) veya Plaka eşleşmesi
        let matchedGarageVehicle = null;
        if (store.garageVehicles && Array.isArray(store.garageVehicles)) {
          const cleanQ = searchFilter.replace(/\\s+/g, '').toLowerCase();
          matchedGarageVehicle = store.garageVehicles.find(v => {
            const vVin = (v.vin || '').replace(/\\s+/g, '').toLowerCase();
            const vPlate = (v.plateNumber || '').replace(/\\s+/g, '').toLowerCase();
            return vVin === cleanQ || cleanQ.includes(vVin) || vPlate === cleanQ;
          });
        }

        if (matchedGarageVehicle) {
          const vBrand = (matchedGarageVehicle.vehicleBrand || '').toLowerCase();
          const vModel = (matchedGarageVehicle.vehicleModel || '').toLowerCase();
          const filtered = calculated.filter(p => {
            const b = (p.vehicleBrand || '').toLowerCase();
            const c = (p.compatibleModels || '').toLowerCase();
            const n = (p.name || '').toLowerCase();
            const brandMatch = vBrand && (b.includes(vBrand) || c.includes(vBrand));
            const modelTokens = vModel.split(/\\s+/).filter(t => t.length > 2);
            const modelMatch = modelTokens.some(t => c.includes(t) || n.includes(t));
            return brandMatch || modelMatch;
          });
          calculated = filtered.length > 0 ? filtered : calculated;
        } else {
          // Ham VIN desenleri algılama (VF1 -> Renault, WVW -> VW, ZFA -> Fiat, WF0 -> Ford)
          let detectedBrand = '';
          const rawVin = searchFilter.toLowerCase().replace(/\\s+/g, '');
          if (rawVin.startsWith('vf1')) detectedBrand = 'renault';
          else if (rawVin.startsWith('wvw') || rawVin.startsWith('wau')) detectedBrand = 'volkswagen';
          else if (rawVin.startsWith('zfa')) detectedBrand = 'fiat';
          else if (rawVin.startsWith('wf0')) detectedBrand = 'ford';

          calculated = calculated.filter(p => 
            (p.name || '').toLowerCase().includes(searchFilter) ||
            (p.oeNumber || '').toLowerCase().includes(searchFilter) ||
            (p.vehicleBrand || '').toLowerCase().includes(searchFilter) ||
            (p.compatibleModels || '').toLowerCase().includes(searchFilter) ||
            (p.partGroup || '').toLowerCase().includes(searchFilter) ||
            (detectedBrand && (p.vehicleBrand || '').toLowerCase().includes(detectedBrand)) ||
            (detectedBrand && (p.compatibleModels || '').toLowerCase().includes(detectedBrand))
          );
        }
      }`;

  if (content.includes(oldSearchFilter)) {
    content = content.replace(oldSearchFilter, newSearchFilter);
    console.log('Search filter updated with Smart Garage VIN resolution in', filePath);
  }

  fs.writeFileSync(filePath, content, 'utf8');
}

updateApiJs('assets/js/api.js');
if (fs.existsSync('c:/Users/Ahmet/Desktop/saas-panel-ui/saas-panel/assets/js/api.js')) {
  updateApiJs('c:/Users/Ahmet/Desktop/saas-panel-ui/saas-panel/assets/js/api.js');
}
console.log('All api.js files updated.');

