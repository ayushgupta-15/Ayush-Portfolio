"use client";

import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import useSoundEffect from "@useverse/usesoundeffect";

type ResumeFolderKey = "core" | "tech";

type ResumeFile = {
    id: string;
    title: string;
    href: string;
};

const resumeFolders: Record<ResumeFolderKey, { title: string; files: ResumeFile[] }> = {
    core: {
        title: "Core",
        files: [
            {
                id: "core-resume",
                title: "Ayush_Gupta_23-EC-251.pdf",
                href: "/resume/core/Ayush_Gupta_23-EC-251.pdf",
            },
        ],
    },
    tech: {
        title: "Tech",
        files: [
            {
                id: "tech-resume",
                title: "Ayush_Gupta_Resume.pdf",
                href: "/resume/tech/Ayush_Gupta_Resume.pdf",
            },
        ],
    },
};

export default function Resume() {
    const [activeFolder, setActiveFolder] = useState<ResumeFolderKey | null>(null);
    const clickSound = useSoundEffect("/audio/mouse-click.mp3", {
        volume: 0.2,
    });

    const openFile = (href: string) => {
        clickSound.play();
        window.open(href, "_blank", "noopener,noreferrer");
    };

    return (
        <div className="min-h-[20rem] p-4">
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold">Resume</h2>
                    <p className="text-sm opacity-70">Open the Core or Tech folder to view the PDF.</p>
                </div>
                {activeFolder && (
                    <button
                        type="button"
                        onClick={() => {
                            clickSound.play();
                            setActiveFolder(null);
                        }}
                        className="rounded-full border border-foreground/20 px-4 py-2 text-sm hover:bg-background/40"
                    >
                        Back
                    </button>
                )}
            </div>

            {!activeFolder ? (
                <div className="grid grid-cols-2 gap-4">
                    {(Object.entries(resumeFolders) as [ResumeFolderKey, (typeof resumeFolders)[ResumeFolderKey]][]).map(([key, folder]) => (
                        <button
                            key={key}
                            type="button"
                            onClick={() => {
                                clickSound.play();
                                setActiveFolder(key);
                            }}
                            className="rounded-2xl border border-foreground/20 bg-background/30 p-5 text-left hover:bg-background/50"
                        >
                            <div className="mb-3 flex items-center gap-3">
                                <Image
                                    src="/images/icons/folder.png"
                                    alt={folder.title}
                                    width={56}
                                    height={56}
                                    className="h-14 w-14 object-contain"
                                />
                                <div>
                                    <p className="text-lg font-semibold">{folder.title}</p>
                                    <p className="text-sm opacity-70">1 file</p>
                                </div>
                            </div>
                            <p className="text-sm opacity-70">Open folder</p>
                        </button>
                    ))}
                </div>
            ) : (
                <div className="grid gap-3">
                    {resumeFolders[activeFolder].files.map((file) => (
                        <button
                            key={file.id}
                            type="button"
                            onClick={() => openFile(file.href)}
                            className={clsx(
                                "flex items-center gap-4 rounded-2xl border border-foreground/20 bg-background/30 p-4 text-left",
                                "hover:bg-background/50"
                            )}
                        >
                            <Image
                                src="/images/icons/pdf.png"
                                alt={file.title}
                                width={48}
                                height={48}
                                className="h-12 w-12 object-contain"
                            />
                            <div>
                                <p className="font-medium">{file.title}</p>
                                <p className="text-sm opacity-70">Open PDF</p>
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
