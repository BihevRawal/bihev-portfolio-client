import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_LOG_API; // set on Vercel later

export default function App() {
  const [logged, setLogged] = useState(false);

  // fire-and-forget visitor log (don’t block page)
  useEffect(() => {
    if (!API_BASE) return;
    fetch(`${API_BASE}/log`, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ event: "visit" }),
      keepalive: true, // helps on tab close
    }).then(() => setLogged(true)).catch(() => {});
  }, []);

  return (
    <main style={{maxWidth: 860, margin: "0 auto", padding: "48px 24px", fontFamily: "system-ui, sans-serif"}}>
      <header style={{display:"flex", alignItems:"center", gap:16}}>
        <img src="/avatar.png" alt="Your photo" width="72" height="72" style={{borderRadius: "50%"}} />
        <div>
          <h1 style={{margin:"0 0 4px"}}>Bihev Singh Rawal</h1>
          <p style={{margin:0, opacity:.75}}>Full-Stack Developer • React • Node • AWS</p>
        </div>
      </header>

      <section style={{marginTop:32}}>
        <h2>About</h2>
        <p>
          The whole portfolio is on test mode. Even this about section. THANK YOU!!!
        </p>
      </section>

      <section style={{marginTop:24}}>
        <h2>Projects</h2>
        <ul>
          <li><strong>Project A:</strong> Short one-liner about impact.</li>
          <li><strong>Project B:</strong> Short one-liner about impact.</li>
          <li><strong>Project C:</strong> Short one-liner about impact.</li>
        </ul>
      </section>

      <section style={{marginTop:24}}>
        <h2>Contact</h2>
        <p>
          <a href="mailto:bihevr@gmail.com">bihevr@gmail.com</a> ·
          <a style={{marginLeft:12}} href="https://linkedin.com/in/bihev-rawal" target="_blank">LinkedIn</a> ·
          <a style={{marginLeft:12}} href="https://github.com/YOUR_GH" target="_blank">GitHub</a>
        </p>
      </section>

      <footer style={{marginTop:40, opacity:.6, fontSize:14}}>
        {logged ? "Thanks for visiting 🙌" : "Loading…"}
      </footer>
    </main>
  );
}