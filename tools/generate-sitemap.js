#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://secabc.org.br';

const STATIC_ROUTES = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/o-sindicato', priority: '0.7', changefreq: 'monthly' },
  { path: '/sedes-regionais', priority: '0.8', changefreq: 'monthly' },
  { path: '/beneficios', priority: '0.8', changefreq: 'monthly' },
  { path: '/servicos', priority: '0.8', changefreq: 'monthly' },
  { path: '/parceiros', priority: '0.6', changefreq: 'monthly' },
  { path: '/noticias', priority: '0.8', changefreq: 'daily' },
  { path: '/contato', priority: '0.6', changefreq: 'yearly' },
  { path: '/politica-de-privacidade', priority: '0.3', changefreq: 'yearly' },
  { path: '/lgpd', priority: '0.3', changefreq: 'yearly' },
];

const SEDE_SLUGS = ['maua', 'sao-caetano', 'sao-bernardo', 'diadema'];

const BENEFICIO_SLUGS = [
  'centro-de-lazer',
  'juridico',
  'medico',
  'odontologia',
  'previdenciario',
  'convenios',
  'kit-escolar',
  'colonias-de-ferias',
  'ecoblue-resort',
];

const SERVICO_SLUGS = ['homologacoes', 'carteirinha', 'atualizar-cadastro'];

function getNoticiaSlugs() {
  const noticiasPath = path.join(process.cwd(), 'src', 'data', 'noticias.jsx');
  if (!fs.existsSync(noticiasPath)) return [];

  const content = fs.readFileSync(noticiasPath, 'utf8');
  const slugMatches = [...content.matchAll(/slug:\s*["']([^"']+)["']/g)];
  return slugMatches.map((m) => m[1]);
}

function buildUrlEntry(loc, lastmod, changefreq, priority) {
  return `  <url>\n    <loc>${SITE_URL}${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}

function main() {
  const lastmod = new Date().toISOString().slice(0, 10);
  const entries = [];

  for (const route of STATIC_ROUTES) {
    entries.push(buildUrlEntry(route.path, lastmod, route.changefreq, route.priority));
  }

  for (const slug of SEDE_SLUGS) {
    entries.push(buildUrlEntry(`/sedes-regionais/${slug}`, lastmod, 'monthly', '0.6'));
  }

  for (const slug of BENEFICIO_SLUGS) {
    entries.push(buildUrlEntry(`/beneficios/${slug}`, lastmod, 'monthly', '0.6'));
  }

  for (const slug of SERVICO_SLUGS) {
    entries.push(buildUrlEntry(`/servicos/${slug}`, lastmod, 'monthly', '0.6'));
  }

  for (const slug of getNoticiaSlugs()) {
    entries.push(buildUrlEntry(`/noticias/${slug}`, lastmod, 'monthly', '0.7'));
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>\n`;

  const outputPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  fs.writeFileSync(outputPath, xml, 'utf8');
}

main();
