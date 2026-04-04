"use client";

import useAppStore from "@/store";
import clsx from "clsx";
import { WifiOff, Wifi, WifiLow } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useSoundEffect from "@useverse/usesoundeffect";
import { useOnlineStatus } from "@/util/Hooks/useOnlineStatus";

// ── Apple SVG Logo ──────────────────────────────────────────────────────────
function AppleLogo({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 814 1000"
            fill="currentColor"
        >
            <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.5 135.4-317.3 269-317.3 71 0 130.5 46.4 171.5 46.4 39.5 0 101.1-49 176.3-49 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" />
        </svg>
    );
}

// ── Dropdown menu types ─────────────────────────────────────────────────────
type MenuItem = { label: string; href?: string; divider?: boolean; disabled?: boolean };

const MENUS: { title: string; items: MenuItem[] }[] = [
    {
        title: "Finder",
        items: [
            { label: "About This Portfolio" },
            { divider: true, label: "" },
            { label: "Open Terminal", href: "#terminal" },
            { label: "Open Finder", href: "#finder" },
            { divider: true, label: "" },
            { label: "Contact Me", href: "mailto:ayushgupta.professional@gmail.com" },
        ],
    },
    {
        title: "File",
        items: [
            { label: "View Resume", href: "/resume/tech/Ayush_Gupta_Resume.pdf" },
            { label: "Download Resume", href: "/resume/tech/Ayush_Gupta_Resume.pdf" },
        ],
    },
    {
        title: "Go",
        items: [
            { label: "GitHub", href: "https://github.com/ayushgupta-15" },
            { label: "LinkedIn", href: "https://www.linkedin.com/in/ayush-gupta-" },
            { label: "Email", href: "mailto:ayushgupta.professional@gmail.com" },
        ],
    },
    {
        title: "Help",
        items: [
            { label: "Keyboard Shortcuts", disabled: true },
            { divider: true, label: "" },
            { label: "Source Code", href: "https://github.com/ayushgupta-15/Portfolio" },
        ],
    },
];

// ── Dropdown Component ──────────────────────────────────────────────────────
function Dropdown({
    items,
    onClose,
}: {
    items: MenuItem[];
    onClose: () => void;
}) {
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: -4, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.97 }}
                transition={{ duration: 0.12 }}
                className="absolute top-full left-0 mt-1 min-w-[180px] rounded-lg overflow-hidden shadow-2xl z-50"
                style={{
                    background: "rgba(30,30,30,0.85)",
                    backdropFilter: "blur(24px)",
                    WebkitBackdropFilter: "blur(24px)",
                    border: "1px solid rgba(255,255,255,0.12)",
                }}
            >
                {items.map((item, i) =>
                    item.divider ? (
                        <div key={i} className="h-[1px] bg-white/10 my-0.5" />
                    ) : item.href ? (
                        <Link
                            key={i}
                            href={item.href}
                            target={item.href.startsWith("http") ? "_blank" : "_self"}
                            rel="noopener noreferrer"
                            onClick={onClose}
                            className="block px-4 py-1.5 text-[13px] text-white/90 hover:bg-blue-500/80 transition-colors duration-100 cursor-default"
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <div
                            key={i}
                            onClick={onClose}
                            className={clsx(
                                "px-4 py-1.5 text-[13px] text-white/90 cursor-default",
                                item.disabled ? "opacity-40" : "hover:bg-blue-500/80 transition-colors duration-100"
                            )}
                        >
                            {item.label}
                        </div>
                    )
                )}
            </motion.div>
        </AnimatePresence>
    );
}

