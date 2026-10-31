const fs = require('fs');

function testFile(filename) {
  const content = fs.readFileSync(filename, 'utf8');
  const checks = [
    { name: 'Header Garajım Button', pass: content.includes('id="btn-header-garage"') },
    { name: 'Header Garajım Dropdown', pass: content.includes('id="header-garage-dropdown"') },
    { name: 'Header Vehicle List', pass: content.includes('id="header-garage-vehicle-list"') },
    { name: 'Sidebar Akıllı Garaj Panel', pass: content.includes('id="sidebar-garage-panel"') },
    { name: 'Sidebar Garage Select', pass: content.includes('id="sidebar-garage-select"') },
    { name: 'Card Tahmini İşçilik Rozeti', pass: content.includes('Tahmini İşçilik:') },
    { name: 'Modal Tahmini İşçilik Rozeti', pass: content.includes('id="detail-labor-badge"') },
    { name: 'Sayfa Altı Bakım Kiti', pass: content.includes('id="page-recommended-kit-section"') },
    { name: 'Modal Bakım Kiti Karuseli', pass: content.includes('id="detail-kit-carousel"') },
    { name: 'loadGarageVehicles Function', pass: content.includes('function loadGarageVehicles()') },
    { name: 'selectGarageVehicle Function', pass: content.includes('function selectGarageVehicle(') },
    { name: 'handleSidebarGarageSelect Function', pass: content.includes('function handleSidebarGarageSelect(') },
    { name: 'renderProductMaintenanceKit Function', pass: content.includes('function renderProductMaintenanceKit(') },
    { name: 'addAllRecommendedToCart Function', pass: content.includes('function addAllRecommendedToCart(') }
  ];
  const allPassed = checks.every(c => c.pass);
  console.log(`${filename} -> All ${checks.length} requirements passed:`, allPassed);
}

testFile('store.html');
testFile('index.html');
