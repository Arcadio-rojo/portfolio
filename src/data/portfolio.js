// Edit this file with your real info — every section reads from here.
import make1Img from "../assets/make1.png";
import make2Img from "../assets/make2.png";
import make1Vid from "../assets/make1.mp4";
import make2Vid from "../assets/make2.mp4";
import zapier1Img from "../assets/zapier1.png";
import POS1Vid from "../assets/POS1.mp4";
import POS1Img from "../assets/POS1.png";
import POSPART2Img from "../assets/POS1PART2.png";
import POS2Vid from "../assets/POS2.mp4";
import SOFE21Img from "../assets/SOFE21.png";
import SOFE22Img from "../assets/SOFE22.png";
import SOFE23Img from "../assets/SOFE23.png";
import SOFE24Img from "../assets/SOFE24.png";
import SOFE25Img from "../assets/SOFE25.png";
import SOFE27Img from "../assets/SOFE207.jpg";
import LandingPageVid from "../assets/LandingPage.mp4";
import LandingPageImg from "../assets/LandingPage.png";
import EWATTS1Img from "../assets/EWATTS.png";
import adminImg from "../assets/admin.jpg";
import admin2Img from "../assets/Admin2.jpg";
import admin3Img from "../assets/admin3.jpg";
import mobileImg from "../assets/mobile.png";
import mobile2Img from "../assets/mobile2.png";
import mobile3Img from "../assets/mobile3.png";
import mobile4Img from "../assets/mobile4.png";
import mobile5Img from "../assets/mobile5.png";
import n8nImg from "../assets/n8n.png";
import n8nVid from "../assets/n8n.mp4";
import coursera1Img from "../assets/coursera1.jpg";
import coursera2Img from "../assets/coursera2.jpg";
import coursera3Img from "../assets/coursera3.jpg";
import coursera4Img from "../assets/coursera4.jpg";
import coursera5Img from "../assets/coursera5.jpg";
import Python1Img from "../assets/Python1.jpg";
import Python2Img from "../assets/Python2.jpg";
import CS50xImg from "../assets/CS50x.jpg";
import CS50x2Img from "../assets/CS50x2.jpg";
import JavaImg from "../assets/Java.jpg";


export const profile = {
  name: "ARCadio Jr.",
  tagline: "AI Automation Engine",
  subtitle:
    "Full-stack web structures and modern automation tools (Zapier, Make, n8n). I create seamless user experiences and wire them with intelligent AI systems to eliminate manual administrative bottlenecks.",
  bio: "I'm a Software Engineer specializing in full-stack integration, database architecture, and workflow automation, with experience building data-driven systems across the financial and clean-tech sectors. I work with Java (Spring Boot), React.js, the MERN stack, and SQL, while leveraging modern automation platforms like n8n, Make, and Zapier to engineer hands-free backend pipelines.",
  status: "Open to new opportunities",
  email: "youremail@gmail.com",
  socials: {
    github: "https://github.com/yourhandle",
    linkedin: "https://linkedin.com/in/yourhandle",
  },
};

export const skills = [
  {
    group: "Backend",
    items: [
      { name: "Java", icon: "devicon-java-plain" },
      { name: "Spring Boot", icon: "devicon-spring-plain" },
      { name: "Node.js", icon: "devicon-nodejs-plain" },
      { name: "PHP", icon: "devicon-php-plain" },
      { name: "C#", icon: "devicon-csharp-plain" },
    ],
  },
  {
    group: "Database",
    items: [
      { name: "PostgreSQL", icon: "devicon-postgresql-plain" },
      { name: "MySQL", icon: "devicon-mysql-plain" },
      { name: "MongoDB", icon: "devicon-mongodb-plain" },
      { name: "SQLite", icon: "devicon-sqlite-plain" },
    ],
  },
  {
    group: "Automation", 
    items: [
      { name: "n8n", img: "https://cdn.simpleicons.org/n8n/EA4B71" },
      { name: "Zapier", img: "https://cdn.simpleicons.org/zapier/FF4A00" },
      { name: "Make", img: "https://cdn.simpleicons.org/make/6D00CC" },
      { name: "REST APIs", icon: "", emoji: "🔌" },
      { name: "Webhooks", icon: "", emoji: "🪝" },
  ]
  },

  {
    group: "Frontend",
    items: [
      { name: "React.js", icon: "devicon-react-original" },
      { name: "JavaScript", icon: "devicon-javascript-plain" },
      { name: "HTML5", icon: "devicon-html5-plain" },
      { name: "CSS3", icon: "devicon-css3-plain" },
    ],
  },
  {
    group: "Tools & DevOps",
    items: [
      { name: "Git", icon: "devicon-git-plain" },
      { name: "Docker", icon: "devicon-docker-plain" },
      { name: "Postman", icon: "devicon-postman-plain" },
      { name: "Figma", icon: "devicon-figma-plain" },
    ],
  },
];


