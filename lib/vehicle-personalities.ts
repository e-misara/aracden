/**
 * Araç kişilik tanımları — UI'da kart/etiket olarak gösterilir.
 * Key: "Marka_Model" (vehicles-data.ts ile birebir).
 */

export type VehiclePersonality = {
  karakter: string;
  slogan: string;
  emoji: string;
  tip: "güvenilir" | "asi" | "lüks" | "sorunlu" | "efsane";
  renk: string;
};

export const personalities: Record<string, VehiclePersonality> = {
  "Volkswagen_Golf": {
    karakter: "Güvenilir Memur",
    slogan: "Her zaman oradadır, nadiren sürpriz yapar.",
    emoji: "🎯",
    tip: "güvenilir",
    renk: "#0090ff",
  },
  "Volkswagen_Passat": {
    karakter: "İş Adamının Yoldaşı",
    slogan: "Sessizce ilerler, herkes yolunu açar.",
    emoji: "💼",
    tip: "güvenilir",
    renk: "#0090ff",
  },
  "Volkswagen_Polo": {
    karakter: "Sakin Yengeç",
    slogan: "Küçük ama herkesin saygı duyduğu bir.",
    emoji: "🦀",
    tip: "güvenilir",
    renk: "#0090ff",
  },
  "Renault_Clio": {
    karakter: "Şehrin Çevik Kedisi",
    slogan: "Küçük, çevik, bazen huysuz.",
    emoji: "🐱",
    tip: "asi",
    renk: "#ff6b00",
  },
  "Renault_Megane": {
    karakter: "Şehirli Aile",
    slogan: "Aileyi de işi de aynı zarafetle taşır.",
    emoji: "🇫🇷",
    tip: "güvenilir",
    renk: "#ff6b00",
  },
  "Renault_Duster": {
    karakter: "Maceracı Köylü",
    slogan: "Şehirde sıkılır, dağda ferahlar.",
    emoji: "🏔️",
    tip: "efsane",
    renk: "#00d68f",
  },
  "BMW_3 Serisi": {
    karakter: "Statü Sembolü",
    slogan: "Sürüş keyfi mi, gösteriş mi? İkisi de.",
    emoji: "👔",
    tip: "lüks",
    renk: "#ffd60a",
  },
  "BMW_5 Serisi": {
    karakter: "Yönetim Kurulu Üyesi",
    slogan: "Toplantıdan toplantıya, hep hazır.",
    emoji: "🎩",
    tip: "lüks",
    renk: "#ffd60a",
  },
  "BMW_X5": {
    karakter: "Korkutucu Yumuşak",
    slogan: "Kapı kollarına dokunmak bile prestij.",
    emoji: "🦁",
    tip: "lüks",
    renk: "#ffd60a",
  },
  "Mercedes-Benz_C Serisi": {
    karakter: "Düğün Şoförü",
    slogan: "Önünde sırada bekleyen müşteriler vardır.",
    emoji: "🤵",
    tip: "lüks",
    renk: "#ffd60a",
  },
  "Mercedes-Benz_E Serisi": {
    karakter: "Patron Sandalyesi",
    slogan: "Arka koltukta otur, hayat seni getirsin.",
    emoji: "👑",
    tip: "lüks",
    renk: "#ffd60a",
  },
  "Dacia_Duster": {
    karakter: "Mütevazı Kahraman",
    slogan: "Az para, çok araba. Kimse şikayet etmez.",
    emoji: "💪",
    tip: "efsane",
    renk: "#00d68f",
  },
  "Dacia_Sandero": {
    karakter: "Cebi Boş Öğrenci",
    slogan: "Pahalı değil ama göze batmıyor da.",
    emoji: "🎒",
    tip: "güvenilir",
    renk: "#00d68f",
  },
  "Land Rover_Discovery": {
    karakter: "Gösterişli Ama Sorunlu",
    slogan: "Lüks görünür, serviste bulunur.",
    emoji: "🏚️",
    tip: "sorunlu",
    renk: "#ff2d55",
  },
  "Land Rover_Range Rover": {
    karakter: "İhtişam Krallığı",
    slogan: "Ya seveceksin ya seveceksin (servise rağmen).",
    emoji: "🏰",
    tip: "lüks",
    renk: "#ffd60a",
  },
  "Fiat_Egea": {
    karakter: "Türkiye'nin Arabası",
    slogan: "Milli duygularla satın alınır.",
    emoji: "🇹🇷",
    tip: "güvenilir",
    renk: "#ff6b00",
  },
  "Fiat_Doblo": {
    karakter: "Kargocunun Ortağı",
    slogan: "Her şey sığar, hiç şikayet etmez.",
    emoji: "📦",
    tip: "efsane",
    renk: "#00d68f",
  },
  "Fiat_500": {
    karakter: "İtalyan Aksanlı Sevimli",
    slogan: "Pratik değil ama sevimli olduğu için affedersin.",
    emoji: "💋",
    tip: "asi",
    renk: "#ff6b00",
  },
  "Tesla_Model Y": {
    karakter: "Geleceğin Tartışmalısı",
    slogan: "Ya seviyorsun ya nefret ediyorsun.",
    emoji: "⚡",
    tip: "asi",
    renk: "#0090ff",
  },
  "Tesla_Model 3": {
    karakter: "Şarjlı Anarşist",
    slogan: "Geleneksel olan her şeyle savaşır.",
    emoji: "🔌",
    tip: "asi",
    renk: "#0090ff",
  },
  "Skoda_Octavia": {
    karakter: "Sessiz Güç",
    slogan: "VW kalitesi, yarı fiyata.",
    emoji: "🤫",
    tip: "güvenilir",
    renk: "#00d68f",
  },
  "Skoda_Superb": {
    karakter: "Karısı Daha Çok Sever",
    slogan: "Arka koltuk lüks, fiyat makul.",
    emoji: "👨‍👩‍👧",
    tip: "güvenilir",
    renk: "#00d68f",
  },
  "Toyota_Corolla": {
    karakter: "Ebedi Memur",
    slogan: "Bozulmaz. 30 yıl sonra hala satılır.",
    emoji: "♾️",
    tip: "güvenilir",
    renk: "#00d68f",
  },
  "Toyota_Hilux": {
    karakter: "Çöl Generali",
    slogan: "Apokalips sonrası ayakta kalan tek araç.",
    emoji: "🏜️",
    tip: "efsane",
    renk: "#00d68f",
  },
  "Honda_Civic": {
    karakter: "Hızlı Ders Çalışan",
    slogan: "Sınıf birinciliği, sonra yarış pisti.",
    emoji: "🎓",
    tip: "güvenilir",
    renk: "#0090ff",
  },
  "Ford_Focus": {
    karakter: "Sıradan Süper Kahraman",
    slogan: "İddiası yok ama her zaman görevde.",
    emoji: "🦸",
    tip: "güvenilir",
    renk: "#0090ff",
  },
  "Ford_Fiesta": {
    karakter: "Sokağın Hızlı Çocuğu",
    slogan: "ST modeli olursa selam vermeden geçer.",
    emoji: "🎉",
    tip: "asi",
    renk: "#ff6b00",
  },
  "Ford_Transit": {
    karakter: "Esnafın Babası",
    slogan: "Türkiye trafiğini bu omurlatır.",
    emoji: "🛠️",
    tip: "efsane",
    renk: "#00d68f",
  },
  "Hyundai_Tucson": {
    karakter: "Yeni Komşunun Arabası",
    slogan: "Site otoparkında en az 5 tane vardır.",
    emoji: "🏘️",
    tip: "güvenilir",
    renk: "#0090ff",
  },
  "Hyundai_i20": {
    karakter: "Genç Çift Tercihi",
    slogan: "Pratik, ekonomik, çekici (görsel olarak).",
    emoji: "💑",
    tip: "güvenilir",
    renk: "#0090ff",
  },
  "Audi_A3": {
    karakter: "Yatırım Bankacısı Yardımcısı",
    slogan: "Henüz statü kazanmadı ama yolda.",
    emoji: "💎",
    tip: "lüks",
    renk: "#ffd60a",
  },
  "Audi_Q5": {
    karakter: "Doktor Eşi",
    slogan: "Şehirde otopark zor, herkese batar.",
    emoji: "🩺",
    tip: "lüks",
    renk: "#ffd60a",
  },
  "Peugeot_208": {
    karakter: "Fransız Aksanlı Bukle",
    slogan: "Tasarım için affedilir, sorunları için tartışılır.",
    emoji: "🥐",
    tip: "asi",
    renk: "#ff6b00",
  },
  "Citroen_C3": {
    karakter: "Hayalperest Sanatçı",
    slogan: "PureTech motoru duymuş, gözleri kararıyor.",
    emoji: "🎨",
    tip: "sorunlu",
    renk: "#ff2d55",
  },
  "Opel_Corsa": {
    karakter: "Eski Devlet Memuru",
    slogan: "Hala oradayım, kimse umursamasa da.",
    emoji: "👴",
    tip: "güvenilir",
    renk: "#8b8b9e",
  },
  "Opel_Astra": {
    karakter: "Aile İçi Tartışma Konusu",
    slogan: "'Biz aldık ya bu ne lan' sözüne neden olur.",
    emoji: "🤷",
    tip: "sorunlu",
    renk: "#ffd60a",
  },
  "TOGG_T10X": {
    karakter: "Bayrak Taşıyan Acemı",
    slogan: "Vatan için heyecan, deneyim için sabır.",
    emoji: "🇹🇷",
    tip: "asi",
    renk: "#ff2d55",
  },
  "Porsche_911": {
    karakter: "Klasik Aristokrat",
    slogan: "60 yıldır aynı şekil, hep doğru şekil.",
    emoji: "🏆",
    tip: "efsane",
    renk: "#ffd60a",
  },
  "Mini_Cooper": {
    karakter: "Lüks Hipster",
    slogan: "Pahalı eğlence ama çok eğlence.",
    emoji: "🎭",
    tip: "lüks",
    renk: "#ffd60a",
  },
};

export function getPersonality(marka: string, model: string): VehiclePersonality | null {
  return personalities[`${marka}_${model}`] ?? null;
}

export const TIP_RENKLERI: Record<VehiclePersonality["tip"], { bg: string; text: string; border: string }> = {
  "güvenilir": { bg: "bg-[#00d68f]/10", text: "text-[#00d68f]", border: "border-[#00d68f]/30" },
  "asi":       { bg: "bg-[#ff6b00]/10", text: "text-[#ff6b00]", border: "border-[#ff6b00]/30" },
  "lüks":      { bg: "bg-[#ffd60a]/10", text: "text-[#ffd60a]", border: "border-[#ffd60a]/30" },
  "sorunlu":   { bg: "bg-[#ff2d55]/10", text: "text-[#ff2d55]", border: "border-[#ff2d55]/30" },
  "efsane":    { bg: "bg-[#0090ff]/10", text: "text-[#0090ff]", border: "border-[#0090ff]/30" },
};
