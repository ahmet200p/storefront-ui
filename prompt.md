# PROJE GÖREVİ: Pazarlama ve Büyüme (Growth) Modülleri - Frontend Mimarisi

**GÖREV BİLDİRİMİ:**
`store.html` (B2B Vitrin) sayfasına ustaların satışlarını artıracak ve platforma veri besleyecek 3 yeni UI/UX özelliği entegre edeceksin. Tasarımlar Mobile-First standartlarında olacak.

**1. WHATSAPP TEKLİF PAYLAŞIM BUTONU:**
- Sepet modülünün içine veya parça listesinin üzerine yeşil, dikkat çekici bir **"💬 Müşteriye Teklif Gönder (WhatsApp)"** butonu ekle.
- **İşleyiş:** Butona tıklandığında, ekrandaki parçaları `POST /api/quotes/generate` endpoint'ine gönderip bir teklif linki (URL) al.
- Ardından otomatik olarak şu formatta bir WhatsApp penceresi aç (`window.open('https://wa.me/?text=...', '_blank')`):
  *"Merhaba. Aracınızın bakım/onarım işlemi için gerekli parçalar ve toplam maliyet teklifi hazırlanmıştır. Detayları buradan inceleyebilirsiniz: [TEKLİF_LINKI]"*

**2. İNTERAKTİF OEM ŞEMA (TIKLANABİLİR GÖRSEL) TASARIMI:**
- `store.html` içindeki teknik şema (image) render alanını geliştir. Eğer Backend'den gelen görsel objesinde `hotspots` (koordinatlar) dizisi varsa; resmi `position: relative` bir kapsayıcı (div) içine al.
- Bu koordinatlara (x, y) denk gelen yerlerin üzerine `position: absolute` ile şeffaf, hover olunca etrafı parlayan (border-blue-500) tıklanabilir div'ler (veya rozetler) yerleştir.
- Usta bu şema üzerindeki noktaya (örneğin 3 numaralı parçaya) tıkladığında, o parça otomatik olarak sepete eklensin veya listeye vurgu (highlight) yapılarak odaklansın.

**3. KAYIP ARAMA (NO-HIT) SESSİZ TETİKLEYİCİSİ:**
- Arama motoru fonksiyonunu (`fetch` işlemini) incele. Eğer API'den dönen parça sayısı `0` ise ve ekrana "Aramanıza Uygun Parça Bulunamadı" yazısı basılıyorsa;
- Ekrana basma işlemiyle aynı anda (arka planda, kullanıcıya hiçbir loading veya uyarı göstermeden) aranan o kelimeyi (Şasi veya OE kodunu) `POST /api/analytics/no-hit` endpoint'ine yolla.
- Böylece boş dönen her arama arka planda adminin stoğa eklemesi için loglanmış (kayıt altına alınmış) olacak.

Tüm DOM manipülasyonlarını ve API entegrasyonlarını `store.html` yapısına zarar vermeden entegre et.