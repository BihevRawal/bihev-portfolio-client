import { useEffect, useState } from "react";

const PROJECTS = [
  {
    name: "Property Rental Platform",
    type: "Full-stack product",
    summary:
      "Built a MERN-based rental platform that supported thousands of active users with a clear booking and management flow.",
    impact: "Supported real production traffic",
    tech: ["React", "Node.js", "Express", "MongoDB", "AWS"],
  },
  {
    name: "Mobile-first React Redesign",
    type: "UX and performance overhaul",
    summary:
      "Reworked the front end in React, lifting mobile engagement by 40% with sharper hierarchy, lighter interactions, and faster rendering.",
    impact: "+40% mobile engagement",
    tech: ["React", "Responsive UI", "Performance tuning"],
  },
  {
    name: "Security and Auth Layer",
    type: "Backend hardening",
    summary:
      "Architected JWT-based authentication with data encryption and role-aware access controls for safer user sessions.",
    impact: "Safer access for every user role",
    tech: ["Node.js", "Express", "JWT", "Encryption"],
  },
  {
    name: "AWS CI/CD Pipeline",
    type: "Delivery automation",
    summary:
      "Established CI/CD on AWS to reduce release friction and keep production uptime above 99 percent.",
    impact: ">99% uptime",
    tech: ["AWS", "CI/CD", "Automation", "Deployment"],
  },
];

const EXPERIENCE = [
  {
    period: "Current profile",
    title: "Full-stack Developer | Mobile & Cloud Specialist",
    org: "Bihev Rawal, Brisbane, Australia",
    bullets: [
      "Builds React front ends, Node.js APIs, and deployment pipelines.",
      "Works across web, Android, Firebase, MongoDB, MySQL, and AWS.",
      "Focuses on fast, reliable interfaces and maintainable delivery.",
    ],
  },
  {
    period: "Selected experience",
    title: "WebConnect Nepal Pvt. Ltd.",
    org: "Software delivery and digital solutions",
    bullets: [
      "Engineered and launched a property rental platform using the MERN stack.",
      "Optimized backend performance by 25 percent with more efficient REST APIs.",
      "Mentored two junior developers and improved team output.",
    ],
  },
  {
    period: "Education and certification",
    title: "Master of IT | AWS Cloud Practitioner",
    org: "Mobile App Development | 2025",
    bullets: [
      "Completed a Master of Information Technology in Mobile App Development.",
      "Earned AWS Certified Cloud Practitioner in 2025.",
      "Keeps a practical balance of engineering depth and product delivery.",
    ],
  },
];

const STACK = [
  {
    title: "Front end",
    items: ["React", "JavaScript", "Vite", "Responsive UI", "Design systems"],
  },
  {
    title: "Back end",
    items: ["Node.js", "Express", "REST APIs", "JWT", "Encryption"],
  },
  {
    title: "Data and cloud",
    items: ["MongoDB", "MySQL", "AWS", "Firebase", "Heroku"],
  },
  {
    title: "Delivery",
    items: ["CI/CD", "GitHub Actions", "Performance tuning", "Release automation"],
  },
];

const HIGHLIGHTS = [
  { value: "5+ years", label: "shipping software" },
  { value: "40%", label: "mobile engagement lift" },
  { value: "25%", label: "backend perf gain" },
  { value: ">99%", label: "deployment uptime" },
];

function LogoMark({ className = "" }) {
  return <img className={className} src="/logo.svg" alt="Bihev Rawal logo" />;
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13m0 0-6-6m6 6-6 6" />
    </svg>
  );
}

function TerminalIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 6h16v12H4z" />
      <path d="m7 10 3 2-3 2" />
      <path d="M12 14h5" />
    </svg>
  );
}

function MascotFigure() {
  return (
    <div className="mascot-figure" aria-hidden="true">
      <svg viewBox="0 0 120 120" className="mascot-svg" role="presentation">
        <defs>
          <linearGradient id="mascotBody" x1="18" y1="20" x2="102" y2="104" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1B2A43" />
            <stop offset="1" stopColor="#0B1220" />
          </linearGradient>
          <linearGradient id="mascotGlow" x1="30" y1="26" x2="90" y2="92" gradientUnits="userSpaceOnUse">
            <stop stopColor="#7BA5FF" />
            <stop offset="1" stopColor="#B8D2FF" />
          </linearGradient>
        </defs>
        <path
          d="M34 38c0-9.94 8.06-18 18-18h16c9.94 0 18 8.06 18 18v20c0 9.94-8.06 18-18 18H52c-9.94 0-18-8.06-18-18V38Z"
          fill="url(#mascotBody)"
          stroke="rgba(148, 163, 184, 0.18)"
          strokeWidth="2"
        />
        <path
          d="M46 24h28"
          stroke="url(#mascotGlow)"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <circle cx="53" cy="48" r="5.5" fill="#DCEBFF" />
        <circle cx="67" cy="48" r="5.5" fill="#DCEBFF" />
        <path
          d="M48 59c3.2 3.8 8 5.8 12 5.8s8.8-2 12-5.8"
          stroke="#89BAFF"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M28 72h64"
          stroke="rgba(148, 163, 184, 0.14)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M42 72V86"
          stroke="url(#mascotGlow)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M78 72V86"
          stroke="url(#mascotGlow)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M39 91c5 5 10 7 21 7s16-2 21-7"
          stroke="rgba(137, 186, 255, 0.8)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="26" cy="38" r="5" fill="#89BAFF" />
        <circle cx="94" cy="74" r="4.5" fill="#89BAFF" />
      </svg>
      <span className="mascot-spark mascot-spark-a" />
      <span className="mascot-spark mascot-spark-b" />
    </div>
  );
}

