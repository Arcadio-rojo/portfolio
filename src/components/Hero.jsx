import { useState, useEffect } from "react";
import { Briefcase, Mail, ChevronDown } from "lucide-react";
import { profile } from "../data/portfolio";

const ROLES = ["AI Automation\n Engine", "Web\n Developer"];
const TYPE_SPEED = 70;
const DELETE_SPEED = 40;
const HOLD_TIME = 1800;

function useTypewriter(words) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    let timeout;

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), HOLD_TIME);
    } else if (deleting && text === "") {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
    } else {
      timeout = setTimeout(
        () => {
          setText((t) =>
            deleting ? current.slice(0, t.length - 1) : current.slice(0, t.length + 1)
          );
        },
        deleting ? DELETE_SPEED : TYPE_SPEED
      );
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words]);

  return text;
}

function GitHubIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .322.216.694.825.576C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

export default function Hero() {
  const typed = useTypewriter(ROLES);

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative"
    >
      <h1 className="font-extrabold leading-[1.05] text-5xl sm:text-6xl md:text-7xl max-w-3xl min-h-[2.2em] sm:min-h-[2.1em]">
        <span className="gradient-text">
          {typed.split("\n").map((line, i, arr) => (
            <span key={i}>
              {line}
              {i < arr.length - 1 && <br />}
            </span>
          ))}
        </span>
        <span className="inline-block w-[3px] sm:w-[4px] h-[0.9em] ml-1 align-middle bg-[var(--color-violet)] animate-[blink_1s_steps(1)_infinite]" />
      </h1>

      <p className="mt-20 max-w-xl text-[var(--color-text-dim)] text-base sm:text-lg">
        {profile.subtitle}
      </p>

      <button
        onClick={() =>
          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
        }
        className="glow-btn cursor-pointer mt-10 px-7 py-3 rounded-full font-medium text-white hover:opacity-90 hover:scale-105 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
      >
        Let's Build Something Amazing
      </button>

      {/* SOCIAL LINKS */}
      <div className="mt-8 flex items-center gap-4">
        {/* GitHub */}
        <a
          href="https://github.com/Arcadio-rojo"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          className="w-10 h-10 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-dim)] hover:text-[var(--color-violet)] hover:border-[var(--color-violet)] hover:-translate-y-0.5 cursor-pointer transition-all"
        >
          <GitHubIcon size={18} />
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/arcadio-jr-flocarencia-78a1952a2/"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
          className="w-10 h-10 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-dim)] hover:text-[var(--color-violet)] hover:border-[var(--color-violet)] hover:-translate-y-0.5 cursor-pointer transition-all"
        >
          <Briefcase size={18} />
        </a>

        {/* Gmail — opens compose with pre-filled To address */}
        <a
          href="https://mail.google.com/mail/?view=cm&to=flocarenciaarcadiojr@gmail.com"
          target="_blank"
          rel="noreferrer"
          aria-label="Send email"
          className="w-10 h-10 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-dim)] hover:text-[var(--color-violet)] hover:border-[var(--color-violet)] hover:-translate-y-0.5 cursor-pointer transition-all"
        >
          <Mail size={18} />
        </a>
      </div>

      <ChevronDown
        className="absolute bottom-8 text-[var(--color-text-dim)] animate-bounce"
        size={22}
      />
    </section>
  );
}