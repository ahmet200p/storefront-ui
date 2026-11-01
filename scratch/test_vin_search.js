const vm = require('vm');
const fs = require('fs');

const apiCode = fs.readFileSync('assets/js/api.js', 'utf8');

const sandbox = {
  window: {},
  Headers: global.Headers,
  FormData: global.FormData,
  URL: URL,
  localStorage: {
    _data: {},
    getItem(k) { return this._data[k] || null; },
    setItem(k, v) { this._data[k] = String(v); },
    removeItem(k) { delete this._data[k]; }
  },
  sessionStorage: {
    _data: {},
    getItem(k) { return this._data[k] || null; },
    setItem(k, v) { this._data[k] = String(v); },
    removeItem(k) { delete this._data[k]; }
  },
  console: console,
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  fetch: async () => { throw new Error('offline'); }
};
sandbox.window = sandbox;

vm.createContext(sandbox);
vm.runInContext(apiCode, sandbox);

(async () => {
  // Initialize garage
  await sandbox.apiFetch('/garage/vehicles');

  // Search by VIN
  const res = await sandbox.apiFetch('/store/products?search=VF15R040H52814321&searchType=vin');
  console.log('Search by Megane VIN returned:', res.data.length, 'products');
  res.data.forEach(p => {
    console.log(` - [${p.oeNumber}] ${p.name} | İşçilik: ${p.estimatedLaborTime} | Kit: ${p.recommendedTogether ? p.recommendedTogether.length : 0} parça`);
  });
})();

