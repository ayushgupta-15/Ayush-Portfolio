"use client";

import { languages } from "@/Constants/languages";
import { projects } from "@/Constants/projects";
import {
    Briefcase,
    Download,
    Github,
    Linkedin,
    Mail,
    Sparkles,
    UserRound,
    X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type MobileAppId = "about" | "experience" | "projects" | "skills" | "resume" | "contact";

type MobileApp = {
    id: MobileAppId;
    label: string;
    icon: React.ReactNode;
    tint?: string;
    iconMode?: "tile" | "image";
};

const mobileApps: MobileApp[] = [
    {
        id: "about",
        label: "About",
        icon: <UserRound size={22} className="text-white" />,
        tint: "from-sky-500 to-blue-700",
    },
    {
        id: "experience",
        label: "Work",
        icon: <Briefcase size={22} className="text-white" />,
        tint: "from-amber-400 to-orange-600",
    },
    {
        id: "projects",
        label: "Projects",
        icon: (
            <Image
                src="/images/icons/folder.png"
                alt="Projects folder"
                width={62}
                height={62}
                className="h-[62px] w-[62px] object-contain md:h-[74px] md:w-[74px]"
            />
        ),
        iconMode: "image",
    },
    {
        id: "skills",
        label: "Skills",
        icon: <Sparkles size={22} className="text-white" />,
        tint: "from-fuchsia-500 to-violet-700",
    },
    {
        id: "resume",
        label: "Resume",
        icon: (
            <Image
                src="/images/icons/folder.png"
                alt="Resume folder"
                width={62}
                height={62}
                className="h-[62px] w-[62px] object-contain md:h-[74px] md:w-[74px]"
            />
        ),
        iconMode: "image",
    },
    {
        id: "contact",
        label: "Contact",
        icon: (
            <Image
                src="/images/icons/mail.png"
                alt="Email"
                width={58}
                height={58}
                className="h-[58px] w-[58px] object-contain md:h-[70px] md:w-[70px]"
            />
        ),
        iconMode: "image",
    },
];

const featuredProjects = projects.filter((project) => project.isFavorite).slice(0, 3);
const highlightedSkills = languages.slice(0, 12);

function StatusClock() {
    const [time, setTime] = useState("");

    useEffect(() => {
        const update = () =>
            setTime(
                new Date().toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                })
            );

        update();
        const interval = window.setInterval(update, 60000);
        return () => window.clearInterval(interval);
    }, []);

    return <span className="text-[13px] font-semibold tracking-[0.02em] text-white">{time}</span>;
}

function StatusBar() {
    return (
        <div className="absolute inset-x-0 top-0 z-30 px-6 pb-2 pt-3 md:px-8 md:pt-5">
            <div className="flex items-center justify-between px-1">
                <StatusClock />
                <div className="flex items-center gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-white/95" />
                    <div className="h-2.5 w-2.5 rounded-full bg-white/70" />
                    <div className="h-2.5 w-6 rounded-full border border-white/70">
                        <div className="m-[1px] h-[calc(100%-2px)] w-4 rounded-full bg-white/90" />
                    </div>
                </div>
            </div>
        </div>
    );
}

function AppIcon({
    app,
    onOpen,
}: {
    app: MobileApp;
    onOpen: (id: MobileAppId) => void;
}) {
    return (
        <button
            type="button"
            onClick={() => onOpen(app.id)}
            className="flex flex-col items-center gap-2 transition-transform active:scale-95"
        >
            {app.iconMode === "image" ? (
                <div className="grid h-[68px] w-[68px] place-items-center md:h-[82px] md:w-[82px]">
                    {app.icon}
                </div>
            ) : (
                <div
                    className={`grid h-16 w-16 place-items-center rounded-[1.35rem] border border-white/20 bg-gradient-to-br ${app.tint} shadow-[0_16px_40px_rgba(0,0,0,0.28)] backdrop-blur-xl md:h-20 md:w-20 md:rounded-[1.6rem]`}
                >
                    {app.icon}
                </div>
            )}
            <span className="text-[11px] font-medium text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] md:text-xs">
                {app.label}
            </span>
        </button>
    );
}

