/**
 * Üretici teknik bilgi tabanı.
 * 15 popüler model elle, gerisi için "/api/ai-info" fallback (Anthropic kredi gerektirir).
 * Key formatı: "Marka_Model" (vehicles-data.ts ile birebir).
 */

export type Motor = {
  kod: string;
  hacim: string;
  guc: string;
  tork?: string;
  yakit: "Benzin" | "Dizel" | "Hibrit" | "Elektrik" | "LPG";
};

export type VehicleInfo = {
  marka: string;
  model: string;
  kasa?: string;
  yillar: string;
  slogan?: string;
  resmi_tanim: string;
  motor_secenekleri: Motor[];
  resmi_yakit_tuketimi?: { sehir?: string; yol?: string; karma?: string };
  resmi_performans?: { hizlanma_0_100?: string; max_hiz?: string };
  guvenlik_ekipmanlari?: string[];
  resmi_garanti?: string;
  bilinen_sorunlar?: string[];
  guclu_yonler?: string[];
  turkiye_populerlik?: "düşük" | "orta" | "yüksek";
  tavsiye_edilen_yil?: string;
};

export const vehicleInfo: Record<string, VehicleInfo> = {
  "Volkswagen_Golf": {
    marka: "Volkswagen",
    model: "Golf",
    yillar: "1974-günümüz (8 nesil)",
    slogan: "Das Auto",
    resmi_tanim: "Compact hatchback segmentinin global referansı. Almanya'da Wolfsburg fabrikasında 50 yılı aşkın süredir üretiliyor. Türkiye'de yetkili bayi ağı geniş.",
    motor_secenekleri: [
      { kod: "1.0 TSI", hacim: "1.0L", guc: "110 HP", tork: "200 Nm", yakit: "Benzin" },
      { kod: "1.5 TSI", hacim: "1.5L", guc: "150 HP", tork: "250 Nm", yakit: "Benzin" },
      { kod: "2.0 TSI GTI", hacim: "2.0L", guc: "245 HP", tork: "370 Nm", yakit: "Benzin" },
      { kod: "1.6 TDI", hacim: "1.6L", guc: "115 HP", tork: "250 Nm", yakit: "Dizel" },
      { kod: "2.0 TDI", hacim: "2.0L", guc: "150 HP", tork: "340 Nm", yakit: "Dizel" },
    ],
    resmi_yakit_tuketimi: { sehir: "6.8L", yol: "4.5L", karma: "5.3L" },
    resmi_performans: { hizlanma_0_100: "8.5 sn (1.5 TSI)", max_hiz: "224 km/s" },
    guvenlik_ekipmanlari: ["ABS", "ESP", "6 hava yastığı", "Çıkış uyarısı", "Şerit takip"],
    resmi_garanti: "2 yıl",
    bilinen_sorunlar: ["DSG şanzıman titreşim/kayma", "1.5 TSI yağ tüketimi", "Multimedya donma"],
    guclu_yonler: ["Sürüş hissi", "İç kalite", "Yedek parça"],
    turkiye_populerlik: "yüksek",
    tavsiye_edilen_yil: "2016-2019 (Golf 7 makyajlı)",
  },
  "Volkswagen_Polo": {
    marka: "Volkswagen", model: "Polo",
    yillar: "1975-günümüz (6 nesil)",
    slogan: "Küçük Golf",
    resmi_tanim: "B-segment hatchback. Golf'tan küçük, daha ekonomik. Türkiye'de filo aracı olarak da yaygın.",
    motor_secenekleri: [
      { kod: "1.0 TSI", hacim: "1.0L", guc: "95 HP", yakit: "Benzin" },
      { kod: "1.0 TSI", hacim: "1.0L", guc: "115 HP", yakit: "Benzin" },
      { kod: "1.6 TDI", hacim: "1.6L", guc: "80 HP", yakit: "Dizel" },
    ],
    resmi_yakit_tuketimi: { karma: "5.0L" },
    resmi_performans: { hizlanma_0_100: "10.8 sn", max_hiz: "187 km/s" },
    guvenlik_ekipmanlari: ["ABS", "ESP", "6 hava yastığı"],
    resmi_garanti: "2 yıl",
    bilinen_sorunlar: ["Multimedya yazılım", "1.0 TSI zincir gerginlik"],
    guclu_yonler: ["Ekonomik", "Manevra kabiliyeti", "Kalite"],
    turkiye_populerlik: "yüksek",
  },
  "Volkswagen_Passat": {
    marka: "Volkswagen", model: "Passat",
    yillar: "1973-günümüz (9 nesil)",
    slogan: "İş Yoldaşı",
    resmi_tanim: "D-segment sedan/wagon. Aile ve iş için tercih edilen büyük orta sınıf.",
    motor_secenekleri: [
      { kod: "1.5 TSI", hacim: "1.5L", guc: "150 HP", yakit: "Benzin" },
      { kod: "2.0 TDI", hacim: "2.0L", guc: "150 HP", yakit: "Dizel" },
      { kod: "2.0 TDI", hacim: "2.0L", guc: "190 HP", yakit: "Dizel" },
    ],
    resmi_yakit_tuketimi: { karma: "5.4L (dizel)" },
    resmi_performans: { hizlanma_0_100: "8.7 sn", max_hiz: "230 km/s" },
    guvenlik_ekipmanlari: ["Adaptive cruise", "Lane assist", "9 hava yastığı"],
    resmi_garanti: "2 yıl",
    bilinen_sorunlar: ["DSG kayma", "AdBlue arızası", "Multimedya"],
    guclu_yonler: ["İç hacim", "Konfor", "Premium hissi"],
    turkiye_populerlik: "yüksek",
  },
  "Renault_Clio": {
    marka: "Renault", model: "Clio",
    yillar: "1990-günümüz (5 nesil)",
    slogan: "City Master",
    resmi_tanim: "Fransa'nın en çok satan B-segment hatchback'i. Türkiye'de Bursa Oyak Renault'da üretiliyor.",
    motor_secenekleri: [
      { kod: "1.0 SCe", hacim: "1.0L", guc: "65 HP", yakit: "Benzin" },
      { kod: "1.0 TCe", hacim: "1.0L", guc: "90 HP", yakit: "Benzin" },
      { kod: "1.3 TCe", hacim: "1.3L", guc: "130 HP", yakit: "Benzin" },
      { kod: "1.5 dCi", hacim: "1.5L", guc: "85 HP", yakit: "Dizel" },
    ],
    resmi_yakit_tuketimi: { karma: "4.5L" },
    resmi_performans: { hizlanma_0_100: "12.2 sn (1.0 TCe)" },
    guvenlik_ekipmanlari: ["ABS", "ESP", "4 hava yastığı"],
    resmi_garanti: "3 yıl / 100.000 km",
    bilinen_sorunlar: ["EDC şanzıman donma", "Elektronik park freni", "Direksiyon ses"],
    guclu_yonler: ["Türkiye servis ağı", "Yedek parça ucuz", "Yakıt"],
    turkiye_populerlik: "yüksek",
  },
  "Renault_Megane": {
    marka: "Renault", model: "Megane",
    yillar: "1995-günümüz (4 nesil)",
    slogan: "Tutkulu Tasarım",
    resmi_tanim: "C-segment sedan/hatchback. Türkiye'de Oyak Renault'da üretildi, çok satan.",
    motor_secenekleri: [
      { kod: "1.3 TCe", hacim: "1.3L", guc: "140 HP", yakit: "Benzin" },
      { kod: "1.5 Blue dCi", hacim: "1.5L", guc: "115 HP", yakit: "Dizel" },
    ],
    resmi_yakit_tuketimi: { karma: "5.0L" },
    guvenlik_ekipmanlari: ["ABS", "ESP", "Adaptive cruise"],
    resmi_garanti: "3 yıl",
    bilinen_sorunlar: ["EDC şanzıman", "Dizel DPF", "Klima kompresör"],
    guclu_yonler: ["İç hacim", "Yedek parça", "Konfor"],
    turkiye_populerlik: "yüksek",
  },
  "BMW_3 Serisi": {
    marka: "BMW", model: "3 Serisi", kasa: "G20",
    yillar: "2018-günümüz",
    slogan: "Sürüşün Zevki",
    resmi_tanim: "D-segment kompakt executive sedan. Arka tekerlek/x-Drive, 50/50 ağırlık dağılımı.",
    motor_secenekleri: [
      { kod: "318i", hacim: "2.0L", guc: "156 HP", yakit: "Benzin" },
      { kod: "320i", hacim: "2.0L", guc: "184 HP", yakit: "Benzin" },
      { kod: "330i", hacim: "2.0L", guc: "258 HP", yakit: "Benzin" },
      { kod: "320d", hacim: "2.0L", guc: "190 HP", yakit: "Dizel" },
      { kod: "M340i xDrive", hacim: "3.0L", guc: "374 HP", yakit: "Benzin" },
    ],
    resmi_yakit_tuketimi: { karma: "6.1L (320i)" },
    resmi_performans: { hizlanma_0_100: "5.8 sn (M340i)", max_hiz: "250 km/s" },
    guvenlik_ekipmanlari: ["Adaptive cruise", "Lane assist", "Head-up display"],
    resmi_garanti: "2 yıl",
    bilinen_sorunlar: ["Yağ pompası (önceki nesil)", "Soğutma sistemi", "iDrive yazılım"],
    guclu_yonler: ["Sürüş hissi", "Motor", "Yedek parça"],
    turkiye_populerlik: "yüksek",
  },
  "BMW_5 Serisi": {
    marka: "BMW", model: "5 Serisi", kasa: "G30",
    yillar: "2017-günümüz",
    slogan: "Yönetim Sınıfı",
    resmi_tanim: "E-segment executive sedan/touring. Hibrit, dizel ve M Performance seçenekleri.",
    motor_secenekleri: [
      { kod: "520i", hacim: "2.0L", guc: "184 HP", yakit: "Benzin" },
      { kod: "530i", hacim: "2.0L", guc: "252 HP", yakit: "Benzin" },
      { kod: "520d", hacim: "2.0L", guc: "190 HP", yakit: "Dizel" },
      { kod: "M550i xDrive", hacim: "4.4L", guc: "530 HP", yakit: "Benzin" },
    ],
    resmi_performans: { hizlanma_0_100: "3.8 sn (M550i)" },
    guvenlik_ekipmanlari: ["Adaptive cruise", "Pilot Assistant", "Night vision"],
    bilinen_sorunlar: ["Su pompası", "Süspansiyon", "Yüksek bakım maliyeti"],
    guclu_yonler: ["Konfor", "Teknoloji", "Performans"],
    turkiye_populerlik: "yüksek",
  },
  "Mercedes-Benz_C Serisi": {
    marka: "Mercedes-Benz", model: "C Serisi", kasa: "W206",
    yillar: "2021-günümüz",
    slogan: "Lüks Erişilebilir",
    resmi_tanim: "D-segment lüks sedan. Mild hybrid standart, MBUX multimedya.",
    motor_secenekleri: [
      { kod: "C 180", hacim: "1.5L", guc: "170 HP", yakit: "Benzin" },
      { kod: "C 200", hacim: "1.5L", guc: "204 HP", yakit: "Benzin" },
      { kod: "C 220 d", hacim: "2.0L", guc: "200 HP", yakit: "Dizel" },
    ],
    resmi_performans: { hizlanma_0_100: "7.3 sn (C 200)" },
    guvenlik_ekipmanlari: ["Adaptive cruise", "MBUX", "9 airbag"],
    bilinen_sorunlar: ["MBUX donma", "Mild hybrid sistem", "Pahalı bakım"],
    guclu_yonler: ["İç tasarım", "Konfor", "Prestij"],
    turkiye_populerlik: "yüksek",
  },
  "Fiat_Egea": {
    marka: "Fiat", model: "Egea",
    yillar: "2015-günümüz",
    slogan: "Türkiye'nin Arabası",
    resmi_tanim: "Türkiye'de (Tofaş) tasarlanan ve üretilen C-segment sedan/hatchback/SW. Çok satan yerli üretim.",
    motor_secenekleri: [
      { kod: "1.4 Fire", hacim: "1.4L", guc: "95 HP", yakit: "Benzin" },
      { kod: "1.3 Multijet", hacim: "1.3L", guc: "95 HP", yakit: "Dizel" },
      { kod: "1.6 E-Torq", hacim: "1.6L", guc: "110 HP", yakit: "Benzin" },
      { kod: "1.6 Multijet", hacim: "1.6L", guc: "120 HP", yakit: "Dizel" },
    ],
    resmi_yakit_tuketimi: { karma: "4.5L (dizel)" },
    resmi_performans: { hizlanma_0_100: "11.5 sn", max_hiz: "180 km/s" },
    guvenlik_ekipmanlari: ["ABS", "ESP", "6 hava yastığı"],
    resmi_garanti: "2 yıl",
    bilinen_sorunlar: ["1.3 Multijet enjektör", "Klima kompresör", "Direksiyon ses"],
    guclu_yonler: ["Yedek parça ucuz", "Yerli servis ağı", "Yakıt ekonomisi"],
    turkiye_populerlik: "yüksek",
    tavsiye_edilen_yil: "2018-2021 (makyajlı)",
  },
  "Honda_Civic": {
    marka: "Honda", model: "Civic",
    yillar: "1972-günümüz (11 nesil)",
    slogan: "The Power of Dreams",
    resmi_tanim: "C-segment sedan/hatchback. Hibrit ve Type R sportif versiyonları mevcut. Türkiye'de yıllarca üretildi.",
    motor_secenekleri: [
      { kod: "1.6 i-VTEC", hacim: "1.6L", guc: "125 HP", yakit: "Benzin" },
      { kod: "1.5 VTEC Turbo", hacim: "1.5L", guc: "182 HP", yakit: "Benzin" },
      { kod: "2.0 e:HEV", hacim: "2.0L", guc: "184 HP", yakit: "Hibrit" },
      { kod: "2.0 Type R", hacim: "2.0L", guc: "329 HP", yakit: "Benzin" },
    ],
    resmi_yakit_tuketimi: { karma: "4.8L (hibrit)" },
    resmi_performans: { hizlanma_0_100: "6.3 sn (1.5 Turbo)" },
    guvenlik_ekipmanlari: ["Honda Sensing", "Adaptive cruise", "Şerit takip"],
    resmi_garanti: "5 yıl / 150.000 km",
    bilinen_sorunlar: ["CVT şanzıman titreşim", "Klima drenaj", "Akü zayıflığı"],
    guclu_yonler: ["Güvenilirlik", "Yakıt ekonomisi", "Uzun garanti"],
    turkiye_populerlik: "yüksek",
  },
  "Toyota_Corolla": {
    marka: "Toyota", model: "Corolla",
    yillar: "1966-günümüz (12 nesil)",
    slogan: "Reliability",
    resmi_tanim: "Dünyanın en çok satan otomobili. Türkiye'de Adapazarı TMMT'de üretiliyor. Hibrit versiyonları yaygın.",
    motor_secenekleri: [
      { kod: "1.6 Valvematic", hacim: "1.6L", guc: "132 HP", yakit: "Benzin" },
      { kod: "1.8 Hybrid", hacim: "1.8L", guc: "122 HP", yakit: "Hibrit" },
      { kod: "2.0 Hybrid", hacim: "2.0L", guc: "184 HP", yakit: "Hibrit" },
    ],
    resmi_yakit_tuketimi: { karma: "3.9L (1.8 hibrit)" },
    resmi_performans: { hizlanma_0_100: "11.0 sn (hibrit)" },
    guvenlik_ekipmanlari: ["Toyota Safety Sense", "Adaptive cruise", "7 airbag"],
    resmi_garanti: "5 yıl",
    bilinen_sorunlar: ["Multimedya yavaş", "Akü kapasitesi (yıllarca sonra)", "CVT yağı bakım"],
    guclu_yonler: ["Güvenilirlik", "Yakıt ekonomisi", "2. el değer"],
    turkiye_populerlik: "yüksek",
  },
  "Ford_Focus": {
    marka: "Ford", model: "Focus",
    yillar: "1998-günümüz (4 nesil)",
    slogan: "Go Further",
    resmi_tanim: "C-segment sedan/hatchback/SW. Türkiye'de Otosan Kocaeli'de uzun yıllar üretildi.",
    motor_secenekleri: [
      { kod: "1.0 EcoBoost", hacim: "1.0L", guc: "125 HP", yakit: "Benzin" },
      { kod: "1.5 EcoBoost", hacim: "1.5L", guc: "150 HP", yakit: "Benzin" },
      { kod: "1.5 EcoBlue", hacim: "1.5L", guc: "120 HP", yakit: "Dizel" },
      { kod: "2.0 EcoBlue", hacim: "2.0L", guc: "150 HP", yakit: "Dizel" },
    ],
    resmi_yakit_tuketimi: { karma: "4.5L (dizel)" },
    guvenlik_ekipmanlari: ["Ford Co-Pilot360", "Adaptive cruise", "Şerit takip"],
    resmi_garanti: "2 yıl",
    bilinen_sorunlar: ["1.0 EcoBoost zaman zincirinde aşınma", "DCT şanzıman", "Su pompası"],
    guclu_yonler: ["Sürüş dengesi", "İç hacim", "Tasarım"],
    turkiye_populerlik: "yüksek",
  },
  "Ford_Fiesta": {
    marka: "Ford", model: "Fiesta",
    yillar: "1976-2023 (7 nesil)",
    slogan: "Sürüşün Eğlencesi",
    resmi_tanim: "B-segment hatchback. ST versiyonu sportif yarış otomobili olarak ün yaptı. 2023'te üretim sona erdi.",
    motor_secenekleri: [
      { kod: "1.0 EcoBoost", hacim: "1.0L", guc: "100 HP", yakit: "Benzin" },
      { kod: "1.5 EcoBoost ST", hacim: "1.5L", guc: "200 HP", yakit: "Benzin" },
      { kod: "1.5 EcoBlue", hacim: "1.5L", guc: "85 HP", yakit: "Dizel" },
    ],
    resmi_performans: { hizlanma_0_100: "6.5 sn (ST)" },
    guvenlik_ekipmanlari: ["ABS", "ESP", "6 airbag"],
    bilinen_sorunlar: ["1.0 EcoBoost zincirinde aşınma", "DCT", "İç plastik"],
    guclu_yonler: ["Sürüş hissi (özellikle ST)", "Tasarım", "Yakıt"],
    turkiye_populerlik: "yüksek",
  },
  "Hyundai_i20": {
    marka: "Hyundai", model: "i20",
    yillar: "2008-günümüz (3 nesil)",
    slogan: "Sense of Drive",
    resmi_tanim: "B-segment hatchback. Türkiye'de Hyundai Assan İzmit'te üretiliyor, Avrupa'ya ihraç ediliyor.",
    motor_secenekleri: [
      { kod: "1.4 MPI", hacim: "1.4L", guc: "100 HP", yakit: "Benzin" },
      { kod: "1.0 T-GDI", hacim: "1.0L", guc: "100 HP", yakit: "Benzin" },
      { kod: "1.0 T-GDI MHEV", hacim: "1.0L", guc: "120 HP", yakit: "Hibrit" },
    ],
    resmi_yakit_tuketimi: { karma: "5.4L" },
    guvenlik_ekipmanlari: ["SmartSense", "Şerit takip", "Hız sınırı tanıma"],
    resmi_garanti: "5 yıl",
    bilinen_sorunlar: ["Servis randevu güçlüğü", "Yedek parça gecikmesi", "1.0 T-GDI ses"],
    guclu_yonler: ["Uzun garanti", "Donanım", "Yerli üretim"],
    turkiye_populerlik: "yüksek",
  },
  "Dacia_Duster": {
    marka: "Dacia", model: "Duster",
    yillar: "2010-günümüz (3 nesil)",
    slogan: "More for Less",
    resmi_tanim: "B-SUV. Renault platformu, ekonomik fiyat. 4x4 versiyonu mevcut, Romanya'da üretiliyor.",
    motor_secenekleri: [
      { kod: "1.0 TCe", hacim: "1.0L", guc: "90 HP", yakit: "Benzin" },
      { kod: "1.3 TCe", hacim: "1.3L", guc: "130 HP", yakit: "Benzin" },
      { kod: "1.5 Blue dCi", hacim: "1.5L", guc: "115 HP", yakit: "Dizel" },
      { kod: "1.0 ECO-G", hacim: "1.0L", guc: "100 HP", yakit: "LPG" },
    ],
    resmi_yakit_tuketimi: { karma: "5.5L" },
    guvenlik_ekipmanlari: ["ABS", "ESP", "Tepe kalkış desteği"],
    resmi_garanti: "3 yıl",
    bilinen_sorunlar: ["İç plastik kalite", "Multimedya basit", "Direksiyon yumuşaklığı"],
    guclu_yonler: ["Fiyat/performans", "4x4 yetenek", "Bakım ucuz"],
    turkiye_populerlik: "yüksek",
    tavsiye_edilen_yil: "2018-2024",
  },
};

export function getVehicleInfo(marka: string, model: string): VehicleInfo | null {
  return vehicleInfo[`${marka}_${model}`] ?? null;
}
