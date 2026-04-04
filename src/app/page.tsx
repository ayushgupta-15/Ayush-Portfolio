"use client";

import { useCallback, useEffect, useState } from 'react';
import AppWindows from './components/AppViewer/AppWindows';
import Bg from './components/Bg';
import Desktop from './components/Desktop/Index';
import Header from './components/Header';
import Dock from './components/TaskBar';
import BootScreen from './components/BootScreen';
import { motion, AnimatePresence } from 'framer-motion';

const SESSION_KEY = 'ag-booted';

export default function Page() {
  // Show boot screen only once per browser session (not on every hot-reload in dev)
  const [booting, setBooting] = useState<boolean | null>(null);

  useEffect(() => {
    const alreadyBooted = sessionStorage.getItem(SESSION_KEY);
    setBooting(!alreadyBooted);
  }, []);

  const handleBootDone = useCallback(() => {
    sessionStorage.setItem(SESSION_KEY, '1');
    setBooting(false);
  }, []);

  // Don't render anything until we know if we should boot (avoids flash)
  if (booting === null) return null;

  return (
    <>
      <AnimatePresence>
        {booting && (
          <BootScreen key="boot" onDone={handleBootDone} />
        )}
      </AnimatePresence>

      <motion.div
        className="relative h-screen w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: booting ? 0 : 1 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <Bg />
        <Desktop />
        <Header />
        <Dock />
        <AppWindows />
      </motion.div>
    </>
  );
}