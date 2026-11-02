# GÖREV: Vitrin UI Statik Alanların Temizlenmesi ve Dinamik Başlık Kurgusu

**GÖREV BİLDİRİMİ:**
`store.html` sayfasındaki üst başlık alanı ve sol menüdeki araç seçim kutusu statik (hardcoded) verilerle dolu. Tasarımı sadeleştirmek ve başlıkları kullanıcının filtrelerine göre dinamik hale getirmek için HTML ve JS dosyalarında şu 3 adımı DERHAL uygula:

### ADIM 1: "SEÇİLİ ARAÇ" KUTUSUNU TAMAMEN SİL
- Sol menünün (Sidebar) en üstünde yer alan, içinde "Volkswagen Golf VII" yazan ve "Farklı Araç Seç" butonu barındıran **"SEÇİLİ ARAÇ"** kapsayıcı kutusunu (div) HTML'den TAMAMEN SİL. (Bu alan şimdilik boş kalacak, ileride yeniden kurgulanacak).

### ADIM 2: ANA BAŞLIĞI DİNAMİKLEŞTİR VE GİZLE
- Sayfanın üst kısmındaki `<h1>` (veya `<h2>`) etiketli **"Volkswagen Golf VII Uyumlu Tüm Yedek Parçalar"** yazan başlığa bir ID ver (Örn: `dynamic-page-title`).
- Bu başlığı sayfa ilk yüklendiğinde varsayılan olarak GİZLİ (`hidden` veya `display: none`) yap.
- JS dosyasındaki `buildAndFetchFilters()` (veya filtreleri dinleyen) fonksiyonun içine şu mantığı ekle: Eğer kullanıcı Marka/Model filtrelerinden birini seçerse (Örn: Hyundai), başlığın gizliliğini kaldır ve içindeki metni `${secilenMarka} Uyumlu Tüm Yedek Parçalar` olarak dinamik şekilde güncelle. Hiçbir marka/araç seçili değilse başlık gizli kalmaya devam etsin.

### ADIM 3: "3 ARAMA KRİTERİ" YAZISINI DİNAMİK SAYACA BAĞLA
- Ana başlığın altındaki **"(3 arama kriteri devrede ve B2B toptancı iskonto şartı aktif)"** yazısını kapsayan `span` veya `p` etiketine bir ID ver (Örn: `dynamic-criteria-text`).
- Sayfa ilk açıldığında bu yazıyı GİZLİ (`hidden`) yap veya içini boşalt.
- JS tarafında: Kullanıcının sol menüden seçtiği aktif filtre (checkbox) sayısını hesapla.
- Eğer aktif filtre sayısı 0'dan büyükse: Yazıyı görünür yap ve içine `(${aktifFiltreSayisi} arama kriteri devrede)` yazdır. Eğer filtre sıfırlanırsa (0 olursa) bu yazıyı tekrar gizle.

**EMİR:** Söylenen yerlerdeki statik yazıları (Volkswagen vs.) HTML'den temizle. Başlık ve kriter yazısını sadece filtre seçildiğinde JS ile doldurup görünür hale getirecek mantığı kur.