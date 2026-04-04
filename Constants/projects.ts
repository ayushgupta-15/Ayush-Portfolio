export interface Project {
    id: string;
    name: string;
    type: string;
    src: string;
    alt: string;
    url: string;
    description: string;
    technologies: string[];
    category: string;
    year: string;
    features: string[];
    isFavorite?: boolean;
}

export const projects: Project[] = [
    {
      id: "project-jobforge-ai",
      name: "JobForge AI",
      type: "Personal Project",
      src: "/images/projects/jobforge-ai.png",
      alt: "JobForge AI",
      url: "https://github.com/ayushgupta-15/jobforge-ai",
      description: "An AI-powered job application management platform that helps job seekers optimize their application process. Features ATS resume scoring, semantic job matching, interview preparation with AI-generated questions, and a Chrome extension for one-click job capture.",
      technologies: ["Next.js 15", "TypeScript", "FastAPI", "PostgreSQL", "Redis", "Qdrant", "OpenAI GPT-4", "Docker", "Kubernetes"],
      category: "AI / Full Stack",
      year: "2025",
      features: [
        "AI-powered ATS resume scoring and optimization",
        "Vector-based semantic job search (Qdrant)",
        "AI mock interview question generation",
        "Email automation and outreach",
        "Chrome extension for one-click job capture",
        "Analytics dashboard for job search tracking"
      ],
      isFavorite: true
    },
    {
      id: "project-noesis",
      name: "Noēsis — AI Research Agent",
      type: "Personal Project",
      src: "/images/projects/noesis.png",
      alt: "Noesis AI Research Agent",
      url: "https://github.com/ayushgupta-15/Noesis",
      description: "Enterprise-grade AI research platform with multi-agent orchestration, vector search, and knowledge graphs. Deploys 5 specialized AI agents (Query, Search, Analysis, Validation, Report) with real-time WebSocket streaming and a Copilot transparency panel.",
      technologies: ["Next.js 15", "React 19", "TypeScript", "FastAPI", "LangGraph", "LangChain", "PostgreSQL", "pgvector", "Neo4j", "Redis", "OpenAI GPT-4"],
      category: "AI / Research Platform",
      year: "2025",
      features: [
        "Multi-agent system with 5 specialized AI agents",
        "Semantic vector search via PostgreSQL + pgvector",
        "Neo4j knowledge graph for relationship modeling",
        "Redis caching with 40%+ cache hit rate",
        "Real-time WebSocket streaming updates",
        "AI Copilot panel for agent reasoning transparency",
        "PDF and CSV report export"
      ],
      isFavorite: true
    },
    {
      id: "project-finsavvy",
      name: "FinSavvy — AI Finance Platform",
      type: "Personal Project",
      src: "/images/projects/finsavvy.png",
      alt: "FinSavvy",
      url: "https://finsavvy-swart.vercel.app/",
      description: "A full-stack AI-powered personal finance management platform. Track spending, scan receipts with OCR, set budgets, and receive personalized AI-driven financial insights in real time.",
      technologies: ["Next.js", "Supabase", "Prisma", "Tailwind CSS", "Inngest", "ArcJet", "Shadcn UI"],
      category: "AI / FinTech",
      year: "2024",
      features: [
        "AI-driven spending analytics dashboard",
        "Smart receipt scanner with OCR",
        "Budget planning with intelligent recommendations",
        "Multi-account and multi-currency support",
        "Automated AI financial insights",
        "Event-driven backend workflows via Inngest"
      ],
      isFavorite: true
    },
    {
      id: "project-flowmate",
      name: "Flowmate",
      type: "Personal Project",
      src: "/images/projects/flowmate.png",
      alt: "Flowmate",
      url: "https://github.com/ayushgupta-15/flowmate",
      description: "A TypeScript-based productivity and workflow management tool designed to help developers and teams manage tasks, track progress, and streamline collaboration.",
      technologies: ["TypeScript", "Next.js", "Tailwind CSS"],
      category: "Productivity / Developer Tool",
      year: "2025",
      features: [
        "Workflow and task management",
        "Team collaboration features",
        "Developer-focused productivity interface",
        "Type-safe TypeScript codebase"
      ],
      isFavorite: false
    },
    {
      id: "project-c-log-analyzer",
      name: "C Log Analyzer",
      type: "Personal Project",
      src: "/images/projects/c-log-analyzer.png",
      alt: "C Log Analyzer",
      url: "https://github.com/ayushgupta-15/c-log-analyzer",
      description: "A high-performance C CLI tool for streaming log analysis, error aggregation, time-window analytics, and JSON/CSV reporting. Built with streaming I/O and modular architecture for large log files.",
      technologies: ["C (C99)", "Make", "GCC", "Valgrind", "AddressSanitizer"],
      category: "Systems / CLI Tool",
      year: "2025",
      features: [
        "Streaming line-by-line log parsing",
        "Error aggregation with top-N frequency ranking",
        "Time-window analytics (group by minute/hour)",
        "Multiple output formats: text, JSON, CSV",
        "ANSI colorized terminal output",
        "Debug builds with AddressSanitizer"
      ],
      isFavorite: false
    },
    {
      id: "project-social",
      name: "Social — A New Way to Share",
      type: "Personal Project",
      src: "/images/projects/social.png",
      alt: "Social Platform",
      url: "https://social-mu-eosin.vercel.app/",
      description: "A modern social media platform built for sharing and discovering content. Features a clean feed, user profiles, and real-time interactions designed around developer-friendly workflows.",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
      category: "Social / Full Stack",
      year: "2024",
      features: [
        "User profiles and content feed",
        "Real-time interactions",
        "Modern, responsive UI",
        "Authentication and user management"
      ],
      isFavorite: false
    }
  ];
