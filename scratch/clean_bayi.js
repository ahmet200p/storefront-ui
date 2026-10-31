const fs = require('fs');
const filePath = 'c:/Users/Ahmet/Desktop/saas-panel-ui/saas-panel/bayi.html';
let content = fs.readFileSync(filePath, 'utf8');

// Remove everything between the order modal close and <script>\n    // Mobil Kenar Çubuğu
const regex = /(<button type="button" class="btn-cancel" id="btn-cancel-order-modal">Kapat<\/button>[\s\S]*?<\/div>\s*<\/div>)[\s\S]*?(<script>\s*\/\/\s*Mobil Kenar Çubuğu)/;

if (regex.test(content)) {
  console.log('Found modal fragment!');
  content = content.replace(regex, '$1\n\n  $2');
} else {
  console.log('Regex did NOT match');
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Done.');
