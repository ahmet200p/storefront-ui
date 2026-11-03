# KRİTİK GÖREV: Çevrimdışı Mod Hatasının Giderilmesi ve Izgara/Şerit (Grid/List) Görünüm Özelliği

**HATA TESPİTİ:**
Arama yapıldığında `api.js` dosyası Render backend'ine bağlanamıyor ve konsolda "Dayanıklı çevrimdışı motor devreye giriyor..." uyarısı vererek boş liste dönüyor. Ayrıca kullanıcı, ekrana gelen parçaların ızgara (grid) veya şerit (list) şeklinde yatay olarak sıralanmasını seçebilmek istiyor.

Lütfen Frontend (`store.html` ve JS dosyaları) tarafında şu 3 adımı DERHAL uygula:

### ADIM 1: "ÇEVRİMDIŞI MOTOR" (OFFLINE FALLBACK) ENGELİNİ KALDIR
- `api.js` veya `store.js` içindeki `fetchProducts` (veya arama) fonksiyonunu bul.
- `try/catch` bloğundaki `catch` kısmında yer alan "çevrimdışı motor devreye giriyor" (offline mock data) mantığını TAMAMEN DEVRE DIŞI BIRAK VEYA SİL. 
- Bunun yerine gerçek hatayı görebilmemiz için `catch (error) { console.error("Gerçek API Hatası:", error); }` yaz. Canlı sunucuya (Render) atılan URL'nin sonuna yanlışlıkla fazladan `/` eklenmediğinden ve URL'nin doğru olduğundan emin ol.

### ADIM 2: ŞASİ/OEM ARAMASINI EKRANA BASMA (RENDER)
- Arama inputundan değer alıp Backend'e (Örn: `/api/store/products?search=...`) atılan istekten dönen ürün dizisini (Array), mevcut ürün listeleme fonksiyonuna (Örn: `renderProducts`) gönder.
- Eski statik verilerin temizlendiğinden ve dönen ürünlerin ekrandaki ürün kapsayıcısına (Product Container) eklendiğinden emin ol.

### ADIM 3: IZGARA (GRID) VE ŞERİT (LIST) GÖRÜNÜM GEÇİŞİ (TOGGLE)
- `store.html` sayfasında, ürün listesinin üst sağ kısmındaki "Grid" (kutu) ve "List" (satır) ikonlu butonlara `id="btn-grid-view"` ve `id="btn-list-view"` ekle.
- Ürünlerin içine basıldığı ana HTML kapsayıcısına (Container) `id="products-container"` ekle.
- JS dosyasında bu iki butona `click` event'i tanımla:
  - **Grid Butonuna Tıklanınca:** `products-container`'a Tailwind'in grid class'larını ekle (`grid`, `grid-cols-1`, `md:grid-cols-3` vb.), list class'larını (`flex`, `flex-col`) sil. İçindeki ürün kartlarının CSS'ini dikey tasarıma uygun hale getir.
  - **List Butonuna Tıklanınca:** `products-container`'dan grid class'larını sil, yerine `flex flex-col space-y-4` ekle. Kart içindeki resim ve metinlerin yan yana (yatay/şerit) durması için kart CSS'ini `flex flex-row` yapısına dönüştür.

**EMİR:** Sahte çevrimdışı modu kapatıp gerçek API bağlantı hatasını düzelt ve ürünler listelendiğinde kullanıcının butonlar aracılığıyla Grid/List tasarımları arasında geçiş yapabilmesini sağla.