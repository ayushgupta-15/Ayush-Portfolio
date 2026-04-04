"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Phases: booting → done
// booting: black screen with Apple logo + growing progress bar
// done: fade out → desktop visible

const BOOT_DURATION = 2800; // ms total for the progress bar to fill
const FADE_DURATION = 600;  // ms for the fade-out

export default function BootScreen({ onDone }: { onDone: () => void }) {
    const [progress, setProgress] = useState(0);
    const [fading, setFading]     = useState(false);

    useEffect(() => {
        // Smoothly animate the progress bar from 0 → 100 over BOOT_DURATION
        const start = performance.now();

        const tick = (now: number) => {
            const elapsed = now - start;
            const pct = Math.min(elapsed / BOOT_DURATION, 1);

            // Ease-in-out curve: feels more realistic
            const eased = pct < 0.5
                ? 2 * pct * pct
                : -1 + (4 - 2 * pct) * pct;

            setProgress(Math.round(eased * 100));

            if (pct < 1) {
                requestAnimationFrame(tick);
            } else {
                // Start fade out
                setFading(true);
                setTimeout(onDone, FADE_DURATION);
            }
        };

        const raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [onDone]);

    return (
        <AnimatePresence>
            {!fading ? (
                <motion.div
                    key="boot"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: FADE_DURATION / 1000, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
                >
                    {/* Apple Logo SVG */}
                    <motion.svg
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 814 1000"
                        className="w-20 h-20 text-white fill-current mb-14"
                        aria-label="Apple logo"
                    >
                        <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.3-155.5-127.4C46.7 790.7 0 663 0 541.8c0-207.5 135.4-317.3 269-317.3 70.1 0 128.4 46.4 172.5 46.4 42.8 0 109.6-49 192.7-49 31.3 0 108.2 2.6 168.6 73.3zm-174.3-71.6c35.1-40.8 59.7-97.7 59.7-154.6 0-7.8-.6-15.6-1.9-22.4-56.5 2-123.1 37.9-163.4 81.9-31.3 35.1-59.7 91.4-59.7 148.9 0 8.4 1.3 16.8 1.9 19.4 3.2.6 8.4 1.3 13.6 1.3 50.9 0 112.7-33.8 149.8-74.5z" />
                    </motion.svg>

                    {/* Progress bar */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.4 }}
                        className="w-48 h-[3px] rounded-full bg-white/20 overflow-hidden"
                    >
                        <div
                            className="h-full bg-white rounded-full transition-none"
                            style={{ width: `${progress}%` }}
                        />
                    </motion.div>
                </motion.div>
            ) : (
                <motion.div
                    key="fade"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: FADE_DURATION / 1000, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] bg-black pointer-events-none"
                />
            )}
        </AnimatePresence>
    );
}
