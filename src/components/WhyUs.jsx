import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function WhyUs() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      gsap.from('.why-reveal', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 28,
        stagger: 0.14,
        duration: 0.85,
        ease: 'power3.out',
      });
    },
    { scope: containerRef }
  );

  const comparisons = [
    {
      aspect: 'Arsitektur Kode',
      conventional: 'Template WordPress / Page builder kaku dengan plugin berlebih',
      lichtcraft: 'Clean codebase modular (React/Vite/TypeScript) dibangun dari nol',
    },
    {
      aspect: 'Penetapan Harga',
      conventional: 'Paket kaku dengan fitur dibatasi atau biaya tersembunyi',
      lichtcraft: 'Custom quotation transparan berdasarkan kompleksitas & kebutuhan',
    },
    {
      aspect: 'Performa & SEO',
      conventional: 'Skor Lighthouse medioker (50–70) dengan layout shift tinggi',
      lichtcraft: 'Diuji ketat: 95+ skor performa, zero CLS, sub-detik LCP',
    },
    {
      aspect: 'Aksesibilitas & Motion',
      conventional: 'Animasi acak tanpa hierarki yang memperlambat browser',
      lichtcraft: 'GSAP terkurasi dengan dukungan penuh reduced-motion & keyboard WCAG',
    },
  ];

  return (
    <section ref={containerRef} id="why" className="section why-section" aria-label="Mengapa LichtCraft">
      <div className="container">
        {/* Header */}
        <div className="why-header why-reveal">
          <span className="eyebrow">
            <span className="eyebrow-dot" />
            STANDAR & FILOSOFI
          </span>
          <h2 className="heading-1 why-title">
            Mengapa bermitra dengan <br />
            LichtCraft?
          </h2>
          <p className="body-large why-intro">
            Kami bukan agensi massal yang merakit template seragam. Kami adalah studio rekayasa produk digital independen
            yang didirikan di atas tiga prinsip inti yang tidak dapat ditawar.
          </p>
        </div>

        {/* 3 Core Tenets */}
        <div className="tenets-grid why-reveal">
          <div className="tenet-card surface-card">
            <div className="tenet-number">01</div>
            <h3 className="heading-2 tenet-title">Purposeful Design</h3>
            <p className="body-regular tenet-text">
              Setiap elemen, jarak spasi, dan transisi memiliki tujuan fungsional. Kami menolak ornamen visual palsu,
              gradien norak, atau kartu seragam yang mengaburkan esensi pesan bisnis Anda.
            </p>
          </div>

          <div className="tenet-card surface-card">
            <div className="tenet-number">02</div>
            <h3 className="heading-2 tenet-title">Reliable Engineering</h3>
            <p className="body-regular tenet-text">
              Kami menulis kode yang bersih, terdokumentasi, dan siap dikembangkan. Tanpa tumpukan dependensi rapuh,
              aplikasi Anda berjalan mulus di berbagai kondisi jaringan dan perangkat.
            </p>
          </div>

          <div className="tenet-card surface-card">
            <div className="tenet-number">03</div>
            <h3 className="heading-2 tenet-title">Transparent Scope</h3>
            <p className="body-regular tenet-text">
              Komunikasi langsung dengan desainer dan teknisi pembuat produk, tanpa lapisan birokrasi sales. Estimasi
              waktu dan biaya dihitung jujur berdasarkan spesifikasi deliverables riil.
            </p>
          </div>
        </div>

        {/* Editorial Comparison Table */}
        <div className="comparison-wrap surface-raised why-reveal">
          <div className="comparison-header">
            <div>
              <span className="eyebrow">PERBANDINGAN PENDEKATAN</span>
              <h3 className="heading-2 comparison-title">Perbedaan Nyata di Ranah Eksekusi</h3>
            </div>
            <p className="body-small comparison-sub">
              Bagaimana standar rekayasa LichtCraft melindungi investasi produk digital Anda jangka panjang.
            </p>
          </div>

          <div className="comparison-table-wrapper">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th scope="col" className="col-aspect">Dimensi</th>
                  <th scope="col" className="col-conv">Pendekatan Agensi Konvensional</th>
                  <th scope="col" className="col-licht">Standar Studio LichtCraft</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row, idx) => (
                  <tr key={idx}>
                    <td className="row-aspect">{row.aspect}</td>
                    <td className="row-conv">
                      <span className="icon-cross" aria-hidden="true">✕</span>
                      <span>{row.conventional}</span>
                    </td>
                    <td className="row-licht">
                      <span className="icon-check" aria-hidden="true">✓</span>
                      <strong>{row.lichtcraft}</strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style>{`
        .why-section {
          background-color: var(--color-ink);
          border-top: 1px solid var(--color-border);
        }

        .why-header {
          max-width: 820px;
          margin-bottom: 3.5rem;
        }

        .why-title {
          margin-top: 1rem;
          margin-bottom: 1.25rem;
        }

        .why-intro {
          color: var(--color-gray-400);
        }

        .tenets-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.75rem;
          margin-bottom: 4.5rem;
        }

        @media (max-width: 900px) {
          .tenets-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }

        .tenet-card {
          padding: 2.5rem 2rem;
          display: flex;
          flex-direction: column;
        }

        @media (max-width: 640px) {
          .tenet-card {
            padding: 1.35rem 1.15rem;
            border-radius: var(--radius-sm);
          }
          .tenet-number {
            margin-bottom: 0.875rem;
          }
          .tenet-title {
            font-size: 1.25rem;
          }
        }

        .tenet-number {
          font-family: var(--font-mono);
          font-size: 0.8125rem;
          color: var(--color-gray-500);
          margin-bottom: 1.75rem;
        }

        .tenet-title {
          font-size: 1.5rem;
          margin-bottom: 0.875rem;
          color: var(--color-white);
        }

        .tenet-text {
          color: var(--color-gray-300);
          line-height: 1.6;
        }

        /* Comparison Matrix */
        .comparison-wrap {
          padding: 2.75rem;
        }

        @media (max-width: 768px) {
          .comparison-wrap {
            padding: 1.5rem;
          }
        }

        .comparison-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          padding-bottom: 2rem;
          border-bottom: 1px solid var(--color-border);
          margin-bottom: 1.75rem;
          gap: 2rem;
        }

        @media (max-width: 768px) {
          .comparison-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
          }
        }

        .comparison-title {
          font-size: 1.5rem;
          margin-top: 0.5rem;
        }

        .comparison-sub {
          max-width: 360px;
          color: var(--color-gray-400);
        }

        .comparison-table-wrapper {
          overflow-x: auto;
        }

        .comparison-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .comparison-table th {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--color-gray-500);
          padding: 1rem 1.25rem;
          border-bottom: 1px solid var(--color-border);
        }

        .col-aspect {
          width: 22%;
        }

        .col-conv {
          width: 38%;
        }

        .col-licht {
          width: 40%;
        }

        .comparison-table td {
          padding: 1.25rem 1.25rem;
          border-bottom: 1px solid var(--color-border-subtle);
          font-size: 0.9375rem;
          vertical-align: middle;
        }

        .row-aspect {
          font-family: var(--font-display);
          font-weight: 600;
          color: var(--color-white);
        }

        .row-conv {
          color: var(--color-gray-500);
          display: flex;
          align-items: flex-start;
          gap: 0.625rem;
        }

        .icon-cross {
          color: var(--color-gray-500);
          font-weight: bold;
          flex-shrink: 0;
        }

        .row-licht {
          color: var(--color-white);
          display: flex;
          align-items: flex-start;
          gap: 0.625rem;
        }

        .icon-check {
          color: var(--color-white);
          font-weight: bold;
          flex-shrink: 0;
        }

        @media (max-width: 640px) {
          .comparison-table {
            min-width: 620px;
          }
        }
      `}</style>
    </section>
  );
}
