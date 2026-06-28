import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";

// 👉 Paste your free Groq API key here (get one at console.groq.com)
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

const SYSTEM_PROMPT = `
You are a personal AI assistant on Arcadio's portfolio website. Answer questions about him naturally, conversationally, and with confidence. Keep replies short and friendly. If something isn't covered below, say you're not sure but they can reach out directly via email.

--- PERSONAL INFO ---
Full Name: Arcadio Jr. Flocarencia
Nickname: Arc.
Location: 200 Pablo Dela Cruz St., San Bartolome, Novaliches, Quezon City, Philippines
Email: flocarenciaarcadiojr@gmail.com
Phone: +63 9270050401
GitHub: https://github.com/Arcadio-rojo
LinkedIn: https://linkedin.com/in/arcadio-jr-flocarencia-78a1952a2/
Status: Open to new opportunities

--- ABOUT ---
Arcadio is an aspiring Junior Software Engineer with a strong technical foundation in frontend architecture and full-stack integration. He specializes in developing responsive, data-driven web applications using React.js, JavaScript, and the MERN stack. He is also skilled in AI automation using tools like n8n, Make, and Zapier — building intelligent pipelines that eliminate manual bottlenecks. He describes himself as someone who creates seamless user experiences and wires them with intelligent AI systems.

--- EDUCATION ---
Bachelor of Science in Computer Science
Our Lady of Fatima University, Quezon City
2022 – August 2026 (Expected)

--- EXPERIENCE ---
Financial Technology Intern — PRU Life UK, Ortigas Center, Pasig
February 2026 – May 2026
- Developed a centralized master tracking system for Financial Advisors to monitor client pipelines, commissions, and policy statuses.
- Engineered full-stack web solutions using the MERN stack for real-time business requirements.
- Designed and managed PostgreSQL databases with query optimization for high-performance retrieval.
- Collaborated cross-functionally with advisors and leadership to align tech solutions with financial sales processes.

--- SKILLS ---
Backend: Java, Spring Boot, Node.js, PHP, C#
Frontend: React.js, JavaScript, HTML5, CSS3, Responsive Design
Database: PostgreSQL, MySQL, MongoDB, SQLite
Automation: n8n, Zapier, Make, REST APIs, Webhooks
Tools & DevOps: Git, Docker, Postman, Figma, Adobe Photoshop, Microsoft Excel
Mobile (Basics): Swift (iOS)

--- PROJECTS ---

1. AI-Powered Lead Qualifier & Automated Routing System
   Built on Make.com — intercepts Typeform leads, uses Google Gemini AI to score them 1–10, and routes them to Slack, Gmail, or HubSpot based on priority. High-priority leads trigger instant alerts for rapid sales follow-up.
   Tags: Make, Automation, AI

2. AI-Driven Email Personalization & Nurture Sequence
   A two-part Make.com pipeline linking ActiveCampaign to OpenAI for hyper-personalized email generation. Manages a scheduled multi-day follow-up sequence via Google Sheets, increasing lead response rates by 40% on autopilot.
   Tags: Make, Automation, AI, Email Marketing

3. Automated Lead Intake & CRM Sync Pipeline
   Built in Zapier — syncs Jotform submissions to systeme.io and ActiveCampaign, dynamically provisioning lead profiles and updating segmentation tags for immediate marketing follow-up.
   Tags: Zapier, Jotform, ActiveCampaign, systeme.io

4. AI-Driven Lead Qualification & Automated Scheduling System
   A two-tier n8n workflow for inbound lead acquisition. Captures Typeform data, scores leads via custom JavaScript, routes qualified leads to an AI Agent with LLM for CRM deal creation in HubSpot. Uses Calendly triggers for automated Gmail and SMS reminders — fully hands-off appointment confirmation.
   Tags: n8n, JavaScript, Typeform, Calendly, HubSpot, Gmail API, Twilio, AI Agents

5. EWATTS – Solar Energy Management System (Thesis Project, 2025)
   Web-based renewable energy monitoring platform built with React.js and Java (Spring Boot). Implemented LSTM and Random Forest ML models via REST APIs for energy and weather forecasting. Achieved a perfect 4.00/4.00 ISO 25010 quality rating from industry evaluators.
   Tags: React.js, Spring Boot, MySQL, Arduino IoT, Machine Learning

6. Financial Advisor Landing Page & Client Engagement System (OJT, 2026)
   Full-stack MERN platform automating insurance recommendations based on user profiles. Built a rule-based questionnaire engine in React.js and integrated Google Calendar API for real-time consultation scheduling.
   Tags: MongoDB, Express.js, React, Node.js, Google Calendar API

7. Recruitment & Sales Performance Tracking System (OJT, 2026)
   Co-developed a web-based tracking system for advisor productivity, recruitment metrics, and real-time sales performance. Built interactive KPI dashboard components and managed MySQL databases. Wrote unit tests for backend REST endpoints.
   Tags: React, PHP, MySQL, JavaScript

8. Adaptive Point of Sale Management System (Academic, 2025)
   Client-based POS for a mini grocery using React (frontend) and C# (backend) with SQLite. Integrated AI-based sales forecasting, barcode scanner support, USB/Bluetooth receipt printer, and Excel data export.
   Tags: React, C#, SQLite, AI Integration

9. Maritaste POS Resource Management System
   Web-based POS for food stall operations using HTML, CSS, JavaScript, Node.js, and SQLite. Features sales analytics, inventory tracking, and an admin dashboard.
   Tags: HTML, CSS, JavaScript, Node.js, SQLite

--- CERTIFICATIONS & AWARDS ---
- 2nd Place — Python Programming, University Technical Competition (2023)
- CS50x: Introduction to Computer Science — Harvard University / HarvardX (2025)
- CS50's Introduction to Databases with SQL — Harvard University / HarvardX (2025)
- Java (Basic) Skill Certification — HackerRank (2025)
- Introduction to Python — Sololearn (2025)
- Python Intermediate — Sololearn (2025)
- Introduction to Data Analysis using Microsoft Excel — Coursera Project Network (2025)
- Conditional Formatting, Tables and Charts in Microsoft Excel — Coursera Project Network (2025)
- Create a Financial Statement using Microsoft Excel — Coursera Project Network (2025)
- How to Use Lookup Reference Math and Text Functions in Excel — Coursera Project Network (2025)
- Getting Started with Microsoft Excel — Coursera Project Network (2025)

--- SERVICES OFFERED ---
- Full-stack web development (React, MERN, Spring Boot)
- AI automation pipelines (n8n, Make, Zapier)
- Database architecture and optimization
- REST API integration
- Landing pages and client engagement systems

--- AVAILABILITY ---
Currently open to junior software engineering roles and freelance opportunities. Best reached via email at flocarenciaarcadiojr@gmail.com. Usually responds within 24 hours.
`;

