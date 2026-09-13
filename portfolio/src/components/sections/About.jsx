import React, { useState } from 'react';
import { User, FileText, CheckCircle2, Sparkles, Code, Cpu, Brain, Rocket } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import { useIntersection } from '../../hooks/useIntersection';
import TiltCard from '../common/TiltCard';
import ResumeModal from '../common/ResumeModal';

export default function About() {
  const { personal } = portfolioData;
  const [ref, isVisible] = useIntersection();
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const highlightIcons = [
    <Brain size={18} className="gold-icon" />,
    <Code size={18} className="gold-icon" />,
    <Cpu size={18} className="gold-icon" />,
    <Rocket size={18} className="gold-icon" />,
  ];

  return (
    <section id="about" className="section about-section" ref={ref}>
      <div className="container">
        {/* Section Header */}
        <div className={`section-header reveal-init ${isVisible ? 'reveal-visible' : ''}`}>
          <div className="section-tag">
            <User size={14} />
            <span>About Me</span>
          </div>
          <h2 className="section-title">
            Passionate About <span className="gold-text">Engineering & Innovation</span>
          </h2>
          <p className="section-subtitle">
            A glimpse into my mindset, academic focus, and developer journey.
          </p>
        </div>

        {/* Two-Column Premium Card */}
        <div className={`about-two-col-card glass-card reveal-init ${isVisible ? 'reveal-visible' : ''}`}>
          {/* Left Column: Portrait */}
          <div className="about-photo-col">
            <div className="about-image-wrapper">
              <div className="about-gold-ambient" />
              <img
                src="/ashish.jpg"
                alt={personal.name}
                className="about-portrait-img"
              />
              <div className="about-badge-floating">
                <Sparkles size={14} className="badge-star" />
                <span>3rd Year B.Tech CSE</span>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Content */}
          <div className="about-content-col">
            <h3 className="about-main-heading">
              Building solutions with <span className="gold-text">code & creativity</span>.
            </h3>

            <div className="about-bio-text">
              {personal.bio.map((paragraph, index) => (
                <p key={index} className="bio-paragraph">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* 4 Small Highlights with 3D Tilt */}
            <div className="about-highlights-grid">
              {personal.aboutHighlights.map((highlight, index) => (
                <TiltCard key={highlight.label} className="highlight-card" maxTilt={7}>
                  <div className="highlight-icon-box">
                    {highlightIcons[index % highlightIcons.length]}
                  </div>
                  <div className="highlight-text-box">
                    <span className="highlight-title">{highlight.label}</span>
                    <span className="highlight-desc">{highlight.desc}</span>
                  </div>
                </TiltCard>
              ))}
            </div>

            {/* Download CV Button */}
            <div className="about-cta-row">
              <button
                type="button"
                onClick={() => setIsResumeOpen(true)}
                className="btn btn-primary"
              >
                <FileText size={16} />
                <span>View & Print CV</span>
              </button>
              <a href="#experience" className="btn btn-secondary">
                <span>View Learning Journey</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Resume Modal with Print / Save PDF */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      <style>{`
        .about-section {
          position: relative;
        }
        .about-two-col-card {
          display: grid;
          grid-template-columns: 0.95fr 1.35fr;
          gap: 48px;
          padding: 48px;
          border: 1px solid var(--border-gold);
          border-radius: var(--radius-lg);
          background: rgba(15, 15, 18, 0.75);
          box-shadow: var(--shadow-md), var(--glow-gold-subtle);
          align-items: center;
        }

        /* Left Column: Photo Stage */
        .about-photo-col {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .about-image-wrapper {
          position: relative;
          width: 100%;
          max-width: 360px;
          aspect-ratio: 4 / 5;
          border-radius: var(--radius-md);
          overflow: hidden;
          border: 1px solid var(--border-gold);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
        }
        .about-gold-ambient {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 30%, rgba(212, 175, 55, 0.2) 0%, transparent 70%);
          pointer-events: none;
          z-index: 1;
        }
        .about-portrait-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .about-image-wrapper:hover .about-portrait-img {
          transform: scale(1.04);
        }
        .about-badge-floating {
          position: absolute;
          bottom: 16px;
          left: 16px;
          right: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: var(--radius-full);
          background: rgba(8, 8, 10, 0.85);
          backdrop-filter: blur(12px);
          border: 1px solid var(--border-gold);
          color: var(--accent-gold-light);
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          z-index: 2;
        }
        .badge-star {
          color: var(--accent-gold);
        }

        /* Right Column: Content */
        .about-content-col {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .about-main-heading {
          font-size: clamp(1.6rem, 2.5vw, 2.2rem);
          font-weight: 800;
          line-height: 1.25;
          letter-spacing: -0.02em;
        }
        .about-bio-text {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .bio-paragraph {
          color: var(--text-secondary);
          font-size: 1rem;
          line-height: 1.7;
        }

        /* 4 Small Highlights Grid */
        .about-highlights-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-top: 8px;
        }
        .highlight-card {
          padding: 16px;
          border-radius: var(--radius-md);
          background: rgba(22, 22, 26, 0.65);
          border: 1px solid var(--border-subtle);
          display: flex;
          align-items: flex-start;
          gap: 14px;
          transition: border-color var(--transition-fast), transform var(--transition-fast);
        }
        .highlight-card:hover {
          border-color: var(--border-gold);
          transform: translateY(-2px);
        }
        .highlight-icon-box {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: rgba(212, 175, 55, 0.1);
          border: 1px solid var(--border-gold);
          color: var(--accent-gold);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .gold-icon {
          color: var(--accent-gold);
        }
        .highlight-text-box {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .highlight-title {
          font-size: 0.92rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .highlight-desc {
          font-size: 0.8rem;
          color: var(--text-muted);
          line-height: 1.45;
        }

        /* CTA Row */
        .about-cta-row {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-top: 10px;
          flex-wrap: wrap;
        }

        @media (max-width: 992px) {
          .about-two-col-card {
            grid-template-columns: 1fr;
            padding: 32px;
            gap: 36px;
          }
          .about-highlights-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
