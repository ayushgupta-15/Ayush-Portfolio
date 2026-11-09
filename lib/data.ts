export const profile = {
  name: "Ayush Gupta",
  email: "ayushgupta.professional@gmail.com",
  github: "https://github.com/ayushgupta-15",
  linkedin: "https://linkedin.com/in/ayushgupta-sde",
  leetcode: "https://leetcode.com/ashg1511",
};

export type Product = {
  name: string;
  summary: string;
  stack: string;
  live?: string;
  code: string;
  size: "wide" | "narrow";
};

export const products: Product[] = [
  {
    name: "Noesis",
    summary:
      "A research pipeline that plans its queries, searches the web, extracts findings, and writes a report only once the evidence is strong enough. Citations are verified in code, and progress streams to the UI as it works.",
    stack: "Next.js, TypeScript, Vercel AI SDK, Exa, Neon Postgres, Zustand",
    live: "https://noesis-pearl.vercel.app",
    code: "https://github.com/ayushgupta-15/Noesis",
    size: "wide",
  },
  {
    name: "JobForge AI",
    summary:
      "Job application tracker with LLM resume scoring and semantic job matching. Falls back to keyword matching when the vector store is unavailable. Redis handles caching and rate limiting.",
    stack: "Next.js, FastAPI, Go, Qdrant, Redis, Docker",
    live: "https://jobforge-ai.vercel.app",
    code: "https://github.com/ayushgupta-15/jobforge-ai",
    size: "narrow",
  },
  {
    name: "TeamSync",
    summary:
      "Multi-tenant project management. Every query is scoped to a workspace at the database layer, and role-based permissions are enforced on the server, with integration tests covering both.",
    stack: "React, Express, TypeScript, MongoDB, JWT, Google OAuth",
    live: "https://teamsync-platform.vercel.app",
    code: "https://github.com/ayushgupta-15/TeamSync",
    size: "narrow",
  },
  {
    name: "LuminAI",
    summary:
      "Ask questions about your data in plain English and get SQL-backed answers with charts. FastAPI backend, React frontend, pgvector for document search.",
    stack: "FastAPI, React, LangChain, pgvector, Docker",
    code: "https://github.com/ayushgupta-15/LuminAI-Data-Analyst",
    size: "wide",
  },
];

export type Row = { name: string; summary: string; stack: string; code: string };

export const systems: Row[] = [
  {
    name: "RTOS kernel",
    summary:
      "Preemptive kernel with O(1) priority scheduling, mutexes and semaphores, software timers, and ports for Cortex-M4 and POSIX.",
    stack: "C, QEMU",
    code: "https://github.com/ayushgupta-15/RTOS-Kernel",
  },
  {
    name: "Mini compiler",
    summary:
      "Lexer, parser, AST, IR generation, optimization passes and a multi-file linker with symbol resolution.",
    stack: "C++17",
    code: "https://github.com/ayushgupta-15/mini-compiler",
  },
  {
    name: "RV32I pipelined CPU",
    summary:
      "Five-stage RISC-V core with forwarding, hazard detection and branch flushing, verified by an automated regression.",
    stack: "Verilog",
    code: "https://github.com/ayushgupta-15/rv32i-5stage-pipelined-processor",
  },
  {
    name: "AXI4-Lite interconnect",
    summary:
      "Multi-master interconnect with arbitration, protocol assertions and functional coverage.",
    stack: "SystemVerilog",
    code: "https://github.com/ayushgupta-15/axi4-lite-interconnect-sv",
  },
  {
    name: "Circuit simulator",
    summary:
      "SPICE-style simulator using modified nodal analysis, sparse solvers and Newton-Raphson, checked against ngspice.",
    stack: "C++20, Eigen",
    code: "https://github.com/ayushgupta-15/circuit-simulation-framework",
  },
  {
    name: "Static timing analysis engine",
    summary:
      "Timing graph construction, arrival and required-time propagation, slack and critical-path extraction.",
    stack: "C++20, GoogleTest",
    code: "https://github.com/ayushgupta-15/static-timing-analysis-engine",
  },
];

