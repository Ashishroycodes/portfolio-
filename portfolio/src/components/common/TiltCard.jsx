import React, { useState, useRef } from 'react';

export default function TiltCard({
  children,
  className = '',
  maxTilt = 9,
  perspective = 1000,
  glare = true,
  onClick,
  style = {},
  ...rest
}) {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setRotation({ x: rotateX, y: rotateY });
    if (glare) {
      setGlarePos({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
        opacity: 0.32,
      });
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
    if (glare) {
      setGlarePos((prev) => ({ ...prev, opacity: 0 }));
    }
  };

  return (
    <div
      ref={cardRef}
      className={`tilt-card-wrapper ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: `perspective(${perspective}px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(${
          isHovered ? 1.022 : 1
        }, ${isHovered ? 1.022 : 1}, ${isHovered ? 1.022 : 1})`,
        transition: isHovered
          ? 'transform 0.08s ease-out'
          : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease',
        transformStyle: 'preserve-3d',
        position: 'relative',
        ...style,
      }}
      {...rest}
    >
      {children}
      {glare && (
        <div
          className="tilt-glare-overlay"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            borderRadius: 'inherit',
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(212, 175, 55, 0.28) 0%, rgba(255, 255, 255, 0.08) 28%, transparent 65%)`,
            opacity: glarePos.opacity,
            transition: 'opacity 0.25s ease',
            zIndex: 10,
            mixBlendMode: 'screen',
          }}
        />
      )}
    </div>
  );
}
