import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('portfolio-theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle-btn"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <Sun className="theme-icon sun" size={20} />
      ) : (
        <Moon className="theme-icon moon" size={20} />
      )}
      <style>{`
        .theme-toggle-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: var(--radius-full);
          background: var(--bg-card);
          border: 1px solid var(--border-card);
          color: var(--text-primary);
          transition: all var(--transition-normal);
          position: relative;
          overflow: hidden;
        }
        .theme-toggle-btn:hover {
          border-color: var(--accent-primary);
          box-shadow: var(--glow-accent);
          transform: scale(1.05);
        }
        .theme-icon {
          transition: transform var(--transition-normal), color var(--transition-normal);
        }
        .theme-icon.sun {
          color: var(--accent-amber);
        }
        .theme-icon.moon {
          color: var(--accent-primary);
        }
      `}</style>
    </button>
  );
}
