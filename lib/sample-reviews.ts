// Reviews artık PostgreSQL'de — bundle boyutunu azaltmak için array boşaltıldı.
// Kullanım: /api/reviews endpoint'i üzerinden filtrele.
//
// Tam veri (1272 review, 1.04 MB) yedeği:
//   /Users/GAC-A/andmcetin-data/sample-reviews-backup-1272.ts.bak
// İmport script'i:
//   npx tsx scripts/import-reviews.ts

export interface SampleReview {
  id: string;
  kategoriSlug: string;
  kullanici: string;
  kullaniciAvatar?: string;
  verified?: boolean;
  marka: string;
  model: string;
  kasaKod: string;
  kasaTip: string;
  yil: number;
  puan: number;
  sinifKodu?: string;
  baslik: string;
  icerik: string;
  olumlu: string[];
  olumsuz: string[];
  sentimentType: "COMPLAINT" | "POSITIVE" | "TIP";
  kaynakUrl?: string;
  tarih: string;
  izlenme?: number;
  likeCount?: number;
}

export const sampleReviews: SampleReview[] = [];
