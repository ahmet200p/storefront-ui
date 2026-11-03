# KRİTİK MİMARİ HATASI: Arama Motoru Dış API'ye (Parts.Catalogs) Çıkmıyor!

**HATA TESPİTİ:**
Arama kutusuna "101010" gibi test amaçlı bir OE kodu girildiğinde Frontend boş dizi (`[]`) alıyor. Bu durum, Backend `search` fonksiyonunun Parts.Catalogs API'sine GİTMEDİĞİNİ, sadece Prisma (Lokal DB) üzerinde arama yapıp kestirip attığını kesin olarak kanıtlıyor. Müşteri arattığı parça bizim stokta olmasa bile KATALOG VERİSİ olarak ekrana gelmeli ve "Stokta Yok" yazmalıdır!

Lütfen Backend dosyasındaki (Örn: `app.js` veya `product.controller.js`) arama endpoint'ini SİL ve aşağıdaki hibrit (Merge) mantığına göre KESİNLİKLE baştan yaz:

### ADIM 1: BACKEND HİBRİT ARAMA KONTROLÖRÜ (ZORUNLU MİMARİ)
Endpoint (`GET /api/store/products`) şu 3 aşamalı işlemi sırasıyla YAPMAK ZORUNDADIR:

1. **Lokal Prisma Sorgusu:** Aranan kelimeyi/OE kodunu önce yerel veritabanında (`prisma.product.findMany`) ara. Bulduklarını bir diziye koy (Örn: `localResults`). Bu ürünlere `isLocalStock: true` işaretini ekle.
2. **Parts.Catalogs Dış API Sorgusu:** `process.env.PARTS_CATALOG_API_KEY` kullanarak Axios veya Node-Fetch ile harici Parts.Catalogs API'sine istek at. Aranan numaraya ait katalog verilerini (muadiller, resimler, diğer OE'ler) çek (Örn: `catalogResults`).
3. **Harmanlama (Merge) ve Tekilleştirme:** 
   - `catalogResults` dizisini dön (map). 
   - Eğer katalogdaki bir OE numarası senin `localResults` dizinde VARSA, onu atla (çünkü senin stoğun öncelikli).
   - Eğer katalogdaki OE senin lokal dizinde YOKSA, bunu ana listeye ekle ancak bu objelere KESİNLİKLE `isLocalStock: false`, `stock: 0`, `price: null` değerlerini ata.
   - Listeyi, `isLocalStock: true` olanlar (elimizdekiler) EN ÜSTTE, `false` olanlar (sadece katalog bilgisi olanlar) ALTTA olacak şekilde sırala (Sort). Sonra `res.json()` ile frontend'e gönder.

### ADIM 2: FRONTEND "STOKTA YOK / KATALOG" TASARIMI
- `store.html` (veya JS) içindeki `renderProducts` fonksiyonunda, API'den harmanlanmış olarak gelen bu listeyi ekrana basarken şu kontrolü ZORUNLU KIL:
  ```javascript
  if (product.isLocalStock) {
      // Yeşil Stok rozeti + Fiyat göster + Sepete Ekle aktif
  } else {
      // Gri/Kırmızı "Katalog Ürünü / Stokta Yok" rozeti.
      // Fiyat yerine "Fiyat Sorunuz" yaz.
      // Sepete Ekle butonunu "Talep Et" yap veya disabled (kapat) hale getir.
  }