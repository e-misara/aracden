"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";

type Brand = {
  marka: string;
  totalReview: number;
  avgPuan: number | null;
  sikayetOrani: number;
  sikayetSayisi: number;
  kategori: string | null;
  enCokModel: string | null;
  enCokModelSayisi: number | null;
};

type ListConfig = {
  key: string;
  title: string;
  emoji: string;
  desc: string;
  color: string;
  fetchParam: { sort?: string; kategori?: string };
  // sıralama opsiyonel ekstra (UI tarafı)
  postSort?: (a: Brand, b: Brand) => number;
  filterMin?: { totalReview?: number };
};

const LISTS: ListConfig[] = [
  {
    key: "popular",
    title: "EN ÇOK İNCELENEN",
    emoji: "🏆",
    desc: "Toplam yorum sayısı en yüksek 10 marka",
    color: "from-[#ff6b00]/20 to-transparent",
    fetchParam: { sort: "totalReview" },
  },
  {
    key: "sikayet",
    title: "EN ÇOK ŞİKAYET EDEN",
    emoji: "💀",
    desc: "Şikayet oranı en yüksek (min 50 yorum)",
    color: "from-[#ff2d55]/20 to-transparent",
    fetchParam: { sort: "sikayetOrani" },
    filterMin: { totalReview: 50 },
  },
  {
    key: "puan",
    title: "EN YÜKSEK PUANLI",
    emoji: "💎",
    desc: "Ortalama puanı en yüksek (min 50 yorum)",
    color: "from-[#ffd60a]/20 to-transparent",
    fetchParam: { sort: "avgPuan" },
    filterMin: { totalReview: 50 },
  },
  {
    key: "moto",
    title: "MOTOSİKLET ENLERİ",
    emoji: "🏍️",
    desc: "Motosiklet kategorisinde en aktif",
    color: "from-[#0090ff]/20 to-transparent",
    fetchParam: { sort: "totalReview", kategori: "motosiklet" },
  },
  {
    key: "ticari",
    title: "TİCARİ ARAÇ KRALLIĞI",
    emoji: "🚚",
    desc: "Şoför yorumlarına göre",
    color: "from-[#00d68f]/20 to-transparent",
    fetchParam: { sort: "totalReview", kategori: "ticari" },
  },
  {
    key: "tr",
    title: "TÜRKİYE'NİN FAVORİSİ",
    emoji: "🇹🇷",
    desc: "Türk pazarında dikkat çekenler",
    color: "from-[#ff6b00]/20 to-transparent",
    fetchParam: { sort: "totalReview" },
    postSort: (a, b) => b.totalReview * (b.avgPuan ?? 1) - a.totalReview * (a.avgPuan ?? 1),
  },
];

function BrandRow({ b, rank }: { b: Brand; rank: number }) {
  const puan = b.avgPuan ?? 0;
  const sikayet = b.sikayetOrani * 100;
  const sikayetColor = sikayet > 50 ? "text-[#ff2d55]" : sikayet > 30 ? "text-[#ffd60a]" : "text-[#00d68f]";
  const rankColor =
    rank === 1 ? "text-[#ffd60a]" : rank === 2 ? "text-[#8b8b9e]" : rank === 3 ? "text-[#ff6b00]" : "text-[#4a4a5e]";
  return (
    <Link
      href={`/${b.kategori ?? "otomobil"}/${encodeURIComponent(b.marka)}`}
      className="flex items-center gap-3 p-3 rounded hover:bg-[#1a1a26] transition-colors group"
    >
      <span className={`font-mono-num font-bold text-2xl w-10 ${rankColor}`}>
        {rank.toString().padStart(2, "0")}
      </span>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-white group-hover:text-[#ff6b00] transition-colors truncate">
          {b.marka}
        </div>
        {b.enCokModel && (
          <div className="text-xs text-[#4a4a5e] truncate">↳ {b.enCokModel}</div>
        )}
      </div>
      <div className="flex items-center gap-4 text-xs flex-shrink-0">
        <span className="font-mono-num text-[#8b8b9e] hidden sm:inline">
          {b.totalReview.toLocaleString("tr-TR")}
        </span>
        <span className="font-mono-num text-[#ffd60a]">★{puan.toFixed(1)}</span>
        <span className={`font-mono-num ${sikayetColor}`}>%{sikayet.toFixed(0)}</span>
      </div>
    </Link>
  );
}

function BrandList({ config }: { config: ListConfig }) {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({ limit: "50" });
    if (config.fetchParam.sort) params.set("sort", config.fetchParam.sort);
    if (config.fetchParam.kategori) params.set("kategori", config.fetchParam.kategori);
    fetch(`/api/brands?${params}`)
      .then((r) => r.json())
      .then((d) => {
        let arr: Brand[] = d.brands ?? [];
        if (config.filterMin?.totalReview != null) {
          arr = arr.filter((b) => b.totalReview >= config.filterMin!.totalReview!);
        }
        if (config.postSort) arr = arr.slice().sort(config.postSort);
        setBrands(arr.slice(0, 10));
      })
      .finally(() => setLoading(false));
  }, [config]);

  return (
    <div className={`bg-gradient-to-br ${config.color} bg-[#12121a] border border-[#1e1e2e] rounded-md overflow-hidden`}>
      <div className="px-4 py-3 border-b border-[#1e1e2e]">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl">{config.emoji}</span>
          <h3 className="font-semibold text-white tracking-tight">{config.title}</h3>
        </div>
        <p className="text-[10px] font-mono-num text-[#4a4a5e] uppercase tracking-wide">{config.desc}</p>
      </div>
      <div className="divide-y divide-[#1e1e2e]/50">
        {loading ? (
          <div className="p-6 text-center text-xs text-[#4a4a5e]">Yükleniyor…</div>
        ) : brands.length === 0 ? (
          <div className="p-6 text-center text-xs text-[#4a4a5e]">Veri yok.</div>
        ) : (
          brands.map((b, i) => <BrandRow key={b.marka} b={b} rank={i + 1} />)
        )}
      </div>
    </div>
  );
}

export default function EnlerPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Ticker />
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="mb-8">
          <div className="text-xs font-mono-num text-[#ff6b00] uppercase tracking-[0.25em] mb-2">
            ● LEADERBOARDS · CANLI
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-3">
            <span className="text-[#ff6b00]">Enler</span> Listesi
          </h1>
          <p className="text-[#8b8b9e] max-w-2xl">
            Tüm marka istatistikleri: review sayısı, puanı, şikayet oranı. Sıralama 12.485 review üzerinden hesaplanır, canlı güncellenir.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {LISTS.map((c) => (
            <BrandList key={c.key} config={c} />
          ))}
        </div>
      </section>
    </div>
  );
}
