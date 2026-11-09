"use client";

import { useEffect, useRef } from "react";

type Star = { x: number; y: number; z: number; tw: number; hue: number };

/** Lightweight 2D star field behind the lower sections. Continues the intro's space. */
export default function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0;
    let h = 0;
    let stars: Star[] = [];
    let raf = 0;
    let visible = true;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = w < 700 ? 70 : 150;
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: 0.2 + Math.random() * 0.8,
        tw: Math.random() * 6.28,
        hue: Math.random(),
      }));
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const sy = window.scrollY;
      for (const s of stars) {
        const y = (((s.y - sy * 0.25 * s.z - t * 0.004 * s.z) % h) + h) % h;
        const a = 0.55 + 0.4 * Math.sin(t * 0.0012 + s.tw);
        const r = 0.5 + s.z * 1.1;
        const col = s.hue < 0.6 ? "207,232,255" : s.hue < 0.85 ? "34,199,232" : "139,92,246";
        ctx.fillStyle = `rgba(${col},${a * s.z})`;
        ctx.fillRect(s.x, y, r, r);
        if (s.z > 0.8) {
          ctx.fillStyle = `rgba(255,80,110,${a * 0.35})`;
          ctx.fillRect(s.x - 1.2, y, r, r);
          ctx.fillStyle = `rgba(34,199,232,${a * 0.35})`;
          ctx.fillRect(s.x + 1.2, y, r, r);
        }
      }
    };

    const loop = (t: number) => {
      if (visible) draw(t);
      raf = requestAnimationFrame(loop);
    };

    resize();
    draw(0);
    window.addEventListener("resize", resize);
    const onVis = () => {
      visible = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVis);
    if (!reduce) raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} className="starfield" aria-hidden />;
}
