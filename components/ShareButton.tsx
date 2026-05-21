"use client";

import { useState } from "react";

interface ShareButtonProps {
  text: string;          // "VW Golf hakkında 127 kişinin..."
  url: string;           // relative veya tam URL
  twitterText?: string;  // hashtag dahil özel metin
  className?: string;
}

const BASE = "https://aracden.vercel.app";

export default function ShareButton({ text, url, twitterText, className }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const fullUrl = url.startsWith("http") ? url : `${BASE}${url}`;
  const waText = encodeURIComponent(`${text}\n${fullUrl}`);
  const twText = encodeURIComponent(`${twitterText ?? text} ${fullUrl}`);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <div className={`flex items-center gap-1.5 ${className ?? ""}`}>
      <a
        href={`https://wa.me/?text=${waText}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366]/20 text-[#25D366] rounded-md text-xs font-semibold transition-colors"
        aria-label="WhatsApp'ta paylaş"
      >
        <span>📱</span>
        <span className="hidden sm:inline">WhatsApp</span>
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${twText}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0090ff]/10 border border-[#0090ff]/30 hover:bg-[#0090ff]/20 text-[#0090ff] rounded-md text-xs font-semibold transition-colors"
        aria-label="Twitter'da paylaş"
      >
        <span>🐦</span>
        <span className="hidden sm:inline">Twitter</span>
      </a>
      <button
        onClick={copy}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 border rounded-md text-xs font-semibold transition-colors ${
          copied
            ? "bg-[#00d68f]/10 border-[#00d68f]/30 text-[#00d68f]"
            : "bg-[#1a1a26] border-[#2e2e4e] hover:bg-[#1e1e2e] text-[#8b8b9e]"
        }`}
        aria-label="Bağlantıyı kopyala"
      >
        <span>{copied ? "✓" : "📋"}</span>
        <span className="hidden sm:inline">{copied ? "Kopyalandı" : "Kopyala"}</span>
      </button>
    </div>
  );
}
