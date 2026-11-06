// Przepisuje bazę z aplikacji Claude (eksport ArtifactData) na pliki w repozytorium.
// Użycie: node narzedzia/sync-z-claude.mjs <katalog-eksportu>
// <katalog-eksportu>/categories/*.json i <katalog-eksportu>/entries/*.json
// Baza w Claude jest źródłem prawdy: wpisy usunięte tam są usuwane także tutaj.
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const exp = process.argv[2];
if (!exp) { console.error("Podaj katalog eksportu"); process.exit(1); }
const readDir = (d) => fs.existsSync(d) ? fs.readdirSync(d).filter((f) => f.endsWith(".json")).map((f) => ({ id: f.slice(0, -5), ...JSON.parse(fs.readFileSync(path.join(d, f), "utf8")) })) : [];

const cats = readDir(path.join(exp, "categories"));
const entries = readDir(path.join(exp, "entries"));
if (!cats.length) { console.error("Eksport nie zawiera kategorii: przerywam, żeby nie skasować bazy."); process.exit(1); }

const catJson = cats.sort((a, b) => (a.order ?? 99) - (b.order ?? 99) || a.name.localeCompare(b.name, "pl"))
  .map((c) => ({ id: c.id, name: c.name, opis: c.desc || "", kolor: c.hue ?? 220 }));
fs.writeFileSync(path.join(ROOT, "kategorie.json"), JSON.stringify(catJson, null, 2) + "\n");

const KINDS = ["notatka", "kurs", "zasob", "prompt", "skill", "narzedzie"];
const wanted = new Set();
const catIds = new Set(catJson.map((c) => c.id));
for (const e of entries) {
  const category = catIds.has(e.category) ? e.category : catJson[0].id;
  const file = path.join(ROOT, "wpisy", category, e.id + ".md");
  wanted.add(file);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const added = new Date(e.createdAt || Date.now()).toISOString().slice(0, 10);
  const url = /^https?:\/\//.test(e.url || "") ? e.url : "";
  const fm = ["---",
    `tytul: ${JSON.stringify(e.title || "Bez tytułu")}`,
    `rodzaj: ${KINDS.includes(e.kind) ? e.kind : "notatka"}`,
    `streszczenie: ${JSON.stringify(e.summary || "")}`,
    `link: ${JSON.stringify(url)}`,
    `tagi: ${JSON.stringify(Array.isArray(e.tags) ? e.tags : [])}`,
    `dodano: ${added}`, "---", ""].join("\n");
  const content = fm + String(e.body || "").trim() + "\n";
  if (!fs.existsSync(file) || fs.readFileSync(file, "utf8") !== content) fs.writeFileSync(file, content);
}

// Usuń pliki wpisów, których nie ma już w Claude, i puste foldery.
const wpisy = path.join(ROOT, "wpisy");
let removed = 0;
for (const d of fs.existsSync(wpisy) ? fs.readdirSync(wpisy) : []) {
  const dir = path.join(wpisy, d);
  if (!fs.statSync(dir).isDirectory()) continue;
  for (const f of fs.readdirSync(dir)) if (f.endsWith(".md") && !wanted.has(path.join(dir, f))) { fs.rmSync(path.join(dir, f)); removed++; }
  if (!fs.readdirSync(dir).length) fs.rmdirSync(dir);
}
console.log(`Zsynchronizowano: ${catJson.length} kategorii, ${entries.length} wpisów, usunięto ${removed}.`);
