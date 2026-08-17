#!/usr/bin/env node
/**
 * Rodada 3 — Fase 1: inventário e resgate de assets externos antes que o
 * cache de borda do horizons-cdn.hostinger.com expire.
 *
 * Varre src/ por URLs de horizons-cdn.hostinger.com e images.unsplash.com,
 * baixa cada uma (sem reprocessar, sem redimensionar) para public/images/,
 * e escreve um relatório de salvos/perdidos.
 *
 * Uso: node tools/rescue-assets.js
 */
import fs from 'fs';
import path from 'path';
import https from 'https';

const SRC_DIR = path.join(process.cwd(), 'src');
const OUT_DIR = path.join(process.cwd(), 'public', 'images');
const REPORT_PATH = path.join(process.cwd(), 'ASSET-RESCUE-REPORT.md');

const URL_REGEX = /https?:\/\/(horizons-cdn\.hostinger\.com|images\.unsplash\.com)[^\s"'`)]*/g;

// Pastas por contexto — inferido do caminho do arquivo/uso, revisado manualmente na tabela abaixo.
const FOLDER_BY_HASH = {
  '014e954008da73529bf64af84836449a': 'logo',
  faa01d8a359b777c0dc2d21d44247a96: 'sedes',
  ab65032a961095c518d48b853e209b80: 'sedes',
  b1b2d8106a728d0ff080224e88200cce: 'sedes',
  f5f043c89a996bb6b5b69885dc3db46d: 'sedes',
  af13c4f32b96d04d72f502f2d9764948: 'diretoria',
  '5d6a78fcbbbb041194681bbc01f81d4b': 'documentos',
  '91fb64d1d80f379f421a6044747657ff': 'sedes',
  a04952a95498c515fd9fccc0e389890a: 'sedes',
  dc8c1bff438b68e4a14ba224908f80d4: 'sedes',
  '01360390e6f7685cf75fc1ea4ba08f77': 'sedes',
  c8058177e375ab899b85ca4edcef0c6f: 'sedes',
  '4a51ee20f79638b5823592abe4c6ad9c': 'sedes',
  '1e63d9f0623b7c562dda01d349d1782a': 'sedes',
  b386bdc31e0129792e5164f807031996: 'sedes',
  ff04ad827be91b005a2a085b73c8dbc9: 'sedes',
  '5a54305beaf128eb430fe2c8aad7558a': 'sedes',
  b76c64f83164a42035077599bf770b6e: 'sedes',
  '163cec1448d5aeb0649c2cd5bdaf32cf': 'sedes',
  f9ad057a35869b7aa1081005b1c46606: 'sedes',
};

function findFiles(dir) {
  let out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out = out.concat(findFiles(full));
    else if (/\.(jsx?|tsx?)$/.test(entry.name)) out.push(full);
  }
  return out;
}

function scan() {
  const occurrences = []; // { url, file, line }
  for (const file of findFiles(SRC_DIR)) {
    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n');
    lines.forEach((lineText, idx) => {
      const matches = lineText.match(URL_REGEX);
      if (matches) {
        for (const url of matches) {
          occurrences.push({ url, file: path.relative(process.cwd(), file), line: idx + 1 });
        }
      }
    });
  }
  return occurrences;
}

function guessFolder(url) {
  if (url.includes('images.unsplash.com')) return 'unsplash-placeholder';
  const hashMatch = url.match(/([a-f0-9]{32,})\.[a-z]+$/i) || url.match(/\/([a-f0-9-]{20,})\/([a-f0-9]+)\.[a-z]+$/i);
  const hash = hashMatch ? hashMatch[hashMatch.length - 1] : null;
  if (hash && FOLDER_BY_HASH[hash]) return FOLDER_BY_HASH[hash];
  if (url.includes('/Parceiros') ) return 'parceiros';
  return 'diversos';
}

function extOf(url) {
  const clean = url.split('?')[0];
  const m = clean.match(/\.([a-zA-Z0-9]+)$/);
  return m ? m[1].toLowerCase() : 'jpg';
}

