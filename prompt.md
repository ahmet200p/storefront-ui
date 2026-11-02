# GÖREV: Sol Menü Filtre Sayılarının (Facet Counts) Dinamik Veriye Bağlanması

**DURUM:** `store.html` sayfasındaki sol filtre panelinde ("Alt Kategori", "Parça Üreticisi" vb.) yer alan ürün adetleri tamamen statik (hardcoded) sayılardan oluşuyor (Örn: 14, 24, 32). Sistemdeki canlı verilere göre bu sayıların otomatik hesaplanması ve olmayanlar için (0) yazması gerekmektedir.

Lütfen HTML ve JS dosyalarında şu 3 adımı DERHAL uygula:

### ADIM 1: HTML'DEKİ STATİK SAYILARI TEMİZLEME VE DATA ETİKETİ EKLEME
- Sol menüdeki checkbox'ların yanındaki `(14)`, `(24)` gibi sahte sayıların hepsini sil.
- Bunların yerine JS'nin kolayca yakalayabilmesi için özel `data-*` attribute'larına sahip `span` etiketleri yerleştir. İçlerini varsayılan olarak `(0)` yap.
  *Örnek Marka:* `<span data-filter-count="brand-Bosch">(0)</span>`
  *Örnek Kategori:* `<span data-filter-count="category-Ön Fren Balatası">(0)</span>`

### ADIM 2: JAVASCRIPT İLE GELEN VERİLERİ (ARRAY) SAYMA
- API'den ürünlerin başarıyla çekildiği `fetchProducts` (veya veriyi ekrana basan) fonksiyonunu bul.
- Gelen ürün dizisini (`data.data` veya `data`) bir döngüye (`forEach` veya `reduce`) sokarak, hangi "markadan" ve hangi "kategoriden" kaçar adet ürün olduğunu hesaplayan bir algoritma yaz.
- *Örnek Mantık:* `counts['brand-Bosch'] = (counts['brand-Bosch'] || 0) + 1;`

### ADIM 3: EKRANDAKİ (DOM) SAYILARI GÜNCELLEME
- Sayım işlemi tamamlandıktan sonra, HTML'deki ilgili `span` etiketlerini bularak `.textContent` özelliklerini güncelle.
- *Örnek:* `document.querySelector('[data-filter-count="brand-Bosch"]').textContent = '(' + (counts['brand-Bosch'] || 0) + ')';`
- Eğer bir kategoride hiç ürün yoksa, o değer `(0)` olarak görünmeye devam etsin (veya istersen checkbox'ı `disabled` yapacak kodu da ekleyebilirsin).

**EMİR:** HTML içindeki el yazısı (hardcoded) sayıları tamamen yok et. Frontend, Render API'den gelen güncel ürün dizisini (Array) tarasın ve sidebar'daki rakamları bu gerçek sonuca göre kendi hesaplasın.