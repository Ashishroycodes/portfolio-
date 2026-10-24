import React, { useState } from 'react';
import { Mail, MapPin, Send, Copy, Check, Sparkles, MessageSquare, ExternalLink } from 'lucide-react';
import { LinkedinIcon, GithubIcon, GlobeIcon } from '../common/Icons';
import confetti from 'canvas-confetti';
import { portfolioData } from '../../data/portfolioData';
import Toast from '../common/Toast';
import { useIntersection } from '../../hooks/useIntersection';

export default function Contact() {
  const { personal } = portfolioData;
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType] = useState('success');
  const [ref, isVisible] = useIntersection();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setToastType('success');
    setToastMessage('Email copied to clipboard!');
    setTimeout(() => setCopied(false), 2500);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setToastType('error');
      setToastMessage('Please fill in all required fields.');
      setTimeout(() => setToastMessage(null), 3000);
      return;
    }

    setIsSubmitting(true);

    // Process submission and trigger real email composer
    setTimeout(() => {
      setIsSubmitting(false);

      // Trigger Confetti Celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#6366f1', '#06b6d4', '#a855f7', '#10b981'],
        });
      } catch (err) {
        // Fallback gracefully if confetti fails
      }

      // Launch email client addressed to Ashish Roy with prefilled subject and message body
      const mailSubject = encodeURIComponent(formData.subject || `Inquiry from ${formData.name} via Portfolio`);
      const mailBody = encodeURIComponent(
        `Hi Ashish,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}\n\n---\nSent from your portfolio website.`
      );
      window.location.href = `mailto:${personal.email}?subject=${mailSubject}&body=${mailBody}`;

      setToastType('success');
      setToastMessage('Thank you! Opening your email client to send message directly to Ashish.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setToastMessage(null), 4500);
    }, 600);
  };

  return (
    <section id="contact" className="section contact-section" ref={ref}>
      <div className="container">
        {/* Section Header */}
        <div className={`section-header reveal-init ${isVisible ? 'reveal-visible' : ''}`}>
          <div className="section-tag">
            <Mail size={14} />
            <span>Connect</span>
          </div>
          <h2 className="section-title">
            Let’s Build Something <span className="gradient-text">Exceptional Together</span>
          </h2>
          <p className="section-subtitle">
            Have an open role, an architectural challenge, or an exciting project in mind? Reach out!
          </p>
        </div>

        <div className={`contact-layout reveal-init ${isVisible ? 'reveal-visible' : ''}`}>
          {/* Direct Contact Info Sidebar */}
          <div className="contact-info-col">
            <div className="glass-card contact-info-card">
              <h3 className="contact-card-title">Contact Channels</h3>
              <p className="contact-card-p">
                I am currently open to full-time engineering roles, high-impact consulting, and tech advisory.
              </p>

              <div className="contact-methods">
                {/* Email Box with One-Click Copy */}
                <div className="method-item">
                  <div className="method-icon-box">
                    <Mail size={18} />
                  </div>
                  <div className="method-details">
                    <span className="method-label">Direct Email</span>
                    <a href={`mailto:${personal.email}`} className="method-value">
                      {personal.email}
                    </a>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="copy-btn"
                    aria-label="Copy email address"
                    title="Copy to clipboard"
                  >
                    {copied ? <Check size={16} className="text-emerald" /> : <Copy size={16} />}
                  </button>
                </div>

                {/* Location Box */}
                <div className="method-item">
                  <div className="method-icon-box">
                    <MapPin size={18} />
                  </div>
                  <div className="method-details">
                    <span className="method-label">Location</span>
                    <span className="method-value">{personal.location}</span>
                  </div>
                </div>

                {/* LinkedIn Channel */}
                <a
                  href={personal.linkedinUrl || "https://linkedin.com/in/ashish-roy111/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="method-item"
                  title="Open LinkedIn Profile"
                  style={{ textDecoration: 'none' }}
                >
                  <div className="method-icon-box" style={{ background: 'rgba(10, 102, 194, 0.15)', color: '#0a66c2' }}>
                    <LinkedinIcon size={18} />
                  </div>
                  <div className="method-details">
                    <span className="method-label">Professional Network</span>
                    <span className="method-value">LinkedIn Profile</span>
                  </div>
                  <div className="copy-btn" title="Open LinkedIn Profile">
                    <ExternalLink size={14} />
                  </div>
                </a>

                {/* GitHub Channel */}
                <a
                  href={personal.githubUrl || "https://github.com/Ashishroycodes"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="method-item"
                  title="Open GitHub Profile"
                  style={{ textDecoration: 'none' }}
                >
                  <div className="method-icon-box" style={{ background: 'rgba(255, 255, 255, 0.08)', color: '#ffffff' }}>
                    <GithubIcon size={18} />
                  </div>
                  <div className="method-details">
                    <span className="method-label">Code Repositories</span>
                    <span className="method-value">GitHub / Ashishroycodes</span>
                  </div>
                  <div className="copy-btn" title="Open GitHub Profile">
                    <ExternalLink size={14} />
                  </div>
                </a>

                {/* Portfolio Channel */}
                <a
                  href={personal.portfolioUrl || "https://portfolio-green-phi-wgbvlpt5uc.vercel.app/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="method-item"
                  title="Open Live Portfolio"
                  style={{ textDecoration: 'none' }}
                >
                  <div className="method-icon-box" style={{ background: 'rgba(212, 175, 55, 0.15)', color: '#d4af37' }}>
                    <GlobeIcon size={18} />
                  </div>
                  <div className="method-details">
                    <span className="method-label">Portfolio Site</span>
                    <span className="method-value">Live Vercel Deployment</span>
                  </div>
                  <div className="copy-btn" title="Open Live Portfolio">
                    <ExternalLink size={14} />
                  </div>
                </a>
              </div>

              {/* Status Note */}
              <div className="status-box">
                <span className="pulse-dot" />
                <div>
                  <div className="status-note-title">Current Status</div>
                  <div className="status-note-desc">{personal.availabilityStatus}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Form */}
          <div className="contact-form-col">
            <form onSubmit={handleSubmit} className="glass-card contact-form-card">
              <div className="form-top">
                <MessageSquare size={18} className="form-top-icon" />
                <h3 className="form-title">Send a Message</h3>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="contact-name" className="form-label">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Jane Doe"
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-email" className="form-label">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jane@example.com"
                    required
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="contact-subject" className="form-label">
                  Subject
                </label>
                <input
                  type="text"
                  id="contact-subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Opportunity / Collaboration / Consultation"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-message" className="form-label">
                  Your Message *
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project, timeline, or open role..."
                  required
                  className="form-input form-textarea"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary form-submit-btn"
              >
                {isSubmitting ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={16} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Floating Toast Feedback */}
      <Toast
        message={toastMessage}
        type={toastType}
        onClose={() => setToastMessage(null)}
      />

      <style>{`
        .contact-section {
          position: relative;
        }
        .contact-layout {
          display: grid;
          grid-template-columns: 1fr 1.35fr;
          gap: 36px;
        }
        .contact-info-card {
          padding: 36px;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .contact-card-title {
          font-size: 1.4rem;
          font-weight: 700;
          margin-bottom: 8px;
        }
        .contact-card-p {
          color: var(--text-secondary);
          font-size: 0.94rem;
          line-height: 1.6;
          margin-bottom: 28px;
        }
        .contact-methods {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 32px;
        }
        .method-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 16px;
          border-radius: var(--radius-md);
          background: var(--bg-secondary);
          border: 1px solid var(--border-subtle);
          transition: border-color var(--transition-fast);
        }
        .method-item:hover {
          border-color: var(--border-card-hover);
        }
        .method-icon-box {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-sm);
          background: rgba(99, 102, 241, 0.12);
          color: var(--accent-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .method-details {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }
        .method-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--text-muted);
          font-weight: 600;
        }
        .method-value {
          font-size: 0.92rem;
          font-weight: 600;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .copy-btn {
          width: 34px;
          height: 34px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-card);
          border: 1px solid var(--border-card);
          color: var(--text-secondary);
          transition: all var(--transition-fast);
          flex-shrink: 0;
        }
        .copy-btn:hover {
          color: var(--accent-primary);
          border-color: var(--accent-primary);
        }
        .text-emerald {
          color: var(--accent-emerald);
        }

        .status-box {
          margin-top: auto;
          padding: 16px;
          border-radius: var(--radius-md);
          background: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.2);
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .status-note-title {
          font-size: 0.8rem;
          text-transform: uppercase;
          font-weight: 700;
          color: var(--accent-emerald);
        }
        .status-note-desc {
          font-size: 0.86rem;
          color: var(--text-secondary);
        }

        /* Form */
        .contact-form-card {
          padding: 36px;
        }
        .form-top {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border-subtle);
        }
        .form-top-icon {
          color: var(--accent-cyan);
        }
        .form-title {
          font-size: 1.3rem;
          font-weight: 700;
        }
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 18px;
        }
        .form-label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
        }
        .form-input {
          padding: 12px 16px;
          border-radius: var(--radius-md);
          background: var(--bg-secondary);
          border: 1px solid var(--border-card);
          color: var(--text-primary);
          font-size: 0.94rem;
          transition: all var(--transition-fast);
        }
        .form-input:focus {
          border-color: var(--accent-primary);
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
          background: var(--bg-primary);
        }
        .form-textarea {
          resize: vertical;
          min-height: 120px;
        }
        .form-submit-btn {
          width: 100%;
          padding: 14px;
          font-size: 1rem;
          margin-top: 6px;
        }

        @media (max-width: 860px) {
          .contact-layout {
            grid-template-columns: 1fr;
          }
          .form-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
