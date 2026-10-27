import { useRef } from 'react';
import { Code, Palette } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Team() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      gsap.from('.team-anim', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 18,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out',
      });
    },
    { scope: containerRef }
  );

  const teamMembers = [
    {
      name: 'Adly',
      role: 'Lead Software Engineer',
      focus: 'Frontend Architecture, React 19, Fullstack Systems',
      tag: 'ENGINEERING',
      icon: <Code size={13} className="text-white" />,
    },
    {
      name: 'Arga',
      role: 'Interface Designer',
      focus: 'Typography, Editorial UI, Motion & Interaction',
      tag: 'DESIGN CRAFT',
      icon: <Palette size={13} className="text-white" />,
    },
  ];

  return (
    <section ref={containerRef} id="team" className="section team-section" aria-label="Tim Natch Studio">
      <div className="container">
        <div className="team-header team-anim">
          <span className="eyebrow">
            <span className="eyebrow-dot" />
            PRAKTISI INTI // TIM STUDIO
          </span>
          <h2 className="heading-1 team-title">
            Dipimpin langsung oleh praktisi.
          </h2>
          <p className="body-large team-lead">
            Anda berdiskusi dan berkolaborasi langsung dengan desainer dan teknisi pembuat produk, tanpa perantara account manager.
          </p>
        </div>

        {/* Team Grid: 2 columns side by side on mobile */}
        <div className="team-grid team-anim">
          {teamMembers.map((member) => (
            <div key={member.name} className="team-card surface-card">
              <div className="team-card-top">
                <div className="team-avatar-box">
                  <span className="avatar-letter">{member.name.charAt(0)}</span>
                </div>
                <span className="team-role-tag">
                  {member.icon}
                  <span>{member.tag}</span>
                </span>
              </div>

              <strong className="team-member-name">{member.name}</strong>
              <span className="team-member-role">{member.role}</span>
              <p className="team-member-focus">{member.focus}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .team-section {
          background-color: var(--color-ink);
          border-top: 1px solid var(--color-border);
        }

        .team-header {
          max-width: 760px;
          margin-bottom: 2.25rem;
        }

        @media (max-width: 640px) {
          .team-header {
            margin-bottom: 1.5rem;
          }
        }

        .team-title {
          margin-top: 0.75rem;
          margin-bottom: 0.75rem;
        }

        .team-lead {
          color: var(--color-gray-400);
          font-size: clamp(0.875rem, 1.05vw, 1.125rem);
          line-height: 1.5;
        }

        @media (max-width: 640px) {
          .team-lead {
            font-size: 0.8125rem;
          }
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem;
        }

        @media (max-width: 768px) {
          .team-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.5rem;
          }
        }

        .team-card {
          padding: 1.75rem 1.5rem;
          display: flex;
          flex-direction: column;
        }

        @media (max-width: 768px) {
          .team-card {
            padding: 0.875rem 0.625rem;
            border-radius: var(--radius-xs);
          }
        }

        .team-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        @media (max-width: 768px) {
          .team-card-top {
            margin-bottom: 0.5rem;
          }
        }

        .team-avatar-box {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid var(--color-border);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media (max-width: 768px) {
          .team-avatar-box {
            width: 26px;
            height: 26px;
          }
        }

        .avatar-letter {
          font-family: var(--font-display);
          font-size: 0.9375rem;
          font-weight: 700;
          color: var(--color-white);
        }

        @media (max-width: 768px) {
          .avatar-letter {
            font-size: 0.6875rem;
          }
        }

        .team-role-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          color: var(--color-gray-400);
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--color-border-subtle);
          padding: 0.25rem 0.5rem;
          border-radius: var(--radius-xs);
        }

        @media (max-width: 768px) {
          .team-role-tag {
            font-size: 0.5625rem;
            padding: 2px 4px;
          }
          .team-role-tag svg {
            width: 10px;
            height: 10px;
          }
        }

        .team-member-name {
          font-family: var(--font-display);
          font-size: 1.25rem;
          color: var(--color-white);
          margin-bottom: 0.2rem;
        }

        @media (max-width: 768px) {
          .team-member-name {
            font-size: 0.8125rem;
            margin-bottom: 0.1rem;
          }
        }

        .team-member-role {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--color-gray-500);
          margin-bottom: 0.625rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        @media (max-width: 768px) {
          .team-member-role {
            font-size: 0.5625rem;
            margin-bottom: 0.35rem;
          }
        }

        .team-member-focus {
          font-size: 0.8125rem;
          color: var(--color-gray-400);
          line-height: 1.45;
        }

        @media (max-width: 768px) {
          .team-member-focus {
            font-size: 0.625rem;
            line-height: 1.3;
          }
        }
      `}</style>
    </section>
  );
}
