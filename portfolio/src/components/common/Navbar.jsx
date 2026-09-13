import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import { useScrollSpy } from '../../hooks/useScrollSpy';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sectionIds = portfolioData.navLinks.map((link) => link.href.replace('#', ''));
  const activeSection = useScrollSpy(sectionIds);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        {/* Name / Logo on left */}
        <a href="#hero" className="brand-logo" onClick={() => setMobileMenuOpen(false)}>
          <span className="logo-gem">
            <Sparkles size={15} />
          </span>
          <span className="brand-name">
            Ashish <span className="gold-text">Roy</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <ul className="nav-list">
            {portfolioData.navLinks.map((link) => {
              const id = link.href.replace('#', '');
              const isActive = activeSection === id;
              return (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className={`nav-link ${isActive ? 'active' : ''}`}
                  >
                    {link.name}
                    {isActive && <span className="active-pill" />}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right Action: Let's Talk CTA */}
        <div className="nav-actions">
          <a href="#contact" className="btn btn-primary btn-sm nav-cta-btn">
            <span>Let's Talk</span>
            <ArrowUpRight size={14} />
          </a>
          <button
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div
            className="mobile-drawer"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mobile-drawer-header">
              <span className="brand-name">
                Ashish <span className="gold-text">Roy</span>
              </span>
              <button
                className="mobile-close"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close Menu"
              >
                <X size={20} />
              </button>
            </div>
            <ul className="mobile-nav-list">
              {portfolioData.navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="mobile-nav-link"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mobile-cta-wrapper">
              <a
                href="#contact"
                className="btn btn-primary"
                style={{ width: '100%' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Let's Talk
              </a>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .navbar-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: var(--nav-height);
          z-index: 900;
          transition: all var(--transition-normal);
          border-bottom: 1px solid transparent;
        }
        .navbar-header.scrolled {
          background: rgba(8, 8, 10, 0.85);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border-bottom: 1px solid var(--border-gold);
          box-shadow: 0 4px 25px rgba(0, 0, 0, 0.5);
        }
        .nav-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 100%;
        }
        .brand-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 1.25rem;
          color: var(--text-primary);
        }
        .logo-gem {
          width: 32px;
          height: 32px;
          border-radius: 10px;
          background: var(--gradient-gold);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #080808;
          box-shadow: 0 2px 10px rgba(212, 175, 55, 0.35);
        }
        .desktop-nav {
          display: flex;
          align-items: center;
        }
        .nav-list {
          display: flex;
          align-items: center;
          gap: 30px;
          list-style: none;
        }
        .nav-link {
          position: relative;
          font-size: 0.92rem;
          font-weight: 500;
          color: var(--text-secondary);
          padding: 6px 2px;
          transition: color var(--transition-fast);
        }
        .nav-link:hover, .nav-link.active {
          color: var(--accent-gold-light);
        }
        .active-pill {
          position: absolute;
          bottom: -4px;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--gradient-gold);
          border-radius: 2px;
          box-shadow: 0 0 8px rgba(212, 175, 55, 0.5);
        }
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .nav-cta-btn {
          display: inline-flex;
        }
        .mobile-toggle-btn {
          display: none;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: var(--radius-sm);
          color: var(--text-primary);
          background: var(--bg-card);
          border: 1px solid var(--border-gold);
        }
        .mobile-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(8px);
          z-index: 1000;
          display: flex;
          justify-content: flex-end;
          animation: fadeIn 0.2s ease-out;
        }
        .mobile-drawer {
          width: 82%;
          max-width: 320px;
          height: 100%;
          background: #0f0f12;
          border-left: 1px solid var(--border-gold);
          padding: 28px;
          display: flex;
          flex-direction: column;
          box-shadow: -10px 0 35px rgba(0, 0, 0, 0.8);
          animation: slideRight 0.25s ease-out;
        }
        .mobile-drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--border-subtle);
          margin-bottom: 24px;
        }
        .mobile-close {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
        }
        .mobile-nav-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 16px;
          flex-grow: 1;
        }
        .mobile-nav-link {
          display: block;
          font-size: 1.15rem;
          font-weight: 600;
          padding: 10px 14px;
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          transition: all var(--transition-fast);
        }
        .mobile-nav-link:hover {
          color: var(--accent-gold-light);
          background: rgba(212, 175, 55, 0.08);
        }
        .mobile-cta-wrapper {
          padding-top: 20px;
          border-top: 1px solid var(--border-subtle);
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @media (max-width: 992px) {
          .desktop-nav {
            display: none;
          }
          .nav-cta-btn {
            display: none;
          }
          .mobile-toggle-btn {
            display: flex;
          }
        }
      `}</style>
    </header>
  );
}
