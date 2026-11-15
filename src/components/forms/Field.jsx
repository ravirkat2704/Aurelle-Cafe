export const inputCls = (tone, err) =>
  `w-full border-0 border-b bg-transparent px-0 py-3 text-[0.95rem] outline-none transition ${tone === 'dark' ? 'border-ivory/25 text-ivory placeholder:text-taupe/70 focus:border-gold' : 'border-espresso/25 text-espresso placeholder:text-taupe focus:border-caramel'} ${err ? '!border-red-400' : ''} [&>option]:text-espresso`;

export default function Field({ label, error, required, tone = 'light', className = '', children }) {
  return (
    <label className={`block ${className}`}>
      <span className={`mb-1 block text-[0.68rem] uppercase tracking-[0.22em] ${tone === 'dark' ? 'text-gold' : 'text-caramel'}`}>
        {label}{required && <span aria-hidden="true"> *</span>}
      </span>
      {children}
      {error && <span role="alert" className="mt-1 block text-xs text-red-400">{error}</span>}
    </label>
  );
}
