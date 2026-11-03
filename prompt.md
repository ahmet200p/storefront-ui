# KESİN GÖREV: B2B Çapraz OEM (Cross-Reference) ve Bayi Stok Tarama Motorunun Yazılması

**GÖREV BİLDİRİMİ:**
Mevcut arama (search) sistemi hatalıdır ve boş dizi dönmektedir. Kullanıcı bir OE kodu arattığında; sistem sadece o OE kodunu DEĞİL, harici API'den o kodun TÜM MUADİLLERİNİ bulmalı, ardından bu muadil havuzundaki tüm kodları yerel veritabanında (Prisma) tarayarak HANGİ BAYİDE/FİRMADA ne kadar stok olduğunu tespit etmelidir. (CSS veya Frontend UI değişikliği İSTENMİYOR, sadece Backend veri mantığı).

Lütfen Backend (Node.js) arama endpoint'ini (`GET /api/store/products` vb.) TAMAMEN SİL ve KESİNLİKLE aşağıdaki 3 aşamalı algoritmaya göre yeniden yaz:

### AŞAMA 1: HARİCİ API'DEN ÇAPRAZ OEM (MUADİL) HAVUZU OLUŞTURMA
- `axios` kullanarak `process.env.PARTS_CATALOG_API_KEY` ile dış API'ye (Parts.Catalogs/TecDoc) aranan kelimeyi/kodu (`searchQuery`) gönder.
- Dönen sonuçlardaki Orijinal OE kodu ve TÜM Muadil (Cross-reference) kodlarını ayıklayıp tek bir benzersiz `Array` (Dizi) içine topla (Örn: `oemPool = ['ArananKod', 'Muadil1', 'Muadil2', ...]`).
- Eğer dış API yanıt vermezse veya çökerse, `oemPool` sadece kullanıcının arattığı kodu barındırsın (Sistemin çökmesini engelle).

### AŞAMA 2: PRISMA İLE YEREL BAYİ/STOK TARAMASI (IN SORGUSU)
- Elde ettiğin bu geniş `oemPool` dizisini Prisma'ya vererek, bu kodlardan HERHANGİ BİRİNE sahip olan tüm yerel ürünleri getir:
  ```javascript
  const localProducts = await prisma.product.findMany({
      where: {
          isActive: true,
          oemNumber: { in: oemPool } // Sadece aranan kelime değil, tüm muadiller taranıyor!
      },
      include: {
          tenant: true // Parçanın hangi firmada (bayide) olduğunu bilmek zorundayız!
      }
  });
  Dış API'den dönen Katalog listesi ile localProducts listesini harmanla.

Frontend'in videodaki gibi detaylı bir tablo/liste basabilmesi için dönen JSON objesinin içine KESİNLİKLE şu alanları ekle:

brand (Marka)

oemNumber (Ana OEM Kodu)

crossReferences (Muadil Kodlar - Virgülle ayrılmış metin)

name (Ürün Adı)

stock (Stok Adedi)

price (Fiyat)

supplierName (Hangi Firmada/Bayide olduğu - product.tenant.name üzerinden)

isLocalStock (Bizim bayilerimizde varsa true, sadece katalog verisiyse false)

EMİR: Frontend tasarımıyla uğraşma. Arama endpoint'ini sadece girilen metni değil, girilen metnin MUADİLLERİNİ de yerel veritabanında IN operatörü ile arayacak ve HANGİ FİRMADA stok olduğunu (tenant ilişkisiyle) dönecek şekilde derhal inşa et. Hata yutmak (silent fail) yasaktır, catch bloğunda hataları konsola bas.
görsel farklı şimdi arama yaptım oe orada yazıyor fakat oem numarasının neye ait olduğu belirsiz ait olduğu teknik şema resmi yok farklı bir htmlden alıntı görsel girmiş girmesin o buraları full düzelt referans videosu atıcam sana ona benzesin video senin referansın bu şekilde çalışacak oem numarasıyla sorgu yapıcam ardından elimde stok varsa o en başta gözükecek firma isimleri yaazılacak fiyatları yazılacak ardından o oem numarasına karşılık gelebilecek referans kodları stokta varsa yaazacak yoksada yazacak capraz referans da gözüksün referansın orda sadece işe başla referans şeklinde yap css aynı olmak zorunda değil aynıda olmasın zaten çok farklı olabilir yeterki fikir eş değer olsun

