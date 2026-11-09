"use client";

import { createElement, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type Kind = "rise" | "rgb" | "line" | "panel";

export default function Reveal({
  as = "div",
  kind = "rise",
  delay = 0,
  className = "",
  children,
}: {
  as?: string;
  kind?: Kind;
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<"idle" | "armed" | "in">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setState("in");
      return;
    }
    setState("armed");
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setState("in");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return createElement(
    as,
    {
      ref,
      className: `rv rv-${kind} ${className}`.trim(),
      "data-rv": state,
      style: { "--d": `${delay}ms` } as CSSProperties,
    },
    children,
  );
}
