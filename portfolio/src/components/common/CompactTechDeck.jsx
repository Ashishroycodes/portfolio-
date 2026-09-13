import React, { useState } from 'react';

const TECH_ITEMS = [
  {
    id: 'dsa',
    name: 'DSA',
    badge: 'Core',
    icon: '🧠',
    spec: 'Data Structures & Algorithms',
  },
  {
    id: 'java-cpp',
    name: 'Java/C++',
    badge: 'OOP',
    icon: '☕',
    spec: 'Object-Oriented Programming',
  },
  {
    id: 'fullstack',
    name: 'Full-Stack',
    badge: 'Web',
    icon: '💻',
    spec: 'MERN Stack • REST APIs',
  },
  {
    id: 'db',
    name: 'SQL/Cloud',
    badge: 'Data',
    icon: '🗄️',
    spec: 'PostgreSQL • MongoDB • AWS',
  },
  {
    id: 'ai',
    name: 'AI/ML',
    badge: 'AI',
    icon: '🤖',
    spec: 'Generative APIs • LangChain',
  },
];

export default function CompactTechDeck() {
  const [activeItem, setActiveItem] = useState(null);

  return (
    <div className="compact-tech-deck">
      {/* Mini 3D Gyroscopic Core */}
      <div className="mini-gyro-scene" title="Engineering Core • Active">
        <div className="mini-gyro-spinner">
          <div className="gyro-ring gyro-ring-x" />
          <div className="gyro-ring gyro-ring-y" />
          <div className="gyro-ring gyro-ring-z" />
          <div className="gyro-core-dot" />
        </div>
        <span className="deck-core-label">STACK</span>
      </div>

      {/* Interactive 3D Tech Chips */}
      <div className="tech-chips-strip">
        {TECH_ITEMS.map((item) => (
          <div
            key={item.id}
            className={`tech-chip-3d ${activeItem === item.id ? 'is-active' : ''}`}
            onMouseEnter={() => setActiveItem(item.id)}
            onMouseLeave={() => setActiveItem(null)}
          >
            <span className="chip-icon">{item.icon}</span>
            <span className="chip-name">{item.name}</span>
            <span className="chip-badge">{item.badge}</span>

            {/* 3D Floating Tooltip */}
            <div className="chip-3d-tooltip">
              <span className="tooltip-title">{item.name}</span>
              <span className="tooltip-spec">{item.spec}</span>
              <div className="tooltip-arrow" />
            </div>
          </div>
        ))}
      </div>

      {/* Live Status Indicator */}
      <div className="deck-status-indicator">
        <span className="pulse-dot-green" />
        <span className="deck-status-text">ONLINE</span>
      </div>

      <style>{`
        .compact-tech-deck {
          display: inline-flex;
          align-items: center;
          align-self: flex-start;
          gap: 6px;
          padding: 3px 8px;
          border-radius: 999px;
          background: rgba(14, 14, 18, 0.78);
          border: 1px solid rgba(212, 175, 55, 0.28);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.45),
                      0 0 10px rgba(212, 175, 55, 0.1);
          margin: 0 0 16px 0;
          position: relative;
          z-index: 10;
          max-width: 100%;
          width: fit-content;
          transform: scale(0.86);
          transform-origin: left center;
          transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
        }

        .compact-tech-deck:hover {
          transform: scale(0.88);
          border-color: rgba(212, 175, 55, 0.5);
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.55),
                      0 0 14px rgba(212, 175, 55, 0.18);
        }

        /* Mini 3D Gyroscopic Core (Delicate Micro Size) */
        .mini-gyro-scene {
          display: flex;
          align-items: center;
          gap: 5px;
          perspective: 250px;
          padding-right: 5px;
          border-right: 1px solid rgba(212, 175, 55, 0.18);
        }

        .mini-gyro-spinner {
          position: relative;
          width: 14px;
          height: 14px;
          transform-style: preserve-3d;
          animation: gyroSpinGroup 12s linear infinite;
        }

        @keyframes gyroSpinGroup {
          0% { transform: rotateY(0deg) rotateX(15deg); }
          100% { transform: rotateY(360deg) rotateX(15deg); }
        }

        .gyro-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 1px solid rgba(212, 175, 55, 0.85);
          box-shadow: 0 0 3px rgba(212, 175, 55, 0.5);
        }

        .gyro-ring-x {
          animation: gyroSpinX 4s linear infinite;
        }

        .gyro-ring-y {
          border-color: rgba(245, 158, 11, 0.85);
          animation: gyroSpinY 3s linear infinite reverse;
        }

        .gyro-ring-z {
          border-color: #ffe685;
          animation: gyroSpinZ 5s linear infinite;
        }

        @keyframes gyroSpinX {
          from { transform: rotateX(0deg); }
          to { transform: rotateX(360deg); }
        }

        @keyframes gyroSpinY {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }

        @keyframes gyroSpinZ {
          from { transform: rotateZ(0deg); }
          to { transform: rotateZ(360deg); }
        }

        .gyro-core-dot {
          position: absolute;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #fff5c0;
          box-shadow: 0 0 5px #d4af37;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .deck-core-label {
          font-family: var(--font-mono, monospace);
          font-size: 0.58rem;
          font-weight: 700;
          color: var(--accent-gold-light, #f5d77f);
          letter-spacing: 0.08em;
        }

        /* Tech Chips Strip */
        .tech-chips-strip {
          display: flex;
          align-items: center;
          gap: 4px;
          flex-wrap: wrap;
        }

        /* 3D Interactive Tech Chip (Micro Size) */
        .tech-chip-3d {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 2px 7px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--text-primary, #fff);
          font-size: 0.65rem;
          font-weight: 600;
          cursor: pointer;
          transform-style: preserve-3d;
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1),
                      background 0.2s ease,
                      border-color 0.2s ease,
                      box-shadow 0.2s ease;
          user-select: none;
        }

        .tech-chip-3d:hover {
          transform: perspective(300px) translateY(-2px) translateZ(8px);
          background: rgba(212, 175, 55, 0.15);
          border-color: var(--accent-gold, #d4af37);
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.4),
                      0 0 8px rgba(212, 175, 55, 0.3);
          color: #fff;
        }

        .chip-icon {
          font-size: 0.68rem;
          line-height: 1;
        }

        .chip-name {
          font-family: var(--font-display, sans-serif);
          letter-spacing: 0.01em;
          white-space: nowrap;
        }

        .chip-badge {
          font-size: 0.52rem;
          font-family: var(--font-mono, monospace);
          padding: 1px 3.5px;
          border-radius: 3px;
          background: rgba(212, 175, 55, 0.15);
          color: var(--accent-gold-light, #f5d77f);
          border: 1px solid rgba(212, 175, 55, 0.25);
        }

        /* 3D Floating Tooltip */
        .chip-3d-tooltip {
          position: absolute;
          bottom: calc(100% + 7px);
          left: 50%;
          transform: translateX(-50%) translateY(4px) scale(0.94);
          opacity: 0;
          pointer-events: none;
          background: rgba(18, 18, 24, 0.94);
          border: 1px solid rgba(212, 175, 55, 0.4);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          padding: 4px 8px;
          border-radius: 6px;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.6), 0 0 10px rgba(212, 175, 55, 0.2);
          display: flex;
          flex-direction: column;
          align-items: center;
          white-space: nowrap;
          transition: opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 50;
        }

        .tech-chip-3d:hover .chip-3d-tooltip {
          opacity: 1;
          transform: translateX(-50%) translateY(0) scale(1);
        }

        .tooltip-title {
          font-size: 0.65rem;
          font-weight: 700;
          color: #fff;
        }

        .tooltip-spec {
          font-size: 0.56rem;
          color: var(--accent-gold-light, #f5d77f);
          font-family: var(--font-mono, monospace);
        }

        .tooltip-arrow {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 3.5px solid transparent;
          border-right: 3.5px solid transparent;
          border-top: 3.5px solid rgba(212, 175, 55, 0.4);
        }

        /* Live Status Dot (Micro Size) */
        .deck-status-indicator {
          display: flex;
          align-items: center;
          gap: 4px;
          padding-left: 5px;
          border-left: 1px solid rgba(212, 175, 55, 0.18);
        }

        .pulse-dot-green {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 5px #22c55e;
          animation: dotGlow 1.8s ease-in-out infinite alternate;
        }

        @keyframes dotGlow {
          0% { transform: scale(0.85); opacity: 0.7; }
          100% { transform: scale(1.2); opacity: 1; }
        }

        .deck-status-text {
          font-family: var(--font-mono, monospace);
          font-size: 0.52rem;
          font-weight: 700;
          color: #86efac;
          letter-spacing: 0.06em;
        }

        @media (max-width: 640px) {
          .compact-tech-deck {
            flex-wrap: wrap;
            gap: 5px;
            padding: 4px 8px;
            transform: scale(0.92);
          }
          .chip-badge {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
