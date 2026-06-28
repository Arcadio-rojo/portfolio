import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { profile } from "../data/portfolio";

const links = ["About", "Projects", "Experience", "Contact"];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = ["home", ...links.map((l) => l.toLowerCase())];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    setOpen(false);
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-[var(--color-bg)]/85 border-b border-[var(--color-border)] shadow-[0_1px_0_0_var(--color-violet)]/10"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav
        className={`max-w-6xl mx-auto px-6 flex items-center justify-between transition-all duration-300 ${
          scrolled ? "h-14" : "h-16"
        }`}
      >
        <button
            onClick={() => scrollTo("home")}
            className="flex items-center gap-0 transition-transform hover:scale-105 group"
          >
            {/* Bracket left */}
            <span className="font-mono text-[var(--color-text-dim)] text-lg transition-all duration-300 group-hover:text-[var(--color-violet)] group-hover:-translate-x-0.5">
              &lt;
            </span>

            {/* ARC — glitch effect */}
            <span className="relative font-extrabold tracking-tight text-base sm:text-lg">
              <span className="gradient-text relative inline-block group-hover:animate-[glitch_0.3s_ease_forwards]">
                ARC
              </span>
            </span>

            {/* adio */}
            <span className="font-bold text-base sm:text-lg text-[var(--color-text)] tracking-tight">
              adio
            </span>

            {/* Jr. with dot pulse */}
            <span className="font-mono text-[var(--color-text-dim)] text-sm ml-1 flex items-center gap-0.5">
              Jr
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--color-mint)] mb-2 animate-pulse" />
            </span>

            {/* Bracket right */}
            <span className="font-mono text-[var(--color-text-dim)] text-lg transition-all duration-300 group-hover:text-[var(--color-violet)] group-hover:translate-x-0.5">
              /&gt;
            </span>
          </button>

        <ul className="hidden md:flex items-center gap-8 text-sm text-[var(--color-text-dim)]">
          {links.map((link) => {
            const id = link.toLowerCase();
            const isActive = active === id;
            return (
              <li key={link} className="relative">
                <button
                  onClick={() => scrollTo(link)}
                  className={`py-1 transition-colors ${
                    isActive ? "text-[var(--color-text)]" : "hover:text-[var(--color-text)]"
                  }`}
                >
                  {link}
                </button>
                <span
                  className={`absolute -bottom-1 left-0 h-[2px] rounded-full bg-gradient-to-r from-[var(--color-violet)] to-[var(--color-pink)] transition-all duration-300 ${
                    isActive ? "w-full opacity-100" : "w-0 opacity-0"
                  }`}
                />
              </li>
            );
          })}
        </ul>

        <button
          className="md:hidden text-[var(--color-text)]"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span className="inline-block transition-transform duration-200" style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </span>
        </button>
      </nav>

      <ul
        className={`md:hidden flex flex-col px-6 gap-4 text-[var(--color-text-dim)] border-t border-[var(--color-border)] overflow-hidden transition-all duration-300 ${
          open ? "max-h-60 py-4 opacity-100" : "max-h-0 py-0 opacity-0"
        }`}
      >
        {links.map((link) => (
          <li key={link}>
            <button onClick={() => scrollTo(link)} className="py-1">
              {link}
            </button>
          </li>
        ))}
      </ul>
    </header>
  );
}