function HomeScreen({
    onOpen,
}: {
    onOpen: (id: MobileAppId) => void;
}) {
    return (
        <div className="relative z-10 flex h-full min-h-full flex-col px-5 pb-4 pt-14 md:px-7 md:pb-6 md:pt-20">
            <div>
                <div className="rounded-[2rem] border border-white/15 bg-black/20 p-4 shadow-[0_20px_80px_rgba(0,0,0,0.32)] backdrop-blur-2xl md:p-6">
                    <div className="flex items-center gap-3">
                        <Image
                            src="/images/assets/image.png"
                            alt="Ayush Gupta"
                            width={54}
                            height={54}
                            className="h-[54px] w-[54px] rounded-2xl object-cover ring-1 ring-white/20"
                            priority
                        />
                        <div>
                            <p className="text-xl font-semibold text-white md:text-2xl">Ayush Gupta</p>
                            <p className="text-sm text-white/70 md:text-base">Full-Stack Developer Intern</p>
                        </div>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-white/80 md:mt-4 md:max-w-xl md:text-base">
                        Backend systems, AI products, and scalable web applications. DTU ECE, currently building with
                        Next.js, Go, PostgreSQL, and modern API workflows.
                    </p>
                    <div className="mt-4 flex gap-2 md:mt-5">
                        <button
                            type="button"
                            onClick={() => onOpen("projects")}
                            className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 md:px-5 md:py-2.5"
                        >
                            View Projects
                        </button>
                        <button
                            type="button"
                            onClick={() => onOpen("resume")}
                            className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white md:px-5 md:py-2.5"
                        >
                            Resume
                        </button>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-y-6 md:mt-8 md:grid-cols-6 md:gap-x-5 md:gap-y-8">
                    {mobileApps.map((app) => (
                        <AppIcon key={app.id} app={app} onOpen={onOpen} />
                    ))}
                </div>
            </div>

            <div className="mt-auto flex justify-center pt-6 md:pt-8">
                <div className="inline-flex items-center gap-3 rounded-[2rem] border border-white/15 bg-white/10 px-4 py-3 shadow-[0_20px_80px_rgba(0,0,0,0.24)] backdrop-blur-2xl md:gap-4 md:px-5 md:py-3.5">
                    <Link
                        href="https://github.com/ayushgupta-15"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="grid h-14 w-14 place-items-center rounded-[1.2rem] bg-white/10 text-white md:h-16 md:w-16"
                    >
                        <Github size={24} />
                    </Link>
                    <Link
                        href="https://www.linkedin.com/in/ayush-gupta-/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="grid h-14 w-14 place-items-center rounded-[1.2rem] bg-white/10 text-white md:h-16 md:w-16"
                    >
                        <Linkedin size={24} />
                    </Link>
                    <button
                        type="button"
                        onClick={() => onOpen("contact")}
                        className="grid h-14 w-14 place-items-center rounded-[1.2rem] bg-white/10 text-white md:h-16 md:w-16"
                    >
                        <Mail size={24} />
                    </button>
                    <button
                        type="button"
                        onClick={() => onOpen("resume")}
                        className="grid h-14 w-14 place-items-center rounded-[1.2rem] bg-white/10 text-white md:h-16 md:w-16"
                    >
                        <Download size={24} />
                    </button>
                </div>
            </div>
        </div>
    );
}

function AppShell({
    title,
    onClose,
    children,
}: {
    title: string;
    onClose: () => void;
    children: React.ReactNode;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="absolute inset-0 z-20 overflow-hidden rounded-[2.9rem] border border-white/15 bg-[linear-gradient(180deg,rgba(18,24,45,0.96),rgba(10,14,28,0.98))] shadow-[0_30px_120px_rgba(0,0,0,0.45)]"
        >
            <div className="flex items-center justify-between border-b border-white/10 px-5 pb-4 pt-16 md:px-7 md:pb-5 md:pt-20">
                <div>
                    <h2 className="text-2xl font-semibold text-white md:text-[1.9rem]">{title}</h2>
                </div>
                <button
                    type="button"
                    onClick={onClose}
                    className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white"
                >
                    <X size={18} />
                </button>
            </div>
            <div className="h-[calc(100%-93px)] overflow-y-auto px-5 pb-8 pt-5 md:px-7 md:pb-10 md:pt-6">{children}</div>
        </motion.div>
    );
}

