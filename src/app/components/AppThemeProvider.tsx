"use client";

import useAppStore from "@/store";
import { Toaster } from "react-hot-toast";
import clsx from "clsx";
import { useLocalStorage } from "@/store/useLocalStorage";
import { useEffect, useRef, useState } from "react";
import MobileViewNotice from "./MobileViewNotice";
import { motion } from "framer-motion";
import LiquidGlassCursor from "./Windows/components/LiquidGlassCursor";
import { desktopApps, LaunchpadApp } from "@/Constants/constants";

type AppSettings = {
    theme: "dark" | "light";
    timeFormat: "12" | "24";
    allowCookies: boolean;
    liquidGlassCursor: boolean;
    isDefault: boolean;
};

type StoredDesktopItems = {
    items: LaunchpadApp[];
    isDefault: boolean;
};

export default function AppThemeProvider({ children, className }: { children: React.ReactNode, className?: string }) {
    const { theme, allowCookies, timeFormat, liquidGlassCursor, sentToDesktop, setTheme, setAllowCookies, setTimeFormat, setLiquidGlassCursor, setSentToDesktop } = useAppStore();
    const [hasMounted, setHasMounted] = useState(false);
    const [isCompactViewport, setIsCompactViewport] = useState(false);
    const [storedAppSettings, setStoredAppSettings] = useLocalStorage<AppSettings>("app-settings", {
        theme: "dark",
        timeFormat: "24",
        allowCookies: false,
        liquidGlassCursor: false,
        isDefault: false
    });
    const [storedSentToDesktop, setStoredSentToDesktop] = useLocalStorage<StoredDesktopItems>("sentToDesktopItems", {
        items: [],
        isDefault: true
    });

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 1024px)");
        const updateViewportMode = () => setIsCompactViewport(mediaQuery.matches);

        updateViewportMode();
        setHasMounted(true);

        mediaQuery.addEventListener("change", updateViewportMode);
        return () => mediaQuery.removeEventListener("change", updateViewportMode);
    }, []);

    useEffect(() => {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

        if (storedAppSettings.allowCookies) {
            setTheme(storedAppSettings.theme as "dark" | "light");
            setAllowCookies(storedAppSettings.allowCookies);
            setTimeFormat(storedAppSettings.timeFormat as "24" | "12");
            setLiquidGlassCursor(storedAppSettings.liquidGlassCursor);
            return;
        }
        setTheme(systemTheme);
    }, [setAllowCookies, setLiquidGlassCursor, setTheme, setTimeFormat, storedAppSettings]);

    // Hydrate sentToDesktop from localStorage only once to avoid save/load loops
    const hasHydratedSentRef = useRef(false);
    useEffect(() => {
        if (hasHydratedSentRef.current) return;
        if (storedSentToDesktop.items !== undefined) {
            const filteredDesktopItems = storedSentToDesktop.items.filter(
                (item) => item.id !== "desktop-app-resume"
            );

            if (storedSentToDesktop.isDefault && storedSentToDesktop.items.length === 0) {
                setSentToDesktop(desktopApps);
            } else {
                setSentToDesktop(filteredDesktopItems);
            }
            hasHydratedSentRef.current = true;
        }
    }, [setSentToDesktop, storedSentToDesktop]);

    useEffect(() => {
        if (!allowCookies) return;
        setStoredAppSettings({ theme, allowCookies, timeFormat, liquidGlassCursor, isDefault: false });
    }, [allowCookies, liquidGlassCursor, setStoredAppSettings, theme, timeFormat]);

    useEffect(() => {
        if (!allowCookies) return;
        setStoredSentToDesktop(prev => ({ ...prev, items: sentToDesktop }));
    }, [allowCookies, sentToDesktop, setStoredSentToDesktop]);

    const showMobileView = hasMounted && isCompactViewport;
    const appContent = hasMounted ? (showMobileView ? <MobileViewNotice /> : children) : (
        <div className="min-h-[100dvh] bg-[#050816]" />
    );

    return (
        <body suppressHydrationWarning className={clsx(theme === "dark" ? "app-dark" : "app-light", className)}>
            {liquidGlassCursor && <LiquidGlassCursor />}
            <Toaster position="top-right" reverseOrder={false} toastOptions={{
                style: {
                    background: 'rgba(0, 0, 0, 0.75)',
                    color: '#fff',
                    backdropFilter: 'blur(4px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                }
            }} />
            <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.05, delay: 0.05 }}
            className="">{appContent}</motion.div>
        </body>
    )
}
