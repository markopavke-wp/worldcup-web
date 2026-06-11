import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Layout.css';

const navItems = [
  { to: '/', label: 'Utakmice', end: true },
  { to: '/leaderboard', label: 'Tabela' },
  { to: '/standings', label: 'Grupe' },
  { to: '/profile', label: 'Profil' },
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
    <div className={`layout ${menuOpen ? 'menu-open' : ''}`}>
      <header className="header">
        <div className="container header-inner">
          <Link to="/" className="logo" onClick={() => setMenuOpen(false)}>
            ⚽ SP 2026
          </Link>

          <nav className="nav nav-desktop" aria-label="Glavna navigacija">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.end}>
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

      <main className="container main-content">
        <Outlet />
      </main>
    </div>
  );
}
