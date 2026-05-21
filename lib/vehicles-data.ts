// Sahibinden.com real data — do not add brands/models from other sources

export interface KasaTipi {
  tip: string;
  kod?: string; // BMW E46/F30 gibi şasi kodu — varsa URL slug'ı buradan üretilir
  yillar?: [number, number]; // şasi üretim yılı aralığı
  motorlar?: string[];
  yakit?: string[];
  vites?: string[];
}

export interface SahibindenModel {
  model: string;
  slug: string;
  kasaTipleri: KasaTipi[];
}

export interface SahibindenMarka {
  marka: string;
  slug: string;
  modeller: SahibindenModel[];
}

export interface Kasa {
  kod: string;
  yillar: [number, number];
  motorlar?: string[];
}

export interface Model {
  ad: string;
  kasalar: Kasa[];
}

export interface Marka {
  ad: string;
  modeller: Model[];
}

export interface Kategori {
  slug: string;
  ad: string;
  emoji: string;
  markalar: Marka[];
}

// ─── OTOMOBİL ────────────────────────────────────────────────────────────────

const otomobilMarkalari: SahibindenMarka[] = [
  { marka: "Abarth", slug: "abarth", modeller: [
    { model: "500", slug: "500", kasaTipleri: [{ tip: "Hatchback" }] },
    { model: "595", slug: "595", kasaTipleri: [{ tip: "Hatchback" }] },
    { model: "695", slug: "695", kasaTipleri: [{ tip: "Hatchback" }] },
  ]},
  { marka: "Aion", slug: "aion", modeller: [
    { model: "S", slug: "s", kasaTipleri: [{ tip: "Sedan" }] },
    { model: "Y Plus", slug: "y-plus", kasaTipleri: [{ tip: "SUV" }] },
  ]},
  { marka: "Alfa Romeo", slug: "alfa-romeo", modeller: [
    { model: "147", slug: "147", kasaTipleri: [{ tip: "Hatchback" }] },
    { model: "156", slug: "156", kasaTipleri: [{ tip: "Sedan" }, { tip: "Station Wagon" }] },
    { model: "159", slug: "159", kasaTipleri: [{ tip: "Sedan" }, { tip: "Station Wagon" }] },
    { model: "Giulia", slug: "giulia", kasaTipleri: [{ tip: "Sedan" }] },
    { model: "Giulietta", slug: "giulietta", kasaTipleri: [{ tip: "Hatchback" }] },
    { model: "Stelvio", slug: "stelvio", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Tonale", slug: "tonale", kasaTipleri: [{ tip: "SUV" }] },
  ]},
  { marka: "Alpine", slug: "alpine", modeller: [
    { model: "A110", slug: "a110", kasaTipleri: [{ tip: "Coupe" }] },
  ]},
  { marka: "Anadol", slug: "anadol", modeller: [
    { model: "A1", slug: "a1", kasaTipleri: [{ tip: "Sedan" }] },
    { model: "A2", slug: "a2", kasaTipleri: [{ tip: "Station Wagon" }] },
    { model: "STC", slug: "stc", kasaTipleri: [{ tip: "Station Wagon" }] },
  ]},
  { marka: "Arora", slug: "arora", modeller: [
    { model: "Elektrikli", slug: "elektrikli", kasaTipleri: [{ tip: "Sedan" }] },
  ]},
  { marka: "Aston Martin", slug: "aston-martin", modeller: [
    { model: "DB11", slug: "db11", kasaTipleri: [{ tip: "Coupe" }, { tip: "Cabrio" }] },
    { model: "Vantage", slug: "vantage", kasaTipleri: [{ tip: "Coupe" }] },
  ]},
  { marka: "Audi", slug: "audi", modeller: [
    { model: "A1", slug: "a1", kasaTipleri: [
      { tip: "Hatchback" },
      { tip: "Sportback" },
    ]},
    { model: "A3", slug: "a3", kasaTipleri: [
      { tip: "Hatchback", motorlar: ["1.0 TFSI 110 HP", "1.5 TFSI 150 HP", "2.0 TFSI 190 HP", "2.0 TFSI 265 HP (S3)", "1.6 TDI 116 HP", "2.0 TDI 150 HP", "2.0 TDI 184 HP", "1.4 TFSI e (PHEV) 204 HP"] },
      { tip: "Sedan", motorlar: ["1.0 TFSI 110 HP", "1.5 TFSI 150 HP", "2.0 TFSI 150 HP", "2.0 TFSI 190 HP", "2.0 TDI 116 HP", "2.0 TDI 150 HP"] },
      { tip: "Sportback" },
      { tip: "Cabrio" },
    ]},
    { model: "A4", slug: "a4", kasaTipleri: [
      { tip: "Sedan" },
      { tip: "Avant" },
      { tip: "Allroad" },
    ]},
    { model: "A5", slug: "a5", kasaTipleri: [
      { tip: "Coupe" },
      { tip: "Sportback" },
      { tip: "Cabrio" },
    ]},
    { model: "A6", slug: "a6", kasaTipleri: [
      { tip: "Sedan" },
      { tip: "Avant" },
      { tip: "Allroad" },
    ]},
    { model: "A6 E-Tron", slug: "a6-e-tron", kasaTipleri: [
      { tip: "Sedan" },
      { tip: "Avant" },
    ]},
    { model: "A7", slug: "a7", kasaTipleri: [
      { tip: "Sportback" },
    ]},
    { model: "A8", slug: "a8", kasaTipleri: [
      { tip: "Sedan" },
      { tip: "Long" },
    ]},
  ]},
  { marka: "Bentley", slug: "bentley", modeller: [
    { model: "Continental GT", slug: "continental-gt", kasaTipleri: [{ tip: "Coupe" }, { tip: "Cabrio" }] },
    { model: "Flying Spur", slug: "flying-spur", kasaTipleri: [{ tip: "Sedan" }] },
    { model: "Mulsanne", slug: "mulsanne", kasaTipleri: [{ tip: "Sedan" }] },
  ]},
  { marka: "BMW", slug: "bmw", modeller: [
    { model: "1 Serisi", slug: "1-serisi", kasaTipleri: [
      { kod: "E87", tip: "Hatchback", yillar: [2004, 2011] },
      { kod: "F20", tip: "Hatchback", yillar: [2011, 2019] },
      { kod: "F40", tip: "Hatchback", yillar: [2019, 2025] },
      { tip: "Sedan" },
    ] },
    { model: "2 Serisi", slug: "2-serisi", kasaTipleri: [{ tip: "Coupe" }, { tip: "Cabrio" }, { tip: "Active Tourer" }, { tip: "Gran Tourer" }] },
    { model: "3 Serisi", slug: "3-serisi", kasaTipleri: [
      { kod: "E46", tip: "Sedan", yillar: [1998, 2005] },
      { kod: "E46", tip: "Coupe", yillar: [1998, 2005] },
      { kod: "E90", tip: "Sedan", yillar: [2005, 2011] },
      { kod: "E92", tip: "Coupe", yillar: [2005, 2011] },
      { kod: "F30", tip: "Sedan", yillar: [2011, 2019] },
      { kod: "G20", tip: "Sedan", yillar: [2019, 2025] },
      { tip: "Touring" },
      { tip: "Cabrio" },
    ] },
    { model: "4 Serisi", slug: "4-serisi", kasaTipleri: [{ tip: "Coupe" }, { tip: "Cabrio" }, { tip: "Gran Coupe" }] },
    { model: "5 Serisi", slug: "5-serisi", kasaTipleri: [
      { kod: "E60", tip: "Sedan", yillar: [2003, 2010] },
      { kod: "F10", tip: "Sedan", yillar: [2010, 2017] },
      { kod: "G30", tip: "Sedan", yillar: [2017, 2025] },
      { tip: "Touring" },
    ] },
    { model: "6 Serisi", slug: "6-serisi", kasaTipleri: [{ tip: "Coupe" }, { tip: "Cabrio" }, { tip: "Gran Coupe" }, { tip: "Gran Turismo" }] },
    { model: "7 Serisi", slug: "7-serisi", kasaTipleri: [{ tip: "Sedan" }] },
    { model: "8 Serisi", slug: "8-serisi", kasaTipleri: [{ tip: "Coupe" }, { tip: "Cabrio" }, { tip: "Gran Coupe" }] },
    { model: "i3", slug: "i3", kasaTipleri: [{ tip: "Hatchback" }] },
    { model: "i4", slug: "i4", kasaTipleri: [{ tip: "Sedan" }] },
    { model: "i5", slug: "i5", kasaTipleri: [{ tip: "Sedan" }, { tip: "Touring" }] },
    { model: "i7", slug: "i7", kasaTipleri: [{ tip: "Sedan" }] },
    { model: "M2", slug: "m2", kasaTipleri: [{ tip: "Coupe" }] },
    { model: "M3", slug: "m3", kasaTipleri: [{ tip: "Sedan" }] },
    { model: "M4", slug: "m4", kasaTipleri: [{ tip: "Coupe" }, { tip: "Cabrio" }] },
    { model: "M5", slug: "m5", kasaTipleri: [{ tip: "Sedan" }] },
  ]},
  { marka: "BYD", slug: "byd", modeller: [
    { model: "Atto 3", slug: "atto-3", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Han", slug: "han", kasaTipleri: [{ tip: "Sedan" }] },
    { model: "Sea", slug: "sea", kasaTipleri: [{ tip: "Sedan" }] },
    { model: "Seal", slug: "seal", kasaTipleri: [{ tip: "Sedan" }] },
    { model: "Seal U", slug: "seal-u", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Seagull", slug: "seagull", kasaTipleri: [{ tip: "Hatchback" }] },
    { model: "Song Plus", slug: "song-plus", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Tang", slug: "tang", kasaTipleri: [{ tip: "SUV" }] },
  ]},
  { marka: "Chery", slug: "chery", modeller: [
    { model: "Arrizo 5", slug: "arrizo-5", kasaTipleri: [{ tip: "Sedan" }] },
    { model: "Tiggo 4", slug: "tiggo-4", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Tiggo 7", slug: "tiggo-7", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Tiggo 8", slug: "tiggo-8", kasaTipleri: [{ tip: "SUV" }] },
  ]},
  { marka: "Chevrolet", slug: "chevrolet", modeller: [
    { model: "Aveo", slug: "aveo", kasaTipleri: [{ tip: "Sedan" }, { tip: "Hatchback" }] },
    { model: "Captiva", slug: "captiva", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Cruze", slug: "cruze", kasaTipleri: [{ tip: "Sedan" }, { tip: "Hatchback" }, { tip: "Station Wagon" }] },
    { model: "Lacetti", slug: "lacetti", kasaTipleri: [{ tip: "Sedan" }, { tip: "Hatchback" }] },
    { model: "Malibu", slug: "malibu", kasaTipleri: [{ tip: "Sedan" }] },
    { model: "Spark", slug: "spark", kasaTipleri: [{ tip: "Hatchback" }] },
    { model: "Trax", slug: "trax", kasaTipleri: [{ tip: "SUV" }] },
  ]},
  { marka: "Chrysler", slug: "chrysler", modeller: [
    { model: "300C", slug: "300c", kasaTipleri: [{ tip: "Sedan" }] },
    { model: "Voyager", slug: "voyager", kasaTipleri: [{ tip: "Minivan" }] },
  ]},
  { marka: "Citroen", slug: "citroen", modeller: [
    { model: "Berlingo", slug: "berlingo", kasaTipleri: [{ tip: "MPV" }] },
    { model: "C1", slug: "c1", kasaTipleri: [{ tip: "Hatchback" }] },
    { model: "C2", slug: "c2", kasaTipleri: [{ tip: "Hatchback" }] },
    { model: "C3", slug: "c3", kasaTipleri: [{ tip: "Hatchback" }] },
    { model: "C3 Aircross", slug: "c3-aircross", kasaTipleri: [{ tip: "SUV" }] },
    { model: "C4", slug: "c4", kasaTipleri: [{ tip: "Hatchback" }, { tip: "Sedan" }] },
    { model: "C4 Cactus", slug: "c4-cactus", kasaTipleri: [{ tip: "SUV" }] },
    { model: "C4 Picasso", slug: "c4-picasso", kasaTipleri: [{ tip: "MPV" }] },
    { model: "C5", slug: "c5", kasaTipleri: [{ tip: "Sedan" }, { tip: "Station Wagon" }] },
    { model: "C5 Aircross", slug: "c5-aircross", kasaTipleri: [{ tip: "SUV" }] },
    { model: "C5 X", slug: "c5-x", kasaTipleri: [{ tip: "Fastback" }] },
    { model: "C-Elysee", slug: "c-elysee", kasaTipleri: [{ tip: "Sedan" }] },
    { model: "Xsara", slug: "xsara", kasaTipleri: [{ tip: "Hatchback" }] },
    { model: "Xsara Picasso", slug: "xsara-picasso", kasaTipleri: [{ tip: "MPV" }] },
  ]},
  { marka: "Cupra", slug: "cupra", modeller: [
    { model: "Born", slug: "born", kasaTipleri: [{ tip: "Hatchback" }] },
    { model: "Formentor", slug: "formentor", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Leon", slug: "leon", kasaTipleri: [{ tip: "Hatchback" }, { tip: "Sportstourer" }] },
  ]},
  { marka: "Dacia", slug: "dacia", modeller: [
    { model: "Duster", slug: "duster", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Jogger", slug: "jogger", kasaTipleri: [{ tip: "Station Wagon" }] },
    { model: "Logan", slug: "logan", kasaTipleri: [{ tip: "Sedan" }, { tip: "MCV" }] },
    { model: "Sandero", slug: "sandero", kasaTipleri: [{ tip: "Hatchback" }] },
    { model: "Sandero Stepway", slug: "sandero-stepway", kasaTipleri: [{ tip: "Hatchback" }] },
    { model: "Spring", slug: "spring", kasaTipleri: [{ tip: "Hatchback" }] },
  ]},
  { marka: "Daewoo", slug: "daewoo", modeller: [
    { model: "Kalos", slug: "kalos", kasaTipleri: [{ tip: "Sedan" }, { tip: "Hatchback" }] },
    { model: "Lanos", slug: "lanos", kasaTipleri: [{ tip: "Sedan" }, { tip: "Hatchback" }] },
    { model: "Leganza", slug: "leganza", kasaTipleri: [{ tip: "Sedan" }] },
    { model: "Matiz", slug: "matiz", kasaTipleri: [{ tip: "Hatchback" }] },
    { model: "Nexia", slug: "nexia", kasaTipleri: [{ tip: "Sedan" }] },
    { model: "Nubira", slug: "nubira", kasaTipleri: [{ tip: "Sedan" }] },
    { model: "Racer", slug: "racer", kasaTipleri: [{ tip: "Hatchback" }] },
  ]},
  { marka: "DS Automobiles", slug: "ds-automobiles", modeller: [
    { model: "DS 3", slug: "ds-3", kasaTipleri: [{ tip: "Hatchback" }, { tip: "Crossback" }] },
    { model: "DS 4", slug: "ds-4", kasaTipleri: [{ tip: "Hatchback" }] },
    { model: "DS 7", slug: "ds-7", kasaTipleri: [{ tip: "SUV" }] },
    { model: "DS 9", slug: "ds-9", kasaTipleri: [{ tip: "Sedan" }] },
  ]},
  { marka: "Fiat", slug: "fiat", modeller: [
    { model: "500", slug: "500", kasaTipleri: [{ tip: "Hatchback" }, { tip: "Cabrio" }] },
    { model: "500e", slug: "500e", kasaTipleri: [{ tip: "Hatchback" }, { tip: "Cabrio" }] },
    { model: "Bravo", slug: "bravo", kasaTipleri: [{ tip: "Hatchback" }] },
    { model: "Doblo", slug: "doblo", kasaTipleri: [{ tip: "MPV" }] },
    { model: "Egea", slug: "egea", kasaTipleri: [
      { tip: "Sedan" },
      { tip: "Hatchback" },
      { tip: "Station Wagon" },
    ]},
    { model: "Grande Punto", slug: "grande-punto", kasaTipleri: [{ tip: "Hatchback" }] },
    { model: "Linea", slug: "linea", kasaTipleri: [{ tip: "Sedan" }] },
    { model: "Palio", slug: "palio", kasaTipleri: [{ tip: "Hatchback" }] },
    { model: "Punto", slug: "punto", kasaTipleri: [{ tip: "Hatchback" }] },
    { model: "Stilo", slug: "stilo", kasaTipleri: [{ tip: "Hatchback" }, { tip: "Station Wagon" }] },
    { model: "Tipo", slug: "tipo", kasaTipleri: [{ tip: "Sedan" }, { tip: "Hatchback" }, { tip: "Station Wagon" }] },
  ]},
  { marka: "Ford", slug: "ford", modeller: [
    { model: "C-Max", slug: "c-max", kasaTipleri: [{ tip: "MPV" }] },
    { model: "Fiesta", slug: "fiesta", kasaTipleri: [{ tip: "Hatchback" }, { tip: "Sedan" }] },
    { model: "Focus", slug: "focus", kasaTipleri: [{ tip: "Sedan" }, { tip: "Hatchback" }, { tip: "Station Wagon" }] },
    { model: "Fusion", slug: "fusion", kasaTipleri: [{ tip: "Hatchback" }] },
    { model: "Galaxy", slug: "galaxy", kasaTipleri: [{ tip: "MPV" }] },
    { model: "Mondeo", slug: "mondeo", kasaTipleri: [{ tip: "Sedan" }, { tip: "Hatchback" }, { tip: "Station Wagon" }] },
    { model: "Mustang", slug: "mustang", kasaTipleri: [{ tip: "Coupe" }, { tip: "Cabrio" }, { tip: "Mach-E" }] },
    { model: "Puma", slug: "puma", kasaTipleri: [{ tip: "SUV" }] },
    { model: "S-Max", slug: "s-max", kasaTipleri: [{ tip: "MPV" }] },
  ]},
  { marka: "Honda", slug: "honda", modeller: [
    { model: "Accord", slug: "accord", kasaTipleri: [{ tip: "Sedan" }, { tip: "Station Wagon" }] },
    { model: "City", slug: "city", kasaTipleri: [{ tip: "Sedan" }] },
    { model: "Civic", slug: "civic", kasaTipleri: [{ tip: "Sedan" }, { tip: "Hatchback" }] },
    { model: "CR-Z", slug: "cr-z", kasaTipleri: [{ tip: "Coupe" }] },
    { model: "e", slug: "e", kasaTipleri: [{ tip: "Hatchback" }] },
    { model: "HR-V", slug: "hr-v", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Insight", slug: "insight", kasaTipleri: [{ tip: "Sedan" }] },
    { model: "Jazz", slug: "jazz", kasaTipleri: [{ tip: "Hatchback" }] },
  ]},
  { marka: "Hyundai", slug: "hyundai", modeller: [
    { model: "Accent", slug: "accent", kasaTipleri: [{ tip: "Sedan" }, { tip: "Hatchback" }] },
    { model: "Elantra", slug: "elantra", kasaTipleri: [{ tip: "Sedan" }] },
    { model: "i10", slug: "i10", kasaTipleri: [{ tip: "Hatchback" }] },
    { model: "i20", slug: "i20", kasaTipleri: [{ tip: "Hatchback" }] },
    { model: "i30", slug: "i30", kasaTipleri: [{ tip: "Hatchback" }, { tip: "Station Wagon" }] },
    { model: "Ioniq", slug: "ioniq", kasaTipleri: [{ tip: "Hatchback" }] },
    { model: "Ioniq 5", slug: "ioniq-5", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Ioniq 6", slug: "ioniq-6", kasaTipleri: [{ tip: "Sedan" }] },
    { model: "Sonata", slug: "sonata", kasaTipleri: [{ tip: "Sedan" }] },
    { model: "Tucson", slug: "tucson", kasaTipleri: [{ tip: "SUV" }] },
  ]},
  { marka: "Infiniti", slug: "infiniti", modeller: [
    { model: "Q30", slug: "q30", kasaTipleri: [{ tip: "Hatchback" }] },
    { model: "Q50", slug: "q50", kasaTipleri: [{ tip: "Sedan" }] },
    { model: "Q60", slug: "q60", kasaTipleri: [{ tip: "Coupe" }] },
  ]},
  { marka: "Jaguar", slug: "jaguar", modeller: [
    { model: "E-Pace", slug: "e-pace", kasaTipleri: [{ tip: "SUV" }] },
    { model: "F-Pace", slug: "f-pace", kasaTipleri: [{ tip: "SUV" }] },
    { model: "F-Type", slug: "f-type", kasaTipleri: [{ tip: "Coupe" }, { tip: "Cabrio" }] },
    { model: "I-Pace", slug: "i-pace", kasaTipleri: [{ tip: "SUV" }] },
    { model: "XE", slug: "xe", kasaTipleri: [{ tip: "Sedan" }] },
    { model: "XF", slug: "xf", kasaTipleri: [{ tip: "Sedan" }] },
  ]},
  { marka: "Jeep", slug: "jeep", modeller: [
    { model: "Avenger", slug: "avenger", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Cherokee", slug: "cherokee", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Compass", slug: "compass", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Grand Cherokee", slug: "grand-cherokee", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Renegade", slug: "renegade", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Wrangler", slug: "wrangler", kasaTipleri: [{ tip: "SUV" }] },
  ]},
  { marka: "Kia", slug: "kia", modeller: [
    { model: "Ceed", slug: "ceed", kasaTipleri: [{ tip: "Hatchback" }, { tip: "Station Wagon" }] },
    { model: "EV6", slug: "ev6", kasaTipleri: [{ tip: "Crossover" }] },
    { model: "Picanto", slug: "picanto", kasaTipleri: [{ tip: "Hatchback" }] },
    { model: "ProCeed", slug: "proceed", kasaTipleri: [{ tip: "Shooting Brake" }] },
    { model: "Rio", slug: "rio", kasaTipleri: [{ tip: "Sedan" }, { tip: "Hatchback" }] },
    { model: "Sportage", slug: "sportage", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Stinger", slug: "stinger", kasaTipleri: [{ tip: "Fastback" }] },
    { model: "XCeed", slug: "xceed", kasaTipleri: [{ tip: "SUV" }] },
  ]},
  { marka: "Lada", slug: "lada", modeller: [
    { model: "Granta", slug: "granta", kasaTipleri: [{ tip: "Sedan" }] },
    { model: "Kalina", slug: "kalina", kasaTipleri: [{ tip: "Sedan" }, { tip: "Hatchback" }] },
    { model: "Priora", slug: "priora", kasaTipleri: [{ tip: "Sedan" }] },
    { model: "Vesta", slug: "vesta", kasaTipleri: [{ tip: "Sedan" }, { tip: "Station Wagon" }] },
  ]},
  { marka: "Lamborghini", slug: "lamborghini", modeller: [
    { model: "Huracan", slug: "huracan", kasaTipleri: [{ tip: "Coupe" }, { tip: "Spyder" }] },
    { model: "Urus", slug: "urus", kasaTipleri: [{ tip: "SUV" }] },
  ]},
  { marka: "Land Rover", slug: "land-rover", modeller: [
    { model: "Defender", slug: "defender", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Discovery", slug: "discovery", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Discovery Sport", slug: "discovery-sport", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Freelander", slug: "freelander", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Range Rover", slug: "range-rover", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Range Rover Evoque", slug: "range-rover-evoque", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Range Rover Sport", slug: "range-rover-sport", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Range Rover Velar", slug: "range-rover-velar", kasaTipleri: [{ tip: "SUV" }] },
  ]},
  { marka: "Lexus", slug: "lexus", modeller: [
    { model: "CT", slug: "ct", kasaTipleri: [{ tip: "Hatchback" }] },
    { model: "ES", slug: "es", kasaTipleri: [{ tip: "Sedan" }] },
    { model: "IS", slug: "is", kasaTipleri: [{ tip: "Sedan" }] },
    { model: "LC", slug: "lc", kasaTipleri: [{ tip: "Coupe" }] },
    { model: "LS", slug: "ls", kasaTipleri: [{ tip: "Sedan" }] },
    { model: "NX", slug: "nx", kasaTipleri: [{ tip: "SUV" }] },
    { model: "RX", slug: "rx", kasaTipleri: [{ tip: "SUV" }] },
    { model: "UX", slug: "ux", kasaTipleri: [{ tip: "SUV" }] },
  ]},
  { marka: "Lincoln", slug: "lincoln", modeller: [
    { model: "Continental", slug: "continental", kasaTipleri: [{ tip: "Sedan" }] },
    { model: "Town Car", slug: "town-car", kasaTipleri: [{ tip: "Sedan" }] },
  ]},
  { marka: "Maserati", slug: "maserati", modeller: [
    { model: "Ghibli", slug: "ghibli", kasaTipleri: [{ tip: "Sedan" }] },
    { model: "GranTurismo", slug: "granturismo", kasaTipleri: [{ tip: "Coupe" }] },
    { model: "Levante", slug: "levante", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Quattroporte", slug: "quattroporte", kasaTipleri: [{ tip: "Sedan" }] },
  ]},
  { marka: "Mazda", slug: "mazda", modeller: [
    { model: "2", slug: "2", kasaTipleri: [{ tip: "Sedan" }, { tip: "Hatchback" }] },
    { model: "3", slug: "3", kasaTipleri: [{ tip: "Sedan" }, { tip: "Hatchback" }] },
    { model: "5", slug: "5", kasaTipleri: [{ tip: "MPV" }] },
    { model: "6", slug: "6", kasaTipleri: [{ tip: "Sedan" }, { tip: "Station Wagon" }] },
    { model: "CX-3", slug: "cx-3", kasaTipleri: [{ tip: "SUV" }] },
    { model: "CX-30", slug: "cx-30", kasaTipleri: [{ tip: "SUV" }] },
    { model: "CX-5", slug: "cx-5", kasaTipleri: [{ tip: "SUV" }] },
    { model: "MX-5", slug: "mx-5", kasaTipleri: [{ tip: "Roadster" }] },
  ]},
  { marka: "Mercedes-Benz", slug: "mercedes-benz", modeller: [
    { model: "A Serisi", slug: "a-serisi", kasaTipleri: [{ tip: "Hatchback" }, { tip: "Sedan" }] },
    { model: "B Serisi", slug: "b-serisi", kasaTipleri: [{ tip: "MPV" }] },
    { model: "C Serisi", slug: "c-serisi", kasaTipleri: [{ tip: "Sedan" }, { tip: "Station Wagon" }, { tip: "Coupe" }, { tip: "Cabrio" }] },
    { model: "CLA", slug: "cla", kasaTipleri: [{ tip: "Sedan" }, { tip: "Shooting Brake" }] },
    { model: "CLS", slug: "cls", kasaTipleri: [{ tip: "Sedan" }] },
    { model: "E Serisi", slug: "e-serisi", kasaTipleri: [{ tip: "Sedan" }, { tip: "Station Wagon" }, { tip: "Coupe" }, { tip: "Cabrio" }] },
    { model: "EQA", slug: "eqa", kasaTipleri: [{ tip: "SUV" }] },
    { model: "EQB", slug: "eqb", kasaTipleri: [{ tip: "SUV" }] },
    { model: "EQC", slug: "eqc", kasaTipleri: [{ tip: "SUV" }] },
    { model: "EQE", slug: "eqe", kasaTipleri: [{ tip: "Sedan" }, { tip: "SUV" }] },
    { model: "EQS", slug: "eqs", kasaTipleri: [{ tip: "Sedan" }, { tip: "SUV" }] },
    { model: "GLA", slug: "gla", kasaTipleri: [{ tip: "SUV" }] },
    { model: "GLB", slug: "glb", kasaTipleri: [{ tip: "SUV" }] },
    { model: "GLC", slug: "glc", kasaTipleri: [{ tip: "SUV" }, { tip: "Coupe" }] },
    { model: "GLE", slug: "gle", kasaTipleri: [{ tip: "SUV" }, { tip: "Coupe" }] },
    { model: "GLS", slug: "gls", kasaTipleri: [{ tip: "SUV" }] },
    { model: "S Serisi", slug: "s-serisi", kasaTipleri: [{ tip: "Sedan" }] },
    { model: "SL", slug: "sl", kasaTipleri: [{ tip: "Roadster" }] },
  ]},
  { marka: "Mini", slug: "mini", modeller: [
    { model: "Clubman", slug: "clubman", kasaTipleri: [{ tip: "Station Wagon" }] },
    { model: "Convertible", slug: "convertible", kasaTipleri: [{ tip: "Cabrio" }] },
    { model: "Countryman", slug: "countryman", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Hatch", slug: "hatch", kasaTipleri: [{ tip: "Hatchback" }] },
    { model: "Paceman", slug: "paceman", kasaTipleri: [{ tip: "SUV" }] },
  ]},
  { marka: "Mitsubishi", slug: "mitsubishi", modeller: [
    { model: "Carisma", slug: "carisma", kasaTipleri: [{ tip: "Sedan" }, { tip: "Hatchback" }] },
    { model: "Colt", slug: "colt", kasaTipleri: [{ tip: "Hatchback" }] },
    { model: "Eclipse Cross", slug: "eclipse-cross", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Galant", slug: "galant", kasaTipleri: [{ tip: "Sedan" }] },
    { model: "Lancer", slug: "lancer", kasaTipleri: [{ tip: "Sedan" }, { tip: "Station Wagon" }] },
    { model: "Outlander", slug: "outlander", kasaTipleri: [{ tip: "SUV" }] },
  ]},
  { marka: "Nissan", slug: "nissan", modeller: [
    { model: "Almera", slug: "almera", kasaTipleri: [{ tip: "Sedan" }, { tip: "Hatchback" }] },
    { model: "Juke", slug: "juke", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Leaf", slug: "leaf", kasaTipleri: [{ tip: "Hatchback" }] },
    { model: "Micra", slug: "micra", kasaTipleri: [{ tip: "Hatchback" }] },
    { model: "Note", slug: "note", kasaTipleri: [{ tip: "Hatchback" }] },
    { model: "Primera", slug: "primera", kasaTipleri: [{ tip: "Sedan" }, { tip: "Hatchback" }] },
    { model: "Qashqai", slug: "qashqai", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Tiida", slug: "tiida", kasaTipleri: [{ tip: "Sedan" }] },
    { model: "X-Trail", slug: "x-trail", kasaTipleri: [{ tip: "SUV" }] },
  ]},
  { marka: "Opel", slug: "opel", modeller: [
    { model: "Agila", slug: "agila", kasaTipleri: [{ tip: "Hatchback" }] },
    { model: "Astra", slug: "astra", kasaTipleri: [{ tip: "Sedan" }, { tip: "Hatchback" }, { tip: "Station Wagon" }, { tip: "Coupe" }] },
    { model: "Combo", slug: "combo", kasaTipleri: [{ tip: "MPV" }] },
    { model: "Corsa", slug: "corsa", kasaTipleri: [{ tip: "Hatchback" }] },
    { model: "Crossland", slug: "crossland", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Grandland", slug: "grandland", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Insignia", slug: "insignia", kasaTipleri: [{ tip: "Sedan" }, { tip: "Hatchback" }, { tip: "Station Wagon" }] },
    { model: "Meriva", slug: "meriva", kasaTipleri: [{ tip: "MPV" }] },
    { model: "Mokka", slug: "mokka", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Vectra", slug: "vectra", kasaTipleri: [{ tip: "Sedan" }, { tip: "Hatchback" }, { tip: "Station Wagon" }] },
    { model: "Zafira", slug: "zafira", kasaTipleri: [{ tip: "MPV" }] },
  ]},
  { marka: "Peugeot", slug: "peugeot", modeller: [
    { model: "107", slug: "107", kasaTipleri: [{ tip: "Hatchback" }] },
    { model: "207", slug: "207", kasaTipleri: [{ tip: "Hatchback" }, { tip: "Cabrio" }, { tip: "Station Wagon" }] },
    { model: "208", slug: "208", kasaTipleri: [{ tip: "Hatchback" }] },
    { model: "301", slug: "301", kasaTipleri: [{ tip: "Sedan" }] },
    { model: "307", slug: "307", kasaTipleri: [{ tip: "Hatchback" }, { tip: "Cabrio" }, { tip: "Station Wagon" }] },
    { model: "308", slug: "308", kasaTipleri: [{ tip: "Hatchback" }, { tip: "Station Wagon" }] },
    { model: "406", slug: "406", kasaTipleri: [{ tip: "Sedan" }, { tip: "Station Wagon" }] },
    { model: "407", slug: "407", kasaTipleri: [{ tip: "Sedan" }, { tip: "Station Wagon" }] },
    { model: "408", slug: "408", kasaTipleri: [{ tip: "Fastback" }] },
    { model: "508", slug: "508", kasaTipleri: [{ tip: "Sedan" }, { tip: "Station Wagon" }] },
    { model: "e-208", slug: "e-208", kasaTipleri: [{ tip: "Hatchback" }] },
    { model: "e-2008", slug: "e-2008", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Partner", slug: "partner", kasaTipleri: [{ tip: "MPV" }] },
  ]},
  { marka: "Porsche", slug: "porsche", modeller: [
    { model: "718", slug: "718", kasaTipleri: [{ tip: "Boxster" }, { tip: "Cayman" }] },
    { model: "911", slug: "911", kasaTipleri: [{ tip: "Coupe" }, { tip: "Cabrio" }, { tip: "Targa" }] },
    { model: "Cayenne", slug: "cayenne", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Macan", slug: "macan", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Panamera", slug: "panamera", kasaTipleri: [{ tip: "Fastback" }, { tip: "Sport Turismo" }] },
    { model: "Taycan", slug: "taycan", kasaTipleri: [{ tip: "Sedan" }, { tip: "Sport Turismo" }, { tip: "Cross Turismo" }] },
  ]},
  { marka: "Renault", slug: "renault", modeller: [
    { model: "Clio", slug: "clio", kasaTipleri: [{ tip: "Hatchback" }, { tip: "Station Wagon" }] },
    { model: "Fluence", slug: "fluence", kasaTipleri: [{ tip: "Sedan" }] },
    { model: "Grand Scenic", slug: "grand-scenic", kasaTipleri: [{ tip: "MPV" }] },
    { model: "Kangoo", slug: "kangoo", kasaTipleri: [{ tip: "MPV" }] },
    { model: "Laguna", slug: "laguna", kasaTipleri: [{ tip: "Sedan" }, { tip: "Coupe" }, { tip: "Station Wagon" }] },
    { model: "Megane", slug: "megane", kasaTipleri: [{ tip: "Sedan" }, { tip: "Hatchback" }, { tip: "Station Wagon" }, { tip: "Coupe" }, { tip: "Cabrio" }] },
    { model: "Modus", slug: "modus", kasaTipleri: [{ tip: "MPV" }] },
    { model: "Scenic", slug: "scenic", kasaTipleri: [{ tip: "MPV" }] },
    { model: "Symbol", slug: "symbol", kasaTipleri: [{ tip: "Sedan" }] },
    { model: "Talisman", slug: "talisman", kasaTipleri: [{ tip: "Sedan" }, { tip: "Station Wagon" }] },
    { model: "Zoe", slug: "zoe", kasaTipleri: [{ tip: "Hatchback" }] },
  ]},
  { marka: "Rover", slug: "rover", modeller: [
    { model: "400", slug: "400", kasaTipleri: [{ tip: "Sedan" }, { tip: "Hatchback" }] },
    { model: "600", slug: "600", kasaTipleri: [{ tip: "Sedan" }] },
  ]},
  { marka: "Saab", slug: "saab", modeller: [
    { model: "9-3", slug: "9-3", kasaTipleri: [{ tip: "Sedan" }, { tip: "Station Wagon" }, { tip: "Cabrio" }] },
    { model: "9-5", slug: "9-5", kasaTipleri: [{ tip: "Sedan" }, { tip: "Station Wagon" }] },
  ]},
  { marka: "Seat", slug: "seat", modeller: [
    { model: "Altea", slug: "altea", kasaTipleri: [{ tip: "MPV" }] },
    { model: "Arona", slug: "arona", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Ateca", slug: "ateca", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Ibiza", slug: "ibiza", kasaTipleri: [{ tip: "Hatchback" }] },
    { model: "Leon", slug: "leon", kasaTipleri: [{ tip: "Hatchback" }, { tip: "Sportstourer" }] },
    { model: "Tarraco", slug: "tarraco", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Toledo", slug: "toledo", kasaTipleri: [{ tip: "Sedan" }, { tip: "Hatchback" }] },
  ]},
  { marka: "Skoda", slug: "skoda", modeller: [
    { model: "Enyaq", slug: "enyaq", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Fabia", slug: "fabia", kasaTipleri: [{ tip: "Hatchback" }, { tip: "Station Wagon" }] },
    { model: "Karoq", slug: "karoq", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Kodiaq", slug: "kodiaq", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Octavia", slug: "octavia", kasaTipleri: [{ tip: "Sedan" }, { tip: "Station Wagon" }] },
    { model: "Rapid", slug: "rapid", kasaTipleri: [{ tip: "Sedan" }, { tip: "Spaceback" }] },
    { model: "Scala", slug: "scala", kasaTipleri: [{ tip: "Hatchback" }] },
    { model: "Superb", slug: "superb", kasaTipleri: [{ tip: "Sedan" }, { tip: "Combi" }] },
  ]},
  { marka: "Smart", slug: "smart", modeller: [
    { model: "#1", slug: "1", kasaTipleri: [{ tip: "SUV" }] },
    { model: "#3", slug: "3", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Fortwo", slug: "fortwo", kasaTipleri: [{ tip: "Coupe" }, { tip: "Cabrio" }] },
  ]},
  { marka: "Subaru", slug: "subaru", modeller: [
    { model: "Forester", slug: "forester", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Impreza", slug: "impreza", kasaTipleri: [{ tip: "Sedan" }, { tip: "Hatchback" }] },
    { model: "Legacy", slug: "legacy", kasaTipleri: [{ tip: "Sedan" }, { tip: "Station Wagon" }] },
    { model: "Outback", slug: "outback", kasaTipleri: [{ tip: "Station Wagon" }] },
    { model: "XV", slug: "xv", kasaTipleri: [{ tip: "SUV" }] },
  ]},
  { marka: "Suzuki", slug: "suzuki", modeller: [
    { model: "Baleno", slug: "baleno", kasaTipleri: [{ tip: "Hatchback" }] },
    { model: "Ignis", slug: "ignis", kasaTipleri: [{ tip: "Hatchback" }] },
    { model: "S-Cross", slug: "s-cross", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Swift", slug: "swift", kasaTipleri: [{ tip: "Hatchback" }] },
    { model: "Vitara", slug: "vitara", kasaTipleri: [{ tip: "SUV" }] },
  ]},
  { marka: "Tesla", slug: "tesla", modeller: [
    { model: "Model 3", slug: "model-3", kasaTipleri: [{ tip: "Sedan" }] },
    { model: "Model S", slug: "model-s", kasaTipleri: [{ tip: "Fastback" }] },
    { model: "Model X", slug: "model-x", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Model Y", slug: "model-y", kasaTipleri: [{ tip: "SUV" }] },
  ]},
  { marka: "TOGG", slug: "togg", modeller: [
    { model: "T10F", slug: "t10f", kasaTipleri: [{ tip: "SUV" }] },
    { model: "T10X", slug: "t10x", kasaTipleri: [{ tip: "SUV" }] },
  ]},
  { marka: "Toyota", slug: "toyota", modeller: [
    { model: "Auris", slug: "auris", kasaTipleri: [{ tip: "Hatchback" }, { tip: "Station Wagon" }] },
    { model: "Avensis", slug: "avensis", kasaTipleri: [{ tip: "Sedan" }, { tip: "Station Wagon" }] },
    { model: "Aygo", slug: "aygo", kasaTipleri: [{ tip: "Hatchback" }] },
    { model: "bZ4X", slug: "bz4x", kasaTipleri: [{ tip: "SUV" }] },
    { model: "C-HR", slug: "c-hr", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Corolla", slug: "corolla", kasaTipleri: [{ tip: "Sedan" }, { tip: "Hatchback" }, { tip: "Station Wagon" }] },
    { model: "GR Yaris", slug: "gr-yaris", kasaTipleri: [{ tip: "Hatchback" }] },
    { model: "GR86", slug: "gr86", kasaTipleri: [{ tip: "Coupe" }] },
    { model: "Land Cruiser", slug: "land-cruiser", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Prius", slug: "prius", kasaTipleri: [{ tip: "Hatchback" }] },
    { model: "Supra", slug: "supra", kasaTipleri: [{ tip: "Coupe" }] },
    { model: "Yaris", slug: "yaris", kasaTipleri: [{ tip: "Hatchback" }, { tip: "Sedan" }] },
  ]},
  { marka: "Volkswagen", slug: "volkswagen", modeller: [
    { model: "Arteon", slug: "arteon", kasaTipleri: [{ tip: "Fastback" }, { tip: "Shooting Brake" }] },
    { model: "Golf", slug: "golf", kasaTipleri: [{ tip: "Hatchback" }, { tip: "Station Wagon" }, { tip: "Cabrio" }] },
    { model: "ID.3", slug: "id-3", kasaTipleri: [{ tip: "Hatchback" }] },
    { model: "ID.4", slug: "id-4", kasaTipleri: [{ tip: "SUV" }] },
    { model: "ID.5", slug: "id-5", kasaTipleri: [{ tip: "SUV" }] },
    { model: "ID.7", slug: "id-7", kasaTipleri: [{ tip: "Sedan" }, { tip: "Tourer" }] },
    { model: "Jetta", slug: "jetta", kasaTipleri: [{ tip: "Sedan" }] },
    { model: "Passat", slug: "passat", kasaTipleri: [{ tip: "Sedan" }, { tip: "Station Wagon" }] },
    { model: "Polo", slug: "polo", kasaTipleri: [{ tip: "Hatchback" }] },
    { model: "Tiguan", slug: "tiguan", kasaTipleri: [{ tip: "SUV" }, { tip: "Allspace" }] },
    { model: "T-Roc", slug: "t-roc", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Touareg", slug: "touareg", kasaTipleri: [{ tip: "SUV" }] },
  ]},
  { marka: "Volvo", slug: "volvo", modeller: [
    { model: "C40", slug: "c40", kasaTipleri: [{ tip: "SUV" }] },
    { model: "EC40", slug: "ec40", kasaTipleri: [{ tip: "SUV" }] },
    { model: "EX30", slug: "ex30", kasaTipleri: [{ tip: "SUV" }] },
    { model: "EX90", slug: "ex90", kasaTipleri: [{ tip: "SUV" }] },
    { model: "S60", slug: "s60", kasaTipleri: [{ tip: "Sedan" }] },
    { model: "S90", slug: "s90", kasaTipleri: [{ tip: "Sedan" }] },
    { model: "V40", slug: "v40", kasaTipleri: [{ tip: "Hatchback" }] },
    { model: "V60", slug: "v60", kasaTipleri: [{ tip: "Station Wagon" }] },
    { model: "V90", slug: "v90", kasaTipleri: [{ tip: "Station Wagon" }] },
    { model: "XC40", slug: "xc40", kasaTipleri: [{ tip: "SUV" }] },
    { model: "XC60", slug: "xc60", kasaTipleri: [{ tip: "SUV" }] },
    { model: "XC90", slug: "xc90", kasaTipleri: [{ tip: "SUV" }] },
  ]},
];

// ─── ARAZİ / SUV ─────────────────────────────────────────────────────────────

const araziSuvMarkalari: SahibindenMarka[] = [
  { marka: "Audi", slug: "audi", modeller: [
    { model: "E-Tron", slug: "e-tron", kasaTipleri: [{ tip: "SUV" }, { tip: "Sportback" }] },
    { model: "Q2", slug: "q2", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Q3", slug: "q3", kasaTipleri: [
      { tip: "SUV", motorlar: ["1.5 TFSI 150 HP", "2.0 TFSI 190 HP", "2.0 TFSI 230 HP", "1.6 TDI 115 HP", "2.0 TDI 150 HP"] },
    ]},
    { model: "Q3 Sportback", slug: "q3-sportback", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Q4 E-Tron", slug: "q4-e-tron", kasaTipleri: [{ tip: "SUV" }, { tip: "Sportback" }] },
    { model: "Q5", slug: "q5", kasaTipleri: [{ tip: "SUV" }, { tip: "Sportback" }] },
    { model: "Q7", slug: "q7", kasaTipleri: [
      { tip: "SUV", motorlar: ["3.0 TFSI 340 HP", "3.0 TDI 231 HP", "3.0 TDI 272 HP", "60 TFSI e (PHEV) 456 HP"] },
    ]},
    { model: "Q8", slug: "q8", kasaTipleri: [{ tip: "SUV" }, { tip: "E-Tron" }, { tip: "RS" }] },
  ]},
  { marka: "BMW", slug: "bmw", modeller: [
    { model: "X1", slug: "x1", kasaTipleri: [{ tip: "SUV" }] },
    { model: "X2", slug: "x2", kasaTipleri: [{ tip: "SUV" }] },
    { model: "X3", slug: "x3", kasaTipleri: [{ tip: "SUV" }] },
    { model: "X4", slug: "x4", kasaTipleri: [{ tip: "SUV" }] },
    { model: "X5", slug: "x5", kasaTipleri: [{ tip: "SUV" }] },
    { model: "X6", slug: "x6", kasaTipleri: [{ tip: "SUV" }] },
    { model: "X7", slug: "x7", kasaTipleri: [{ tip: "SUV" }] },
    { model: "iX", slug: "ix", kasaTipleri: [{ tip: "SUV" }] },
    { model: "iX1", slug: "ix1", kasaTipleri: [{ tip: "SUV" }] },
    { model: "iX3", slug: "ix3", kasaTipleri: [{ tip: "SUV" }] },
  ]},
  { marka: "Chevrolet", slug: "chevrolet", modeller: [
    { model: "Captiva", slug: "captiva", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Tahoe", slug: "tahoe", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Trailblazer", slug: "trailblazer", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Trax", slug: "trax", kasaTipleri: [{ tip: "SUV" }] },
  ]},
  { marka: "Dacia", slug: "dacia", modeller: [
    { model: "Duster", slug: "duster", kasaTipleri: [{ tip: "SUV" }] },
  ]},
  { marka: "Ford", slug: "ford", modeller: [
    { model: "Bronco", slug: "bronco", kasaTipleri: [{ tip: "SUV" }] },
    { model: "EcoSport", slug: "ecosport", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Edge", slug: "edge", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Escape", slug: "escape", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Explorer", slug: "explorer", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Kuga", slug: "kuga", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Mustang Mach-E", slug: "mustang-mach-e", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Puma", slug: "puma", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Ranger", slug: "ranger", kasaTipleri: [{ tip: "Pickup" }] },
    { model: "Territory", slug: "territory", kasaTipleri: [{ tip: "SUV" }] },
  ]},
  { marka: "Honda", slug: "honda", modeller: [
    { model: "CR-V", slug: "cr-v", kasaTipleri: [{ tip: "SUV" }] },
    { model: "HR-V", slug: "hr-v", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Pilot", slug: "pilot", kasaTipleri: [{ tip: "SUV" }] },
    { model: "ZR-V", slug: "zr-v", kasaTipleri: [{ tip: "SUV" }] },
  ]},
  { marka: "Hyundai", slug: "hyundai", modeller: [
    { model: "Bayon", slug: "bayon", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Ioniq 5", slug: "ioniq-5", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Kona", slug: "kona", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Palisade", slug: "palisade", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Santa Fe", slug: "santa-fe", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Tucson", slug: "tucson", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Venue", slug: "venue", kasaTipleri: [{ tip: "SUV" }] },
  ]},
  { marka: "Jeep", slug: "jeep", modeller: [
    { model: "Cherokee", slug: "cherokee", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Compass", slug: "compass", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Grand Cherokee", slug: "grand-cherokee", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Renegade", slug: "renegade", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Wrangler", slug: "wrangler", kasaTipleri: [{ tip: "SUV" }] },
  ]},
  { marka: "Kia", slug: "kia", modeller: [
    { model: "EV6", slug: "ev6", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Niro", slug: "niro", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Sorento", slug: "sorento", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Sportage", slug: "sportage", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Stonic", slug: "stonic", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Telluride", slug: "telluride", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Tucson", slug: "tucson", kasaTipleri: [{ tip: "SUV" }] },
  ]},
  { marka: "Land Rover", slug: "land-rover", modeller: [
    { model: "Defender", slug: "defender", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Discovery", slug: "discovery", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Discovery Sport", slug: "discovery-sport", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Freelander", slug: "freelander", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Range Rover", slug: "range-rover", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Range Rover Evoque", slug: "range-rover-evoque", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Range Rover Sport", slug: "range-rover-sport", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Range Rover Velar", slug: "range-rover-velar", kasaTipleri: [{ tip: "SUV" }] },
  ]},
  { marka: "Mazda", slug: "mazda", modeller: [
    { model: "CX-3", slug: "cx-3", kasaTipleri: [{ tip: "SUV" }] },
    { model: "CX-30", slug: "cx-30", kasaTipleri: [{ tip: "SUV" }] },
    { model: "CX-5", slug: "cx-5", kasaTipleri: [{ tip: "SUV" }] },
    { model: "CX-60", slug: "cx-60", kasaTipleri: [{ tip: "SUV" }] },
    { model: "CX-9", slug: "cx-9", kasaTipleri: [{ tip: "SUV" }] },
    { model: "MX-30", slug: "mx-30", kasaTipleri: [{ tip: "SUV" }] },
  ]},
  { marka: "Mercedes-Benz", slug: "mercedes-benz", modeller: [
    { model: "EQA", slug: "eqa", kasaTipleri: [{ tip: "SUV" }] },
    { model: "EQB", slug: "eqb", kasaTipleri: [{ tip: "SUV" }] },
    { model: "EQC", slug: "eqc", kasaTipleri: [{ tip: "SUV" }] },
    { model: "G Serisi", slug: "g-serisi", kasaTipleri: [{ tip: "SUV" }] },
    { model: "GLA", slug: "gla", kasaTipleri: [{ tip: "SUV" }] },
    { model: "GLB", slug: "glb", kasaTipleri: [{ tip: "SUV" }] },
    { model: "GLC", slug: "glc", kasaTipleri: [{ tip: "SUV" }, { tip: "Coupe" }] },
    { model: "GLE", slug: "gle", kasaTipleri: [{ tip: "SUV" }, { tip: "Coupe" }] },
    { model: "GLS", slug: "gls", kasaTipleri: [{ tip: "SUV" }] },
    { model: "ML", slug: "ml", kasaTipleri: [{ tip: "SUV" }] },
  ]},
  { marka: "Mitsubishi", slug: "mitsubishi", modeller: [
    { model: "Eclipse Cross", slug: "eclipse-cross", kasaTipleri: [{ tip: "SUV" }] },
    { model: "L200", slug: "l200", kasaTipleri: [{ tip: "Pickup" }] },
    { model: "Outlander", slug: "outlander", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Pajero", slug: "pajero", kasaTipleri: [{ tip: "SUV" }] },
  ]},
  { marka: "Nissan", slug: "nissan", modeller: [
    { model: "Juke", slug: "juke", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Pathfinder", slug: "pathfinder", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Qashqai", slug: "qashqai", kasaTipleri: [{ tip: "SUV" }] },
    { model: "X-Trail", slug: "x-trail", kasaTipleri: [{ tip: "SUV" }] },
  ]},
  { marka: "Opel", slug: "opel", modeller: [
    { model: "Crossland", slug: "crossland", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Grandland", slug: "grandland", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Mokka", slug: "mokka", kasaTipleri: [{ tip: "SUV" }] },
  ]},
  { marka: "Peugeot", slug: "peugeot", modeller: [
    { model: "2008", slug: "2008", kasaTipleri: [{ tip: "SUV" }] },
    { model: "3008", slug: "3008", kasaTipleri: [{ tip: "SUV" }] },
    { model: "4008", slug: "4008", kasaTipleri: [{ tip: "SUV" }] },
    { model: "5008", slug: "5008", kasaTipleri: [{ tip: "SUV" }] },
    { model: "e-2008", slug: "e-2008", kasaTipleri: [{ tip: "SUV" }] },
  ]},
  { marka: "Porsche", slug: "porsche", modeller: [
    { model: "Cayenne", slug: "cayenne", kasaTipleri: [{ tip: "SUV" }, { tip: "Coupe" }] },
    { model: "Macan", slug: "macan", kasaTipleri: [{ tip: "SUV" }] },
  ]},
  { marka: "Renault", slug: "renault", modeller: [
    { model: "Arkana", slug: "arkana", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Austral", slug: "austral", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Captur", slug: "captur", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Duster", slug: "duster", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Kadjar", slug: "kadjar", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Koleos", slug: "koleos", kasaTipleri: [{ tip: "SUV" }] },
  ]},
  { marka: "Skoda", slug: "skoda", modeller: [
    { model: "Enyaq", slug: "enyaq", kasaTipleri: [{ tip: "SUV" }, { tip: "Coupe" }] },
    { model: "Karoq", slug: "karoq", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Kodiaq", slug: "kodiaq", kasaTipleri: [{ tip: "SUV" }] },
  ]},
  { marka: "Subaru", slug: "subaru", modeller: [
    { model: "Forester", slug: "forester", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Outback", slug: "outback", kasaTipleri: [{ tip: "SUV" }] },
    { model: "XV", slug: "xv", kasaTipleri: [{ tip: "SUV" }] },
  ]},
  { marka: "Suzuki", slug: "suzuki", modeller: [
    { model: "Jimny", slug: "jimny", kasaTipleri: [{ tip: "SUV" }] },
    { model: "S-Cross", slug: "s-cross", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Vitara", slug: "vitara", kasaTipleri: [{ tip: "SUV" }] },
  ]},
  { marka: "Tesla", slug: "tesla", modeller: [
    { model: "Model X", slug: "model-x", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Model Y", slug: "model-y", kasaTipleri: [{ tip: "SUV" }] },
  ]},
  { marka: "TOGG", slug: "togg", modeller: [
    { model: "T10F", slug: "t10f", kasaTipleri: [{ tip: "SUV" }] },
    { model: "T10X", slug: "t10x", kasaTipleri: [{ tip: "SUV" }] },
  ]},
  { marka: "Toyota", slug: "toyota", modeller: [
    { model: "bZ4X", slug: "bz4x", kasaTipleri: [{ tip: "SUV" }] },
    { model: "C-HR", slug: "c-hr", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Corolla Cross", slug: "corolla-cross", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Hilux", slug: "hilux", kasaTipleri: [{ tip: "Pickup" }] },
    { model: "Land Cruiser", slug: "land-cruiser", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Land Cruiser Prado", slug: "land-cruiser-prado", kasaTipleri: [{ tip: "SUV" }] },
    { model: "RAV4", slug: "rav4", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Yaris Cross", slug: "yaris-cross", kasaTipleri: [{ tip: "SUV" }] },
  ]},
  { marka: "Volkswagen", slug: "volkswagen", modeller: [
    { model: "ID.4", slug: "id-4", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Taigo", slug: "taigo", kasaTipleri: [{ tip: "SUV" }] },
    { model: "Tiguan", slug: "tiguan", kasaTipleri: [{ tip: "SUV" }, { tip: "Allspace" }] },
    { model: "Touareg", slug: "touareg", kasaTipleri: [{ tip: "SUV" }] },
    { model: "T-Cross", slug: "t-cross", kasaTipleri: [{ tip: "SUV" }] },
    { model: "T-Roc", slug: "t-roc", kasaTipleri: [{ tip: "SUV" }] },
  ]},
  { marka: "Volvo", slug: "volvo", modeller: [
    { model: "EX30", slug: "ex30", kasaTipleri: [{ tip: "SUV" }] },
    { model: "EX90", slug: "ex90", kasaTipleri: [{ tip: "SUV" }] },
    { model: "XC40", slug: "xc40", kasaTipleri: [{ tip: "SUV" }] },
    { model: "XC60", slug: "xc60", kasaTipleri: [{ tip: "SUV" }] },
    { model: "XC90", slug: "xc90", kasaTipleri: [{ tip: "SUV" }] },
  ]},
];

// ─── MOTOSİKLET ──────────────────────────────────────────────────────────────

const motosikletMarkalari: SahibindenMarka[] = [
  { marka: "Aprilia", slug: "aprilia", modeller: [
    { model: "RS 660", slug: "rs-660", kasaTipleri: [{ tip: "Supersport" }] },
    { model: "Tuono 660", slug: "tuono-660", kasaTipleri: [{ tip: "Naked" }] },
    { model: "RSV4", slug: "rsv4", kasaTipleri: [{ tip: "Supersport" }] },
  ]},
  { marka: "Benelli", slug: "benelli", modeller: [
    { model: "Leoncino 500", slug: "leoncino-500", kasaTipleri: [{ tip: "Naked" }] },
    { model: "TRK 502", slug: "trk-502", kasaTipleri: [{ tip: "Adventure" }] },
    { model: "TNT 300", slug: "tnt-300", kasaTipleri: [{ tip: "Naked" }] },
  ]},
  { marka: "BMW", slug: "bmw", modeller: [
    { model: "C 400 GT", slug: "c-400-gt", kasaTipleri: [{ tip: "Scooter" }] },
    { model: "C 400 X", slug: "c-400-x", kasaTipleri: [{ tip: "Scooter" }] },
    { model: "C 600 Sport", slug: "c-600-sport", kasaTipleri: [{ tip: "Scooter" }] },
    { model: "C 650 GT", slug: "c-650-gt", kasaTipleri: [{ tip: "Scooter" }] },
    { model: "C 650 Sport", slug: "c-650-sport", kasaTipleri: [{ tip: "Scooter" }] },
    { model: "F 650", slug: "f-650", kasaTipleri: [{ tip: "Adventure" }] },
    { model: "F 650 CS", slug: "f-650-cs", kasaTipleri: [{ tip: "Adventure" }] },
    { model: "F 650 GS", slug: "f-650-gs", kasaTipleri: [{ tip: "Adventure" }] },
    { model: "F 700 GS", slug: "f-700-gs", kasaTipleri: [{ tip: "Adventure" }] },
    { model: "F 900 GS", slug: "f-900-gs", kasaTipleri: [{ tip: "Adventure" }] },
    { model: "R 1200 RT", slug: "r-1200-rt", kasaTipleri: [{ tip: "Touring" }] },
    { model: "K 1600 Grand America", slug: "k-1600-grand-america", kasaTipleri: [{ tip: "Touring" }] },
  ]},
  { marka: "Ducati", slug: "ducati", modeller: [
    { model: "Monster", slug: "monster", kasaTipleri: [{ tip: "Naked" }] },
    { model: "Multistrada", slug: "multistrada", kasaTipleri: [{ tip: "Adventure" }] },
    { model: "Panigale", slug: "panigale", kasaTipleri: [{ tip: "Supersport" }] },
    { model: "Scrambler", slug: "scrambler", kasaTipleri: [{ tip: "Scrambler" }] },
  ]},
  { marka: "Harley-Davidson", slug: "harley-davidson", modeller: [
    { model: "Fat Boy", slug: "fat-boy", kasaTipleri: [{ tip: "Cruiser" }] },
    { model: "Softail", slug: "softail", kasaTipleri: [{ tip: "Cruiser" }] },
    { model: "Sportster", slug: "sportster", kasaTipleri: [{ tip: "Cruiser" }] },
    { model: "Street Glide", slug: "street-glide", kasaTipleri: [{ tip: "Touring" }] },
  ]},
  { marka: "Honda", slug: "honda", modeller: [
    { model: "CB 500 F", slug: "cb-500-f", kasaTipleri: [{ tip: "Naked" }] },
    { model: "CB 500 X", slug: "cb-500-x", kasaTipleri: [{ tip: "Adventure" }] },
    { model: "CBR 600 RR", slug: "cbr-600-rr", kasaTipleri: [{ tip: "Supersport" }] },
    { model: "CBR 1000 RR", slug: "cbr-1000-rr", kasaTipleri: [{ tip: "Supersport" }] },
    { model: "CRF 1100 Africa Twin", slug: "crf-1100-africa-twin", kasaTipleri: [{ tip: "Adventure" }] },
    { model: "Forza 350", slug: "forza-350", kasaTipleri: [{ tip: "Scooter" }] },
    { model: "PCX 125", slug: "pcx-125", kasaTipleri: [{ tip: "Scooter" }] },
    { model: "X-ADV", slug: "x-adv", kasaTipleri: [{ tip: "Adventure Scooter" }] },
  ]},
  { marka: "Kawasaki", slug: "kawasaki", modeller: [
    { model: "Ninja 400", slug: "ninja-400", kasaTipleri: [{ tip: "Supersport" }] },
    { model: "Ninja 650", slug: "ninja-650", kasaTipleri: [{ tip: "Supersport" }] },
    { model: "Ninja 1000 SX", slug: "ninja-1000-sx", kasaTipleri: [{ tip: "Sport Touring" }] },
    { model: "Versys 650", slug: "versys-650", kasaTipleri: [{ tip: "Adventure" }] },
    { model: "Versys 1000", slug: "versys-1000", kasaTipleri: [{ tip: "Adventure" }] },
    { model: "Z 650", slug: "z-650", kasaTipleri: [{ tip: "Naked" }] },
    { model: "Z 900", slug: "z-900", kasaTipleri: [{ tip: "Naked" }] },
  ]},
  { marka: "Kymco", slug: "kymco", modeller: [
    { model: "AK 550", slug: "ak-550", kasaTipleri: [{ tip: "Scooter" }] },
    { model: "Downtown 350", slug: "downtown-350", kasaTipleri: [{ tip: "Scooter" }] },
    { model: "People S 300", slug: "people-s-300", kasaTipleri: [{ tip: "Scooter" }] },
  ]},
  { marka: "Moto Guzzi", slug: "moto-guzzi", modeller: [
    { model: "V7", slug: "v7", kasaTipleri: [{ tip: "Retro" }] },
    { model: "V85 TT", slug: "v85-tt", kasaTipleri: [{ tip: "Adventure" }] },
  ]},
  { marka: "Piaggio", slug: "piaggio", modeller: [
    { model: "Beverly 350", slug: "beverly-350", kasaTipleri: [{ tip: "Scooter" }] },
    { model: "MP3 530", slug: "mp3-530", kasaTipleri: [{ tip: "3-Tekerlekli Scooter" }] },
  ]},
  { marka: "Royal Enfield", slug: "royal-enfield", modeller: [
    { model: "Classic 350", slug: "classic-350", kasaTipleri: [{ tip: "Retro" }] },
    { model: "Himalayan", slug: "himalayan", kasaTipleri: [{ tip: "Adventure" }] },
    { model: "Meteor 350", slug: "meteor-350", kasaTipleri: [{ tip: "Cruiser" }] },
  ]},
  { marka: "Suzuki", slug: "suzuki", modeller: [
    { model: "Burgman 400", slug: "burgman-400", kasaTipleri: [{ tip: "Scooter" }] },
    { model: "GSX-R 750", slug: "gsx-r-750", kasaTipleri: [{ tip: "Supersport" }] },
    { model: "GSX-S 750", slug: "gsx-s-750", kasaTipleri: [{ tip: "Naked" }] },
    { model: "V-Strom 650", slug: "v-strom-650", kasaTipleri: [{ tip: "Adventure" }] },
    { model: "V-Strom 1050", slug: "v-strom-1050", kasaTipleri: [{ tip: "Adventure" }] },
  ]},
  { marka: "SYM", slug: "sym", modeller: [
    { model: "Citycom 300", slug: "citycom-300", kasaTipleri: [{ tip: "Scooter" }] },
    { model: "Cruisym 300", slug: "cruisym-300", kasaTipleri: [{ tip: "Scooter" }] },
    { model: "Joymax Z 300", slug: "joymax-z-300", kasaTipleri: [{ tip: "Scooter" }] },
  ]},
  { marka: "Triumph", slug: "triumph", modeller: [
    { model: "Bonneville", slug: "bonneville", kasaTipleri: [{ tip: "Retro" }] },
    { model: "Street Triple", slug: "street-triple", kasaTipleri: [{ tip: "Naked" }] },
    { model: "Tiger 900", slug: "tiger-900", kasaTipleri: [{ tip: "Adventure" }] },
    { model: "Trident 660", slug: "trident-660", kasaTipleri: [{ tip: "Naked" }] },
  ]},
  { marka: "Vespa", slug: "vespa", modeller: [
    { model: "GTS 300", slug: "gts-300", kasaTipleri: [{ tip: "Scooter" }] },
    { model: "Primavera 125", slug: "primavera-125", kasaTipleri: [{ tip: "Scooter" }] },
    { model: "Sprint 125", slug: "sprint-125", kasaTipleri: [{ tip: "Scooter" }] },
  ]},
  { marka: "Yamaha", slug: "yamaha", modeller: [
    { model: "MT-03", slug: "mt-03", kasaTipleri: [{ tip: "Naked" }] },
    { model: "MT-07", slug: "mt-07", kasaTipleri: [{ tip: "Naked" }] },
    { model: "MT-09", slug: "mt-09", kasaTipleri: [{ tip: "Naked" }] },
    { model: "NMAX 155", slug: "nmax-155", kasaTipleri: [{ tip: "Scooter" }] },
    { model: "Tenere 700", slug: "tenere-700", kasaTipleri: [{ tip: "Adventure" }] },
    { model: "Tracer 9", slug: "tracer-9", kasaTipleri: [{ tip: "Sport Touring" }] },
    { model: "TMAX 560", slug: "tmax-560", kasaTipleri: [{ tip: "Scooter" }] },
    { model: "XSR 700", slug: "xsr-700", kasaTipleri: [{ tip: "Retro" }] },
    { model: "YZF-R3", slug: "yzf-r3", kasaTipleri: [{ tip: "Supersport" }] },
    { model: "YZF-R6", slug: "yzf-r6", kasaTipleri: [{ tip: "Supersport" }] },
    { model: "YZF-R1", slug: "yzf-r1", kasaTipleri: [{ tip: "Supersport" }] },
  ]},
  { marka: "Zero Motorcycles", slug: "zero-motorcycles", modeller: [
    { model: "SR/F", slug: "sr-f", kasaTipleri: [{ tip: "Naked" }] },
    { model: "DSR", slug: "dsr", kasaTipleri: [{ tip: "Adventure" }] },
  ]},
  { marka: "Zontes", slug: "zontes", modeller: [
    { model: "310 T", slug: "310-t", kasaTipleri: [{ tip: "Adventure" }] },
    { model: "ZT350-A", slug: "zt350-a", kasaTipleri: [{ tip: "Naked" }] },
  ]},
];

// ─── MİNİVAN / PANELVAN ──────────────────────────────────────────────────────

const minivanPanelvanMarkalari: SahibindenMarka[] = [
  { marka: "Chevrolet", slug: "chevrolet", modeller: [
    { model: "Express", slug: "express", kasaTipleri: [
      { tip: "Van", motorlar: ["5.3L V8", "6.6L Dizel"] },
    ]},
    { model: "Trans Sport", slug: "trans-sport", kasaTipleri: [
      { tip: "Minivan", motorlar: ["3.4 V6"] },
    ]},
    { model: "G Serisi", slug: "g-serisi", kasaTipleri: [
      { tip: "Van", motorlar: ["G30"] },
    ]},
    { model: "Uplander", slug: "uplander", kasaTipleri: [{ tip: "Minivan" }] },
  ]},
  { marka: "Citroen", slug: "citroen", modeller: [
    { model: "Berlingo", slug: "berlingo", kasaTipleri: [{ tip: "MPV" }, { tip: "Van" }] },
    { model: "Jumpy", slug: "jumpy", kasaTipleri: [{ tip: "Van" }] },
    { model: "SpaceTourer", slug: "spacetourer", kasaTipleri: [{ tip: "MPV" }] },
  ]},
  { marka: "Dacia", slug: "dacia", modeller: [
    { model: "Dokker", slug: "dokker", kasaTipleri: [{ tip: "MPV" }] },
    { model: "Lodgy", slug: "lodgy", kasaTipleri: [{ tip: "MPV" }] },
  ]},
  { marka: "Fiat", slug: "fiat", modeller: [
    { model: "Doblo", slug: "doblo", kasaTipleri: [{ tip: "MPV" }, { tip: "Van" }] },
    { model: "Scudo", slug: "scudo", kasaTipleri: [{ tip: "Van" }] },
    { model: "Talento", slug: "talento", kasaTipleri: [{ tip: "Van" }] },
    { model: "Ulysse", slug: "ulysse", kasaTipleri: [{ tip: "MPV" }] },
  ]},
  { marka: "Ford", slug: "ford", modeller: [
    { model: "Connect", slug: "connect", kasaTipleri: [{ tip: "Van" }, { tip: "MPV" }] },
    { model: "Custom", slug: "custom", kasaTipleri: [{ tip: "Van" }] },
    { model: "Galaxy", slug: "galaxy", kasaTipleri: [{ tip: "MPV" }] },
    { model: "S-Max", slug: "s-max", kasaTipleri: [{ tip: "MPV" }] },
    { model: "Tourneo Connect", slug: "tourneo-connect", kasaTipleri: [{ tip: "MPV" }] },
    { model: "Tourneo Custom", slug: "tourneo-custom", kasaTipleri: [{ tip: "MPV" }] },
    { model: "Transit", slug: "transit", kasaTipleri: [{ tip: "Van" }] },
    { model: "Transit Custom", slug: "transit-custom", kasaTipleri: [{ tip: "Van" }] },
  ]},
  { marka: "Honda", slug: "honda", modeller: [
    { model: "Odyssey", slug: "odyssey", kasaTipleri: [{ tip: "MPV" }] },
    { model: "Stream", slug: "stream", kasaTipleri: [{ tip: "MPV" }] },
  ]},
  { marka: "Hyundai", slug: "hyundai", modeller: [
    { model: "H-1", slug: "h-1", kasaTipleri: [{ tip: "Van" }, { tip: "MPV" }] },
    { model: "Staria", slug: "staria", kasaTipleri: [{ tip: "MPV" }] },
    { model: "Trajet", slug: "trajet", kasaTipleri: [{ tip: "MPV" }] },
  ]},
  { marka: "Kia", slug: "kia", modeller: [
    { model: "Carnival", slug: "carnival", kasaTipleri: [{ tip: "MPV" }] },
    { model: "Sedona", slug: "sedona", kasaTipleri: [{ tip: "MPV" }] },
  ]},
  { marka: "Mercedes-Benz", slug: "mercedes-benz", modeller: [
    { model: "Citan", slug: "citan", kasaTipleri: [{ tip: "Van" }] },
    { model: "EQV", slug: "eqv", kasaTipleri: [{ tip: "MPV" }] },
    { model: "Sprinter", slug: "sprinter", kasaTipleri: [{ tip: "Van" }] },
    { model: "V Serisi", slug: "v-serisi", kasaTipleri: [{ tip: "MPV" }] },
    { model: "Vito", slug: "vito", kasaTipleri: [{ tip: "Van" }, { tip: "MPV" }] },
  ]},
  { marka: "Mitsubishi", slug: "mitsubishi", modeller: [
    { model: "L300", slug: "l300", kasaTipleri: [{ tip: "Van" }] },
    { model: "Space Star", slug: "space-star", kasaTipleri: [{ tip: "MPV" }] },
  ]},
  { marka: "Nissan", slug: "nissan", modeller: [
    { model: "e-NV200", slug: "e-nv200", kasaTipleri: [{ tip: "Van" }] },
    { model: "NV200", slug: "nv200", kasaTipleri: [{ tip: "Van" }] },
    { model: "Primastar", slug: "primastar", kasaTipleri: [{ tip: "Van" }] },
    { model: "Serena", slug: "serena", kasaTipleri: [{ tip: "MPV" }] },
  ]},
  { marka: "Opel", slug: "opel", modeller: [
    { model: "Combo", slug: "combo", kasaTipleri: [{ tip: "Van" }, { tip: "MPV" }] },
    { model: "Movano", slug: "movano", kasaTipleri: [{ tip: "Van" }] },
    { model: "Vivaro", slug: "vivaro", kasaTipleri: [{ tip: "Van" }, { tip: "MPV" }] },
    { model: "Zafira", slug: "zafira", kasaTipleri: [{ tip: "MPV" }] },
  ]},
  { marka: "Peugeot", slug: "peugeot", modeller: [
    { model: "Expert", slug: "expert", kasaTipleri: [{ tip: "Van" }] },
    { model: "Partner", slug: "partner", kasaTipleri: [{ tip: "Van" }, { tip: "MPV" }] },
    { model: "Rifter", slug: "rifter", kasaTipleri: [{ tip: "MPV" }] },
    { model: "Traveller", slug: "traveller", kasaTipleri: [{ tip: "MPV" }] },
  ]},
  { marka: "Renault", slug: "renault", modeller: [
    { model: "Espace", slug: "espace", kasaTipleri: [{ tip: "MPV" }] },
    { model: "Grand Scenic", slug: "grand-scenic", kasaTipleri: [{ tip: "MPV" }] },
    { model: "Kangoo", slug: "kangoo", kasaTipleri: [{ tip: "Van" }, { tip: "MPV" }] },
    { model: "Trafic", slug: "trafic", kasaTipleri: [{ tip: "Van" }] },
  ]},
  { marka: "Seat", slug: "seat", modeller: [
    { model: "Alhambra", slug: "alhambra", kasaTipleri: [{ tip: "MPV" }] },
  ]},
  { marka: "Toyota", slug: "toyota", modeller: [
    { model: "HiAce", slug: "hiace", kasaTipleri: [{ tip: "Van" }, { tip: "MPV" }] },
    { model: "Proace", slug: "proace", kasaTipleri: [{ tip: "Van" }] },
    { model: "Proace City", slug: "proace-city", kasaTipleri: [{ tip: "Van" }, { tip: "MPV" }] },
  ]},
  { marka: "Volkswagen", slug: "volkswagen", modeller: [
    { model: "Caddy", slug: "caddy", kasaTipleri: [{ tip: "Van" }, { tip: "MPV" }] },
    { model: "Caravelle", slug: "caravelle", kasaTipleri: [{ tip: "MPV" }] },
    { model: "ID. Buzz", slug: "id-buzz", kasaTipleri: [{ tip: "MPV" }] },
    { model: "Multivan", slug: "multivan", kasaTipleri: [{ tip: "MPV" }] },
    { model: "Transporter", slug: "transporter", kasaTipleri: [{ tip: "Van" }] },
  ]},
  { marka: "Volvo", slug: "volvo", modeller: [
    { model: "V70", slug: "v70", kasaTipleri: [{ tip: "Station Wagon" }] },
    { model: "XC70", slug: "xc70", kasaTipleri: [{ tip: "SUV" }] },
  ]},
];

// ─── TİCARİ ARAÇLAR ──────────────────────────────────────────────────────────

export interface TicariAltKategori {
  ad: string;
  slug: string;
  ilanSayisi: number;
  markalar: SahibindenMarka[];
}

const ticariAltKategoriler: TicariAltKategori[] = [
  {
    ad: "Kamyon",
    slug: "kamyon",
    ilanSayisi: 22804,
    markalar: [
      { marka: "Akeso", slug: "akeso", modeller: [
        { model: "Elektrikli Kamyon", slug: "elektrikli-kamyon", kasaTipleri: [{ tip: "Kamyon" }] },
      ]},
      { marka: "Alke", slug: "alke", modeller: [
        { model: "ATX", slug: "atx", kasaTipleri: [{ tip: "Elektrikli Araç" }] },
      ]},
      { marka: "Anadol", slug: "anadol", modeller: [
        { model: "Pickup", slug: "pickup", kasaTipleri: [{ tip: "Pickup" }] },
      ]},
      { marka: "Askam", slug: "askam", modeller: [
        { model: "AS 26", slug: "as-26", kasaTipleri: [{ tip: "Kamyon" }] },
        { model: "AS 32", slug: "as-32", kasaTipleri: [{ tip: "Kamyon" }] },
        { model: "AS 250", slug: "as-250", kasaTipleri: [{ tip: "Kamyon" }] },
        { model: "AS 950", slug: "as-950", kasaTipleri: [{ tip: "Kamyon" }] },
      ]},
      { marka: "Astra", slug: "astra", modeller: [
        { model: "HD 7", slug: "hd-7", kasaTipleri: [{ tip: "Kamyon" }] },
        { model: "HD 8", slug: "hd-8", kasaTipleri: [{ tip: "Kamyon" }] },
      ]},
      { marka: "Bedford", slug: "bedford", modeller: [
        { model: "TK", slug: "tk", kasaTipleri: [{ tip: "Kamyon" }] },
      ]},
      { marka: "Beemobs", slug: "beemobs", modeller: [
        { model: "Elektrikli", slug: "elektrikli", kasaTipleri: [{ tip: "Kamyon" }] },
      ]},
      { marka: "BMC", slug: "bmc", modeller: [
        { model: "Fatih", slug: "fatih", kasaTipleri: [{ tip: "Kamyon" }] },
        { model: "Pro", slug: "pro", kasaTipleri: [{ tip: "Kamyon" }] },
        { model: "Profesyonel", slug: "profesyonel", kasaTipleri: [{ tip: "Kamyon" }] },
      ]},
      { marka: "Ford Trucks", slug: "ford-trucks", modeller: [
        { model: "F-MAX", slug: "f-max", kasaTipleri: [{ tip: "Çekici" }] },
        { model: "1846 T", slug: "1846-t", kasaTipleri: [{ tip: "Kamyon" }] },
        { model: "Cargo", slug: "cargo", kasaTipleri: [{ tip: "Kamyon" }] },
      ]},
      { marka: "Iveco", slug: "iveco", modeller: [
        { model: "Daily", slug: "daily", kasaTipleri: [{ tip: "Kamyon" }] },
        { model: "Eurocargo", slug: "eurocargo", kasaTipleri: [{ tip: "Kamyon" }] },
        { model: "Stralis", slug: "stralis", kasaTipleri: [{ tip: "Çekici" }] },
      ]},
      { marka: "Kia", slug: "kia", modeller: [
        { model: "Besta", slug: "besta", kasaTipleri: [{ tip: "Kamyon" }] },
      ]},
      { marka: "Renault Trucks", slug: "renault-trucks", modeller: [
        { model: "T", slug: "t", kasaTipleri: [{ tip: "Çekici" }] },
        { model: "C", slug: "c", kasaTipleri: [{ tip: "Kamyon" }] },
        { model: "K", slug: "k", kasaTipleri: [{ tip: "Kamyon" }] },
      ]},
    ],
  },
  {
    ad: "Minibüs",
    slug: "minibus",
    ilanSayisi: 11271,
    markalar: [
      { marka: "Ford", slug: "ford", modeller: [
        { model: "Transit", slug: "transit", kasaTipleri: [{ tip: "Minibüs" }] },
      ]},
      { marka: "Mercedes-Benz", slug: "mercedes-benz", modeller: [
        { model: "Sprinter", slug: "sprinter", kasaTipleri: [{ tip: "Minibüs" }] },
        { model: "Vito", slug: "vito", kasaTipleri: [{ tip: "Minibüs" }] },
      ]},
      { marka: "Volkswagen", slug: "volkswagen", modeller: [
        { model: "Transporter", slug: "transporter", kasaTipleri: [{ tip: "Minibüs" }] },
      ]},
      { marka: "Hyundai", slug: "hyundai", modeller: [
        { model: "H-1", slug: "h-1", kasaTipleri: [{ tip: "Minibüs" }] },
      ]},
    ],
  },
  {
    ad: "Otobüs",
    slug: "otobus",
    ilanSayisi: 1304,
    markalar: [
      { marka: "Mercedes-Benz", slug: "mercedes-benz", modeller: [
        { model: "Travego", slug: "travego", kasaTipleri: [{ tip: "Otobüs" }] },
        { model: "Tourismo", slug: "tourismo", kasaTipleri: [{ tip: "Otobüs" }] },
      ]},
      { marka: "Temsa", slug: "temsa", modeller: [
        { model: "TS 35", slug: "ts-35", kasaTipleri: [{ tip: "Otobüs" }] },
        { model: "HD 12", slug: "hd-12", kasaTipleri: [{ tip: "Otobüs" }] },
      ]},
      { marka: "MAN", slug: "man", modeller: [
        { model: "Lion's Coach", slug: "lions-coach", kasaTipleri: [{ tip: "Otobüs" }] },
      ]},
    ],
  },
  {
    ad: "Çekici",
    slug: "cekici",
    ilanSayisi: 7226,
    markalar: [
      { marka: "Mercedes-Benz", slug: "mercedes-benz", modeller: [
        { model: "Actros", slug: "actros", kasaTipleri: [{ tip: "Çekici" }] },
        { model: "Axor", slug: "axor", kasaTipleri: [{ tip: "Çekici" }] },
      ]},
      { marka: "Volvo Trucks", slug: "volvo-trucks", modeller: [
        { model: "FH", slug: "fh", kasaTipleri: [{ tip: "Çekici" }] },
        { model: "FM", slug: "fm", kasaTipleri: [{ tip: "Çekici" }] },
      ]},
      { marka: "Scania", slug: "scania", modeller: [
        { model: "R Serisi", slug: "r-serisi", kasaTipleri: [{ tip: "Çekici" }] },
        { model: "S Serisi", slug: "s-serisi", kasaTipleri: [{ tip: "Çekici" }] },
      ]},
    ],
  },
  {
    ad: "Dorse",
    slug: "dorse",
    ilanSayisi: 4582,
    markalar: [
      { marka: "Tirsan", slug: "tirsan", modeller: [
        { model: "Tenteli", slug: "tenteli", kasaTipleri: [{ tip: "Dorse" }] },
        { model: "Frigorifik", slug: "frigorifik", kasaTipleri: [{ tip: "Dorse" }] },
      ]},
      { marka: "Krone", slug: "krone", modeller: [
        { model: "Mega Liner", slug: "mega-liner", kasaTipleri: [{ tip: "Dorse" }] },
      ]},
    ],
  },
  {
    ad: "Römork",
    slug: "romork",
    ilanSayisi: 427,
    markalar: [
      { marka: "Knott", slug: "knott", modeller: [
        { model: "Kapalı Kasa", slug: "kapali-kasa", kasaTipleri: [{ tip: "Römork" }] },
      ]},
    ],
  },
];

// ─── vehiclesData export ──────────────────────────────────────────────────────

export const vehiclesData = {
  otomobil: { url: "/otomobil", markalar: otomobilMarkalari },
  araziSuv: { url: "/arazi-suv-pickup", markalar: araziSuvMarkalari },
  motosiklet: { url: "/motosiklet", markalar: motosikletMarkalari },
  minivanPanelvan: { url: "/minivan-panelvan", markalar: minivanPanelvanMarkalari },
  ticariAraclar: { url: "/ticari-araclar", altKategoriler: ticariAltKategoriler },
};

// ─── Backward-compatible KATEGORILER ─────────────────────────────────────────

function buildKasalar(model: SahibindenModel): Kasa[] {
  return model.kasaTipleri.map((k) => ({
    kod: k.tip,
    yillar: [1990, 2025] as [number, number],
    motorlar: k.motorlar,
  }));
}

function buildMarkalar(markalar: SahibindenMarka[]): Marka[] {
  return markalar.map((m) => ({
    ad: m.marka,
    modeller: m.modeller.map((mo) => ({
      ad: mo.model,
      kasalar: buildKasalar(mo),
    })),
  }));
}

export type ModelKasa = {
  kod: string;         // URL slug & gösterim — kod yoksa tip kullanılır
  tip: string;         // DB'deki kasaTip karşılığı (Sedan/SUV/...)
  yillar?: [number, number];
  motorlar?: string[];
};

export function getModelKasalari(marka: string, model: string): ModelKasa[] {
  for (const k of Object.values(vehiclesData)) {
    const markalar = "markalar" in k ? k.markalar : k.altKategoriler.flatMap((a) => a.markalar);
    const m = markalar.find((mm) => mm.marka === marka);
    const mo = m?.modeller.find((mmm) => mmm.model === model);
    if (mo) {
      return mo.kasaTipleri.map((kk) => ({
        kod: kk.kod ?? kk.tip,
        tip: kk.tip,
        yillar: kk.yillar,
        motorlar: kk.motorlar,
      }));
    }
  }
  return [];
}

export function resolveKasa(marka: string, model: string, slug: string): ModelKasa | null {
  const kasalar = getModelKasalari(marka, model);
  const lower = slug.toLowerCase();
  return (
    kasalar.find((k) => k.kod.toLowerCase().replace(/\s+/g, "-") === lower) ??
    kasalar.find((k) => k.tip.toLowerCase().replace(/\s+/g, "-") === lower) ??
    null
  );
}

export const KATEGORILER: Kategori[] = [
  {
    slug: "otomobil",
    ad: "Otomobil",
    emoji: "🚗",
    markalar: buildMarkalar(otomobilMarkalari),
  },
  {
    slug: "arazi-suv",
    ad: "Arazi & SUV",
    emoji: "🚙",
    markalar: buildMarkalar(araziSuvMarkalari),
  },
  {
    slug: "motosiklet",
    ad: "Motosiklet",
    emoji: "🏍️",
    markalar: buildMarkalar(motosikletMarkalari),
  },
  {
    slug: "minivan-panelvan",
    ad: "Minivan & Panelvan",
    emoji: "🚐",
    markalar: buildMarkalar(minivanPanelvanMarkalari),
  },
  {
    slug: "ticari",
    ad: "Ticari Araç",
    emoji: "🚚",
    markalar: buildMarkalar(ticariAltKategoriler.flatMap((k) => k.markalar)),
  },
];
