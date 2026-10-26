Konsol loglarında store.html ve api.js kaynaklı çoklu API hataları var. Proje headless mimaride çalıştığı için eski otomatik subdomain algılama mantığı çöküyor. Lütfen vitrin tarafındaki API altyapısını şu şekilde düzelt:

Otomatik tenant bulma (URL'den veya host'tan tenant çıkarma) mantığını tamamen iptal et. Kodun en üstüne const TENANT_SLUG = 'ahmetoto'; şeklinde sabit bir kimlik tanımla.

Kendi Netlify domainine istek atmasını engelle. API_BASE değerini kesin ve sabit olarak '[https://saas-g-ncel-10-10-2026simdi-main.onrender.com/api](https://saas-g-ncel-10-10-2026simdi-main.onrender.com/api)' olarak ayarla.

400 Bad Request hatasını çözmek için, GET /api/store/products (ve diğer tüm store endpoint'leri) isteklerine TENANT_SLUG değerini hem Header ('x-tenant-slug': TENANT_SLUG) olarak ekle, hem de garantilemek için URL parametresi (?tenant=ahmetoto) olarak geçir.