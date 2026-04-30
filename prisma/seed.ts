import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const pw = await bcrypt.hash("test1234", 12);

  const murat = await prisma.user.upsert({
    where: { email: "murat@test.com" },
    update: {},
    create: { name: "Murat Tekin", email: "murat@test.com", passwordHash: pw },
  });

  const ayse = await prisma.user.upsert({
    where: { email: "ayse@test.com" },
    update: {},
    create: { name: "Ayşe Kaya", email: "ayse@test.com", passwordHash: pw },
  });

  const posts = [
    {
      userId: murat.id, category: "OTOMOBIL" as const, brand: "TOGG", model: "T10X", year: 2023,
      fuelType: "Elektrik", kmUsed: "24000 km", usagePeriod: "14 ay",
      sentimentType: "COMPLAINT" as const, isChronik: true, thumbsUp: 47,
      title: "Batarya ısınması yaz aylarında menzili yüzde 30 düşürüyor",
      body: "Sıcak havada DC fast charge yaparken batarya 45 dereceye çıkıyor ve sistem kendini kısıtlıyor. Togg servisi normal çalışma diyor ama aynı sorunu 47 farklı kullanıcıda gördük.",
      tags: ["Kronik", "Batarya", "Sarj", "Yaz"],
    },
    {
      userId: ayse.id, category: "OTOMOBIL" as const, brand: "Renault", model: "Clio 5", year: 2022,
      fuelType: "Benzin", kmUsed: "29000 km", usagePeriod: "18 ay",
      sentimentType: "COMPLAINT" as const, isChronik: true, thumbsUp: 52,
      title: "Easy Link infotainment sistemi 2-3 günde bir donuyor",
      body: "Renault servisi 3 kez yazılım güncelledi ama sorun devam ediyor. Platformda 100'den fazla kullanıcı aynı sorunu yaşıyor. Renault Türkiye resmi açıklama yapmadı.",
      tags: ["Kronik", "Yazilim", "Infotainment", "CarPlay"],
    },
    {
      userId: murat.id, category: "OTOMOBIL" as const, brand: "Honda", model: "Civic FE", year: 2022,
      fuelType: "Benzin", kmUsed: "41000 km", usagePeriod: "2 yıl",
      sentimentType: "POSITIVE" as const, isChronik: false, thumbsUp: 89,
      title: "2 yıl 41bin km sıfır arıza en güvenilir araç",
      body: "Civic FE aldığımdan beri tek bir arıza yaşanamadım. Yakıt tüketimi şehirde 6.8L otoyolda 5.4L. Honda servisi de çok profesyonel.",
      tags: ["Guvenilir", "Yakit", "Servis"],
    },
    {
      userId: ayse.id, category: "OTOMOBIL" as const, brand: "Volkswagen", model: "Golf 8", year: 2022,
      fuelType: "Hibrit", kmUsed: "38000 km", usagePeriod: "2 yıl",
      sentimentType: "POSITIVE" as const, isChronik: false, thumbsUp: 67,
      title: "Golf 8 hibrit gerçekten yakıt tasarruf ediyor mu 2 yıl sonra",
      body: "Şehir içi 5.8L otoyol 7.2L görüyorum. DSG sorunsuz. IQ Drive bazen sert fren yapıyor ama genel olarak çok memnunum.",
      tags: ["Hibrit", "Yakit", "DSG"],
    },
    {
      userId: murat.id, category: "OTOMOBIL" as const, brand: "Dacia", model: "Duster", year: 2021,
      fuelType: "Benzin", kmUsed: "62000 km", usagePeriod: "3 yıl",
      sentimentType: "TIP" as const, isChronik: false, thumbsUp: 43,
      title: "Duster 4x4 arazi için mükemmel ama otoyol konforu zayıf",
      body: "Arazi kabiliyeti fiyatına göre inanılmaz. Ama 100 üstü rüzgar gürültüsü rahatsız edici. Uzun yolda bel ağrısı yapıyor. Bakım maliyeti düşük.",
      tags: ["Arazi", "Gurultu", "Konfor", "FiyatDeger"],
    },
    {
      userId: ayse.id, category: "OTOMOBIL" as const, brand: "Hyundai", model: "Tucson", year: 2022,
      fuelType: "Benzin", kmUsed: "33000 km", usagePeriod: "20 ay",
      sentimentType: "COMPLAINT" as const, isChronik: true, thumbsUp: 34,
      title: "Soğuk havada CVVT valf sesi çok rahatsız edici",
      body: "Sabah ilk çalıştırmada tıktık sesi geliyor. Hyundai servisi normal diyor ama forumda 60'tan fazla kullanıcı aynı sorunu yaşıyor.",
      tags: ["Kronik", "CVVT", "Motor", "Ses"],
    },
    {
      userId: murat.id, category: "OTOMOBIL" as const, brand: "BMW", model: "320i", year: 2021,
      fuelType: "Benzin", kmUsed: "61000 km", usagePeriod: "3 yıl",
      sentimentType: "COMPLAINT" as const, isChronik: false, thumbsUp: 28,
      title: "DMF sorunu 60bin km'de başladı servis 45bin TL fiyat verdi",
      body: "Volan titremesi başladı. Servis ikili volan yay sistemi arızası dedi. Garantisi bitmiş 45bin TL istediler. Bu araç segmentinde kabul edilemez bir maliyet.",
      tags: ["DMF", "Volan", "Bakim", "Maliyet"],
    },
    {
      userId: ayse.id, category: "OTOMOBIL" as const, brand: "Toyota", model: "Corolla Hybrid", year: 2022,
      fuelType: "Hibrit", kmUsed: "55000 km", usagePeriod: "3 yıl",
      sentimentType: "POSITIVE" as const, isChronik: false, thumbsUp: 71,
      title: "3 yılda bakım dışında hiç para ödemedim",
      body: "Toyota hibrit sistemi gerçekten dayanıklı. Batarya sorunu yok, yakıt tüketimi hâlâ 4.8L. Satış değerini koruyor.",
      tags: ["Hibrit", "Guvenilir", "Ekonomi"],
    },
    {
      userId: murat.id, category: "MOTOSIKLET" as const, brand: "Honda", model: "CB650R", year: 2023,
      fuelType: "Benzin", kmUsed: "8000 km", usagePeriod: "1 yıl",
      sentimentType: "POSITIVE" as const, isChronik: false, thumbsUp: 45,
      title: "CB650R 1 yıl sonra sıfır arıza en güvenilir motosiklet mi",
      body: "8bin km'de tek arıza yok. Yakıt 4.8L/100km. Ergonomi orta-uzun yolculuklar için mükemmel. Honda servis ağı Türkiye'de çok geniş.",
      tags: ["Guvenilir", "Ekonomi", "Ergonomi"],
    },
    {
      userId: ayse.id, category: "MOTOSIKLET" as const, brand: "Yamaha", model: "MT-07", year: 2022,
      fuelType: "Benzin", kmUsed: "22000 km", usagePeriod: "2 yıl",
      sentimentType: "TIP" as const, isChronik: true, thumbsUp: 31,
      title: "Şehir içi için harika ama uzun yolda bel yoruyor",
      body: "MT-07 şehir içinde çok eğlenceli. Ama 2 saat üstü yolculuklarda bel ve bilek ağrısı başlıyor. Rüzgar koruması yok. Şehir motosikleti olarak kullanın.",
      tags: ["Ergonomi", "UzunYol", "Sehir"],
    },
    {
      userId: murat.id, category: "OTOMOBIL" as const, brand: "Ford", model: "Puma", year: 2023,
      fuelType: "Benzin", kmUsed: "18000 km", usagePeriod: "14 ay",
      sentimentType: "POSITIVE" as const, isChronik: false, thumbsUp: 38,
      title: "EcoBoost 155hp yol tutuşunu mükemmel",
      body: "Puma sürüşü çok eğlenceli. EcoBoost motoru şehirde bile erişken. Bagaj kapasitesi MegaBox ile çok kullanışlı. Yakıt şehirde 7.2L.",
      tags: ["EcoBoost", "Suruc", "Bagaj"],
    },
    {
      userId: ayse.id, category: "OTOMOBIL" as const, brand: "Skoda", model: "Octavia", year: 2022,
      fuelType: "Dizel", kmUsed: "48000 km", usagePeriod: "2 yıl",
      sentimentType: "POSITIVE" as const, isChronik: false, thumbsUp: 44,
      title: "Ailenin en pratik arabası bagaj kocaman",
      body: "Octavia 630 litre bagaj ile segment lideri. Dizel motor 48bin km'de hiçbir sorun yok. Uzun yol konforu mükemmel. Fiyat performans en iyisi.",
      tags: ["Bagaj", "Konfor", "Dizel", "FiyatPerformans"],
    },
    {
      userId: murat.id, category: "OTOMOBIL" as const, brand: "Mitsubishi", model: "Outlander", year: 2023,
      fuelType: "Hibrit", kmUsed: "21000 km", usagePeriod: "16 ay",
      sentimentType: "COMPLAINT" as const, isChronik: false, thumbsUp: 19,
      title: "Navigasyon sistemi sık sık güncelleme istiyor ve donuyor",
      body: "Mitsubishi'nin infotainment sistemi çok yavaş. Navigasyon güncelleme sırasında donuyor. Bluetooth bağlantısı zaman zaman kopuyor.",
      tags: ["Navigasyon", "Yazilim", "Infotainment"],
    },
    {
      userId: ayse.id, category: "OTOMOBIL" as const, brand: "Hyundai", model: "Tucson", year: 2022,
      fuelType: "Benzin", kmUsed: "28000 km", usagePeriod: "18 ay",
      sentimentType: "TIP" as const, isChronik: false, thumbsUp: 22,
      title: "Klima filtresini 6 ayda bir değiştirin fark büyük",
      body: "Tucson klima sistemi çok iyi ama filtre hızlı kirleniyor. 6 ayda bir değiştirince hem hava kalitesi hem de yakıt tüketimi iyileşiyor. Orjinal filtre yerine Bosch tavsiye ederim.",
      tags: ["Klima", "Bakim", "Ipucu", "Filtre"],
    },
    {
      userId: murat.id, category: "OTOMOBIL" as const, brand: "TOGG", model: "T10X", year: 2023,
      fuelType: "Elektrik", kmUsed: "19000 km", usagePeriod: "11 ay",
      sentimentType: "TIP" as const, isChronik: false, thumbsUp: 29,
      title: "Şarj istasyonu seçimi menzili doğrudan etkiliyor DC tercih edin",
      body: "Togg T10X ile maksimum menzil için DC şarj ve yüzde 20-80 arası şarj stratejisi kullanın. AC şarj geceleri evde ideal. Sıcak havada gölge park yeri menzili korur.",
      tags: ["Sarj", "Menzil", "Elektrik", "Ipucu"],
    },
  ];

  for (const post of posts) {
    await prisma.post.create({ data: post });
  }

  console.log(`✅ Seed completed: 2 users, ${posts.length} posts`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
