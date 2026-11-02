# GÖREV: Vitrindeki Statik "Bakım Kiti / Önerilen Ürünler" Alanının Temizlenmesi

**DURUM:** `store.html` sayfasında (ürün kartlarının veya sepet/modal alanının altında) yer alan "BU PARÇAYI ALANLAR ŞUNLARI DA ALDI (BAKIM KİTİ)" başlığı ve altındaki ürünler (Castrol DOT 4, Würth Sprey vb.) tasarımda statik (hardcoded) olarak kalmıştır. Veritabanında bu ürünler bulunmamaktadır, bu da gerçek dışı bir görüntü yaratmaktadır.

Lütfen HTML dosyasında şu temizliği DERHAL uygula:

### ADIM 1: SAHTE ÇAPRAZ SATIŞ (CROSS-SELL) BLOĞUNU TAMAMEN SİL
- `store.html` veya ilgili JavaScript şablonu (template literal) içerisinde `BU PARÇAYI ALANLAR ŞUNLARI DA ALDI` metnini arat.
- Bu başlığı ve içindeki sahte (fake) ürün kartlarını kapsayan ana `<div...>` veya `<section...>` bloğunu koddan TAMAMEN SİL. 
- Eğer ileride bu yapıyı dinamik kurmak istersen diye kodu silmek yerine tamamen HTML yorum satırına (`<!-- ... -->`) da alabilirsin, ancak ekranda KESİNLİKLE görünmemelidir.

### ADIM 2: VERİ TUTARLILIĞI KONTROLÜ
- Sayfada sadece API'den (`GET /api/store/products`) gelen gerçek ürünler `map` veya `forEach` ile ekrana basılmalıdır.
- Kodun içinde unutulmuş başka sahte (statik) ürün kartı kalıntısı varsa, onları da tespit edip temizle.

**EMİR:** B2B platformunda sadece bayinin API aracılığıyla sisteme kaydettiği gerçek stoklar görünmelidir. Gömülü (hardcoded) gelen tüm sahte ürün önerilerini ve "bakım kiti" bloklarını arayüzden kaldır.