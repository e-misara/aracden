# AraçDen Proje Geçmişi

> Son güncelleme: 2026-05-21
> Toplam DB review sayısı: **5,159**
> Repo: https://github.com/e-misara/aracden
> Production: https://aracden.vercel.app

---

## Sistem Durumu

### Stack
- **Frontend/SSR:** Next.js 16.2.4 (Turbopack) + React 19 + TypeScript + Tailwind CSS 4
- **Database:** PostgreSQL on **Neon** (Frankfurt — eu-central-1)
  - `DATABASE_URL` Vercel production env'inde mevcut
  - Connection: `@prisma/adapter-pg` + `pg.Pool` (lib/prisma.ts)
- **Auth:** NextAuth.js v4 (JWT, credentials + Google)
- **AI:** Anthropic SDK 0.91.1 (claude-sonnet-4-6) — `/api/ai-edit` ile review zenginleştirme
- **Deploy:** Vercel (e-misara/aracden)

### Aktif DB Tabloları
- **User** (auth)
- **Post** (kullanıcı yorumları — UI form üzerinden)
- **Comment, Vote** (post etkileşimleri)
- **Review** (5,159 kayıt — scraping/import ile beslenir, **bu projenin ana veri kaynağı**)

### Mevcut Sayfalar/Route'lar
- `/` — Anasayfa, 5 kategori sekmesi + FilterPanel
- `/[category]` — Kategori sayfası, marka grid + FilterPanel
- `/[category]/[brand]` — Marka sayfası
- `/[category]/[brand]/[model]` — Model detay
- `/post/[id]` — Post detay
- `/write` — Yeni deneyim formu (4 adım)
- `/auth/login`, `/auth/register`
- `/en-iyiler`, `/kronik`

### API Route'ları
- `GET /api/reviews?marka=X&model=Y&kategori=Z&limit=N&page=P` — **Review DB'den** (5,159 kayıt)
- `GET /api/posts` — Post tablosu (kullanıcı yorumları)
- `GET /api/categories` — Kategori ağacı
- `POST /api/ai-edit` — Claude API ile review düzenleme
- `GET /api/stats` — Site istatistikleri

