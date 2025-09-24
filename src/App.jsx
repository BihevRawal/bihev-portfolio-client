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
      // update j last to avoid flicker
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
            io.unobserve(el);
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
const PROJECTS = [
  {
    title: "Gymscout",
    description: "Find nearby gyms with live crowd levels.",
    image:
      "data:image/svg+xml;utf8," +
      encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='630'>
          <defs><linearGradient id='g' x1='0' x2='1'>
            <stop stop-color='#7C3AED'/><stop offset='1' stop-color='#22D3EE'/>
          </linearGradient></defs>
          <rect fill='url(#g)' width='100%' height='100%'/>
          <text x='50%' y='52%' text-anchor='middle' fill='white' font-size='64' font-family='Inter, sans-serif'>Gymscout</text>
        </svg>`
      ),
    link: "https://example.com/gymscout",
  },
  {
    title: "TaskForge",
    description: "Hotkey-first task manager with offline sync.",
    image:
      "data:image/svg+xml;utf8," +
      encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='630'>
          <defs><linearGradient id='g' x1='0' x2='1'>
            <stop stop-color='#06B6D4'/><stop offset='1' stop-color='#16A34A'/>
          </linearGradient></defs>
          <rect fill='url(#g)' width='100%' height='100%'/>
          <text x='50%' y='52%' text-anchor='middle' fill='white' font-size='64' font-family='Inter, sans-serif'>TaskForge</text>
        </svg>`
      ),
    link: "https://example.com/taskforge",
  },
  {
    title: "AWS Notes",
    description: "Cheatsheets for Lambda, API Gateway & SAM.",
    url: "https://portfolio-bihev.com/aws-notes",
  },
  {
    title: "TechnologyOne UI",
    description: "UI clone & a11y audit. Lighthouse perf 98.",
    url: "https://example.com/techone-ui",
  },
];

/* -------------------- components -------------------- */
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
        <a href="#projects" className="btn -primary">
          See Projects
        </a>
        <a href="#contact" className="btn -ghost">
          Get in touch
        </a>
      </div>
      <div className="hero-stats">
        <div className="kpi">
          <strong>2+</strong>
          <span>Years</span>
        </div>
        <div className="kpi">
          <strong>40%</strong>
          <span>More Engagement</span>
        </div>
        <div className="kpi">
          <strong>25%</strong>
          <span>Less Latency</span>
        </div>
      </div>
    </section>
  );
}

function Header() {
  return (
    <header className="site-header">
      <div className="brand">
        <span className="logo">BR</span>
        <span className="name">Bihev Rawal</span>
      </div>
      <nav className="nav">
        <a href="#projects">Projects</a>
        <a href="#about">About</a>
        <a href="#contact" className="btn -primary">
          Contact
        </a>
      </nav>
    </header>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <span>© {year} Bihev Rawal</span>
      <span className="dots" aria-hidden="true">
        • • •
      </span>
      <span>Built with love and caffeine</span>
    </footer>
  );
}

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
              Add preview images or just URLs — update the array in{" "}
              <code>App.jsx</code>.
            </p>
          </div>
          <div className="project-grid">
            {PROJECTS.map((p, i) => (
              <ProjectCard p={p} key={i} />
            ))}
          </div>
        </section>

        <section id="about" className="section about">
          <h2>About</h2>
          <p>
            I craft robust, scalable apps with React, Node.js, and AWS. I care
            about clean UX, performance budgets, and shipping business value.
            When I’m not pushing code, I’m pushing weight at the gym 🏋🏽‍♂️.
          </p>
        </section>

        <section id="contact" className="section contact">
          <h2>Contact</h2>
          <div className="card contact-card">
            <p>
              <strong>Let’s build something!</strong>
            </p>
            <p>
              Email: <a href="mailto:bihevr@gmail.com">bihevr@gmail.com</a>
            </p>
            <p>
              LinkedIn:{" "}
              <a
                href="https://linkedin.com/in/bihev-rawal"
                target="_blank"
                rel="noreferrer"
              >
                /in/bihev-rawal
              </a>
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
