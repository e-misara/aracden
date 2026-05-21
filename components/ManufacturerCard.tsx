"use client";

import type { VehicleInfo, Motor } from "@/lib/vehicle-info";

function motorOzeti(motorlar: Motor[]) {
  if (motorlar.length === 0) return null;
  const hp = motorlar
    .map((m) => parseInt(m.guc.replace(/[^0-9]/g, ""), 10))
    .filter((n) => !isNaN(n) && n > 0)
    .sort((a, b) => a - b);
  const min = hp[0];
  const max = hp[hp.length - 1];
  const ilk = motorlar[0].kod;
  const son = motorlar[motorlar.length - 1].kod;
  if (motorlar.length === 1) return `${ilk} (${min} HP)`;
  return `${ilk} → ${son} (${min}-${max} HP)`;
}

function yakitTipleri(motorlar: Motor[]) {
  return [...new Set(motorlar.map((m) => m.yakit))];
}

export default function ManufacturerCard({ info }: { info: VehicleInfo }) {
  const motorOz = motorOzeti(info.motor_secenekleri);
  const yakitlar = yakitTipleri(info.motor_secenekleri);
  const yt = info.resmi_yakit_tuketimi;
  const perf = info.resmi_performans;

  return (
    <div className="bg-[#12121a] border border-[#1e1e2e] rounded-md p-5 mb-6">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#1e1e2e]">
        <div className="flex items-center gap-2">
          <span className="text-base">🏭</span>
          <div className="text-[10px] font-mono-num text-[#4a4a5e] uppercase tracking-widest">
            {info.marka.toUpperCase()} İDDİASI · ÜRETİCİ VERİSİ
          </div>
        </div>
        {info.turkiye_populerlik && (
          <span className="text-[10px] font-mono-num text-[#4a4a5e] uppercase">
            TR · {info.turkiye_populerlik}
          </span>
        )}
      </div>

      {info.slogan && (
        <div className="text-lg italic text-white mb-2">&ldquo;{info.slogan}&rdquo;</div>
      )}
      <p className="text-sm text-[#8b8b9e] leading-relaxed mb-5">{info.resmi_tanim}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        {motorOz && (
          <div>
            <div className="text-[10px] font-mono-num text-[#4a4a5e] uppercase tracking-wide mb-1">
              MOTOR SEÇENEKLERİ
            </div>
            <div className="text-sm font-mono-num text-white">{motorOz}</div>
            <div className="text-[11px] text-[#8b8b9e] mt-0.5">
              {yakitlar.join(" · ")}
            </div>
          </div>
        )}
        {yt && (yt.karma || yt.sehir || yt.yol) && (
          <div>
            <div className="text-[10px] font-mono-num text-[#4a4a5e] uppercase tracking-wide mb-1">
              YAKIT (RESMİ)
            </div>
            <div className="text-sm font-mono-num text-white">
              {yt.karma && <>Karma {yt.karma}/100km</>}
              {!yt.karma && yt.sehir && <>Şehir {yt.sehir}/100km</>}
            </div>
            {(yt.sehir || yt.yol) && yt.karma && (
              <div className="text-[11px] text-[#8b8b9e] mt-0.5">
                {yt.sehir && <>Şehir {yt.sehir} </>}{yt.yol && <>· Yol {yt.yol}</>}
              </div>
            )}
          </div>
        )}
        {perf && (perf.hizlanma_0_100 || perf.max_hiz) && (
          <div>
            <div className="text-[10px] font-mono-num text-[#4a4a5e] uppercase tracking-wide mb-1">
              PERFORMANS (RESMİ)
            </div>
            <div className="text-sm font-mono-num text-white">
              {perf.hizlanma_0_100 && <>0-100: {perf.hizlanma_0_100}</>}
              {perf.hizlanma_0_100 && perf.max_hiz && " · "}
              {perf.max_hiz && <>Max {perf.max_hiz}</>}
            </div>
          </div>
        )}
        {info.resmi_garanti && (
          <div>
            <div className="text-[10px] font-mono-num text-[#4a4a5e] uppercase tracking-wide mb-1">
              GARANTİ
            </div>
            <div className="text-sm font-mono-num text-white">{info.resmi_garanti}</div>
          </div>
        )}
      </div>

      {info.guvenlik_ekipmanlari && info.guvenlik_ekipmanlari.length > 0 && (
        <div className="mb-4">
          <div className="text-[10px] font-mono-num text-[#4a4a5e] uppercase tracking-wide mb-2">
            GÜVENLİK EKİPMANLARI
          </div>
          <div className="flex flex-wrap gap-1.5">
            {info.guvenlik_ekipmanlari.map((g) => (
              <span
                key={g}
                className="text-[11px] px-2 py-0.5 rounded border border-[#1e1e2e] bg-[#0a0a0f] text-[#8b8b9e]"
              >
                {g}
              </span>
            ))}
          </div>
        </div>
      )}

      {(info.guclu_yonler?.length || info.bilinen_sorunlar?.length) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-[#1e1e2e]">
          {info.guclu_yonler && info.guclu_yonler.length > 0 && (
            <div>
              <div className="text-[10px] font-mono-num text-[#00d68f] uppercase tracking-widest mb-2">
                ✓ ÜRETİCİ GÜÇLÜ YÖN İDDİASI
              </div>
              <ul className="space-y-1">
                {info.guclu_yonler.map((y) => (
                  <li key={y} className="text-xs text-[#8b8b9e]">• {y}</li>
                ))}
              </ul>
            </div>
          )}
          {info.bilinen_sorunlar && info.bilinen_sorunlar.length > 0 && (
            <div>
              <div className="text-[10px] font-mono-num text-[#ff2d55] uppercase tracking-widest mb-2">
                ⚠ BİLİNEN SORUNLAR (KAMUOYU)
              </div>
              <ul className="space-y-1">
                {info.bilinen_sorunlar.map((s) => (
                  <li key={s} className="text-xs text-[#8b8b9e]">• {s}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="mt-4 pt-3 border-t border-[#1e1e2e] text-[11px] font-mono-num text-[#4a4a5e] flex items-center gap-2">
        <span>⚠</span>
        <span>
          Yukarısı üretici/resmi veridir. Gerçek kullanıcı deneyimleri{" "}
          <span className="text-[#ff6b00]">aşağıda</span>.
        </span>
      </div>
    </div>
  );
}
