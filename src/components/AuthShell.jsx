import TrophyIcon from './icons/TrophyIcon';
import './AuthShell.css';

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
            <TrophyIcon className="auth-trophy" />
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
