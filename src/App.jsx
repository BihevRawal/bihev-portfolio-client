import React, { useEffect, useState } from "react";

const PROOF_POINTS = [
  {
    title: "Property rental platform",
    detail:
      "Built a MERN-stack product that supported thousands of active users with a clean booking and management flow.",
    result: "Scaled to real traffic",
  },
  {
    title: "Mobile-first redesign",
    detail:
      "Reworked the front end in React and improved mobile engagement by 40% through clearer layout and faster interaction.",
    result: "+40% engagement",
  },
  {
    title: "Secure authentication",
    detail:
      "Architected JWT-based login and data encryption to strengthen access control across user roles.",
    result: "Safer user access",
  },
  {
    title: "Delivery automation",
    detail:
      "Established AWS CI/CD pipelines and reduced release friction while keeping uptime above 99%.",
    result: ">99% uptime",
  },
];

const STACK_GROUPS = [
  {
    name: "Front end",
    items: ["React", "JavaScript", "Responsive UI", "Design systems"],
  },
  {
    name: "Back end",
    items: ["Node.js", "Express", "REST APIs", "JWT auth"],
  },
  {
    name: "Cloud & mobile",
    items: ["AWS", "Firebase", "Android", "CI/CD"],
  },
];

const HIGHLIGHTS = [
  "5+ years of delivery",
  "React, Node.js, AWS",
  "Mobile + cloud focus",
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13m0 0-6-6m6 6-6 6" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2l1.9 6.1L20 10l-6.1 1.9L12 18l-1.9-6.1L4 10l6.1-1.9L12 2Z" />
    </svg>
  );
}

function Header({ onOpenResume }) {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Bihev Rawal home">
        <img src="/logo.png" alt="Bihev Rawal logo" className="brand-mark" />
        <span className="brand-text">
          <strong>Bihev Rawal</strong>
          <span>Full-stack developer</span>
        </span>
      </a>

      <nav className="site-nav" aria-label="Primary">
        <a href="#work">Work</a>
        <a href="#stack">Stack</a>
        <a href="#about">About</a>
      </nav>

      <div className="header-actions">
        <button type="button" className="ghost-button" onClick={onOpenResume}>
          Resume
        </button>
        <a href="#contact" className="cta-button">
          Contact
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero-shell" id="top">
      <div className="hero-copy reveal">
        <div className="hero-kicker">Portfolio</div>
        <h1>Building fast, calm, and useful web experiences.</h1>
        <p className="hero-text">
          I’m Bihev Rawal, a full-stack developer focused on React, Node.js,
          AWS, and Android. I design and ship products that feel precise,
          responsive, and ready for real users.
        </p>

        <div className="hero-actions">
          <a href="#work" className="cta-button">
            See recent work
          </a>
          <a href="#contact" className="ghost-button">
            Start a project
          </a>
        </div>

        <div className="hero-highlights" aria-label="Key highlights">
          {HIGHLIGHTS.map((item) => (
            <div key={item} className="highlight-pill">
              <SparkIcon />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <aside className="hero-aside reveal">
        <div className="profile-card">
          <div className="profile-head">
            <img src="/logo.png" alt="" className="profile-mark" />
            <div>
              <p className="profile-name">Bihev Rawal</p>
              <p className="profile-role">Full-stack developer · Brisbane</p>
            </div>
          </div>

          <div className="status-row">
            <span className="status-dot" />
            Open for freelance and product roles
          </div>

          <div className="profile-grid">
            <div>
              <span>Focus</span>
              <strong>React, Node, AWS</strong>
            </div>
            <div>
              <span>Delivery</span>
              <strong>Mobile + cloud systems</strong>
            </div>
            <div>
              <span>Proof</span>
              <strong>40% mobile lift, 25% faster APIs</strong>
            </div>
          </div>

          <div className="code-panel" aria-label="Current focus">
            <div className="code-panel-top">
              <span>Now shipping</span>
              <span className="chip">React / AWS</span>
            </div>
            <pre>{`const focus = [
  "lean interfaces",
  "secure APIs",
  "calm deployment"
];`}</pre>
          </div>
        </div>
      </aside>
    </section>
  );
}

function ProofGrid() {
  return (
    <section id="work" className="content-section">
      <div className="section-heading">
        <p>Selected proof</p>
        <h2>Recent work and outcomes from the resume.</h2>
      </div>

      <div className="proof-grid">
        {PROOF_POINTS.map((item) => (
          <article key={item.title} className="proof-card">
            <span className="proof-index">{item.result}</span>
            <h3>{item.title}</h3>
            <p>{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function StackSection() {
  return (
    <section id="stack" className="content-section stacked">
      <div className="section-heading">
        <p>Stack</p>
        <h2>Tools I reach for when the job needs to ship cleanly.</h2>
      </div>

      <div className="stack-grid">
        {STACK_GROUPS.map((group) => (
          <article key={group.name} className="stack-card">
            <h3>{group.name}</h3>
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
    <section id="about" className="content-section about-grid">
      <div className="about-copy">
        <div className="section-heading">
          <p>About</p>
          <h2>Full-stack work with a bias toward clarity and performance.</h2>
        </div>

        <p>
          My background spans responsive front-end systems, secure back-end
          services, and cloud delivery. I like products where the interface is
          straightforward, the architecture is measurable, and the handoff to
          production feels boring in the best way.
        </p>
      </div>

      <div className="about-panel">
        <div className="about-row">
          <span>Experience</span>
          <strong>5+ years</strong>
        </div>
        <div className="about-row">
          <span>Education</span>
          <strong>Master of IT, Mobile App Development</strong>
        </div>
        <div className="about-row">
          <span>Certification</span>
          <strong>AWS Cloud Practitioner, 2025</strong>
        </div>
        <div className="about-row">
          <span>Working style</span>
          <strong>Lean, collaborative, delivery-focused</strong>
        </div>
      </div>
    </section>
  );
}

function ContactSection({ onOpenResume }) {
  return (
    <section id="contact" className="content-section contact-section">
      <div className="contact-card">
        <div className="section-heading">
          <p>Contact</p>
          <h2>Open to freelance, product teams, and focused builds.</h2>
        </div>

        <p className="contact-text">
          If you need a React front end, a Node API, a deployment pipeline, or a
          mobile-first rebuild, email me or connect on LinkedIn.
        </p>

        <div className="contact-links">
          <a href="mailto:bihevr@gmail.com" className="cta-button">
            Email bihevr@gmail.com
            <ArrowIcon />
          </a>
          <a
            href="https://linkedin.com/in/bihev-rawal"
            target="_blank"
            rel="noreferrer"
            className="ghost-button"
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

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.body.classList.add("modal-open");
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", handleKeyDown);
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
      <span>© 2026 Bihev Rawal</span>
      <span aria-hidden="true">·</span>
      <span>React · Node · AWS</span>
    </footer>
  );
}

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false);

  useEffect(() => {
    document.title = "Bihev Rawal • Portfolio";
  }, []);

  return (
    <>
      <div className="site-bg" aria-hidden="true">
        <div className="orb orb-a" />
        <div className="orb orb-b" />
        <div className="orb orb-c" />
        <div className="grid" />
      </div>

      <Header onOpenResume={() => setResumeOpen(true)} />

      <main className="page-shell">
        <Hero />
        <ProofGrid />
        <StackSection />
        <AboutSection />
        <ContactSection onOpenResume={() => setResumeOpen(true)} />
      </main>

      <Footer />

      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </>
  );
}
