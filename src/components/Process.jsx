import { useRef } from 'react';
import { processSteps } from '../data/process';
import { CheckCircle2, Clock } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Process() {
  const containerRef = useRef(null);
  const lineRef = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      // Draw process line smoothly on scroll
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 70%',
              end: 'bottom 85%',
              scrub: 0.6,
            },
          }
        );
      }

      // Stagger process cards entrance
      gsap.from('.process-item-anim', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        x: -24,
        stagger: 0.18,
        duration: 0.8,
        ease: 'power3.out',
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} id="process" className="section process-section" aria-label="Alur Kerja Studio">
      <div className="container">
        {/* Header */}
        <div className="process-header">
          <span className="eyebrow">
            <span className="eyebrow-dot" />
            METODOLOGI EKSEKUSI
          </span>
          <h2 className="heading-1 process-title">
            Empat fase terstruktur, <br />
            dari konsep hingga rilis stabil.
          </h2>
          <p className="body-large process-subtitle">
            Alur kerja kami dirancang untuk meminimalkan friksi, menghilangkan ketidakpastian scope, dan memastikan setiap
            milestone terverifikasi sebelum melangkah ke tahap berikutnya.
          </p>
        </div>

        {/* Process Flow Timeline */}
        <div className="process-timeline">
          {/* Animated vertical track line */}
          <div className="timeline-rail" aria-hidden="true">
            <div ref={lineRef} className="timeline-rail-fill" />
          </div>

          <div className="process-list">
            {processSteps.map((step) => (
              <div key={step.step} className="process-item process-item-anim">
                {/* Node indicator */}
                <div className="step-node-col">
                  <div className="step-node" aria-hidden="true">
                    <span>{step.step}</span>
                  </div>
                </div>

                {/* Content Card */}
                <div className="step-card surface-card">
                  <div className="step-card-header">
                    <div>
                      <span className="step-duration">
                        <Clock size={12} className="clock-icon" />
                        {step.duration}
                      </span>
                      <h3 className="heading-2 step-name">
                        {step.step}. {step.name}
                      </h3>
                    </div>
                    <span className="step-tagline">{step.tagline}</span>
                  </div>

                  <p className="body-regular step-desc">{step.description}</p>

                  <div className="step-outputs">
                    <span className="outputs-label">Deliverables Fase Ini:</span>
                    <ul className="outputs-list">
                      {step.outputs.map((out, i) => (
                        <li key={i} className="output-chip">
                          <CheckCircle2 size={13} className="output-icon" />
                          <span>{out}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .process-section {
          background-color: var(--color-ink);
          border-top: 1px solid var(--color-border);
        }

        .process-header {
          max-width: 820px;
          margin-bottom: 4rem;
        }

        .process-title {
          margin-top: 1rem;
          margin-bottom: 1.25rem;
        }

        .process-subtitle {
          color: var(--color-gray-400);
        }

        .process-timeline {
          position: relative;
          padding-left: 2rem;
        }

        @media (max-width: 640px) {
          .process-timeline {
            padding-left: 1.25rem;
          }
        }

        @media (min-width: 768px) {
          .process-timeline {
            padding-left: 4.5rem;
          }
        }

        .timeline-rail {
          position: absolute;
          top: 2rem;
          bottom: 2rem;
          left: 19px;
          width: 2px;
          background: rgba(255, 255, 255, 0.08);
          transform: translateX(-50%);
        }

        @media (max-width: 640px) {
          .timeline-rail {
            left: 12px;
          }
        }

        @media (min-width: 768px) {
          .timeline-rail {
            left: 31px;
          }
        }

        .timeline-rail-fill {
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, var(--color-white), rgba(255, 255, 255, 0.2));
          transform-origin: top;
        }

        .process-list {
          display: flex;
          flex-direction: column;
          gap: 2.25rem;
        }

        @media (max-width: 640px) {
          .process-list {
            gap: 1.25rem;
          }
        }

        .process-item {
          position: relative;
          display: flex;
          align-items: flex-start;
          gap: 1.5rem;
        }

        .step-node-col {
          position: absolute;
          left: -2rem;
          top: 1.5rem;
          z-index: 2;
        }

        @media (max-width: 640px) {
          .step-node-col {
            left: -1.25rem;
            top: 1rem;
          }
        }

        @media (min-width: 768px) {
          .step-node-col {
            left: -4.5rem;
          }
        }

        .step-node {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background-color: var(--color-charcoal);
          border: 1px solid var(--color-border-strong);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-mono);
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--color-white);
          box-shadow: 0 0 16px rgba(0, 0, 0, 0.8);
          transform: translateX(-50%);
          margin-left: 19px;
        }

        @media (max-width: 640px) {
          .step-node {
            width: 26px;
            height: 26px;
            margin-left: 12px;
            font-size: 0.6875rem;
          }
        }

        @media (min-width: 768px) {
          .step-node {
            width: 44px;
            height: 44px;
            margin-left: 31px;
            font-size: 0.875rem;
          }
        }

        .step-card {
          width: 100%;
          padding: 2.25rem 2.5rem;
          margin-left: 1rem;
        }

        @media (max-width: 640px) {
          .step-card {
            padding: 1.25rem 1rem;
            margin-left: 0.25rem;
            border-radius: var(--radius-sm);
          }
        }

        .step-card-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 1.25rem;
          gap: 1rem;
        }

        @media (max-width: 640px) {
          .step-card-header {
            flex-direction: column;
          }
        }

        .step-duration {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          color: var(--color-gray-500);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 0.25rem;
        }

        .clock-icon {
          color: var(--color-gray-400);
        }

        .step-name {
          font-size: 1.5rem;
          color: var(--color-white);
        }

        .step-tagline {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--color-gray-400);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          padding-top: 0.25rem;
        }

        .step-desc {
          color: var(--color-gray-300);
          margin-bottom: 1.5rem;
          max-width: 800px;
        }

        .step-outputs {
          padding-top: 1.25rem;
          border-top: 1px solid var(--color-border-subtle);
        }

        .outputs-label {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--color-gray-500);
          margin-bottom: 0.75rem;
        }

        .outputs-list {
          list-style: none;
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .output-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8125rem;
          color: var(--color-gray-300);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--color-border-subtle);
          padding: 0.375rem 0.75rem;
          border-radius: var(--radius-xs);
        }

        .output-icon {
          color: var(--color-white);
          flex-shrink: 0;
        }
      `}</style>
    </section>
  );
}
