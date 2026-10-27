import { ArrowUp } from 'lucide-react';

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer({ onNavigate }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLink = (target) => {
    if (onNavigate) {
      if (target === 'testimonials' || target === 'admin') {
        onNavigate(target);
        return;
      }
      onNavigate('home');
      setTimeout(() => {
        const el = document.querySelector(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand-col">
            <a
              href="#"
              className="footer-wordmark"
              onClick={(e) => {
                e.preventDefault();
                handleLink('home');
                scrollToTop();
              }}
            >
              <img
                src="/logo-transparent.png"
                alt="LichtCraft"
                className="footer-logo-img"
                width="34"
                height="34"
              />
              <span>LichtCraft</span>
            </a>
            <p className="footer-tagline">
              Digital experiences, crafted with intent. <br />
              Studio pengembangan produk digital independen: website performa tinggi, aplikasi web kompleks, dan mobile.
            </p>
            <div className="footer-loc">
              <span className="loc-label">Kontak Studio Terverifikasi:</span>
              <a href="mailto:lichttcraft@gmail.com" className="contact-highlight-link">
                Email: lichttcraft@gmail.com
              </a>
              <a
                href="https://wa.me/62895321217645"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-highlight-link"
              >
                WhatsApp: 0895-3212-17645
              </a>
              <a
                href="https://instagram.com/lichttcraft"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-highlight-link"
              >
                Instagram: @lichttcraft
              </a>
            </div>
          </div>

          <div className="footer-links-grid">
            <div className="footer-col">
              <span className="col-heading">Navigasi Halaman</span>
              <ul className="footer-links">
                <li>
                  <a href="#services" onClick={(e) => { e.preventDefault(); handleLink('#services'); }}>
                    Layanan
                  </a>
                </li>
                <li>
                  <a href="#work" onClick={(e) => { e.preventDefault(); handleLink('#work'); }}>
                    Portofolio
                  </a>
                </li>
                <li>
                  <a href="#testimonials" onClick={(e) => { e.preventDefault(); handleLink('testimonials'); }}>
                    Testimoni Klien
                  </a>
                </li>
                <li>
                  <a href="#why" onClick={(e) => { e.preventDefault(); handleLink('#why'); }}>
                    Prinsip Rekayasa
                  </a>
                </li>
                <li>
                  <a href="#process" onClick={(e) => { e.preventDefault(); handleLink('#process'); }}>
                    Metodologi
                  </a>
                </li>
                <li>
                  <a href="#estimator" onClick={(e) => { e.preventDefault(); handleLink('#estimator'); }}>
                    Kalkulator Scope
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer-col">
              <span className="col-heading">Disiplin Studio</span>
              <ul className="footer-links">
                <li><span>Website Development</span></li>
                <li><span>Web Application</span></li>
                <li><span>Mobile Application</span></li>
                <li><span>GSAP Motion Systems</span></li>
                <li><span>Three.js Spatial Graphics</span></li>
              </ul>
            </div>

            <div className="footer-col">
              <span className="col-heading">Akses Internal & Sosial</span>
              <ul className="footer-links">
                <li>
                  <a
                    href="https://wa.me/62895321217645"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="wa-link"
                  >
                    Direct Chat WhatsApp ↗
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/lichttcraft"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram @lichttcraft ↗
                  </a>
                </li>
                <li>
                  <a
                    href="#admin"
                    onClick={(e) => { e.preventDefault(); handleLink('admin'); }}
                    style={{ color: 'var(--color-gray-500)', fontSize: '0.8125rem' }}
                  >
                    Admin Portofolio CRUD 🔒
                  </a>
                </li>
                <li>
                  <span className="status-badge">Available for Q4 / Q1 Projects</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-legal">
            <span>© {CURRENT_YEAR} LichtCraft Studio. Seluruh hak cipta dilindungi undang-undang.</span>
            <span className="legal-dot">•</span>
            <span>lichttcraft@gmail.com • 0895321217645</span>
          </div>

          <button
            type="button"
            className="back-to-top-btn"
            onClick={scrollToTop}
            aria-label="Kembali ke bagian paling atas halaman"
          >
            <span>Kembali ke Atas</span>
            <ArrowUp size={14} aria-hidden="true" />
          </button>
        </div>
      </div>

      <style>{`
        .site-footer {
          background-color: var(--color-black);
          border-top: 1px solid var(--color-border);
          padding-top: clamp(4.5rem, 8vw, 7rem);
          padding-bottom: 3rem;
          position: relative;
        }

        .footer-top {
          display: grid;
          grid-template-columns: 1.15fr 1.35fr;
          gap: clamp(3rem, 6vw, 6rem);
          padding-bottom: clamp(3rem, 5vw, 5rem);
          border-bottom: 1px solid var(--color-border-subtle);
        }

        @media (max-width: 900px) {
          .footer-top {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
        }

        .footer-logo-img {
          width: 32px;
          height: 32px;
          object-fit: contain;
          filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.25));
        }

        .contact-highlight-link {
          color: var(--color-white) !important;
          font-weight: 500;
          transition: opacity var(--duration-fast);
        }

        .contact-highlight-link:hover {
          opacity: 0.8;
          text-decoration: underline;
        }

        .footer-wordmark {
          display: inline-flex;
          align-items: center;
          gap: 0.625rem;
          font-family: var(--font-display);
          font-size: 1.375rem;
          font-weight: 700;
          letter-spacing: -0.03em;
          color: var(--color-white);
          margin-bottom: 1.25rem;
        }

        .brand-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--color-white);
        }

        .footer-tagline {
          font-size: 0.9375rem;
          color: var(--color-gray-400);
          line-height: 1.6;
          max-width: 440px;
          margin-bottom: 2rem;
        }

        .footer-loc {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--color-gray-400);
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .loc-label {
          color: var(--color-gray-500);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .footer-links-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        @media (max-width: 640px) {
          .footer-links-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        .col-heading {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-gray-400);
          margin-bottom: 1.25rem;
        }

        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          font-size: 0.875rem;
          color: var(--color-gray-400);
        }

        .footer-links a {
          color: var(--color-gray-400);
          transition: color var(--duration-fast) var(--ease-out);
        }

        .footer-links a:hover {
          color: var(--color-white);
        }

        .status-badge {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          padding: 0.25rem 0.5rem;
          border-radius: var(--radius-xs);
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--color-border);
          color: var(--color-white);
        }

        .footer-bottom {
          padding-top: 2.25rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.8125rem;
          color: var(--color-gray-500);
          gap: 1.5rem;
        }

        @media (max-width: 768px) {
          .footer-bottom {
            flex-direction: column;
            align-items: flex-start;
          }
        }

        .footer-legal {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.5rem;
        }

        .legal-dot {
          opacity: 0.4;
        }

        .back-to-top-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: transparent;
          border: 1px solid var(--color-border);
          color: var(--color-gray-400);
          padding: 0.45rem 0.875rem;
          border-radius: var(--radius-xs);
          font-size: 0.75rem;
          font-family: var(--font-mono);
          cursor: pointer;
          transition: all var(--duration-fast) var(--ease-out);
        }

        .back-to-top-btn:hover {
          color: var(--color-white);
          border-color: var(--color-border-strong);
          background: rgba(255, 255, 255, 0.04);
        }
      `}</style>
    </footer>
  );
}
