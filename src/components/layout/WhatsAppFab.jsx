import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { buildWhatsAppLink, waMessages } from '@/utilities/whatsapp';
import { useApp } from '@/context/AppContext';

const options = [
  { label: 'General enquiry', msg: waMessages.general },
  { label: 'Banquet enquiry', msg: waMessages.banquet },
  { label: 'Menu enquiry', msg: waMessages.menu },
];

export default function WhatsAppFab() {
  const [open, setOpen] = useState(false);
  const { play } = useApp();
  return (
    <div className="fixed bottom-5 right-5 z-[70] flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 12, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.96 }} className="w-60 border border-gold/30 bg-espresso p-4 text-ivory shadow-2xl">
            <p className="eyebrow">Chat on WhatsApp</p>
            <ul className="mt-3 divide-y divide-ivory/10">
              {options.map((o) => (
                <li key={o.label}><a href={buildWhatsAppLink(o.msg)} target="_blank" rel="noreferrer" onClick={() => play('click')} className="block py-3 text-sm transition hover:text-gold">{o.label}</a></li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      <button onClick={() => { setOpen((v) => !v); play('click'); }} aria-label={open ? 'Close WhatsApp options' : 'Open WhatsApp options'} aria-expanded={open} className="grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl transition hover:scale-105">
        {open ? <X size={24} /> : <MessageCircle size={26} />}
      </button>
    </div>
  );
}
