import React, { useState } from 'react';
import { FolderGit2, ExternalLink, Sparkles, Layers, Info, ArrowRight } from 'lucide-react';
import { GithubIcon } from '../common/Icons';
import { portfolioData } from '../../data/portfolioData';
import Modal from '../common/Modal';
import TiltCard from '../common/TiltCard';
import { useIntersection } from '../../hooks/useIntersection';

export default function Projects() {
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [ref, isVisible] = useIntersection();

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'fullstack', label: 'Full-Stack' },
    { id: 'frontend', label: 'Frontend & UI' },
    { id: 'ai', label: 'AI & Data' },
  ];

  const filteredProjects = portfolioData.projects.filter((project) => {
    if (filter === 'all') return true;
    if (Array.isArray(project.category)) {
      return project.category.includes(filter);
    }
    return project.category === filter;
  });

  return (
    <section id="projects" className="section projects-section" ref={ref}>
      <div className="container">
        {/* Section Header */}
        <div className={`section-header reveal-init ${isVisible ? 'reveal-visible' : ''}`}>
          <div className="section-tag">
            <FolderGit2 size={14} />
            <span>Portfolio Work</span>
          </div>
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects & Systems</span>
          </h2>
          <p className="section-subtitle">
            A curated selection of web platforms, developer tools, and high-performance software systems.
          </p>
        </div>

        {/* Filter Controls */}
        <div className={`filter-container reveal-init ${isVisible ? 'reveal-visible' : ''}`}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`filter-btn ${filter === cat.id ? 'active' : ''}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid with 3D Transitions */}
        <div className={`projects-grid reveal-init ${isVisible ? 'reveal-visible' : ''}`}>
          {filteredProjects.map((project) => (
            <TiltCard
              key={project.id}
              className="glass-card project-card"
              maxTilt={9}
              perspective={1100}
            >
              {/* Image Preview Container */}
              <div className="project-image-wrapper">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80';
                  }}
                />
                <div className="project-image-overlay">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="btn btn-secondary btn-sm overlay-btn"
                  >
                    <Info size={14} />
                    <span>Quick Overview</span>
                  </button>
                </div>
                {project.featured && (
                  <span className="featured-badge">
                    <Sparkles size={12} />
                    <span>Featured</span>
                  </span>
                )}
              </div>

              {/* Card Body */}
              <div className="project-card-body">
                <div className="project-cat-row">
                  <span className="project-category-tag">{project.categoryLabel}</span>
                </div>

                <h3 className="project-card-title">{project.title}</h3>
                <p className="project-card-summary">{project.summary}</p>

                {/* Tech Tags */}
                <div className="project-tech-tags">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span key={tech} className="tech-badge">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="tech-badge more">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>

                {/* Actions Footer */}
                <div className="project-card-footer">
                  <div className="project-btn-row">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary btn-sm project-action-btn"
                      aria-label={`View GitHub Repository for ${project.title}`}
                      title="View GitHub Repository"
                    >
                      <GithubIcon size={14} />
                      <span>View GitHub Repository</span>
                    </a>
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm project-action-btn"
                      aria-label={`Open Live Demo for ${project.title}`}
                      title="Live Demo"
                    >
                      <ExternalLink size={14} />
                      <span>Live Demo</span>
                    </a>
                  </div>

                  <div className="project-extra-row">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="btn-link details-link"
                    >
                      <span>Inspect Overview</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <Modal
          isOpen={Boolean(selectedProject)}
          onClose={() => setSelectedProject(null)}
          title={selectedProject.title}
          subtitle={selectedProject.categoryLabel}
        >
          <div className="modal-project-content">
            <div className="modal-img-wrap">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="modal-project-img"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80';
                }}
              />
            </div>

            <h4 className="modal-section-h">System Architecture & Overview</h4>
            <p className="modal-description">{selectedProject.description}</p>

            <h4 className="modal-section-h">Key Technical Highlights</h4>
            <ul className="modal-highlights-list">
              {selectedProject.highlights.map((item, idx) => (
                <li key={idx} className="highlight-bullet">
                  {item}
                </li>
              ))}
            </ul>

            <h4 className="modal-section-h">Tech Stack Utilized</h4>
            <div className="modal-tech-list">
              {selectedProject.technologies.map((t) => (
                <span key={t} className="tech-chip">
                  {t}
                </span>
              ))}
            </div>

            <div className="modal-action-row">
              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                aria-label={`View GitHub Repository for ${selectedProject.title}`}
              >
                <GithubIcon size={16} />
                <span>View GitHub Repository</span>
              </a>
              <a
                href={selectedProject.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                aria-label={`Open Live Demo for ${selectedProject.title}`}
              >
                <ExternalLink size={15} />
                <span>Live Demo</span>
              </a>
            </div>
          </div>
        </Modal>
      )}

      <style>{`
        .projects-section {
          position: relative;
        }
        .filter-container {
          display: flex;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 44px;
        }
        .filter-btn {
          padding: 8px 20px;
          border-radius: var(--radius-full);
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-secondary);
          background: var(--bg-card);
          border: 1px solid var(--border-card);
          transition: all var(--transition-fast);
        }
        .filter-btn:hover {
          color: var(--text-primary);
          border-color: var(--accent-primary);
        }
        .filter-btn.active {
          background: var(--gradient-brand);
          color: #ffffff;
          border-color: transparent;
          box-shadow: 0 4px 14px rgba(99, 102, 241, 0.4);
        }
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 32px;
        }
        .project-card {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          padding: 0;
          height: 100%;
        }
        .project-image-wrapper {
          position: relative;
          width: 100%;
          height: 210px;
          overflow: hidden;
          background: var(--bg-secondary);
        }
        .project-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .project-card:hover .project-image {
          transform: scale(1.06);
        }
        .project-image-overlay {
          position: absolute;
          inset: 0;
          background: rgba(8, 11, 17, 0.55);
          backdrop-filter: blur(3px);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity var(--transition-normal);
        }
        .project-card:hover .project-image-overlay {
          opacity: 1;
        }
        .overlay-btn {
          transform: translateY(10px);
          transition: transform var(--transition-normal);
        }
        .project-card:hover .overlay-btn {
          transform: translateY(0);
        }
        .featured-badge {
          position: absolute;
          top: 14px;
          left: 14px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          border-radius: var(--radius-full);
          background: rgba(14, 19, 31, 0.85);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: var(--accent-cyan);
          font-size: 0.74rem;
          font-weight: 700;
          text-transform: uppercase;
        }
        .project-card-body {
          padding: 24px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
        .project-cat-row {
          margin-bottom: 8px;
        }
        .project-category-tag {
          font-size: 0.78rem;
          color: var(--accent-primary);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .project-card-title {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 10px;
          color: var(--text-primary);
          line-height: 1.3;
        }
        .project-card-summary {
          font-size: 0.92rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 20px;
          flex-grow: 1;
        }
        .project-tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 22px;
        }
        .tech-badge {
          font-size: 0.76rem;
          font-weight: 500;
          padding: 3px 9px;
          border-radius: var(--radius-sm);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
        }
        [data-theme='light'] .tech-badge {
          background: rgba(0, 0, 0, 0.04);
        }
        .tech-badge.more {
          background: rgba(99, 102, 241, 0.1);
          color: var(--accent-primary);
          border-color: rgba(99, 102, 241, 0.2);
        }
        .project-card-footer {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding-top: 18px;
          border-top: 1px solid var(--border-subtle);
          margin-top: auto;
        }
        .project-btn-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          width: 100%;
        }
        .project-action-btn {
          width: 100%;
          padding: 8px 10px;
          font-size: 0.8rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          text-align: center;
          text-decoration: none;
        }
        .project-action-btn span {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .project-extra-row {
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }
        .details-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-secondary);
          background: none;
          border: none;
          cursor: pointer;
          transition: gap var(--transition-fast), color var(--transition-fast);
          padding: 0;
        }
        .details-link:hover {
          gap: 9px;
          color: var(--accent-gold);
        }

        @media (max-width: 440px) {
          .project-btn-row {
            grid-template-columns: 1fr;
          }
        }

        /* Modal Specific Styling */
        .modal-project-content {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .modal-img-wrap {
          width: 100%;
          height: 240px;
          border-radius: var(--radius-md);
          overflow: hidden;
          margin-bottom: 8px;
        }
        .modal-project-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .modal-section-h {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-top: 8px;
        }
        .modal-description {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.7;
        }
        .modal-highlights-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .highlight-bullet {
          position: relative;
          padding-left: 20px;
          font-size: 0.92rem;
          color: var(--text-secondary);
        }
        .highlight-bullet::before {
          content: '▹';
          position: absolute;
          left: 0;
          color: var(--accent-cyan);
          font-weight: bold;
        }
        .modal-tech-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 12px;
        }
        .modal-action-row {
          display: flex;
          gap: 14px;
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid var(--border-subtle);
          flex-wrap: wrap;
        }

        @media (max-width: 640px) {
          .projects-grid {
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
