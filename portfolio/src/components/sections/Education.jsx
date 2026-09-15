import React, { useState, useRef, useEffect } from 'react';
import {
  GraduationCap,
  MapPin,
  Calendar,
  Sparkles,
  CheckCircle2,
  BookOpen,
  Award,
  ChevronLeft,
  ChevronRight,
  School,
  Compass,
  ArrowRight,
} from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import { useIntersection } from '../../hooks/useIntersection';
import TiltCard from '../common/TiltCard';

export default function Education() {
  const { educationJourney } = portfolioData;
  const [ref, isVisible] = useIntersection();

  // Sort chronologically: School (10th) -> Intermediate College (12th) -> University (B.Tech CSE)
  const orderedStages = [
    // 1. School (10th)
    educationJourney.find((item) => item.id === 'st-xaviers-10th') || educationJourney[2],
    // 2. Senior Secondary College (12th)
    educationJourney.find((item) => item.id === 'dbkn-12th') || educationJourney[1],
    // 3. Current University (B.Tech CSE)
    educationJourney.find((item) => item.id === 'vgu-btech') || educationJourney[0],
  ].filter(Boolean);

  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'school' | 'college'
  const [activeIndex, setActiveIndex] = useState(2); // Default to current university (index 2)
  const [scrollProgress, setScrollProgress] = useState(1); // 100% on current university

  const scrollDeckRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  const filteredStages = orderedStages.filter((item) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'school') return !item.isCurrent;
    if (activeTab === 'college') return item.isCurrent;
    return true;
  });

  // Track scroll position to update active index and progress bar
  const handleScroll = () => {
    const el = scrollDeckRef.current;
    if (!el) return;

    const maxScroll = el.scrollWidth - el.clientWidth;
    const progress = maxScroll > 0 ? el.scrollLeft / maxScroll : 0;
    setScrollProgress(Math.min(1, Math.max(0, progress)));

    // Calculate nearest card dynamically based on actual card size
    const firstCard = el.querySelector('.scroll-deck-card-wrap');
    const cardWidth = firstCard ? (firstCard.getBoundingClientRect().width + 18) : 420;
    const newIndex = Math.min(
      filteredStages.length - 1,
      Math.max(0, Math.round(el.scrollLeft / cardWidth))
    );
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  // Scroll to a specific card index horizontally within the card deck container
  const scrollToCard = (index, smooth = true) => {
    const el = scrollDeckRef.current;
    if (!el) return;
    const cards = el.querySelectorAll('.scroll-deck-card-wrap');
    if (cards[index]) {
      const card = cards[index];
      const cardRect = card.getBoundingClientRect();
      const containerRect = el.getBoundingClientRect();
      if (containerRect.width > 0) {
        const targetScroll = el.scrollLeft + (cardRect.left - containerRect.left) - (containerRect.width - cardRect.width) / 2;
        el.scrollTo({
          left: Math.max(0, targetScroll),
          behavior: smooth ? 'smooth' : 'auto',
        });
      }
      setActiveIndex(index);
    }
  };

  // Drag-to-scroll mouse handlers
  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - scrollDeckRef.current.offsetLeft;
    scrollLeftStart.current = scrollDeckRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - scrollDeckRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    scrollDeckRef.current.scrollLeft = scrollLeftStart.current - walk;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // On mount or tab change, horizontally position the card deck to the current University card without scrolling the page window
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToCard(filteredStages.length - 1, false);
    }, 200);
    return () => clearTimeout(timer);
  }, [activeTab, filteredStages.length]);

  const getStageIcon = (item, size = 20) => {
    if (item.isCurrent) return <GraduationCap size={size} />;
    if (item.id === 'dbkn-12th') return <Award size={size} />;
    return <BookOpen size={size} />;
  };

  const getStageCategoryLabel = (item) => {
    if (item.isCurrent) return 'COLLEGE & UNIVERSITY DEGREE';
    if (item.id === 'dbkn-12th') return 'SENIOR SECONDARY COLLEGE (12TH)';
    return 'SECONDARY HIGH SCHOOL (10TH)';
  };

  return (
    <section id="experience" className="section experience-section" ref={ref}>
      <div className="container">
        {/* Section Header */}
        <div className={`section-header reveal-init ${isVisible ? 'reveal-visible' : ''}`}>
          <div className="section-tag">
            <GraduationCap size={14} />
            <span>Academic Pathway</span>
          </div>
          <h2 className="section-title">
            Education & <span className="gold-text">Learning Journey</span>
          </h2>
          <p className="section-subtitle">
            Smoothly scroll through my school and college milestones — from foundational schooling in Bihar to pursuing B.Tech in Computer Science & Engineering at VGU Jaipur.
          </p>
        </div>

        {/* Interactive Milestone Stepper Track */}
        <div className={`academic-stepper-track reveal-init ${isVisible ? 'reveal-visible' : ''}`}>
          <div className="stepper-progress-line">
            <div
              className="stepper-progress-fill"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>

          <div className="stepper-nodes-row">
            {filteredStages.map((stage, sIdx) => (
              <button
                key={stage.id}
                type="button"
                className={`stepper-node-btn ${activeIndex === sIdx ? 'is-active' : ''} ${
                  stage.isCurrent ? 'is-current-step' : ''
                }`}
                onClick={() => scrollToCard(sIdx)}
              >
                <div className="node-marker-circle">
                  {stage.isCurrent ? (
                    <span className="pulse-dot-gold" />
                  ) : (
                    <span className="node-number">{`0${sIdx + 1}`}</span>
                  )}
                </div>
                <div className="node-meta">
                  <span className="node-stage-tag">{stage.stage}</span>
                  <span className="node-inst-name">{stage.institution}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Deck Category Switcher Filters */}
        <div className={`deck-filter-bar reveal-init ${isVisible ? 'reveal-visible' : ''}`}>
          <div className="filter-pill-cluster">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`deck-tab-pill ${activeTab === 'all' ? 'active' : ''}`}
            >
              <span>All Academic Stages (3)</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('school')}
              className={`deck-tab-pill ${activeTab === 'school' ? 'active' : ''}`}
            >
              <School size={14} />
              <span>School Days (10th & 12th)</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('college')}
              className={`deck-tab-pill ${activeTab === 'college' ? 'active' : ''}`}
            >
              <GraduationCap size={14} />
              <span>Current University (B.Tech CSE)</span>
            </button>
          </div>

          {/* Smooth Scroll Navigation Arrows */}
          <div className="deck-arrow-nav">
            <button
              type="button"
              className="deck-nav-btn"
              onClick={() => scrollToCard(Math.max(0, activeIndex - 1))}
              disabled={activeIndex === 0}
              aria-label="Previous Milestone"
              title="Previous Milestone"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="deck-step-counter">
              <span className="counter-current">0{activeIndex + 1}</span>
              <span className="counter-sep">/</span>
              <span className="counter-total">0{filteredStages.length}</span>
            </span>
            <button
              type="button"
              className="deck-nav-btn"
              onClick={() => scrollToCard(Math.min(filteredStages.length - 1, activeIndex + 1))}
              disabled={activeIndex === filteredStages.length - 1}
              aria-label="Next Milestone"
              title="Next Milestone"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* =========================================================
            MAIN SMOOTH SCROLL CARD DECK
            ========================================================= */}
        <div
          ref={scrollDeckRef}
          className="school-college-scroll-deck"
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {filteredStages.map((item, index) => {
            const isCardActive = activeIndex === index;
            return (
              <div
                key={item.id}
                className={`scroll-deck-card-wrap ${isCardActive ? 'card-active' : 'card-dormant'}`}
                onClick={() => scrollToCard(index)}
              >
                <TiltCard
                  className={`glass-card deck-card-body ${
                    item.isCurrent ? 'current-academic-card' : ''
                  }`}
                  maxTilt={8}
                >
                  {/* Subtle Gold Watermark Seal in Background */}
                  <div className="card-watermark-emblem" aria-hidden="true">
                    {getStageIcon(item)}
                  </div>

                  {/* Card Top Category Ribbon */}
                  <div className="deck-card-top-bar">
                    <div className="stage-category-flag">
                      <span className="flag-dot" />
                      <span>{getStageCategoryLabel(item)}</span>
                    </div>

                    {item.isCurrent ? (
                      <div className="status-live-chip">
                        <span className="pulse-dot-gold" />
                        <span>CURRENT ENROLLMENT</span>
                      </div>
                    ) : (
                      <div className="status-completed-chip">
                        <CheckCircle2 size={13} />
                        <span>GRADUATED / COMPLETED</span>
                      </div>
                    )}
                  </div>

                  {/* Institution & Degree Headline */}
                  <div className="deck-card-institution-block">
                    <div className="inst-emblem-badge">{getStageIcon(item)}</div>
                    <div className="inst-details">
                      <h3 className="deck-degree-title">{item.title}</h3>
                      <div className="deck-inst-name-row">
                        <span className="deck-inst-name">{item.institution}</span>
                        <span className="deck-bullet-dot">•</span>
                        <span className="deck-location-tag">
                          <MapPin size={13} />
                          <span>{item.location}</span>
                        </span>
                      </div>
                      <div className="deck-period-pill">
                        <Calendar size={13} />
                        <span>Academic Tenure: {item.period}</span>
                      </div>
                    </div>
                  </div>

                  {/* Narrative Summary */}
                  <p className="deck-narrative-text">{item.description}</p>

                  {/* Academic Highlights Box */}
                  <div className="deck-highlights-box">
                    <div className="highlights-box-header">
                      <Sparkles size={14} className="gold-icon" />
                      <span>Key Curriculum Focus & Milestones</span>
                    </div>
                    <ul className="deck-bullet-list">
                      {item.highlights.map((point, pIdx) => (
                        <li key={pIdx} className="deck-bullet-item">
                          <span className="gold-arrow-glyph">▹</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Coursework / Skills Chips */}
                  <div className="deck-chips-footer">
                    <span className="chips-label">Coursework:</span>
                    <div className="chips-flow">
                      {item.topics.map((t) => (
                        <span key={t} className="edu-chip-item">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Quick Indicator Link */}
                  <div className="deck-card-action-row">
                    <span className="action-step-label">
                      Academic Milestone {index + 1} of {filteredStages.length}
                    </span>
                    <span className="action-hint">
                      <span>Click or Scroll Deck</span>
                      <ArrowRight size={13} />
                    </span>
                  </div>
                </TiltCard>
              </div>
            );
          })}
        </div>

        {/* Bottom Ambient Drag/Scroll Helper */}
        <div className="deck-scroll-hint-bar">
          <div className="hint-pill">
            <Compass size={14} className="hint-compass" />
            <span>Swipe or Scroll Horizontally to Explore School & College Deck</span>
          </div>
        </div>
      </div>

      <style>{`
        .experience-section {
          position: relative;
          background: linear-gradient(180deg, transparent 0%, rgba(212, 175, 55, 0.02) 50%, transparent 100%);
          overflow: hidden;
          padding: 70px 0;
        }

        /* Milestone Stepper Track */
        .academic-stepper-track {
          position: relative;
          max-width: 680px;
          margin: 0 auto 20px auto;
        }

        .stepper-progress-line {
          position: absolute;
          top: 18px;
          left: 35px;
          right: 35px;
          height: 2px;
          background: rgba(255, 255, 255, 0.08);
          z-index: 1;
        }

        .stepper-progress-fill {
          height: 100%;
          background: var(--gradient-gold, linear-gradient(90deg, #d4af37, #f59e0b));
          box-shadow: 0 0 10px rgba(212, 175, 55, 0.8);
          transition: width 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .stepper-nodes-row {
          position: relative;
          z-index: 2;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
        }

        .stepper-node-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0 6px;
          transition: transform 0.25s ease;
        }

        .stepper-node-btn:hover {
          transform: translateY(-2px);
        }

        .node-marker-circle {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #14141a;
          border: 2px solid rgba(212, 175, 55, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 6px;
          transition: all 0.25s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
        }

        .stepper-node-btn.is-active .node-marker-circle {
          border-color: var(--accent-gold, #d4af37);
          background: rgba(212, 175, 55, 0.18);
          box-shadow: 0 0 18px rgba(212, 175, 55, 0.6), 0 4px 14px rgba(0, 0, 0, 0.8);
          transform: scale(1.08);
        }

        .node-number {
          font-family: var(--font-mono, monospace);
          font-size: 0.74rem;
          font-weight: 700;
          color: var(--text-secondary);
        }

        .stepper-node-btn.is-active .node-number {
          color: var(--accent-gold-light, #f5d77f);
        }

        .node-meta {
          text-align: center;
          max-width: 150px;
        }

        .node-stage-tag {
          display: block;
          font-size: 0.64rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--text-muted);
          margin-bottom: 2px;
        }

        .stepper-node-btn.is-active .node-stage-tag {
          color: var(--accent-gold);
        }

        .node-inst-name {
          display: block;
          font-size: 0.74rem;
          font-weight: 600;
          color: var(--text-secondary);
          line-height: 1.25;
        }

        .stepper-node-btn.is-active .node-inst-name {
          color: #fff;
        }

        /* Filter & Arrow Controls Bar */
        .deck-filter-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 16px;
          max-width: 780px;
          margin-left: auto;
          margin-right: auto;
        }

        .filter-pill-cluster {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
        }

        .deck-tab-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 6px 13px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--text-secondary);
          font-size: 0.76rem;
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .deck-tab-pill:hover {
          color: #fff;
          border-color: rgba(212, 175, 55, 0.4);
          background: rgba(212, 175, 55, 0.1);
        }

        .deck-tab-pill.active {
          background: var(--gradient-gold);
          color: #080808;
          font-weight: 700;
          border-color: transparent;
          box-shadow: 0 4px 12px rgba(212, 175, 55, 0.35);
        }

        .deck-arrow-nav {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(18, 18, 24, 0.8);
          border: 1px solid rgba(212, 175, 55, 0.25);
          padding: 3px 8px;
          border-radius: 999px;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
        }

        .deck-nav-btn {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .deck-nav-btn:hover:not(:disabled) {
          background: var(--accent-gold);
          color: #080808;
          box-shadow: 0 0 8px rgba(212, 175, 55, 0.6);
        }

        .deck-nav-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .deck-step-counter {
          font-family: var(--font-mono, monospace);
          font-size: 0.76rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 3px;
        }

        .counter-current {
          color: var(--accent-gold-light, #f5d77f);
        }

        .counter-sep {
          color: var(--text-muted);
        }

        .counter-total {
          color: var(--text-secondary);
        }

        /* =========================================================
           SCROLL DECK CONTAINER (COMPACT SIZING)
           ========================================================= */
        .school-college-scroll-deck {
          display: flex;
          align-items: stretch;
          gap: 18px;
          max-width: 940px;
          margin: 0 auto;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          padding: 10px 16px 22px 16px;
          cursor: grab;
          scrollbar-width: none;
        }

        .school-college-scroll-deck::-webkit-scrollbar {
          display: none;
        }

        .school-college-scroll-deck:active {
          cursor: grabbing;
        }

        .scroll-deck-card-wrap {
          flex: 0 0 min(82vw, 420px);
          scroll-snap-align: center;
          perspective: 1000px;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                      opacity 0.35s ease;
        }

        .scroll-deck-card-wrap.card-dormant {
          opacity: 0.6;
          transform: scale(0.95);
        }

        .scroll-deck-card-wrap.card-active {
          opacity: 1;
          transform: scale(1);
        }

        .deck-card-body {
          position: relative;
          padding: 20px 22px;
          border-radius: 18px;
          background: rgba(14, 14, 20, 0.85);
          border: 1px solid rgba(212, 175, 55, 0.28);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.65);
          overflow: hidden;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
          gap: 12px;
          height: 100%;
        }

        .scroll-deck-card-wrap.card-active .deck-card-body {
          border-color: rgba(212, 175, 55, 0.65);
          box-shadow: 0 16px 45px rgba(0, 0, 0, 0.75),
                      0 0 28px rgba(212, 175, 55, 0.2);
        }

        .current-academic-card {
          border-color: rgba(212, 175, 55, 0.45);
          background: radial-gradient(
            circle at top right,
            rgba(212, 175, 55, 0.08) 0%,
            rgba(14, 14, 20, 0.88) 60%
          );
        }

        /* Watermark Seal */
        .card-watermark-emblem {
          position: absolute;
          right: -15px;
          bottom: -15px;
          opacity: 0.04;
          transform: scale(3.5);
          pointer-events: none;
          color: var(--accent-gold);
        }

        /* Card Top Bar */
        .deck-card-top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 8px;
          border-bottom: 1px solid rgba(212, 175, 55, 0.12);
          padding-bottom: 10px;
        }

        .stage-category-flag {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: var(--font-mono, monospace);
          font-size: 0.66rem;
          font-weight: 700;
          color: var(--accent-gold-light, #f5d77f);
          letter-spacing: 0.05em;
        }

        .flag-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--accent-gold, #d4af37);
        }

        .status-live-chip {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 3px 8px;
          border-radius: 999px;
          background: rgba(212, 175, 55, 0.12);
          border: 1px solid rgba(212, 175, 55, 0.4);
          color: var(--accent-gold-light, #f5d77f);
          font-family: var(--font-mono, monospace);
          font-size: 0.64rem;
          font-weight: 700;
          letter-spacing: 0.04em;
        }

        .status-completed-chip {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 3px 8px;
          border-radius: 999px;
          background: rgba(34, 197, 94, 0.08);
          border: 1px solid rgba(34, 197, 94, 0.3);
          color: #86efac;
          font-family: var(--font-mono, monospace);
          font-size: 0.64rem;
          font-weight: 700;
          letter-spacing: 0.04em;
        }

        /* Institution Block */
        .deck-card-institution-block {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .inst-emblem-badge {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: rgba(212, 175, 55, 0.12);
          border: 1px solid rgba(212, 175, 55, 0.35);
          color: var(--accent-gold);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
        }

        .inst-details {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .deck-degree-title {
          font-family: var(--font-display);
          font-size: 1.1rem;
          font-weight: 800;
          color: #fff;
          line-height: 1.25;
        }

        .deck-inst-name-row {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
        }

        .deck-inst-name {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--accent-gold-light, #f5d77f);
        }

        .deck-bullet-dot {
          color: var(--text-muted);
          font-size: 0.75rem;
        }

        .deck-location-tag {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          font-size: 0.74rem;
          color: var(--text-secondary);
        }

        .deck-period-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.72rem;
          color: var(--text-muted);
          margin-top: 2px;
        }

        .deck-narrative-text {
          font-size: 0.82rem;
          color: var(--text-secondary);
          line-height: 1.48;
        }

        /* Highlights Box */
        .deck-highlights-box {
          padding: 10px 13px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
        }

        .highlights-box-header {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--accent-gold-light, #f5d77f);
          margin-bottom: 6px;
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        .gold-icon {
          color: var(--accent-gold);
        }

        .deck-bullet-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .deck-bullet-item {
          display: flex;
          align-items: flex-start;
          gap: 6px;
          font-size: 0.78rem;
          color: var(--text-secondary);
          line-height: 1.38;
        }

        .gold-arrow-glyph {
          color: var(--accent-gold);
          font-weight: 700;
          line-height: 1.3;
        }

        /* Coursework Chips Footer */
        .deck-chips-footer {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
        }

        .chips-label {
          font-family: var(--font-mono, monospace);
          font-size: 0.66rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .chips-flow {
          display: flex;
          align-items: center;
          gap: 5px;
          flex-wrap: wrap;
        }

        .edu-chip-item {
          padding: 2px 8px;
          border-radius: 999px;
          background: rgba(212, 175, 55, 0.08);
          border: 1px solid rgba(212, 175, 55, 0.2);
          color: var(--accent-gold-light, #f5d77f);
          font-size: 0.7rem;
          font-weight: 600;
        }

        /* Card Action Row */
        .deck-card-action-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 10px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          margin-top: auto;
        }

        .action-step-label {
          font-family: var(--font-mono, monospace);
          font-size: 0.68rem;
          color: var(--text-muted);
        }

        .action-hint {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--accent-gold);
        }

        /* Bottom Hint Bar */
        .deck-scroll-hint-bar {
          display: flex;
          justify-content: center;
          margin-top: 10px;
        }

        .hint-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          border-radius: 999px;
          background: rgba(18, 18, 24, 0.6);
          border: 1px solid rgba(212, 175, 55, 0.2);
          color: var(--text-muted);
          font-size: 0.7rem;
          font-weight: 500;
        }

        .hint-compass {
          color: var(--accent-gold);
          animation: compassWiggle 4s ease-in-out infinite;
        }

        @keyframes compassWiggle {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(45deg); }
        }

        @media (max-width: 992px) {
          .stepper-nodes-row {
            gap: 8px;
          }
          .node-meta {
            max-width: 110px;
          }
          .school-college-scroll-deck {
            padding: 8px 12px 18px 12px;
          }
          .scroll-deck-card-wrap {
            flex: 0 0 min(86vw, 380px);
          }
          .deck-card-body {
            padding: 18px 20px;
          }
        }

        @media (max-width: 640px) {
          .stepper-progress-line {
            display: none;
          }
          .stepper-nodes-row {
            justify-content: center;
            gap: 10px;
          }
          .node-meta {
            display: none;
          }
          .deck-degree-title {
            font-size: 1.02rem;
          }
          .scroll-deck-card-wrap {
            flex: 0 0 88vw;
          }
          .deck-card-body {
            padding: 16px 18px;
          }
          .deck-filter-bar {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </section>
  );
}
