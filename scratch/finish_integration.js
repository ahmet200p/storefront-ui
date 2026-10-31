const fs = require('fs');

const indexHtmlPath = 'index.html';
let content = fs.readFileSync(indexHtmlPath, 'utf8');

const garageKitEngine = fs.readFileSync('scratch/garage_kit_engine.js', 'utf8');

// 1. Insert labor calculation before return in renderProductsGrid
const target1 = `        const crossesCount = Array.isArray(prod.crossReferences) ? prod.crossReferences.length : (prod.crossReferences ? 1 : 0);

        return \``;

const replacement1 = `        const crossesCount = Array.isArray(prod.crossReferences) ? prod.crossReferences.length : (prod.crossReferences ? 1 : 0);

        const laborTime = it.estimatedLaborTime || (it.product && it.product.estimatedLaborTime) || (typeof getRecommendedTogetherAndLabor === 'function' ? getRecommendedTogetherAndLabor(productName, category, oeNumber).estimatedLaborTime : null);
        const laborBadgeHtml = (laborTime && String(laborTime).trim() !== '' && String(laborTime).toLowerCase() !== 'null') ? \`
          <div class="mt-1 mb-1.5">
            <span class="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200/90 shadow-2xs" title="Montaj ve Değişim İşçilik Süresi">
              <svg class="w-3.5 h-3.5 text-indigo-500 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <span>Tahmini İşçilik: \${escapeHtml(laborTime)}</span>
            </span>
          </div>
        \` : '';

        return \``;

if (content.includes(target1)) {
  content = content.replace(target1, replacement1);
  console.log('1. Product labor computation inserted successfully!');
} else {
  console.log('1. Target 1 not found!');
}

// 2. Insert garageKitEngine before the closing </script>
const target2 = `      if (notifBtn && notifDropdown && !notifBtn.contains(e.target) && !notifDropdown.contains(e.target)) {
        notifDropdown.classList.add('hidden');
      }
    });
  </script>`;

const replacement2 = `      if (notifBtn && notifDropdown && !notifBtn.contains(e.target) && !notifDropdown.contains(e.target)) {
        notifDropdown.classList.add('hidden');
      }
    });

${garageKitEngine}
  </script>`;

if (content.includes(target2)) {
  content = content.replace(target2, replacement2);
  console.log('2. Garage & Kit Engine inserted before </script> successfully!');
} else {
  console.log('2. Target 2 not found!');
}

fs.writeFileSync(indexHtmlPath, content, 'utf8');
console.log('All insertions finished in index.html!');

