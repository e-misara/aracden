#!/usr/bin/env node
/**
 * scripts/import-prices.cjs
 *
 * Manuel CSV/JSON dosyalarındaki fiyat ilanlarını production'daki
 * /api/admin/import-prices endpoint'ine POST eder. Yerelden Neon'a doğrudan
 * bağlantı ECONNRESET veriyor; server-side import daha sağlam.
 *
 * .env'de ADMIN_IMPORT_KEY olmalı (Vercel env'inde de aynısı tanımlı olmalı).
 *
 * Kullanım:
 *   npm run import-prices                    # production'a gönder
 *   ARACDEN_BASE=http://localhost:3000 ...   # local dev server'a
 *   npm run import-prices -- --dry-run       # parse et, hiçbir şey gönderme
 */

require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") });
const { readdirSync, readFileSync, existsSync } = require("fs");
const { join, extname } = require("path");

const BASE = process.env.ARACDEN_BASE || "https://aracden.vercel.app";
const ADMIN_KEY = process.env.ADMIN_IMPORT_KEY;
const BATCH_SIZE = 500;

const SOURCES = [
  { dir: "/Users/GAC-A/andmcetin-data/prices/manual", ulke: "TR" },
  { dir: "/Users/GAC-A/andmcetin-data/mobile-de/raw", ulke: "DE" },
];

function intOrNull(v) {
  if (v == null || v === "") return null;
  const n = parseInt(String(v).replace(/[^\d-]/g, ""));
  return isNaN(n) ? null : n;
}

function parseCsv(text) {
  const lines = text.split(/\r?\n/).filter((l) => l.trim() && !l.startsWith("#"));
  if (lines.length < 2) return [];
  const headers = lines[0].split(",").map((h) => h.trim());
  return lines.slice(1).map((line) => {
    const fields = [];
    let cur = "", inQuotes = false;
    for (const ch of line) {
      if (ch === '"') { inQuotes = !inQuotes; continue; }
      if (ch === "," && !inQuotes) { fields.push(cur.trim()); cur = ""; continue; }
      cur += ch;
    }
    fields.push(cur.trim());
    const obj = {};
    headers.forEach((h, i) => { obj[h] = fields[i] ?? ""; });
    return {
      marka: obj.marka,
      model: obj.model,
      yil: intOrNull(obj.yil),
      km: intOrNull(obj.km),
      fiyat_tl: intOrNull(obj.fiyat_tl),
      fiyat_eur: intOrNull(obj.fiyat_eur),
      motor: obj.motor || null,
      guc_hp: intOrNull(obj.guc_hp),
      vites: obj.vites || null,
      yakit: obj.yakit || null,
      kasa: obj.kasa || null,
      renk: obj.renk || null,
      sehir: obj.sehir || null,
      ulke: obj.ulke || null,
      kaynak: obj.kaynak || null,
      ilan_url: obj.ilan_url || null,
      ilan_tarih: obj.ilan_tarih || null,
    };
  });
}

(async function main() {
  const dry = process.argv.includes("--dry-run");

  if (!dry && !ADMIN_KEY) {
    console.error("⛔ ADMIN_IMPORT_KEY .env'de yok. Önce ekle ve Vercel env'ine de tanımla.");
    process.exit(1);
  }

  const allRows = [];
  for (const src of SOURCES) {
    if (!existsSync(src.dir)) { console.log(`(yok, atlandı): ${src.dir}`); continue; }
    const files = readdirSync(src.dir).filter((f) => /\.(csv|json)$/i.test(f) && !f.startsWith("_"));
    if (files.length === 0) { console.log(`(boş): ${src.dir}`); continue; }
    for (const file of files) {
      const path = join(src.dir, file);
      const text = readFileSync(path, "utf-8");
      const rows = extname(file).toLowerCase() === ".json" ? JSON.parse(text) : parseCsv(text);
      for (const r of rows) {
        if (!r.ulke) r.ulke = src.ulke;
      }
      console.log(`  ${file}: ${rows.length} satır`);
      allRows.push(...rows);
    }
  }

  console.log(`\nToplam ${allRows.length} satır toplandı.`);
  if (dry) {
    console.log("DRY-RUN — gönderme atlandı.");
    return;
  }
  if (allRows.length === 0) {
    console.log("Gönderecek satır yok.");
    return;
  }

  let totalInserted = 0, totalDup = 0, totalInvalid = 0;
  for (let i = 0; i < allRows.length; i += BATCH_SIZE) {
    const batch = allRows.slice(i, i + BATCH_SIZE);
    process.stdout.write(`  POST ${i + 1}-${i + batch.length}/${allRows.length}... `);
    const res = await fetch(`${BASE}/api/admin/import-prices`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ adminKey: ADMIN_KEY, rows: batch }),
    });
    const data = await res.json();
    if (!res.ok) {
      console.error("FAIL:", data);
      process.exit(1);
    }
    totalInserted += data.inserted;
    totalDup += data.skipped_duplicate;
    totalInvalid += data.skipped_invalid;
    console.log(`${data.inserted} ✓ / ${data.skipped_duplicate} dup / ${data.skipped_invalid} skip`);
  }

  console.log(`\nTOPLAM: ${totalInserted} eklendi, ${totalDup} duplicate, ${totalInvalid} geçersiz.`);
})().catch((e) => { console.error(e); process.exit(1); });
