import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Cog, Cpu, Compass, Activity } from 'lucide-react';

export default function ThreeDTechCore() {
  const mountRef = useRef(null);
  const [modelType, setModelType] = useState('gears'); // 'gears' | 'cpu' | 'gyro'
  const [isHovered, setIsHovered] = useState(false);
  const [rotCoords, setRotCoords] = useState({ x: 0, y: 0 });
  const [liveMetric, setLiveMetric] = useState('120 RPM • 1.45 Ratio');

  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const modelGroupRef = useRef(null);
  const animFrameId = useRef(null);
  const isDraggingRef = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0.25, y: -0.2 });
  const currentRotation = useRef({ x: 0.25, y: -0.2 });
  const pulseScale = useRef(1);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 480;
    const height = container.clientHeight || 215;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 6.4;

    // 3. WebGL Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    rendererRef.current = renderer;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // 4. Studio Cinematic Lighting
    const ambientLight = new THREE.AmbientLight(0xfffae0, 0.9);
    scene.add(ambientLight);

    const goldKeyLight = new THREE.DirectionalLight(0xd4af37, 3.2);
    goldKeyLight.position.set(5, 6, 5);
    scene.add(goldKeyLight);

    const amberFillLight = new THREE.PointLight(0xf59e0b, 3.6, 25);
    amberFillLight.position.set(-5, -3, 4);
    scene.add(amberFillLight);

    const coolRimLight = new THREE.DirectionalLight(0xfff5c0, 1.8);
    coolRimLight.position.set(0, -5, -4);
    scene.add(coolRimLight);

    // 5. Main 3D Model Group
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);
    modelGroupRef.current = modelGroup;

    // Dynamic animation references
    const dynamicObjects = {
      gearA: null,
      gearB: null,
      gearC: null,
      gyroRings: [],
      dataPulses: [],
      particles: null,
    };

    // Helper to generate precision mechanical gear shape
    const createGearShape = (teeth, innerRadius, outerRadius, holeRadius, spokeCount = 5) => {
      const shape = new THREE.Shape();
      const step = (Math.PI * 2) / teeth;
      const toothWidth = step * 0.26;

      for (let i = 0; i < teeth; i++) {
        const angle = i * step;
        const a1 = angle - toothWidth;
        const a2 = angle - toothWidth * 0.45;
        const a3 = angle + toothWidth * 0.45;
        const a4 = angle + toothWidth;

        if (i === 0) {
          shape.moveTo(Math.cos(a1) * innerRadius, Math.sin(a1) * innerRadius);
        } else {
          shape.lineTo(Math.cos(a1) * innerRadius, Math.sin(a1) * innerRadius);
        }
        shape.lineTo(Math.cos(a2) * outerRadius, Math.sin(a2) * outerRadius);
        shape.lineTo(Math.cos(a3) * outerRadius, Math.sin(a3) * outerRadius);
        shape.lineTo(Math.cos(a4) * innerRadius, Math.sin(a4) * innerRadius);
      }
      shape.closePath();

      // Central axle bore
      if (holeRadius > 0) {
        const hole = new THREE.Path();
        hole.absarc(0, 0, holeRadius, 0, Math.PI * 2, true);
        shape.holes.push(hole);
      }

      // Cutout weight-reduction holes/spokes for authentic engineering aesthetic
      if (spokeCount > 0 && innerRadius > 0.7) {
        const spokeR = (innerRadius + holeRadius) / 2;
        const holeSize = (innerRadius - holeRadius) * 0.28;
        for (let s = 0; s < spokeCount; s++) {
          const sAngle = (s / spokeCount) * Math.PI * 2;
          const sPath = new THREE.Path();
          sPath.absarc(
            Math.cos(sAngle) * spokeR,
            Math.sin(sAngle) * spokeR,
            holeSize,
            0,
            Math.PI * 2,
            true
          );
          shape.holes.push(sPath);
        }
      }

      return shape;
    };

    // Build the chosen engineering 3D model
    const buildModel = (mode) => {
      // Clear previous elements
      while (modelGroup.children.length > 0) {
        const obj = modelGroup.children[0];
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else obj.material.dispose();
        }
        modelGroup.remove(obj);
      }

      const goldMetal = new THREE.MeshStandardMaterial({
        color: 0xd4af37,
        metalness: 0.94,
        roughness: 0.22,
      });

      const goldBurnished = new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        metalness: 0.9,
        roughness: 0.3,
      });

      const darkTitanium = new THREE.MeshStandardMaterial({
        color: 0x222228,
        metalness: 0.85,
        roughness: 0.35,
      });

      const goldWire = new THREE.LineBasicMaterial({
        color: 0xffe27a,
        transparent: true,
        opacity: 0.85,
      });

      if (mode === 'gears') {
        // ========================================================
        // 1. PRECISION MECHANICAL GEAR TRAIN (ENGINEERING ENGINE)
        // ========================================================
        setLiveMetric('120 RPM • Gear Ratio 1.45:1');

        // Gear A: Main Driver Gear (16 teeth, gold)
        const shapeA = createGearShape(16, 1.1, 1.35, 0.32, 6);
        const geoA = new THREE.ExtrudeGeometry(shapeA, {
          depth: 0.24,
          bevelEnabled: true,
          bevelThickness: 0.04,
          bevelSize: 0.03,
          bevelSegments: 2,
        });
        const gearA = new THREE.Mesh(geoA, goldMetal);
        gearA.position.set(-0.75, -0.2, 0);
        modelGroup.add(gearA);
        dynamicObjects.gearA = gearA;

        // Gear A Axle Shaft & Hex Bolt
        const axleGeoA = new THREE.CylinderGeometry(0.28, 0.28, 0.35, 20);
        const axleA = new THREE.Mesh(axleGeoA, darkTitanium);
        axleA.rotation.x = Math.PI / 2;
        axleA.position.set(-0.75, -0.2, 0.05);
        modelGroup.add(axleA);

        // Gear B: Interlocking Driven Gear (11 teeth, titanium/gold)
        // Positioned at exact pitch center distance
        const shapeB = createGearShape(11, 0.72, 0.94, 0.25, 4);
        const geoB = new THREE.ExtrudeGeometry(shapeB, {
          depth: 0.22,
          bevelEnabled: true,
          bevelThickness: 0.035,
          bevelSize: 0.025,
          bevelSegments: 2,
        });
        const gearB = new THREE.Mesh(geoB, goldBurnished);
        gearB.position.set(1.2, 0.42, 0);
        gearB.rotation.z = Math.PI / 11; // Meshing phase alignment
        modelGroup.add(gearB);
        dynamicObjects.gearB = gearB;

        // Gear B Axle Hub
        const axleGeoB = new THREE.CylinderGeometry(0.22, 0.22, 0.32, 20);
        const axleB = new THREE.Mesh(axleGeoB, darkTitanium);
        axleB.rotation.x = Math.PI / 2;
        axleB.position.set(1.2, 0.42, 0.05);
        modelGroup.add(axleB);

        // Gear C: Top Pinion Gear (8 teeth, meshing with Gear A)
        const shapeC = createGearShape(8, 0.5, 0.72, 0.18, 0);
        const geoC = new THREE.ExtrudeGeometry(shapeC, {
          depth: 0.2,
          bevelEnabled: true,
          bevelThickness: 0.03,
          bevelSize: 0.02,
          bevelSegments: 2,
        });
        const gearC = new THREE.Mesh(geoC, goldMetal);
        gearC.position.set(-0.75, 1.48, -0.02);
        gearC.rotation.z = Math.PI / 8;
        modelGroup.add(gearC);
        dynamicObjects.gearC = gearC;

        // Mechanical Vernier Scale & Outer Calibration Ring
        const dialGeo = new THREE.RingGeometry(2.1, 2.14, 64);
        const dialMat = new THREE.MeshBasicMaterial({
          color: 0xd4af37,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.4,
        });
        const dial = new THREE.Mesh(dialGeo, dialMat);
        dial.position.set(0, 0, -0.15);
        modelGroup.add(dial);
      } else if (mode === 'cpu') {
        // ========================================================
        // 2. COMPUTER ENGINEERING SILICON MICROCHIP (CPU ARCHITECTURE)
        // ========================================================
        setLiveMetric('64-Bit Architecture • Clock 4.2 GHz');

        // Main PCB Silicon Substrate Board
        const boardGeo = new THREE.BoxGeometry(3.2, 3.2, 0.12);
        const boardMat = new THREE.MeshStandardMaterial({
          color: 0x111116,
          metalness: 0.4,
          roughness: 0.6,
        });
        const board = new THREE.Mesh(boardGeo, boardMat);
        modelGroup.add(board);

        // Elevated Polished Gold Heat Spreader (IHS)
        const ihsGeo = new THREE.BoxGeometry(2.1, 2.1, 0.22);
        const ihs = new THREE.Mesh(ihsGeo, goldMetal);
        ihs.position.z = 0.12;
        modelGroup.add(ihs);

        // Inner Silicon Die Core
        const dieGeo = new THREE.BoxGeometry(1.2, 1.2, 0.08);
        const dieMat = new THREE.MeshStandardMaterial({
          color: 0x22222b,
          metalness: 0.9,
          roughness: 0.1,
        });
        const die = new THREE.Mesh(dieGeo, dieMat);
        die.position.z = 0.24;
        modelGroup.add(die);

        // Edge Gold Connector Pins (40 precision gold pins along perimeter)
        const pinGeo = new THREE.BoxGeometry(0.08, 0.24, 0.08);
        const pinMat = new THREE.MeshStandardMaterial({
          color: 0xffe27a,
          metalness: 0.95,
          roughness: 0.15,
        });
        for (let i = -1.4; i <= 1.4; i += 0.28) {
          // Top & bottom rows
          const pinT = new THREE.Mesh(pinGeo, pinMat);
          pinT.position.set(i, 1.62, 0);
          modelGroup.add(pinT);

          const pinB = new THREE.Mesh(pinGeo, pinMat);
          pinB.position.set(i, -1.62, 0);
          modelGroup.add(pinB);

          // Left & right rows
          const pinL = new THREE.Mesh(pinGeo, pinMat);
          pinL.rotation.z = Math.PI / 2;
          pinL.position.set(-1.62, i, 0);
          modelGroup.add(pinL);

          const pinR = new THREE.Mesh(pinGeo, pinMat);
          pinR.rotation.z = Math.PI / 2;
          pinR.position.set(1.62, i, 0);
          modelGroup.add(pinR);
        }

        // Animated Circuit Bus Tracks & Data Photons
        const pulseGeo = new THREE.SphereGeometry(0.05, 8, 8);
        const pulseMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
        dynamicObjects.dataPulses = [];

        for (let p = 0; p < 8; p++) {
          const pulse = new THREE.Mesh(pulseGeo, pulseMat);
          const angle = (p / 8) * Math.PI * 2;
          pulse.userData = { angle, dist: 0.7 + (p % 3) * 0.4, speed: 0.02 + p * 0.004 };
          pulse.position.set(Math.cos(angle) * pulse.userData.dist, Math.sin(angle) * pulse.userData.dist, 0.26);
          modelGroup.add(pulse);
          dynamicObjects.dataPulses.push(pulse);
        }
      } else if (mode === 'gyro') {
        // ========================================================
        // 3. AEROSPACE & SYSTEM ENGINEERING QUANTUM GYROSCOPE
        // ========================================================
        setLiveMetric('3-Axis Inertial Gyro • 100% Stability');

        // Ring 1: Outer Gimbal Ring
        const r1Geo = new THREE.TorusGeometry(2.2, 0.038, 16, 80);
        const r1 = new THREE.Mesh(r1Geo, goldMetal);
        modelGroup.add(r1);

        // Ring 2: Middle Gimbal Ring
        const r2Geo = new THREE.TorusGeometry(1.75, 0.032, 16, 70);
        const r2 = new THREE.Mesh(r2Geo, goldBurnished);
        r2.rotation.x = Math.PI / 3;
        modelGroup.add(r2);

        // Ring 3: Inner Gimbal Ring
        const r3Geo = new THREE.TorusGeometry(1.3, 0.028, 16, 60);
        const r3 = new THREE.Mesh(r3Geo, goldMetal);
        r3.rotation.y = Math.PI / 4;
        modelGroup.add(r3);

        dynamicObjects.gyroRings = [r1, r2, r3];

        // Central Reactor Rotor
        const rotorGeo = new THREE.IcosahedronGeometry(0.75, 0);
        const rotor = new THREE.Mesh(rotorGeo, darkTitanium);
        modelGroup.add(rotor);

        const rotorWire = new THREE.LineSegments(new THREE.EdgesGeometry(rotorGeo), goldWire);
        modelGroup.add(rotorWire);
      }
    };

    buildModel(modelType);

    // 6. Floating Golden Spark Particles
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const r = 1.8 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      particlePos[i] = r * Math.sin(phi) * Math.cos(theta);
      particlePos[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      particlePos[i + 2] = r * Math.cos(phi);
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xffdf70,
      size: 0.05,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 7. Mouse Controls & Drag Interaction
    const onMouseDown = (e) => {
      isDraggingRef.current = true;
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
      pulseScale.current = 1.12; // Mechanical torque surge
    };

    const onMouseMove = (e) => {
      if (!isDraggingRef.current) {
        const rect = container.getBoundingClientRect();
        const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        targetRotation.current = {
          x: normY * 0.4 + 0.25,
          y: normX * 0.6 - 0.2,
        };
        return;
      }

      const deltaX = e.clientX - previousMousePosition.current.x;
      const deltaY = e.clientY - previousMousePosition.current.y;

      currentRotation.current.y += deltaX * 0.012;
      currentRotation.current.x += deltaY * 0.012;
      targetRotation.current = { ...currentRotation.current };

      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    const domElem = renderer.domElement;
    domElem.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch support for mobile
    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        pulseScale.current = 1.12;
      }
    };

    const onTouchMove = (e) => {
      if (!isDraggingRef.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.current.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.current.y;

      currentRotation.current.y += deltaX * 0.015;
      currentRotation.current.x += deltaY * 0.015;
      targetRotation.current = { ...currentRotation.current };

      previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = () => {
      isDraggingRef.current = false;
    };

    domElem.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // 8. Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 480;
      const h = container.clientHeight || 215;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 9. Animation Loop (Gear Meshing & Dynamic Telemetry)
    let clock = new THREE.Clock();
    let gearAngle = 0;

    const animate = () => {
      animFrameId.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth inertia rotation
      if (!isDraggingRef.current) {
        currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * 0.08;
        currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * 0.08;
      }

      pulseScale.current += (1.0 - pulseScale.current) * 0.08;

      if (modelGroup) {
        modelGroup.rotation.x = currentRotation.current.x;
        modelGroup.rotation.y = currentRotation.current.y;
        modelGroup.scale.set(pulseScale.current, pulseScale.current, pulseScale.current);

        // --- MODEL 1: Interlocking Gear Kinetics ---
        if (dynamicObjects.gearA && dynamicObjects.gearB) {
          // Continuous gear drive rotation
          gearAngle += delta * 1.8;
          dynamicObjects.gearA.rotation.z = gearAngle;

          // Gear B rotates in exact opposite direction by tooth ratio (16 / 11)
          dynamicObjects.gearB.rotation.z = -gearAngle * (16 / 11) + Math.PI / 11;

          // Gear C rotates in opposite direction by tooth ratio (16 / 8)
          if (dynamicObjects.gearC) {
            dynamicObjects.gearC.rotation.z = -gearAngle * (16 / 8) + Math.PI / 8;
          }
        }

        // --- MODEL 2: CPU Data Bus Pulses ---
        if (dynamicObjects.dataPulses.length > 0) {
          dynamicObjects.dataPulses.forEach((pulse) => {
            pulse.userData.dist -= pulse.userData.speed;
            if (pulse.userData.dist < 0.2) {
              pulse.userData.dist = 1.7;
            }
            pulse.position.x = Math.cos(pulse.userData.angle) * pulse.userData.dist;
            pulse.position.y = Math.sin(pulse.userData.angle) * pulse.userData.dist;
          });
        }

        // --- MODEL 3: Quantum Gyro Stabilizer ---
        if (dynamicObjects.gyroRings.length === 3) {
          dynamicObjects.gyroRings[0].rotation.z += 0.015;
          dynamicObjects.gyroRings[1].rotation.x += 0.022;
          dynamicObjects.gyroRings[2].rotation.y += 0.028;
        }
      }

      if (particles) {
        particles.rotation.y = elapsed * 0.04;
      }

      renderer.render(scene, camera);

      // Periodically update coordinates readout
      if (Math.floor(elapsed * 12) % 2 === 0) {
        setRotCoords({
          x: Math.round(((currentRotation.current.x * 180) / Math.PI) % 360),
          y: Math.round(((currentRotation.current.y * 180) / Math.PI) % 360),
        });
      }
    };

    animate();

    // 10. Clean-Up
    return () => {
      cancelAnimationFrame(animFrameId.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);

      domElem.removeEventListener('mousedown', onMouseDown);
      domElem.removeEventListener('touchstart', onTouchStart);

      if (renderer) renderer.dispose();
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, [modelType]);

  return (
    <div
      className="three-tech-core-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Cyber Telemetry Header */}
      <div className="core-hud-header">
        <div className="hud-status-badge">
          <span className="hud-pulse-dot" />
          <span className="hud-system-title">ENGINEERING 3D // B.TECH CSE</span>
        </div>

        {/* 3D Engineering Model Shape Switcher */}
        <div className="hud-model-selectors">
          <button
            type="button"
            className={`model-btn ${modelType === 'gears' ? 'active' : ''}`}
            onClick={() => setModelType('gears')}
            title="Mechanical Engineering Interlocking Gears"
          >
            <Cog size={13} className={modelType === 'gears' ? 'spin-icon' : ''} />
            <span>Gears</span>
          </button>
          <button
            type="button"
            className={`model-btn ${modelType === 'cpu' ? 'active' : ''}`}
            onClick={() => setModelType('cpu')}
            title="Computer Engineering Silicon Microprocessor"
          >
            <Cpu size={13} />
            <span>Silicon CPU</span>
          </button>
          <button
            type="button"
            className={`model-btn ${modelType === 'gyro' ? 'active' : ''}`}
            onClick={() => setModelType('gyro')}
            title="System & Aerospace Gyroscope"
          >
            <Compass size={13} />
            <span>Gyro</span>
          </button>
        </div>
      </div>

      {/* Main 3D WebGL Canvas Viewport */}
      <div className="canvas-viewport" ref={mountRef}>
        {/* Animated 3D Blueprint Crosshair Graticule in background */}
        <div className="hud-blueprint-grid" aria-hidden="true" />
      </div>

      {/* Bottom Live Engineering Telemetry Footer */}
      <div className="core-hud-footer">
        <div className="hud-telemetry-tag">
          <Activity size={12} className="telemetry-icon" />
          <span>{liveMetric}</span>
        </div>
        <div className="hud-interaction-hint">
          <span className="hint-glow-dot" />
          <span>Drag 360° • Interactive Engineering Physics</span>
        </div>
      </div>

      <style>{`
        .three-tech-core-card {
          position: relative;
          width: 100%;
          max-width: 540px;
          border-radius: var(--radius-md, 16px);
          background: rgba(12, 12, 16, 0.82);
          border: 1px solid rgba(212, 175, 55, 0.35);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 14px 40px rgba(0, 0, 0, 0.65),
                      0 0 25px rgba(212, 175, 55, 0.15),
                      inset 0 1px 0 rgba(255, 245, 180, 0.15);
          overflow: hidden;
          margin-bottom: 30px;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .three-tech-core-card:hover {
          border-color: rgba(212, 175, 55, 0.65);
          box-shadow: 0 18px 50px rgba(0, 0, 0, 0.75),
                      0 0 35px rgba(212, 175, 55, 0.28),
                      inset 0 1px 0 rgba(255, 245, 180, 0.25);
        }

        /* Top HUD Telemetry Bar */
        .core-hud-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 16px;
          background: rgba(18, 18, 24, 0.72);
          border-bottom: 1px solid rgba(212, 175, 55, 0.15);
          position: relative;
          z-index: 5;
        }

        .hud-status-badge {
          display: flex;
          align-items: center;
          gap: 7px;
        }

        .hud-pulse-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #4ade80;
          box-shadow: 0 0 8px #4ade80;
          animation: hudPulse 2s ease-in-out infinite alternate;
        }

        @keyframes hudPulse {
          0% { transform: scale(0.9); opacity: 0.7; }
          100% { transform: scale(1.3); opacity: 1; }
        }

        .hud-system-title {
          font-family: var(--font-mono, monospace);
          font-size: 0.68rem;
          font-weight: 700;
          color: var(--accent-gold-light, #f5d77f);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .hud-model-selectors {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .model-btn {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 4px 10px;
          border-radius: 999px;
          font-family: var(--font-display, sans-serif);
          font-size: 0.68rem;
          font-weight: 600;
          color: var(--text-secondary, #a3a3a3);
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .model-btn:hover {
          color: #fff;
          background: rgba(212, 175, 55, 0.15);
          border-color: rgba(212, 175, 55, 0.4);
        }

        .model-btn.active {
          color: #000;
          background: linear-gradient(135deg, #f5d77f 0%, #d4af37 100%);
          border-color: #f5d77f;
          font-weight: 700;
          box-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
        }

        .spin-icon {
          animation: spinIcon 8s linear infinite;
        }

        @keyframes spinIcon {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* 3D Viewport */
        .canvas-viewport {
          position: relative;
          width: 100%;
          height: 195px;
          cursor: grab;
        }

        .canvas-viewport:active {
          cursor: grabbing;
        }

        .canvas-viewport canvas {
          display: block;
          width: 100% !important;
          height: 100% !important;
          outline: none;
        }

        /* Subtle Blueprint Radial Overlay in background */
        .hud-blueprint-grid {
          position: absolute;
          width: 180px;
          height: 180px;
          border-radius: 50%;
          border: 1px dashed rgba(212, 175, 55, 0.18);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          animation: blueprintSpin 35s linear infinite;
        }

        @keyframes blueprintSpin {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }

        /* Bottom Footer Bar */
        .core-hud-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 16px;
          background: rgba(14, 14, 18, 0.75);
          border-top: 1px solid rgba(212, 175, 55, 0.12);
          position: relative;
          z-index: 5;
        }

        .hud-telemetry-tag {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono, monospace);
          font-size: 0.65rem;
          color: var(--accent-gold, #d4af37);
          font-weight: 600;
          letter-spacing: 0.04em;
        }

        .telemetry-icon {
          color: #f59e0b;
        }

        .hud-interaction-hint {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.68rem;
          color: var(--text-muted, #737373);
          font-weight: 500;
        }

        .hint-glow-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--accent-gold, #d4af37);
          box-shadow: 0 0 6px var(--accent-gold, #d4af37);
        }

        @media (max-width: 640px) {
          .canvas-viewport {
            height: 175px;
          }
          .model-btn span {
            display: none;
          }
          .model-btn {
            padding: 4px 6px;
          }
          .hud-telemetry-tag {
            font-size: 0.6rem;
          }
        }
      `}</style>
    </div>
  );
}
