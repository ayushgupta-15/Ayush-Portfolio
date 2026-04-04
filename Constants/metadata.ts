export const metadata = {
    title: "Ayush Gupta | Portfolio",
    description: "Portfolio of Ayush Gupta featuring projects, experience, and contact details in a Macintosh-inspired interface.",
    keywords: [
      "Ayush Gupta",
      "Portfolio",
      "Frontend Developer",
      "Backend Developer",
      "Full-Stack Developer",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Macintosh OS",
      "Classic Mac",
      "Mac OS",
      "Operating System",
      "Retro Computing",
      "Progressive Web App",
      "PWA",
      "Browser OS",
      "Desktop Experience",
      "Vintage Mac",
      "System 7",
      "Classic Computing"
    ],
    authors: [{ name: "Ayush Gupta", url: "mailto:ayushgupta.professional@gmail.com" }],
    creator: "Ayush Gupta",
    publisher: "Ayush Gupta",
    icons: {
      icon: '/favicons/android-chrome-192x192.png',
      shortcut: '/favicons/android-chrome-512x512.png',
      apple: '/favicons/android-chrome-512x512.png',
      other: {
          rel: '/favicons/favicon.ico',
          url: '/favicons/favicon.ico',
      },
  },
    manifest: "/manifest.json",
    appleWebApp: {
      capable: true,
      statusBarStyle: "default" as const,
      title: "Ayush Gupta Portfolio | Macintosh OS",
    },
    openGraph: {
      title: "Ayush Gupta | Portfolio",
      description: "Explore Ayush Gupta's portfolio in a Macintosh-inspired interface.",
      url: "https://ayushgupta.dev",
      siteName: "Ayush Gupta Portfolio",
      images: [
        {
          url: "https://pickholder.sirv.com/Images/og-image.png", 
          width: 1200,
          height: 630,
          alt: "Ayush Gupta Portfolio Preview"
        }
      ],
      locale: "en_US",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: "Ayush Gupta | Portfolio",
      description: "Ayush Gupta's portfolio and contact details.",
      creator: "@ashg1511",
      images: ["https://pickholder.sirv.com/Images/og-image.png"]
    },
    metadataBase: new URL("https://ayushgupta.dev")
  };
