import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, subtitle, children }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-container glass-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-header">
          <div>
            {subtitle && <span className="modal-subtitle">{subtitle}</span>}
            <h3 className="modal-title">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="modal-close-btn"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>

      <style>{`
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(4, 7, 13, 0.75);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
          animation: modalFadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .modal-container {
          width: 100%;
          max-width: 680px;
          max-height: 90vh;
          overflow-y: auto;
          background: var(--bg-card-elevated);
          border: 1px solid var(--border-card-hover);
          border-radius: var(--radius-lg);
          padding: 32px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6), var(--glow-accent);
          animation: modalScaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border-subtle);
        }
        .modal-subtitle {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--accent-primary);
          font-weight: 600;
          display: block;
          margin-bottom: 4px;
        }
        .modal-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .modal-close-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-card);
          border: 1px solid var(--border-card);
          color: var(--text-secondary);
          transition: all var(--transition-fast);
          flex-shrink: 0;
        }
        .modal-close-btn:hover {
          color: var(--text-primary);
          background: rgba(244, 63, 94, 0.15);
          border-color: var(--accent-rose);
          transform: rotate(90deg);
        }
        .modal-body {
          color: var(--text-secondary);
          font-size: 0.96rem;
          line-height: 1.7;
        }
        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalScaleUp {
          from { transform: scale(0.95) translateY(12px); opacity: 0; }
          to { transform: scale(1) translateY(0); opacity: 1; }
        }
        @media (max-width: 640px) {
          .modal-container {
            padding: 20px;
          }
          .modal-title {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
}
