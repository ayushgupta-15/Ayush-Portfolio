"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "framer-motion";
import Lenis from "lenis";
import StaticChip from "./StaticChip";
import Avatar from "./Avatar";
import Icon from "./Icon";
import { profile } from "@/lib/data";
import { snippets } from "@/lib/snippets";

const World = dynamic(() => import("./scene/World"), { ssr: false });

export const chapters = [
  {
    id: "hardware",
    label: "Hardware",
    module: "Module 01",
    title: "It started with hardware",
    caption: "Writing RTL for CPUs and bus fabrics",
    stats: [
      ["ISA", "RV32I"],
      ["Pipeline", "5 stages"],
      ["Language", "Verilog"],
    ],
    tag: "Silicon first",
    range: [0.34, 0.52] as const,
  },
  {
    id: "systems",
    label: "Systems",
    module: "Module 02",
    title: "Then the layers above it",
    caption: "Kernels, compilers and concurrency",
    stats: [
      ["Scheduler", "O(1)"],
      ["Ports", "Cortex-M4, POSIX"],
      ["Language", "C"],
    ],
    tag: "Close to the metal",
    range: [0.54, 0.72] as const,
  },
  {
    id: "products",
    label: "Products",
    module: "Module 03",
    title: "Now it ships as products",
    caption: "Full-stack and AI applications",
    stats: [
      ["Stack", "Next.js, FastAPI, Go"],
      ["Data", "Postgres, Mongo, Qdrant"],
      ["Live demos", "Noesis, JobForge, TeamSync"],
    ],
    tag: "Built to be used",
    range: [0.74, 0.92] as const,
  },
];

function canUseCinematic() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

function Fade({ p, range, children, className }: { p: MotionValue<number>; range: readonly [number, number]; children: React.ReactNode; className?: string }) {
  const o = useTransform(p, [range[0] - 0.02, range[0] + 0.02, range[1] - 0.02, range[1] + 0.01], [0, 1, 1, 0]);
  return (
    <motion.div className={className} style={{ opacity: o }}>
      {children}
    </motion.div>
  );
}