function AboutApp() {
    return (
        <div className="space-y-4">
            <div className="rounded-[1.75rem] border border-white/10 bg-white/6 p-4">
                <div className="flex items-center gap-3">
                    <Image
                        src="/images/assets/image.png"
                        alt="Ayush Gupta"
                        width={64}
                        height={64}
                        className="h-16 w-16 rounded-2xl object-cover"
                    />
                    <div>
                        <p className="text-xl font-semibold text-white">Ayush Gupta</p>
                        <p className="text-sm text-white/65">Full-Stack Developer Intern</p>
                        <p className="text-xs text-white/45">Delhi Technological University</p>
                    </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-white/80">
                    Full-stack developer focused on backend systems, AI-powered products, and reliable web applications.
                    I enjoy building APIs, data-intensive workflows, and product experiences that are technically solid
                    and usable.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/6 p-4">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-white/45">Education</p>
                    <p className="mt-2 text-sm font-semibold text-white">DTU</p>
                    <p className="text-sm text-white/65">B.Tech ECE</p>
                    <p className="mt-1 text-xs text-white/45">2023-2027</p>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-white/6 p-4">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-white/45">CGPA</p>
                    <p className="mt-2 text-sm font-semibold text-white">8.31</p>
                    <p className="text-sm text-white/65">Current</p>
                    <p className="mt-1 text-xs text-white/45">ECE</p>
                </div>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-white/6 p-4">
                <p className="text-[11px] uppercase tracking-[0.18em] text-white/45">Highlights</p>
                <div className="mt-3 space-y-3 text-sm text-white/80">
                    <p>Currently working as a Full-Stack Developer Intern at Hibiscustech GR Pvt. Ltd.</p>
                    <p>Built AI systems like a modular research agent and job automation pipelines.</p>
                    <p>Solved 300+ DSA problems across core problem-solving topics.</p>
                </div>
            </div>
        </div>
    );
}

function ExperienceApp() {
    return (
        <div className="space-y-4">
            <div className="rounded-[1.75rem] border border-white/10 bg-white/6 p-4">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <p className="text-lg font-semibold text-white">Hibiscustech GR Pvt. Ltd.</p>
                        <p className="text-sm text-white/65">Full-Stack Developer Intern</p>
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/65">
                        July 2025 - Present
                    </span>
                </div>
                <div className="mt-4 space-y-3 text-sm leading-6 text-white/80">
                    <p>Owned end-to-end web feature development using Next.js on the frontend and Go-based REST APIs on the backend.</p>
                    <p>Designed normalized PostgreSQL schemas and improved query performance through indexing and query refactoring.</p>
                    <p>Built backend workflows with correctness, edge-case handling, and maintainable abstractions in mind.</p>
                    <p>Worked with GitHub Actions and CI/CD to automate testing and improve release consistency.</p>
                </div>
            </div>
        </div>
    );
}

function ProjectsApp() {
    return (
        <div className="space-y-4">
            {featuredProjects.map((project) => (
                <Link
                    key={project.id}
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-[1.75rem] border border-white/10 bg-white/6 p-3"
                >
                    <div className="relative aspect-[16/10] overflow-hidden rounded-[1.35rem]">
                        <Image
                            src={project.src}
                            alt={project.alt}
                            fill
                            sizes="100vw"
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                        <div className="absolute bottom-3 left-3 right-3">
                            <p className="text-lg font-semibold text-white">{project.name}</p>
                            <p className="text-xs text-white/70">{project.category}</p>
                        </div>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-white/78">{project.description}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                        {project.technologies.slice(0, 4).map((tech) => (
                            <span
                                key={tech}
                                className="rounded-full border border-white/10 bg-white/8 px-2.5 py-1 text-[11px] text-white/70"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </Link>
            ))}
        </div>
    );
}

