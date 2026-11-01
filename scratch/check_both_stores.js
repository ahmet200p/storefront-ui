const fs = require('fs');

const f1 = 'c:/Users/Ahmet/Desktop/saas-panel-ui/storefront-ui/store.html';
const f2 = 'c:/Users/Ahmet/Desktop/storefront-ui/store.html';
const f3 = 'c:/Users/Ahmet/Desktop/storefront-ui/index.html';

function test(path) {
  const content = fs.readFileSync(path, 'utf8');
  console.log('===', path, '===');
  console.log('Size:', content.length);
  console.log('Title:', content.match(/<title>(.*?)<\/title>/)?.[1]);
  console.log('Header Garajım Button:', content.includes('id="btn-header-garage"'));
  console.log('Header Garajım Dropdown:', content.includes('id="header-garage-dropdown"'));
  console.log('Sidebar Akıllı Garaj:', content.includes('sidebar-garage-select'));
  console.log('Tahmini İşçilik:', content.includes('Tahmini İşçilik'));
  console.log('Bakım Kiti:', content.includes('Bakım Kiti'));
}

test(f1);
test(f2);
test(f3);

