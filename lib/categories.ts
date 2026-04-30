export const CATEGORY_SLUG: Record<string, string> = {
  otomobil: "OTOMOBIL",
  motosiklet: "MOTOSIKLET",
  ticari: "TICARI",
};

export const CATEGORY_LABEL: Record<string, string> = {
  OTOMOBIL: "Otomobil",
  MOTOSIKLET: "Motosiklet",
  TICARI: "Ticari Araç",
};

export const CATEGORY_EMOJI: Record<string, string> = {
  OTOMOBIL: "🚗",
  MOTOSIKLET: "🏍️",
  TICARI: "🚚",
};

export const SENTIMENT_LABEL: Record<string, string> = {
  COMPLAINT: "Şikayet",
  POSITIVE: "Olumlu",
  TIP: "İpucu",
};

export const SENTIMENT_COLOR: Record<string, string> = {
  COMPLAINT: "bg-red-100 text-red-700 border-red-200",
  POSITIVE: "bg-green-100 text-green-700 border-green-200",
  TIP: "bg-orange-100 text-orange-700 border-orange-200",
};

export const SENTIMENT_BORDER: Record<string, string> = {
  COMPLAINT: "border-l-red-500",
  POSITIVE: "border-l-green-500",
  TIP: "border-l-orange-400",
};

export function slugToCategory(slug: string): string | null {
  return CATEGORY_SLUG[slug.toLowerCase()] || null;
}

export function categoryToSlug(cat: string): string {
  return Object.entries(CATEGORY_SLUG).find(([, v]) => v === cat)?.[0] || cat.toLowerCase();
}

export function carImageUrl(brand: string, model: string): string {
  let hash = 0;
  for (const c of `${brand}${model}`) hash = (hash * 31 + c.charCodeAt(0)) & 0xfffffff;
  const seed = Math.abs(hash) % 9000 + 1000;
  return `https://loremflickr.com/640/360/car,automobile?lock=${seed}`;
}
