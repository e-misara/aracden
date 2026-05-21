"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";
import { getVehicleImage } from "@/lib/vehicle-images";
import { getPersonality, TIP_RENKLERI } from "@/lib/vehicle-personalities";
import { getVehicleInfo, type VehicleInfo } from "@/lib/vehicle-info";

type SearchResult = {
  marka: string;
  model: string;
  kategori: string;
  totalReview: number;
  avgPuan: number | null;
  url: string;
};

type ApiReview = { puan: number; baslik: string; icerik: string; olumsuz: string[] };

const PROBLEM_BUCKETS = [
  { label: "Şanzıman/DSG", emoji: "⚙️", patterns: [/dsg/i, /şanzıman/i, /vites/i] },
  { label: "Motor/Yağ", emoji: "🔧", patterns: [/motor[\s-]?yağ/i, /yağ\s+yak/i, /motor\s+arıza/i] },
  { label: "Servis", emoji: "🏢", patterns: [/servis/i, /garanti/i] },
  { label: "Yakıt", emoji: "⛽", patterns: [/yakıt/i, /tüket/i] },
  { label: "Elektrik", emoji: "💻", patterns: [/ekran/i, /elektrik/i, /multimedya/i] },
  { label: "Fren", emoji: "🛑", patterns: [/fren/i, /\babs\b/i] },
  { label: "Süspansiyon", emoji: "🔩", patterns: [/süspansiyon/i, /tıkır/i, /titreşim/i] },
  { label: "Klima/Konfor", emoji: "❄️", patterns: [/klima/i, /yalıtım/i] },
];

function categorize(reviews: ApiReview[]) {
  const counts: Record<string, number> = {};
  for (const r of reviews) {
    const text = `${r.baslik} ${r.icerik} ${r.olumsuz.join(" ")}`.toLowerCase();
    for (const b of PROBLEM_BUCKETS) {
      if (b.patterns.some((p) => p.test(text))) {
        counts[b.label] = (counts[b.label] ?? 0) + 1;
      }
    }
  }
  return counts;
}

type CarStats = {
  marka: string;
  model: string;
  kategori: string;
  totalReview: number;
  avgPuan: number;
  sikayetSayisi: number;
  sikayetOrani: number;
  problems: Record<string, number>;
  imgUrl: string;
};

function useCarStats(marka: string, model: string): CarStats | null {
  const [stats, setStats] = useState<CarStats | null>(null);
  useEffect(() => {
    if (!marka || !model) { setStats(null); return; }
    fetch(`/api/reviews?marka=${encodeURIComponent(marka)}&model=${encodeURIComponent(model)}&limit=50`)
      .then((r) => r.json())
      .then((d) => {
        const reviews: ApiReview[] = d.reviews ?? [];
        const total = d.total ?? 0;
        const avg = reviews.length > 0 ? reviews.reduce((s, r) => s + r.puan, 0) / reviews.length : 0;
        const sikayetSay = reviews.filter((r) => r.puan <= 2.5).length;
        const kategori = (reviews[0] as any)?.kategoriSlug ?? "otomobil";
        setStats({
          marka, model, kategori,
          totalReview: total, avgPuan: avg,
          sikayetSayisi: sikayetSay,
          sikayetOrani: reviews.length > 0 ? sikayetSay / reviews.length : 0,
          problems: categorize(reviews),
          imgUrl: getVehicleImage(marka, model, "Sedan", kategori),
        });
      });
  }, [marka, model]);
  return stats;
}

