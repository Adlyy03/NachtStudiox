import { useRef } from 'react';
import { Target, Compass, Flame } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function AboutStudio() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      gsap.from('.about-anim', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power3.out',
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} id="about" className="section about-section" aria-label="Tentang Natch Studio">
      <div className="container">
        <div className="about-header about-anim">
          <span className="eyebrow">
            <span className="eyebrow-dot" />
            COMPANY PROFILE // TENTANG KAMI
          </span>
          <h2 className="heading-1 about-title">
            Dibangun atas dedikasi <br />
            pada kualitas piranti lunak.
          </h2>
          <p className="body-large about-lead">
            Natch Studio adalah studio digital independen berbasis di Jakarta. Kami hadir bagi bisnis yang menginginkan
            produk digital berkarakter kuat tanpa jalan pintas template massal.
          </p>
        </div>

        {/* 3 Pillars: Story, Vision, Philosophy - 3 columns side by side on mobile */}
        <div className="about-grid about-anim">
          <div className="about-card surface-card">
            <div className="about-card-top">
              <span className="about-icon-box">
                <Compass size={14} className="text-white" />
              </span>
              <span className="about-num">01</span>
            </div>
            <strong className="about-card-title">Latar Belakang</strong>
            <p className="about-card-desc">
              Didirikan oleh praktisi rekayasa piranti lunak dan desainer antarmuka yang mengutamakan ketelitian kode dan estetika abadi.
            </p>
          </div>

          <div className="about-card surface-card">
            <div className="about-card-top">
              <span className="about-icon-box">
                <Target size={14} className="text-white" />
              </span>
              <span className="about-num">02</span>
            </div>
            <strong className="about-card-title">Visi Studio</strong>
            <p className="about-card-desc">
              Menghadirkan website dan aplikasi digital berkecepatan tinggi yang mendukung pertumbuhan reputasi bisnis klien.
            </p>
          </div>

          <div className="about-card surface-card">
            <div className="about-card-top">
              <span className="about-icon-box">
                <Flame size={14} className="text-white" />
              </span>
              <span className="about-num">03</span>
            </div>
            <strong className="about-card-title">Filosofi Kerja</strong>
            <p className="about-card-desc">
              Setiap elemen visual dan baris kode harus memiliki alasan fungsional. Nol ornamen palsu, nol AI-slop.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .about-section {
          background-color: var(--color-ink);
          border-top: 1px solid var(--color-border);
        }

        .about-header {
          max-width: 760px;
          margin-bottom: 2.5rem;
        }

        @media (max-width: 640px) {
          .about-header {
            margin-bottom: 1.5rem;
          }
        }

        .about-title {
          margin-top: 0.75rem;
          margin-bottom: 0.875rem;
        }

        .about-lead {
          color: var(--color-gray-400);
          font-size: clamp(0.875rem, 1.05vw, 1.125rem);
          line-height: 1.5;
        }

        @media (max-width: 640px) {
          .about-lead {
            font-size: 0.8125rem;
          }
        }

        .about-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }

        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 0.5rem;
          }
        }

        .about-card {
          padding: 1.75rem 1.5rem;
          display: flex;
          flex-direction: column;
        }

        @media (max-width: 768px) {
          .about-card {
            padding: 0.875rem 0.625rem;
            border-radius: var(--radius-xs);
          }
        }

        .about-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        @media (max-width: 768px) {
          .about-card-top {
            margin-bottom: 0.5rem;
          }
        }

        .about-icon-box {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-xs);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--color-border);
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        @media (max-width: 768px) {
          .about-icon-box {
            width: 24px;
            height: 24px;
          }
          .about-icon-box svg {
            width: 12px;
            height: 12px;
          }
        }

        .about-num {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--color-gray-500);
        }

        @media (max-width: 768px) {
          .about-num {
            font-size: 0.625rem;
          }
        }

        .about-card-title {
          font-family: var(--font-display);
          font-size: 1.125rem;
          color: var(--color-white);
          margin-bottom: 0.5rem;
        }

        @media (max-width: 768px) {
          .about-card-title {
            font-size: 0.78125rem;
            line-height: 1.2;
            margin-bottom: 0.25rem;
          }
        }

        .about-card-desc {
          font-size: 0.875rem;
          color: var(--color-gray-400);
          line-height: 1.5;
        }

        @media (max-width: 768px) {
          .about-card-desc {
            font-size: 0.625rem;
            line-height: 1.35;
          }
        }
      `}</style>
    </section>
  );
}
