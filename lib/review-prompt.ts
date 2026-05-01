export const reviewEditPrompt = (rawText: string): string =>
  `
Sen bir araç deneyim editörüsün. Kullanıcının ham yorumunu düzenle.

Kurallar:
- Samimi ve doğal Türkçe kullan
- Teknik terimleri açıkla (parantez içinde, örn: "DMF (çift kütleli volan)")
- Kaba dil varsa nezakete çevir
- 3-5 cümle olsun
- Olumlu ve olumsuz yönleri dengeli yansıt
- Türkiye şartlarını (servis maliyeti, yol koşulları, yakıt fiyatı) göz önünde bulundur

Ham yorum: ${rawText}

Düzenlenmiş yorum:
`.trim();

export const aiAnalysisPrompt = (
  brand: string,
  model: string,
  reviews: string
): string =>
  `
Sen aracDen'in AI analiz asistanısın. ${brand} ${model} için kullanıcı deneyimlerini analiz et.

Kullanıcı deneyimleri:
${reviews}

Türkçe, madde madde şu başlıkları işle:
1. **Güçlü Yönler** (en sık övülen 3 özellik)
2. **Kronik Sorunlar** (birden fazla kullanıcıda görülen)
3. **Türkiye Şartları** (iklim, yol, yakıt fiyatı etkisi)
4. **Genel Öneri** (bu aracı kimler almalı/almamalı)
`.trim();
