import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ShieldCheck, Zap, Layers } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function TrustStatement() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      gsap.from('.trust-reveal', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 28,
        stagger: 0.15,
        duration: 0.9,
        ease: 'power3.out',
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="section trust-section" aria-label="Statement & Standar Studio">
      <div className="container">
        <div className="trust-inner">
          <div className="trust-reveal">
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              MANIFESTO STUDIO
            </span>
          </div>

          <h2 className="heading-1 trust-reveal trust-headline">
            Kami percaya piranti lunak berkualitas lahir dari perpaduan{' '}
            <span className="contrast-text">desain berkarakter</span> dan{' '}
            <span className="contrast-text">engineering tanpa kompromi.</span>
          </h2>

          <div className="trust-reveal trust-body-grid">
            <p className="body-large">
              Kami menolak template massal dan arsitektur rapuh. Setiap produk digital dibangun di atas tipografi kuat, kecepatan render instan, dan struktur data yang siap diskalakan.
            </p>
          </div>

          {/* Pillars of Craft */}
          <div className="trust-reveal pillars-grid">
            <div className="pillar-item">
              <div className="pillar-icon-box">
                <Zap size={14} className="pillar-icon" />
              </div>
              <h3 className="heading-3 pillar-title">Performa Sub-Detik</h3>
              <p className="body-small">
                Bundel ramping, zero layout shift (CLS: 0), muat cepat di jaringan seluler.
              </p>
            </div>

            <div className="pillar-item">
              <div className="pillar-icon-box">
                <Layers size={14} className="pillar-icon" />
              </div>
              <h3 className="heading-3 pillar-title">Tipografi Presisi</h3>
              <p className="body-small">
                Hierarki editorial terukur, visual monokromatik fokus tanpa distorsi warna.
              </p>
            </div>

            <div className="pillar-item">
              <div className="pillar-icon-box">
                <ShieldCheck size={14} className="pillar-icon" />
              </div>
              <h3 className="heading-3 pillar-title">Aksesibilitas WCAG</h3>
              <p className="body-small">
                Navigasi keyboard penuh, kontras tinggi, dan ramah reduced-motion.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .trust-section {
          border-top: 1px solid var(--color-border);
          background-color: var(--color-ink);
        }

        .trust-inner {
          max-width: 1080px;
          margin-inline: auto;
        }

        .trust-headline {
          margin-top: 1rem;
          margin-bottom: 2rem;
          color: var(--color-gray-400);
          line-height: 1.15;
        }

        @media (max-width: 640px) {
          .trust-headline {
            margin-bottom: 1.25rem;
          }
        }

        .contrast-text {
          color: var(--color-white);
        }

        .trust-body-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 2rem;
          margin-bottom: 3.5rem;
          padding-bottom: 2.5rem;
          border-bottom: 1px solid var(--color-border-subtle);
        }

        @media (max-width: 768px) {
          .trust-body-grid {
            grid-template-columns: 1fr;
            gap: 1.25rem;
            margin-bottom: 2rem;
            padding-bottom: 1.75rem;
          }
        }

        .pillars-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        @media (max-width: 860px) {
          .pillars-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 0.5rem;
          }
        }

        .pillar-item {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 1.5rem;
          transition: border-color var(--duration-fast) var(--ease-out),
                      background-color var(--duration-fast) var(--ease-out);
        }

        @media (max-width: 860px) {
          .pillar-item {
            padding: 0.875rem 0.625rem;
            border-radius: var(--radius-xs);
          }
          .pillar-icon-box {
            width: 28px;
            height: 28px;
            margin-bottom: 0.625rem;
          }
          .pillar-icon-box svg {
            width: 14px;
            height: 14px;
          }
          .pillar-title {
            font-size: 0.78125rem;
            line-height: 1.2;
            margin-bottom: 0.25rem;
          }
          .pillar-item .body-small {
            font-size: 0.625rem;
            line-height: 1.35;
          }
        }

        .pillar-item:hover {
          border-color: var(--color-border-strong);
          background: rgba(255, 255, 255, 0.04);
        }

        .pillar-icon-box {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-xs);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--color-border);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
        }

        .pillar-icon {
          color: var(--color-white);
        }

        .pillar-title {
          font-size: 1.125rem;
          margin-bottom: 0.625rem;
          color: var(--color-white);
        }
      `}</style>
    </section>
  );
}
