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
        {/* Desktop & Tablet Top */}
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
                alt="Natch Studio"
                className="footer-logo-img"
                width="34"
                height="34"
              />
              <span>Natch Studio</span>
            </a>
            <p className="footer-tagline">
              Digital experiences, crafted with intent. <br />
              Studio pengembangan produk digital independen: website performa tinggi, aplikasi web kompleks, dan mobile.
            </p>
            <div className="footer-loc">
              <span className="loc-label">Kontak Resmi:</span>
              <div className="footer-contacts-wrap">
                <a href="mailto:natchstudio@gmail.com" className="contact-highlight-link">
                  natchstudio@gmail.com
                </a>
                <span className="contact-separator">•</span>
                <a
                  href="https://wa.me/62895321217645"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-highlight-link"
                >
                  WA: 0895-3212-17645
                </a>
                <span className="contact-separator">•</span>
                <a
                  href="https://instagram.com/natchstudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-highlight-link"
                >
                  @natchstudio
                </a>
              </div>
            </div>
          </div>

          <div className="footer-links-grid">
            <div className="footer-col">
              <span className="col-heading">Company & Layanan</span>
              <ul className="footer-links">
                <li>
                  <a href="#about" onClick={(e) => { e.preventDefault(); handleLink('#about'); }}>
                    Tentang Studio
                  </a>
                </li>
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
                  <a href="#team" onClick={(e) => { e.preventDefault(); handleLink('#team'); }}>
                    Tim Inti
                  </a>
                </li>
                <li>
                  <a href="#faq" onClick={(e) => { e.preventDefault(); handleLink('#faq'); }}>
                    FAQ Kerjasama
                  </a>
                </li>
                <li>
                  <a href="#testimonials" onClick={(e) => { e.preventDefault(); handleLink('testimonials'); }}>
                    Testimoni Klien
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer-col footer-col-desktop-only">
              <span className="col-heading">Disiplin</span>
              <ul className="footer-links">
                <li><span>Website Development</span></li>
                <li><span>Web Application</span></li>
                <li><span>Mobile Application</span></li>
                <li><span>GSAP Motion Systems</span></li>
              </ul>
            </div>

            <div className="footer-col">
              <span className="col-heading">Akses</span>
              <ul className="footer-links">
                <li>
                  <a
                    href="https://wa.me/62895321217645"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="wa-link"
                  >
                    Direct WhatsApp ↗
                  </a>
                </li>
                <li>
                  <a
                    href="#admin"
                    onClick={(e) => { e.preventDefault(); handleLink('admin'); }}
                    style={{ color: 'var(--color-gray-400)' }}
                  >
                    Admin Portofolio 🔒
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <div className="footer-legal">
            <span>© {CURRENT_YEAR} Natch Studio.</span>
            <span className="legal-dot">•</span>
            <span>natchstudio@gmail.com</span>
          </div>

          <button
            type="button"
            className="back-to-top-btn"
            onClick={scrollToTop}
            aria-label="Kembali ke atas"
          >
            <span>Ke Atas</span>
            <ArrowUp size={12} aria-hidden="true" />
          </button>
        </div>
      </div>

      <style>{`
        .site-footer {
          background-color: var(--color-black);
          border-top: 1px solid var(--color-border);
          padding-top: clamp(3.5rem, 6vw, 6rem);
          padding-bottom: 2.5rem;
          position: relative;
        }

        @media (max-width: 640px) {
          .site-footer {
            padding-top: 1.5rem;
            padding-bottom: 1.25rem;
          }
        }

        .footer-top {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: clamp(2rem, 5vw, 5rem);
          padding-bottom: clamp(2rem, 4vw, 3.5rem);
          border-bottom: 1px solid var(--color-border-subtle);
        }

        @media (max-width: 768px) {
          .footer-top {
            display: flex;
            flex-direction: column;
            gap: 1.25rem;
            padding-bottom: 1.25rem;
          }
        }

        .footer-logo-img {
          width: 30px;
          height: 30px;
          object-fit: contain;
          filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.2));
        }

        @media (max-width: 640px) {
          .footer-logo-img {
            width: 24px;
            height: 24px;
          }
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

        .contact-separator {
          color: var(--color-gray-700);
        }

        @media (max-width: 640px) {
          .contact-separator {
            display: none;
          }
        }

        .footer-wordmark {
          display: inline-flex;
          align-items: center;
          gap: 0.625rem;
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 700;
          letter-spacing: -0.03em;
          color: var(--color-white);
          margin-bottom: 1rem;
        }

        @media (max-width: 640px) {
          .footer-wordmark {
            font-size: 1.05rem;
            margin-bottom: 0.5rem;
          }
        }

        .footer-tagline {
          font-size: 0.875rem;
          color: var(--color-gray-400);
          line-height: 1.5;
          max-width: 440px;
          margin-bottom: 1.25rem;
        }

        @media (max-width: 640px) {
          .footer-tagline {
            display: none; /* Hide long paragraph on mobile to keep footer short */
          }
        }

        .footer-loc {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--color-gray-400);
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        @media (max-width: 640px) {
          .footer-loc {
            font-size: 0.6875rem;
          }
        }

        .loc-label {
          color: var(--color-gray-500);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-size: 0.6875rem;
        }

        @media (max-width: 640px) {
          .loc-label {
            display: none;
          }
        }

        .footer-contacts-wrap {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.625rem;
        }

        @media (max-width: 640px) {
          .footer-contacts-wrap {
            gap: 0.4rem 0.75rem;
          }
        }

        .footer-links-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 1.5rem;
        }

        @media (max-width: 768px) {
          .footer-links-grid {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            flex-wrap: wrap;
          }
        }

        .footer-col-desktop-only {
          display: block;
        }

        @media (max-width: 640px) {
          .footer-col-desktop-only {
            display: none; /* Hide discipline column on mobile */
          }
        }

        .col-heading {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--color-gray-500);
          margin-bottom: 0.875rem;
        }

        @media (max-width: 640px) {
          .col-heading {
            display: none;
          }
        }

        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.625rem;
          font-size: 0.8125rem;
          color: var(--color-gray-400);
        }

        @media (max-width: 640px) {
          .footer-links {
            flex-direction: row;
            flex-wrap: wrap;
            gap: 0.35rem 0.75rem;
            font-size: 0.71875rem;
          }
        }

        .footer-links a {
          color: var(--color-gray-400);
          transition: color var(--duration-fast) var(--ease-out);
        }

        .footer-links a:hover {
          color: var(--color-white);
        }

        .footer-bottom {
          padding-top: 1.25rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.75rem;
          color: var(--color-gray-500);
          gap: 1rem;
        }

        @media (max-width: 640px) {
          .footer-bottom {
            padding-top: 0.875rem;
            font-size: 0.6875rem;
          }
        }

        .footer-legal {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .legal-dot {
          opacity: 0.4;
        }

        .back-to-top-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: transparent;
          border: 1px solid var(--color-border);
          color: var(--color-gray-400);
          padding: 0.35rem 0.65rem;
          border-radius: var(--radius-xs);
          font-size: 0.6875rem;
          font-family: var(--font-mono);
          cursor: pointer;
          transition: all var(--duration-fast) var(--ease-out);
        }

        .back-to-top-btn:hover {
          color: var(--color-white);
          border-color: var(--color-border-strong);
        }
      `}</style>
    </footer>
  );
}
