# KESİN EMİR: Arama Motorunu Dış API (Parts.Catalogs / TecDoc) Odaklı Yeniden Yaz

**DURUM:** Arama kutusuna bir OE yazıldığında, sistem sadece yerel Prisma DB'de arama yapıyor ve bulamayınca boş dönüyor. BU İSTENEN BİR DAVRANIŞ DEĞİLDİR! Sistem yerel veritabanında ürün OLMASA DAHİ harici API'ye gidip o parçayı, API'deki görsellerini ve muadillerini çekip ekrana getirmek ZORUNDADIR.

Lütfen Backend'deki arama controller'ını (`GET /api/store/products` veya search route'u) TAMAMEN SİL ve AŞAĞIDAKİ MANTIĞA GÖRE YENİDEN YAZ. Kendi bildiğin basit Prisma sorgusunda ısrar etme.

### ADIM 1: BACKEND - DIŞ API'YE AXIOS/FETCH İLE BAĞLANMA
- Backend arama route'unun içine `axios` (veya Node.js için `fetch`) dahil et.
- Kullanıcı arama yaptığında (`req.query.search`), ÖNCE `process.env.PARTS_CATALOG_API_KEY` kullanarak Parts.Catalogs API'sinin arama uç noktasına istek at. 
- Örnek Kurgu (Bunu koda dök):
  ```javascript
  // 1. Dış API'den Katalog Verisini Çek
  const catalogResponse = await axios.get(`[https://api.parts.catalogs/.../search?q=$](https://api.parts.catalogs/.../search?q=$){searchQuery}&key=${process.env.PARTS_CATALOG_API_KEY}`);
  const catalogItems = catalogResponse.data.results || [];

  // 2. Kendi Yerel Veritabanımızda (Prisma) Stok Kontrolü Yap
  const localProducts = await prisma.product.findMany({
      where: { isActive: true, oemNumber: { in: catalogItems.map(item => item.oem) } }
  });

  // 3. Verileri Harmanla (Merge)
  // catalogItems dizisini döngüye sok. Eğer katalogdaki OE yerel stokta (localProducts) varsa isLocalStock: true yap, kendi fiyat/stok bilgini ekle.
  // Eğer stokta yoksa isLocalStock: false, stock: 0, price: null olarak işaretle.
  // Harmanlanmış bu listeyi frontend'e dön.
  store.html'e bağlı JS dosyasındaki renderProducts (ürün kartını basan) fonksiyonu güncelle.

API'den dönen listede product.isLocalStock === true ise: "Sepete Ekle" butonunu aktif et, yeşil "Stokta Mevcut" rozeti ekle ve fiyatı göster.

product.isLocalStock === false ise (Sadece dış katalogdan gelmişse): "Sepete Ekle" butonunu devre dışı bırak (veya "Fiyat Sorunuz/Talep Et" yap), fiyat kısmını gizle ve Gri/Kırmızı renkle "Stokta Yok / Sadece Katalog Ürünü" etiketini bas.

Her iki durumda da dış API'den gelen ürün resmini, Orijinal OE numarasını ve muadil (cross-reference) kodlarını ekrana KESİNLİKLE bas.

SON UYARI: Tembellik yapıp Prisma'dan sorgu çekip bırakma. Ana amaç stokta olmayan parçanın dahi katalog bilgisini, muadillerini ve API görselini müşteriye sunmaktır.