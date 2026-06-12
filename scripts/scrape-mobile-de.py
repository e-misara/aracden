#!/usr/bin/env python3
"""
mobile.de 2. el araç fiyat scraper.

ÖNEMLİ — Türkiye IP'sinden mobile.de HTTP 403 döndürür ve robots.txt
/tr/* sayfalarını yasaklar. Bu script SADECE şu durumlarda çalıştırılmalıdır:
  - Almanya'da bulunan bir VPN/proxy ile bağlantı
  - robots.txt Almanca arama sayfalarına izin verir (suchen.mobile.de/fahrzeuge/...)
  - Rate-limit aşılmaz: her 30 araç için 3-5 sn bekleme zorunlu (REQUEST_DELAY)

Çıktı:
  /Users/GAC-A/andmcetin-data/mobile-de/raw/{marka-slug}.json
  /Users/GAC-A/andmcetin-data/mobile-de/stats/{marka-slug}-stats.json
  /Users/GAC-A/andmcetin-data/mobile-de/OZET.json

Sonra:
  cd aracden && npx tsx scripts/import-prices.ts
"""

import json
import re
import time
import urllib.parse
from pathlib import Path
from statistics import median

try:
    import requests
    from bs4 import BeautifulSoup
except ImportError:
    raise SystemExit("Kurulum gerekli: pip install requests beautifulsoup4")


# ─── Yapılandırma ────────────────────────────────────────────────────────────

OUTPUT_DIR = Path("/Users/GAC-A/andmcetin-data/mobile-de")
RAW_DIR = OUTPUT_DIR / "raw"
STATS_DIR = OUTPUT_DIR / "stats"

REQUEST_DELAY = 3.5   # saniye — rate-limit önlemek için
PAGE_LIMIT = 3        # arama başına maks. sayfa
MAX_AGE_MONTHS = 72   # son 72 ay ilanlar

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/120.0.0.0 Safari/537.36"
    ),
    "Accept-Language": "de-DE,de;q=0.9,en;q=0.8",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Encoding": "gzip, deflate, br",
}


# Türkiye'de yaygın 30 araç (kullanıcı talebi):
VEHICLES = [
    ("Volkswagen", "Golf"),         ("Renault", "Clio"),
    ("BMW", "3 Serisi"),            ("Mercedes-Benz", "C Serisi"),
    ("Toyota", "Corolla"),          ("Ford", "Focus"),
    ("Hyundai", "i20"),             ("Skoda", "Octavia"),
    ("Seat", "Leon"),               ("Audi", "A3"),
    ("Peugeot", "308"),             ("Opel", "Astra"),
    ("Dacia", "Duster"),            ("Honda", "Civic"),
    ("Fiat", "Egea"),               ("Kia", "Sportage"),
    ("Nissan", "Qashqai"),          ("Mazda", "CX-5"),
    ("Volkswagen", "Passat"),       ("Renault", "Megane"),
    ("BMW", "5 Serisi"),            ("Mercedes-Benz", "E Serisi"),
    ("Audi", "A4"),                 ("Volkswagen", "Tiguan"),
    ("Hyundai", "Tucson"),          ("Toyota", "RAV4"),
    ("Ford", "Kuga"),               ("Opel", "Mokka"),
    ("Peugeot", "3008"),            ("Skoda", "Superb"),
]


# ─── Yardımcılar ─────────────────────────────────────────────────────────────


