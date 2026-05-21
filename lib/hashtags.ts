/**
 * Hashtag tanımları — review olumlu/olumsuz alanlarından otomatik çıkarım.
 * Bir review'da pattern eşleşirse o hashtag aktif sayılır.
 */

export type Hashtag = {
  tag: string;            // #DSGSorunu
  label: string;          // "DSG Sorunu"
  emoji: string;
  color: string;
  patterns: RegExp[];
  sentiment: "negative" | "positive" | "neutral";
};

export const HASHTAGS: Hashtag[] = [
  // Negatif (kronik sorunlar)
  { tag: "#DSGSorunu",        label: "DSG Sorunu",        emoji: "⚙️", color: "#ff2d55", sentiment: "negative", patterns: [/dsg/i, /dual\s*clutch/i] },
  { tag: "#YağPompası",       label: "Yağ Pompası",       emoji: "🛢️", color: "#ff2d55", sentiment: "negative", patterns: [/yağ\s*pompa/i, /pompa\s*ar[ıi]za/i] },
  { tag: "#LPGDönüşüm",       label: "LPG Dönüşüm",       emoji: "⚡", color: "#ffd60a", sentiment: "neutral",  patterns: [/lpg/i, /lpg\s*dönüş/i] },
  { tag: "#TurboArızası",     label: "Turbo Arızası",     emoji: "💨", color: "#ff2d55", sentiment: "negative", patterns: [/turbo\s*ar[ıi]za/i, /turbo\s*sorun/i, /turbo\s*patlad/i] },
  { tag: "#ŞanzımanSorunu",   label: "Şanzıman Sorunu",   emoji: "🔧", color: "#ff2d55", sentiment: "negative", patterns: [/şanz[ıi]man/i, /vites\s*ar[ıi]za/i, /vites\s*sorun/i] },
  { tag: "#FrenSorunu",       label: "Fren Sorunu",       emoji: "🛑", color: "#ff2d55", sentiment: "negative", patterns: [/fren\s*sorun/i, /fren\s*ar[ıi]za/i, /\babs\s*sorun/i, /balata/i] },
  { tag: "#MotorArızası",     label: "Motor Arızası",     emoji: "🔥", color: "#ff2d55", sentiment: "negative", patterns: [/motor\s*ar[ıi]za/i, /motor\s*sorun/i, /motor\s*revize/i] },
  { tag: "#AküSorunu",        label: "Akü Sorunu",        emoji: "🔋", color: "#ff6b00", sentiment: "negative", patterns: [/akü/i, /akı\s*bit/i, /şarj\s*sorun/i] },
  { tag: "#ElektronikArıza",  label: "Elektronik Arıza",  emoji: "⚠️", color: "#ff6b00", sentiment: "negative", patterns: [/elektronik\s*ar[ıi]za/i, /elektronik\s*sorun/i, /ekran\s*donm/i, /yazılım/i] },
  { tag: "#GeriÇağırma",      label: "Geri Çağırma",      emoji: "📢", color: "#ff2d55", sentiment: "negative", patterns: [/geri\s*çağ[ıi]r/i, /recall/i, /campaign/i] },
  { tag: "#YağYakma",         label: "Yağ Yakma",         emoji: "💧", color: "#ff6b00", sentiment: "negative", patterns: [/yağ\s*yak/i, /yağ\s*tüket/i] },
  { tag: "#YakıtTüketimi",    label: "Yakıt Tüketimi",    emoji: "⛽", color: "#ffd60a", sentiment: "neutral",  patterns: [/yakıt\s*tüket/i, /benzin\s*yak/i, /dizel\s*tüket/i] },
  { tag: "#ServisYetersizliği", label: "Servis Yetersizliği", emoji: "🏢", color: "#ff2d55", sentiment: "negative", patterns: [/servis\s*sorun/i, /yetkili\s*servis/i, /servis\s*pahal/i, /garanti\s*kapsam/i] },
  { tag: "#KlimaSorunu",      label: "Klima Sorunu",      emoji: "❄️", color: "#ff6b00", sentiment: "negative", patterns: [/klima\s*sorun/i, /klima\s*çal[ıi]ş/i, /soğutm/i] },
  { tag: "#Süspansiyon",      label: "Süspansiyon",       emoji: "🔩", color: "#ff6b00", sentiment: "negative", patterns: [/süspansiyon/i, /amortis/i, /tıkır/i, /titreş/i] },
  // Pozitif
  { tag: "#YüksekKalite",     label: "Yüksek Kalite",     emoji: "💎", color: "#00d68f", sentiment: "positive", patterns: [/yüksek\s*kalite/i, /premium/i, /muhteşem/i] },
  { tag: "#EkonomikYakıt",    label: "Ekonomik Yakıt",    emoji: "🌱", color: "#00d68f", sentiment: "positive", patterns: [/ekonomik\s*yakıt/i, /düşük\s*tüket/i, /yakıt\s*tasarruf/i] },
  { tag: "#KonforTavsiye",    label: "Konfor Tavsiye",    emoji: "🛋️", color: "#00d68f", sentiment: "positive", patterns: [/çok\s*konfor/i, /rahat\s*sürüş/i, /sessiz\s*kabin/i] },
  { tag: "#SürüşKeyfi",       label: "Sürüş Keyfi",       emoji: "🏎️", color: "#00d68f", sentiment: "positive", patterns: [/sürüş\s*keyfi/i, /sportif/i, /hızlı\s*tepki/i] },
  { tag: "#Güvenilir",        label: "Güvenilir",         emoji: "🛡️", color: "#0090ff", sentiment: "positive", patterns: [/güvenil/i, /sorunsuz/i, /sağlam/i] },
];

export function extractHashtags(text: string): string[] {
  if (!text) return [];
  const t = text.toLowerCase();
  return HASHTAGS.filter((h) => h.patterns.some((p) => p.test(t))).map((h) => h.tag);
}

export function findHashtag(tag: string): Hashtag | undefined {
  return HASHTAGS.find((h) => h.tag === tag);
}
