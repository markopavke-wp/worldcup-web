import './AuthShell.css';

function TrophyIcon() {
  return (
    <svg className="auth-trophy" viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path
        d="M18 10h28v8c0 9-4 16-14 18v6h8v4H24v-4h8v-6C22 34 18 27 18 18v-8Z"
        fill="url(#trophy-gold)"
      />
      <path
        d="M10 14h8v4c0 6 3 10 8 11v-4c-4-1-6-5-6-9v-2H10Zm44 0h-8v2c0 4-2 8-6 9v4c5-1 8-5 8-11v-4Z"
        fill="url(#trophy-gold)"
      />
      <rect x="22" y="48" width="20" height="4" rx="1" fill="url(#trophy-gold)" />
      <defs>
        <linearGradient id="trophy-gold" x1="10" y1="10" x2="54" y2="52">
          <stop stopColor="#ffe08a" />
          <stop offset="0.5" stopColor="#f5c542" />
          <stop offset="1" stopColor="#c9922a" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function AuthShell({ title, subtitle, children, footer }) {
  return (
    <div className="auth-shell">
      <div className="auth-shell__bg" aria-hidden="true" />
      <div className="auth-shell__pitch" aria-hidden="true" />
      <div className="auth-shell__glow auth-shell__glow--left" aria-hidden="true" />
      <div className="auth-shell__glow auth-shell__glow--right" aria-hidden="true" />

      <div className="auth-shell__flags" aria-hidden="true">
        <img src="/images/flag-mx.png" alt="" className="auth-flag auth-flag--mx" />
        <img src="/images/flag-us.png" alt="" className="auth-flag auth-flag--us" />
        <img src="/images/flag-ca.png" alt="" className="auth-flag auth-flag--ca" />
      </div>

      <div className="auth-shell__inner">
        <section className="auth-hero">
          <div className="auth-hero__badge">
            <TrophyIcon />
            <span>FIFA World Cup</span>
          </div>
          <h1 className="auth-hero__title">
            <span className="auth-hero__year">2026</span>
            Liga tipova
          </h1>
          <p className="auth-hero__tagline">
            USA · México · Canada
          </p>
          <ul className="auth-hero__stats">
            <li><strong>48</strong> timova</li>
            <li><strong>104</strong> utakmice</li>
            <li><strong>12</strong> grupa</li>
          </ul>
        </section>

        <div className="auth-panel">
          <div className="auth-card">
            <header className="auth-card__head">
              <h2>{title}</h2>
              {subtitle && <p className="auth-subtitle">{subtitle}</p>}
            </header>
            {children}
            {footer}
          </div>
        </div>
      </div>
    </div>
  );
}
