"use client";
import Image from "next/image";
import clsx from "clsx";
import { Github, Mail, Linkedin, Star } from "lucide-react";
import Link from "next/link";
import { languages } from "@/Constants/languages";
import useAppWindows from "@/store/useAppWindows";
import { BOX_HEIGHT, BOX_WIDTH, icons } from "@/Constants/constants";
import useSoundEffect from "@useverse/usesoundeffect";

export default function Finder() {
    const { windows, addWindow, restoreWindow } = useAppWindows();
    const linkHoverSound = useSoundEffect("/audio/link-hover.mp3", {
        volume: 0.15,
    });
    const clickSound = useSoundEffect("/audio/mouse-click.mp3", {
        volume: 0.5,
    });

    const mailWindow = windows.find((window) => window.id === "mail");
    const isMailOpen = !!mailWindow;

    const mailConstant = icons.find((icon) => (icon.tooltip).toLocaleLowerCase() === "mail")!;

    const handleOpenContact = () => {
        if (isMailOpen) {
            if (mailWindow?.isMinimized) {
                restoreWindow("mail");
            }
            return;
        }

        const { innerWidth, innerHeight } = window;
        const screenWidth = innerWidth;
        const screenHeight = innerHeight;

        // Safe "mid" boundaries (e.g. 5% to 95% of screen)
        const minX = screenWidth * 0.05;
        const maxX = screenWidth * 0.95 - BOX_WIDTH;
        const minY = screenHeight * 0.05;
        const maxY = screenHeight * 0.95 - BOX_HEIGHT;

        const randomX = Math.floor(Math.random() * (maxX - minX) + minX);
        const randomY = Math.floor(Math.random() * (maxY - minY) + minY);

        addWindow({
            id: mailConstant.id,
            title: mailConstant.tooltip,
            position: { x: randomX, y: randomY },
            fixedLocation: "right",
            windowType: mailConstant.windowType,
            isMinimized: false,
        });
    };

    return (
        <div className="p-2">
            <div className="flex items-center gap-2">
                <div className="h-24 w-24 rounded-full shrink-0 overflow-hidden border border-foreground/20">
                    <Image
                        src="/images/assets/image.png"
                        alt="Ayush Gupta"
                        onContextMenu={(e) => {
                            e.preventDefault();  
                        }}
                        onContextMenuCapture={(e) => {
                            e.preventDefault();
                        }}
                        width={500}
                        height={500}
                        priority
                        draggable={false}
                        className="select-none"
                    />
                </div>
                <div className="grid gap-1">
                    <h3 className={clsx("text-2xl font-black tracking-[0.06em]")}>Ayush Gupta</h3>
                    <p className="text-sm opacity-60">Full-Stack Developer Intern · B.Tech ECE, DTU</p>
                    <p className="text-sm opacity-80 leading-relaxed">
                        Full-stack developer focused on backend systems, AI-powered products, and reliable web applications. Currently building with Next.js, Go, PostgreSQL, and modern API workflows.
                    </p>
                </div>

            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                <div className="rounded-2xl border border-foreground/10 bg-background/25 p-4">
                    <p className="text-[11px] uppercase tracking-[0.18em] opacity-60">Experience</p>
                    <p className="mt-2 text-sm font-semibold">Hibiscustech GR Pvt. Ltd.</p>
                    <p className="text-sm opacity-75">Full-Stack Developer Intern</p>
                    <p className="text-xs opacity-60 mt-1">July 2025 - Present</p>
                </div>
                <div className="rounded-2xl border border-foreground/10 bg-background/25 p-4">
                    <p className="text-[11px] uppercase tracking-[0.18em] opacity-60">Education</p>
                    <p className="mt-2 text-sm font-semibold">Delhi Technological University</p>
                    <p className="text-sm opacity-75">B.Tech, Electronics and Communication</p>
                    <p className="text-xs opacity-60 mt-1">CGPA: 8.31</p>
                </div>
                <div className="rounded-2xl border border-foreground/10 bg-background/25 p-4">
                    <p className="text-[11px] uppercase tracking-[0.18em] opacity-60">Highlights</p>
                    <p className="mt-2 text-sm font-semibold">Backend + AI Systems</p>
                    <p className="text-sm opacity-75">300+ DSA problems solved</p>
                    <p className="text-xs opacity-60 mt-1">Next.js, Go, PostgreSQL, CI/CD</p>
                </div>
            </div>
            <div className="mt-4 rounded-2xl border border-foreground/10 bg-background/20 p-4">
                <p className="text-sm leading-relaxed opacity-85">
                    Recent work includes building Go-based backend workflows, designing normalized PostgreSQL schemas,
                    shipping Next.js features end-to-end, and architecting AI systems such as a modular research agent
                    and job application automation pipelines.
                </p>
            </div>
            <div className="flex items-center gap-1 my-5">
                <Link 
                    title="View my GitHub profile" 
                    href="https://github.com/ayushgupta-15" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-background flex items-center gap-1 justify-center flex-2 shadow-[0px_5px_25px_rgba(0,0,0,0.05)] px-5 py-3 text-sm rounded-full w-fit cursor-pointer hover:border-foreground/20 border border-foreground/5 active:scale-95 transition-all duration-300 active:opacity-75"
                    onMouseEnter={() => linkHoverSound.play()}
                    onClick={() => clickSound.play()}
                >
                    <Github size={20} />
                    GitHub
                </Link>
                <Link 
                    title="Connect on LinkedIn" 
                    href="https://www.linkedin.com/in/ayush-gupta-" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-background flex items-center gap-1 justify-center flex-2 shadow-[0px_5px_25px_rgba(0,0,0,0.05)] px-5 py-3 text-sm rounded-full w-fit cursor-pointer hover:border-foreground/20 border border-foreground/5 active:scale-95 transition-all duration-300 active:opacity-75"
                    onMouseEnter={() => linkHoverSound.play()}
                    onClick={() => clickSound.play()}
                >
                    <Linkedin size={20} />
                    LinkedIn
                </Link>
                <button onClick={handleOpenContact} title="Contact me" className="bg-background flex-1 flex items-center gap-1 justify-center shadow-[0px_5px_25px_rgba(0,0,0,0.05)] px-5 py-3 text-sm rounded-full w-fit cursor-pointer hover:border-foreground/20 border border-foreground/5 active:scale-95 transition-all duration-300 active:opacity-75">
                    <Mail size={20} />
                    Contact me
                </button>
                <Link 
                    href="https://github.com/ayushgupta-15/Portfolio" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    title="Star this portfolio repo" 
                    className="bg-background shadow-[0px_5px_25px_rgba(0,0,0,0.05)] flex items-center justify-center px-5 py-3 text-sm rounded-full w-fit cursor-pointer hover:border-foreground/20 border border-foreground/5 active:scale-95 transition-all duration-300 active:opacity-75"
                    onMouseEnter={() => linkHoverSound.play()}
                    onClick={() => clickSound.play()}
                >
                    <Github size={20} />
                    <Star size={15} className="text-yellow-400 -ml-3" fill="oklch(85.2% 0.199 91.936)" />
                </Link>
            </div>
            <div className="flex flex-col">
                <div className="flex flex-wrap gap-2 ">
                    {languages.map((language) => (
                        <div key={language.id} className="flex items-center justify-center gap-1 px-3 py-2 rounded-3xl bg-transparent hover:bg-background/30 transition-all duration-300 cursor-auto active:scale-95 active:opacity-75">
                            {language.icon && (
                                <Image
                                    src={language.icon}
                                    alt={language.name}
                                    width={100}
                                    height={100}
                                    priority
                                    onContextMenu={(e) => {
                                        e.preventDefault();  
                                    }}
                                    onContextMenuCapture={(e) => {
                                        e.preventDefault();
                                    }}
                                    placeholder="blur"
                                    blurDataURL={language.icon}
                                    className="h-6 w-auto object-contain drop-shadow-[0px_0px_2.5px_rgba(255,255,255,0.25)]"
                                />
                            )}
                            <p className="text-sm">{language.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
