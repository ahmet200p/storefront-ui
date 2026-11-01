const fs = require('fs');

const storeHtml = fs.readFileSync('c:/Users/Ahmet/Desktop/storefront-ui/store.html', 'utf8');

const target = 'if (currentSearchQuery) {\n          queryParams.set(\'search\', currentSearchQuery);\n          if (currentSearchType) queryParams.set(\'searchType\', currentSearchType);\n        }';
console.log('Target found:', storeHtml.includes(target));
if (!storeHtml.includes(target)) {
  const idx = storeHtml.indexOf('if (currentSearchQuery)');
  console.log(storeHtml.slice(idx - 100, idx + 400));
}