function CarSelector({
  label, query, onPick,
}: { label: string; query: { marka: string; model: string }; onPick: (m: string, mo: string) => void }) {
  const [q, setQ] = useState(`${query.marka} ${query.model}`.trim());
  const [results, setResults] = useState<SearchResult[]>([]);
  useEffect(() => {
    if (q.trim().length < 2) { setResults([]); return; }
    const t = setTimeout(() => {
      fetch(`/api/search?q=${encodeURIComponent(q.trim())}&limit=6`)
        .then((r) => r.json())
        .then((d) => setResults(d.results ?? []));
    }, 200);
    return () => clearTimeout(t);
  }, [q]);
  return (
    <div className="relative">
      <div className="text-[10px] font-mono-num text-[#4a4a5e] uppercase tracking-widest mb-2">{label}</div>
      <input
        type="text"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Marka veya model yaz..."
        className="w-full bg-[#12121a] border border-[#1e1e2e] focus:border-[#ff6b00] rounded-md px-3 py-2.5 text-sm text-white placeholder-[#4a4a5e] outline-none"
      />
      {results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-[#12121a] border border-[#1e1e2e] rounded-md overflow-hidden z-30 max-h-72 overflow-y-auto">
          {results.map((r, i) => (
            <button
              key={i}
              onClick={() => { onPick(r.marka, r.model); setQ(`${r.marka} ${r.model}`); setResults([]); }}
              className="w-full text-left px-3 py-2 hover:bg-[#1a1a26] text-sm border-b border-[#1e1e2e] last:border-b-0 flex justify-between items-center"
            >
              <span className="text-white">{r.marka} <span className="text-[#8b8b9e]">·</span> {r.model}</span>
              <span className="text-xs font-mono-num text-[#8b8b9e]">{r.totalReview}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function CarCard({ stats }: { stats: CarStats | null }) {
  if (!stats) {
    return (
      <div className="bg-[#12121a] border border-[#1e1e2e] rounded-md p-8 text-center text-[#4a4a5e] text-sm">
        Üstten araç seç
      </div>
    );
  }
  const personality = getPersonality(stats.marka, stats.model);
  const tipColors = personality ? TIP_RENKLERI[personality.tip] : null;
  const sikayetPct = stats.sikayetOrani * 100;
  const sikayetColor = sikayetPct > 50 ? "#ff2d55" : sikayetPct > 30 ? "#ffd60a" : "#00d68f";
  const maxProb = Math.max(1, ...Object.values(stats.problems));

  return (
    <div className="bg-[#12121a] border border-[#1e1e2e] rounded-md overflow-hidden">
      <div className="aspect-video bg-[#0a0a0f] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={stats.imgUrl} alt={`${stats.marka} ${stats.model}`} className="w-full h-full object-cover" />
      </div>
      <div className="p-4 space-y-3">
        <div>
          <div className="text-[10px] font-mono-num text-[#4a4a5e] uppercase tracking-wide">{stats.marka}</div>
          <h2 className="text-2xl font-bold text-white">{stats.model}</h2>
          <Link
            href={`/${stats.kategori}/${encodeURIComponent(stats.marka)}/${encodeURIComponent(stats.model)}`}
            className="text-xs text-[#ff6b00] hover:underline mt-1 inline-block"
          >
            Detay sayfası →
          </Link>
        </div>

        {personality && tipColors && (
          <div className={`${tipColors.bg} ${tipColors.border} border rounded p-2.5`}>
            <div className="flex items-center gap-2">
              <span className="text-xl">{personality.emoji}</span>
              <div className="flex-1">
                <div className={`text-[10px] font-mono-num ${tipColors.text} uppercase`}>{personality.tip}</div>
                <div className="text-sm font-bold text-white">{personality.karakter}</div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-3 gap-2">
          <div className="text-center bg-[#0a0a0f] rounded p-2 border border-[#1e1e2e]">
            <div className="text-[9px] font-mono-num text-[#4a4a5e] uppercase">PUAN</div>
            <div className="text-xl font-mono-num font-semibold text-[#ffd60a]">★{stats.avgPuan.toFixed(1)}</div>
          </div>
          <div className="text-center bg-[#0a0a0f] rounded p-2 border border-[#1e1e2e]">
            <div className="text-[9px] font-mono-num text-[#4a4a5e] uppercase">ŞİKAYET</div>
            <div className="text-xl font-mono-num font-semibold" style={{ color: sikayetColor }}>%{sikayetPct.toFixed(0)}</div>
          </div>
          <div className="text-center bg-[#0a0a0f] rounded p-2 border border-[#1e1e2e]">
            <div className="text-[9px] font-mono-num text-[#4a4a5e] uppercase">REVIEW</div>
            <div className="text-xl font-mono-num font-semibold text-white">{stats.totalReview}</div>
          </div>
        </div>

        {Object.keys(stats.problems).length > 0 && (
          <div>
            <div className="text-[10px] font-mono-num text-[#4a4a5e] uppercase tracking-widest mb-2">
              SORUN PROFİLİ
            </div>
            <div className="space-y-1.5">
              {Object.entries(stats.problems).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([label, cnt]) => {
                const pct = (cnt / maxProb) * 100;
                return (
                  <div key={label} className="flex items-center gap-2">
                    <span className="text-xs text-[#8b8b9e] w-28 truncate">{label}</span>
                    <div className="flex-1 h-1.5 bg-[#1a1a26] rounded-full overflow-hidden">
                      <div className="h-full bg-[#ff6b00]" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-xs font-mono-num text-[#8b8b9e] w-8 text-right">{cnt}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function KarsilastirInner() {
  const router = useRouter();
  const sp = useSearchParams();
  const aParam = (sp.get("a") ?? "").split("-");
  const bParam = (sp.get("b") ?? "").split("-");
  const [a, setA] = useState({ marka: aParam[0] ?? "", model: aParam.slice(1).join("-") ?? "" });
  const [b, setB] = useState({ marka: bParam[0] ?? "", model: bParam.slice(1).join("-") ?? "" });

  const statsA = useCarStats(a.marka, a.model);
  const statsB = useCarStats(b.marka, b.model);

  useEffect(() => {
    const aStr = a.marka && a.model ? `${a.marka}-${a.model}` : "";
    const bStr = b.marka && b.model ? `${b.marka}-${b.model}` : "";
    const url = new URLSearchParams();
    if (aStr) url.set("a", aStr);
    if (bStr) url.set("b", bStr);
    const q = url.toString();
    router.replace(`/karsilastir${q ? `?${q}` : ""}`, { scroll: false });
  }, [a, b, router]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Ticker />
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="text-xs font-mono-num text-[#ff6b00] uppercase tracking-[0.25em] mb-2">
            ● ARAÇ KARŞILAŞTIRMA · CANLI
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-3">
            İki araç, yan <span className="text-[#ff6b00]">yana.</span>
          </h1>
          <p className="text-[#8b8b9e] max-w-2xl">
            Puan, şikayet oranı, sorun profili — gerçek kullanıcı verilerinden yan yana.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <CarSelector label="A. ARAÇ" query={a} onPick={(m, mo) => setA({ marka: m, model: mo })} />
          <CarSelector label="B. ARAÇ" query={b} onPick={(m, mo) => setB({ marka: m, model: mo })} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <CarCard stats={statsA} />
          <CarCard stats={statsB} />
        </div>

        <TeknikKarsilastirma a={statsA ? getVehicleInfo(statsA.marka, statsA.model) : null} b={statsB ? getVehicleInfo(statsB.marka, statsB.model) : null} />
      </section>
    </div>
  );
}

function pickHP(info: VehicleInfo | null) {
  if (!info || info.motor_secenekleri.length === 0) return null;
  const hps = info.motor_secenekleri
    .map((m) => parseInt(m.guc.replace(/[^0-9]/g, ""), 10))
    .filter((n) => !isNaN(n) && n > 0);
  if (hps.length === 0) return null;
  return { min: Math.min(...hps), max: Math.max(...hps) };
}

function TeknikKarsilastirma({ a, b }: { a: VehicleInfo | null; b: VehicleInfo | null }) {
  if (!a && !b) return null;

  const rows: Array<{ label: string; a: string; b: string }> = [];
  const hpA = pickHP(a);
  const hpB = pickHP(b);
  if (hpA || hpB) {
    rows.push({
      label: "Güç (HP)",
      a: hpA ? `${hpA.min} - ${hpA.max}` : "—",
      b: hpB ? `${hpB.min} - ${hpB.max}` : "—",
    });
  }
  rows.push({
    label: "Yakıt seçenekleri",
    a: a ? [...new Set(a.motor_secenekleri.map((m) => m.yakit))].join(", ") : "—",
    b: b ? [...new Set(b.motor_secenekleri.map((m) => m.yakit))].join(", ") : "—",
  });
  rows.push({
    label: "Karma yakıt (resmi)",
    a: a?.resmi_yakit_tuketimi?.karma ?? "—",
    b: b?.resmi_yakit_tuketimi?.karma ?? "—",
  });
  rows.push({
    label: "0-100",
    a: a?.resmi_performans?.hizlanma_0_100 ?? "—",
    b: b?.resmi_performans?.hizlanma_0_100 ?? "—",
  });
  rows.push({
    label: "Max hız",
    a: a?.resmi_performans?.max_hiz ?? "—",
    b: b?.resmi_performans?.max_hiz ?? "—",
  });
  rows.push({
    label: "Garanti",
    a: a?.resmi_garanti ?? "—",
    b: b?.resmi_garanti ?? "—",
  });
  rows.push({
    label: "TR popülerlik",
    a: a?.turkiye_populerlik ?? "—",
    b: b?.turkiye_populerlik ?? "—",
  });

  return (
    <div className="bg-[#12121a] border border-[#1e1e2e] rounded-md overflow-hidden">
      <div className="px-5 py-3 border-b border-[#1e1e2e] flex items-center justify-between">
        <div className="text-[10px] font-mono-num text-[#4a4a5e] uppercase tracking-widest">
          🏭 ÜRETİCİ TEKNİK VERİLERİ
        </div>
        <div className="text-[10px] font-mono-num text-[#4a4a5e]">
          {a && b ? "İKİ ARAÇ" : a ? "SADECE A" : b ? "SADECE B" : "—"}
        </div>
      </div>
      <table className="w-full text-sm">
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.label} className={i % 2 === 0 ? "bg-[#0a0a0f]/40" : ""}>
              <td className="px-4 py-3 text-[#8b8b9e] text-xs font-mono-num uppercase tracking-wide w-1/3">{r.label}</td>
              <td className="px-4 py-3 text-white font-mono-num">{r.a}</td>
              <td className="px-4 py-3 text-white font-mono-num">{r.b}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {(!a || !b) && (
        <div className="px-5 py-3 border-t border-[#1e1e2e] text-[10px] font-mono-num text-[#4a4a5e]">
          ⚠ Bir veya iki araç için üretici teknik verisi henüz tabanda yok.
        </div>
      )}
    </div>
  );
}

export default function KarsilastirPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0a0f]" />}>
      <KarsilastirInner />
    </Suspense>
  );
}