export const projects = [
  {
    id: "transcribe-automation",
    title: "AI-Powered Lead Qualifier & Automated Routing System",
    summary: "An autonomous AI pipeline that instantly scores inbound leads on a 1–10 scale and dynamically routes them to Slack, Gmail, or HubSpot based on priority.",    
    description: 
    "A fully automated AI pipeline built on Make.com that intercepts incoming Typeform leads, uses Google Gemini AI to analyze and score them (1–10) based on intent, and dynamically routes them. High-priority leads trigger instant Slack and Gmail alerts for rapid sales follow-up, while mid-tier and cold leads are automatically categorized into HubSpot CRM and tracking sheets.",
    tags: ["Make", "Automation"],
    media: [
      { type: "image", src: make1Img },
      { type: "video", src: make1Vid },
    ],
  },
  {
    id: "ai-email-automation",
    title: "AI-Driven Email Personalization & Nurture Sequence",
    summary: "Automates multi-day email nurture campaigns by using AI to generate personalized content based on lead interest.",
    description: "An autonomous two-part Make.com pipeline that links ActiveCampaign to OpenAI for instant, hyper-personalized email generation. The system handles real-time welcome emails and manages a scheduled, multi-day conditional follow-up sequence via Google Sheets, increasing lead response rates by 40% on autopilot.",
    tags: ["Make", "Automation", "AI", "Email Marketing"],
    media: [
      { type: "image", src: make2Img },
      { type: "video", src: make2Vid },
    ],
  },
  {
      id: "jotform-activecampaign-funnel",
      title: "Automated Lead Intake & CRM Sync Pipeline",
      summary: "Connects web forms to systeme.io and ActiveCampaign via Zapier for seamless contact provisioning.",
      description: "An automated lead operations workflow built in Zapier, Upon a new form submission via Jotform, the pipeline instantly syncs the prospect data to systeme.io to update or create a contact record, followed by a multi-step sequence in ActiveCampaign that dynamically provisions the lead profile and updates segmentation tags for immediate marketing follow-up.",
      tags: ["Zapier", "Jotform", "ActiveCampaign", "systeme.io"],
      media: [
        { type: "image", src: zapier1Img }
      ],
    },
  {
    id: "automated-lead-scheduling-system",
    title: "AI-Driven Lead Qualification & Automated Scheduling System",
    summary: "An automated workflow engine integrating Typeform, Calendly, HubSpot, and AI agents for end-to-end lead conversion.",
    description:
      "Designed and deployed a two-tier automated operations workflow using n8n to streamline inbound business lead acquisition and qualification. Engineered a data pipeline that captures user profiles from Typeform, evaluates lead quality using a custom JavaScript execution block, and routes qualified profiles directly to an AI Agent paired with an Advanced LLM model for contextual analysis and automated CRM deal creation in HubSpot. Implemented a robust customer lifecycle system using Calendly triggers to dynamically calculate schedules and send automated multi-channel meeting notifications—including sequential Gmail tracking reminders and time-optimized SMS follow-ups—resulting in an entirely hands-off appointment confirmation process.",
    tags: ["n8n", "JavaScript", "Typeform", "Calendly", "HubSpot", "Gmail API", "Twilio", "AI Agents / LLM"],
    media: [
      { type: "image", src: n8nImg },
      { type: "video", src: n8nVid }
    ],
  },
    {
    id: "ewatts-solar-system",
    title: "EWATTS – Solar Energy Management System",
    summary: "A web-based renewable energy monitoring and predictive analytics platform.",
    description:
      "Architected a web-based energy platform using React.js and Java (Spring Boot) to facilitate real-time monitoring of renewable power sources. Implemented LSTM and Random Forest models via REST APIs to forecast energy consumption and weather patterns with high precision. Achieved a perfect 4.00/4.00 rating based on ISO 25010 quality standards, validated by industry evaluators for functional suitability and performance efficiency.",
    tags: ["React.js", "Spring Boot", "MySQL", "Arduino IoT", "REST APIs", "Machine Learning", "Thesis Project"],
    media: [
      { type: "image", src: adminImg },
      { type: "image", src: admin2Img },
      { type: "image", src: admin3Img },
      { type: "image", src: mobileImg },
      { type: "image", src: mobile2Img },
      { type: "image", src: mobile3Img },
      { type: "image", src: mobile4Img },
      { type: "image", src: mobile5Img },
      { type: "image", src: EWATTS1Img }
    ],
  },
  {
    id: "maritaste-pos",
    title: "Maritaste POS Resource Management System",
    summary: "A web-based POS and resource management system designed for food stall operations.",
    description:
      "Built a web-based POS system for food items using HTML, CSS, JavaScript, Node.js, and SQLite. It features a simple, user-friendly interface designed for efficient point-of-sale operations, inventory tracking, and admin sales analytics.",
    tags: ["HTML", "CSS", "JavaScript", "Node.js", "SQLite"],
    media: [
      { type: "image", src: POS1Img },
      { type: "image", src: POSPART2Img },
      { type: "video", src: POS1Vid }
    ],
  },
 {
    id: "adaptive-pos",
    title: "Adaptive Point of Sale Management System",
    summary: "A client-based POS system with AI features designed for mini grocery operations.",
    description:
      "Developed a client-based POS system for a mini grocery business using React (JavaScript) for the frontend and C# for backend logic, with SQLite as the database. Integrated AI-based sales forecasting and product recommendation APIs, supported barcode scanners, USB/Bluetooth receipt printers, and enabled exporting transaction data to Excel.",
    tags: ["React", "JavaScript", "C#", "SQLite", "AI Integration"],
    media: [
      { type: "image", src: SOFE27Img },
      { type: "image", src: SOFE21Img },
      { type: "image", src: SOFE22Img },
      { type: "image", src: SOFE23Img },
      { type: "image", src: SOFE24Img },
      { type: "image", src: SOFE25Img },
      { type: "video", src: POS2Vid }
    ],
  },

  {
    id: "financial-advisor-platform",
    title: "Financial Advisor Landing Page & Client Engagement System",
    summary: "A full-stack MERN platform automating insurance recommendations and consultation scheduling.",
    description:
      "Collaborated on a full-stack engagement platform using the MERN stack to automate insurance recommendations based on user profiles. Engineered a rule-based questionnaire engine in React.js that maps complex user inputs to specific insurance products, enhancing lead accuracy. Successfully integrated the Google Calendar API to synchronize real-time consultation scheduling between clients and advisors, while contributing to the full Software Development Lifecycle (SDLC) from UI design to frontend deployment.",
    tags: ["MongoDB", "Express.js", "React", "Node.js", "REST APIs", "Google Calendar API"],
    media: [
      { type: "image", src: LandingPageImg },
      { type: "video", src: LandingPageVid }
    ],
  },
 
];

