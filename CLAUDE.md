# ADIM-İST prototip sitesi (GitHub Pages)

Bu depo https://realle76-alt.github.io/adim/ adresinde yayınlanır; main dalına yapılan her push 1-2 dakikada siteye yansır.

Prototiplerden biri (öğrenci, gişe, panel) güncellendiğinde:
- Çevrimdışı tek dosya sürümünü (ADIM-IST_ogrenci.html / ADIM-IST_gise.html / ADIM-IST_panel.html) buraya ogrenci.html / gise.html / panel.html olarak kopyala.
- head etiketinin hemen ardından gelen `<meta name="robots" content="noindex,nofollow">` satırını koru.
- Kişisel veri, gerçek ad ya da Supabase service_role anahtarı bu depoya asla girmez. config.js'teki publishable anahtar geneldir.
- Commit mesajına neyin değiştiğini yaz ve doğrudan main'e push et.

canli.html Supabase'teki adim_gunluk görünümünü okur (yalnızca girişle). sunucu/ içindeki sync_ogr.js öğrenci APK'sına gömülür; değişirse APK yeniden derlenmelidir.