function Header({ onOpenResume }) {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Bihev Rawal home">
        <LogoMark className="brand-mark" />
        <span className="brand-copy">
          <strong>Bihev Rawal</strong>
          <span>Full-stack developer</span>
        </span>
      </a>

      <nav className="site-nav" aria-label="Primary">
        <a href="#projects">Projects</a>
        <a href="#experience">Experience</a>
        <a href="#stack">Stack</a>
        <a href="#contact">Contact</a>
      </nav>

      <div className="header-actions">
        <button type="button" className="secondary-button" onClick={onOpenResume}>
          Resume
        </button>
        <a href="#contact" className="primary-button">
          Let&apos;s talk
        </a>
      </div>
    </header>
  );
}

function Hero({ onOpenResume }) {
  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <p className="eyebrow">Software developer portfolio</p>
        <h1>Building reliable software for web, mobile, and cloud delivery.</h1>
        <p className="hero-text">
          I&apos;m Bihev Rawal, a full-stack developer focused on React, Node.js,
          AWS, Android, and product quality. I like systems that are easy to use,
          fast to ship, and boring in production.
        </p>

        <div className="hero-actions">
          <a href="#projects" className="primary-button">
            View work
            <ArrowIcon />
          </a>
          <a href="#contact" className="secondary-button">
            Contact me
          </a>
          <button type="button" className="ghost-button" onClick={onOpenResume}>
            Open resume
          </button>
        </div>

        <div className="hero-highlights" aria-label="Highlights">
          {HIGHLIGHTS.map((item) => (
            <article key={item.label} className="metric-card">
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </article>
          ))}
        </div>
      </div>

      <aside className="hero-panel">
        <div className="profile-card">
          <div className="profile-head">
            <LogoMark className="profile-mark" />
            <div>
              <p className="profile-name">Bihev Rawal</p>
              <p className="profile-role">Full-stack Developer · Brisbane</p>
            </div>
          </div>

          <div className="status-pill">
            <span className="status-dot" />
            Open for freelance and product roles
          </div>

          <div className="profile-grid">
            <div>
              <span>Focus</span>
              <strong>React, Node.js, AWS</strong>
            </div>
            <div>
              <span>Specialties</span>
              <strong>Mobile, APIs, delivery pipelines</strong>
            </div>
            <div>
              <span>Stack depth</span>
              <strong>Web, Android, Firebase, MongoDB</strong>
            </div>
          </div>

          <div className="code-window" aria-label="Developer snapshot">
            <div className="code-window-top">
              <span>
                <TerminalIcon />
                Current stack
              </span>
              <span className="code-chip">Production ready</span>
            </div>
            <pre>{`const profile = {
  role: "full-stack developer",
  focus: ["React", "Node.js", "AWS", "Android"],
  strengths: [
    "performance tuning",
    "secure auth",
    "deployment automation"
  ]
};`}</pre>
          </div>
        </div>
      </aside>
    </section>
  );
}

function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <div className="project-top">
        <span>{project.type}</span>
        <strong>{project.impact}</strong>
      </div>
      <h3>{project.name}</h3>
      <p>{project.summary}</p>
      <div className="chip-row">
        {project.tech.map((tech) => (
          <span key={tech} className="chip">
            {tech}
          </span>
        ))}
      </div>
    </article>
  );
}

