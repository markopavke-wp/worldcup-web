import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import TrophyIcon from './icons/TrophyIcon';
import './Layout.css';

const navItems = [
  { to: '/', label: 'Utakmice', end: true, icon: '⚽' },
  { to: '/leaderboard', label: 'Tabela', icon: '🏆' },
  { to: '/standings', label: 'Grupe', icon: '🌍' },
  { to: '/profile', label: 'Profil', icon: '👤' },
];

export default function Layout() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleLogout = () => {
    setMenuOpen(false);
    logout();
  };

  return (
    <div className={`layout app-shell ${menuOpen ? 'menu-open' : ''}`}>
      <div className="app-shell__bg" aria-hidden="true" />
      <div className="app-shell__pitch" aria-hidden="true" />

      <header className="header">
        <div className="header-tricolor" aria-hidden="true" />
        <div className="container header-inner">
          <Link to="/" className="logo" onClick={() => setMenuOpen(false)}>
            <TrophyIcon className="logo-trophy" />
            <span className="logo-text">
              <span className="logo-year">2026</span>
              <span className="logo-label">Liga tipova</span>
            </span>
          </Link>

          <div className="header-flags-mobile" aria-hidden="true">
            <img src="/images/flag-mx.png" alt="" />
            <img src="/images/flag-us.png" alt="" />
            <img src="/images/flag-ca.png" alt="" />
          </div>

          <nav className="nav nav-desktop" aria-label="Glavna navigacija">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.end}>
                <span className="nav-icon" aria-hidden="true">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="user-menu user-menu-desktop">
            <span className="user-name">{user?.displayName}</span>
            <button className="btn btn-ghost btn-sm" type="button" onClick={logout}>
              Odjava
            </button>
          </div>

          <button
            type="button"
            className="menu-toggle"
            aria-label={menuOpen ? 'Zatvori meni' : 'Otvori meni'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="menu-toggle-bar" />
            <span className="menu-toggle-bar" />
            <span className="menu-toggle-bar" />
          </button>
        </div>

        <div
          id="mobile-menu"
          className={`mobile-menu ${menuOpen ? 'open' : ''}`}
          aria-hidden={!menuOpen}
        >
          <nav className="mobile-nav" aria-label="Mobilna navigacija">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className="mobile-nav-link"
                onClick={() => setMenuOpen(false)}
              >
                <span className="nav-icon" aria-hidden="true">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="mobile-menu-footer">
            <span className="user-name">{user?.displayName}</span>
            <button className="btn btn-ghost" type="button" onClick={handleLogout}>
              Odjava
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <button
          type="button"
          className="menu-backdrop"
          aria-label="Zatvori meni"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <div className="wc-mobile-strip" aria-hidden="true">
        <div className="wc-mobile-strip__flags">
          <img src="/images/flag-mx.png" alt="" />
          <img src="/images/flag-us.png" alt="" />
          <img src="/images/flag-ca.png" alt="" />
        </div>
        <span className="wc-mobile-strip__label">FIFA World Cup 2026</span>
      </div>

      <main className="container main-content">
        <Outlet />
      </main>

      <footer className="app-footer">
        <div className="container app-footer__inner">
          <img src="/images/flag-mx.png" alt="" className="app-footer__flag" />
          <img src="/images/flag-us.png" alt="" className="app-footer__flag" />
          <img src="/images/flag-ca.png" alt="" className="app-footer__flag" />
          <span>FIFA World Cup 2026</span>
          <span className="app-build-id" title="Verzija deploya">{__BUILD_ID__}</span>
        </div>
      </footer>
    </div>
  );
}