function Preloader({ done, onFinished }: { done: boolean; onFinished: () => void }) {
  const [n, setN] = useState(0);
  const [gone, setGone] = useState(false);
  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = () => {
      const t = Math.min(1, (performance.now() - start) / 1300);
      const cap = done ? 1 : 0.92;
      setN(Math.round(Math.min(t, cap) * 100));
      if (t < 1 || !done) raf = requestAnimationFrame(tick);
      else {
        setTimeout(() => setGone(true), 250);
        setTimeout(onFinished, 900);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [done, onFinished]);
  return (
    <div className={`preloader${gone ? " preloader-out" : ""}`} role="status" aria-live="polite">
      <svg viewBox="0 0 200 200" className="preloader-ring" aria-hidden>
        <circle cx="100" cy="100" r="94" fill="none" stroke="rgba(232,238,248,.18)" strokeWidth="1" />
        <circle cx="100" cy="100" r="94" fill="none" stroke="#22C7E8" strokeWidth="1.5" strokeDasharray={2 * Math.PI * 94} strokeDashoffset={2 * Math.PI * 94 * (1 - n / 100)} transform="rotate(-90 100 100)" />
      </svg>
      <Avatar size={92} className="preloader-mark" />
      <p className="preloader-status">
        <span>[loading]</span>
        <span>{n}%</span>
      </p>
    </div>
  );
}

function Cinematic({ lite }: { lite: boolean }) {
  const story = useRef<HTMLElement>(null);
  const lenis = useRef<Lenis | null>(null);
  const [ready, setReady] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [active, setActive] = useState(true);
  const [chapter, setChapter] = useState(-1);
  const { scrollYProgress } = useScroll({ target: story, offset: ["start start", "end end"] });

  useEffect(() => {
    const l = new Lenis({ lerp: 0.09, smoothWheel: true, anchors: true });
    lenis.current = l;
    let raf = 0;
    const loop = (t: number) => {
      l.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    l.stop();
    return () => {
      cancelAnimationFrame(raf);
      l.destroy();
    };
  }, []);

  useEffect(() => {
    if (loaded) lenis.current?.start();
  }, [loaded]);

  useEffect(() => {
    const el = story.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { rootMargin: "200px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const i = chapters.findIndex((c) => p >= c.range[0] - 0.02 && p <= c.range[1] + 0.01);
    setChapter((prev) => (prev === i ? prev : i));
  });

  const skip = useCallback(() => {
    lenis.current?.scrollTo("#experience", { duration: 2.4 });
  }, []);

  const onReady = useCallback(() => setReady(true), []);
  const onFinished = useCallback(() => setLoaded(true), []);

  const heroOpacity = useTransform(scrollYProgress, [0, 0.07, 0.13], [1, 1, 0]);
  const flash = useTransform(scrollYProgress, [0.2, 0.275, 0.33], [0, 1, 0]);
  const outro = useTransform(scrollYProgress, [0.92, 0.95, 1], [0, 1, 1]);
  const hint = useTransform(scrollYProgress, [0, 0.04], [1, 0]);
  const hudOpacity = useTransform(scrollYProgress, [0.3, 0.34, 0.95, 1], [0, 1, 1, 0]);

  return (
    <>
      {!loaded && <Preloader done={ready} onFinished={onFinished} />}
      <section ref={story} className={`story${lite ? " story-lite" : ""}`} id="top" aria-label="Introduction">
        <div className="stage">
          <div className="stage-canvas">
            <World progress={scrollYProgress} active={active} onReady={onReady} lite={lite} />
          </div>

          <div className="hud">
            <a className="hud-brand" href="#top" aria-label="Ayush Gupta, top of page">
              <Avatar size={34} className="hud-mark" />
              <span>Ayush Gupta</span>
            </a>
            <button type="button" className="hud-skip" onClick={skip}>
              Skip to work
            </button>

            <motion.div className="hero-copy-3d" style={{ opacity: heroOpacity }}>
              <h1>
                I build software, from web products down to kernels and chips.
              </h1>
              <p>
                Software engineer in the final year of an ECE degree at DTU. Full-stack and AI products, with a
                background in RTL, firmware and compilers.
              </p>
            </motion.div>
            <motion.p className="scroll-hint" style={{ opacity: hint }}>
              Scroll to dive in
            </motion.p>

            <motion.div className="hud-layer" style={{ opacity: hudOpacity }}>
              <p className="queue-title">Layers:</p>
              <ul className="queue">
                {chapters.map((c, i) => (
                  <li key={c.id} className={chapter === i ? "on" : ""}>
                    {c.label}
                  </li>
                ))}
              </ul>
            </motion.div>

            {chapters.map((c, i) => (
              <div key={c.id}>
                <Fade p={scrollYProgress} range={c.range} className="chapter-title">
                  <h2>{c.title}</h2>
                </Fade>
                <Fade p={scrollYProgress} range={c.range} className="hud-stats">
                  {c.stats.map(([k, v]) => (
                    <div key={k}>
                      <span>{k}</span>
                      <b>{v}</b>
                    </div>
                  ))}
                </Fade>
                <Fade p={scrollYProgress} range={c.range} className="hud-module">
                  <span>{c.module}</span>
                  <b>{c.caption}</b>
                </Fade>
                <Fade p={scrollYProgress} range={c.range} className="hud-tag">
                  {c.tag}
                </Fade>
              </div>
            ))}

            <motion.div className="outro" style={{ opacity: outro }}>
              <p>Experience and projects follow</p>
              <button type="button" className="btn btn-primary" onClick={skip}>
                See my work
              </button>
            </motion.div>

            <motion.div className="flash" style={{ opacity: flash }} aria-hidden />
          </div>
        </div>
      </section>
    </>
  );
}

function StaticIntro() {
  return (
    <header className="hero" id="top">
      <div className="hero-sticky">
        <div className="hero-visual">
          <StaticChip />
        </div>
        <div className="wrap hero-copy">
          <p className="hero-name">{profile.name}</p>
          <h1>I build software, from web products down to kernels and chips.</h1>
          <p className="lede">
            Software engineer in the final year of an ECE degree at DTU. I build full-stack and AI products, and I work
            comfortably close to the hardware: kernels, compilers, concurrency and RTL.
          </p>
          <nav className="hero-links" aria-label="Primary">
            <a className="btn btn-primary" href="#experience">See my work <Icon name="arrow" /></a>
            <a className="btn" href={`mailto:${profile.email}`}><Icon name="mail" /> Email me</a>
            <a className="btn" href={profile.github} target="_blank" rel="noreferrer"><Icon name="github" /> GitHub</a>
          </nav>
        </div>
      </div>
      <div className="wrap static-chapters">
        {chapters.map((c) => (
          <article key={c.id}>
            <h2>{c.title}</h2>
            <p>{c.caption}</p>
            {snippets
              .filter((s) => s.chapter === chapters.indexOf(c) + 1)
              .slice(0, 1)
              .map((s) => (
                <figure key={s.id}>
                  <pre><code>{s.code}</code></pre>
                  <figcaption>{s.file}, from {s.repo}</figcaption>
                </figure>
              ))}
          </article>
        ))}
      </div>
    </header>
  );
}

export default function Experience() {
  const [mode, setMode] = useState<"static" | "cinematic" | "lite">("static");
  useEffect(() => {
    if (!canUseCinematic()) return setMode("static");
    const small = window.matchMedia("(max-width: 959px)").matches || window.matchMedia("(pointer: coarse)").matches;
    setMode(small ? "lite" : "cinematic");
  }, []);
  if (mode === "static") return <StaticIntro />;
  return <Cinematic lite={mode === "lite"} />;
}
