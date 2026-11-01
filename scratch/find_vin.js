const fs = require('fs');

const apiJs = fs.readFileSync('c:/Users/Ahmet/Desktop/storefront-ui/assets/js/api.js', 'utf8');

const matches = [];
let idx = 0;
while ((idx = apiJs.indexOf('vin', idx)) !== -1) {
  matches.push(idx);
  idx += 3;
}
console.log('Matches for vin:', matches.length);
if (matches.length > 0) {
  console.log(apiJs.slice(matches[0] - 50, matches[0] + 500));
}

