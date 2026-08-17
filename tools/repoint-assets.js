#!/usr/bin/env node
/**
 * Rodada 3 — Fase 2: substitui toda referência externa (horizons-cdn,
 * unsplash) pelo caminho local correspondente — o arquivo resgatado na
 * Fase 1, ou o placeholder da marca quando não houve resgate possível.
 *
 * Uso: node tools/repoint-assets.js
 */
import fs from 'fs';
import path from 'path';

const SRC_DIR = path.join(process.cwd(), 'src');
const IMAGES_DIR = path.join(process.cwd(), 'public', 'images');
const PLACEHOLDER = '/images/placeholder.svg';

const URL_REGEX = /https?:\/\/(horizons-cdn\.hostinger\.com|images\.unsplash\.com)[^\s"'`)]*/g;

function findFiles(dir) {
  let out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out = out.concat(findFiles(full));
    else if (/\.(jsx?|tsx?)$/.test(entry.name)) out.push(full);
  }
  return out;
}

function findLocalImages(dir) {
  let out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out = out.concat(findLocalImages(full));
    else out.push(full);
  }
  return out;
}

function main() {
  const files = findFiles(SRC_DIR);
  const localImages = findLocalImages(IMAGES_DIR);

  // mapa: basename sem extensão (o hash/id) -> caminho público
  const byBaseName = {};
  for (const imgPath of localImages) {
    const base = path.basename(imgPath, path.extname(imgPath));
    byBaseName[base] = '/' + path.relative(path.join(process.cwd(), 'public'), imgPath);
  }

  const allUrls = new Set();
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const matches = content.match(URL_REGEX) || [];
    matches.forEach((u) => allUrls.add(u));
  }

  const mapping = {}; // url -> local path
  for (const url of allUrls) {
    const hashMatch = url.match(/\/([a-zA-Z0-9-]+)\.[a-zA-Z0-9]+$/) || url.match(/\/(photo-[a-zA-Z0-9-]+)$/);
    const base = hashMatch ? hashMatch[1] : null;
    if (base && byBaseName[base]) {
      mapping[url] = byBaseName[base];
    } else {
      mapping[url] = PLACEHOLDER;
    }
  }

  let totalReplacements = 0;
  const perFile = {};

  for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    let fileReplacements = 0;
    for (const [url, localPath] of Object.entries(mapping)) {
      const escaped = url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const re = new RegExp(escaped, 'g');
      const count = (content.match(re) || []).length;
      if (count > 0) {
        content = content.replace(re, localPath);
        fileReplacements += count;
      }
    }
    if (fileReplacements > 0) {
      fs.writeFileSync(file, content, 'utf8');
      perFile[path.relative(process.cwd(), file)] = fileReplacements;
      totalReplacements += fileReplacements;
    }
  }

  console.log('Mapeamento URL -> local:');
  for (const [url, localPath] of Object.entries(mapping)) {
    console.log(`  ${localPath === PLACEHOLDER ? '[placeholder]' : '[resgatado]  '} ${url} -> ${localPath}`);
  }
  console.log(`\nArquivos alterados:`);
  for (const [file, count] of Object.entries(perFile)) {
    console.log(`  ${file}: ${count} substituições`);
  }
  console.log(`\nTotal: ${totalReplacements} substituições em ${Object.keys(perFile).length} arquivos.`);
}

main();
