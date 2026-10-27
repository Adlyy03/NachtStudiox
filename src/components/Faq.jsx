import { useState, useRef } from 'react';
import { ChevronDown, ShieldAlert, CreditCard, Wrench, CheckCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Faq() {
  const [openIdx, setOpenIdx] = useState(0); // first item open by default
  const containerRef = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      gsap.from('.faq-anim', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 18,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power3.out',
      });
    },
    { scope: containerRef }
  );

  const faqs = [
    {
      q: 'Kebijakan NDA (Perjanjian Kerahasiaan)',
      icon: <ShieldAlert size={14} className="text-white" />,
      tag: 'LEGALITAS',
      a: 'Natch Studio menandatangani Non-Disclosure Agreement (NDA) resmi sebelum Anda membagikan dokumen, ide produk, atau data sensitif perusahaan.',
    },
    {
      q: 'Skema & Termin Pembayaran',
      icon: <CreditCard size={14} className="text-white" />,
      tag: 'FINANSIAL',
      a: 'Pembayaran dibagi bertahap berbasis milestone: 40% DP inisiasi proyek, 30% verifikasi staging aktif, dan 30% setelah seluruh deliverables lolos QA dan serah terima rilis.',
    },
    {
      q: 'Garansi Bug & Perbaikan Sistem',
      icon: <CheckCircle size={14} className="text-white" />,
      tag: 'KUALITAS',
      a: 'Setiap proyek mencakup 30–60 hari masa garansi gratis pasca-peluncuran untuk perbaikan bug teknis, penyesuaian dependensi, dan stabilitas server.',
    },
    {
      q: 'SLA & Pemeliharaan (Maintenance)',
      icon: <Wrench size={14} className="text-white" />,
      tag: 'DUKUNGAN',
      a: 'Tersedia perjanjian Service Level Agreement (SLA) bulanan atau kuartalan untuk pembaruan fitur, optimasi database, monitoring uptime, dan scaling infrastruktur.',
    },
  ];

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? -1 : idx);
  };

  return (
    <section ref={containerRef} id="faq" className="section faq-section" aria-label="FAQ Kerjasama">
      <div className="container">
        <div className="faq-header faq-anim">
          <span className="eyebrow">
            <span className="eyebrow-dot" />
            STANDAR OPERASIONAL // FAQ
          </span>
          <h2 className="heading-1 faq-title">
            Ketentuan kerjasama & jaminan.
          </h2>
          <p className="body-large faq-lead">
            Parameter bisnis, hak cipta, dan standar layanan yang jelas untuk menjaga transparansi investasi produk digital Anda.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="faq-list faq-anim">
          {faqs.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`faq-item surface-card ${isOpen ? 'is-open' : ''}`}
                onClick={() => toggle(idx)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggle(idx);
                  }
                }}
                aria-expanded={isOpen}
              >
                <div className="faq-question-row">
                  <div className="faq-q-left">
                    <span className="faq-icon-box">{item.icon}</span>
                    <strong className="faq-question-text">{item.q}</strong>
                    <span className="tag faq-tag">{item.tag}</span>
                  </div>
                  <ChevronDown size={14} className={`faq-chevron ${isOpen ? 'is-rotated' : ''}`} />
                </div>

                {isOpen && (
                  <div className="faq-answer-row">
                    <p className="faq-answer-text">{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .faq-section {
          background-color: var(--color-ink);
          border-top: 1px solid var(--color-border);
        }

        .faq-header {
          max-width: 760px;
          margin-bottom: 2.25rem;
        }

        @media (max-width: 640px) {
          .faq-header {
            margin-bottom: 1.5rem;
          }
        }

        .faq-title {
          margin-top: 0.75rem;
          margin-bottom: 0.75rem;
        }

        .faq-lead {
          color: var(--color-gray-400);
          font-size: clamp(0.875rem, 1.05vw, 1.125rem);
          line-height: 1.5;
        }

        @media (max-width: 640px) {
          .faq-lead {
            font-size: 0.8125rem;
          }
        }

        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 0.875rem;
          max-width: 920px;
        }

        @media (max-width: 640px) {
          .faq-list {
            gap: 0.5rem;
          }
        }

        .faq-item {
          padding: 1.25rem 1.5rem;
          cursor: pointer;
          outline: none;
          transition: all var(--duration-fast);
        }

        @media (max-width: 640px) {
          .faq-item {
            padding: 0.875rem 0.75rem;
            border-radius: var(--radius-xs);
          }
        }

        .faq-item:focus-visible {
          outline: 2px solid var(--color-white);
          outline-offset: 2px;
        }

        .faq-item.is-open {
          border-color: var(--color-border-strong);
          background-color: var(--color-elevated);
        }

        .faq-question-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
        }

        .faq-q-left {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        @media (max-width: 640px) {
          .faq-q-left {
            gap: 0.5rem;
          }
        }

        .faq-icon-box {
          width: 26px;
          height: 26px;
          border-radius: var(--radius-xs);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--color-border);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        @media (max-width: 640px) {
          .faq-icon-box {
            width: 20px;
            height: 20px;
          }
          .faq-icon-box svg {
            width: 11px;
            height: 11px;
          }
        }

        .faq-question-text {
          font-family: var(--font-display);
          font-size: 1rem;
          color: var(--color-white);
        }

        @media (max-width: 640px) {
          .faq-question-text {
            font-size: 0.78125rem;
          }
        }

        .faq-tag {
          font-size: 0.5625rem !important;
          padding: 2px 5px !important;
        }

        @media (max-width: 480px) {
          .faq-tag {
            display: none;
          }
        }

        .faq-chevron {
          color: var(--color-gray-400);
          transition: transform var(--duration-fast);
          flex-shrink: 0;
        }

        .faq-chevron.is-rotated {
          transform: rotate(180deg);
          color: var(--color-white);
        }

        .faq-answer-row {
          padding-top: 0.875rem;
          margin-top: 0.75rem;
          border-top: 1px solid var(--color-border-subtle);
        }

        @media (max-width: 640px) {
          .faq-answer-row {
            padding-top: 0.5rem;
            margin-top: 0.5rem;
          }
        }

        .faq-answer-text {
          font-size: 0.875rem;
          color: var(--color-gray-300);
          line-height: 1.55;
        }

        @media (max-width: 640px) {
          .faq-answer-text {
            font-size: 0.6875rem;
            line-height: 1.4;
          }
        }
      `}</style>
    </section>
  );
}
