import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navigation({ onNavigate, currentPage = 'home' }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleLinkClick = (href) => {
    setMobileMenuOpen(false);
    if (href === '#testimonials') {
      onNavigate('testimonials');
    } else if (href === '#admin') {
      onNavigate('admin');
    } else {
      if (currentPage !== 'home') {
        onNavigate('home');
        setTimeout(() => {
          const el = document.querySelector(href);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navLinks = [
    { label: 'Layanan', href: '#services' },
    { label: 'Portofolio', href: '#work' },
    { label: 'Testimoni', href: '#testimonials' },
    { label: 'Prinsip', href: '#why' },
    { label: 'Proses', href: '#process' },
    { label: 'Estimasi Biaya', href: '#estimator' },
  ];

  return (
    <header
      className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}
      role="banner"
    >
      <div className="container nav-inner">
        {/* Wordmark with Official Logo Emblem */}
        <a
          href="#"
          className="wordmark"
          aria-label="LichtCraft Home"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <img
            src="/logo-transparent.png"
            alt="LichtCraft Logo"
            className="wordmark-emblem-img"
            width="32"
            height="32"
          />
          <span className="wordmark-text">LichtCraft</span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" aria-label="Navigasi Utama">
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`nav-link ${
                    (link.href === '#testimonials' && currentPage === 'testimonials') ? 'is-active' : ''
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Header Right Actions */}
        <div className="header-actions">
          <a
            href="https://wa.me/62895321217645"
            target="_blank"
            rel="noopener noreferrer"
            className="status-indicator"
            title="Chat tim teknis via WhatsApp"
          >
            <span className="status-dot" aria-hidden="true" />
            <span className="status-text">WA: 0895-3212-17645</span>
          </a>

          <a
            href="#estimator"
            className="btn btn-primary btn-sm header-cta"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#estimator');
            }}
          >
            <span>Konsultasi Proyek</span>
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Tutup navigasi' : 'Buka navigasi'}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-drawer" role="dialog" aria-modal="true" aria-label="Navigasi Mobile">
          <nav className="mobile-nav">
            <ul className="mobile-nav-list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="mobile-nav-link"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#admin"
                  className="mobile-nav-link"
                  style={{ color: 'var(--color-gray-500)', fontSize: '1.125rem' }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick('#admin');
                  }}
                >
                  Admin CRUD Portofolio
                </a>
              </li>
            </ul>

            <div className="mobile-drawer-footer">
              <a
                href="https://wa.me/62895321217645"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg"
                style={{ width: '100%', marginBottom: '0.75rem' }}
              >
                <span>WhatsApp: 0895-3212-17645</span>
                <ArrowUpRight size={16} />
              </a>
              <a
                href="mailto:lichttcraft@gmail.com"
                className="btn btn-secondary btn-sm"
                style={{ width: '100%' }}
              >
                <span>Email: lichttcraft@gmail.com</span>
              </a>
            </div>
          </nav>
        </div>
      )}

      <style>{`
        .site-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding-block: 1.25rem;
          transition: background-color var(--duration-base) var(--ease-out),
                      border-color var(--duration-base) var(--ease-out),
                      padding-block var(--duration-base) var(--ease-out),
                      backdrop-filter var(--duration-base) var(--ease-out);
          border-bottom: 1px solid transparent;
        }

        @media (max-width: 640px) {
          .site-header {
            padding-block: 0.75rem;
          }
        }

        .site-header.is-scrolled {
          background-color: rgba(8, 8, 8, 0.88);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom-color: var(--color-border);
          padding-block: 0.875rem;
        }

        @media (max-width: 640px) {
          .site-header.is-scrolled {
            padding-block: 0.625rem;
          }
        }

        .nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .wordmark {
          display: inline-flex;
          align-items: center;
          gap: 0.625rem;
          font-family: var(--font-display);
          font-size: 1.1875rem;
          font-weight: 700;
          letter-spacing: -0.03em;
          color: var(--color-white);
          cursor: pointer;
        }

        @media (max-width: 640px) {
          .wordmark {
            font-size: 1.05rem;
            gap: 0.5rem;
          }
        }

        .wordmark-emblem-img {
          width: 28px;
          height: 28px;
          object-fit: contain;
          filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.2));
        }

        @media (max-width: 640px) {
          .wordmark-emblem-img {
            width: 24px;
            height: 24px;
          }
        }

        .desktop-nav {
          display: none;
        }

        @media (min-width: 860px) {
          .desktop-nav {
            display: block;
          }
        }

        .nav-list {
          display: flex;
          align-items: center;
          gap: 2rem;
          list-style: none;
        }

        .nav-link {
          font-size: 0.875rem;
          font-weight: 400;
          color: var(--color-gray-400);
          transition: color var(--duration-fast) var(--ease-out);
          position: relative;
        }

        .nav-link:hover, .nav-link:focus-visible {
          color: var(--color-white);
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .status-indicator {
          display: none;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--color-gray-400);
          padding: 0.25rem 0.625rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--color-border-subtle);
          border-radius: var(--radius-xs);
        }

        @media (min-width: 1080px) {
          .status-indicator {
            display: inline-flex;
          }
        }

        .status-dot {
          width: 6px;
          height: 6px;
          background-color: var(--color-white);
          border-radius: 50%;
          opacity: 0.85;
        }

        .header-cta {
          display: none;
        }

        @media (min-width: 640px) {
          .header-cta {
            display: inline-flex;
          }
        }

        .mobile-toggle {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--color-border);
          color: var(--color-white);
          width: 40px;
          height: 40px;
          border-radius: var(--radius-xs);
          cursor: pointer;
        }

        @media (min-width: 860px) {
          .mobile-toggle {
            display: none;
          }
        }

        .mobile-drawer {
          position: fixed;
          top: 68px;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: var(--color-ink);
          border-top: 1px solid var(--color-border);
          padding: 2rem 1.5rem;
          z-index: 999;
          display: flex;
          flex-direction: column;
        }

        .mobile-nav-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .mobile-nav-link {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 500;
          color: var(--color-gray-300);
          display: block;
        }

        .mobile-nav-link:hover, .mobile-nav-link:focus {
          color: var(--color-white);
        }

        .mobile-drawer-footer {
          margin-top: auto;
          padding-top: 2rem;
          border-top: 1px solid var(--color-border-subtle);
        }
      `}</style>
    </header>
  );
}
