type AdSize = "728x90" | "300x250" | "300x600" | "native";

interface AdSlotProps {
  slot: string;
  size: AdSize;
  label?: string;
}

const DIMS: Record<AdSize, { w: number | string; h: number | string; class: string }> = {
  "728x90":  { w: 728, h: 90,  class: "max-w-[728px] h-[90px]" },
  "300x250": { w: 300, h: 250, class: "w-[300px] h-[250px]" },
  "300x600": { w: 300, h: 600, class: "w-[300px] h-[600px]" },
  "native":  { w: "100%", h: "auto", class: "w-full h-auto" },
};

export default function AdSlot({ slot, size, label }: AdSlotProps) {
  const dim = DIMS[size];
  return (
    <div className="my-3 flex flex-col items-center">
      <div className="text-[9px] font-mono-num text-[#4a4a5e] uppercase tracking-widest mb-1">
        {label ?? "REKLAM ALANI"}
      </div>
      <div
        data-ad-slot={slot}
        data-ad-size={size}
        className={`bg-[#12121a] border border-dashed border-[#2e2e4e] rounded-md flex items-center justify-center text-[#4a4a5e] text-xs font-mono-num mx-auto ${dim.class}`}
        style={{ minHeight: typeof dim.h === "number" ? `${dim.h}px` : undefined }}
      >
        <div className="text-center">
          <div className="text-2xl mb-1">📢</div>
          <div>{size}</div>
          <div className="text-[10px] opacity-50 mt-1">slot: {slot}</div>
        </div>
      </div>
    </div>
  );
}
