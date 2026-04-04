"use client";

import { WindowType } from "@/Constants/constants";
import useAppWindows from "@/store/useAppWindows";
import clsx from "clsx";
import { motion } from "framer-motion";
import useSoundEffect from "@useverse/usesoundeffect";
import Image from "next/image";
import { useState } from "react";

// ── Folder definition ────────────────────────────────────────────────────────
interface DesktopFolder {
    id: string;
    label: string;
    windowType: WindowType;
    /** Path inside /public/images/icons/ */
    icon: string;
}

const FOLDERS: DesktopFolder[] = [
    {
        id: "df-projects",
        label: "Projects",
        windowType: WindowType.Projects,
        icon: "/images/icons/folder.png",
    },
    {
        id: "df-resume",
        label: "Resume",
        windowType: WindowType.Resume,
        icon: "/images/icons/folder.png",
    },
];

// ── Single folder icon ────────────────────────────────────────────────────────
function DesktopFolderIcon({ folder, index }: { folder: DesktopFolder; index: number }) {
    const openSound = useSoundEffect("/audio/mouse-click.mp3", { volume: 0.35 });
    const { windows, addWindow, restoreWindow } = useAppWindows();
    const [selected, setSelected] = useState(false);

    const existingWindow = windows.find((w) => w.id === folder.id);
    const isOpen = !!existingWindow && !existingWindow.isMinimized;

    const handleClick = () => setSelected(true);

    const handleDoubleClick = () => {
        openSound.play();
        setSelected(false);

        if (existingWindow?.isMinimized) {
            restoreWindow(folder.id);
            return;
        }
        if (existingWindow) return;

        const { innerWidth, innerHeight } = window;
        const randomX = Math.floor(Math.random() * (innerWidth * 0.4) + innerWidth * 0.15);
        const randomY = Math.floor(Math.random() * (innerHeight * 0.3) + innerHeight * 0.15);

        addWindow({
            id: folder.id,
            title: folder.label,
            position: { x: randomX, y: randomY },
            fixedLocation: "right",
            windowType: folder.windowType,
            isMinimized: false,
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.1, duration: 0.3, ease: "easeOut" }}
            className="flex flex-col items-center gap-2 cursor-default select-none group"
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
            onBlur={() => setSelected(false)}
            tabIndex={0}
        >
            {/* Icon + selection highlight */}
            <div
                className={clsx(
                    "relative p-1.5 rounded-lg transition-colors duration-100",
                    selected ? "bg-blue-500/30" : "group-hover:bg-white/10"
                )}
            >
                <Image
                    src={folder.icon}
                    alt={folder.label}
                    width={72}
                    height={72}
                    draggable={false}
                    className={clsx(
                        "h-[72px] w-[72px] transition-all duration-200",
                        !isOpen && "group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]"
                    )}
                />
                {/* Open indicator dot */}
                {isOpen && (
                    <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white/70" />
                )}
            </div>

            {/* Label */}
            <span
                className={clsx(
                    "text-sm font-medium text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] text-center leading-tight max-w-[92px] px-1 py-0.5 rounded",
                    selected ? "bg-blue-500/60" : ""
                )}
            >
                {folder.label}
            </span>
        </motion.div>
    );
}

// ── Column of folders on the LEFT (matching reference) ───────────────────────
export default function DesktopFolders() {
    return (
        <div className="absolute top-10 left-3 flex flex-col gap-5 z-40 pt-4">
            {FOLDERS.map((folder, i) => (
                <DesktopFolderIcon key={folder.id} folder={folder} index={i} />
            ))}
        </div>
    );
}
