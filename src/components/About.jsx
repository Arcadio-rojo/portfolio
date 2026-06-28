import { useState, useEffect, useRef } from "react";
import { profile, skills } from "../data/portfolio";
import useReveal from "../hooks/useReveal";
import avatar from "../assets/2x2.jpg";

const GROUP_SYMBOLS = {
  Frontend:  { d: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5", type: "path" },
  Backend:   { d: "M5 12h14M12 5l7 7-7 7", type: "path" },
  Database:  { d: "M12 3C7 3 3 5 3 7v10c0 2 4 4 9 4s9-2 9-4V7c0-2-4-4-9-4z M3 7c0 2 4 4 9 4s9-2 9-4 M3 12c0 2 4 4 9 4s9-2 9-4", type: "path" },
  Tools:     { d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z", type: "path" },
  DevOps:    { d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z", type: "path" },
  Design:    { d: "M12 19l7-7 3 3-7 7-3-3z M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z M2 2l7.586 7.586 M11 11a2 2 0 1 0 4 0 2 2 0 0 0-4 0", type: "path" },
  Languages: { d: "M16 18l6-6-6-6 M8 6l-6 6 6 6", type: "path" },
  AI:        { d: "M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73A2 2 0 0 1 10 4a2 2 0 0 1 2-2z", type: "path" },
  Mobile:    { d: "M12 18h.01 M8 21h8a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2z", type: "path" },
  Cloud:     { d: "M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z", type: "path" },
};

function HexBadge({ group }) {
  const symbol = GROUP_SYMBOLS[group];

  return (
    <span className="relative inline-flex items-center justify-center w-6 h-6 flex-shrink-0">
      <svg viewBox="0 0 28 28" width="24" height="24" aria-hidden="true">
        <polygon
          points="14,1 26,7.5 26,20.5 14,27 2,20.5 2,7.5"
          fill="var(--color-violet)"
          fillOpacity="0.15"
          stroke="var(--color-violet)"
          strokeWidth="1.2"
        />
        {symbol && (
          <g transform="translate(4, 4) scale(0.83)">
            <path
              d={symbol.d}
              fill="none"
              stroke="var(--color-violet)"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        )}
      </svg>
    </span>
  );
}

export default function About() {
  const [ref, visible] = useReveal();
  const [badgesVisible, setBadgesVisible] = useState(false);
  const badgesRef = useRef(null);

  useEffect(() => {
    const el = badgesRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBadgesVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      className={`max-w-6xl mx-auto px-6 py-24 reveal ${visible ? "is-visible" : ""}`}
    >
      <h2
        className="font-bold text-2xl sm:text-3xl mb-10 flex items-center gap-3"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(16px)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}
      >
        <span className="text-[var(--color-violet)] font-mono">{"</>"}</span>
        About
      </h2>

      <div className="grid md:grid-cols-2 gap-10">
        {/* ── LEFT COLUMN ── */}
        <div className="space-y-6">
          <div
            className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 text-[var(--color-text-dim)] leading-relaxed"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(24px)",
              transition: "opacity 0.55s ease 0.1s, transform 0.55s ease 0.1s",
            }}
          >
            {profile.bio}
          </div>

          <div
            className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-5 flex items-center gap-4"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(24px)",
              transition: "opacity 0.55s ease 0.2s, transform 0.55s ease 0.2s",
            }}
          >
            <div className="relative flex-shrink-0">
              <span
                className="absolute inset-0 rounded-full border-2 border-[var(--color-violet)]"
                style={{ animation: "avatarPulse 2.4s ease-in-out infinite" }}
              />
              <img
                src={avatar}
                alt="Arcadio Jr."
                className="w-14 h-14 rounded-full object-cover border-2 border-[var(--color-violet)]/40 relative z-10"
              />
            </div>
            <div>
              <p className="font-semibold flex items-center gap-2">
                Open to Opportunities
                <span
                  className="w-2 h-2 rounded-full bg-[var(--color-mint)] inline-block"
                  style={{ animation: "dotBlink 1.5s steps(1) infinite" }}
                />
              </p>
              <p className="text-sm text-[var(--color-text-dim)]">{profile.status}</p>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN — skills ── */}
        <div className="space-y-6" ref={badgesRef}>
          {skills.map((s, groupIdx) => (
            <div
              key={s.group}
              style={{
                opacity: badgesVisible ? 1 : 0,
                transform: badgesVisible ? "none" : "translateY(20px)",
                transition: `opacity 0.5s ease ${groupIdx * 0.12}s, transform 0.5s ease ${groupIdx * 0.12}s`,
              }}
            >
              <h3 className="font-semibold mb-3 flex items-center gap-2 text-[var(--color-violet)]">
                <HexBadge group={s.group} />
                {s.group}
              </h3>
              <div className="flex flex-wrap gap-2">
                {s.items.map((item, itemIdx) => (
                  <span
                    key={item.name}
                    className="px-3 py-1.5 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-sm text-[var(--color-text-dim)] flex items-center gap-2 hover:border-[var(--color-violet)] hover:text-[var(--color-violet)] transition-all duration-200 cursor-default"
                    style={{
                      opacity: badgesVisible ? 1 : 0,
                      transform: badgesVisible ? "none" : "scale(0.88)",
                      transition: `opacity 0.35s ease ${groupIdx * 0.1 + itemIdx * 0.04}s, transform 0.35s ease ${groupIdx * 0.1 + itemIdx * 0.04}s`,
                    }}
                  >
                    {item.icon && <i className={`${item.icon} colored text-base`} />}
                    {item.img && <img src={item.img} className="w-4 h-4" alt={item.name} />}
                    {!item.icon && !item.img && item.emoji && (
                      <span className="text-base">{item.emoji}</span>
                    )}
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes avatarPulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.18); opacity: 0; }
        }
        @keyframes dotBlink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}