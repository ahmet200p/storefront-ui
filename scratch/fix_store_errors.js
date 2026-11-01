const fs = require('fs');

const files = [
  'store.html',
  'index.html',
  'c:/Users/Ahmet/Desktop/saas-panel-ui/storefront-ui/store.html'
];

files.forEach(filePath => {
  if (!fs.existsSync(filePath)) {
    console.log('File not found:', filePath);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // 1. Fix ReferenceError: 'it' is not defined in renderProductsGrid
  if (content.includes('it.estimatedLaborTime')) {
    content = content.replace(
      'const laborTime = it.estimatedLaborTime || (it.product && it.product.estimatedLaborTime)',
      'const laborTime = item.estimatedLaborTime || (prod && prod.estimatedLaborTime)'
    );
    // Also if any other variant
    content = content.replace(/it\.estimatedLaborTime/g, 'item.estimatedLaborTime');
    console.log(`[${filePath}] Fixed it.estimatedLaborTime -> item.estimatedLaborTime`);
    modified = true;
  }

  // 2. Fix 400 Bad Request: Remove duplicate X-Tenant-Slug header and add page/limit
  const oldHeaders = `const headers = { 
          'Accept': 'application/json', 
          'x-tenant-slug': TENANT_SLUG,
          'X-Tenant-Slug': TENANT_SLUG 
        };`;

  const newHeaders = `const headers = { 
          'Accept': 'application/json', 
          'x-tenant-slug': (typeof activeSlug !== 'undefined' && activeSlug) ? activeSlug : (typeof TENANT_SLUG !== 'undefined' ? TENANT_SLUG : 'ahmetoto')
        };`;

  if (content.includes(oldHeaders)) {
    content = content.replace(oldHeaders, newHeaders);
    console.log(`[${filePath}] Fixed duplicate headers in loadProducts!`);
    modified = true;
  } else {
    // Regex replace duplicate X-Tenant-Slug
    const headerRegex = /'x-tenant-slug':\s*TENANT_SLUG,\s*['"]X-Tenant-Slug['"]:\s*TENANT_SLUG/g;
    if (headerRegex.test(content)) {
      content = content.replace(headerRegex, "'x-tenant-slug': TENANT_SLUG");
      console.log(`[${filePath}] Replaced duplicate header with regex`);
      modified = true;
    }
  }

  // Ensure queryParams sets page=1 and limit=50
  if (content.includes("queryParams.set('limit', '100');") && !content.includes("queryParams.set('page', '1');")) {
    content = content.replace(
      "queryParams.set('limit', '100');",
      "queryParams.set('page', '1');\n        queryParams.set('limit', '50');"
    );
    console.log(`[${filePath}] Added page=1 and limit=50 to queryParams!`);
    modified = true;
  }

  // Add window.fetchInitialCatalog alias to loadProducts for ADIM 2 compliance
  if (!content.includes('window.fetchInitialCatalog =')) {
    content = content.replace(
      'window.openProductDetailModal = openProductDetailModal;',
      'window.fetchInitialCatalog = loadProducts;\n    window.openProductDetailModal = openProductDetailModal;'
    );
    console.log(`[${filePath}] Added window.fetchInitialCatalog alias!`);
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`[${filePath}] Saved successfully.`);
  } else {
    console.log(`[${filePath}] No changes needed or already updated.`);
  }
});