export const experience = [
  {
    role: "Financial Technology Intern",
    company: "PRU Life UK — Ortigas Center, Pasig",
    period: "02/03/2026 — 05/04/2026",
    summary:
      "Developed a centralized master tracking system for Financial Advisors to monitor client pipelines, commissions, and policy statuses. Engineered full-stack web solutions using the MERN stack for real-time business requirements. Designed and managed PostgreSQL databases with query optimization for high-performance retrieval.",
  },
];

export const certifications = [
  {
    title: "CS50x: Introduction to Computer Science",
    org: "Harvard University (HarvardX)",
    year: "2025",
    category: "Harvard",
    media: [{ type: "image", src: CS50xImg }]
  },
  {
    title: "CS50's Introduction to Databases with SQL",
    org: "Harvard University (HarvardX)",
    year: "2025",
    category: "Harvard",
    media: [{ type: "image", src: CS50x2Img }]
  },
  {
    title: "Java (Basic) Skill Certification",
    org: "HackerRank",
    year: "2025",
    category: "Technical",
    media: [{ type: "image", src: JavaImg }]
  },
  {
    title: "Python Intermediate",
    org: "Sololearn",
    year: "2025",
    category: "Technical",
    media: [{ type: "image", src: Python2Img }]
  },
  {
    title: "Introduction to Python",
    org: "Sololearn",
    year: "2025",
    category: "Technical",
    media: [{ type: "image", src: Python1Img }]
  },
  {
    title: "Introduction to Data Analysis using Microsoft Excel",
    org: "Coursera Project Network",
    year: "2025",
    category: "Coursera",
    media: [{ type: "image", src: coursera1Img }]
  },
  {
    title: "Conditional Formatting, Tables and Charts in Microsoft Excel",
    org: "Coursera Project Network",
    year: "2025",
    category: "Coursera",
    media: [{ type: "image", src: coursera2Img }]
  },
  {
    title: "Create a Financial Statement using Microsoft Excel",
    org: "Coursera Project Network",
    year: "2025",
    category: "Coursera",
    media: [{ type: "image", src: coursera3Img }]
  },
  {
    title: "How to Use Lookup Reference Math and Text Functions in Excel",
    org: "Coursera Project Network",
    year: "2025",
    category: "Coursera",
    media: [{ type: "image", src: coursera4Img }]
  },
  {
    title: "Getting Started with Microsoft Excel",
    org: "Coursera Project Network",
    year: "2025",
    category: "Coursera",
    media: [{ type: "image", src: coursera5Img }]
  }
];