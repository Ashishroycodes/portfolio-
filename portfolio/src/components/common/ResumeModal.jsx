import React from 'react';
import { X, Printer, Download, Mail, MapPin, Phone, ExternalLink, GraduationCap, Code2, FolderGit2, Award } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';

export default function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const { personal, educationJourney, projects } = portfolioData;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="resume-modal-overlay" onClick={onClose}>
      <div className="resume-modal-card glass-card" onClick={(e) => e.stopPropagation()}>
        {/* Modal Top Control Bar */}
        <div className="resume-control-bar">
          <div className="resume-ctrl-left">
            <span className="ctrl-badge">Ashish Roy — Curriculum Vitae</span>
          </div>
          <div className="resume-ctrl-actions">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm resume-action-btn"
              title="Open Resume PDF in New Tab"
            >
              <ExternalLink size={14} />
              <span>View PDF</span>
            </a>
            <a
              href="/resume.pdf"
              download="Ashish_Kumar_Resume.pdf"
              className="btn btn-primary btn-sm resume-action-btn"
              title="Download Resume PDF directly"
            >
              <Download size={14} />
              <span>Download PDF</span>
            </a>
            <button
              type="button"
              className="btn btn-secondary btn-sm resume-action-btn"
              onClick={handlePrint}
              title="Print Resume"
            >
              <Printer size={14} />
              <span>Print</span>
            </button>
            <button
              type="button"
              className="resume-close-btn"
              onClick={onClose}
              aria-label="Close Resume"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Printable Resume Document Paper */}
        <div className="resume-paper-content" id="printable-resume">
          {/* Resume Header */}
          <div className="resume-doc-header">
            <div>
              <h1 className="resume-name">{personal.name}</h1>
              <p className="resume-subheading">
                3rd-Year B.Tech Computer Science & Engineering • Full-Stack Developer
              </p>
            </div>
            <div className="resume-contact-block">
              <div className="resume-contact-line">
                <Mail size={13} />
                <a href={`mailto:${personal.email}`}>{personal.email}</a>
              </div>
              <div className="resume-contact-line">
                <MapPin size={13} />
                <span>{personal.location}</span>
              </div>
              <div className="resume-contact-line">
                <ExternalLink size={13} />
                <a href="https://linkedin.com/in/ashish-roy111/" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
                <span>•</span>
                <a href="https://github.com/Ashishroycodes" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
                <span>•</span>
                <a href="https://portfolio-green-phi-wgbvlpt5uc.vercel.app/" target="_blank" rel="noopener noreferrer">
                  Portfolio
                </a>
              </div>
            </div>
          </div>

          {/* Section: Academic Education */}
          <div className="resume-section">
            <h2 className="resume-section-title">
              <GraduationCap size={16} className="gold-icon" />
              <span>Education</span>
            </h2>
            <div className="resume-item-stack">
              {educationJourney.map((edu) => (
                <div key={edu.id} className="resume-item">
                  <div className="resume-item-top">
                    <span className="resume-item-bold">{edu.title}</span>
                    <span className="resume-item-meta">{edu.period}</span>
                  </div>
                  <div className="resume-item-sub">
                    <span>{edu.institution}</span>
                    <span>•</span>
                    <span>{edu.location}</span>
                    {edu.isCurrent && <span className="resume-current-pill">Current Enrollment</span>}
                  </div>
                  <p className="resume-item-desc">{edu.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Technical Skills */}
          <div className="resume-section">
            <h2 className="resume-section-title">
              <Code2 size={16} className="gold-icon" />
              <span>Technical Skills</span>
            </h2>
            <div className="resume-skills-grid">
              <div className="resume-skill-group">
                <span className="skill-group-label">Programming Languages:</span>
                <span className="skill-group-value">Java, C++, JavaScript (ES6+), SQL, HTML5/CSS3</span>
              </div>
              <div className="resume-skill-group">
                <span className="skill-group-label">Core Engineering:</span>
                <span className="skill-group-value">Data Structures & Algorithms (DSA), OOP, Database Systems, Computer Networks</span>
              </div>
              <div className="resume-skill-group">
                <span className="skill-group-label">Web & Full-Stack:</span>
                <span className="skill-group-value">React.js, Node.js, Express, RESTful APIs, Responsive UI</span>
              </div>
              <div className="resume-skill-group">
                <span className="skill-group-label">Developer Tools:</span>
                <span className="skill-group-value">Git, GitHub, VS Code, Vite, Postman, Linux Command Line</span>
              </div>
            </div>
          </div>

          {/* Section: Projects */}
          <div className="resume-section">
            <h2 className="resume-section-title">
              <FolderGit2 size={16} className="gold-icon" />
              <span>Key Software Projects</span>
            </h2>
            <div className="resume-item-stack">
              {projects.slice(0, 3).map((proj) => (
                <div key={proj.id} className="resume-item">
                  <div className="resume-item-top">
                    <span className="resume-item-bold">{proj.title}</span>
                    <span className="resume-item-tech">{proj.technologies.slice(0, 4).join(', ')}</span>
                  </div>
                  <p className="resume-item-desc">{proj.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Key Strengths */}
          <div className="resume-section">
            <h2 className="resume-section-title">
              <Award size={16} className="gold-icon" />
              <span>Key Strengths & Competencies</span>
            </h2>
            <p className="resume-strengths-text">
              Strong problem solver with an analytical mindset, dedicated to writing clean, modular code and continuously mastering emerging software architecture and web platforms.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .resume-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(4, 6, 12, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1100;
          padding: 20px;
          animation: resumeFade 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .resume-modal-card {
          width: 100%;
          max-width: 820px;
          max-height: 90vh;
          background: #0f1117;
          border: 1px solid rgba(212, 175, 55, 0.4);
          border-radius: 20px;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.8), 0 0 35px rgba(212, 175, 55, 0.2);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .resume-control-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 24px;
          background: rgba(18, 20, 28, 0.9);
          border-bottom: 1px solid rgba(212, 175, 55, 0.2);
        }

        .ctrl-badge {
          font-family: var(--font-mono, monospace);
          font-size: 0.82rem;
          color: var(--accent-gold);
          font-weight: 700;
        }

        .resume-ctrl-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .resume-action-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .resume-close-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .resume-close-btn:hover {
          background: rgba(239, 68, 68, 0.2);
          border-color: rgba(239, 68, 68, 0.6);
          color: #f87171;
        }

        .resume-paper-content {
          padding: 36px 40px;
          overflow-y: auto;
          background: #0d0f15;
          color: #e2e8f0;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .resume-doc-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          border-bottom: 2px solid rgba(212, 175, 55, 0.4);
          padding-bottom: 18px;
          flex-wrap: wrap;
          gap: 16px;
        }

        .resume-name {
          font-family: var(--font-display, serif);
          font-size: 1.8rem;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.02em;
        }

        .resume-subheading {
          font-size: 0.88rem;
          color: var(--accent-gold-light, #f5d77f);
          margin-top: 4px;
        }

        .resume-contact-block {
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .resume-contact-line {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .resume-contact-line a {
          color: var(--accent-gold);
          text-decoration: none;
        }

        .resume-section {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .resume-section-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.95rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--accent-gold);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding-bottom: 6px;
        }

        .resume-item-stack {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .resume-item {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .resume-item-top {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          flex-wrap: wrap;
          gap: 8px;
        }

        .resume-item-bold {
          font-size: 0.92rem;
          font-weight: 700;
          color: #fff;
        }

        .resume-item-meta {
          font-family: var(--font-mono, monospace);
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        .resume-item-tech {
          font-family: var(--font-mono, monospace);
          font-size: 0.76rem;
          color: var(--accent-gold-light);
        }

        .resume-item-sub {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.82rem;
          color: var(--accent-gold);
        }

        .resume-current-pill {
          background: rgba(212, 175, 55, 0.15);
          border: 1px solid rgba(212, 175, 55, 0.4);
          color: var(--accent-gold-light);
          padding: 2px 7px;
          border-radius: 999px;
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
        }

        .resume-item-desc {
          font-size: 0.84rem;
          color: var(--text-secondary);
          line-height: 1.45;
        }

        .resume-skills-grid {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .resume-skill-group {
          font-size: 0.85rem;
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        .skill-group-label {
          font-weight: 700;
          color: #fff;
        }

        .skill-group-value {
          color: var(--text-secondary);
        }

        .resume-strengths-text {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        @keyframes resumeFade {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }

        /* Print styles */
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-resume, #printable-resume * {
            visibility: visible;
          }
          #printable-resume {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            background: white !important;
            color: black !important;
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
}