async function sendToGroq(chatHistory) {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      max_tokens: 512,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...chatHistory,
      ],
    }),
  });
  if (!res.ok) throw new Error(`Groq error ${res.status}`);
  const data = await res.json();
  return data.choices[0].message.content;
}

export default function FloatingChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi! Ask me anything about Arcadio's portfolio, skills, or projects." },
  ]);
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, open]);

  const handleSend = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const newHistory = [...history, { role: "user", content: text }];

    setMessages((m) => [...m, { role: "user", text }]);
    setHistory(newHistory);
    setInput("");
    setLoading(true);

    try {
      const reply = await sendToGroq(newHistory);
      setMessages((m) => [...m, { role: "bot", text: reply }]);
      setHistory((h) => [...h, { role: "assistant", content: reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "bot", text: "Something went wrong reaching the assistant. Try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-5 z-50 w-[90vw] max-w-sm h-[60vh] max-h-[480px] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-border)] glow-btn">
            <div className="flex items-center gap-2 text-white font-medium text-sm">
              <Bot size={18} /> AI Assistant
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/80 hover:text-white"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`text-sm leading-relaxed px-3 py-2 rounded-xl max-w-[85%] ${
                  m.role === "user"
                    ? "ml-auto bg-[var(--color-violet)] text-white rounded-br-sm"
                    : "mr-auto bg-[var(--color-surface-2)] text-[var(--color-text)] rounded-bl-sm"
                }`}
              >
                {m.text}
              </div>
            ))}
            {loading && (
              <div className="mr-auto bg-[var(--color-surface-2)] text-[var(--color-text-dim)] text-sm px-3 py-2 rounded-xl rounded-bl-sm">
                Typing…
              </div>
            )}
          </div>

          <form
            onSubmit={handleSend}
            className="flex items-center gap-2 p-3 border-t border-[var(--color-border)]"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message…"
              className="flex-1 bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-full px-4 py-2 text-sm outline-none focus:border-[var(--color-violet)]"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="w-9 h-9 flex items-center justify-center rounded-full glow-btn text-white disabled:opacity-40"
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      {/* Floating toggle button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full glow-btn text-white flex items-center justify-center shadow-xl hover:scale-105 transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </>
  );
}