export const data: Row[] = [
  {
    name: "Large-scale e-commerce recommender",
    summary:
      "Streams 216M events in constant memory, builds co-visitation candidates (80.8% Recall@100) and reranks with LightGBM LambdaRank. Metrics are on a 250K-session dev sample.",
    stack: "Python, Polars, LightGBM",
    code: "https://github.com/ayushgupta-15/large-scale-ecommerce-recommender",
  },
  {
    name: "Retail demand forecasting",
    summary:
      "Daily demand forecasts turned into inventory replenishment policies, served through a Streamlit app.",
    stack: "Python, XGBoost, DuckDB",
    code: "https://github.com/ayushgupta-15/retail-demand-forecasting-inventory-optimization",
  },
];

export const skills: { group: string; items: string }[] = [
  { group: "Languages", items: "C, C++, Python, TypeScript, Go, Verilog, SystemVerilog" },
  { group: "Web and backend", items: "React, Next.js, Node.js, Express, FastAPI, PostgreSQL, MongoDB, Redis" },
  { group: "Tooling", items: "Linux, Git, Docker, GitHub Actions, CMake, QEMU" },
  { group: "Data and ML", items: "pandas, scikit-learn, XGBoost, LightGBM, SQL" },
];

export type ExperienceLink = { label: string; href: string; icon: "globe" | "phone" | "external" };
export type ExperienceProduct = { name: string; note?: string; links: ExperienceLink[] };
export type Experience = {
  company: string;
  role: string;
  period: string;
  place: string;
  points: string[];
  products: ExperienceProduct[];
};

export const experience: Experience[] = [
  {
    company: "EcoXchange Pvt. Ltd.",
    role: "Full Stack Development Intern",
    period: "Jun 2026 to Aug 2026",
    place: "Remote and hybrid",
    points: [
      "Integrated Google OAuth single sign-on across two production products, EcoXchange and Campus Kartt, replacing separate credential flows with one identity provider.",
      "Automated build, test and deployment for both products with GitHub Actions.",
      "Fixed cross-platform navigation and responsiveness defects in both products.",
    ],
    products: [
      {
        name: "EcoXchange",
        note: "Digital product passport infrastructure",
        links: [{ label: "Website", href: "https://www.ecoxchange.in/", icon: "globe" }],
      },
      {
        name: "Campus Kartt",
        note: "Student marketplace for academic equipment",
        links: [{ label: "Website", href: "https://www.campuskartt.in/", icon: "globe" }],
      },
    ],
  },
  {
    company: "Hibiscustech GR Pvt. Ltd.",
    role: "Full Stack Developer Intern",
    period: "Jul 2025 to Jul 2026",
    place: "Remote",
    points: [
      "Built the Next.js and TypeScript web front end for PsyPlay, a board-game platform with chess, Ludo and Connect 4, on top of Go services and a PostgreSQL data model.",
      "Developed screens for the PsyPlay React Native (Expo) app: real-time matchmaking over Socket.IO, store and rewards flows, and REST integration. The app is live on Google Play and the App Store.",
      "Contributed to the Go chess-analysis microservice: the Stockfish runner, endgame tablebase lookup with a Redis cache, and move classification. The front end shows evaluations as they stream in.",
      "Added Firebase sign-in, Jest tests and a GitHub Actions pipeline that runs typecheck, lint, tests and an iOS bundle export.",
      "Delivered the company's corporate website.",
    ],
    products: [
      {
        name: "PsyPlay",
        links: [
          { label: "Website", href: "https://psyplay.io", icon: "globe" },
          { label: "Google Play", href: "https://play.google.com/store/apps/details?id=io.psyplay.app", icon: "phone" },
          { label: "App Store", href: "https://apps.apple.com/us/app/psyplay/id6793650706", icon: "phone" },
        ],
      },
      { name: "Hibiscustech website", links: [{ label: "Website", href: "https://hibiscustech.org", icon: "globe" }] },
    ],
  },
];
