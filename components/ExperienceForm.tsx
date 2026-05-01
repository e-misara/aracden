"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface ExperienceFormProps {
  kategoriSlug: string;
  marka: string;
  model: string;
  kasaKod: string;
  yil: number;
  onSubmit?: () => void;
}

const CATEGORY_MAP: Record<string, string> = {
  otomobil: "OTOMOBIL",
  "arazi-suv": "ARAZI_SUV",
  motosiklet: "MOTOSIKLET",
  "minivan-panelvan": "MINIVAN",
  ticari: "TICARI",
};

const FUEL_TYPES = ["Benzin", "Dizel", "Elektrik", "Hibrit", "LPG"];

function StarInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i)}
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(0)}
          className={`text-2xl transition-colors ${i <= (hover || value) ? "text-[#FF6000]" : "text-gray-300"}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

export default function ExperienceForm({ kategoriSlug, marka, model, yil, onSubmit }: ExperienceFormProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [form, setForm] = useState({
    sentimentType: "POSITIVE",
    fuelType: "Benzin",
    kmUsed: "",
    usagePeriod: "",
    title: "",
    body: "",
    puan: 0,
  });
  const [editing, setEditing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const set = (k: string, v: string | number) => setForm((f) => ({ ...f, [k]: v }));

  const handleAIEdit = async () => {
    if (!form.body) return;
    setEditing(true);
    try {
      const res = await fetch("/api/ai-edit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: form.body }),
      });
      const data = await res.json();
      if (data.edited) set("body", data.edited);
    } finally {
      setEditing(false);
    }
  };

  const handleSubmit = async () => {
    if (!session) { router.push("/auth/login"); return; }
    if (!form.title || !form.body || !form.puan) {
      setError("Başlık, deneyim ve puan zorunludur.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: CATEGORY_MAP[kategoriSlug] ?? "OTOMOBIL",
          brand: marka,
          model,
          year: yil,
          fuelType: form.fuelType,
          kmUsed: form.kmUsed,
          usagePeriod: form.usagePeriod,
          sentimentType: form.sentimentType,
          title: form.title,
          body: form.body,
          tags: [],
        }),
      });
      if (res.ok) {
        onSubmit?.();
      } else {
        setError("Gönderilemedi. Tekrar deneyin.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "w-full border border-[#E0E0E0] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#FF6000]";

  return (
    <div className="bg-white border border-[#E0E0E0] rounded-lg p-4 space-y-4">
      <div className="flex items-center gap-2 text-sm text-gray-500 border-b border-[#E0E0E0] pb-3">
        <span className="font-semibold text-[#333]">{marka} {model}</span>
        <span>·</span>
        <span>{yil}</span>
      </div>

      {/* Sentiment */}
      <div>
        <label className="block text-xs font-semibold text-[#333] mb-1">Deneyim Türü</label>
        <div className="flex gap-2">
          {[
            { value: "POSITIVE", label: "😊 Olumlu" },
            { value: "COMPLAINT", label: "😤 Şikayet" },
            { value: "TIP", label: "💡 İpucu" },
          ].map((s) => (
            <button
              key={s.value}
              type="button"
              onClick={() => set("sentimentType", s.value)}
              className={`flex-1 py-1.5 rounded text-xs font-semibold border transition-colors ${
                form.sentimentType === s.value
                  ? "bg-[#FF6000] text-white border-[#FF6000]"
                  : "bg-white text-[#333] border-[#E0E0E0] hover:border-[#FF6000]"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Puan */}
      <div>
        <label className="block text-xs font-semibold text-[#333] mb-1">Puanınız</label>
        <StarInput value={form.puan} onChange={(v) => set("puan", v)} />
      </div>

      {/* Yakıt + KM */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-[#333] mb-1">Yakıt Tipi</label>
          <select value={form.fuelType} onChange={(e) => set("fuelType", e.target.value)} className={inputClass}>
            {FUEL_TYPES.map((f) => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#333] mb-1">Kilometre</label>
          <input type="text" value={form.kmUsed} onChange={(e) => set("kmUsed", e.target.value)} className={inputClass} placeholder="Örn: 45.000 km" />
        </div>
      </div>

      {/* Başlık */}
      <div>
        <label className="block text-xs font-semibold text-[#333] mb-1">Başlık</label>
        <input type="text" value={form.title} onChange={(e) => set("title", e.target.value)} className={inputClass} placeholder="Deneyiminizi özetleyin" />
      </div>

      {/* Deneyim */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="block text-xs font-semibold text-[#333]">Deneyiminiz</label>
          <button
            type="button"
            onClick={handleAIEdit}
            disabled={editing || !form.body}
            className="text-xs bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 disabled:opacity-40"
          >
            {editing ? "Düzenleniyor…" : "✨ AI ile Düzenle"}
          </button>
        </div>
        <textarea
          value={form.body}
          onChange={(e) => set("body", e.target.value)}
          rows={4}
          className={inputClass + " resize-none"}
          placeholder="Aracı kullanırken yaşadığınız deneyimi anlatın…"
        />
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}

      <div className="flex gap-2 justify-end">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={submitting}
          className="px-6 py-2 bg-[#FF6000] text-white text-sm font-bold rounded hover:bg-orange-700 disabled:opacity-40 transition-colors"
        >
          {submitting ? "Gönderiliyor…" : "Paylaş"}
        </button>
      </div>
    </div>
  );
}
