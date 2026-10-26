"Sepet ve ödeme onayı çekmecesinin (cart.js, checkout.js veya ilgili dosya) mantığında eksikler var. Lütfen sipariş tamamlama fonksiyonuna ve arayüze şu 4 kritik validasyon kuralını ekle:

Adres Doğrulaması: Kullanıcının teslimat adresi değişkeni boşsa veya tanımlanmamışsa, 'Siparişi Onayla' butonuna tıklandığında backend'e fetch isteği kesinlikle atılmasın. Kullanıcıya 'Lütfen geçerli bir teslimat adresi girin veya seçin' şeklinde bir uyarı (toast/alert) gösterilsin.

Cari Hesap Kısıtlaması: 'Cari Hesap (Açık Hesap)' ödeme seçeneği sadece sisteme giriş yapmış ve role (veya customerType) değeri 'B2B' / 'Otoservis' olan kullanıcılar için <select> içinde listelensin. Kullanıcı bireysel (retail) ise bu seçeneği DOM'dan gizle veya kaldır.

Havale/EFT Bilgileri Açılır Kutusu: Dropdown'dan 'Banka Havalesi / EFT' seçildiğinde, select kutusunun hemen altında Ahmet Oto'ya ait örnek bir IBAN, Banka Adı ve Alıcı Adı gösteren bir bilgi kutusu (div) dinamik olarak görünür hale gelsin.

Kredi Kartı Engeli: 'Kredi Kartı / 3D Secure' seçildiğinde, henüz sanal POS entegrasyonu olmadığı için 'Siparişi Onayla' butonunu anında pasif (disabled) hale getir. Ayrıca butonun üstüne kırmızı renkle 'Sanal POS entegrasyon aşamasındadır, lütfen şimdilik Havale/EFT seçiniz' yazan bir bilgi notu ekle."