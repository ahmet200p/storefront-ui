# KRİTİK GÖREV: Filtreleme Eşleşmesi ve Yanlış Sayaç (Facet Count) Sorununun Çözümü

**HATA TESPİTİ:**
1. **Yanlış Sayım (Facet Count):** API'den tek bir ürün (Renault/OEM) dönmesine rağmen, sol menüdeki JS sayım algoritması hata yaparak Bosch, Ferodo, TRW, Brembo gibi alakasız checkbox'ların yanına `(1)` yazdırıyor.
2. **Kırık Filtreleme:** Yanında `(1)` yazan "Ön Fren Balatası" kategorisine tıklandığında ürün ekrandan kayboluyor ("Ürün bulunamadı" hatası). Bu durum, Frontend'in filtreleme yaparken kullandığı `value` ile Backend'den dönen veri (`product.category`) arasında kesin eşleşme (strict match) olmadığını gösteriyor.

Lütfen `store.html` ve JS dosyasında şu 3 adımı DERHAL uygula:

### ADIM 1: CHECKBOX "VALUE" DEĞERLERİNİ VERİTABANIYLA EŞİTLE
- Sol menüdeki tüm checkbox'ları (`<input type="checkbox">`) kontrol et.
- Bunların `value` attribute'ları, API'den dönen ürün objesindeki isimlerle BİREBİR aynı olmalıdır.
  *(Örnek: Veritabanında kategori "Ön Fren Balatası" olarak geçiyorsa, checkbox da kesinlikle `<input type="checkbox" value="Ön Fren Balatası">` olmalıdır. Başındaki/sonundaki boşlukları (trim) kontrol et.)*

### ADIM 2: YANLIŞ SAYIM (FACET COUNT) ALGORİTMASINI DÜZELT
- Ürünler geldiğinde sol menüdeki sayıları hesaplayan JS fonksiyonunu bul.
- Sayım algoritması tüm checkbox'lara rastgele `1` eklememelidir. Sadece gelen ürünün kendi markasına ve kategorisine 1 eklemelidir.
- **Doğru Mantık:**
  ```javascript
  const brandCounts = {};
  const categoryCounts = {};
  
  products.forEach(product => {
      // Veritabanından gelen tam string değerine göre say
      brandCounts[product.brand] = (brandCounts[product.brand] || 0) + 1;
      categoryCounts[product.category] = (categoryCounts[product.category] || 0) + 1;
  });
  
  // Sonra sadece ilgili data-filter etiketlerine bu sayıları bas, olmayanlara (0) bas.

  ADIM 3: FİLTRELEME (CLICK) AKSİYONUNU DÜZELT
Checkbox'a tıklandığında Backend'e (veya Frontend filtreleme fonksiyonuna) giden değeri logla: console.log("Filtrelenen Kategori:", secilenKategori);

Filtreleme işleminin büyük/küçük harf duyarlılığı (case sensitivity) yüzünden patlamaması için, karşılaştırma yaparken her iki tarafı da .toLowerCase().trim() ile normalize et veya Prisma tarafında eşleşmenin sorunsuz yapıldığından emin ol.

EMİR: Filtre tıklandığında ürünün yok olması veri uyumsuzluğundandır. Checkbox value değerlerini gerçek veritabanı verileriyle birebir eşleştir ve rastgele (1) yazan sayım döngüsünü kesin (strict) karşılaştırma yapacak şekilde düzelt.