// ── Main Header ─────────────────────────────────────────────────────────────
export default function Header() {
    const clickSound = useSoundEffect("/audio/mouse-click.mp3", { volume: 0.4 });

    const { timeFormat } = useAppStore();
    const { connectionStatus, isChecking, refresh } = useOnlineStatus();

    const [time, setTime] = useState(() =>
        new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: timeFormat === "12",
        })
    );

    // Live clock
    useEffect(() => {
        const tick = () =>
            setTime(
                new Date().toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: timeFormat === "12",
                })
            );
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, [timeFormat]);

    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const [appleOpen, setAppleOpen] = useState(false);
    const barRef = useRef<HTMLDivElement>(null);

    // Close menus on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (barRef.current && !barRef.current.contains(e.target as Node)) {
                setOpenMenu(null);
                setAppleOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const toggleMenu = (title: string) => {
        setAppleOpen(false);
        setOpenMenu((prev) => (prev === title ? null : title));
        clickSound.play();
    };

    const dateStr = new Date().toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
    });

    return (
        <motion.div
            ref={barRef}
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed top-0 left-0 z-[999] w-[100dvw] select-none"
            style={{
                background: "rgba(24,24,27,0.72)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderBottom: "1px solid rgba(255,255,255,0.10)",
            }}
        >
            <div className="flex items-center justify-between px-3 h-8">
                {/* ── LEFT: Apple + menus ── */}
                <div className="flex items-center h-full">
                    {/* Apple logo */}
                    <div className="relative h-full flex items-center">
                        <button
                            onClick={() => {
                                setAppleOpen((p) => !p);
                                setOpenMenu(null);
                                clickSound.play();
                            }}
                            className={clsx(
                                "flex items-center justify-center px-3 h-full rounded-[4px] transition-colors duration-100",
                                appleOpen ? "bg-white/15" : "hover:bg-white/10"
                            )}
                        >
                            <AppleLogo className="w-[14px] h-[14px] text-white" />
                        </button>
                        {appleOpen && (
                            <Dropdown
                                items={[
                                    { label: "About This Portfolio" },
                                    { divider: true, label: "" },
                                    { label: "View Resume", href: "/resume/tech/Ayush_Gupta_Resume.pdf" },
                                    { label: "GitHub", href: "https://github.com/ayushgupta-15" },
                                    { label: "LinkedIn", href: "https://www.linkedin.com/in/ayush-gupta-" },
                                    { divider: true, label: "" },
                                    { label: "Email Me", href: "mailto:ayushgupta.professional@gmail.com" },
                                ]}
                                onClose={() => setAppleOpen(false)}
                            />
                        )}
                    </div>

                    {/* Menu items */}
                    {MENUS.map((menu) => (
                        <div key={menu.title} className="relative h-full flex items-center">
                            <button
                                onClick={() => toggleMenu(menu.title)}
                                className={clsx(
                                    "flex items-center px-3 h-full text-[13px] font-medium text-white rounded-[4px] transition-colors duration-100",
                                    menu.title === "Finder" ? "font-semibold" : "font-normal",
                                    openMenu === menu.title ? "bg-white/15" : "hover:bg-white/10"
                                )}
                            >
                                {menu.title}
                            </button>
                            {openMenu === menu.title && (
                                <Dropdown
                                    items={menu.items}
                                    onClose={() => setOpenMenu(null)}
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* ── RIGHT: status icons ── */}
                <div className="flex items-center gap-3 h-full pr-1">
                    {/* Wifi */}
                    <button
                        onClick={() => { refresh(); clickSound.play(); }}
                        title={`Connection: ${connectionStatus}${isChecking ? " (checking…)" : ""} — click to refresh`}
                        className={clsx(
                            "flex items-center justify-center px-1 h-full hover:bg-white/10 rounded-[4px] transition-colors duration-100",
                            isChecking && "animate-pulse"
                        )}
                    >
                        {connectionStatus === "online" ? (
                            <Wifi size={13} className="text-white/80" />
                        ) : connectionStatus === "slow" ? (
                            <WifiLow size={13} className="text-white/80" />
                        ) : (
                            <WifiOff size={13} className="text-white/80" />
                        )}
                    </button>

                    {/* Date + Time */}
                    <div className="flex items-center gap-2 text-[13px] font-medium text-white/90">
                        <span>{dateStr}</span>
                        <span>{time}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
