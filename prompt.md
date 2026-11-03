# KRİTİK GÖREV: "Satın Alma Rehberi" Kutusunu Dinamikleştirme ve Gizleme

**HATA TESPİTİ:**
`store.html` sayfasının alt kısmında yer alan "Otomotiv Yedek Parçaları Satın Alma Rehberi" bloğu şu an statik (hardcoded). Kullanıcı filtreleme yapmasa da veya alakasız bir marka (Örn: Mercedes) aratsa da ekranda sürekli "VAG Fren Balatası" bilgileri çıkıyor. Bu alan tamamen dinamik olmalı ve sadece ilgili parça/marka aratıldığında görünmelidir.

Lütfen HTML ve JS tarafında şu 3 adımı KESİNLİKLE uygula:

### ADIM 1: REHBER KUTUSUNU GİZLEME VE ID ATAMASI
- HTML dosyasında "Otomotiv Yedek Parçaları Satın Alma Rehberi" başlığını kapsayan ana `<div...>` veya `<section...>` bloğunu bul.
- Bu kapsayıcıya `id="dynamic-guide-section"` ver ve varsayılan olarak GİZLİ (`hidden` veya `display: none`) yap. Eğer hiçbir arama yoksa bu kutu KESİNLİKLE ekranda yer kaplamamalıdır.
- Kutu içindeki başlık, sol metin alanı ve sağdaki tablo kısmına da JS ile müdahale edebilmek için ID'ler (Örn: `guide-title`, `guide-content`, `guide-table`) ata.

### ADIM 2: JAVASCRIPT İÇİNDE BİLGİ BANKASI (DICTIONARY) OLUŞTURMA
- `store.html`'e bağlı JS dosyasının üst kısımlarına şu tarz bir bilgi bankası objesi ekle:
  ```javascript
  const guideData = {
      "Fren Sistemi": {
          title: "Fren Sistemi Satın Alma Rehberi",
          content: "Doğru parçayı seçmek için aracınızın PR kodlarını kontrol ediniz...",
          tableHtml: "<li>Ön Fren Balatası: ...</li>" // Buraya tablo HTML'i gelecek
      },
      "Mercedes": {
          title: "Mercedes-Benz Orijinal Yedek Parça Rehberi",
          content: "Mercedes araçlarda şasi numarası (VIN) kontrolü zorunludur...",
          tableHtml: "<li>OEM Referansları...</li>"
      }
  };
  Sayfadaki kategoriye tıklandığında veya arama yapıldığında tetiklenen filtreleme fonksiyonuna (Örn: buildAndFetchFilters) şu mantığı ekle:

Kullanıcının seçtiği kategori veya marka, guideData objesinde var mı diye kontrol et.

EĞER VARSA: Rehber kutusunun (dynamic-guide-section) gizliliğini kaldır (classList.remove('hidden')) ve içindeki başlık/metin alanlarını guideData'dan gelen verilerle (innerHTML veya textContent kullanarak) doldur.

EĞER YOKSA veya FİLTRE TEMİZLENDİYSE: Kutuya tekrar hidden class'ını ekleyerek ekrandan tamamen kaldır.