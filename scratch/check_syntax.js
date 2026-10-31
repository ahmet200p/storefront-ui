const fs = require('fs');
let code = fs.readFileSync('scratch/integrate_store.js', 'utf8');

// Fix the unescaped ${plateNumber} at line 512
code = code.replace('showGarageFeedbackToast(`"${plateNumber}" plakalı araç', 'showGarageFeedbackToast(`"${" + "plateNumber}" + "` plakalı araç');

// Also check for any other unescaped ${
const lines = code.split('\n');
lines.forEach((l, idx) => {
  // Look for ${ not preceded by \
  for (let i = 0; i < l.length - 1; i++) {
    if (l[i] === '$' && l[i+1] === '{') {
      if (i === 0 || l[i-1] !== '\\') {
        console.log(`Line ${idx+1}: ${l.trim()}`);
      }
    }
  }
});

fs.writeFileSync('scratch/integrate_store.js', code, 'utf8');
console.log('Done checking and fixing integrate_store.js');

