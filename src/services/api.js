// API service layer. Runs in DEMO mode (browser localStorage) until VITE_API_MODE=live and the Express server is deployed.
import { categories, menuItems } from '../data/menu.js';

const MODE = import.meta.env.VITE_API_MODE || 'demo';
const BASE = import.meta.env.VITE_API_URL || '/api';
export const isDemoMode = MODE !== 'live';

async function post(path, payload) {
  if (!isDemoMode) {
    const res = await fetch(`${BASE}${path}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.message || 'We could not send your enquiry. Please try again.');
    return data;
  }
  await new Promise((r) => setTimeout(r, 1100));
  const id = `demo-${Date.now()}`;
  try {
    const key = 'aurelle_demo_enquiries';
    const list = JSON.parse(localStorage.getItem(key) || '[]');
    list.push({ ...payload, id, receivedAt: new Date().toISOString() });
    localStorage.setItem(key, JSON.stringify(list));
  } catch { /* storage unavailable: still resolve for the demo */ }
  return { ok: true, demo: true, id };
}

export const submitBanquetEnquiry = (payload) => post('/enquiries/banquet', payload);
export const submitGeneralEnquiry = (payload) => post('/enquiries/general', payload);

// Content endpoints are ready to swap for real API calls (admin panel later). For now they read local data.
export const getMenu = async () => ({ categories, items: menuItems });
