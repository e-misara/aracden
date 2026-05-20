/**
 * marka="Bilinmiyor" review'ları — model isimlerinden marka tespiti (geniş anahtar kelime).
 */
import { prisma } from "../lib/prisma";

// Marka → anahtar kelime listesi (model + marka kelimeleri)
// Uzun anahtarlar önce eşleşsin diye ayrı dizi
const BRAND_KEYWORDS: Record<string, string[]> = {
  "Toyota":        ["toyota","corolla","yaris","camry","auris","avensis","rav4","c-hr","chr","land cruiser","hilux","prius","supra"],
  "Honda":         ["honda","civic","accord","crv","cr-v","hrv","hr-v","jazz","city","cbr","cb500","forza","pcx","x-adv","africa twin"],
  "Ford":          ["ford","focus","fiesta","mondeo","kuga","ecosport","puma","edge","explorer","tourneo","transit","connect","ranger","galaxy","s-max","mustang"],
  "Volkswagen":    ["volkswagen","vw","golf","polo","passat","tiguan","jetta","touareg","caddy","transporter","t-roc","t-cross","arteon","touran","id.4","id.3","amarok","crafter","multivan"],
  "Renault":       ["renault","clio","megane","talisman","kadjar","captur","symbol","fluence","koleos","espace","scenic","kangoo","trafic","master","austral","arkana","taliant","zoe","laguna","modus"],
  "BMW":           ["bmw","1 serisi","2 serisi","3 serisi","4 serisi","5 serisi","6 serisi","7 serisi","x1","x2","x3","x4","x5","x6","x7","z4","r1250","r1200","s1000","f850","f900","k1600","gs"],
  "Mercedes-Benz": ["mercedes","benz","a serisi","b serisi","c serisi","e serisi","s serisi","cla","cls","gla","glb","glc","gle","gls","vito","sprinter","actros","axor","atego","citan"],
  "Hyundai":       ["hyundai","i10","i20","i30","accent","elantra","sonata","tucson","kona","santa fe","bayon","ix35","getz","staria","ioniq","palisade"],
  "Kia":           ["kia","picanto","rio","ceed","sportage","sorento","cerato","niro","stonic","carnival","soul","stinger","ev6","xceed"],
  "Opel":          ["opel","astra","corsa","insignia","mokka","crossland","grandland","vectra","combo","vivaro","movano","meriva","zafira","agila"],
  "Peugeot":       ["peugeot","208","308","508","2008","3008","5008","partner","boxer","rifter","expert","traveller","301","bipper","207","407","408","e-208","e-2008"],
  "Citroen":       ["citroen","citroën","c1","c3","c4","c5","berlingo","jumpy","jumper","picasso","ds3","ds4","ds5","nemo","c-elysee","xsara"],
  "Skoda":         ["skoda","octavia","fabia","superb","rapid","yeti","kodiaq","karoq","kamiq","scala","citigo","enyaq"],
  "Seat":          ["seat","ibiza","leon","toledo","arona","ateca","tarraco","alhambra","cordoba","mii","altea"],
  "Audi":          ["audi","a1","a3","a4","a5","a6","a7","a8","q2","q3","q5","q7","q8","tt","rs3","rs5","rs6","e-tron"],
  "Dacia":         ["dacia","sandero","logan","duster","dokker","lodgy","spring","jogger"],
  "Fiat":          ["fiat","egea","linea","punto","doblo","fiorino","bravo","stilo","albea","tipo","panda","500x","500l","ducato","talento","marea"],
  "Tesla":         ["tesla","model y","model 3","model s","model x","cybertruck"],
  "TOGG":          ["togg","t10x","t10f"],
  "Volvo":         ["volvo","xc40","xc60","xc90","s60","s80","s90","v40","v60","v90","c40","c70","ex30","ex90"],
  "Nissan":        ["nissan","qashqai","juke","micra","note","almera","x-trail","navara","leaf","tiida","primera"],
  "Mazda":         ["mazda","cx-3","cx-5","cx-30","cx-9","cx-60","mx-5","mx-30"],
  "Suzuki":        ["suzuki","vitara","jimny","s-cross","swift","baleno","ignis","sx4","alto","burgman","gsx-r","v-strom"],
  "Mitsubishi":    ["mitsubishi","outlander","lancer","eclipse cross","asx","pajero","l200","colt","carisma","space star"],
  "Subaru":        ["subaru","forester","outback","impreza","legacy","xv","wrx","brz"],
  "Lexus":         ["lexus","es","gs","is","lc","ls","nx","rx","ux","ct"],
  "Land Rover":    ["land rover","range rover","defender","discovery","freelander","evoque","velar"],
  "Jeep":          ["jeep","compass","renegade","cherokee","grand cherokee","wrangler","avenger"],
  "Mini":          ["mini","cooper","countryman","clubman","paceman"],
  "Porsche":       ["porsche","911","718","cayenne","macan","panamera","taycan","boxster","cayman"],
  "Chery":         ["chery","tiggo","arrizo","omoda"],
  "BYD":           ["byd","atto","han","seal","seagull","song","tang","dolphin"],
  "Cupra":         ["cupra","formentor","born","tavascan","terramar"],
  "DS Automobiles":["ds automobiles","ds 3","ds 4","ds 5","ds 7","ds 9","crossback"],
  "Alfa Romeo":    ["alfa romeo","giulia","giulietta","stelvio","tonale","mito","147","156","159"],
  "Jaguar":        ["jaguar","f-pace","e-pace","i-pace","f-type","xe","xf","xj","x-type"],
  "Yamaha":        ["yamaha","mt-03","mt-07","mt-09","nmax","tenere","tracer","tmax","xsr","yzf"],
  "Kawasaki":      ["kawasaki","ninja","versys","z 650","z 900","z1000"],
  "KTM":           ["ktm","duke","adventure","exc","sx"],
  "Ducati":        ["ducati","monster","multistrada","panigale","scrambler","streetfighter","diavel"],
  "Aprilia":       ["aprilia","tuono","rsv4","rs 660"],
  "Triumph":       ["triumph","bonneville","street triple","tiger","trident","speed twin","rocket"],
  "Royal Enfield": ["royal enfield","himalayan","meteor","classic 350","interceptor","hunter"],
  "Harley-Davidson": ["harley","davidson","fat boy","softail","sportster","street glide"],
  "Lada":          ["lada","granta","kalina","priora","vesta","niva","samara"],
  "Daewoo":        ["daewoo","kalos","lanos","leganza","matiz","nexia","nubira"],
  "Chevrolet":     ["chevrolet","aveo","cruze","captiva","lacetti","malibu","spark","trax","camaro","corvette"],
  "Smart":         ["smart","fortwo","forfour"],
};

