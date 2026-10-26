Müşteri vitrininde ürün kartları listelenirken stok bilgisi hatalı çalışıyor ve etiketlerin CSS tasarımı bozuluyor. Lütfen ürün kartını render eden HTML/JS kodlarını şu iki maddeye göre düzelt:

Ürün görselinin üzerindeki etiketlerin (OE Kodu, Marka, Tükendi/Stok durumu) birbiri üzerine binmesini engelle. Bu etiketlerin bulunduğu Tailwind CSS kapsayıcısına flex-wrap ve gap-2 sınıflarını ekleyerek taşmaları düzenli hale getir.

API'den gelen stok verisinin okunma koşullarını düzelt. Backend'den gelen stok miktarını doğru obje anahtarından (örn: product.stock) oku. Eğer stok 0'dan büyükse "Tükendi" ve "Stokta Tükendi" yazılarını tamamen gizleyip "Sepete Ekle" akışını aktif et.