function fetchBinary(url, timeoutMs = 20000) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (rescue-script)' }, timeout: timeoutMs }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        return fetchBinary(res.headers.location, timeoutMs).then(resolve, reject);
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    });
    req.on('timeout', () => req.destroy(new Error('timeout')));
    req.on('error', reject);
  });
}

async function downloadWithRetries(url, attempts = 4, delayMs = 3000) {
  let lastErr;
  for (let i = 0; i < attempts; i++) {
    try {
      const buf = await fetchBinary(url);
      if (buf.length === 0) throw new Error('empty body');
      return buf;
    } catch (err) {
      lastErr = err;
      if (i < attempts - 1) await new Promise((r) => setTimeout(r, delayMs));
    }
  }
  throw lastErr;
}

async function main() {
  const occurrences = scan();
  const uniqueUrls = [...new Set(occurrences.map((o) => o.url))];

  console.log(`Encontradas ${occurrences.length} ocorrências, ${uniqueUrls.length} URLs únicas.\n`);

  const results = [];
  let counter = {};

  // concorrência baixa: sequencial, uma de cada vez
  for (const url of uniqueUrls) {
    const folder = guessFolder(url);
    const ext = extOf(url);
    const dir = path.join(OUT_DIR, folder);
    fs.mkdirSync(dir, { recursive: true });

    counter[folder] = (counter[folder] || 0) + 1;
    const hashMatch = url.match(/\/([a-zA-Z0-9]+)\.[a-zA-Z0-9]+$/) || url.match(/\/(photo-[a-zA-Z0-9-]+)$/);
    const baseName = hashMatch ? hashMatch[1] : `asset-${counter[folder]}`;
    const fileName = `${baseName}.${ext}`;
    const outPath = path.join(dir, fileName);

    process.stdout.write(`Baixando ${url} ... `);
    try {
      const buf = await downloadWithRetries(url);
      fs.writeFileSync(outPath, buf);
      console.log(`OK (${buf.length} bytes) -> public/images/${folder}/${fileName}`);
      results.push({ url, status: 'salvo', localPath: `/images/${folder}/${fileName}`, bytes: buf.length });
    } catch (err) {
      console.log(`FALHOU (${err.message})`);
      results.push({ url, status: 'perdido', error: err.message });
    }

    // pausa pequena entre downloads — concorrência baixa, não martelar o CDN
    await new Promise((r) => setTimeout(r, 400));
  }

  // relatório
  const saved = results.filter((r) => r.status === 'salvo');
  const lost = results.filter((r) => r.status === 'perdido');

  let report = `# Relatório de resgate de assets — ${new Date().toISOString()}\n\n`;
  report += `Ocorrências no código: ${occurrences.length}. URLs únicas: ${uniqueUrls.length}.\n\n`;
  report += `**Salvos: ${saved.length}. Perdidos: ${lost.length}.**\n\n`;

  report += `## Salvos\n\n| URL original | Caminho local | Tamanho |\n|---|---|---|\n`;
  for (const r of saved) {
    report += `| ${r.url} | \`${r.localPath}\` | ${r.bytes} bytes |\n`;
  }

  report += `\n## Perdidos\n\n| URL original | Erro |\n|---|---|\n`;
  for (const r of lost) {
    report += `| ${r.url} | ${r.error} |\n`;
  }

  report += `\n## Ocorrências no código (arquivo:linha por URL)\n\n`;
  for (const url of uniqueUrls) {
    const spots = occurrences.filter((o) => o.url === url).map((o) => `${o.file}:${o.line}`).join(', ');
    report += `- \`${url}\`\n  - ${spots}\n`;
  }

  fs.writeFileSync(REPORT_PATH, report, 'utf8');
  console.log(`\nRelatório escrito em ${REPORT_PATH}`);
  console.log(`Salvos: ${saved.length} | Perdidos: ${lost.length}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
