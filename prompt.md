# GÖREV: Ürün Kartı (Product Card) Tasarımını Büyütme ve Satıcı Etiketi Ekleme

**DURUM:** `store.html` sayfasında ürünler başarıyla listeleniyor ancak kart boyutları göze çok küçük geliyor ve ürünü sisteme ekleyen bayinin (satıcının) kim olduğu kartta yazmıyor. 

Lütfen ürünü ekrana basan JS dosyasındaki (veya HTML içindeki) kart şablonunu (template literal) şu 2 adıma göre derhal güncelle:

### ADIM 1: SATICI (BAYİ) ETİKETİ EKLENMESİ
- API'den dönen verideki satıcı/bayi bilgisini (Örn: `product.user.companyName`, `product.user.name` veya satıcı adı hangi değişkendeyse onu) çek.
- Ürün görselinin hemen altına veya ürün başlığının (Title) üstüne şık, dikkat çekici bir Tailwind rozeti (Badge) ekle. 
- **Örnek Tasarım:** `<div class="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md text-xs font-semibold mb-2 shadow-sm"><svg ...>🏪</svg> Satıcı: ${product.user.companyName || 'Bilinmiyor'}</div>`

### ADIM 2: KART VE GÖRSEL BOYUTLARINI BÜYÜTME
- Ürünleri saran ana Grid kapsayıcısını (`<div class="grid...">`) bul. Sütun sayısını azaltarak kartların ekranda daha geniş yer kaplamasını sağla (Örneğin `lg:grid-cols-4` veya `5` ise, bunu kartları daha geniş tutacak şekilde `lg:grid-cols-3 xl:grid-cols-3` olarak değiştir).
- Kartın içindeki ürün görseli (image) kapsayıcısının yüksekliğini belirgin şekilde artır. Mevcutta `h-32` veya `h-40` ise bunu en az `h-52` veya `h-60` yap. Görselin net görünmesi ve kesilmemesi için `object-contain` class'ının olduğundan emin ol.
- Ürün başlığı (Title) ve Fiyat (Price) fontunu bir kademe büyüt ki kartın yeni boyutlarıyla orantılı dursun (Örn: Başlığı `text-base font-bold` yap).

**EMİR:** Kartın mevcut şık tasarımını bozmadan, B2B alıcısının "bu ürünü hangi bayiden alıyorum" sorusuna cevap verecek şekilde satıcı adını ekle ve grid yapısını esneterek kartları daha görünür/büyük hale getir.