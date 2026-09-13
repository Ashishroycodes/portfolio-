import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon, InstagramIcon, FacebookIcon } from './Icons';
import { portfolioData } from '../../data/portfolioData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getSocialIcon = (name) => {
    switch (name.toLowerCase()) {
      case 'github':
        return <GithubIcon size={18} />;
      case 'linkedin':
        return <LinkedinIcon size={18} />;
      case 'instagram':
      case 'insta':
        return <InstagramIcon size={18} />;
      case 'facebook':
      case 'fb':
        return <FacebookIcon size={18} />;
      case 'twitter':
        return <TwitterIcon size={18} />;
      case 'email':
      case 'mail':
        return <Mail size={18} />;
      default:
        return null;
    }
  };

  return (
    <footer className="portfolio-footer">
      <div className="container footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <h3 className="footer-logo">
              Ashish <span className="gold-text">Roy</span>
            </h3>
            <p className="footer-tagline">{portfolioData.personal.tagline}</p>
          </div>

          <div className="footer-nav">
            <h4 className="footer-column-title">Navigation</h4>
            <ul className="footer-links">
              {portfolioData.navLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="footer-link">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-socials-col">
            <h4 className="footer-column-title">Connect</h4>
            <div className="footer-social-icons">
              {portfolioData.socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                  aria-label={social.name}
                  title={social.name}
                >
                  {getSocialIcon(social.name)}
                </a>
              ))}
            </div>
            <p className="footer-availability">
              <span className="pulse-dot-gold" />
              {portfolioData.personal.statusBadge}
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            © {new Date().getFullYear()} {portfolioData.personal.name}. All rights reserved. Built with React & Modern CSS.
          </p>
          <button
            onClick={scrollToTop}
            className="back-to-top-btn"
            aria-label="Back to top"
            title="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp size={16} />
          </button>
        </div>
      </div>

      <style>{`
        .portfolio-footer {
          background: var(--bg-secondary);
          border-top: 1px solid var(--border-subtle);
          padding: 80px 0 36px 0;
          position: relative;
          z-index: 2;
        }
        .footer-container {
          display: flex;
          flex-direction: column;
          gap: 50px;
        }
        .footer-top {
          display: grid;
          grid-template-columns: 2fr 1fr 1.5fr;
          gap: 40px;
        }
        .footer-logo {
          font-size: 1.5rem;
          font-weight: 800;
          margin-bottom: 12px;
        }
        .footer-tagline {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.6;
          max-width: 400px;
        }
        .footer-column-title {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-primary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 18px;
        }
        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .footer-link {
          color: var(--text-secondary);
          font-size: 0.92rem;
          transition: color var(--transition-fast);
        }
        .footer-link:hover {
          color: var(--accent-gold-light);
        }
        .footer-social-icons {
          display: flex;
          gap: 12px;
          margin-bottom: 18px;
        }
        .social-btn {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-sm);
          background: var(--bg-card);
          border: 1px solid var(--border-gold);
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-fast);
        }
        .social-btn:hover {
          color: var(--accent-gold-light);
          border-color: var(--accent-gold);
          box-shadow: var(--glow-gold-subtle);
          transform: translateY(-2px);
        }
        .footer-availability {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.84rem;
          color: var(--text-secondary);
        }
        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 32px;
          border-top: 1px solid var(--border-subtle);
          font-size: 0.88rem;
          color: var(--text-muted);
          flex-wrap: wrap;
          gap: 16px;
        }
        .back-to-top-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
          font-size: 0.88rem;
          font-weight: 500;
          padding: 8px 14px;
          border-radius: var(--radius-sm);
          background: var(--bg-card);
          border: 1px solid var(--border-gold);
          transition: all var(--transition-fast);
        }
        .back-to-top-btn:hover {
          color: var(--accent-gold-light);
          border-color: var(--accent-gold);
          box-shadow: var(--glow-gold-subtle);
          transform: translateY(-2px);
        }
        @media (max-width: 860px) {
          .footer-top {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }
      `}</style>
    </footer>
  );
}
