import React, { useState } from 'react';
import { ArrowRight, Sparkles, Mail, Send, Eye, GraduationCap, Code2, Layers } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon, FacebookIcon } from '../common/Icons';
import { portfolioData } from '../../data/portfolioData';
import InteractiveAvatar from '../common/InteractiveAvatar';
import MorphingName from '../common/MorphingName';

export default function Hero() {
  const { personal, heroStats } = portfolioData;
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const rotatingWords = [
    'Data Structures & Algorithms (DSA)',
    'Full-Stack Web Development',
    'Cloud Systems & Microservices',
    'Database Management & REST APIs',
    'Applied AI & Machine Learning',
  ];
  const [wordIndex, setWordIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % rotatingWords.length);
        setIsFading(false);
      }, 350);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 20;
    const y = (clientY / innerHeight - 0.5) * 20;
    setMousePos({ x, y });
  };

  return (
    <section id="hero" className="hero-section" onMouseMove={handleMouseMove}>
      <div className="container hero-container">
        {/* Left Column: Content */}
        <div className="hero-left-col">
          {/* Status Badge with Micro-pulse */}
          <div className="status-pill hero-status-badge">
            <span className="pulse-dot-gold" />
            <span>Available for Full-Stack & Engineering Roles</span>
          </div>

          {/* Large Impressive Headline with Name & Tech Focus */}
          <h1 className="hero-main-title">
            <span className="hero-greeting-lead">Hello, I'm</span>{' '}
            <MorphingName name="Ashish Roy" className="gold-text shimmer-text hero-name-highlight" />
            <br />
            <span className="hero-tech-subline">
              Full-Stack Developer & <span className="gold-text">Computer Science Engineer</span>
            </span>
          </h1>

          {/* Dynamic Animated Sub-headline Transition */}
          <div className="hero-rotating-wrap">
            <span className="rotating-prefix">B.Tech CSE • </span>
            <span className={`rotating-word ${isFading ? 'fade-out' : 'fade-in'}`}>
              {rotatingWords[wordIndex]}
            </span>
            <span className="rotating-cursor">|</span>
          </div>

          {/* Professional Description */}
          <p className="hero-description">{personal.tagline}</p>

          {/* CTA Action Buttons */}
          <div className="hero-cta-group">
            <a href="#contact" className="btn btn-primary hero-btn">
              <span>Hire Me</span>
              <Send size={15} />
            </a>
            <a href="#projects" className="btn btn-secondary hero-btn">
              <span>View My Work</span>
              <ArrowRight size={15} />
            </a>
          </div>

          {/* Social Media Icons */}
          <div className="hero-socials-wrapper">
            <span className="socials-label">Connect:</span>
            <div className="socials-list">
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-circle-btn"
                title="GitHub"
                aria-label="GitHub"
              >
                <GithubIcon size={18} />
              </a>
              <a
                href="https://www.linkedin.com/feed/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-circle-btn"
                title="LinkedIn"
                aria-label="LinkedIn"
              >
                <LinkedinIcon size={18} />
              </a>
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-circle-btn"
                title="Instagram"
                aria-label="Instagram"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-circle-btn"
                title="Facebook"
                aria-label="Facebook"
              >
                <FacebookIcon size={18} />
              </a>
              <a
                href={`mailto:${personal.email}`}
                className="social-circle-btn"
                title="Email"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Cinematic Cutout Portrait with Glowing Circular Ring */}
        <div className="hero-right-col">
          <InteractiveAvatar imageUrl="/ashish-cutout.png" alt={personal.name} />
        </div>
      </div>

      {/* Floating Realistic Statistics Cards near Bottom of Hero */}
      <div className="container hero-stats-container">
        <div className="hero-stats-grid">
          <div className="hero-stat-card glass-card">
            <div className="stat-icon-wrap">
              <GraduationCap size={20} />
            </div>
            <div className="stat-text-col">
              <span className="stat-number gold-text">{heroStats[0].value}</span>
              <span className="stat-desc">{heroStats[0].subtext}</span>
            </div>
          </div>

          <div className="hero-stat-card glass-card">
            <div className="stat-icon-wrap">
              <Code2 size={20} />
            </div>
            <div className="stat-text-col">
              <span className="stat-number gold-text">{heroStats[1].value}</span>
              <span className="stat-desc">{heroStats[1].subtext}</span>
            </div>
          </div>

          <div className="hero-stat-card glass-card">
            <div className="stat-icon-wrap">
              <Layers size={20} />
            </div>
            <div className="stat-text-col">
              <span className="stat-number gold-text">{heroStats[2].value}</span>
              <span className="stat-desc">{heroStats[2].subtext}</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          min-height: calc(100vh - var(--nav-height));
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 120px 0 50px 0;
          position: relative;
          overflow: hidden;
        }
        .hero-container {
          display: grid;
          grid-template-columns: 1.12fr 0.88fr;
          gap: 24px;
          align-items: center;
          position: relative;
          z-index: 2;
        }
        .hero-left-col {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          z-index: 2;
        }
        .hero-left-col > * {
          animation: heroFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .hero-status-badge {
          margin-bottom: 22px;
          animation-delay: 0.08s;
        }
        .hero-main-title {
          font-size: clamp(2.4rem, 5vw, 4rem);
          font-weight: 800;
          line-height: 1.12;
          letter-spacing: -0.03em;
          margin-bottom: 16px;
          animation-delay: 0.16s;
        }
        .hero-greeting-lead {
          font-size: clamp(1.8rem, 3.6vw, 2.8rem);
          font-weight: 700;
          color: var(--text-primary);
        }
        .hero-name-highlight {
          font-size: clamp(2.5rem, 5.2vw, 4.2rem);
          font-weight: 900;
          letter-spacing: -0.02em;
        }
        .hero-tech-subline {
          font-size: clamp(1.6rem, 3.4vw, 2.6rem);
          font-weight: 800;
          color: var(--text-primary);
          display: inline-block;
          margin-top: 4px;
        }
        .shimmer-text {
          background: linear-gradient(
            110deg,
            #d4af37 0%,
            #f59e0b 25%,
            #fff4b8 50%,
            #d4af37 75%,
            #92400e 100%
          );
          background-size: 220% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: textShimmer 4.5s linear infinite;
        }
        @keyframes textShimmer {
          0% { background-position: 0% center; }
          100% { background-position: 220% center; }
        }
        .hero-tech-pill-deck {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 28px;
          animation-delay: 0.35s;
        }
        .tech-pill-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 13px;
          border-radius: var(--radius-full);
          background: rgba(212, 175, 55, 0.06);
          border: 1px solid rgba(212, 175, 55, 0.22);
          color: var(--accent-gold-light);
          font-size: 0.76rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          transition: all var(--transition-fast);
        }
        .tech-pill-chip:hover {
          background: rgba(212, 175, 55, 0.15);
          border-color: var(--accent-gold);
          transform: translateY(-2px);
          box-shadow: 0 4px 14px rgba(212, 175, 55, 0.25);
        }
        .chip-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--accent-gold);
          box-shadow: 0 0 6px rgba(212, 175, 55, 0.8);
        }
        .hero-rotating-wrap {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-display);
          font-size: clamp(1.05rem, 2.1vw, 1.35rem);
          font-weight: 600;
          color: var(--text-secondary);
          margin-bottom: 18px;
          min-height: 32px;
          animation-delay: 0.24s;
        }
        .rotating-word {
          color: var(--accent-gold-light);
          display: inline-block;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .rotating-word.fade-out {
          opacity: 0;
          transform: translateY(-8px);
        }
        .rotating-word.fade-in {
          opacity: 1;
          transform: translateY(0);
        }
        .rotating-cursor {
          color: var(--accent-gold);
          animation: blinkCursor 1s step-end infinite;
          font-weight: 300;
        }
        @keyframes blinkCursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes heroFadeUp {
          from {
            opacity: 0;
            transform: translateY(22px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .hero-description {
          font-size: 1.1rem;
          color: var(--text-secondary);
          line-height: 1.65;
          max-width: 520px;
          margin-bottom: 30px;
        }
        .hero-cta-group {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: 26px;
        }
        .hero-btn {
          min-width: 155px;
        }
        .hero-socials-wrapper {
          display: flex;
          align-items: center;
          gap: 14px;
          padding-top: 20px;
          border-top: 1px solid var(--border-subtle);
          width: 100%;
          max-width: 480px;
        }
        .socials-label {
          font-size: 0.84rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--text-muted);
          font-weight: 600;
        }
        .socials-list {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .social-circle-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--bg-card);
          border: 1px solid var(--border-gold);
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-fast);
        }
        .social-circle-btn:hover {
          color: var(--accent-gold-light);
          border-color: var(--accent-gold);
          box-shadow: var(--glow-gold-subtle);
          transform: translateY(-3px);
        }

        /* Right Column - Overlapping 3D Cinematic Cutout Portrait */
        .hero-right-col {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 5;
          margin-bottom: -55px; /* Overlaps downward over the bottom statistic cards */
          margin-left: -28px;   /* Slight horizontal overlap toward hero content */
        }

        /* Floating Realistic Statistics Cards Grid at Bottom of Hero */
        .hero-stats-container {
          position: relative;
          z-index: 3;
          margin-top: 10px;
        }
        .hero-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .hero-stat-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px 24px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-gold);
          background: rgba(14, 14, 18, 0.82);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.55), var(--glow-gold-subtle);
          transition: transform var(--transition-fast), border-color var(--transition-fast), box-shadow var(--transition-fast);
        }
        .hero-stat-card:hover {
          transform: translateY(-4px);
          border-color: var(--accent-gold);
          box-shadow: 0 14px 35px rgba(0, 0, 0, 0.65), var(--glow-gold);
        }
        .stat-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(212, 175, 55, 0.1);
          border: 1px solid var(--border-gold);
          color: var(--accent-gold);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .stat-text-col {
          display: flex;
          flex-direction: column;
        }
        .stat-number {
          font-family: var(--font-display);
          font-size: 1.55rem;
          font-weight: 800;
          line-height: 1.2;
        }
        .stat-desc {
          font-size: 0.84rem;
          color: var(--text-secondary);
          font-weight: 500;
        }

        @media (max-width: 992px) {
          .hero-container {
            grid-template-columns: 1fr;
            gap: 50px;
            text-align: center;
          }
          .hero-left-col {
            align-items: center;
          }
          .hero-right-col {
            margin-bottom: 0;
            margin-left: 0;
          }
          .hero-socials-wrapper {
            justify-content: center;
          }
          .hero-stats-grid {
            grid-template-columns: 1fr;
            gap: 14px;
          }
        }
        @media (max-width: 640px) {
          .hero-main-title {
            font-size: 2.3rem;
          }
          .hero-cta-group {
            width: 100%;
            flex-direction: column;
          }
          .hero-btn {
            width: 100%;
          }
          .golden-glow-ring {
            width: 290px;
            height: 290px;
          }
          .person-cutout-img {
            max-width: 320px;
          }
        }
      `}</style>
    </section>
  );
}
