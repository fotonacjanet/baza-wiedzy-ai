// Buduje stronę: wpisy/**/*.md + kategorie.json -> dist/ (index.html, data.json, PWA).
// Uruchom: node build.mjs   (bez zależności, wystarczy Node 18+)
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const ROOT = path.dirname(new URL(import.meta.url).pathname);
const KINDS = ["notatka", "kurs", "zasob", "prompt", "skill", "narzedzie"];
const errors = [];

const cats = JSON.parse(fs.readFileSync(path.join(ROOT, "kategorie.json"), "utf8"));
const catIds = new Set(cats.map((c) => c.id));

function parseFrontmatter(src, file) {
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) { errors.push(`${file}: brak nagłówka --- ... ---`); return null; }
  const meta = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z_]+):\s*(.*)$/);
    if (!kv) continue;
    let v = kv[2].trim();
    if (/^["[]/.test(v)) { try { v = JSON.parse(v); } catch { errors.push(`${file}: niepoprawna wartość pola ${kv[1]}`); } }
    meta[kv[1]] = v;
  }
  return { meta, body: m[2].trim() };
}

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) =>
    d.isDirectory() ? walk(path.join(dir, d.name)) : d.name.endsWith(".md") ? [path.join(dir, d.name)] : []);
}

const entries = [];
const seen = new Set();
for (const file of walk(path.join(ROOT, "wpisy"))) {
  const rel = path.relative(ROOT, file);
  const parsed = parseFrontmatter(fs.readFileSync(file, "utf8"), rel);
  if (!parsed) continue;
  const { meta, body } = parsed;
  const category = path.basename(path.dirname(file));
  const id = path.basename(file, ".md");
  if (!catIds.has(category)) errors.push(`${rel}: folder "${category}" nie jest kategorią z kategorie.json`);
  if (!meta.tytul) errors.push(`${rel}: brak pola tytul`);
  if (!KINDS.includes(meta.rodzaj)) errors.push(`${rel}: rodzaj musi być jednym z: ${KINDS.join(", ")}`);
  if (meta.link && !/^https?:\/\//.test(meta.link)) errors.push(`${rel}: link musi zaczynać się od http(s)://`);
  if (seen.has(id)) errors.push(`${rel}: powtórzona nazwa pliku "${id}"`);
  seen.add(id);
  entries.push({
    id, category, title: meta.tytul, kind: meta.rodzaj, summary: meta.streszczenie || "",
    url: meta.link || "", tags: Array.isArray(meta.tagi) ? meta.tagi : [], added: meta.dodano || "", body,
  });
}

if (errors.length) { console.error("Błędy w bazie:\n- " + errors.join("\n- ")); process.exit(1); }

entries.sort((a, b) => (b.added || "").localeCompare(a.added || "") || a.title.localeCompare(b.title, "pl"));
const data = JSON.stringify({ categories: cats, entries, builtAt: new Date().toISOString() });

const DIST = path.join(ROOT, "dist");
fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST);
for (const f of fs.readdirSync(path.join(ROOT, "site"))) fs.copyFileSync(path.join(ROOT, "site", f), path.join(DIST, f));
fs.writeFileSync(path.join(DIST, "data.json"), data);
const version = crypto.createHash("sha1").update(data + fs.readFileSync(path.join(ROOT, "site", "index.html"))).digest("hex").slice(0, 10);
const sw = path.join(DIST, "sw.js");
fs.writeFileSync(sw, fs.readFileSync(sw, "utf8").replace("__VERSION__", version));
fs.writeFileSync(path.join(DIST, ".nojekyll"), "");
console.log(`OK: ${entries.length} wpisów w ${cats.length} kategoriach -> dist/ (wersja ${version})`);