def slugify(s: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")


def search_url(marka: str, model: str, page: int = 1) -> str:
    q = f"{marka} {model}"
    params = {
        "isSearchRequest": "true",
        "q": q,
        "s": "Car",
        "damageUnrepaired": "NO_DAMAGE_UNREPAIRED",
        "maxAge": str(MAX_AGE_MONTHS),
        "pageNumber": str(page),
    }
    return "https://suchen.mobile.de/fahrzeuge/search.html?" + urllib.parse.urlencode(params)


def parse_int(s: str | None) -> int | None:
    if not s:
        return None
    digits = re.sub(r"[^\d]", "", s)
    return int(digits) if digits else None


def parse_listing(card) -> dict | None:
    """
    Tek arama-sonucu kartından alanları çıkar.
    mobile.de'nin DOM'u zaman zaman değişir — bu fonksiyon kırıldığında
    sadece BURASI güncellenir.
    """
    title_el = card.select_one("h2, [data-testid='ad-title']")
    price_el = card.select_one("[data-testid='ad-price'], .price-block")
    url_el = card.select_one("a[href*='/auto/']")
    meta_el = card.select_one("[data-testid='ad-attributes'], .vehicle-data")

    if not (title_el and price_el and url_el):
        return None

    title = title_el.get_text(strip=True)
    price_text = price_el.get_text(strip=True)
    fiyat_eur = parse_int(price_text)
    if not fiyat_eur or fiyat_eur < 500 or fiyat_eur > 500_000:
        return None

    href = url_el.get("href", "")
    if href.startswith("/"):
        href = "https://suchen.mobile.de" + href

    meta_text = meta_el.get_text(" · ", strip=True) if meta_el else ""
    yil_m = re.search(r"(?:EZ\s*\d{2}\/|MFG\s+)(\d{4})|\b(20\d{2}|19\d{2})\b", meta_text)
    km_m = re.search(r"([\d\.]+)\s*km", meta_text)
    hp_m = re.search(r"([\d\.]+)\s*PS|\((\d+)\s*kW\)", meta_text)
    yakit_m = re.search(r"(Benzin|Diesel|Elektro|Hybrid|LPG|CNG)", meta_text, re.I)
    vites_m = re.search(r"(Automatik|Manuell|Schaltgetriebe|Halbautomatik)", meta_text, re.I)

    return {
        "title": title,
        "fiyat_eur": fiyat_eur,
        "yil": int(yil_m.group(1) or yil_m.group(2)) if yil_m else None,
        "km": parse_int(km_m.group(1)) if km_m else None,
        "guc_hp": parse_int(hp_m.group(1) if hp_m and hp_m.group(1) else (hp_m.group(2) if hp_m else None)),
        "yakit": yakit_m.group(1) if yakit_m else None,
        "vites": vites_m.group(1) if vites_m else None,
        "url": href,
    }


def fetch_search(marka: str, model: str) -> list[dict]:
    """Bir marka/model için tüm sayfaları gez, ilanları topla."""
    listings = []
    session = requests.Session()
    session.headers.update(HEADERS)

    for page in range(1, PAGE_LIMIT + 1):
        url = search_url(marka, model, page=page)
        try:
            r = session.get(url, timeout=30)
        except requests.RequestException as e:
            print(f"  ! sayfa {page} hata: {e}")
            break

        if r.status_code == 403:
            raise SystemExit(
                "\n⚠️  HTTP 403 alındı. mobile.de bu IP'yi engelliyor.\n"
                "Bu script SADECE Almanya VPN ile çalıştırılmalıdır.\n"
                "Bypass denemeden DURUYORUM (memory: bypass YASAK).\n"
            )
        if r.status_code != 200:
            print(f"  ! sayfa {page} HTTP {r.status_code}")
            break

        soup = BeautifulSoup(r.text, "html.parser")
        cards = soup.select("[data-testid='result-item'], .cBox-body--resultitem")

        page_count = 0
        for card in cards:
            row = parse_listing(card)
            if row:
                row.update({
                    "marka": marka,
                    "model": model,
                    "kaynak": "mobile.de",
                    "ulke": "DE",
                })
                listings.append(row)
                page_count += 1

        print(f"  sayfa {page}: {page_count} ilan")
        if page_count == 0:
            break
        time.sleep(REQUEST_DELAY)

    return listings


def calc_stats(listings: list[dict]) -> dict:
    if not listings:
        return {"ilan_sayisi": 0}
    fiyatlar = [x["fiyat_eur"] for x in listings if x.get("fiyat_eur")]
    kms = [x["km"] for x in listings if x.get("km")]
    motors: dict[str, int] = {}
    for x in listings:
        m = x.get("motor") or x.get("title", "").split(maxsplit=2)[2:3]
        key = (m if isinstance(m, str) else " ".join(m)) if m else None
        if key:
            motors[key] = motors.get(key, 0) + 1
    en_pop_motor = max(motors, key=motors.get) if motors else None
    return {
        "ilan_sayisi": len(listings),
        "ortalama_fiyat_eur": round(sum(fiyatlar) / len(fiyatlar)) if fiyatlar else None,
        "min_fiyat_eur": min(fiyatlar) if fiyatlar else None,
        "max_fiyat_eur": max(fiyatlar) if fiyatlar else None,
        "medyan_fiyat_eur": int(median(fiyatlar)) if fiyatlar else None,
        "medyan_km": int(median(kms)) if kms else None,
        "en_populer_motor": en_pop_motor,
    }


# ─── Ana akış ────────────────────────────────────────────────────────────────


def main() -> None:
    RAW_DIR.mkdir(parents=True, exist_ok=True)
    STATS_DIR.mkdir(parents=True, exist_ok=True)

    ozet = {"taranan": 0, "toplam_ilan": 0, "markalar": {}}

    for marka, model in VEHICLES:
        slug = f"{slugify(marka)}-{slugify(model)}"
        print(f"\n→ {marka} {model}")
        listings = fetch_search(marka, model)
        stats = calc_stats(listings)
        print(f"  toplam: {stats.get('ilan_sayisi', 0)} ilan, "
              f"ortalama: {stats.get('ortalama_fiyat_eur')} €")

        (RAW_DIR / f"{slug}.json").write_text(
            json.dumps(listings, ensure_ascii=False, indent=2), encoding="utf-8")
        (STATS_DIR / f"{slug}-stats.json").write_text(
            json.dumps({"marka": marka, "model": model, **stats},
                       ensure_ascii=False, indent=2), encoding="utf-8")

        ozet["taranan"] += 1
        ozet["toplam_ilan"] += stats.get("ilan_sayisi", 0)
        ozet["markalar"][slug] = stats

    (OUTPUT_DIR / "OZET.json").write_text(
        json.dumps(ozet, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"\n✔ Bitti. {ozet['taranan']} araç, {ozet['toplam_ilan']} ilan.")
    print(f"  Çıktı: {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
