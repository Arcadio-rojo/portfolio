import { useState } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight, Award, BookOpen, Briefcase, Eye } from "lucide-react";
import { experience, certifications } from "../data/portfolio";
import useReveal from "../hooks/useReveal";

// Reusing your exact portfolio Media Viewer layout for the Certificates
function MediaViewer({ media, index, setIndex }) {
  if (!media || media.length === 0) return null;
  const current = media[index];

  return (
    <div className="flex flex-col gap-3">
      <div className="relative bg-black rounded-xl overflow-hidden aspect-[4/3] flex items-center justify-center border border-[var(--color-border)]">
        <img
          src={current.src}
          alt="Certificate credential"
          className="w-full h-full object-contain"
        />

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
      </div>
    </div>
  );
}

export default function Experience() {
  const [activeTab, setActiveTab] = useState("All");
  const [activeCert, setActiveCert] = useState(null);
  const [mediaIndex, setMediaIndex] = useState(0);
  const [ref, visible] = useReveal();

  const categories = ["All", "Harvard", "Coursera", "Technical"];

  const filteredCertifications = activeTab === "All"
    ? certifications
    : certifications.filter(c => c.category === activeTab);

  const openCert = (c) => {
    setActiveCert(c);
    setMediaIndex(0);
    document.body.style.overflow = "hidden";
  };

  const closeCert = () => {
    setActiveCert(null);
    document.body.style.overflow = "";
  };

  return (
    <section
      id="experience"
      ref={ref}
      className={`max-w-6xl mx-auto px-6 py-24 reveal ${visible ? "is-visible" : ""}`}
    >
      {/* Work Experience */}
      <h2 className="font-bold text-2xl sm:text-3xl mb-10 flex items-center gap-2">
        <Briefcase size={24} className="text-[var(--color-violet)]" /> 
        <span>Experience</span>
      </h2>

      <div className="space-y-5 mb-16">
        {experience.map((e, i) => (
          <div
            key={i}
            className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 hover:border-[var(--color-violet)]/30 transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
              <h3 className="font-semibold text-lg">{e.role}</h3>
              <span className="text-xs text-[var(--color-text-dim)] font-mono bg-[var(--color-surface-2)] px-2.5 py-1 rounded-md">
                {e.period}
              </span>
            </div>
            <p className="text-sm font-medium text-[var(--color-violet)] mb-3">{e.company}</p>
            <p className="text-sm text-[var(--color-text-dim)] leading-relaxed">{e.summary}</p>
          </div>
        ))}
      </div>

      {/* Education */}
      <h2 className="font-bold text-2xl sm:text-3xl mb-10 flex items-center gap-2">
        <BookOpen size={24} className="text-[var(--color-violet)]" /> 
        <span>Education</span>
      </h2>
      
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 mb-16 hover:border-[var(--color-violet)]/30 transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
          <h3 className="font-semibold text-lg">Bachelor of Science in Computer Science</h3>
          <span className="text-xs text-[var(--color-text-dim)] font-mono bg-[var(--color-surface-2)] px-2.5 py-1 rounded-md">
            2022 — Present
          </span>
        </div>
        <p className="text-sm font-medium text-[var(--color-violet)]">
          Our Lady of Fatima University, Quezon City Campus
        </p>
      </div>

      {/* Certifications Header / Partition Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-[var(--color-border)]">
        <h2 className="font-bold text-2xl sm:text-3xl flex items-center gap-2">
          <Award size={24} className="text-[var(--color-violet)]" /> 
          <span>Certifications & Credentials</span>
        </h2>

        {/* Partition Filter Track */}
        <div className="flex flex-wrap gap-1.5 bg-[var(--color-surface-2)] p-1 rounded-xl border border-[var(--color-border)]">
          {categories.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-xs font-medium px-4 py-2 rounded-lg transition-all duration-200 ${
                activeTab === tab
                  ? "bg-[var(--color-surface)] text-[var(--color-violet)] shadow-md font-semibold"
                  : "text-[var(--color-text-dim)] hover:text-[var(--color-text)]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Grid Layout */}
      <div className="grid sm:grid-cols-2 gap-4">
        {filteredCertifications.map((c, i) => (
          <button
            key={i}
            onClick={() => openCert(c)}
            className="text-left bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-5 flex flex-col justify-between gap-4 hover:border-[var(--color-violet)]/50 transition-all duration-300 transform hover:-translate-y-1 group relative overflow-hidden"
          >
            <div className="space-y-1 w-full">
              <span className="inline-block text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded bg-[var(--color-surface-2)] text-[var(--color-text-dim)] border border-[var(--color-border)] mb-2">
                {c.category}
              </span>
              <h4 className="font-semibold text-sm text-[var(--color-text)] group-hover:text-[var(--color-violet)] transition-colors">
                {c.title}
              </h4>
              <p className="text-xs text-[var(--color-text-dim)] pt-0.5">{c.org}</p>
            </div>

            <div className="flex items-center justify-between pt-2 w-full border-t border-[var(--color-border)]/50">
              <span className="text-xs font-mono text-[var(--color-text-dim)]">{c.year}</span>
              <span className="text-xs font-medium text-[var(--color-violet)] opacity-60 group-hover:opacity-100 transition-all flex items-center gap-1">
                <Eye size={14} /> View Document
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Verification Gallery Modal Portal Container */}
      {activeCert && createPortal(
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm transition-opacity"
          onClick={closeCert}
        >
          <div
            className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between p-5 border-b border-[var(--color-border)]">
              <div>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-[var(--color-surface-2)] border border-[var(--color-border)] text-[var(--color-text-dim)] uppercase">
                  {activeCert.category} Verification
                </span>
                <h3 className="font-bold text-lg mt-1.5">{activeCert.title}</h3>
              </div>
              <button
                onClick={closeCert}
                className="text-[var(--color-text-dim)] hover:text-[var(--color-text)] transition p-1 rounded-lg hover:bg-[var(--color-surface-2)]"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body Architecture (Two Column Config) */}
            <div className="grid md:grid-cols-[1fr_320px]">
              {/* Left Column: Media Presentation Wrapper */}
              <div className="p-5 border-b md:border-b-0 md:border-r border-[var(--color-border)] flex items-center justify-center bg-black/20">
                {activeCert.media?.length > 0 ? (
                  <div className="w-full">
                    <MediaViewer
                      media={activeCert.media}
                      index={mediaIndex}
                      setIndex={setMediaIndex}
                    />
                  </div>
                ) : (
                  <div className="aspect-video w-full bg-[var(--color-surface-2)] rounded-xl flex items-center justify-center text-[var(--color-text-dim)] text-sm">
                    No attachment image linked
                  </div>
                )}
              </div>

              {/* Right Column: Information Meta Field */}
              <div className="p-5 space-y-5 flex flex-col justify-between">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-[var(--color-text-dim)] uppercase tracking-wider mb-1.5">
                      Issuing Institution
                    </p>
                    <p className="text-sm font-medium text-[var(--color-text)] bg-[var(--color-surface-2)] p-3 rounded-xl border border-[var(--color-border)]">
                      {activeCert.org}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-[var(--color-text-dim)] uppercase tracking-wider mb-1.5">
                      Date Earned
                    </p>
                    <p className="text-sm font-mono text-[var(--color-text-dim)]">
                      {activeCert.year}
                    </p>
                  </div>
                </div>

                <button
                  onClick={closeCert}
                  className="w-full text-center text-xs font-semibold py-3 rounded-xl bg-[var(--color-surface-2)] border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-violet)] hover:text-white hover:border-[var(--color-violet)] transition-all duration-200"
                >
                  Return to Portfolio
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}