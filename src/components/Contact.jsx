import { useState } from "react";
import { Mail, Briefcase, Send, CheckCircle, Calendar } from "lucide-react";
import { profile } from "../data/portfolio";
import useReveal from "../hooks/useReveal";

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY ?? "";
const CALCOM_USERNAME = import.meta.env.VITE_CALCOM_USERNAME ?? "";

function GitHubIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .322.216.694.825.576C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function ContactMark({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <line x1="9" y1="10" x2="15" y2="10" />
      <line x1="9" y1="14" x2="13" y2="14" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/Arcadio-rojo",
    icon: <GitHubIcon size={16} />,
    text: "Arcadio-rojo",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/arcadio-jr-flocarencia-78a1952a2/",
    icon: <LinkedInIcon size={16} />,
    text: "arcadio-jr-flocarencia",
  },
  {
    label: "Email",
    href: "https://mail.google.com/mail/?view=cm&to=flocarenciaarcadiojr@gmail.com",
    icon: <Mail size={16} />,
    text: "flocarenciaarcadiojr@gmail.com",
  },
];

const inputClass =
  "w-full bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[var(--color-violet)] transition-colors placeholder:text-[var(--color-text-dim)]/40";

export default function Contact() {
  const [ref, visible] = useReveal();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [submittedEmail, setSubmittedEmail] = useState("");

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setSubmittedEmail(form.email);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          ...form,
          to: "flocarenciaarcadiojr@gmail.com",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      className={`max-w-6xl mx-auto px-6 py-24 reveal ${visible ? "is-visible" : ""}`}
    >
      {/* Heading */}
      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(16px)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}
      >
        <h2 className="font-bold text-2xl sm:text-3xl mb-2 flex items-center gap-3">
          <span className="text-[var(--color-violet)]">
            <ContactMark size={26} />
          </span>
          Contact
        </h2>
        <p className="text-[var(--color-text-dim)] mb-10 text-sm">
          Have a project in mind? Fill out the form or book a call directly.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">

        {/* LEFT — Form */}
        <div
          className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 space-y-4 flex flex-col"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(28px)",
            transition: "opacity 0.55s ease 0.1s, transform 0.55s ease 0.1s",
          }}
        >
          {status === "success" ? (
            <div className="flex flex-col items-center justify-center py-16 gap-4 text-center flex-1">
              <div className="w-16 h-16 rounded-full bg-[var(--color-mint)]/10 border border-[var(--color-mint)]/30 flex items-center justify-center">
                <CheckCircle size={32} className="text-[var(--color-mint)]" />
              </div>
              <p className="font-bold text-lg">Message Sent!</p>
              <p className="text-sm text-[var(--color-text-dim)]">
                I'll get back to you at{" "}
                <span className="text-[var(--color-violet)]">{submittedEmail || "your email"}</span> soon.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="text-xs text-[var(--color-text-dim)] hover:text-[var(--color-text)] underline mt-2 transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 flex-1 flex flex-col">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-[var(--color-text-dim)] mb-1.5 block font-medium">Name</label>
                  <input name="name" value={form.name} onChange={handleChange} required placeholder="Your name" className={inputClass} />
                </div>
                <div>
                  <label className="text-xs text-[var(--color-text-dim)] mb-1.5 block font-medium">Email</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="your@email.com" className={inputClass} />
                </div>
              </div>

              <div>
                <label className="text-xs text-[var(--color-text-dim)] mb-1.5 block font-medium">Subject</label>
                <input name="subject" value={form.subject} onChange={handleChange} required placeholder="What's this about?" className={inputClass} />
              </div>

              <div className="flex-1">
                <label className="text-xs text-[var(--color-text-dim)] mb-1.5 block font-medium">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              {status === "error" && (
                <p className="text-xs text-red-400">
                  Something went wrong. Try emailing directly at flocarenciaarcadiojr@gmail.com
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="glow-btn cursor-pointer flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-white font-medium text-sm hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={14} />
                {status === "sending" ? "Sending…" : "Send Message"}
              </button>
            </form>
          )}

          {/* Social links row */}
          <div className="pt-4 border-t border-[var(--color-border)]">
            <p className="text-[10px] font-semibold text-[var(--color-text-dim)] uppercase tracking-widest mb-3">
              Find me on
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-[var(--color-surface-2)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-dim)] hover:text-[var(--color-violet)] hover:border-[var(--color-violet)] hover:-translate-y-0.5 transition-all duration-200"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — Cal.com embed */}
        <div
          className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl overflow-hidden flex flex-col"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(28px)",
            transition: "opacity 0.55s ease 0.2s, transform 0.55s ease 0.2s",
          }}
        >
          <div className="px-5 py-4 border-b border-[var(--color-border)] flex items-start gap-3">
            <span className="w-8 h-8 rounded-lg bg-[var(--color-violet)]/10 border border-[var(--color-violet)]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Calendar size={15} className="text-[var(--color-violet)]" />
            </span>
            <div>
              <p className="font-semibold text-sm">Schedule a Meeting</p>
              <p className="text-xs text-[var(--color-text-dim)] mt-0.5 leading-relaxed">
                Pick a time that works for you — let's discuss how I can help with your project.
              </p>
            </div>
          </div>
          <iframe
            src={`https://cal.com/${CALCOM_USERNAME}?embed=true&theme=dark`}
            className="flex-1 w-full min-h-[480px] border-0"
            title="Schedule a meeting"
          />
        </div>

      </div>
    </section>
  );
}