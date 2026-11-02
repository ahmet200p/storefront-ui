# KRİTİK GÖREV: Üst Kategori Menüsünün (Navbar) Backend Filtrelemesine Bağlanması

**HATA TESPİTİ:**
Kullanıcı üst menüden "Motor & Şanzıman" gibi bir kategori seçtiğinde, sekme "Aktif" (turuncu çizgili) görünmesine rağmen sayfadaki ürün listesi yenilenmiyor ve alakasız (Fren sistemine ait) ürünler ekranda kalmaya devam ediyor. Üst menü (Navbar) şu an API'yi tetiklemiyor.

Lütfen `store.html`, ilgili JS dosyası ve Backend Controller tarafında şu 3 adımı DERHAL uygula:

### ADIM 1: FRONTEND ÜST MENÜ (NAVBAR) OLAY DİNLEYİCİLERİ
- Üst menüdeki kategori linklerini (`Motor & Şanzıman`, `Fren Sistemi` vb.) HTML tarafında bul ve bunlara birer `data-category` niteliği (attribute) ekle. (Örn: `data-category="Motor & Şanzıman"`).
- JS dosyasında bu menü öğelerine `click` event listener ekle.
- Tıklanıldığında:
  1. Eski aktif sekmeden CSS class'larını (turuncu alt çizgi vb.) kaldır, tıklanan sekmeye ekle.
  2. Tıklanan sekmenin `data-category` değerini al.
  3. `fetchProducts(category)` fonksiyonunu bu değerle yeniden çağır (sayfayı yenilemeden).
  4. Eğer "Tüm Kategoriler" butonuna basılırsa `fetchProducts()` fonksiyonunu parametresiz çağır (filtreyi sıfırla).

### ADIM 2: JAVASCRIPT FETCH FONKSİYONUNUN (QUERY STRING) GÜNCELLENMESİ
- `fetchProducts` (veya `loadProducts`) fonksiyonunu, dışarıdan `category` parametresi alacak şekilde düzenle.
- API'ye atılan `fetch` URL'sini dinamik hale getir:
  ```javascript
  let url = `${API_BASE_URL}/store/products`;
  if (category && category !== 'Tüm Kategoriler') {
      url += `?category=${encodeURIComponent(category)}`;
  }
  // Mevcut sol menü filtreleri varsa onları da URL'ye & ile eklemeyi unutma.
  fetch(url) ...