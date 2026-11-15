import { useState } from 'react';

// Image with graceful fallback: never shows a broken-image icon.
export default function SmartImage({ src, alt = '', className = '', eager = false, ...rest }) {
  const [failed, setFailed] = useState(false);
  if (failed || !src) {
    return (
      <div role="img" aria-label={alt} className={`flex items-center justify-center bg-gradient-to-br from-coffee via-chocolate to-espresso text-gold/70 ${className}`}>
        <span className="font-serif text-3xl tracking-[0.3em]">A</span>
      </div>
    );
  }
  return <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" onError={() => setFailed(true)} className={className} {...rest} />;
}
