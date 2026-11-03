# KAPSAMLI MİMARİ DEĞİŞİKLİĞİ: Vitrin Arama Motorunun Parts.Catalogs API ile Hibrit (Hybrid) Hale Getirilmesi

**DURUM VE HATA TESPİTİ:**
Mevcut `store.html` ve Backend arama algoritması yalnızca Prisma (lokal DB) üzerinde basit bir `OR` sorgusu atıyor. Bu kabul edilemez. Müşteri bir OE kodu (Örn: 1000) veya kelime (Örn: Fren Balatası) arattığında, Bayi panelinde olduğu gibi sistemin Parts.Catalogs API'si ile entegre çalışması ZORUNLUDUR. 

Lütfen Backend (`app.js` / `routes`) ve Frontend (`store.js`) tarafında şu 3 kritik mimari adımı DERHAL uygula. **(İpucu: Bayi panelindeki çalışan Parts.Catalogs API kodlarını referans al)**.

### ADIM 1: BACKEND - HİBRİT ARAMA VE BİRLEŞTİRME (MERGE) ALGORİTMASI
- Backend arama endpoint'ini (`GET /api/store/products?search=...`) tamamen baştan yaz.
- **Aşama 1 (Katalog Sorgusu):** Gelen `search` parametresini (.env içindeki anahtar ile) doğrudan Parts.Catalogs API'sine gönder (Cross-reference veya Text search endpoint'ine). Aranan OE'nin muadillerini, aynı araca ait ilişkili parçaları (Örn: ön balata arandıysa arka balata referanslarını da) API'den çek.
- **Aşama 2 (Lokal Stok Eşleştirmesi):** API'den dönen tüm OEM numaralarını bir diziye (`apiOemList`) al. Sonra Prisma'da bu diziyi arat: `prisma.product.findMany({ where: { oemNumber: { in: apiOemList }, isActive: true } })`.
- **Aşama 3 (Birleştirme ve Sıralama):** 
  - API'den gelen devasa listeyle, lokal Prisma'dan dönen ürünleri harmanla.
  - **Sıralama 1:** Müşterinin tam arattığı kelime/OE kodu ile BİREBİR eşleşen senin lokal stoklu ürünün EN ÜSTTE (Index 0) yer alsın.
  - **Sıralama 2:** Lokal veritabanında olan (Stoklu) diğer muadil/ilişkili ürünler onun altına gelsin.
  - **Sıralama 3:** Lokal veritabanında OLMAYAN ancak Parts.Catalogs API'sinden dönen diğer parça referansları (Katalog verileri) listenin en altına eklensin.
- Frontend'e bu harmanlanmış diziyi dön.

### ADIM 2: FRONTEND - KART TASARIMI VE STOK GÖSTERİMİ
- `store.html` içindeki ürün kartını (renderProducts) bu hibrit veriyi okuyacak şekilde güncelle.
- Kartın üzerinde ürünün kaynağını ve stok durumunu net şekilde belli et:
  - Eğer ürün `isLocalStock: true` ise (Senin veritabanından geliyorsa): Miktarını belirterek Yeşil bir rozetle **"Stokta Mevcut (1 Adet)"** yaz ve "Sepete Ekle" butonunu aktif et.
  - Eğer ürün API'den gelmiş ama sende stoğu yoksa: Gri/Kırmızı bir rozetle **"Stokta Yok / Katalog Referansı"** yaz, Sepete Ekle butonunu devre dışı bırak (`disabled`) veya "Talep Et" butonuna çevir.

### ADIM 3: API GÖRSELLERİ VE ÇAPRAZ REFERANSLAR (UI)
- Parts.Catalogs API'sinden dönen yüksek kaliteli görselleri kartın ana resmi yap. Resme tıklanınca büyümesi için Lightbox (Modal) yapısını koru.
- Kartın açıklama kısmına, API'den dönen Orijinal OE numarasını ve muadil marka kodlarını alt alta küçük puntolarla bas. Böylece müşteri 1000 OE'sini arattığında, 1001 OE'sinin de bu araca uyduğunu kartın üzerinde görebilsin.

**EMİR:** Sadece lokal veritabanında arama yapan ilkel mantığı SİL. Sistemi, girilen değeri önce Parts.Catalogs API'de çözümleyip, sonra lokal veritabanı stoklarıyla eşleştiren, bulunamayanları da sırf bilgi vermek amacıyla ekranda "Stokta Yok" ibaresiyle gösteren profesyonel bir B2B arama motoruna dönüştür.