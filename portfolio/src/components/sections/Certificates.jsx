import React, { useState } from 'react';
import { Award, ShieldCheck, ExternalLink, Calendar, CheckCircle2, FileCheck, FileText, Image as ImageIcon } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import Modal from '../common/Modal';
import TiltCard from '../common/TiltCard';
import { useIntersection } from '../../hooks/useIntersection';

export default function Certificates() {
  const [selectedCert, setSelectedCert] = useState(null);
  const [filter, setFilter] = useState('All');
  const [ref, isVisible] = useIntersection();

  const categories = ['All', ...Array.from(new Set(portfolioData.certificates.map((c) => c.category)))];

  const filteredCerts = portfolioData.certificates.filter((cert) => {
    if (filter === 'All') return true;
    return cert.category === filter;
  });

  return (
    <section id="certificates" className="section certificates-section" ref={ref}>
      <div className="container">
        {/* Section Header */}
        <div className={`section-header reveal-init ${isVisible ? 'reveal-visible' : ''}`}>
          <div className="section-tag">
            <Award size={14} />
            <span>Accreditations</span>
          </div>
          <h2 className="section-title">
            Certifications & <span className="gradient-text">Verified Credentials</span>
          </h2>
          <p className="section-subtitle">
            Official credentials and certificates earned across Artificial Intelligence, Cloud Computing, and Software Engineering.
          </p>
        </div>

        {/* Category Filters */}
        <div className={`cert-filters reveal-init ${isVisible ? 'reveal-visible' : ''}`}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`cert-filter-btn ${filter === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Certificates Grid with 3D Tilt */}
        <div className={`certs-grid reveal-init ${isVisible ? 'reveal-visible' : ''}`}>
          {filteredCerts.map((cert) => (
            <TiltCard
              key={cert.id}
              className="glass-card cert-card"
              onClick={() => setSelectedCert(cert)}
              role="button"
              tabIndex={0}
              maxTilt={9}
              perspective={1000}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedCert(cert);
                }
              }}
            >
              {/* Optional Certificate Visual Banner */}
              {cert.image && (
                <div className="cert-thumbnail-wrapper">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="cert-thumbnail-img"
                    loading="lazy"
                  />
                  <div className="cert-thumb-overlay">
                    <span className="cert-preview-badge">
                      <ImageIcon size={13} />
                      <span>Inspect Credential</span>
                    </span>
                  </div>
                </div>
              )}

              <div className="cert-card-inner">
                <div className="cert-top-row">
                  <div
                    className="cert-badge-avatar"
                    style={{
                      backgroundColor: `${cert.iconColor}18`,
                      color: cert.iconColor,
                      borderColor: `${cert.iconColor}40`,
                    }}
                  >
                    <ShieldCheck size={22} />
                  </div>

                  <div className="cert-status-badge">
                    <CheckCircle2 size={13} className="verified-icon" />
                    <span>Verified</span>
                  </div>
                </div>

                <div className="cert-content">
                  <span className="cert-issuer">{cert.issuer}</span>
                  <h3 className="cert-title">{cert.title}</h3>
                  <p className="cert-desc">{cert.description}</p>
                </div>

                <div className="cert-skills-pills">
                  {cert.skills.slice(0, 3).map((s) => (
                    <span key={s} className="cert-skill-pill">
                      {s}
                    </span>
                  ))}
                  {cert.skills.length > 3 && (
                    <span className="cert-skill-pill more">
                      +{cert.skills.length - 3}
                    </span>
                  )}
                </div>

                <div className="cert-footer">
                  <div className="cert-date">
                    <Calendar size={13} />
                    <span>Issued: {cert.issueDate}</span>
                  </div>
                  <div className="cert-view-btn">
                    <span>View Details</span>
                    <ExternalLink size={13} />
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>

      {/* Certificate Modal */}
      {selectedCert && (
        <Modal
          isOpen={Boolean(selectedCert)}
          onClose={() => setSelectedCert(null)}
          title={selectedCert.title}
          subtitle={`Issued by ${selectedCert.issuer}`}
        >
          <div className="modal-cert-body">
            {/* Visual Certificate Preview */}
            {selectedCert.image && (
              <div className="modal-cert-img-container">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  className="modal-cert-full-img"
                />
              </div>
            )}

            <div className="cert-modal-header-strip">
              <div
                className="cert-modal-icon"
                style={{
                  backgroundColor: `${selectedCert.iconColor}20`,
                  color: selectedCert.iconColor,
                }}
              >
                <ShieldCheck size={30} />
              </div>
              <div>
                <div className="cert-badge-text">Official Verification Record</div>
                <div className="cert-modal-id">Credential ID: {selectedCert.credentialId}</div>
              </div>
            </div>

            <p className="modal-cert-desc">{selectedCert.description}</p>

            <div className="modal-cert-meta-grid">
              <div className="meta-box">
                <span className="meta-lbl">Issue Date</span>
                <span className="meta-val">{selectedCert.issueDate}</span>
              </div>
              <div className="meta-box">
                <span className="meta-lbl">Validity</span>
                <span className="meta-val">{selectedCert.expiryDate}</span>
              </div>
              <div className="meta-box">
                <span className="meta-lbl">Domain</span>
                <span className="meta-val">{selectedCert.category}</span>
              </div>
            </div>

            <h4 className="modal-section-h">Skills & Competencies Validated</h4>
            <div className="cert-modal-skills">
              {selectedCert.skills.map((skill) => (
                <div key={skill} className="cert-skill-item">
                  <CheckCircle2 size={14} className="check-icon" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>

            <div className="modal-action-row">
              {selectedCert.pdfUrl && (
                <a
                  href={selectedCert.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  <FileText size={15} />
                  <span>Open PDF Document</span>
                </a>
              )}
              <a
                href={selectedCert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <FileCheck size={16} />
                <span>Verify Credential</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </Modal>
      )}

      <style>{`
        .certificates-section {
          background: linear-gradient(180deg, transparent 0%, rgba(6, 182, 212, 0.03) 50%, transparent 100%);
        }
        .cert-filters {
          display: flex;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 40px;
        }
        .cert-filter-btn {
          padding: 8px 18px;
          border-radius: var(--radius-full);
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-secondary);
          background: var(--bg-card);
          border: 1px solid var(--border-card);
          transition: all var(--transition-fast);
          cursor: pointer;
        }
        .cert-filter-btn:hover {
          color: var(--text-primary);
          border-color: var(--accent-cyan);
        }
        .cert-filter-btn.active {
          background: var(--gradient-brand);
          color: #ffffff;
          border-color: transparent;
          box-shadow: 0 4px 14px rgba(6, 182, 212, 0.35);
        }
        .certs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 28px;
        }
        .cert-card {
          padding: 0;
          display: flex;
          flex-direction: column;
          cursor: pointer;
          overflow: hidden;
        }
        .cert-thumbnail-wrapper {
          position: relative;
          width: 100%;
          height: 175px;
          background: var(--bg-secondary);
          overflow: hidden;
          border-bottom: 1px solid var(--border-subtle);
        }
        .cert-thumbnail-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .cert-card:hover .cert-thumbnail-img {
          transform: scale(1.06);
        }
        .cert-thumb-overlay {
          position: absolute;
          inset: 0;
          background: rgba(8, 11, 17, 0.45);
          backdrop-filter: blur(2px);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity var(--transition-normal);
        }
        .cert-card:hover .cert-thumb-overlay {
          opacity: 1;
        }
        .cert-preview-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: var(--radius-full);
          background: rgba(14, 19, 31, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #ffffff;
          font-size: 0.8rem;
          font-weight: 600;
        }
        .cert-card-inner {
          padding: 24px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
        .cert-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }
        .cert-badge-avatar {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid;
          transition: transform var(--transition-normal);
        }
        .cert-card:hover .cert-badge-avatar {
          transform: scale(1.1);
        }
        .cert-status-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 10px;
          border-radius: var(--radius-full);
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.25);
          color: var(--accent-emerald);
          font-size: 0.74rem;
          font-weight: 600;
        }
        .verified-icon {
          color: var(--accent-emerald);
        }
        .cert-content {
          flex-grow: 1;
          margin-bottom: 18px;
        }
        .cert-issuer {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--accent-primary);
          text-transform: uppercase;
          letter-spacing: 0.04em;
          display: block;
          margin-bottom: 6px;
        }
        .cert-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 8px;
          line-height: 1.35;
        }
        .cert-desc {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }
        .cert-skills-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 18px;
        }
        .cert-skill-pill {
          font-size: 0.74rem;
          font-weight: 500;
          padding: 3px 8px;
          border-radius: var(--radius-sm);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
        }
        [data-theme='light'] .cert-skill-pill {
          background: rgba(0, 0, 0, 0.04);
        }
        .cert-skill-pill.more {
          color: var(--accent-cyan);
          border-color: rgba(6, 182, 212, 0.25);
        }
        .cert-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 14px;
          border-top: 1px solid var(--border-subtle);
          font-size: 0.82rem;
          color: var(--text-muted);
        }
        .cert-date {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .cert-view-btn {
          display: flex;
          align-items: center;
          gap: 4px;
          font-weight: 600;
          color: var(--accent-primary);
        }
        .cert-card:hover .cert-view-btn {
          color: var(--accent-cyan);
        }

        /* Modal Inside Details */
        .modal-cert-body {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .modal-cert-img-container {
          width: 100%;
          max-height: 320px;
          overflow: hidden;
          border-radius: var(--radius-md);
          background: var(--bg-secondary);
          border: 1px solid var(--border-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .modal-cert-full-img {
          width: 100%;
          height: auto;
          max-height: 320px;
          object-fit: contain;
        }
        .cert-modal-header-strip {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 14px 16px;
          background: var(--bg-secondary);
          border-radius: var(--radius-md);
          border: 1px solid var(--border-subtle);
        }
        .cert-modal-icon {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .cert-badge-text {
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--accent-emerald);
          letter-spacing: 0.04em;
        }
        .cert-modal-id {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          color: var(--text-secondary);
        }
        .modal-cert-desc {
          font-size: 0.95rem;
          line-height: 1.7;
          color: var(--text-secondary);
        }
        .modal-cert-meta-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        .meta-box {
          background: var(--bg-secondary);
          padding: 12px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-subtle);
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .meta-lbl {
          font-size: 0.74rem;
          color: var(--text-muted);
          text-transform: uppercase;
          font-weight: 600;
        }
        .meta-val {
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        .cert-modal-skills {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }
        .cert-skill-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.9rem;
          color: var(--text-primary);
        }

        @media (max-width: 640px) {
          .certs-grid {
            grid-template-columns: 1fr;
          }
          .modal-cert-meta-grid {
            grid-template-columns: 1fr;
          }
          .cert-modal-skills {
            grid-template-columns: 1fr;
          }
          .modal-action-row {
            flex-direction: column;
          }
          .modal-action-row .btn {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
