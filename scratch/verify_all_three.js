const fs = require('fs');
const vm = require('vm');

const files = [
  'c:/Users/Ahmet/Desktop/storefront-ui/store.html',
  'c:/Users/Ahmet/Desktop/storefront-ui/index.html',
  'c:/Users/Ahmet/Desktop/saas-panel-ui/storefront-ui/store.html'
];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');

  // Syntax check
  const scripts = content.match(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi) || [];
  let scriptErrors = 0;
  scripts.forEach((s, i) => {
    const code = s.replace(/<script[^>]*>/i, '').replace(/<\/script>/i, '');
    try {
      new vm.Script(code);
    } catch (e) {
      console.error(f, 'Script ' + i + ' ERROR:', e.message);
      scriptErrors++;
    }
  });

  const checks = [
    { name: 'Header Garajım Button', pass: content.includes('id="btn-header-garage"') },
    { name: 'Header Garajım Dropdown', pass: content.includes('id="header-garage-dropdown"') },
    { name: 'Sidebar Garage Select', pass: content.includes('id="sidebar-garage-select"') },
    { name: 'Card Tahmini İşçilik', pass: content.includes('Tahmini İşçilik') },
    { name: 'Bakım Kiti (Cross-Sell)', pass: content.includes('Bakım Kiti') },
    { name: 'loadGarageVehicles', pass: content.includes('loadGarageVehicles') },
    { name: 'handleSidebarGarageSelect', pass: content.includes('handleSidebarGarageSelect') }
  ];

  const allPass = checks.every(c => c.pass) && scriptErrors === 0;
  console.log(`=== ${f} ===`);
  console.log('Script errors:', scriptErrors);
  console.log('All checklist items passed:', allPass);
});

