# KRİTİK GÖREV: Bayi Paneli ve B2B Vitrin Arası Veri Senkronizasyonu (Data Fetching)

**DURUM BİLDİRİMİ VE HATA TESPİTİ:**
Mevcut durumda `bayi.html` üzerinden sisteme eklenen (veritabanına yazılan) stoklu ürünler, `store.html` (B2B Vitrin) sayfasında listelenmiyor. Sayfa ilk açıldığında ortada "Toplam 0 adet parça listelendi" şeklinde boş bir ekran (Empty State) çıkıyor. Bu iki arayüzün (Veri Girişi ve Veri Gösterimi) birbirinden kopuk olması B2B mantığına aykırıdır. 

Lütfen aşağıdaki Full-Stack (Backend + Frontend) adımlarını uygulayarak sistemi %100 senkron hale getir:

### ADIM 1: BACKEND (API & PRISMA) SENKRONİZASYONU
1. `bayi.html` üzerinden ürün eklendiğinde (POST isteği) Prisma'da hangi veritabanı modeline (Örn: `Product`, `Inventory` veya `Part`) kayıt yapılıyorsa, `store.html` sayfasının ürünleri çektiği GET API'si de KESİNLİKLE aynı modeli sorgulamalıdır (`prisma.product.findMany()`).
2. Vitrin için genel bir GET endpoint'i oluştur veya düzelt (Örn: `/api/products/catalog`). Bu endpoint, isActive/stok durumu gibi basit filtrelerle veritabanındaki kayıtlı tüm ürünleri JSON olarak dönmelidir.

### ADIM 2: FRONTEND (`store.html`) İLK YÜKLEME (INITIAL LOAD) MANTIĞI
1. `store.html` dosyasındaki JavaScript kodunu incele. Sayfa ilk açıldığında (`DOMContentLoaded`), kullanıcının arama çubuğuna bir şey yazmasını veya "Ara" butonuna basmasını BEKLEMEDEN çalışan bir `fetchInitialCatalog()` fonksiyonu yaz.
2. Bu fonksiyon, sayfa yüklenir yüklenmez Adım 1'deki GET API'sine istek atıp, veritabanındaki mevcut tüm ürünleri (veya ilk 50 ürünü sayfalanmış şekilde) çekmelidir.

### ADIM 3: UI RENDER VE DOM MANİPÜLASYONU
1. API'den dönen ürün dizisi (array) boş değilse, ekrandaki "Aramanıza Uygun Parça Bulunamadı" uyarı bloğunu gizle (display: none).
2. Dönen diziyi `map()` veya `forEach()` ile dönerek, her bir ürün için HTML Ürün Kartını (veya satırını) dinamik olarak oluştur ve "Yedek Parça Kataloğu" alanına bas.
3. Toplam parça sayısını ekrandaki "Toplam X adet parça listelendi" metnine dinamik olarak yazdır.

**GÖREV ÖZETİ:** `bayi.html`'den eklenen bir parça, `store.html` sayfası yenilendiği (F5) anda herhangi bir aramaya gerek kalmadan vitrinde otomatik olarak listelenecektir. Araya manuel onay (Admin Approval) veya yanlış tablo sorgusu girmeyecektir. Kodları bu senkron mimariye göre güncelle.s