// Pattern precompile — uzun anahtarlar önce
const BRAND_PATTERNS: Array<{ marka: string; re: RegExp }> = [];
for (const [marka, keys] of Object.entries(BRAND_KEYWORDS)) {
  const sorted = keys.slice().sort((a, b) => b.length - a.length);
  const escaped = sorted.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  BRAND_PATTERNS.push({ marka, re: new RegExp("\\b(?:" + escaped.join("|") + ")\\b", "i") });
}

function detectBrand(text: string): string | null {
  if (!text) return null;
  let bestMatch: { marka: string; idx: number; len: number } | null = null;
  for (const { marka, re } of BRAND_PATTERNS) {
    const m = re.exec(text);
    if (m) {
      // En erken eşleşeni tercih et (ama anahtar uzunluğu da önemli)
      if (!bestMatch || m.index < bestMatch.idx || m[0].length > bestMatch.len) {
        bestMatch = { marka, idx: m.index, len: m[0].length };
      }
    }
  }
  return bestMatch?.marka ?? null;
}

async function main() {
  await prisma.$queryRaw`SELECT 1`;
  console.log("✓ DB OK\n");

  const rows = await prisma.review.findMany({
    where: { marka: "Bilinmiyor" },
    select: { id: true, baslik: true, icerik: true, kaynakUrl: true },
  });
  console.log(`  marka='Bilinmiyor' kayıt: ${rows.length}`);

  let updated = 0;
  let unknown = 0;
  const stats: Record<string, number> = {};

  for (const r of rows) {
    const text = `${r.baslik ?? ""} ${r.icerik ?? ""} ${r.kaynakUrl ?? ""}`;
    const brand = detectBrand(text);
    if (brand) {
      await prisma.review.update({ where: { id: r.id }, data: { marka: brand } });
      updated++;
      stats[brand] = (stats[brand] ?? 0) + 1;
    } else {
      await prisma.review.update({ where: { id: r.id }, data: { marka: "Genel" } });
      unknown++;
    }
  }

  console.log(`\n✓ Düzeltilen: ${updated}`);
  console.log(`○ Hala bulunamadı (→ Genel): ${unknown}`);
  console.log("\nYeniden eşlenen markalar (top 15):");
  for (const [b, c] of Object.entries(stats).sort((a, b) => b[1] - a[1]).slice(0, 15)) {
    console.log(`  ${b}: ${c}`);
  }
}

main().catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
