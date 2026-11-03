# ACİL DÜZELTME: Parts.Catalogs API Entegrasyonu Çalışmıyor (Boş Dizi Dönüyor)

**HATA TESPİTİ:**
Arama endpoint'ine istek atıldığında `data: []` (boş dizi) dönüyor. Sistem `axios` ile Parts.Catalogs API'sine GİTMİYOR ya da gidiyorsa hatayı yutuyor (silent fail). Müşteri bir parça arattığında, lokal stokta olmasa bile dış katalogdan çekilip listelenmesi KESİNLİKLE şarttır.

Lütfen Backend (Node.js) arama controller'ını aç ve şu 3 adımı harfiyen uygula:

### ADIM 1: ARAMA ENDPOINT'İNİ AXIOS İLE ZORUNLU YAZ
Arama yapılan endpoint'i şu şekilde GÜNCELLE. Kendi başına basit Prisma sorgusu YAZMA:

```javascript
// Gerekli importlar: const axios = require('axios');
app.get('/api/store/products', async (req, res) => {
    const searchQuery = req.query.search;
    let finalResults = [];

    try {
        if (searchQuery) {
            console.log("Parts.Catalogs API'ye gidiliyor... Aranan:", searchQuery);
            // DİKKAT: Aşağıdaki URL'yi Parts.Catalogs dökümanına göre DÜZELT! (Örn: /api/v1/search)
            const apiUrl = `[https://api.parts.catalogs.com/v1/search?q=$](https://api.parts.catalogs.com/v1/search?q=$){searchQuery}&api_key=${process.env.PARTS_CATALOG_API_KEY}`; 
            
            const catalogResponse = await axios.get(apiUrl);
            
            // Eğer API sonuç döndüyse, bunları final dizisine ekle
            if (catalogResponse.data && catalogResponse.data.results) {
                finalResults = catalogResponse.data.results.map(item => ({
                    ...item,
                    isLocalStock: false, // Varsayılan olarak stokta yok
                    stock: 0,
                    price: null
                }));
            }
        }
        
        // 2. AŞAMA: Prisma'da (Lokal DB) arama yap
        const localProducts = await prisma.product.findMany({
            where: { 
                isActive: true, 
                OR: [
                    { oemNumber: { contains: searchQuery, mode: 'insensitive' } },
                    { name: { contains: searchQuery, mode: 'insensitive' } }
                ]
            }
        });

        // 3. AŞAMA: Harmanlama (Local olanları üstte tut, çakışan katalog verilerini ez)
        // (Harmanlama mantığını buraya yaz)
        // finalResults = [ ...localProducts, ...kalanKatalogUrunleri ];

        return res.status(200).json({ success: true, data: finalResults, count: finalResults.length });
    } catch (error) {
        console.error("Dış API veya DB Hatası:", error.message);
        // Hatayı yutma, konsola ve cevaba bas!
        return res.status(500).json({ success: false, error: "Arama sırasında bir hata oluştu", details: error.message });
    }
});