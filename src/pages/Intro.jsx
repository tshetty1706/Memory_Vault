import {React, useState, useEffect, useRef} from 'react'
import {Link} from 'react-router-dom'
import './Intro.css'

const PALETTE = ["#ffffff", "#e8d9ff", "#ffd6f5", "#d4e4ff", "#ffe8c4"];

const ORBIT_CFG = [
  { rxF: 0.26, ryF: 0.09, tilt: -20, spd: 0.00055, n: 3, r: 2.6, col: "#c084fc" },
  { rxF: 0.40, ryF: 0.15, tilt:  14, spd:-0.00038, n: 4, r: 2.1, col: "#f9a8d4" },
  { rxF: 0.58, ryF: 0.21, tilt:  -7, spd: 0.00028, n: 5, r: 1.9, col: "#a5b4fc" },
  { rxF: 0.75, ryF: 0.27, tilt:   5, spd:-0.00018, n: 3, r: 1.4, col: "#99f6e4" },
];

const PILLS = [
  { icon: "🎬", label: "Movies" },
  { icon: "🎵", label: "Music" },
  { icon: "✨", label: "Characters" },
  { icon: "🌿", label: "Hobbies" },
  { icon: "💫", label: "Memories" },
];

const STATS = [
  { num: "12k+", label: "Vaults" },
  { num: "5",    label: "Categories" },
  { num: "∞",    label: "Memories" },
];

/* ── helpers ─────────────────────────────────────────────── */
function generateStars(W, H) {
  return Array.from({ length: 280 }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    r: Math.random() * 1.3 + 0.15,
    alpha: Math.random() * 0.6 + 0.1,
    phase: Math.random() * Math.PI * 2,
    speed: Math.random() * 0.015 + 0.004,
    color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
    isBig: Math.random() < 0.06,
  }));
}

function buildOrbits(W, H) {
  const d = Math.min(W, H);
  return ORBIT_CFG.map((c, i) => ({
    ...c,
    rx: d * c.rxF,
    ry: d * c.ryF,
    beads: Array.from({ length: c.n }, (_, s) => ({
      a: (Math.PI * 2 / c.n) * s + i * 0.8,
    })),
  }));
}

function orbitPt(o, a, cx, cy) {
  const tr = (o.tilt * Math.PI) / 180;
  const ex = o.rx * Math.cos(a);
  const ey = o.ry * Math.sin(a);
  return {
    x: ex * Math.cos(tr) - ey * Math.sin(tr) + cx,
    y: ex * Math.sin(tr) + ey * Math.cos(tr) + cy,
  };
}

function drawCross(ctx, x, y, r) {
  const a = r * 3.5;
  ctx.beginPath();
  ctx.moveTo(x - a, y); ctx.lineTo(x + a, y);
  ctx.moveTo(x, y - a); ctx.lineTo(x, y + a);
  ctx.strokeStyle = ctx.fillStyle;
  ctx.lineWidth = 0.5;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(x, y, r * 0.7, 0, Math.PI * 2);
  ctx.fill();
}

function drawDashedEllipse(ctx, o, cx, cy) {
  ctx.save();
  ctx.strokeStyle = o.col;
  /* slightly increase visibility: raise alpha and lineWidth, tighten dash spacing */
  ctx.globalAlpha = 0.26; // was 0.18
  ctx.lineWidth = 0.8;     // was 0.6
  ctx.setLineDash([2.5, 6]);
  const tr = (o.tilt * Math.PI) / 180;
  ctx.beginPath();
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(tr);
  ctx.scale(1, o.ry / o.rx);
  ctx.arc(0, 0, o.rx, 0, Math.PI * 2);
  ctx.restore();
  ctx.stroke();
  ctx.restore();
  ctx.setLineDash([]);
}

