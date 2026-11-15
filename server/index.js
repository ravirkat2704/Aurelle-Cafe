// Express API for AURELLE. Reuses the frontend validators so rules never drift.
import express from 'express';
import cors from 'cors';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { categories, menuItems } from '../src/data/menu.js';
import { validateBanquet, validateGeneral } from '../src/utilities/validators.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STORE = path.join(__dirname, 'storage', 'enquiries.json');
const PORT = process.env.PORT || 5000;
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || '';

fs.mkdirSync(path.dirname(STORE), { recursive: true });
const read = () => { try { return JSON.parse(fs.readFileSync(STORE, 'utf8')); } catch { return []; } };
const save = (type, data) => {
  const list = read();
  const rec = { id: `${type}-${Date.now()}`, type, status: 'new', receivedAt: new Date().toISOString(), ...data };
  list.push(rec); fs.writeFileSync(STORE, JSON.stringify(list, null, 2));
  return rec;
};

const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN || true }));
app.use(express.json({ limit: '50kb' }));

// Simple in-memory rate limit: 6 submissions per 10 minutes per IP.
const hits = new Map();
const limited = (req, res, next) => {
  const now = Date.now(); const ip = req.ip;
  const recent = (hits.get(ip) || []).filter((t) => now - t < 600000);
  if (recent.length >= 6) return res.status(429).json({ message: 'Too many enquiries. Please try again in a few minutes.' });
  recent.push(now); hits.set(ip, recent); next();
};

const clean = (o) => Object.fromEntries(Object.entries(o).filter(([k]) => !k.startsWith('_')).map(([k, v]) => [k, typeof v === 'string' ? v.trim().slice(0, 1500) : v]));
const spam = (b) => b._hp || (typeof b._t === 'number' && b._t < 2500);

const handler = (type, validate) => (req, res) => {
  const body = req.body || {};
  if (spam(body)) return res.json({ ok: true }); // silently drop bots
  const errors = validate(body);
  if (Object.keys(errors).length) return res.status(400).json({ message: 'Please check the highlighted fields.', errors });
  const rec = save(type, clean(body));
  res.status(201).json({ ok: true, id: rec.id });
};

app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.get('/api/menu', (_req, res) => res.json({ categories, items: menuItems }));
app.post('/api/enquiries/banquet', limited, handler('banquet', validateBanquet));
app.post('/api/enquiries/general', limited, handler('general', validateGeneral));
// Future admin panel hook: protected list of enquiries
app.get('/api/admin/enquiries', (req, res) => {
  if (!ADMIN_TOKEN || req.get('x-admin-token') !== ADMIN_TOKEN) return res.status(401).json({ message: 'Unauthorized' });
  res.json(read());
});

const dist = path.join(__dirname, '..', 'dist');
if (fs.existsSync(dist)) {
  app.use(express.static(dist));
  app.get('*', (_req, res) => res.sendFile(path.join(dist, 'index.html')));
}
app.listen(PORT, () => console.log(`AURELLE API listening on http://localhost:${PORT}`));
