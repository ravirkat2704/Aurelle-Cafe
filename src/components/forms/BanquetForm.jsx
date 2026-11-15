import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Loader2, MessageCircle } from 'lucide-react';
import Field, { inputCls } from './Field';
import { eventTypes, spaces } from '@/data/banquet';
import { validateBanquet } from '@/utilities/validators';
import { submitBanquetEnquiry, isDemoMode } from '@/services/api';
import { buildWhatsAppLink } from '@/utilities/whatsapp';
import { useApp } from '@/context/AppContext';

const initial = { fullName: '', mobile: '', email: '', eventType: '', eventDate: '', guests: '', venue: '', budget: '', requirements: '', contact: 'Phone call' };
const contactMethods = ['Phone call', 'WhatsApp', 'Email'];

export default function BanquetForm() {
  const [params] = useSearchParams();
  const [v, setV] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [serverError, setServerError] = useState('');
  const startedAt = useRef(Date.now());
  const { play } = useApp();
  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    const e = params.get('event');
    if (e && eventTypes.includes(e)) setV((s) => ({ ...s, eventType: e }));
  }, [params]);

  const set = (k) => (e) => setV((s) => ({ ...s, [k]: e.target.value }));
  const blur = (k) => () => setErrors((er) => ({ ...er, [k]: validateBanquet(v)[k] }));

  const submit = async (e) => {
    e.preventDefault();
    if (status === 'loading') return;
    const errs = validateBanquet(v);
    setErrors(errs);
    if (Object.keys(errs).length) { setTimeout(() => document.querySelector('[aria-invalid="true"]')?.focus(), 0); return; }
    setStatus('loading'); setServerError('');
    try {
      const form = new FormData(e.target);
      await submitBanquetEnquiry({ ...v, _hp: form.get('website') || '', _t: Date.now() - startedAt.current });
      setStatus('success'); play('success');
    } catch (err) {
      setServerError(err.message || 'Something went wrong. Please try again or contact us on WhatsApp.');
      setStatus('error');
    }
  };

  const waText = `Hello AURELLE, I just sent a banquet enquiry for a ${v.eventType || 'celebration'} on ${v.eventDate || 'a date to be confirmed'} for about ${v.guests || '—'} guests. My name is ${v.fullName}.`;
  const props = (k) => ({ value: v[k], onChange: set(k), onBlur: blur(k), 'aria-invalid': errors[k] ? 'true' : undefined, className: inputCls('dark', errors[k]) });

  return (
    <div id="enquiry" className="scroll-mt-24">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div key="ok" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="border border-gold/40 p-10 text-center md:p-16" role="status">
            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.15 }} className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold text-espresso"><Check size={30} /></motion.span>
            <h3 className="display mt-8 text-4xl md:text-5xl">Thank you, {v.fullName.split(' ')[0]}.</h3>
            <p className="mx-auto mt-4 max-w-md font-serif text-xl text-cream/85">Your banquet enquiry has been received. Our team will contact you by {v.contact.toLowerCase()} to talk through your celebration.</p>
            {isDemoMode && <p className="mx-auto mt-4 max-w-md text-xs text-taupe">Demo mode: this enquiry was saved in this browser only. Real enquiries need the backend deployed (see README).</p>}
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a href={buildWhatsAppLink(waText)} target="_blank" rel="noreferrer" className="btn btn-gold"><MessageCircle size={15} /> Continue on WhatsApp</a>
              <button onClick={() => { setV(initial); setStatus('idle'); startedAt.current = Date.now(); }} className="btn btn-outline">Send another enquiry</button>
            </div>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={submit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-x-10 gap-y-7 md:grid-cols-2" aria-label="Banquet enquiry form">
            <Field tone="dark" label="Full name" required error={errors.fullName}><input {...props('fullName')} autoComplete="name" placeholder="Your name" /></Field>
            <Field tone="dark" label="Mobile number" required error={errors.mobile}><input {...props('mobile')} type="tel" inputMode="tel" autoComplete="tel" placeholder="+91 98765 43210" /></Field>
            <Field tone="dark" label="Email address" required error={errors.email}><input {...props('email')} type="email" autoComplete="email" placeholder="you@example.com" /></Field>
            <Field tone="dark" label="Event type" required error={errors.eventType}>
              <select {...props('eventType')}><option value="">Select an event</option>{eventTypes.map((t) => <option key={t}>{t}</option>)}</select>
            </Field>
            <Field tone="dark" label="Preferred event date" required error={errors.eventDate}><input {...props('eventDate')} type="date" min={today} /></Field>
            <Field tone="dark" label="Expected guests" required error={errors.guests}><input {...props('guests')} type="number" min="1" max="5000" inputMode="numeric" placeholder="e.g. 40" /></Field>
            {spaces.length > 1 && (
              <Field tone="dark" label="Preferred venue or space" error={errors.venue}>
                <select {...props('venue')}><option value="">No preference</option>{spaces.map((s) => <option key={s.id}>{s.name}</option>)}</select>
              </Field>
            )}
            <Field tone="dark" label="Approximate budget" error={errors.budget}><input {...props('budget')} placeholder="e.g. ₹50,000 – ₹1,00,000" /></Field>
            <Field tone="dark" label="Additional requirements" error={errors.requirements} className="md:col-span-2"><textarea {...props('requirements')} rows={3} placeholder="Decoration ideas, dietary needs, timings…" /></Field>

            <fieldset className="md:col-span-2">
              <legend className="mb-3 text-[0.68rem] uppercase tracking-[0.22em] text-gold">Preferred contact method *</legend>
              <div className="flex flex-wrap gap-3">
                {contactMethods.map((m) => (
                  <label key={m} className={`cursor-pointer border px-5 py-2.5 text-sm transition ${v.contact === m ? 'border-gold bg-gold text-espresso' : 'border-ivory/25 text-ivory hover:border-gold'}`}>
                    <input type="radio" name="contact" value={m} checked={v.contact === m} onChange={set('contact')} className="sr-only" />{m}
                  </label>
                ))}
              </div>
              {errors.contact && <p role="alert" className="mt-1 text-xs text-red-400">{errors.contact}</p>}
            </fieldset>

            {/* Honeypot: hidden from people, tempting to bots */}
            <div className="absolute -left-[9999px]" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>

            <div className="md:col-span-2">
              {status === 'error' && <p role="alert" className="mb-4 border border-red-400/50 bg-red-950/30 p-4 text-sm text-red-200">{serverError}</p>}
              <button type="submit" disabled={status === 'loading'} className="btn btn-gold w-full md:w-auto">
                {status === 'loading' ? (<><Loader2 size={16} className="animate-spin" /> Sending…</>) : 'Send Banquet Enquiry'}
              </button>
              {isDemoMode && <p className="mt-3 text-xs text-taupe">Demo mode: enquiries are stored in this browser only until the backend is deployed.</p>}
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
