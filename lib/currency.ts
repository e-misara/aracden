/**
 * Tek noktadan kur sabitleri (Mayıs 2026 güncel).
 * Kur değişirse SADECE BU DOSYAYI güncellemek yeterli — tüm fiyat hesapları
 * (komponentler, API, scriptler) buradan okur.
 *
 * İleride canlı kur servisi entegre edilirse `getRate()` async hale getirilir
 * ve sabitler son bilinen değer olarak default olur.
 */

export const EUR_TO_TL = 53;
export const USD_TO_TL = 45.9;

export const KUR_KAYNAGI = "Mayıs 2026 manuel";
export const KUR_GUNCELLEME = "2026-05-21";

export function eurToTl(eur: number): number {
  return Math.round(eur * EUR_TO_TL);
}

export function usdToTl(usd: number): number {
  return Math.round(usd * USD_TO_TL);
}

export function tlToEur(tl: number): number {
  return Math.round((tl / EUR_TO_TL) * 100) / 100;
}
