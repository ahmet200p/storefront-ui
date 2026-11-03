# KRİTİK GÖREV: OEM Arama Algoritması, API Görselleri, Lightbox ve Stok Gösterimi

**GÖREV BİLDİRİMİ:**
Kullanıcı bir OEM kodu arattığında;
1. Tam eşleşen (Exact Match) ürün listelenenler arasında EN ÜSTTE çıkmalı.
2. Ürüne ait diğer OEM referansları ve muadiller ürün bilgisinin yanında listelenmeli.
3. Parts.Catalogs API'den (veya veritabanından) gelen görseller ekranda gösterilmeli ve resme tıklandığında büyüyen (Lightbox/Modal) bir yapı kurulmalı.
4. Ürün stoktaysa net bir şekilde "Stokta Mevcut (Stok: X)" ibaresi yer almalıdır.

Lütfen Frontend (`store.html`, JS dosyaları) ve Backend arama API'sinde şu 3 adımı DERHAL uygula:

### ADIM 1: BACKEND ARAMA VE SIRALAMA ALGORİTMASI (EXACT MATCH FIRST)
- Backend'deki arama endpoint'inde (Örn: `GET /api/store/products?search=...`) sorgudan dönen diziyi (Array) Frontend'e göndermeden önce sırala (Sort).
- Arama kutusuna girilen OEM numarası ile `product.oemNumber` (veya `barcode`, `crossReferences`) BİREBİR eşleşiyorsa, o ürünü dizinin en başına (index 0) al. Kısmi eşleşenleri veya muadilleri (contains) onun altına diz.

### ADIM 2: API GÖRSELLERİ VE LIGHTBOX (BÜYÜTME) ENTEGRASYONU
- Frontend JS dosyasında ürün kartlarını ekrana basan fonksiyonu (`renderProducts` vb.) güncelle.
- API'den dönen görsel URL'sini (Örn: `product.imageUrl` veya API'den gelen dizi) `<img>` etiketine bas.
- `store.html` sayfasının en altına gizli bir Lightbox Modalı (`id="image-modal" class="hidden fixed inset-0 z-50..."`) ekle.
- Ürün görseline `cursor-pointer` ve `onclick="openImageModal('${product.imageUrl}')"` ekle. Tıklandığında resim ekranın ortasında tam boy açılsın (arka plan karartılmış overlay ile). Modalın dışına veya X butonuna basınca kapansın.

### ADIM 3: STOK DURUMU VE REFERANS (MUADİL) GÖSTERİMİ
- Ürün kartı (veya liste satırı) tasarımında OEM numarasının hemen yanına (veya altına) diğer uyumlu referansları (Cross-References) küçük puntolarla bas: `<div class="text-xs text-gray-500">Diğer Referanslar: ${product.crossReferences}</div>`.
- Stok verisini kontrol et:
  - `product.stock > 0` ise: `<span class="bg-green-100 text-green-700 px-2 py-1 rounded font-bold">Stokta Mevcut (Stok: ${product.stock})</span>`
  - `product.stock === 0` veya `null` ise: `<span class="bg-red-100 text-red-700 px-2 py-1 rounded font-bold">Stokta Yok</span>` yazdır.

**EMİR:** OEM aramalarında tam eşleşeni her zaman listenin zirvesine koy. Tasarımı API görsellerini destekleyecek ve tıklandığında büyütecek (Lightbox) şekilde güncelle.