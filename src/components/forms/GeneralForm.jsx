import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';
import Field, { inputCls } from './Field';
import { validateGeneral } from '@/utilities/validators';
import { submitGeneralEnquiry, isDemoMode } from '@/services/api';
import { useApp } from '@/context/AppContext';

const types = ['General enquiry', 'Food and menu enquiry', 'Banquet enquiry', 'Event-related enquiry', 'Other'];
const initial = { fullName: '', mobile: '', email: '', enquiryType: '', message: '' };

export default function GeneralForm() {
  const [v, setV] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [serverError, setServerError] = useState('');
  const startedAt = useRef(Date.now());
  const { play } = useApp();
  const set = (k) => (e) => setV((s) => ({ ...s, [k]: e.target.value }));
  const props = (k) => ({ value: v[k], onChange: set(k), onBlur: () => setErrors((er) => ({ ...er, [k]: validateGeneral(v)[k] })), 'aria-invalid': errors[k] ? 'true' : undefined, className: inputCls('light', errors[k]) });

  const submit = async (e) => {
    e.preventDefault();
    if (status === 'loading') return;
    const errs = validateGeneral(v); setErrors(errs);
    if (Object.keys(errs).length) { setTimeout(() => document.querySelector('[aria-invalid="true"]')?.focus(), 0); return; }
    setStatus('loading'); setServerError('');
    try {
      await submitGeneralEnquiry({ ...v, _hp: new FormData(e.target).get('website') || '', _t: Date.now() - startedAt.current });
      setStatus('success'); play('success');
    } catch (err) { setServerError(err.message || 'Something went wrong. Please try again.'); setStatus('error'); }
  };

  return (
    <AnimatePresence mode="wait">
      {status === 'success' ? (
        <motion.div key="ok" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="border border-espresso/15 p-10 text-center" role="status">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-espresso text-gold"><Check size={26} /></span>
          <h3 className="mt-6 font-serif text-3xl">Message received.</h3>
          <p className="mt-3 text-coffee">Thank you, {v.fullName.split(' ')[0]}. We will get back to you shortly.</p>
          {isDemoMode && <p className="mt-3 text-xs text-taupe">Demo mode: saved in this browser only.</p>}
          <button onClick={() => { setV(initial); setStatus('idle'); }} className="btn btn-line mt-6">Send another message</button>
        </motion.div>
      ) : (
        <motion.form key="form" onSubmit={submit} noValidate className="grid gap-7" aria-label="General enquiry form">
          <Field label="Full name" required error={errors.fullName}><input {...props('fullName')} autoComplete="name" /></Field>
          <div className="grid gap-7 md:grid-cols-2">
            <Field label="Mobile number" required error={errors.mobile}><input {...props('mobile')} type="tel" inputMode="tel" autoComplete="tel" /></Field>
            <Field label="Email" error={errors.email}><input {...props('email')} type="email" autoComplete="email" /></Field>
          </div>
          <Field label="Enquiry type" required error={errors.enquiryType}><select {...props('enquiryType')}><option value="">Select a type</option>{types.map((t) => <option key={t}>{t}</option>)}</select></Field>
          <Field label="Message" required error={errors.message}><textarea {...props('message')} rows={4} /></Field>
          <div className="absolute -left-[9999px]" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
          {status === 'error' && <p role="alert" className="border border-red-400/50 bg-red-50 p-4 text-sm text-red-700">{serverError}</p>}
          <button type="submit" disabled={status === 'loading'} className="btn btn-dark self-start">{status === 'loading' ? (<><Loader2 size={16} className="animate-spin" /> Sending…</>) : 'Send message'}</button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
