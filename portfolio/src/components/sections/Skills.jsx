import React, { useState } from 'react';
import {
  Code2,
  Terminal,
  Database,
  Cpu,
  Sparkles,
  GitBranch,
  Layers,
  BookOpen,
  CheckCircle2,
  Hourglass,
} from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import { useIntersection } from '../../hooks/useIntersection';
import TiltCard from '../common/TiltCard';

export default function Skills() {
  const [filter, setFilter] = useState('all');
  const [ref, isVisible] = useIntersection();
  const { skills } = portfolioData;

  const allSkills = [
    ...skills.primary.map((s) => ({ ...s, isPrimary: true })),
    ...skills.learning.map((s) => ({ ...s, isPrimary: false })),
  ];

  const filteredSkills = allSkills.filter((s) => {
    if (filter === 'all') return true;
    if (filter === 'primary') return s.isPrimary;
    if (filter === 'learning') return !s.isPrimary;
    return true;
  });

  const getSkillIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'languages':
        return <Terminal size={20} />;
      case 'web dev':
        return <Code2 size={20} />;
      case 'data & systems':
        return <Database size={20} />;
      case 'tools':
        return <GitBranch size={20} />;
      case 'core cs':
        return <Layers size={20} />;
      case 'emerging tech':
        return <Cpu size={20} />;
      default:
        return <Code2 size={20} />;
    }
  };

  return (
    <section id="skills" className="section skills-section" ref={ref}>
      {/* 3D Geometric Ambient Halo in Section Background */}
      <div className="skills-3d-backdrop" aria-hidden="true">
        <div className="skills-3d-backdrop-inner" />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Section Header */}
        <div className={`section-header reveal-init ${isVisible ? 'reveal-visible' : ''}`}>
          <div className="section-tag">
            <Cpu size={14} />
            <span>Technical Toolkit</span>
          </div>
          <h2 className="section-title">
            Skills & <span className="gold-text">Competencies</span>
          </h2>
          <p className="section-subtitle">
            An honest breakdown of languages, frameworks, and foundational concepts I practice and continuously learn.
          </p>
        </div>

        {/* Filter Controls */}
        <div className={`skills-filters-wrap reveal-init ${isVisible ? 'reveal-visible' : ''}`}>
          <button
            onClick={() => setFilter('all')}
            className={`filter-tab-btn ${filter === 'all' ? 'active' : ''}`}
          >
            All Skills ({allSkills.length})
          </button>
          <button
            onClick={() => setFilter('primary')}
            className={`filter-tab-btn ${filter === 'primary' ? 'active' : ''}`}
          >
            <CheckCircle2 size={14} />
            <span>Primary Skills ({skills.primary.length})</span>
          </button>
          <button
            onClick={() => setFilter('learning')}
            className={`filter-tab-btn ${filter === 'learning' ? 'active' : ''}`}
          >
            <Hourglass size={14} />
            <span>Currently Learning ({skills.learning.length})</span>
          </button>
        </div>

        {/* Skills Cards Grid with 3D Tilt & Parallax */}
        <div
          key={filter}
          className={`skills-grid reveal-init ${isVisible ? 'reveal-visible' : ''}`}
        >
          {filteredSkills.map((skill, index) => (
            <TiltCard
              key={skill.name}
              className={`glass-card skill-card-3d ${skill.isPrimary ? 'primary-skill' : 'learning-skill'}`}
              maxTilt={14}
              perspective={950}
              style={{
                animationDelay: `${index * 0.05}s`,
              }}
            >
              <div className="skill-card-content">
                <div className="skill-card-top">
                  <div className="skill-icon-avatar">
                    {getSkillIcon(skill.category)}
                  </div>
                  <div className="skill-badge-status">
                    {skill.isPrimary ? (
                      <span className="badge-primary-pill">
                        <span className="bullet-gold" />
                        <span>Primary</span>
                      </span>
                    ) : (
                      <span className="badge-learning-pill">
                        <Hourglass size={11} />
                        <span>In Progress</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="skill-card-body">
                  <span className="skill-category-lbl">{skill.category}</span>
                  <h3 className="skill-name-title">{skill.name}</h3>
                  <p className="skill-description-text">{skill.description}</p>
                </div>

                {/* 3D Interactive Proficiency Meter */}
                <div className="skill-proficiency-wrap">
                  <div className="skill-prof-header">
                    <span className="prof-label">Proficiency</span>
                    <span className="prof-val">{skill.isPrimary ? 'Advanced' : 'Active Learning'}</span>
                  </div>
                  <div className="skill-prof-track">
                    <div
                      className={`skill-prof-fill ${skill.isPrimary ? 'primary-fill' : 'learning-fill'}`}
                      style={{ width: skill.isPrimary ? '90%' : '65%' }}
                    />
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>

      <style>{`
        .skills-section {
          position: relative;
          background: linear-gradient(180deg, transparent 0%, rgba(212, 175, 55, 0.02) 50%, transparent 100%);
          overflow: hidden;
        }

        /* 3D Rotating Ambient Rings in Section Background */
        .skills-3d-backdrop {
          position: absolute;
          top: 35%;
          left: 50%;
          transform: translate(-50%, -50%) perspective(1000px) rotateX(65deg);
          width: 720px;
          height: 720px;
          border-radius: 50%;
          border: 1.5px dashed rgba(212, 175, 55, 0.14);
          pointer-events: none;
          z-index: 1;
          animation: rotateBackdrop 30s linear infinite;
        }
        .skills-3d-backdrop-inner {
          position: absolute;
          inset: 90px;
          border-radius: 50%;
          border: 1px solid rgba(212, 175, 55, 0.08);
          background: radial-gradient(circle, rgba(212, 175, 55, 0.06) 0%, transparent 70%);
          filter: blur(25px);
        }
        @keyframes rotateBackdrop {
          0% { transform: translate(-50%, -50%) perspective(1000px) rotateX(65deg) rotateZ(0deg); }
          100% { transform: translate(-50%, -50%) perspective(1000px) rotateX(65deg) rotateZ(360deg); }
        }

        .skills-filters-wrap {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 48px;
        }
        .filter-tab-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 22px;
          border-radius: var(--radius-full);
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-secondary);
          background: var(--bg-card);
          border: 1px solid var(--border-card);
          transition: all var(--transition-fast);
          cursor: pointer;
        }
        .filter-tab-btn:hover {
          color: var(--text-primary);
          border-color: var(--border-gold);
        }
        .filter-tab-btn.active {
          background: var(--gradient-gold);
          color: #080808;
          border-color: transparent;
          font-weight: 700;
          box-shadow: 0 4px 18px rgba(212, 175, 55, 0.35);
        }

        /* Skills Grid with 3D Card Physics */
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
          gap: 26px;
        }

        .skill-card-3d {
          padding: 24px;
          display: flex;
          flex-direction: column;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          background: rgba(14, 14, 18, 0.72);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
          animation: card3DEnter 0.55s cubic-bezier(0.16, 1, 0.3, 1) both;
          transform-style: preserve-3d;
          cursor: pointer;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }

        @keyframes card3DEnter {
          from {
            opacity: 0;
            transform: perspective(950px) rotateX(20deg) translateY(28px) scale(0.93);
          }
          to {
            opacity: 1;
            transform: perspective(950px) rotateX(0deg) translateY(0) scale(1);
          }
        }

        .skill-card-content {
          display: flex;
          flex-direction: column;
          gap: 16px;
          transform-style: preserve-3d;
          height: 100%;
        }

        .skill-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          transform-style: preserve-3d;
        }

        .skill-icon-avatar {
          width: 46px;
          height: 46px;
          border-radius: 14px;
          background: rgba(212, 175, 55, 0.1);
          border: 1px solid var(--border-gold);
          color: var(--accent-gold);
          display: flex;
          align-items: center;
          justify-content: center;
          transform: translateZ(30px);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
        }

        .skill-card-3d:hover .skill-icon-avatar {
          background: var(--gradient-gold);
          color: #080808;
          transform: translateZ(40px) rotateY(12deg) scale(1.1);
          box-shadow: 0 8px 24px rgba(212, 175, 55, 0.45);
        }

        .skill-badge-status {
          transform: translateZ(24px);
        }

        .badge-primary-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 11px;
          border-radius: var(--radius-full);
          background: rgba(212, 175, 55, 0.14);
          border: 1px solid var(--border-gold);
          color: var(--accent-gold-light);
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
        }
        .bullet-gold {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent-gold);
          box-shadow: 0 0 6px rgba(212, 175, 55, 0.8);
        }

        .badge-learning-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 11px;
          border-radius: var(--radius-full);
          background: rgba(245, 158, 11, 0.12);
          border: 1px solid rgba(245, 158, 11, 0.35);
          color: var(--accent-amber);
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
        }

        .skill-card-body {
          display: flex;
          flex-direction: column;
          gap: 6px;
          transform: translateZ(18px);
          flex-grow: 1;
        }
        .skill-category-lbl {
          font-size: 0.74rem;
          font-weight: 600;
          text-transform: uppercase;
          color: var(--text-muted);
          letter-spacing: 0.05em;
        }
        .skill-name-title {
          font-size: 1.18rem;
          font-weight: 700;
          color: var(--text-primary);
          transition: color var(--transition-fast);
        }
        .skill-card-3d:hover .skill-name-title {
          color: var(--accent-gold-light);
        }
        .skill-description-text {
          font-size: 0.86rem;
          color: var(--text-secondary);
          line-height: 1.55;
          margin-top: 2px;
        }

        /* 3D Proficiency Track */
        .skill-proficiency-wrap {
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding-top: 14px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          transform: translateZ(20px);
        }

        .skill-prof-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .prof-label {
          color: var(--text-muted);
          font-weight: 600;
        }

        .prof-val {
          color: var(--accent-gold-light);
          font-weight: 700;
        }

        .skill-prof-track {
          width: 100%;
          height: 6px;
          background: rgba(255, 255, 255, 0.06);
          border-radius: var(--radius-full);
          overflow: hidden;
        }

        .skill-prof-fill {
          height: 100%;
          border-radius: var(--radius-full);
          transition: width 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .primary-fill {
          background: var(--gradient-gold);
          box-shadow: 0 0 10px rgba(212, 175, 55, 0.6);
        }

        .learning-fill {
          background: linear-gradient(90deg, #f59e0b, #d97706);
          box-shadow: 0 0 10px rgba(245, 158, 11, 0.5);
        }

        .skill-card-3d:hover {
          border-color: rgba(212, 175, 55, 0.55);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.8), 0 0 25px rgba(212, 175, 55, 0.2);
        }

        @media (max-width: 640px) {
          .skills-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
