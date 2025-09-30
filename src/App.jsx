import React, { useEffect, useMemo, useRef, useState } from "react";

/* -------------------- tiny utils -------------------- */
const faviconFor = (url) => {
  try {
    const { hostname } = new URL(url);
    return `https://icons.duckduckgo.com/ip3/${hostname}.ico`;
  } catch {
    return "";
  }
};
const host = (url) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
};

/* -------------------- hooks -------------------- */
function useTypewriter(words, speed = 70) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [j, setJ] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    if (!words?.length) return;
    const w = words[i % words.length];
    const t = setTimeout(() => {
      setText(del ? w.slice(0, j - 1) : w.slice(0, j + 1));
      if (!del && j >= w.length + 2) setDel(true);
      if (del && j <= 0) {
        setDel(false);
        setI((p) => p + 1);
      }
      if (del) setJ((p) => p - 1);
      else setJ((p) => p + 1);
    }, del ? speed * 0.6 : speed);
    return () => clearTimeout(t);
  }, [words, i, j, del, speed]);

  return text;
}

function useReveal(ref, threshold = 0.2) {
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold]);
}

function useTilt(ref, max = 8) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    function onMove(e) {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const rx = ((y / r.height) - 0.5) * -2 * max;
      const ry = ((x / r.width) - 0.5) * 2 * max;
      el.style.setProperty("--rx", rx.toFixed(2) + "deg");
      el.style.setProperty("--ry", ry.toFixed(2) + "deg");
    }
    function onLeave() {
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    }
    el.addEventListener("mousemove", onMove, { passive: true });
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [ref, max]);
}

/* -------------------- data (edit freely) -------------------- */
/* If you have no real projects yet, leave this EMPTY. */
const PROJECTS = [
  // 👉 When ready, add objects like:
  // { title: "Gymscout", description: "...", link: "https://...", image: "https://..." }
];

/* -------------------- placeholder components -------------------- */
function PlaceholderCard({ title, blurb }) {
  return (
    <div className="project-card placeholder reveal">
      <div className="thumb">
        <div className="skeleton media" />
        <div className="ribbon">Coming Soon</div>
      </div>
      <div className="content">
        <h3>{title}</h3>
        <p>{blurb}</p>
        <div className="chip-row">
          <span className="chip">React</span>
          <span className="chip">Node</span>
          <span className="chip">AWS</span>
        </div>
      </div>
    </div>
  );
}

function EmptyProjects() {
  return (
    <>
      <div className="empty-intro card reveal in">
        <h3>Case studies in progress</h3>
        <p className="muted">
          I’m polishing write-ups and code samples. Meanwhile, here’s a preview
          of the kind of work I do.
        </p>
      </div>

      {/* <div className="project-grid">
        <PlaceholderCard
          title="Performance Makeover"
          blurb="Turn a sluggish React app into a 95+ Lighthouse score with code-splitting, image optimization, and memoization."
        />
        <PlaceholderCard
          title="API + Auth Starter"
          blurb="A clean Node/Express + JWT template with role-based access and CI/CD to AWS."
        />
      </div> */}

      <div className="skills-and-services">
        <div className="card mini reveal in">
          <h4>What I do</h4>
          <ul className="tick">
            <li>Full-stack web apps (React, Node)</li>
            <li>Deployments on AWS / Vercel</li>
            <li>UI clones & performance tuning</li>
          </ul>
        </div>
        <div className="card mini reveal in">
          <h4>Tech I use</h4>
          <div className="badges">
            <span>React</span><span>Vite</span><span>Node</span>
            <span>Express</span><span>AWS</span><span>MongoDB</span>
            <span>GitHub Actions</span>
          </div>
        </div>
        <div className="card mini reveal in">
          <h4>Want a demo?</h4>
          <p className="muted">I can spin up a quick feature demo tailored to your use-case.</p>
          <a href="#contact" className="btn -primary">Get in touch</a>
        </div>
      </div>
    </>
  );
}

/* -------------------- project card (for real items) -------------------- */
function ProjectCard({ p }) {
  const ref = useRef(null);
  useReveal(ref);
  useTilt(ref);

  const isImage = Boolean(p.image);
  const href = p.link || p.url || "#";

  return (
    <a
      ref={ref}
      className="project-card reveal"
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      <div className={`thumb ${isImage ? "" : "url-card"}`}>
        {isImage ? (
          <img src={p.image} alt={`${p.title} preview`} loading="lazy" />
        ) : (
          <>
            <img
              className="favicon"
              src={faviconFor(href)}
              alt=""
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
            <div className="url-lines">
              <span className="u1">{host(href)}</span>
              <span className="u2">{href}</span>
            </div>
          </>
        )}
      </div>
      <div className="content">
        <h3>{p.title}</h3>
        <p>{p.description}</p>
      </div>
    </a>
  );
}

