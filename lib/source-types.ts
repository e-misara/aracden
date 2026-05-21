/**
 * Review kaynaklarını sentiment + kullanici adından kategori etiketine çevirir.
 * Kullanıcının gerçek adı UI'da gizlenir — bunun yerine kategori etiketi gösterilir.
 */

export type SourceType =
  | "verified-owner"
  | "video-review"
  | "complaint"
  | "forum"
  | "press"
  | "recall"
  | "expert"
  | "community";

export type SourceMeta = {
  type: SourceType;
  emoji: string;
  label: string;
  color: string;
};

const PATTERNS: { match: (kullanici: string, sentiment?: string) => boolean; meta: SourceMeta }[] = [
  // NHTSA Recall
  { match: (k) => /NHTSA|Recall/i.test(k), meta: { type: "recall", emoji: "📢", label: "Geri Çağırma", color: "#ff2d55" } },
  // Şikayetvar
  { match: (k) => /Şikayetvar/i.test(k), meta: { type: "complaint", emoji: "😤", label: "Şikayet Kaydı", color: "#ff2d55" } },
  // Basın
  { match: (k) => /AraçDen Basın|Basın|NTV|Hürriyet|Sabah/i.test(k), meta: { type: "press", emoji: "📰", label: "Basın Haberi", color: "#0090ff" } },
  // Forum
  { match: (k) => /Forum|DH \+|DH\+|Donanım/i.test(k), meta: { type: "forum", emoji: "💬", label: "Forum Yorumu", color: "#0090ff" } },
  // Video kanalları (geniş regex)
  { match: (k) => /Otomobil|Motor1|Carviser|Doğan Kabak|AutoVlog|AutoSHOW|BiRKAN|ANLATICISI|Gündem|Türkiye|Eksper|otopark|carviser|arabamcom|Küçük Burjuvazi|Elektrikli Otomobil|ozgetrafikte|OtoSeyir|Mehmet Çetin|andmcetin/i.test(k), meta: { type: "video-review", emoji: "🎬", label: "Video İncelemesi", color: "#ff6b00" } },
];

export function getSourceMeta(kullanici: string, sentimentType?: string, verified?: boolean): SourceMeta {
  if (sentimentType === "RECALL") {
    return { type: "recall", emoji: "📢", label: "Geri Çağırma", color: "#ff2d55" };
  }
  if (sentimentType === "USER_ISSUE") {
    return { type: "verified-owner", emoji: "✅", label: "Doğrulanmış Sahibi", color: "#00d68f" };
  }
  for (const p of PATTERNS) {
    if (p.match(kullanici, sentimentType)) return p.meta;
  }
  // Default: verified ise sahibi, değilse topluluk
  if (verified) {
    return { type: "verified-owner", emoji: "✅", label: "Doğrulanmış Sahibi", color: "#00d68f" };
  }
  return { type: "community", emoji: "👤", label: "Topluluk Yorumu", color: "#8b8b9e" };
}
