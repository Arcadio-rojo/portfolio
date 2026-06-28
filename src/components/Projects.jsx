import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight, Play, ExternalLink } from "lucide-react";
import { projects } from "../data/portfolio";
import useReveal from "../hooks/useReveal";

function GitHubIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .322.216.694.825.576C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}
function ProjectsMark({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
      <path d="M7 8l3 3-3 3" />
      <path d="M13 14h4" />
    </svg>
  );
}

function MediaViewer({ media, index, setIndex }) {
  if (!media || media.length === 0) return null;
  const current = media[index];
  return (
    <div className="flex flex-col gap-3">
      <div className="relative bg-black rounded-xl overflow-hidden aspect-video flex items-center justify-center">
        {current.type === "image" ? (
          <img src={current.src} alt="Project media" className="w-full h-full object-contain" />
        ) : (
          <video key={current.src} src={current.src} controls className="w-full h-full object-contain" />
        )}
        {media.length > 1 && (
          <>
            <button
              onClick={() => setIndex((i) => (i - 1 + media.length) % media.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => setIndex((i) => (i + 1) % media.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
        {media.length > 1 && (
          <span className="absolute bottom-2 right-3 text-xs text-white/70 bg-black/50 px-2 py-0.5 rounded-full">
            {index + 1} / {media.length}
          </span>
        )}
      </div>
      {media.length > 1 && (
        <div className="flex gap-2">
          {media.map((m, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`relative w-16 h-12 rounded-lg overflow-hidden border-2 transition flex-shrink-0 ${
                i === index
                  ? "border-[var(--color-violet)]"
                  : "border-[var(--color-border)] opacity-60 hover:opacity-100"
              }`}
            >
              {m.type === "image" ? (
                <img src={m.src} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-[var(--color-surface-2)] flex items-center justify-center">
                  <Play size={14} className="text-[var(--color-text-dim)]" />
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectCard({ p, index, onClick }) {
  const cardRef = useRef(null);
  const [cardVisible, setCardVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setCardVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <article
      ref={cardRef}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      className="cursor-pointer text-left bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl overflow-hidden group"
      style={{
        opacity: cardVisible ? 1 : 0,
        transform: cardVisible ? "none" : "translateY(32px)",
        transition: `opacity 0.55s ease ${index * 0.1}s, transform 0.55s ease ${index * 0.1}s, border-color 0.25s ease, box-shadow 0.25s ease`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--color-violet)";
        e.currentTarget.style.boxShadow = "0 0 0 1px var(--color-violet), 0 8px 32px rgba(124,92,252,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "";
        e.currentTarget.style.boxShadow = "";
      }}
    >
      {/* Thumbnail */}
      <div className="relative h-40 bg-[var(--color-surface-2)] overflow-hidden">
        {p.media?.[0]?.type === "image" ? (
          <img
            src={p.media[0].src}
            alt={p.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : p.media?.[0]?.type === "video" ? (
          <div className="w-full h-full flex items-center justify-center gap-2 text-[var(--color-text-dim)]">
            <span className="w-10 h-10 rounded-full border border-[var(--color-violet)]/40 flex items-center justify-center">
              <Play size={16} className="text-[var(--color-violet)] ml-0.5" />
            </span>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ProjectsMark size={32} className="text-[var(--color-text-dim)] opacity-30" />
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-[var(--color-violet)]/0 group-hover:bg-[var(--color-violet)]/8 transition-all duration-300 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 text-xs font-medium text-white bg-[var(--color-violet)] px-4 py-1.5 rounded-full">
            View Project
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-5">
        <h3 className="font-semibold mb-2 group-hover:text-[var(--color-violet)] transition-colors duration-200">
          {p.title}
        </h3>
        <p className="text-sm text-[var(--color-text-dim)] line-clamp-2 leading-relaxed">
          {p.summary}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-4">
          {p.tags.map((t) => (
            <span
              key={t}
              className="text-xs px-2 py-0.5 rounded-md bg-[var(--color-surface-2)] text-[var(--color-text-dim)] border border-[var(--color-border)]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const [active, setActive] = useState(null);
  const [mediaIndex, setMediaIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [ref, visible] = useReveal();

  const openProject = (p) => {
    setActive(p);
    setMediaIndex(0);
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => requestAnimationFrame(() => setModalVisible(true)));
  };

  const closeProject = () => {
    setModalVisible(false);
    setTimeout(() => {
      setActive(null);
      document.body.style.overflow = "";
    }, 260);
  };

  return (
    <section
      id="projects"
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
        <span className="text-[var(--color-violet)]">
          <ProjectsMark size={26} />
        </span>
        Featured Projects
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} p={p} index={i} onClick={() => openProject(p)} />
        ))}
      </div>

      {/* Modal */}
      {active && createPortal(
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            backgroundColor: modalVisible ? "rgba(0,0,0,0.75)" : "rgba(0,0,0,0)",
            transition: "background-color 0.26s ease",
          }}
          onClick={closeProject}
        >
          <div
            className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            style={{
              opacity: modalVisible ? 1 : 0,
              transform: modalVisible ? "scale(1) translateY(0)" : "scale(0.96) translateY(16px)",
              transition: "opacity 0.26s ease, transform 0.26s ease",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-start justify-between p-5 border-b border-[var(--color-border)]">
              <div>
                <p className="text-xs text-[var(--color-text-dim)] mb-1 font-mono">
                  {active.media?.length > 0 ? `${mediaIndex + 1} / ${active.media.length}` : "No media"}
                </p>
                <h3 className="font-bold text-lg">{active.title}</h3>
              </div>
              <div className="flex items-center gap-2 mt-1">
                {active.github && (
                  <a
                    href={active.github}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-8 h-8 rounded-lg border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-dim)] hover:text-[var(--color-violet)] hover:border-[var(--color-violet)] transition-all"
                    aria-label="GitHub"
                  >
                    <GitHubIcon size={15} />
                  </a>
                )}
                {active.live && (
                  <a
                    href={active.live}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-8 h-8 rounded-lg border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-dim)] hover:text-[var(--color-violet)] hover:border-[var(--color-violet)] transition-all"
                    aria-label="Live site"
                  >
                    <ExternalLink size={15} />
                  </a>
                )}
                <button
                  onClick={closeProject}
                  className="w-8 h-8 rounded-lg border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-dim)] hover:text-[var(--color-violet)] hover:border-[var(--color-violet)] transition-all"
                  aria-label="Close"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Modal body */}
            <div className="grid md:grid-cols-[1fr_280px]">
              <div className="p-5 border-b md:border-b-0 md:border-r border-[var(--color-border)]">
                {active.media?.length > 0 ? (
                  <MediaViewer media={active.media} index={mediaIndex} setIndex={setMediaIndex} />
                ) : (
                  <div className="aspect-video bg-[var(--color-surface-2)] rounded-xl flex items-center justify-center text-[var(--color-text-dim)] text-sm">
                    No media added yet
                  </div>
                )}
              </div>

              <div className="p-5 space-y-5">
                <div>
                  <p className="text-[10px] font-semibold text-[var(--color-text-dim)] uppercase tracking-widest mb-2">
                    About
                  </p>
                  <p className="text-sm text-[var(--color-text-dim)] leading-relaxed">
                    {active.description}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-semibold text-[var(--color-text-dim)] uppercase tracking-widest mb-2">
                    Technologies
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {active.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2 py-0.5 rounded-md border border-[var(--color-violet)]/40 text-[var(--color-violet)] bg-[var(--color-violet)]/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {active.media?.length > 1 && (
                  <div>
                    <p className="text-[10px] font-semibold text-[var(--color-text-dim)] uppercase tracking-widest mb-2">
                      Media ({active.media.length})
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {active.media.map((m, i) => (
                        <button
                          key={i}
                          onClick={() => setMediaIndex(i)}
                          className={`w-14 h-10 rounded-lg overflow-hidden border-2 transition ${
                            i === mediaIndex
                              ? "border-[var(--color-violet)]"
                              : "border-[var(--color-border)] opacity-60 hover:opacity-100"
                          }`}
                        >
                          {m.type === "image" ? (
                            <img src={m.src} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-[var(--color-surface-2)] flex items-center justify-center">
                              <Play size={12} className="text-[var(--color-text-dim)]" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}