/* -------------------- hero -------------------- */
function Hero() {
  const words = useMemo(
    () => ["Full-Stack Dev", "React + Node", "AWS + CI/CD", "Mobile & Cloud"],
    []
  );
  const typed = useTypewriter(words, 70);

  return (
    <section className="hero">
      <h1>
        Building <span className="gradient-text">fast</span>, delightful
        experiences for the web
      </h1>
      <p className="subtitle">
        <span className="typed">{typed}</span>
      </p>
      <div className="cta-row">
        <a href="#projects" className="btn -primary">See Projects</a>
        <a href="#contact" className="btn -ghost">Get in touch</a>
      </div>
      <div className="hero-stats">
  <div className="kpi">
    <span className="kpi-icon">⏳</span>
    <strong>2+</strong>
    <span>Years Experience</span>
  </div>
  <div className="kpi">
    <span className="kpi-icon">⚡</span>
    <strong>40%</strong>
    <span>Higher Engagement</span>
  </div>
  <div className="kpi">
    <span className="kpi-icon">🚀</span>
    <strong>25%</strong>
    <span>Less Latency</span>
  </div>
</div>
      
    </section>
  );
}

/* -------------------- header -------------------- */
function Header() {
  const [showResume, setShowResume] = useState(false);

  // Prevent background scroll when modal is open + close on Esc
  useEffect(() => {
    if (showResume) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    const onKey = (e) => e.key === "Escape" && setShowResume(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [showResume]);

  return (
    <header className="site-header">
      <div className="brand">
        <img src="/logo.png" alt="BSR Logo" className="logo-img" />
        <span className="name">Bihev Rawal</span>
      </div>

      <div className="nav-center">
        <button
          type="button"
          onClick={() => setShowResume(true)}
          className="center-badge center-badge-btn"
          aria-haspopup="dialog"
          aria-controls="resume-modal"
          aria-label="Open resume preview"
        >
          <span className="pulse-dot" />
          <span className="center-text">Resume</span>
          <span className="download-icon" aria-hidden="true">👁</span>
          <span className="shine" aria-hidden="true" />
        </button>
      </div>

      <nav className="nav">
        <a href="#projects">Projects</a>
        <a href="#about">About</a>
        <a href="#contact" className="btn -primary">Contact</a>
      </nav>

      {/* Centered, contained modal */}
      {showResume && (
        <div
          id="resume-modal"
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Resume preview"
          onClick={() => setShowResume(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setShowResume(false)}
              aria-label="Close resume preview"
            >
              ✖
            </button>

            {/* View-only PDF (hide default toolbar where supported) */}
            <iframe
              // The hash params hide Chrome/Edge toolbar; still view-only.
              src="/resume.pdf#toolbar=0&navpanes=0&scrollbar=0"
              title="Resume Preview"
              className="resume-frame"
            />
          </div>
        </div>
      )}
    </header>
  );
}

/* -------------------- footer -------------------- */
function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <span>© {year} Bihev Rawal</span>
      <span className="dots" aria-hidden="true">• • •</span>
      <span>Built with Power of Caffeine</span>
    </footer>
  );
}

/* -------------------- app -------------------- */
export default function App() {
  useEffect(() => {
    document.title = "Bihev • Portfolio";
  }, []);

  return (
    <>
      {/* animated background */}
      <div className="bg">
        <div className="blob b1" />
        <div className="blob b2" />
        <div className="grid-overlay" />
      </div>

      <Header />

      <main>
        <Hero />

        <section id="projects" className="section">
          <div className="section-head">
            <h2>Featured Projects</h2>
            <p className="muted">
              {PROJECTS.length
                ? "Hand-picked work and experiments."
                : "A curated preview while full case studies are being prepared."}
            </p>
          </div>

          {PROJECTS.length ? (
            <div className="project-grid">
              {PROJECTS.map((p, i) => (
                <ProjectCard p={p} key={i} />
              ))}
            </div>
          ) : (
            <EmptyProjects />
          )}
        </section>

        <section id="about" className="section about">
          <h2>About</h2>
          <p>
            I’m <strong>Bihev Rawal</strong>, a full-stack developer who blends
            creativity with code to build fast, scalable, and delightful digital
            experiences. Always learning, always shipping.
          </p>
        </section>

        <section id="contact" className="section contact">
  <h2>Contact</h2>
  <div className="card contact-card">
    <p className="headline"><strong>Let’s build something amazing together!</strong></p>
    <div className="contact-item">
      <span className="icon">📧</span>
      <a href="mailto:bihevr@gmail.com">bihevr@gmail.com</a>
    </div>
    <div className="contact-item">
      <span className="icon">💼</span>
      <a
        href="https://linkedin.com/in/bihev-rawal"
        target="_blank"
        rel="noreferrer"
      >
        linkedin.com/in/bihev-rawal
      </a>
    </div>
    <div className="cta">
      <a href="mailto:bihevr@gmail.com" className="btn -primary">Email Me</a>
      <a
        href="https://linkedin.com/in/bihev-rawal"
        target="_blank"
        rel="noreferrer"
        className="btn -ghost"
      >
        Connect on LinkedIn
      </a>
    </div>
  </div>
</section>

      </main>

      <Footer />
    </>
  );
}
