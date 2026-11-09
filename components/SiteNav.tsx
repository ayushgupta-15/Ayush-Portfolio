"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Avatar from "./Avatar";

const links = [
  ["Experience", "#experience"],
  ["Work", "#work"],
  ["About", "#about"],
  ["Contact", "#contact"],
] as const;

export default function SiteNav() {
  const [show, setShow] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });

  useEffect(() => {
    const check = () => {
      const w = document.getElementById("experience");
      if (!w) return;
      setShow(w.getBoundingClientRect().top < window.innerHeight * 0.55);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  return (
    <nav className={`sitenav${show ? " sitenav-on" : ""}`} aria-label="Site">
      <a className="sitenav-brand" href="#top" aria-label="Ayush Gupta, back to top">
        <Avatar size={30} />
        <span>Ayush Gupta</span>
      </a>
      <ul>
        {links.map(([label, href]) => (
          <li key={href}>
            <a href={href}>{label}</a>
          </li>
        ))}
      </ul>
      <motion.div className="sitenav-progress" style={{ scaleX }} />
    </nav>
  );
}
