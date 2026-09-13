import React, { useState, useEffect, useRef } from 'react';

// Curated luxury typography presets - minimal, relaxed, and cohesive
const FONT_PRESETS = [
  {
    id: 'outfit',
    name: 'Outfit',
    fontFamily: "'Outfit', -apple-system, BlinkMacSystemFont, sans-serif",
    fontWeight: 800,
    letterSpacing: '-0.02em',
    fontStyle: 'normal',
  },
  {
    id: 'cinzel',
    name: 'Cinzel',
    fontFamily: "'Cinzel', serif",
    fontWeight: 700,
    letterSpacing: '0.015em',
    fontStyle: 'normal',
  },
  {
    id: 'syne',
    name: 'Syne',
    fontFamily: "'Syne', sans-serif",
    fontWeight: 800,
    letterSpacing: '-0.01em',
    fontStyle: 'normal',
  },
  {
    id: 'playfair',
    name: 'Playfair Display',
    fontFamily: "'Playfair Display', serif",
    fontWeight: 800,
    letterSpacing: '0.005em',
    fontStyle: 'italic',
  },
];

const DEFAULT_FONT = FONT_PRESETS[0];

export default function MorphingName({
  name = 'Ashish Roy',
  className = '',
}) {
  const sceneRef = useRef(null);
  const cardRef = useRef(null);
  const isNearRef = useRef(false);

  // Dual-layer state for 100% glitch-free optical cross-dissolve
  const [activeLayer, setActiveLayer] = useState('A');
  const [fontA, setFontA] = useState(DEFAULT_FONT);
  const [fontB, setFontB] = useState(FONT_PRESETS[1]);
  const fontIndexRef = useRef(0);
  const [isAround, setIsAround] = useState(false);

  // Smooth mouse proximity tracking & 3D tilt with ZERO React re-render lag
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!sceneRef.current || !cardRef.current) return;
      const rect = sceneRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.hypot(deltaX, deltaY);

      // Hysteresis threshold: 160px to enter, 240px to leave (prevents boundary flicker)
      if (!isNearRef.current && distance < 160) {
        isNearRef.current = true;
        setIsAround(true);
      } else if (isNearRef.current && distance > 240) {
        isNearRef.current = false;
        setIsAround(false);

        // Smoothly ease back to rested 3D orientation
        const el = cardRef.current;
        el.style.setProperty('--rot-x', '0deg');
        el.style.setProperty('--rot-y', '0deg');
        el.style.setProperty('--depth-z', '0px');
        el.style.setProperty('--scale', '1');
        el.style.setProperty('--shadow-x', '0px');
        el.style.setProperty('--shadow-y', '4px');
        el.style.setProperty('--sheen-opacity', '0');
        return;
      }

      if (isNearRef.current) {
        // Normalized offsets (-1 to 1)
        const normX = Math.max(-1, Math.min(1, deltaX / 130));
        const normY = Math.max(-1, Math.min(1, deltaY / 65));

        // Smooth tilt angles
        const rotX = -normY * 13;
        const rotY = normX * 15;
        const z = 20;
        const scale = 1.03;

        // Realistic dynamic depth shadows
        const shadowX = -rotY * 1.2;
        const shadowY = rotX * 1.2 + 5;

        // Specular sheen light coordinates
        const shineX = Math.round(50 + normX * 45);
        const shineY = Math.round(50 + normY * 45);

        const el = cardRef.current;
        el.style.setProperty('--rot-x', `${rotX.toFixed(2)}deg`);
        el.style.setProperty('--rot-y', `${rotY.toFixed(2)}deg`);
        el.style.setProperty('--depth-z', `${z}px`);
        el.style.setProperty('--scale', `${scale}`);
        el.style.setProperty('--shadow-x', `${shadowX.toFixed(1)}px`);
        el.style.setProperty('--shadow-y', `${shadowY.toFixed(1)}px`);
        el.style.setProperty('--sheen-x', `${shineX}%`);
        el.style.setProperty('--sheen-y', `${shineY}%`);
        el.style.setProperty('--sheen-opacity', '1');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Relaxed, slow font crossfade cycle when cursor is nearby
  useEffect(() => {
    if (!isAround) {
      // Gently return to default font when cursor leaves
      const timer = setTimeout(() => {
        fontIndexRef.current = 0;
        if (activeLayer === 'A') {
          if (fontA.id !== DEFAULT_FONT.id) {
            setFontB(DEFAULT_FONT);
            setActiveLayer('B');
          }
        } else {
          if (fontB.id !== DEFAULT_FONT.id) {
            setFontA(DEFAULT_FONT);
            setActiveLayer('A');
          }
        }
      }, 500);
      return () => clearTimeout(timer);
    }

    // Slow, relaxed cycle: holds each font for 2.8 seconds, then dissolves over 0.9s
    const interval = setInterval(() => {
      const nextIndex = (fontIndexRef.current + 1) % FONT_PRESETS.length;
      fontIndexRef.current = nextIndex;
      const nextFont = FONT_PRESETS[nextIndex];

      setActiveLayer((current) => {
        if (current === 'A') {
          setFontB(nextFont);
          return 'B';
        } else {
          setFontA(nextFont);
          return 'A';
        }
      });
    }, 2800);

    return () => clearInterval(interval);
  }, [isAround, activeLayer, fontA.id, fontB.id]);

  return (
    <span
      ref={sceneRef}
      className="morphing-3d-scene"
      onMouseEnter={() => {
        isNearRef.current = true;
        setIsAround(true);
      }}
      onMouseLeave={() => {
        isNearRef.current = false;
        setIsAround(false);
        if (cardRef.current) {
          const el = cardRef.current;
          el.style.setProperty('--rot-x', '0deg');
          el.style.setProperty('--rot-y', '0deg');
          el.style.setProperty('--depth-z', '0px');
          el.style.setProperty('--scale', '1');
          el.style.setProperty('--shadow-x', '0px');
          el.style.setProperty('--shadow-y', '4px');
          el.style.setProperty('--sheen-opacity', '0');
        }
      }}
    >
      <span ref={cardRef} className="morphing-3d-card">
        {/* Specular 3D cursor light sheen */}
        <span className="morph-3d-sheen" />

        {/* Dual-layer crossfade container: Zero layout shifts, zero glyph snap */}
        <span className="morph-crossfade-stage">
          {/* Layer A */}
          <span
            className={`morph-layer ${activeLayer === 'A' ? 'is-visible' : 'is-hidden'} ${className}`}
            style={{
              fontFamily: fontA.fontFamily,
              fontWeight: fontA.fontWeight,
              fontStyle: fontA.fontStyle,
              letterSpacing: fontA.letterSpacing,
            }}
          >
            {name}
          </span>

          {/* Layer B */}
          <span
            className={`morph-layer ${activeLayer === 'B' ? 'is-visible' : 'is-hidden'} ${className}`}
            style={{
              fontFamily: fontB.fontFamily,
              fontWeight: fontB.fontWeight,
              fontStyle: fontB.fontStyle,
              letterSpacing: fontB.letterSpacing,
            }}
          >
            {name}
          </span>
        </span>
      </span>

      <style>{`
        .morphing-3d-scene {
          perspective: 900px;
          perspective-origin: center center;
          display: inline-block;
          vertical-align: baseline;
          position: relative;
          cursor: crosshair;
        }

        .morphing-3d-card {
          transform-style: preserve-3d;
          display: inline-flex;
          align-items: baseline;
          vertical-align: baseline;
          position: relative;
          user-select: none;
          padding: 0 2px;
          transform: perspective(900px)
                     rotateX(var(--rot-x, 0deg))
                     rotateY(var(--rot-y, 0deg))
                     translateZ(var(--depth-z, 0px))
                     scale(var(--scale, 1));
          filter: drop-shadow(var(--shadow-x, 0px) var(--shadow-y, 4px) 16px rgba(0, 0, 0, 0.55))
                  drop-shadow(0 0 20px rgba(212, 175, 55, calc(var(--sheen-opacity, 0) * 0.4)));
          transition: transform 0.36s cubic-bezier(0.16, 1, 0.3, 1),
                      filter 0.36s ease;
          will-change: transform;
        }

        /* Specular 3D lighting glint across text surface */
        .morph-3d-sheen {
          position: absolute;
          inset: -8px;
          border-radius: 12px;
          pointer-events: none;
          background: radial-gradient(
            circle at var(--sheen-x, 50%) var(--sheen-y, 50%),
            rgba(255, 245, 190, 0.22) 0%,
            transparent 60%
          );
          opacity: var(--sheen-opacity, 0);
          transition: opacity 0.35s ease;
          z-index: 3;
          mix-blend-mode: overlay;
        }

        /* Dual-layer overlapping grid stage */
        .morph-crossfade-stage {
          display: inline-grid;
          grid-template-columns: 1fr;
          grid-template-rows: 1fr;
          align-items: baseline;
          vertical-align: baseline;
          position: relative;
          line-height: 1.15;
        }

        /* Pure optical dissolve: No layout shifts, no snapped characters */
        .morph-layer {
          grid-column: 1 / 2;
          grid-row: 1 / 2;
          white-space: nowrap;
          line-height: 1.15;
          transition: opacity 0.9s cubic-bezier(0.4, 0, 0.2, 1),
                      filter 0.9s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: opacity, filter;
        }

        .morph-layer.is-visible {
          opacity: 1;
          filter: blur(0px);
          pointer-events: auto;
          position: relative;
          z-index: 2;
        }

        .morph-layer.is-hidden {
          opacity: 0;
          filter: blur(2px);
          pointer-events: none;
          z-index: 1;
        }
      `}</style>
    </span>
  );
}
