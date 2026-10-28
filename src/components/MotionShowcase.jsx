import { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw, Sliders, Activity, Layers, Cpu, Code } from 'lucide-react';

export default function MotionShowcase() {
  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const animFrameRef = useRef(null);
  const lastTimeRef = useRef(null);

  const [isDesktop, setIsDesktop] = useState(false);
  const [activeMode, setActiveMode] = useState('editorial'); // 'editorial' | 'geometry' | 'architecture'
  const [isPlaying, setIsPlaying] = useState(true);
  const [timelineSec, setTimelineSec] = useState(0.85); // 0 to 3 seconds
  const [scrollProgress, setScrollProgress] = useState(0); // 0 to 1
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });
  const [targetTilt, setTargetTilt] = useState({ x: 0, y: 0 });
  const [easingPreset, setEasingPreset] = useState('power3.out');

  // Check desktop view (min-width: 1024px) & respect reduced motion
  useEffect(() => {
    const checkViewport = () => {
      const desktop = window.innerWidth >= 1024;
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setIsDesktop(desktop && !reducedMotion);
    };

    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  // Scroll listener for 3D stage perspective (Animos-style scroll-driven tilt)
  useEffect(() => {
    if (!isDesktop) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (!containerRef.current) return;
          const rect = containerRef.current.getBoundingClientRect();
          const windowH = window.innerHeight;
          // Progress goes from 0 (when hero is in view) to 1 (as user scrolls down past hero)
          const dist = -rect.top;
          const maxDist = Math.max(1, rect.height + windowH * 0.2);
          const rawProgress = Math.max(0, Math.min(1, dist / maxDist));
          setScrollProgress((prev) => (Math.abs(prev - rawProgress) > 0.002 ? rawProgress : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDesktop]);

  // Smooth mouse gyro tilt lerp loop
  useEffect(() => {
    if (!isDesktop) return;

    let animId;
    const lerpTilt = () => {
      setMouseTilt((prev) => ({
        x: prev.x + (targetTilt.x - prev.x) * 0.08,
        y: prev.y + (targetTilt.y - prev.y) * 0.08,
      }));
      animId = requestAnimationFrame(lerpTilt);
    };

    animId = requestAnimationFrame(lerpTilt);
    return () => cancelAnimationFrame(animId);
  }, [isDesktop, targetTilt]);

  // Timeline scrubber playback loop
  useEffect(() => {
    if (!isPlaying || !isDesktop) return;

    const loop = (timestamp) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const delta = (timestamp - lastTimeRef.current) / 1000;
      lastTimeRef.current = timestamp;

      setTimelineSec((prev) => {
        const next = prev + delta * 0.8; // 0.8x speed for smooth elegance
        return next >= 3.0 ? 0 : next;
      });

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      lastTimeRef.current = null;
    };
  }, [isPlaying, isDesktop]);

  // Mouse move handler over showcase window
  const handleMouseMove = useCallback((e) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    // Mild, luxurious tilt angles (within -6deg to +6deg)
    setTargetTilt({
      x: xPct * 8,
      y: -yPct * 6,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTargetTilt({ x: 0, y: 0 });
  }, []);

  // Timeline scrubber click
  const handleTimelineClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickRatio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setTimelineSec(clickRatio * 3.0);
  };

  if (!isDesktop) {
    return null; // Desktop only as commanded
  }

  // Derived progress values
  const playheadPercent = (timelineSec / 3.0) * 100;
  const timeFormatted = `00:0${Math.floor(timelineSec)}:${Math.floor((timelineSec % 1) * 60)
    .toString()
    .padStart(2, '0')}`;

  // Animos-style 3D Transform calculations based on scroll + mouse tilt
  const rotateX = scrollProgress * 12 + mouseTilt.y;
  const rotateY = mouseTilt.x;
  const translateY = scrollProgress * 48;
  const scale = 1 - scrollProgress * 0.024;

  // Counter parallax for bottom horizon stage
  const horizonTranslateY = -scrollProgress * 34;
  const horizonScale = 1 + scrollProgress * 0.038;

  // Kinetic typography phrases for Mode 1
  const phrases = [
    { text: 'INTENTIONAL CRAFT', sub: 'Precision typography & structural balance' },
    { text: 'KINETIC VELOCITY', sub: 'Hardware-accelerated 60 FPS interactions' },
    { text: 'DIMENSIONAL DEPTH', sub: 'Sculpted lighting & architectural space' },
  ];
  const activePhraseIndex = Math.floor(timelineSec) % phrases.length;
  const activePhrase = phrases[activePhraseIndex];

  // Bezier curve calculations for Mode 2
  const bezierProgress = timelineSec / 3.0;
  const cp1Y = 180 + Math.sin(bezierProgress * Math.PI * 2) * 55;
  const cp2Y = 60 + Math.cos(bezierProgress * Math.PI * 2) * 50;
  const pathD = `M 40,200 C 180,${cp1Y} 380,${cp2Y} 580,40`;

  return (
    <div
      ref={containerRef}
      className="motion-showcase-wrapper hero-desktop-only"
      aria-label="Interactive Motion Graphics Engine Showcase"
    >
      {/* Top Ambient Light Flare */}
      <div className="motion-ambient-glow" aria-hidden="true" />

      {/* Main 3D Perspective Stage */}
      <div
        ref={stageRef}
        className="motion-stage-card"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(${translateY}px) scale(${scale})`,
        }}
      >
        {/* Window Chrome Header Bar */}
        <header className="showcase-header">
          <div className="showcase-header-left">
            <div className="window-dots" aria-hidden="true">
              <span className="window-dot" />
              <span className="window-dot" />
              <span className="window-dot" />
            </div>
            <span className="showcase-brand-tag">
              <Cpu size={12} className="tag-icon" />
              MOTION GRAPHICS ENGINE // NATCH.V2
            </span>
          </div>

          {/* Mode Switcher Tabs */}
          <nav className="showcase-modes-nav" aria-label="Motion Graphics Modes">
            <button
              type="button"
              className={`mode-btn ${activeMode === 'editorial' ? 'active' : ''}`}
              onClick={() => setActiveMode('editorial')}
            >
              <Activity size={12} />
              <span>01 // Editorial Flow</span>
            </button>
            <button
              type="button"
              className={`mode-btn ${activeMode === 'geometry' ? 'active' : ''}`}
              onClick={() => setActiveMode('geometry')}
            >
              <Sliders size={12} />
              <span>02 // Fluid Bezier</span>
            </button>
            <button
              type="button"
              className={`mode-btn ${activeMode === 'architecture' ? 'active' : ''}`}
              onClick={() => setActiveMode('architecture')}
            >
              <Layers size={12} />
              <span>03 // 3D Architecture</span>
            </button>
          </nav>

          {/* Technical Telemetry Badge */}
          <div className="showcase-header-right">
            <span className="spec-badge">
              <span className="spec-dot-live" />
              60 FPS
            </span>
            <span className="spec-badge">4K CANVAS</span>
            <span className="spec-badge">16:9 DCI</span>
          </div>
        </header>

        {/* Viewport Canvas Screen */}
        <div className="showcase-viewport">
          {/* Subtle Viewport Grid Backdrop */}
          <div className="viewport-grid-bg" aria-hidden="true" />

          {/* MODE 1: EDITORIAL MOTION */}
          {activeMode === 'editorial' && (
            <div className="viewport-content editorial-mode">
              {/* Kinetic Typography Mask */}
              <div className="kinetic-typography-block">
                <span className="kinetic-mode-eyebrow">
                  PHASE 0{activePhraseIndex + 1} — SCROLL DYNAMICS
                </span>
                <div className="kinetic-headline-wrap">
                  <h2 key={activePhrase.text} className="kinetic-headline">
                    {activePhrase.text}
                  </h2>
                </div>
                <p className="kinetic-subheadline">{activePhrase.sub}</p>
              </div>

              {/* Floating Dimensional Parallax Cards */}
              <div
                className="floating-card floating-card-left"
                style={{
                  transform: `translate3d(${mouseTilt.x * -2}px, ${mouseTilt.y * -2}px, 20px)`,
                }}
              >
                <div className="floating-card-header">
                  <span className="card-label">RENDER PIPELINE</span>
                  <span className="card-status-pill">GPU ACTIVE</span>
                </div>
                <strong className="floating-card-value">0.8ms Frame Latency</strong>
                <div className="floating-card-bar">
                  <div
                    className="floating-card-fill"
                    style={{ width: `${Math.min(100, (timelineSec / 3.0) * 120)}%` }}
                  />
                </div>
              </div>

              <div
                className="floating-card floating-card-right"
                style={{
                  transform: `translate3d(${mouseTilt.x * 2.2}px, ${mouseTilt.y * 2.2}px, 25px)`,
                }}
              >
                <div className="floating-card-header">
                  <span className="card-label">MOTION MATH</span>
                  <span className="card-metric">HERMITE SPLINE</span>
                </div>
                <div className="floating-code-snippet">
                  <code>
                    gsap.to(&apos;.viewport&apos;, &#123;
                    <br />
                    &nbsp;&nbsp;ease: &apos;{easingPreset}&apos;,
                    <br />
                    &nbsp;&nbsp;scrollTrigger: &#123; scrub: 0.6 &#125;
                    <br />
                    &#125;)
                  </code>
                </div>
              </div>
            </div>
          )}

          {/* MODE 2: FLUID BEZIER GEOMETRY */}
          {activeMode === 'geometry' && (
            <div className="viewport-content geometry-mode">
              <svg
                viewBox="0 0 620 240"
                className="bezier-svg-stage"
                aria-label="Interactive Bezier Easing Wave"
              >
                <defs>
                  <linearGradient id="curveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#888888" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0.9" />
                  </linearGradient>
                </defs>

                {/* Grid guidelines */}
                <line x1="40" y1="200" x2="580" y2="200" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
                <line x1="40" y1="40" x2="580" y2="40" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
                <line x1="40" y1="120" x2="580" y2="120" stroke="rgba(255,255,255,0.04)" />

                {/* Control tangent lines */}
                <line x1="40" y1="200" x2="180" y2={cp1Y} stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                <line x1="580" y1="40" x2="380" y2={cp2Y} stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

                {/* Dynamic Bezier Curve */}
                <path d={pathD} fill="none" stroke="url(#curveGrad)" strokeWidth="3" />

                {/* Control points */}
                <circle cx="180" cy={cp1Y} r="5" fill="#ffffff" />
                <circle cx="380" cy={cp2Y} r="5" fill="#ffffff" />

                {/* Traveling Playhead Node */}
                <circle
                  cx={40 + (bezierProgress) * 540}
                  cy={200 - bezierProgress * 160 + Math.sin(bezierProgress * Math.PI) * 40}
                  r="7"
                  fill="#ffffff"
                  stroke="#111111"
                  strokeWidth="2"
                />
              </svg>

              {/* HUD Coordinates Display */}
              <div className="geometry-hud">
                <div className="hud-item">
                  <span className="hud-label">EASING FORMULA</span>
                  <strong className="hud-value">cubic-bezier(0.16, 1, 0.3, 1)</strong>
                </div>
                <div className="hud-item">
                  <span className="hud-label">SPLINE TENSION</span>
                  <strong className="hud-value">{(0.75 + Math.sin(timelineSec) * 0.15).toFixed(2)}</strong>
                </div>
                <div className="hud-item">
                  <span className="hud-label">COORDINATES</span>
                  <strong className="hud-value">
                    X: {(timelineSec * 180).toFixed(0)}px // Y: {cp1Y.toFixed(0)}px
                  </strong>
                </div>
              </div>
            </div>
          )}

          {/* MODE 3: 3D ARCHITECTURE STACK */}
          {activeMode === 'architecture' && (
            <div className="viewport-content architecture-mode">
              <div
                className="isometric-stack"
                style={{
                  transform: `rotateX(45deg) rotateZ(-30deg) translate3d(${mouseTilt.x * 2}px, ${mouseTilt.y * 2}px, 0)`,
                }}
              >
                {/* Layer 03: Presentation */}
                <div className="iso-layer iso-layer-top">
                  <div className="iso-layer-badge">LAYER 03 // EDITORIAL SURFACE</div>
                  <div className="iso-layer-content">
                    <span className="iso-chip">Dynamic Clamps</span>
                    <span className="iso-chip">Micro-Transitions</span>
                  </div>
                </div>

                {/* Layer 02: Engine */}
                <div className="iso-layer iso-layer-middle">
                  <div className="iso-layer-badge">LAYER 02 // MOTION ENGINE</div>
                  <div className="iso-layer-content">
                    <span className="iso-chip">GSAP Core 3.15</span>
                    <span className="iso-chip">ScrollTrigger Scrub</span>
                  </div>
                </div>

                {/* Layer 01: Core Architecture */}
                <div className="iso-layer iso-layer-bottom">
                  <div className="iso-layer-badge">LAYER 01 // REACT 19 CORE</div>
                  <div className="iso-layer-content">
                    <span className="iso-chip">Concurrent Rendering</span>
                    <span className="iso-chip">Zero Jitter DOM</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Animos-Style Motion Timeline Scrubber Strip */}
        <footer className="showcase-timeline-bar">
          <div className="timeline-controls-left">
            <button
              type="button"
              className="timeline-action-btn"
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? 'Pause Motion Timeline' : 'Play Motion Timeline'}
            >
              {isPlaying ? <Pause size={13} /> : <Play size={13} />}
            </button>
            <button
              type="button"
              className="timeline-action-btn"
              onClick={() => setTimelineSec(0)}
              aria-label="Restart Timeline"
            >
              <RotateCcw size={12} />
            </button>
            <span className="timeline-counter-readout">{timeFormatted} / 00:03:00</span>
          </div>

          {/* Interactive Scrub Track */}
          <div
            className="timeline-track-wrapper"
            onClick={handleTimelineClick}
            role="slider"
            tabIndex={0}
            aria-label="Timeline position scrubber"
            aria-valuemin={0}
            aria-valuemax={3}
            aria-valuenow={parseFloat(timelineSec.toFixed(2))}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight') setTimelineSec((t) => Math.min(3, t + 0.1));
              if (e.key === 'ArrowLeft') setTimelineSec((t) => Math.max(0, t - 0.1));
            }}
          >
            {/* Tick marks */}
            <div className="timeline-ruler" aria-hidden="true">
              {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((tick) => (
                <span
                  key={tick}
                  className={`ruler-tick ${tick % 30 === 0 ? 'major' : 'minor'}`}
                  style={{ left: `${tick}%` }}
                />
              ))}
            </div>

            {/* Keyframe Markers */}
            <span className="keyframe-diamond" style={{ left: '0%' }} title="Keyframe 0s" />
            <span className="keyframe-diamond" style={{ left: '33.3%' }} title="Keyframe 1s" />
            <span className="keyframe-diamond" style={{ left: '66.6%' }} title="Keyframe 2s" />
            <span className="keyframe-diamond" style={{ left: '100%' }} title="Keyframe 3s" />

            {/* Progress Fill */}
            <div className="timeline-progress-fill" style={{ width: `${playheadPercent}%` }} />

            {/* Playhead Scrub Needle */}
            <div className="timeline-playhead" style={{ left: `${playheadPercent}%` }}>
              <div className="playhead-knob" />
              <div className="playhead-line" />
            </div>
          </div>

          {/* Easing Preset Selector */}
          <div className="timeline-controls-right">
            <button
              type="button"
              className="easing-pill-btn"
              onClick={() => {
                const presets = ['power3.out', 'expo.out', 'cubic-bezier(0.16,1,0.3,1)'];
                const nextIdx = (presets.indexOf(easingPreset) + 1) % presets.length;
                setEasingPreset(presets[nextIdx]);
              }}
              title="Click to toggle easing equation"
            >
              <Code size={11} />
              <span>{easingPreset}</span>
            </button>
          </div>
        </footer>
      </div>

      {/* Animos-Style Counter-Parallax Stage Horizon Curve Underneath */}
      <div
        className="motion-stage-horizon"
        aria-hidden="true"
        style={{
          transform: `translate3d(0, ${horizonTranslateY}px, 0) scale(${horizonScale})`,
        }}
      >
        <div className="horizon-concentric-arc" />
        <div className="horizon-fade-overlay" />
      </div>

      <style>{`
        /* Wrapper & Layout */
        .motion-showcase-wrapper {
          position: relative;
          width: 100%;
          max-width: 1140px;
          margin: 2.5rem auto 0 auto;
          perspective: 1600px;
        }

        .motion-ambient-glow {
          position: absolute;
          top: -30px;
          left: 50%;
          transform: translateX(-50%);
          width: 80%;
          height: 120px;
          background: radial-gradient(ellipse at top, rgba(255, 255, 255, 0.08) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        /* 3D Perspective Stage Card */
        .motion-stage-card {
          position: relative;
          z-index: 2;
          background-color: #0d0d0f;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: var(--radius-md);
          box-shadow:
            0 32px 90px -20px rgba(0, 0, 0, 0.95),
            0 0 0 1px rgba(255, 255, 255, 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 0.15);
          overflow: hidden;
          transition: border-color var(--duration-fast) var(--ease-out);
          transform-style: preserve-3d;
          will-change: transform;
        }

        .motion-stage-card:hover {
          border-color: rgba(255, 255, 255, 0.2);
        }

        /* Header Bar */
        .showcase-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1.15rem;
          background: rgba(20, 20, 23, 0.92);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          gap: 1rem;
        }

        .showcase-header-left {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .window-dots {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .window-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.22);
          display: inline-block;
        }

        .showcase-brand-tag {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          color: var(--color-gray-400);
          display: flex;
          align-items: center;
          gap: 0.4rem;
          letter-spacing: 0.04em;
        }

        .tag-icon {
          color: var(--color-white);
        }

        /* Modes Switcher */
        .showcase-modes-nav {
          display: flex;
          align-items: center;
          background: rgba(0, 0, 0, 0.45);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-xs);
          padding: 2px;
          gap: 2px;
        }

        .mode-btn {
          background: transparent;
          border: none;
          color: var(--color-gray-400);
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-xs);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          transition: all var(--duration-fast) var(--ease-out);
        }

        .mode-btn:hover {
          color: var(--color-white);
          background: rgba(255, 255, 255, 0.04);
        }

        .mode-btn.active {
          color: var(--color-white);
          background: rgba(255, 255, 255, 0.12);
          font-weight: 500;
        }

        .showcase-header-right {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .spec-badge {
          font-family: var(--font-mono);
          font-size: 0.625rem;
          color: var(--color-gray-300);
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 0.2rem 0.45rem;
          border-radius: var(--radius-xs);
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .spec-dot-live {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #ffffff;
        }

        /* Viewport Canvas Screen */
        .showcase-viewport {
          position: relative;
          height: 380px;
          background: radial-gradient(circle at 50% 30%, #151518 0%, #09090b 85%);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .viewport-grid-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 32px 32px;
          background-position: center center;
          pointer-events: none;
          opacity: 0.6;
        }

        .viewport-content {
          position: relative;
          z-index: 2;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }

        /* Mode 1: Editorial */
        .kinetic-typography-block {
          text-align: center;
          max-width: 640px;
        }

        .kinetic-mode-eyebrow {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          letter-spacing: 0.1em;
          color: var(--color-gray-400);
          display: inline-block;
          margin-bottom: 0.75rem;
        }

        .kinetic-headline-wrap {
          overflow: hidden;
          min-height: 3.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .kinetic-headline {
          font-family: var(--font-display);
          font-size: clamp(2.2rem, 3.8vw, 3.25rem);
          font-weight: 700;
          letter-spacing: -0.04em;
          line-height: 1.05;
          color: #ffffff;
          animation: textFadeIn 0.4s var(--ease-out);
        }

        @keyframes textFadeIn {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .kinetic-subheadline {
          font-size: 0.9375rem;
          color: var(--color-gray-300);
          margin-top: 0.5rem;
        }

        /* Floating dimensional cards */
        .floating-card {
          position: absolute;
          background: rgba(18, 18, 22, 0.88);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: var(--radius-sm);
          padding: 0.85rem 1rem;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6);
          pointer-events: none;
          transition: transform 0.15s ease-out;
        }

        .floating-card-left {
          left: 2.5rem;
          bottom: 2.5rem;
          width: 240px;
        }

        .floating-card-right {
          right: 2.5rem;
          top: 2.5rem;
          width: 260px;
        }

        .floating-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.4rem;
        }

        .card-label {
          font-family: var(--font-mono);
          font-size: 0.625rem;
          color: var(--color-gray-400);
          letter-spacing: 0.05em;
        }

        .card-status-pill {
          font-family: var(--font-mono);
          font-size: 0.5625rem;
          color: #ffffff;
          background: rgba(255, 255, 255, 0.1);
          padding: 2px 6px;
          border-radius: var(--radius-xs);
        }

        .card-metric {
          font-family: var(--font-mono);
          font-size: 0.5625rem;
          color: var(--color-gray-400);
        }

        .floating-card-value {
          display: block;
          font-family: var(--font-display);
          font-size: 0.875rem;
          color: var(--color-white);
          margin-bottom: 0.5rem;
        }

        .floating-card-bar {
          height: 3px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 2px;
          overflow: hidden;
        }

        .floating-card-fill {
          height: 100%;
          background: var(--color-white);
          border-radius: 2px;
          transition: width 0.1s linear;
        }

        .floating-code-snippet {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          color: var(--color-gray-300);
          line-height: 1.4;
          background: rgba(0, 0, 0, 0.4);
          padding: 0.5rem 0.6rem;
          border-radius: var(--radius-xs);
          border: 1px solid rgba(255, 255, 255, 0.06);
        }

        /* Mode 2: Geometry SVG */
        .bezier-svg-stage {
          width: 100%;
          max-width: 620px;
          height: auto;
        }

        .geometry-hud {
          display: flex;
          align-items: center;
          gap: 1.75rem;
          margin-top: 1.25rem;
          padding: 0.5rem 1rem;
          background: rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-xs);
        }

        .hud-item {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }

        .hud-label {
          font-family: var(--font-mono);
          font-size: 0.5625rem;
          color: var(--color-gray-500);
          letter-spacing: 0.06em;
        }

        .hud-value {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--color-white);
        }

        /* Mode 3: Isometric Architecture */
        .architecture-mode {
          perspective: 1000px;
        }

        .isometric-stack {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          transform-style: preserve-3d;
          transition: transform 0.15s ease-out;
        }

        .iso-layer {
          width: 380px;
          padding: 0.85rem 1.25rem;
          background: rgba(18, 18, 22, 0.85);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: var(--radius-sm);
          box-shadow: 0 14px 35px rgba(0, 0, 0, 0.7);
        }

        .iso-layer-top {
          border-color: rgba(255, 255, 255, 0.3);
          transform: translateZ(40px);
        }

        .iso-layer-middle {
          transform: translateZ(20px);
        }

        .iso-layer-bottom {
          transform: translateZ(0);
        }

        .iso-layer-badge {
          font-family: var(--font-mono);
          font-size: 0.625rem;
          color: var(--color-gray-400);
          margin-bottom: 0.5rem;
        }

        .iso-layer-content {
          display: flex;
          gap: 0.5rem;
        }

        .iso-chip {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--color-white);
          padding: 0.25rem 0.6rem;
          border-radius: var(--radius-xs);
        }

        /* Timeline Footer Scrubber Strip */
        .showcase-timeline-bar {
          display: flex;
          align-items: center;
          padding: 0.65rem 1.15rem;
          background: rgba(16, 16, 19, 0.95);
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          gap: 1.25rem;
        }

        .timeline-controls-left {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .timeline-action-btn {
          width: 26px;
          height: 26px;
          border-radius: var(--radius-xs);
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--color-white);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--duration-fast) var(--ease-out);
        }

        .timeline-action-btn:hover {
          background: rgba(255, 255, 255, 0.15);
        }

        .timeline-counter-readout {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          color: var(--color-gray-300);
          letter-spacing: 0.04em;
          margin-left: 0.25rem;
        }

        /* Scrub Track */
        .timeline-track-wrapper {
          flex: 1;
          position: relative;
          height: 24px;
          display: flex;
          align-items: center;
          cursor: pointer;
          user-select: none;
        }

        .timeline-ruler {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .ruler-tick {
          position: absolute;
          top: 0;
          width: 1px;
          background: rgba(255, 255, 255, 0.1);
        }

        .ruler-tick.major {
          height: 6px;
          background: rgba(255, 255, 255, 0.22);
        }

        .ruler-tick.minor {
          height: 3px;
        }

        .keyframe-diamond {
          position: absolute;
          width: 6px;
          height: 6px;
          background: rgba(255, 255, 255, 0.4);
          transform: translate(-50%, 0) rotate(45deg);
          top: 9px;
          pointer-events: none;
        }

        .timeline-progress-fill {
          position: absolute;
          left: 0;
          height: 2px;
          background: rgba(255, 255, 255, 0.35);
          pointer-events: none;
        }

        .timeline-playhead {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 1px;
          background: #ffffff;
          transform: translateX(-50%);
          pointer-events: none;
        }

        .playhead-knob {
          position: absolute;
          top: -3px;
          left: -4px;
          width: 9px;
          height: 9px;
          background: #ffffff;
          border-radius: 50%;
          box-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
        }

        .playhead-line {
          width: 1px;
          height: 100%;
          background: rgba(255, 255, 255, 0.85);
        }

        .timeline-controls-right {
          display: flex;
          align-items: center;
        }

        .easing-pill-btn {
          font-family: var(--font-mono);
          font-size: 0.625rem;
          color: var(--color-gray-300);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-xs);
          padding: 0.25rem 0.55rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.35rem;
          transition: all var(--duration-fast) var(--ease-out);
        }

        .easing-pill-btn:hover {
          background: rgba(255, 255, 255, 0.12);
          color: var(--color-white);
        }

        /* Animos-Style Counter-Parallax Stage Horizon Curve */
        .motion-stage-horizon {
          position: absolute;
          bottom: -70px;
          left: 50%;
          transform: translateX(-50%);
          width: 125vw;
          max-width: 1600px;
          height: 140px;
          pointer-events: none;
          z-index: 1;
          overflow: hidden;
          will-change: transform;
        }

        .horizon-concentric-arc {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          height: 280px;
          border-radius: 50%;
          border-top: 1px solid rgba(255, 255, 255, 0.16);
          background: radial-gradient(ellipse at 50% 0%, rgba(255, 255, 255, 0.06) 0%, transparent 70%);
        }

        .horizon-fade-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 0%, #080808 90%);
        }
      `}</style>
    </div>
  );
}