### Kurulu Dosyalar
| Dosya | Açıklama |
|-------|----------|
| `lib/vehicles-data.ts` | 54 otomobil + 26 SUV + 18 motosiklet + 18 minivan + 23 ticari markası (Sahibinden.com formatı). `vehiclesData` ve `KATEGORILER` export. |
| `lib/sample-reviews.ts` | **849 byte stub** — interface tanımı kalmış, array boşalmış (DB'ye taşındı). |
| `lib/categories.ts` | Kategori slug/label/emoji mapping |
| `lib/vehicle-images.ts` | Wikimedia Commons araç görselleri + 5 SVG placeholder |
| `prisma/schema.prisma` | Review modeli + 3 index (marka+model, kategoriSlug, izlenme desc) |
| `scripts/import-reviews.ts` | sample-reviews.ts → DB import |
| `scripts/import-batch2.ts` | CLI argv ile çoklu JSON → DB import (batch3/4/5'te yeniden kullanıldı) |
| `components/FilterPanel.tsx` | Marka → Model → KasaTip → Motor cascade (vehiclesData'dan, URL push destekli) |
| `components/ReviewSection.tsx` | DB'den fetch + pagination + verified rozeti |
| `components/ExperienceForm.tsx` | UI'dan yeni post oluşturma |

---

## Tamamlanan Fazlar

### FAZ 1 — vehicles-data.ts ilk üretim
Sahibinden.com'dan elle alınan veri ile 5 kategori × ~120 marka × ~1500 araç kombinasyonu.

### FAZ 2 — vehicle-images.ts + SVG placeholder
- 49 gerçek Wikimedia Commons araç görseli
- 5 kategori SVG placeholder (`/public/images/ph-{otomobil,suv,moto,minivan,ticari}.jpg`)
- loremflickr kaldırıldı

### FAZ 3 — Sample reviews + review-prompt.ts
- 25 sample review (And Çetin tarzı)
- Türkçe `reviewEditPrompt` (Claude API ile AI editing)

### FAZ 4 — Site overhaul (#FF6000 sahibinden teması)
- 5 kategori sekmesi
- FilterPanel, ReviewSection, ExperienceForm yeni component'ler
- `/api/reviews`, `/api/ai-edit` yeni route'ları
- Homepage ve `/write` yeniden yazıldı

### FAZ 5 — UI ince ayarlar
- FilterPanel: "Ara" butonu kaldırıldı, yıl seçince otomatik tetikleme
- Kategori sayfalarında sample reviews görünür hale geldi
- Fiat Egea 2021 test review eklendi

### FAZ 6 — vehicles-data.ts gerçek veri + cascade güncelleme
- Sahibinden.com'dan elle alınan gerçek veri ile dosya tamamen yeniden yazıldı
- FilterPanel: Yıl → KasaTip + koşullu Motor dropdown (vehiclesData'dan)
- URL navigation (withUrl prop) eklendi

### Veri Toplama Batch'leri (FAZ 6'dan sonra)

#### Batch 1 — @andmcetin (And Mehmet Çetin)
- yt-dlp ile YouTube kanal: 125 public video metadata
- andcetin.com sitemap: 30 Türkçe makale (~35K kelime)
- testdrives tablosu: 255 test sürüşü kaydı
- **Üretilen review: 206 → 204 (mevcut sample-reviews.ts'te)**
- Commit: `ec10717`

#### Batch 2 — 4 Türk kanalı + ilk Şikayetvar
YouTube playlistItems API:
- **Doğan Kabak** (2.79M abone): 25 review
- **carviser** (608K abone): 70 review
- **Otomobil Günlüklerim** (545K, derin tarama): 922 review ⭐
- **DonanımHaber Otomobil**: 76 review
- **arabamcom**: 37 review

Şikayetvar.com v1 (18 marka, sayfa 1): 200 review

**Batch 2 toplamı: +1,272 review → DB: 1,272**
Commit: `96ec55f` (DB migration) + `69de0ba` (batch2 import)

#### Batch 3 — Motor1 Türkiye + Şikayetvar v3
- **Motor1 Türkiye** (277K): 677 review ⭐⭐
- **BiRKAN DEMiR CALiSKAN** (carmagazineturkiye, 69K): 117 review
- **Oto Gündem** (22.7K): 265 review
- **Analiz Moto Eksper** (otoanaliz, 57.8K): 36 review

Şikayetvar v3 (motosiklet + ticari + ek otomobil = 34 marka): 148 review (37 dup atlandı)

**Batch 3: +942 → DB: 2,777**
Commit: `da102fa`

#### Batch 4 — Otomobil ANLATICISI + Şikayetvar derin (p2-5)
- **Otomobil ANLATICISI** (arabahaberleri, 125K): **902 review** ⭐⭐
- **AutoVlog** (otoblog, 803K): 142 review
- **AutoSHOW Dergisi** (turkishautoshow, 2.7K): 82 review
- **Oto Türkiye** (1.1K): 55 review

Şikayetvar derin (28 marka × p2-5): 593 review

**Batch 4: +1,774 → DB: 4,551**
Commit: `0ff756e`

#### Batch 5 — Küçük Burjuvazi + Şikayetvar p6-10 + Web
- **Küçük Burjuvazi** (1.03M): 51 review ⭐
- **otopark.com** sitemap (80 makale): 36 review
- **arabam.com blog** sitemap (7 makale, CF kısıtlı): 1 review
- Şikayetvar derin p6-10 (28 marka × 5 sayfa): 520 review

**Batch 5: +608 → DB: 5,159**
Commit: `196df36`

---

## Veri Kaynakları

### YouTube Kanallar (15 kullanıcı, ~3,800 review)
| Kanal | Abone | Review |
|-------|------:|------:|
| **Otomobil Günlüklerim** | 545K | 922 |
| **Otomobil ANLATICISI** | 125K | 902 |
| **Motor1 Türkiye** | 277K | 677 |
| Oto Gündem | 22.7K | 265 |
| andmcetin (And Mehmet Çetin) | — | 204 |
| AutoVlog | 803K | 142 |
| BiRKAN DEMiR CALiSKAN | 69K | 117 |
| AutoSHOW Dergisi | 2.7K | 82 |
| DonanımHaber Otomobil (DH+) | 14.9K | 76 |
| carviser | 608K | 70 |
| Oto Türkiye | 1.1K | 55 |
| Küçük Burjuvazi | 1.03M | 51 |
| arabamcom | 21.8K | 37 |
| Analiz Moto Eksper | 57.8K | 36 |
| Doğan Kabak | 2.79M | 25 |

### Şikayetvar.com (1,461 review = %28 of DB)
- 51 marka (18 otomobil + 10 motosiklet + 8 ticari + 16 ek otomobil — bazı tekrarlar)
- Sayfa 1-10 derinlik
- Puan 1.5, sentiment: COMPLAINT
- En çok geçen modeller: **Tesla Model Y, TOGG T10X, Audi A3, Dacia Sandero Stepway, Honda PCX**

### Web Makaleler (37 review)
- **otopark.com**: 36 makale (sitemap üzerinden)
- **arabam.com blog**: 1 makale (CloudFlare kısıtlamasıyla derin tarama mümkün olmadı)

### andcetin.com (Özel: 30 makale + 255 test sürüşü tablosu)
Yerel arşiv: `/Users/GAC-A/andmcetin-data/output/` (testdrives_full.json, articles.json, youtube_videos.json)

### Marka/Model Kapsamı (5,159 review)
**Top 10:** Renault 330 · Volkswagen 328 · Hyundai 306 · Ford 300 · Skoda 285 · Dacia 274 · Audi 268 · Seat 260 · Honda 247 · Peugeot 240

5 kategori aktif: otomobil, arazi-suv, motosiklet, minivan-panelvan, ticari

---

## Başarısız/Bulunmayan Kaynaklar (Önemli Notlar)

| Kaynak | Sebep |
|--------|-------|
| sahibinden.com | 403 CloudFlare (15+ URL denedi, hepsi engellendi) |
| arabam.com derin scraping | CloudFlare bot challenge |
| otofis.com | Yanlış site (B2B yazılım firması) |
| otogunluk.com | DNS çözülemedi |
| arabalar.com | HugeDomains'te satılık |
| YouTube üye-only videolar (~77 adet @andmcetin) | Kanala katılım gerektiriyor |
| YouTube otomatik altyazı | PO token gerekiyor (rate limit) |
| Bazı kanallar (@ototest, @toggofficial vb. ~15 handle) | YouTube'da gerçekten mevcut değil — search en aboneliyi seçmesin diye threshold uygulandı |

---

## Yarın Yapılacaklar

### Yüksek Öncelik
- [ ] **Vercel preview env'e DATABASE_URL ekle** — PR önizlemelerinin de DB'ye erişebilmesi için:
  ```bash
  printf "%s" "$NEON_URL" | npx vercel env add DATABASE_URL preview
  ```
- [ ] **Neon parolasını rotate et** (chat'te paylaşıldı, güvenlik): https://console.neon.tech → Roles → Reset password → `.env` + Vercel env güncelle
- [ ] **ReviewSection kasaTip filtre opsiyonu** — şu an `kategoriSlug + marka + model` ile filtreliyor, kasaTip parametresi de eklenebilir (daha dar filtre için)

### Veri Genişleme
- [ ] **arabam.com derin scraping (Playwright/Selenium)** — sitemap'ten daha fazla makale çıkarmak için CloudFlare bot challenge'ı bypass etmek gerek
- [ ] **Şikayetvar p11+ sayfalar** — bazı markalarda hala yeni şikayet üretiliyor olabilir (örn. TOGG, Tesla için sayfa 11-15)
- [ ] **Sözlük formatları normalize et:**
  - Mevcut review'larda 521 model "kategori yok" olarak atlandı (Şikayetvar'da varyant adları vehicles-data.ts'de yok). Bu modelleri vehicles-data'ya ekleyince extra +500 review kazanılır.
- [ ] **Yeni YouTube kanalları:**
  - Türk dub'lu yabancı kanallar
  - @ihatemyselfwhenipost — Carwow Türkiye?
- [ ] **Otomobil dergileri** — otoyorum, autocar TR, Top Gear TR (varsa)

### Veri Kalitesi
- [ ] **andmcetin review'larda 111 generic icerik** ("Detaylı yorum için video kaynağını izleyin") — Whisper STT ile Dailymotion video sesleri transkribe edilirse zenginleştirilebilir (saatler sürer, GB disk)
- [ ] **Şikayetvar tarihleri** — şu an hepsine "2026-05-21" atanıyor; orijinal "20 Mayıs 18:17" formatı parse edilip gerçek tarih kullanılabilir
- [ ] **olumlu/olumsuz keyword extraction iyileştirme** — şu an basit regex, Claude API ile gerçek özetleme yapılabilir (Anthropic kredi gerek)
- [ ] **Vehicle match accuracy** — Şikayetvar p1-10'da 779 kayıt model yok diye atlandı; daha geniş model listesi (`COMMON_MODELS`) eklenebilir

### Sistem İyileştirme
- [ ] **Dev'de Prisma adapter pg deprecation warning** — `sslmode=require` → `sslmode=verify-full` veya `uselibpqcompat=true` (production'a etki yok)
- [ ] **Türkçe arama desteği** — `marka` parametresine LIKE/fuzzy match (`Mercedes` yerine `mercedes-benz` veya `mers` de bulunabilsin)
- [ ] **Review sıralama opsiyonları** — `?sort=newest|popular|controversial` (şu an default izlenme desc)
- [ ] **Image upload** — kullanıcı yeni post yazarken araç fotoğrafı ekleyebilsin

### Önceki Backlog'tan
- [ ] **Mobile responsive test** — tüm sayfalar
- [ ] **SEO meta tags + sitemap.xml + robots.txt**
- [ ] **Kullanıcı profil sayfası**
- [ ] **Stats dashboard** (en çok yorum alan model, en kötü puan vb.)

---

## Önemli Dosya Konumları

### Yerel Veri Arşivi (Git'te yok, sadece local)
- `/Users/GAC-A/andmcetin-data/` — tüm scraping verisi (~30 MB)
  - `output/` — andmcetin (YouTube + andcetin.com)
  - `channels/` — turkish, turkish2, turkish3, turkish4, turkish5, foreign, arabamcom, dhotomobil
  - `sikayetvar/` + `sikayetvar/derin/` + `sikayetvar/derin6-10/` — şikayet arşivi
  - `otopark-web/`, `arabamcom-web/` — web makale arşivi
  - `vehicles_flat.json` — vehicles-data.ts'nin flat haritası
  - `sample-reviews-backup-1272.ts.bak` — eski tam sample-reviews dosyası (yedek)

### Aracden Repo
- `lib/` — vehicles-data, sample-reviews, prisma, categories
- `app/` — Next.js routes (5 kategori + auth + write + api)
- `components/` — UI bileşenleri
- `prisma/schema.prisma` — DB schema
- `scripts/import-*.ts` — DB import script'leri
- `.env` — DATABASE_URL (Neon), ANTHROPIC_API_KEY (şu an placeholder), NEXTAUTH

### Aracden ENV Anahtarları
| Key | Lokasyon | Durum |
|-----|----------|-------|
| DATABASE_URL | Neon (Frankfurt) | ✓ aktif, prod'da |
| ANTHROPIC_API_KEY | aracden/.env | ⚠ placeholder, kredi gerek |
| GOOGLE_CLIENT_ID/SECRET | aracden/.env | aktif |
| NEXTAUTH_SECRET, NEXTAUTH_URL | aracden/.env | aktif |
| YOUTUBE_API_KEY | /Users/GAC-A/andmcetin-data/.env.local | aktif (scraping için) |

### Git Commit Geçmişi (son 10)
```
196df36 db: batch5 import (turkish5 + Sikayetvar p6-10 + otopark+arabam web)
0ff756e db: batch4 import (Otomobil ANLATICISI + 3 yeni kanal + Sikayetvar derin)
da102fa db: batch3 import (Motor1 + BirkanDemir + Sikayetvar v3)
69de0ba db: batch2 import (4 yeni kanal + Sikayetvar)
96ec55f db: Review modeli + 1272 review icin PostgreSQL migration
ec10717 sample-reviews: andmcetin verisinden 206 gercek review uret
7255cf3 FAZ 6: vehicles-data.ts gercek veri, FilterPanel cascade
80a0fa8 fix: faz 5 ince ayarlar
... (önceki faz'lar)
```

---

## Bonus: Önemli Matematiksel/Teknik Düzeltmeler (Hatırlatma)

Bu projede yapılan **kullanıcı talimatından sapan düzeltmeler** (kullanıcı "yalakalık istemiyor: yanlış şey isterse matematikle düzeltilsin" demişti):

1. **SQLite önerisi reddedildi** → PostgreSQL (Neon) seçildi. Sebep: Vercel'de SQLite filesystem geçici, kalıcı çalışmaz.
2. **Sınıf kodu → puan eşlemesi düzeltildi** → And Çetin'in sınıf kodu segment'tir (boyut/tür), puan değil. Sayısal puan (1-10) ÷ 2 → 0.5-5.0 doğru dönüşüm.
3. **Dedup key genişletildi** → Sadece `kaynakUrl` yerine `kaynakUrl + marka + model + yıl`. Sebep: And Çetin'in "cars I've experienced" makalesi 20+ farklı aracı tek URL'de tutuyor, yanlış duplicate sayılmasın diye.
4. **3 ölü teknik veri sitesi raporlandı** → otofis/otogunluk/arabalar.com hiçbiri otomobil sitesi değil, boş veri üretmek yerine durum bildirildi.