function ProjectsSection() {
  return (
    <section className="section" id="projects">
      <div className="section-head">
        <p>Projects</p>
        <h2>Selected work with measurable outcomes.</h2>
        <span className="section-note">
          These are the projects and wins reflected in my resume and recent work.
        </span>
      </div>

      <div className="projects-grid">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section className="section" id="experience">
      <div className="section-head">
        <p>Experience</p>
        <h2>Practical delivery across products, APIs, and teams.</h2>
        <span className="section-note">
          The short version: I build the thing, keep it stable, and help others
          ship with it.
        </span>
      </div>

      <div className="timeline">
        {EXPERIENCE.map((item) => (
          <article key={item.title} className="timeline-card">
            <div className="timeline-meta">
              <span>{item.period}</span>
              <strong>{item.org}</strong>
            </div>
            <h3>{item.title}</h3>
            <ul>
              {item.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function StackSection() {
  return (
    <section className="section" id="stack">
      <div className="section-head">
        <p>Stack</p>
        <h2>Tools I use when the output needs to be clean and dependable.</h2>
      </div>

      <div className="stack-grid">
        {STACK.map((group) => (
          <article key={group.title} className="stack-card">
            <h3>{group.title}</h3>
            <div className="chip-row">
              {group.items.map((item) => (
                <span key={item} className="chip">
                  {item}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="section" id="about">
      <div className="section-head">
        <p>About</p>
        <h2>Engineer first, product-minded second, always shipping.</h2>
        <span className="section-note">
          I like simple interfaces, understandable architecture, and reliable
          handoffs to production.
        </span>
      </div>

      <div className="about-grid">
        <article className="about-card">
          <h3>What I build</h3>
          <p>
            Full-stack web apps, API layers, mobile-friendly interfaces, and the
            deployment plumbing that keeps releases sane.
          </p>
        </article>
        <article className="about-card">
          <h3>What I optimize</h3>
          <p>
            Performance, auth flows, responsive behavior, maintainability, and
            the small details that make software feel trustworthy.
          </p>
        </article>
        <article className="about-card">
          <h3>What I know about you</h3>
          <p>
            You are Bihev Rawal, a Brisbane-based full-stack developer with 5+
            years of experience, a Master of IT in Mobile App Development, and an
            AWS Cloud Practitioner certification from 2025.
          </p>
        </article>
      </div>
    </section>
  );
}

function ContactSection({ onOpenResume }) {
  return (
    <section className="section" id="contact">
      <div className="contact-card">
        <div className="section-head">
          <p>Contact</p>
          <h2>Open to freelance work, product teams, and focused builds.</h2>
        </div>

        <p className="contact-copy">
          If you need a React front end, a Node API, a deployment pipeline, or a
          mobile-first rebuild, email me or connect on LinkedIn.
        </p>

        <div className="contact-details">
          <div>
            <span>Email</span>
            <a href="mailto:bihevr@gmail.com">bihevr@gmail.com</a>
          </div>
          <div>
            <span>LinkedIn</span>
            <a
              href="https://linkedin.com/in/bihev-rawal"
              target="_blank"
              rel="noreferrer"
            >
              linkedin.com/in/bihev-rawal
            </a>
          </div>
          <div>
            <span>Location</span>
            <strong>Brisbane, Australia</strong>
          </div>
        </div>

        <div className="contact-actions">
          <a href="mailto:bihevr@gmail.com" className="primary-button">
            Email me
            <ArrowIcon />
          </a>
          <a
            href="https://linkedin.com/in/bihev-rawal"
            target="_blank"
            rel="noreferrer"
            className="secondary-button"
          >
            LinkedIn profile
          </a>
          <button type="button" className="ghost-button" onClick={onOpenResume}>
            View resume
          </button>
        </div>
      </div>
    </section>
  );
}

function ResumeModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.body.classList.add("modal-open");
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Resume preview"
      onClick={onClose}
    >
      <div className="modal-content" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="modal-close" onClick={onClose}>
          Close
        </button>
        <iframe
          src="/resume.pdf#toolbar=0&navpanes=0&scrollbar=0"
          title="Resume Preview"
          className="resume-frame"
        />
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <LogoMark className="footer-mark" />
      <div>
        <strong>Bihev Rawal</strong>
        <span>React · Node.js · AWS · Android</span>
      </div>
      <span className="footer-dot" aria-hidden="true">
        ·
      </span>
      <span>Built as a Vite SPA and deployed on Vercel.</span>
    </footer>
  );
}

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false);

  useEffect(() => {
    document.title = "Bihev Rawal | Software Developer";
  }, []);

  return (
    <>
      <div className="site-bg" aria-hidden="true">
        <div className="orb orb-a" />
        <div className="orb orb-b" />
        <div className="orb orb-c" />
        <div className="grid" />
      </div>

      <MascotFigure />

      <Header onOpenResume={() => setResumeOpen(true)} />

      <main className="page-shell">
        <Hero onOpenResume={() => setResumeOpen(true)} />
        <ProjectsSection />
        <ExperienceSection />
        <StackSection />
        <AboutSection />
        <ContactSection onOpenResume={() => setResumeOpen(true)} />
      </main>

      <Footer />

      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </>
  );
}
