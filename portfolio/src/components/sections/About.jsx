import React, { useState } from 'react';
import {
  User,
  FileText,
  Download,
  ExternalLink,
  Eye,
  CheckCircle2,
  Sparkles,
  Code,
  Cpu,
  Brain,
  Rocket,
  Maximize2,
  ChevronDown,
  ChevronUp,
  X,
} from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import { useIntersection } from '../../hooks/useIntersection';
import TiltCard from '../common/TiltCard';
import ResumeModal from '../common/ResumeModal';

export default function About() {
  const { personal } = portfolioData;
  const [ref, isVisible] = useIntersection();
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [showResumeViewer, setShowResumeViewer] = useState(false);

  const handleToggleResume = () => {
    setShowResumeViewer((prev) => {
      const nextState = !prev;
      if (nextState) {
        setTimeout(() => {
          const el = document.getElementById('about-resume-viewer');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 120);
      }
      return nextState;
    });
  };

  const highlightIcons = [
    <Brain key="brain" size={18} className="gold-icon" />,
    <Code key="code" size={18} className="gold-icon" />,
    <Cpu key="cpu" size={18} className="gold-icon" />,
    <Rocket key="rocket" size={18} className="gold-icon" />,
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
            A glimpse into my mindset, academic focus, developer journey, and verified curriculum vitae.
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

            {/* Resume CTA Row */}
            <div className="about-cta-row">
              <button
                type="button"
                onClick={handleToggleResume}
                className="btn btn-primary"
                title={showResumeViewer ? 'Hide resume document' : 'View resume document'}
                aria-label={showResumeViewer ? 'Hide Resume' : 'View Resume'}
                aria-expanded={showResumeViewer}
              >
                <Eye size={16} />
                <span>{showResumeViewer ? 'Hide Resume' : 'View Resume'}</span>
                {showResumeViewer ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
              </button>

              <a
                href="/resume.pdf"
                download="Ashish_Kumar_Resume.pdf"
                className="btn btn-secondary"
                title="Download resume PDF directly to your device"
                aria-label="Download Resume PDF directly"
              >
                <Download size={16} />
                <span>Download Resume</span>
              </a>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                title="Open verified resume PDF in a new browser tab"
                aria-label="Open Resume in new browser tab"
              >
                <ExternalLink size={15} />
                <span>Open in Tab</span>
              </a>
            </div>
          </div>
        </div>

        {/* Integrated Resume PDF Viewer - Displayed only when user clicks button */}
        {showResumeViewer && (
          <div id="about-resume-viewer" className="about-resume-box glass-card">
            <div className="about-resume-header">
              <div className="about-resume-meta">
                <span className="about-doc-pill">Curriculum Vitae</span>
                <h4 className="about-doc-title">Ashish Kumar — Verified Resume</h4>
              </div>
              <div className="about-resume-header-actions">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-view-btn"
                  title="Open full page PDF in new tab"
                  aria-label="Open PDF in new tab"
                >
                  <Maximize2 size={14} />
                  <span>Open Full Page</span>
                </a>
                <a
                  href="/resume.pdf"
                  download="Ashish_Kumar_Resume.pdf"
                  className="about-view-btn gold"
                  title="Download PDF"
                  aria-label="Download PDF"
                >
                  <Download size={14} />
                  <span>Download PDF</span>
                </a>
                <button
                  type="button"
                  onClick={() => setShowResumeViewer(false)}
                  className="about-view-btn close-btn"
                  title="Close resume preview"
                  aria-label="Close resume preview"
                >
                  <X size={14} />
                  <span>Close</span>
                </button>
              </div>
            </div>

            <div className="about-resume-frame">
              <object
                data="/resume.pdf#toolbar=1&navpanes=0&scrollbar=1"
                type="application/pdf"
                className="about-resume-object"
                aria-label="Ashish Kumar Resume PDF"
              >
                <iframe
                  src="/resume.pdf#toolbar=1&navpanes=0"
                  title="Ashish Kumar Resume Document"
                  className="about-resume-object"
                >
                  <div className="about-resume-fallback">
                    <FileText size={40} className="gold-icon" />
                    <h4>Ashish Kumar — Curriculum Vitae</h4>
                    <p>Your browser doesn't support embedded PDFs directly.</p>
                    <div className="fallback-links">
                      <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                        <Eye size={14} />
                        <span>View Resume PDF</span>
                      </a>
                      <a href="/resume.pdf" download="Ashish_Kumar_Resume.pdf" className="btn btn-secondary btn-sm">
                        <Download size={14} />
                        <span>Download Resume</span>
                      </a>
                    </div>
                  </div>
                </iframe>
              </object>
            </div>

            <div className="about-resume-footer">
              <div className="about-resume-status">
                <CheckCircle2 size={13} className="text-emerald" />
                <span>Verified Recruiter Copy • Stored in public/resume.pdf</span>
              </div>
              <a
                href="/resume.pdf"
                download="Ashish_Kumar_Resume.pdf"
                className="about-resume-footer-dl"
                title="Direct Download"
              >
                <Download size={13} />
                <span>Save to Device</span>
              </a>
            </div>
          </div>
        )}
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
          gap: 14px;
          margin-top: 10px;
          flex-wrap: wrap;
        }

        /* Inline Resume Viewer Box inside About */
        .about-resume-box {
          margin-top: 40px;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-gold);
          overflow: hidden;
          background: rgba(15, 15, 18, 0.85);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5), 0 0 25px rgba(212, 175, 55, 0.15);
          animation: resumeSlideDown 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes resumeSlideDown {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .about-resume-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 24px;
          background: rgba(18, 20, 28, 0.95);
          border-bottom: 1px solid rgba(212, 175, 55, 0.2);
          gap: 16px;
          flex-wrap: wrap;
        }
        .about-resume-meta {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .about-doc-pill {
          padding: 3px 10px;
          border-radius: var(--radius-full);
          background: rgba(212, 175, 55, 0.15);
          color: var(--accent-gold);
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .about-doc-title {
          font-size: 0.92rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }
        .about-resume-header-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .about-view-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-secondary);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-subtle);
          padding: 6px 14px;
          border-radius: var(--radius-sm);
          text-decoration: none;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .about-view-btn:hover {
          background: rgba(212, 175, 55, 0.12);
          color: var(--accent-gold);
          border-color: var(--border-gold);
          transform: translateY(-1px);
        }
        .about-view-btn.gold {
          color: var(--accent-gold);
          border-color: rgba(212, 175, 55, 0.3);
        }
        .about-view-btn.close-btn:hover {
          background: rgba(239, 68, 68, 0.15);
          color: #ef4444;
          border-color: rgba(239, 68, 68, 0.4);
        }
        .about-resume-frame {
          width: 100%;
          height: 820px;
          background: #11141c;
          position: relative;
        }
        .about-resume-object {
          width: 100%;
          height: 100%;
          border: none;
          display: block;
        }
        .about-resume-fallback {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          padding: 40px 20px;
          text-align: center;
        }
        .about-resume-fallback h4 {
          margin: 12px 0 6px 0;
          color: var(--text-primary);
        }
        .about-resume-fallback p {
          color: var(--text-secondary);
          margin-bottom: 20px;
          font-size: 0.9rem;
        }
        .fallback-links {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .about-resume-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 24px;
          background: rgba(18, 20, 28, 0.95);
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          font-size: 0.8rem;
          color: var(--text-secondary);
        }
        .about-resume-status {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .about-resume-footer-dl {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          color: var(--accent-gold);
          font-weight: 600;
          text-decoration: none;
          transition: color var(--transition-fast);
        }
        .about-resume-footer-dl:hover {
          color: var(--accent-gold-light);
          text-decoration: underline;
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

        @media (max-width: 768px) {
          .about-resume-frame {
            height: 520px;
          }
          .about-resume-header {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </section>
  );
}
