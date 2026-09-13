import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose }) {
  if (!message) return null;

  const icons = {
    success: <CheckCircle2 size={18} className="toast-icon success" />,
    error: <AlertCircle size={18} className="toast-icon error" />,
    info: <Info size={18} className="toast-icon info" />,
  };

  return (
    <div className={`toast-container toast-${type}`}>
      {icons[type]}
      <span className="toast-text">{message}</span>
      {onClose && (
        <button onClick={onClose} className="toast-close" aria-label="Close notification">
          <X size={14} />
        </button>
      )}

      <style>{`
        .toast-container {
          position: fixed;
          bottom: 28px;
          right: 28px;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 20px;
          border-radius: var(--radius-md);
          background: var(--bg-card-elevated);
          border: 1px solid var(--border-card-hover);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4), var(--glow-accent);
          z-index: 2000;
          font-size: 0.92rem;
          font-weight: 500;
          color: var(--text-primary);
          animation: toastSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .toast-icon.success {
          color: var(--accent-emerald);
        }
        .toast-icon.error {
          color: var(--accent-rose);
        }
        .toast-icon.info {
          color: var(--accent-cyan);
        }
        .toast-close {
          color: var(--text-muted);
          transition: color var(--transition-fast);
          display: flex;
          align-items: center;
        }
        .toast-close:hover {
          color: var(--text-primary);
        }
        @keyframes toastSlideUp {
          from {
            transform: translateY(30px) scale(0.95);
            opacity: 0;
          }
          to {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }
        @media (max-width: 640px) {
          .toast-container {
            bottom: 20px;
            right: 20px;
            left: 20px;
          }
        }
      `}</style>
    </div>
  );
}
