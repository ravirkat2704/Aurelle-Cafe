import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';

const Ctx = createContext(null);
export const useApp = () => useContext(Ctx);

export function AppProvider({ children }) {
  const [soundOn, setSoundOn] = useState(() => { try { return localStorage.getItem('aurelle_sound') === '1'; } catch { return false; } });
  const [introDone, setIntroDone] = useState(() => { try { return sessionStorage.getItem('aurelle_intro') === '1'; } catch { return false; } });
  const ac = useRef(null);

  // Tiny synthesized sounds: OFF by default, never autoplay, only after the visitor turns sound on.
  const play = useCallback((name) => {
    if (!soundOn) return;
    try {
      if (!ac.current) ac.current = new (window.AudioContext || window.webkitAudioContext)();
      const c = ac.current;
      if (c.state === 'suspended') c.resume();
      const t = c.currentTime;
      const beep = (f, start, dur, type = 'sine', vol = 0.035) => {
        const o = c.createOscillator(); const g = c.createGain();
        o.type = type; o.frequency.value = f;
        g.gain.setValueAtTime(0.0001, t + start);
        g.gain.linearRampToValueAtTime(vol, t + start + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, t + start + dur);
        o.connect(g).connect(c.destination); o.start(t + start); o.stop(t + start + dur + 0.02);
      };
      if (name === 'open') { beep(520, 0, 0.09); beep(780, 0.07, 0.12); }
      else if (name === 'close') { beep(520, 0, 0.08); beep(390, 0.06, 0.1); }
      else if (name === 'flip') beep(180, 0, 0.18, 'triangle', 0.03);
      else if (name === 'success') [523, 659, 784].forEach((f, i) => beep(f, i * 0.09, 0.25));
      else beep(640, 0, 0.06);
    } catch { /* audio unsupported */ }
  }, [soundOn]);

  const toggleSound = useCallback(() => setSoundOn((v) => {
    const n = !v; try { localStorage.setItem('aurelle_sound', n ? '1' : '0'); } catch { /* ignore */ } return n;
  }), []);
  const finishIntro = useCallback(() => { try { sessionStorage.setItem('aurelle_intro', '1'); } catch { /* ignore */ } setIntroDone(true); }, []);

  const value = useMemo(() => ({ soundOn, toggleSound, play, introDone, finishIntro }), [soundOn, toggleSound, play, introDone, finishIntro]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