function SkillsApp() {
    return (
            <div className="rounded-[1.75rem] border border-white/10 bg-white/6 p-4 md:p-5">
                <p className="text-[11px] uppercase tracking-[0.18em] text-white/45">Core Stack</p>
            <div className="mt-4 grid grid-cols-3 gap-3 md:grid-cols-4 md:gap-4">
                {highlightedSkills.map((skill) => (
                    <div
                        key={skill.id}
                        className="flex flex-col items-center gap-2 rounded-[1.4rem] border border-white/8 bg-white/5 px-2 py-3 text-center"
                    >
                        {skill.icon && (
                            <Image
                                src={skill.icon}
                                alt={skill.name}
                                width={34}
                                height={34}
                                className="h-[34px] w-[34px] object-contain"
                            />
                        )}
                        <span className="text-[11px] leading-4 text-white/80">{skill.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ResumeApp() {
    return (
        <div className="space-y-4">
            <div className="rounded-[1.75rem] border border-white/10 bg-white/6 p-4">
                <p className="text-lg font-semibold text-white">Resume</p>
                <p className="mt-2 text-sm leading-6 text-white/78">
                    Choose the version you want to share with recruiters or download directly to your device.
                </p>
            </div>
            <Link
                href="/resume/tech/Ayush_Gupta_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-[1.75rem] border border-white/10 bg-white/6 p-4"
            >
                <div>
                    <p className="text-base font-semibold text-white">Technical Resume</p>
                    <p className="text-sm text-white/65">Backend, full-stack, AI systems</p>
                </div>
                <Download size={18} className="text-white" />
            </Link>
            <Link
                href="/resume/core/Ayush_Gupta_23-EC-251.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-[1.75rem] border border-white/10 bg-white/6 p-4"
            >
                <div>
                    <p className="text-base font-semibold text-white">Core Resume</p>
                    <p className="text-sm text-white/65">Academic and general profile</p>
                </div>
                <Download size={18} className="text-white" />
            </Link>
        </div>
    );
}

function ContactApp() {
    return (
        <div className="space-y-4">
            <Link
                href="mailto:ayushgupta.professional@gmail.com"
                className="flex items-center gap-3 rounded-[1.75rem] border border-white/10 bg-white/6 p-4"
            >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-white">
                    <Mail size={18} />
                </div>
                <div>
                    <p className="text-base font-semibold text-white">Email</p>
                    <p className="text-sm text-white/65">ayushgupta.professional@gmail.com</p>
                </div>
            </Link>
            <Link
                href="https://www.linkedin.com/in/ayush-gupta-/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-[1.75rem] border border-white/10 bg-white/6 p-4"
            >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#0A66C2] text-white">
                    <Linkedin size={18} />
                </div>
                <div>
                    <p className="text-base font-semibold text-white">LinkedIn</p>
                    <p className="text-sm text-white/65">Connect professionally</p>
                </div>
            </Link>
            <Link
                href="https://github.com/ayushgupta-15"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-[1.75rem] border border-white/10 bg-white/6 p-4"
            >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-white">
                    <Github size={18} />
                </div>
                <div>
                    <p className="text-base font-semibold text-white">GitHub</p>
                    <p className="text-sm text-white/65">Code, projects, and source</p>
                </div>
            </Link>
        </div>
    );
}

function renderAppContent(activeApp: MobileAppId) {
    switch (activeApp) {
        case "about":
            return <AboutApp />;
        case "experience":
            return <ExperienceApp />;
        case "projects":
            return <ProjectsApp />;
        case "skills":
            return <SkillsApp />;
        case "resume":
            return <ResumeApp />;
        case "contact":
            return <ContactApp />;
        default:
            return null;
    }
}

export default function MobileViewNotice() {
    const [activeApp, setActiveApp] = useState<MobileAppId | null>(null);

    const activeAppTitle = useMemo(
        () => mobileApps.find((app) => app.id === activeApp)?.label ?? "",
        [activeApp]
    );

    return (
        <div className="min-h-[100dvh] bg-[#050816] p-3 md:flex md:items-center md:justify-center md:p-6">
            <div className="relative mx-auto min-h-[calc(100dvh-24px)] w-full max-w-[390px] rounded-[3rem] border border-white/12 bg-[linear-gradient(180deg,#1a1b22,#0b0b0f)] p-[8px] shadow-[0_40px_120px_rgba(0,0,0,0.45)] md:min-h-[min(900px,calc(100dvh-48px))] md:max-w-[860px] md:rounded-[3.3rem] md:p-[10px]">
                <div className="relative flex min-h-[calc(100dvh-40px)] overflow-hidden rounded-[2.6rem] bg-black/70 md:min-h-[min(880px,calc(100dvh-68px))] md:rounded-[3rem]">
                <Image
                    src="/images/macos-monterey.jpg"
                    alt="iPhone wallpaper"
                        fill
                        priority
                        className="object-cover"
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_34%),linear-gradient(180deg,rgba(20,18,52,0.12),rgba(4,7,18,0.35))]" />
                <div className="absolute left-1/2 top-2 z-30 h-7 w-36 -translate-x-1/2 rounded-full bg-black/85 md:top-3 md:h-8 md:w-44" />
                <StatusBar />

                <HomeScreen onOpen={setActiveApp} />

                    <AnimatePresence>
                        {activeApp && (
                            <AppShell title={activeAppTitle} onClose={() => setActiveApp(null)}>
                                {renderAppContent(activeApp)}
                            </AppShell>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
