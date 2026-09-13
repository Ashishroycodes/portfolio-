import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, GraduationCap } from 'lucide-react';

export default function InteractiveAvatar({
  imageUrl = '/ashish-cutout.png',
  alt = 'Ashish Roy',
}) {
  const stageRef = useRef(null);
  const [photoSrc, setPhotoSrc] = useState(imageUrl);

  useEffect(() => {
    setPhotoSrc(imageUrl);
  }, [imageUrl]);

  // Smooth 3D tilt tracking with CSS custom properties (0 React re-renders)
  const handleMouseMove = (e) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Smooth tilt angles (max 12 deg)
    const rotX = ((y - centerY) / centerY) * -12;
    const rotY = ((x - centerX) / centerX) * 14;

    // Glare coordinates
    const glareX = Math.round((x / rect.width) * 100);
    const glareY = Math.round((y / rect.height) * 100);

    const el = stageRef.current;
    el.style.setProperty('--rot-x', `${rotX.toFixed(2)}deg`);
    el.style.setProperty('--rot-y', `${rotY.toFixed(2)}deg`);
    el.style.setProperty('--glare-x', `${glareX}%`);
    el.style.setProperty('--glare-y', `${glareY}%`);
    el.style.setProperty('--glare-opacity', '0.4');
    el.style.setProperty('--stage-scale', '1.02');
  };

  const handleMouseLeave = () => {
    if (!stageRef.current) return;
    const el = stageRef.current;
    el.style.setProperty('--rot-x', '0deg');
    el.style.setProperty('--rot-y', '0deg');
    el.style.setProperty('--glare-opacity', '0');
    el.style.setProperty('--stage-scale', '1');
  };

  return (
    <div className="cinematic-portrait-wrapper">
      <div
        ref={stageRef}
        className="cinematic-portrait-stage"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Layer 1: Subtle Volumetric Light Rays crossing the background */}
        <div className="cinematic-light-rays" aria-hidden="true" />

        {/* Layer 2: Soft Golden Atmospheric Glow */}
        <div className="golden-atmospheric-glow" aria-hidden="true" />

        {/* Layer 3: Thin Glowing Golden Circular Ring behind the subject */}
        <div className="golden-circular-ring" aria-hidden="true">
          <div className="ring-orbit-sparkle" />
        </div>

        {/* Layer 4: Ambient Ground Reflection Glow */}
        <div className="cinematic-ground-glow" aria-hidden="true" />

        {/* Layer 5: Cut-Out Portrait of Ashish with Warm Golden Rim Lighting */}
        <div className="cutout-portrait-container">
          <img
            src={photoSrc}
            alt={alt}
            className="cutout-portrait-img"
            loading="eager"
          />

          {/* Dynamic Specular Golden Rim Overlay */}
          <div className="cutout-specular-rim" aria-hidden="true" />
        </div>

        {/* Layer 6: 3D Parallax Floating Badges */}
        {/* Top-Right Badge: Student Status */}
        <div className="parallax-badge badge-top-right">
          <div className="badge-glass-inner">
            <span className="badge-icon-gold">
              <Sparkles size={14} />
            </span>
            <div className="badge-text-group">
              <span className="badge-primary-text">Ashish Roy</span>
              <span className="badge-secondary-text">3rd-Year B.Tech CSE</span>
            </div>
          </div>
        </div>

        {/* Bottom-Left Badge: Availability */}
        <div className="parallax-badge badge-bottom-left">
          <div className="badge-glass-inner">
            <span className="badge-status-dot">
              <span className="pulse-dot-gold" />
            </span>
            <div className="badge-text-group">
              <span className="badge-primary-text">Open to Opportunities</span>
              <span className="badge-secondary-text">Full-Stack Developer</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .cinematic-portrait-wrapper {
          position: relative;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cinematic-portrait-stage {
          perspective: 1000px;
          transform-style: preserve-3d;
          position: relative;
          width: 100%;
          max-width: 480px;
          min-height: 520px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          transform: perspective(1000px)
                     rotateX(var(--rot-x, 0deg))
                     rotateY(var(--rot-y, 0deg))
                     scale(var(--stage-scale, 1));
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: crosshair;
        }

        /* Subtle Volumetric Diagonal Light Rays */
        .cinematic-light-rays {
          position: absolute;
          inset: -40px;
          pointer-events: none;
          z-index: 1;
          background: repeating-linear-gradient(
            -38deg,
            rgba(212, 175, 55, 0.09) 0px,
            rgba(212, 175, 55, 0.09) 28px,
            transparent 28px,
            transparent 85px,
            rgba(245, 158, 11, 0.07) 85px,
            rgba(245, 158, 11, 0.07) 120px,
            transparent 120px,
            transparent 190px
          );
          mask-image: radial-gradient(ellipse at 58% 38%, black 15%, transparent 75%);
          -webkit-mask-image: radial-gradient(ellipse at 58% 38%, black 15%, transparent 75%);
          filter: blur(8px);
          opacity: 0.85;
          transform: translateZ(5px);
          animation: raysDrift 16s ease-in-out infinite alternate;
        }

        @keyframes raysDrift {
          0% { opacity: 0.65; transform: translateZ(5px) rotate(0deg); }
          100% { opacity: 0.95; transform: translateZ(5px) rotate(1.5deg); }
        }

        /* Soft Golden Atmospheric Glow behind subject */
        .golden-atmospheric-glow {
          position: absolute;
          width: 440px;
          height: 440px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(212, 175, 55, 0.32) 0%,
            rgba(245, 158, 11, 0.16) 38%,
            rgba(180, 130, 30, 0.05) 60%,
            transparent 74%
          );
          filter: blur(45px);
          top: 42%;
          left: 50%;
          transform: translate(-50%, -50%) translateZ(15px);
          pointer-events: none;
          z-index: 2;
          animation: atmosphericPulse 7s ease-in-out infinite alternate;
        }

        @keyframes atmosphericPulse {
          0% { transform: translate(-50%, -50%) translateZ(15px) scale(0.96); opacity: 0.8; }
          100% { transform: translate(-50%, -50%) translateZ(15px) scale(1.05); opacity: 1; }
        }

        /* Thin Glowing Golden Circular Ring */
        .golden-circular-ring {
          position: absolute;
          width: 410px;
          height: 410px;
          border-radius: 50%;
          border: 1.5px solid rgba(212, 175, 55, 0.85);
          box-shadow:
            0 0 20px rgba(212, 175, 55, 0.55),
            0 0 45px rgba(245, 158, 11, 0.3),
            inset 0 0 25px rgba(212, 175, 55, 0.2);
          top: 40%;
          left: 50%;
          transform: translate(-50%, -50%) translateZ(28px);
          pointer-events: none;
          z-index: 3;
          animation: ringSubtleSpin 40s linear infinite;
        }

        @keyframes ringSubtleSpin {
          0% { transform: translate(-50%, -50%) translateZ(28px) rotate(0deg); }
          100% { transform: translate(-50%, -50%) translateZ(28px) rotate(360deg); }
        }

        .ring-orbit-sparkle {
          position: absolute;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #fff8d6;
          box-shadow: 0 0 12px 2px rgba(212, 175, 55, 0.9);
          top: 15%;
          right: 8%;
        }

        /* Ambient Ground Reflection Glow */
        .cinematic-ground-glow {
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%) translateZ(20px);
          width: 320px;
          height: 35px;
          background: radial-gradient(ellipse at center, rgba(212, 175, 55, 0.22) 0%, rgba(0, 0, 0, 0.85) 55%, transparent 75%);
          filter: blur(10px);
          pointer-events: none;
          z-index: 3;
        }

        /* Cut-Out Portrait Container with 3D Depth */
        .cutout-portrait-container {
          position: relative;
          z-index: 4;
          transform-style: preserve-3d;
          transform: translateZ(55px);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          width: 100%;
        }

        /* The Cut-Out Image with Warm Golden Rim Lighting */
        .cutout-portrait-img {
          width: 100%;
          max-width: 440px;
          height: auto;
          max-height: 540px;
          object-fit: contain;
          display: block;
          filter:
            drop-shadow(0 0 16px rgba(212, 175, 55, 0.58))
            drop-shadow(0 0 36px rgba(245, 158, 11, 0.32))
            drop-shadow(0 20px 40px rgba(0, 0, 0, 0.9));
          mask-image: linear-gradient(to bottom, black 82%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, black 82%, transparent 100%);
          transition: filter 0.35s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cutout-specular-rim {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(
            circle at var(--glare-x, 50%) var(--glare-y, 50%),
            rgba(255, 245, 190, 0.25) 0%,
            transparent 50%
          );
          opacity: var(--glare-opacity, 0);
          transition: opacity 0.3s ease;
          mix-blend-mode: overlay;
          mask-image: linear-gradient(to bottom, black 82%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, black 82%, transparent 100%);
        }

        /* 3D Parallax Floating Badges */
        .parallax-badge {
          position: absolute;
          z-index: 6;
          transform-style: preserve-3d;
          transform: translateZ(85px);
          pointer-events: auto;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .parallax-badge:hover {
          transform: translateZ(105px) scale(1.05);
        }

        .badge-top-right {
          top: 36px;
          right: -12px;
          animation: floatBadge1 5s ease-in-out infinite alternate;
        }

        .badge-bottom-left {
          bottom: 45px;
          left: -18px;
          animation: floatBadge2 6s ease-in-out infinite alternate;
        }

        @keyframes floatBadge1 {
          0% { transform: translateZ(85px) translateY(0px); }
          100% { transform: translateZ(85px) translateY(-8px); }
        }

        @keyframes floatBadge2 {
          0% { transform: translateZ(85px) translateY(0px); }
          100% { transform: translateZ(85px) translateY(8px); }
        }

        .badge-glass-inner {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 14px;
          background: rgba(18, 18, 24, 0.82);
          border: 1px solid rgba(212, 175, 55, 0.32);
          border-radius: 999px;
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6), 0 0 16px rgba(212, 175, 55, 0.18);
        }

        .badge-icon-gold {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: rgba(212, 175, 55, 0.15);
          border: 1px solid rgba(212, 175, 55, 0.4);
          color: var(--accent-gold-light, #f5d77f);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .badge-status-dot {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 14px;
          height: 14px;
          flex-shrink: 0;
        }

        .badge-text-group {
          display: flex;
          flex-direction: column;
          line-height: 1.2;
        }

        .badge-primary-text {
          font-family: var(--font-display);
          font-size: 0.78rem;
          font-weight: 700;
          color: #fff;
          white-space: nowrap;
        }

        .badge-secondary-text {
          font-size: 0.68rem;
          color: var(--accent-gold-light, #f5d77f);
          font-weight: 500;
          white-space: nowrap;
        }

        @media (max-width: 992px) {
          .cinematic-portrait-stage {
            max-width: 400px;
            min-height: 440px;
          }
          .golden-circular-ring {
            width: 330px;
            height: 330px;
          }
          .golden-atmospheric-glow {
            width: 350px;
            height: 350px;
          }
          .cutout-portrait-img {
            max-width: 360px;
            max-height: 450px;
          }
          .badge-top-right {
            right: 0px;
            top: 20px;
          }
          .badge-bottom-left {
            left: 0px;
            bottom: 25px;
          }
        }

        @media (max-width: 640px) {
          .cinematic-portrait-stage {
            max-width: 320px;
            min-height: 380px;
          }
          .golden-circular-ring {
            width: 270px;
            height: 270px;
          }
          .golden-atmospheric-glow {
            width: 280px;
            height: 280px;
          }
          .cutout-portrait-img {
            max-width: 290px;
            max-height: 380px;
          }
          .badge-top-right,
          .badge-bottom-left {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
