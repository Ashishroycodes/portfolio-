import React from 'react';
import { Globe, Layout, Server, Sparkles, Check, ArrowRight } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import { useIntersection } from '../../hooks/useIntersection';
import TiltCard from '../common/TiltCard';

export default function Services() {
  const { services } = portfolioData;
  const [ref, isVisible] = useIntersection();

  const getServiceIcon = (id) => {
    switch (id) {
      case 'web-dev':
        return <Globe size={24} />;
      case 'frontend-dev':
        return <Layout size={24} />;
      case 'backend-api':
        return <Server size={24} />;
      case 'ai-data':
      default:
        return <Sparkles size={24} />;
    }
  };

  return (
    <section id="services" className="section services-section" ref={ref}>
      <div className="container">
        {/* Section Header */}
        <div className={`section-header reveal-init ${isVisible ? 'reveal-visible' : ''}`}>
          <div className="section-tag">
            <Sparkles size={14} />
            <span>Offerings & Focus</span>
          </div>
          <h2 className="section-title">
            Areas of <span className="gold-text">Development Focus</span>
          </h2>
          <p className="section-subtitle">
            Practical development areas where I build applications, contribute to teams, and solve software problems.
          </p>
        </div>

        {/* Services Cards Grid with 3D Tilt */}
        <div className={`services-grid reveal-init ${isVisible ? 'reveal-visible' : ''}`}>
          {services.map((service) => (
            <TiltCard key={service.id} className="glass-card service-card" maxTilt={8}>
              <div className="service-top-row">
                <div className="service-icon-box">
                  {getServiceIcon(service.id)}
                </div>
                <span className="service-cat-pill">{service.category}</span>
              </div>

              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.description}</p>

              <div className="service-divider" />

              <ul className="service-features-list">
                {service.features.map((feat) => (
                  <li key={feat} className="service-feature-item">
                    <span className="gold-check-icon">
                      <Check size={14} />
                    </span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <div className="service-card-footer">
                <a href="#contact" className="service-inquire-link">
                  <span>Discuss a Project</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>

      <style>{`
        .services-section {
          position: relative;
        }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 28px;
        }
        .service-card {
          padding: 32px;
          display: flex;
          flex-direction: column;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          background: rgba(16, 16, 20, 0.68);
          transition: transform var(--transition-normal), border-color var(--transition-normal), box-shadow var(--transition-normal);
        }
        .service-card:hover {
          transform: translateY(-5px);
          border-color: var(--border-gold-hover);
          box-shadow: var(--glow-gold-subtle);
        }
        .service-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 22px;
        }
        .service-icon-box {
          width: 50px;
          height: 50px;
          border-radius: 14px;
          background: rgba(212, 175, 55, 0.1);
          border: 1px solid var(--border-gold);
          color: var(--accent-gold);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform var(--transition-normal);
        }
        .service-card:hover .service-icon-box {
          transform: scale(1.08);
          background: rgba(212, 175, 55, 0.16);
        }
        .service-cat-pill {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--text-muted);
          letter-spacing: 0.05em;
        }
        .service-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 12px;
          line-height: 1.3;
        }
        .service-desc {
          font-size: 0.92rem;
          color: var(--text-secondary);
          line-height: 1.65;
          margin-bottom: 20px;
          flex-grow: 1;
        }
        .service-divider {
          width: 100%;
          height: 1px;
          background: var(--border-subtle);
          margin-bottom: 18px;
        }
        .service-features-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 24px;
        }
        .service-feature-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.88rem;
          color: var(--text-secondary);
        }
        .gold-check-icon {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: rgba(212, 175, 55, 0.12);
          color: var(--accent-gold);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .service-card-footer {
          margin-top: auto;
          padding-top: 16px;
          border-top: 1px solid var(--border-subtle);
        }
        .service-inquire-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--accent-gold);
          transition: gap var(--transition-fast), color var(--transition-fast);
        }
        .service-inquire-link:hover {
          gap: 10px;
          color: var(--accent-gold-light);
        }

        @media (max-width: 640px) {
          .services-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
