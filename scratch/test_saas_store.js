const fs = require('fs');
const content = fs.readFileSync('c:/Users/Ahmet/Desktop/saas-panel-ui/storefront-ui/store.html', 'utf8');

console.log('Header Garajım button:', content.includes('id="btn-header-garage"'));
console.log('Header Garajım dropdown:', content.includes('id="header-garage-dropdown"'));
console.log('Sidebar Akıllı Garaj:', content.includes('id="sidebar-garage-select"'));
console.log('Tahmini İşçilik:', content.includes('Tahmini İşçilik'));
console.log('Bakım Kiti:', content.includes('Bakım Kiti'));

const funcs = ['loadGarageVehicles', 'handleSidebarGarageSelect', 'handleGarageSelect', 'renderRecommendedKit', 'addAllRecommendedToCart'];
funcs.forEach(f => {
  console.log('Function ' + f + ':', content.includes(f));
});

