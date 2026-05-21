"use client";

import { useState } from "react";

interface AddIssueFormProps {
  kategoriSlug: string;
  marka: string;
  model: string;
  onSubmit?: () => void;
}

const ISSUE_CATEGORIES = [
  { value: "Şanzıman/DSG", emoji: "⚙️" },
  { value: "Motor/Yağ", emoji: "🔧" },
  { value: "Servis/Garanti", emoji: "🏢" },
  { value: "Yakıt Tüketimi", emoji: "⛽" },
  { value: "Elektrik/Ekran", emoji: "💻" },
  { value: "Fren/ABS", emoji: "🛑" },
  { value: "Süspansiyon", emoji: "🔩" },
  { value: "Klima/Konfor", emoji: "❄️" },
  { value: "Diğer", emoji: "📌" },
];

const STATUS_OPTIONS = [
  { value: "Çözüldü", color: "#00d68f" },
  { value: "Devam Ediyor", color: "#ffd60a" },
  { value: "Henüz Bakım Yapmadım", color: "#8b8b9e" },
];

export default function AddIssueForm({ kategoriSlug, marka, model, onSubmit }: AddIssueFormProps) {
  const [form, setForm] = useState({
    issueCategory: ISSUE_CATEGORIES[0].value,
    yil: new Date().getFullYear() - 5,
    km: "",
    aciklama: "",
    durum: "Devam Ediyor",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const submit = async () => {
    if (!form.aciklama || form.aciklama.length < 10) {
      setError("Lütfen sorunu en az 10 karakterle açıklayın.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/issues", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kategoriSlug,
          marka,
          model,
          yil: form.yil,
          issueCategory: form.issueCategory,
          km: form.km,
          aciklama: form.aciklama,
          durum: form.durum,
        }),
      });
      if (res.ok) {
        setDone(true);
        onSubmit?.();
      } else {
        const d = await res.json().catch(() => ({}));
        setError(d.error ?? "Gönderilemedi.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="bg-[#0a1f14] border border-[#00d68f]/30 rounded-md p-4 text-sm text-[#00d68f]">
        ✓ Sorun raporu kaydedildi. Doğrulamadan sonra topluluğa görünür olacak.
      </div>
    );
  }

  const labelCls = "block text-[10px] font-mono-num text-[#4a4a5e] uppercase tracking-widest mb-1.5";
  const inputCls = "w-full bg-[#0a0a0f] border border-[#1e1e2e] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#ff6b00]";

  return (
    <div className="bg-[#12121a] border border-[#ff6b00]/30 rounded-md p-5 space-y-4">
      <div className="flex items-center gap-2 pb-3 border-b border-[#1e1e2e]">
        <span>📣</span>
        <div className="text-[10px] font-mono-num text-[#ff6b00] uppercase tracking-widest">
          SORUN BİLDİR · {marka.toUpperCase()} {model.toUpperCase()}
        </div>
      </div>

      <div>
        <label className={labelCls}>SORUN KATEGORİSİ</label>
        <div className="grid grid-cols-3 gap-2">
          {ISSUE_CATEGORIES.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => set("issueCategory", c.value)}
              className={`text-xs py-2 px-2 rounded border transition-colors text-left ${
                form.issueCategory === c.value
                  ? "bg-[#ff6b00]/20 border-[#ff6b00] text-white"
                  : "bg-[#0a0a0f] border-[#1e1e2e] text-[#8b8b9e] hover:border-[#ff6b00]/50"
              }`}
            >
              <span className="mr-1">{c.emoji}</span>
              {c.value}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelCls}>MODEL YILI</label>
          <input
            type="number"
            value={form.yil}
            min={1990}
            max={new Date().getFullYear() + 1}
            onChange={(e) => set("yil", parseInt(e.target.value) || form.yil)}
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>KİLOMETRE</label>
          <input
            type="text"
            value={form.km}
            onChange={(e) => set("km", e.target.value)}
            placeholder="Örn. 85.000"
            className={inputCls}
          />
        </div>
      </div>

      <div>
        <label className={labelCls}>SORUN AÇIKLAMASI</label>
        <textarea
          value={form.aciklama}
          onChange={(e) => set("aciklama", e.target.value)}
          rows={4}
          placeholder="Ne zaman başladı, nasıl ortaya çıkıyor, servis ne dedi…"
          className={inputCls + " resize-none"}
        />
        <div className="text-[10px] text-[#4a4a5e] mt-1 font-mono-num">
          {form.aciklama.length} karakter · min 10
        </div>
      </div>

      <div>
        <label className={labelCls}>DURUM</label>
        <div className="flex gap-2">
          {STATUS_OPTIONS.map((s) => (
            <button
              key={s.value}
              type="button"
              onClick={() => set("durum", s.value)}
              className={`flex-1 text-xs py-2 px-2 rounded border transition-colors ${
                form.durum === s.value
                  ? "border-current bg-white/5"
                  : "border-[#1e1e2e] text-[#8b8b9e] hover:border-[#1e1e2e]"
              }`}
              style={form.durum === s.value ? { color: s.color, borderColor: s.color } : undefined}
            >
              {s.value}
            </button>
          ))}
        </div>
      </div>

      {error && <p className="text-xs text-[#ff2d55]">{error}</p>}

      <button
        type="button"
        onClick={submit}
        disabled={submitting}
        className="w-full py-2.5 bg-[#ff6b00] hover:bg-orange-600 text-white text-sm font-semibold rounded transition-colors disabled:opacity-40"
      >
        {submitting ? "Gönderiliyor…" : "Sorunu Bildir"}
      </button>
    </div>
  );
}
