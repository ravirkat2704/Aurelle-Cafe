import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

const Ctx = createContext(null);
export const useApp = () => useContext(Ctx);

const FWD = [1, 3, 5, 7];   // clips used when turning forward
const BACK = [2, 4, 6, 8];  // clips used when turning back
const VOLUME = 0.7;         // lower for quieter (e.g. 0.45). Ignored by iPhones.

export function AppProvider({ children }) {
  const [soundOn, setSoundOn] = useState(() => { try { return localStorage.getItem('aurelle_sound') === '1'; } catch { return false; } });
  const [introDone, setIntroDone] = useState(() => { try { return sessionStorage.getItem('aurelle_intro') === '1'; } catch { return false; } });
  const ac = useRef(null);
  const clips = useRef({ fwd: [], back: [], ready: false, last: { fwd: -1, back: -1 } });

  const getCtx = useCallback(() => {
    if (!ac.current) ac.current = new (window.AudioContext || window.webkitAudioContext)();
    if (ac.current.state === 'suspended') ac.current.resume();
    return ac.current;
  }, []);

  // Real recordings played with plain <audio> elements (most reliable across browsers).
  const preload = useCallback(() => {
    if (clips.current.ready) return;
    clips.current.ready = true;
    const make = (n) => {
      const a = new Audio(`/media/sfx/page-${n}.mp3`);
      a.preload = 'auto';
      a.addEventListener('error', () => console.warn('[AURELLE] page sound file not found:', a.src));
      a.load();
      return a;
    };
    clips.current.fwd = FWD.map(make);
    clips.current.back = BACK.map(make);
  }, []);

  useEffect(() => { if (soundOn) preload(); }, [soundOn, preload]);

  // Backup only: used if the mp3 files are missing or blocked.
  const synthPaper = useCallback((fwd) => {
    try {
      const c = getCtx(); const t = c.currentTime;
      const len = Math.floor(c.sampleRate * 0.5);
      const buf = c.createBuffer(1, len, c.sampleRate); const d = buf.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.random();
      const s = c.createBufferSource(); s.buffer = buf;
      const bp = c.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = fwd ? 3200 : 2400; bp.Q.value = 0.5;
      const g = c.createGain();
      g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.15, t + 0.06); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.45);
      s.connect(bp).connect(g).connect(c.destination); s.start(t);
    } catch { /* ignore */ }
  }, [getCtx]);

  const pageTurn = useCallback((dir) => {
    const list = clips.current[dir];
    if (!list.length) { preload(); synthPaper(dir === 'fwd'); return; }
    let i = Math.floor(Math.random() * list.length);
    if (list.length > 1 && i === clips.current.last[dir]) i = (i + 1) % list.length;
    clips.current.last[dir] = i;
    const a = list[i].cloneNode(true);
    a.volume = VOLUME;
    a.playbackRate = (dir === 'fwd' ? 1 : 1.06) * (0.95 + Math.random() * 0.1);
    a.play().catch((e) => { console.warn('[AURELLE] page sound failed, using backup:', e?.message || e); synthPaper(dir === 'fwd'); });
  }, [preload, synthPaper]);

  const sound = useCallback((name) => {
    if (name === 'flip') return pageTurn('fwd');
    if (name === 'flipBack') return pageTurn('back');
    try {
      const c = getCtx(); const t = c.currentTime;
      const beep = (f, start, dur, vol = 0.035) => {
        const o = c.createOscillator(); const g = c.createGain();
        o.type = 'sine'; o.frequency.value = f;
        g.gain.setValueAtTime(0.0001, t + start);
        g.gain.linearRampToValueAtTime(vol, t + start + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, t + start + dur);
        o.connect(g).connect(c.destination); o.start(t + start); o.stop(t + start + dur + 0.02);
      };
      if (name === 'open') { beep(520, 0, 0.09); beep(780, 0.07, 0.12); }
      else if (name === 'close') { beep(520, 0, 0.08); beep(390, 0.06, 0.1); }
      else if (name === 'success') [523, 659, 784].forEach((f, i) => beep(f, i * 0.09, 0.25));
      else beep(640, 0, 0.06);
    } catch { /* audio unsupported */ }
    return undefined;
  }, [getCtx, pageTurn]);

  // Sound is OFF by default and only plays after the visitor turns it on.
  const play = useCallback((name) => { if (soundOn) sound(name); }, [soundOn, sound]);

  const toggleSound = useCallback(() => {
    const n = !soundOn;
    try { localStorage.setItem('aurelle_sound', n ? '1' : '0'); } catch { /* ignore */ }
    setSoundOn(n);
    if (n) { preload(); sound('flip'); }
  }, [soundOn, sound, preload]);

  const finishIntro = useCallback(() => { try { sessionStorage.setItem('aurelle_intro', '1'); } catch { /* ignore */ } setIntroDone(true); }, []);

  const value = useMemo(() => ({ soundOn, toggleSound, play, introDone, finishIntro }), [soundOn, toggleSound, play, introDone, finishIntro]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}