/* ── component ───────────────────────────────────────────── */
export default function Intro() {
  const canvasRef = useRef(null);
  const starsRef  = useRef([]);
  const orbitsRef = useRef([]);
  const shootRef  = useRef([]);
  const rafRef    = useRef(null);

  const [active, setActive] = useState("Music");
  const [hoveredPill, setHoveredPill] = useState(null);
  const [W, setW] = useState(window.innerWidth);
  const [H, setH] = useState(window.innerHeight);

  /* resize */
  useEffect(() => {
    function onResize() {
      const nw = window.innerWidth, nh = window.innerHeight;
      setW(nw); setH(nh);
      if (canvasRef.current) {
        canvasRef.current.width  = nw;
        canvasRef.current.height = nh;
      }
      starsRef.current  = generateStars(nw, nh);
      orbitsRef.current = buildOrbits(nw, nh);
    }
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* animation loop */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    function loop(ts) {
      const cw = canvas.width, ch = canvas.height;
      ctx.clearRect(0, 0, cw, ch);

      /* background */
      const bg = ctx.createLinearGradient(0, 0, 0, ch);
      bg.addColorStop(0, "#05020f");
      bg.addColorStop(1, "#0a0418");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, cw, ch);

      /* stars */
      starsRef.current.forEach((s) => {
        s.phase += s.speed;
        const a = s.alpha * (0.55 + 0.45 * Math.sin(s.phase));
        ctx.save();
        ctx.globalAlpha = a;
        ctx.fillStyle = s.color;
        if (s.isBig) {
          ctx.shadowBlur  = 5;
          ctx.shadowColor = s.color;
          drawCross(ctx, s.x, s.y, s.r);
        } else {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      /* shooting stars */
      if (Math.random() < 0.004) {
        shootRef.current.push({
          x: Math.random() * cw * 0.6 + cw * 0.1,
          y: Math.random() * ch * 0.25,
          vx: 5 + Math.random() * 5,
          vy: 1.8 + Math.random() * 2.2,
          life: 1,
          len: 10 + Math.random() * 10,
        });
      }
      shootRef.current = shootRef.current.filter((s) => s.life > 0);
      shootRef.current.forEach((s) => {
        const grd = ctx.createLinearGradient(
          s.x - s.vx * s.len, s.y - s.vy * s.len, s.x, s.y
        );
        grd.addColorStop(0, "rgba(255,255,255,0)");
        grd.addColorStop(1, `rgba(255,255,255,${s.life * 0.9})`);
        ctx.save();
        ctx.strokeStyle = grd;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(s.x - s.vx * s.len, s.y - s.vy * s.len);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();
        ctx.restore();
        s.x += s.vx; s.y += s.vy; s.life -= 0.028;
      });

      /* orbits */
      const cx = cw / 2, cy = ch / 2;
      orbitsRef.current.forEach((o) => {
        drawDashedEllipse(ctx, o, cx, cy);
        o.beads.forEach((b) => {
          b.a += o.spd;
          const p = orbitPt(o, b.a, cx, cy);
          const flicker = 0.12 + 0.09 * Math.sin(ts * 0.002 + b.a * 4);

          /* glow halo */
          ctx.save();
          ctx.globalAlpha = flicker * 1.2;
          ctx.fillStyle   = o.col;
          ctx.shadowBlur  = 18;
          ctx.shadowColor = o.col;
          ctx.beginPath();
          ctx.arc(p.x, p.y, o.r * 3.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          /* white core */
          ctx.save();
          ctx.globalAlpha = 0.95;
          ctx.fillStyle   = "#fff";
          ctx.shadowBlur  = 4;
          ctx.shadowColor = o.col;
          ctx.beginPath();
          ctx.arc(p.x, p.y, o.r * 0.6, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          /* colored dot */
          ctx.save();
          ctx.globalAlpha = 0.85;
          ctx.fillStyle   = o.col;
          ctx.beginPath();
          ctx.arc(p.x, p.y, o.r, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });
      });

      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div style={S.root}>
      {/* canvas */}
      <canvas ref={canvasRef} style={S.canvas} width={W} height={H} />

      {/* ambient glow orbs */}
      <div style={{ ...S.orb, ...S.orb1 }} />
      <div style={{ ...S.orb, ...S.orb2 }} />

      {/* content */}
      <div style={S.wrapper}>

        <div style={S.badge}>
          <span style={S.badgeDot} />
          Your Personal Cosmos
        </div>

        <h1 style={S.logo}>
          <span style={S.logoPlain}>Memory</span>
          <span style={S.logoItalic}>Vault</span>
        </h1>

        <p style={S.tagline}>Collect the things that make you, you</p>

        <p style={S.desc}>
          <span style={S.em}>Movies that inspired you</span>
          {" · "}Songs you never skip{" · "}
          <span style={S.em}>Characters you love</span>
          {" · "}Hobbies that define your soul
        </p>

        {/* stats */}
        <div style={S.statRow}>
          {STATS.map((st, i) => (
            <div key={st.label} style={S.statGroup}>
              {i > 0 && <div style={S.statDivider} />}
              <div style={S.stat}>
                <span style={S.statNum}>{st.num}</span>
                <span style={S.statLabel}>{st.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* pills */}
        <div style={S.pills}>
          {PILLS.map(({ icon, label }) => (
            <button
              key={label}
              onClick={() => setActive(label)}
              onMouseEnter={() => setHoveredPill(label)}
              onMouseLeave={() => setHoveredPill(null)}
              onFocus={() => setHoveredPill(label)}
              onBlur={() => setHoveredPill(null)}
              aria-pressed={active === label}
              style={{
                ...S.pill,
                ...(hoveredPill === label ? S.pillActive : {}),
              }}
            >
              <span style={{ fontSize: 13 }}>{icon}</span>
              {label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div style={S.ctaWrap}>
            <Link to="/dashboard">
                <button style={S.ctaPrimary}> Enter My Vault </button>
            </Link>
        </div>
      </div>      
    </div>
  );
}

/* ── styles ──────────────────────────────────────────────── */
const S = {
  root: {
    position: "relative",
    minHeight: "100vh",
    background: "#05020f",
    overflow: "hidden",
    fontFamily: "'Inter', sans-serif",
    color: "#fff",
  },
  canvas: {
    position: "fixed",
    top: 0, left: 0,
    width: "100%", height: "100%",
    zIndex: 0,
    display: "block",
  },

  /* ambient orbs */
  orb: {
    position: "fixed",
    borderRadius: "50%",
    pointerEvents: "none",
    zIndex: 1,
    filter: "blur(80px)",
  },
  orb1: {
    width: 420, height: 320,
    background: "rgba(192,132,252,0.07)",
    top: "20%", left: "50%",
    transform: "translate(-50%,-50%)",
  },
  orb2: {
    width: 300, height: 300,
    background: "rgba(249,168,212,0.05)",
    bottom: "20%", right: "10%",
  },

  /* layout */
  wrapper: {
    position: "relative",
    zIndex: 10,
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "0rem 2rem",
  },

  /* badge */
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "rgba(192,132,252,0.08)",
    border: "1px solid rgba(192,132,252,0.25)",
    borderRadius: 100,
    padding: "6px 18px",
    fontSize: 10,
    letterSpacing: "3px",
    textTransform: "uppercase",
    color: "rgba(192,132,252,0.9)",
    marginBottom: "0.2rem",
  },
  badgeDot: {
    display: "inline-block",
    width: 5, height: 5,
    borderRadius: "50%",
    background: "#c084fc",
  },

  /* logo */
  logo: {
    fontSize: "clamp(2.8rem, 8vw, 5rem)",
    lineHeight: 1,
    letterSpacing: "-2px",
    fontWeight: 600,
    marginBottom: "0.1rem",
  },
  logoPlain: {
    color: "#ffffff",
  },
  logoItalic: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontStyle: "italic",
    fontWeight: 400,
    background: "linear-gradient(125deg,#f9a8d4 0%,#c084fc 45%,#818cf8 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },

  tagline: {
    fontSize: 11,
    letterSpacing: "3.5px",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.32)",
    marginBottom: "2rem",
  },
  desc: {
    fontSize: 14,
    lineHeight: 1.8,
    color: "rgba(255,255,255,0.42)",
    maxWidth: 380,
    marginBottom: "2.6rem",
    fontWeight: 300,
  },
  em: { color: "rgba(255,255,255,0.82)" },

  /* stats */
  statRow: {
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
    marginBottom: "2.8rem",
  },
  statGroup: {
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
  },
  stat: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 3,
  },
  statNum: {
    fontSize: 20,
    fontWeight: 600,
    color: "rgba(255,255,255,0.85)",
  },
  statLabel: {
    fontSize: 10,
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.28)",
  },
  statDivider: {
    width: 1,
    height: 30,
    background: "rgba(255,255,255,0.1)",
  },

  /* pills */
  pills: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: "2.8rem",
  },
  pill: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "8px 16px",
    borderRadius: 100,
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.03)",
    fontSize: 12,
    fontWeight: 400,
    color: "rgba(255,255,255,0.55)",
    cursor: "pointer",
    transition: "background-color 180ms ease, color 180ms ease, border-color 180ms ease, box-shadow 180ms ease, transform 180ms ease",
    boxSizing: "border-box",
    fontFamily: "'Inter', sans-serif",
    letterSpacing: "0.2px",
  },
  pillActive: {
    background: "rgba(192,132,252,0.14)",
    border: "rgba(192,132,252,0.45)",
    color: "#e9d5ff",
    boxShadow: "0 8px 18px rgba(192,132,252,0.06)",
    transform: "translateY(-2px)",
  },

  /* CTA */
  ctaWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
  },
  ctaPrimary: {
    padding: "14px 40px",
    fontSize: 11,
    letterSpacing: "3px",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.9)",
    cursor: "pointer",
    background: "rgba(192,132,252,0.1)",
    border: "1px solid rgba(192,132,252,0.4)",
    borderRadius: 3,
    fontFamily: "'Inter', sans-serif",
    fontWeight: 500,
  },
  ctaSecondary: {
    fontSize: 11,
    letterSpacing: "1px",
    color: "rgba(255,255,255,0.25)",
    cursor: "pointer",
    background: "none",
    border: "none",
    fontFamily: "'Inter', sans-serif",
  },

  /* scroll indicator */
  scrollHint: {
    position: "fixed",
    bottom: 28,
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 5,
    zIndex: 20,
  },
  scrollText: {
    fontSize: 9,
    letterSpacing: "2.5px",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.2)",
  },
  scrollLine: {
    width: 1,
    height: 28,
    background: "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)",
  },
};