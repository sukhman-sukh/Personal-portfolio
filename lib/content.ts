// All site copy and data lives here. Edit this file, not the components.
// Role and project details come from his resumes (old 1-page PDF and the October 2026 LaTeX one).
// Lines marked TODO(sukhman) are guesses or gaps. Dates come from the October 2026 resume.

export const PERSON = {
  name: "Sukhman Singh",
  short: "Sukhman",
  email: "sukhmansinghsaluja@gmail.com", // TODO(sukhman): swap if you want an address without "saluja"
};

export const LINKS: { label: string; href: string }[] = [
  { label: "Book 30 minutes", href: "https://calendly.com/sukhmansinghsaluja/30min" },
  { label: "GitHub", href: "https://github.com/sukhman-sukh" },
  { label: "X", href: "https://x.com/SinghSukhman_/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sukhman-singh-291a8b252/" },
];

export const QUOTE = {
  tail: "and let it kill you",
};

// First sentence sits on its own line.
export const INTRO = [
  "I'm Sukhman Singh, an engineer from IIT\u00a0Roorkee.",
  "If you ever catch me talking to my phone, it's probably JARVIS.",
];

export const ABOUT = {
  title: "The short version",
  lead: "I'm Sukhman. I learn by taking systems apart and building my own version of them. It's how I spend most of my nights.",
  rangeIntro: "That habit has dragged me all over the stack.",
  range: [
    { domain: "Low-level systems", detail: "A Game Boy emulator in C++, with the CPU and PPU built cycle by cycle from the spec." },
    { domain: "Edge networking", detail: "packetXpress, an L4 gateway in eBPF/XDP and Go: a bit-vector firewall and Maglev load balancing, inside the kernel." },
    { domain: "Network engineering", detail: "NAT traversal and WebRTC transports for py-libp2p, and a Bluetooth mesh for qaul that works without the internet." },
    { domain: "Cloud and scale", detail: "Hosting for AI-generated web apps at Abacus.AI, and CTF infrastructure for 1000+ players pushed from 300 to 1500 requests a second." },
    { domain: "AI and agents", detail: "Where I am now: sandboxes and self-healing CI for coding agents at Abacus.AI, a hybrid RAG engine in Revoca, and JARVIS.", now: true },
  ],
  facts: [
    { term: "Studied", detail: "B.Tech in Computer Science and Engineering at IIT Roorkee, 2022 to 2026." },
    { term: "JEE Advanced", detail: "Top 0.05% of 1.2 million students." },
    { term: "Usually writing", detail: "Python, Go, Rust, TypeScript and C/C++, with Docker, Kubernetes and eBPF close by. On Arch, by the way." },
    { term: "Reading", detail: "Designing Data-Intensive Applications. The Hard Thing About Hard Things." },
    { term: "Off the clock", detail: "F1 strategy calls, chess endgames I lose, and the same sad songs on repeat while I debug." },
  ],
};

/* ── The fuse ─────────────────────────────────────────────────────────── */

// Months are "YYYY-MM". The fuse is drawn to scale between these two dates.
export const FUSE_RANGE = { from: "2022-06", to: "2027-01" };
export const TODAY = "2026-10";

export type Stop = {
  id: string;
  org: string;
  role: string;
  start: string;
  end: string | "now";
  summary: string; // two lines, shown on hover
  points: string[]; // shown in the detail sheet
  worked: string[];
  link?: { label: string; href: string };
  kind: "school" | "job" | "venture";
};

export const STOPS: Stop[] = [
  {
    id: "iitr",
    org: "IIT Roorkee",
    role: "B.Tech, Computer Science and Engineering",
    start: "2022-08",
    end: "2026-05",
    kind: "school",
    summary: "Where the fuse was lit. Came in through JEE Advanced in the top 0.05%, then spent most nights in a lab.",
    points: [
      "Joined for Computer Science and Engineering in 2022, after placing in the top 0.05% of 1.2 million students in JEE Advanced.",
      "Most of what I learned happened outside class: SDSLabs, hackathons, CTFs, and things that broke at 2am.",
    ],
    worked: ["Computer science", "SDSLabs", "Hackathons", "CTFs"],
  },
  {
    id: "sdslabs",
    org: "SDSLabs",
    role: "Joint Secretary",
    start: "2023-04",
    end: "2026-05",
    kind: "job",
    summary: "Maintained and scaled the lab's core infrastructure and production deploys. Organised lectures and hackathons.",
    points: [
      "Maintained and scaled SDSLabs' core infrastructure, including internal CI pipelines and production deployments.",
      "Maintainer of Beast, the platform the lab uses to run national and intra-institute CTFs for 1000+ players.",
      "Organised lectures and hackathons, and played a lot of CTFs.",
    ],
    worked: ["Docker", "CI/CD", "Linux", "Go"],
    link: { label: "Beast on GitHub", href: "https://github.com/sdslabs/beast" },
  },
  {
    id: "gsoc",
    org: "Google Summer of Code",
    role: "Software Developer, Freifunk (qaul)",
    start: "2024-05",
    end: "2024-09",
    kind: "job",
    summary: "A Bluetooth LE mesh in Rust for qaul. Linux, iOS and Android talking to each other with no internet.",
    points: [
      "qaul is an internet-independent wireless mesh app for peer-to-peer communication.",
      "Built a stable Bluetooth Low Energy GATT network in Rust between Linux, iOS and Android devices.",
      "Designed the high and low level models for peer detection and routing tables, which made the mesh more stable.",
    ],
    worked: ["Rust", "Bluetooth LE", "Mesh routing"],
    link: { label: "The GSoC project", href: "https://summerofcode.withgoogle.com/programs/2024/projects/ydglU9hY" },
  },
  {
    id: "zoominfo",
    org: "ZoomInfo",
    role: "Software Engineer Intern",
    start: "2025-05",
    end: "2025-07",
    kind: "job",
    summary: "Ported the embedded app to Salesforce LWC, then built a context-aware AI copilot chat on top.",
    points: [
      "Ported ZoomInfo's embedded app to Salesforce Lightning Web Components, for faster rendering, better security and a more modular codebase.",
      "Built a context-aware AI copilot chat that tunes search results to the user's context and preferences.",
    ],
    worked: ["Salesforce LWC", "JavaScript", "LLMs"],
  },
  {
    id: "libp2p",
    org: "py-libp2p",
    role: "Software Engineer Intern",
    start: "2025-08",
    end: "2025-10",
    kind: "job",
    summary: "Shipped NAT traversal for peers behind symmetric NATs, plus WebRTC and WebRTC-Direct transports.",
    points: [
      "Shipped NAT traversal with circuit relay and hole punching, so peers behind symmetric NATs can reach each other.",
      "Implemented WebRTC and WebRTC-Direct as transport protocols in the decentralized network stack.",
    ],
    worked: ["Python", "libp2p", "WebRTC", "NAT traversal"],
    link: { label: "py-libp2p on GitHub", href: "https://github.com/libp2p/py-libp2p" },
  },
  {
    id: "abacus",
    org: "Abacus.AI",
    role: "AI Infrastructure Engineer",
    start: "2026-02",
    end: "now",
    kind: "job",
    summary: "Infrastructure for Abacus.AI's agentic products: sandboxes for the coding agent, app hosting, and CI that fixes itself.",
    points: [
      "Joined as an AI Infrastructure Engineer intern in February 2026, full time since July 2026.",
      "Build and run infrastructure for Abacus.AI's agentic AI products, and co-own its hosting service for AI-generated web apps.",
      "Built a sandboxed environment where the company's internal coding agent carries out tasks safely and in isolation.",
      "Own the CI/CD pipeline: end-to-end tests that each run in their own sandboxed copy of the platform, plus an agentic LLM system that diagnoses and fixes pipeline failures.",
    ],
    worked: ["Sandboxing", "CI/CD", "Kubernetes", "AI agents", "LLM evals"],
    link: { label: "Visit abacus.ai", href: "https://abacus.ai" },
  },
];

// Small sparks on the cord.
export const SPARKS: { id: string; date: string; label: string; detail: string }[] = [
  { id: "ondc", date: "2024-03", label: "ONDC, top 5", detail: "Top 5 of 100+ at Build for Bharat" },
  { id: "ethsg", date: "2024-09", label: "ETH-Singapore", detail: "Won the AirDAO track" },
  { id: "ethin", date: "2024-12", label: "ETH-India", detail: "Won Lit Protocol and CDP tracks" },
  { id: "piwot", date: "2025-01", label: "Pan-IIT PIWOT", detail: "Won, contract lifecycle platform" },
];

/* ── Projects ─────────────────────────────────────────────────────────── */

export type Project = {
  id: string;
  name: string;
  lang: string;
  status: "burning" | "shipped" | "won";
  statusLabel: string;
  summary: string; // the two lines on the card
  body: string; // the hover preview
  points: string[]; // the detail sheet
  topics: string[];
  link?: { label: string; href: string };
};

export const PROJECTS: Project[] = [
  {
    id: "jarvis",
    name: "JARVIS",
    lang: "Python",
    status: "burning",
    statusLabel: "Work in progress",
    summary: "One personal agent across my phone, laptops, home server and smart home.",
    body: "Named it at 14 and the name stuck. One agent that can reach every device I own, from the phone to the lights.",
    points: [
      "A personal agent that runs across my phone, laptops and home server.",
      "Wired into the smart home, so the same agent can reach the lights too.",
    ],
    topics: ["agents", "home server", "iot"],
  },
  {
    id: "revoca",
    name: "Revoca",
    lang: "Py + TS",
    status: "burning",
    statusLabel: "Still iterating",
    summary: "An AI knowledge layer that turns a team's docs, GitHub, Slack, Discord, Telegram and calls into one brain.",
    body: "Adaptive hybrid RAG with a query planner that routes across vector, knowledge-graph and timeline retrieval. 93% hit@5 on gbrain world-v1.",
    points: [
      "An AI knowledge layer that turns an org's docs, GitHub, Slack, Discord, Telegram and Meet calls into one brain.",
      "Engineered an adaptive hybrid RAG pipeline: BM25 plus dense retrieval fused with RRF, cross-encoder reranking and RAPTOR, with a query planner routing across vector, knowledge-graph and timeline retrieval.",
      "Benchmarked on gbrain world-v1: 93% hit@5 and 0.84 MRR overall, and 96% relational recall@5.",
    ],
    topics: ["rag", "knowledge graphs", "agents", "evals"],
    link: { label: "Visit revocaai.xyz", href: "https://revocaai.xyz/" },
  },
  {
    id: "py-libp2p",
    name: "py-libp2p",
    lang: "Python",
    status: "shipped",
    statusLabel: "Merged upstream",
    summary: "Open-source work on the Python libp2p stack: NAT traversal, WebRTC transports and gossipsub fixes.",
    body: "Circuit relay and hole punching for peers behind symmetric NATs, plus a run of merged fixes to gossipsub and identify.",
    points: [
      "Shipped NAT traversal with circuit relay and hole punching, so peers behind symmetric NATs can still connect.",
      "Implemented WebRTC and WebRTC-Direct as transport protocols.",
      "Merged fixes upstream across gossipsub, identify and the peer store: message ID handling, TTLs for peer data, and limits on identify push concurrency.",
      "Added discovery tests for circuit relay v2.",
    ],
    topics: ["python", "p2p", "nat traversal", "webrtc", "gossipsub"],
    link: { label: "My pull requests", href: "https://github.com/libp2p/py-libp2p/pulls?q=is%3Apr+author%3Asukhman-sukh" },
  },
  {
    id: "packetxpress",
    name: "packetXpress",
    lang: "C + Go",
    status: "shipped",
    statusLabel: "Shipped",
    summary: "An L4 cluster gateway in eBPF/XDP and Go: firewall, load balancer and packet profiler chained in the kernel.",
    body: "A bit-vector firewall that skips the linear rule scan iptables does, and Maglev consistent hashing for the load balancer.",
    points: [
      "Built an L4 cluster gateway in eBPF/XDP and Go, chaining a firewall, load balancer and packet profiler through XDP tail calls.",
      "Implemented an LBVS bit-vector firewall in XDP that matches 5-tuple rules without the linear rule scan iptables does.",
      "Engineered a reverse proxy with TLS SNI and HTTP Host routing, Maglev consistent hashing and per-CPU conntrack DNAT.",
    ],
    topics: ["ebpf", "xdp", "go", "load balancing", "firewall"],
    link: { label: "Source on GitHub", href: "https://github.com/sukhman-sukh/packetXpress" },
  },
  {
    id: "beast",
    name: "Beast",
    lang: "Go",
    status: "shipped",
    statusLabel: "In production",
    summary: "Runs national and intra-institute CTFs for 1000+ players. Took hot routes from 300 to 1500 requests a second.",
    body: "I maintain it. Multi-instance challenge deploys, backups and recovery, and faster database routes after one too many crashes mid-competition.",
    points: [
      "Maintainer and developer of Beast, used to host national and intra-institute CTFs with 1000+ participants.",
      "Implemented multi-instance challenge deployment, backup, recovery and maintenance.",
      "Sped up database-heavy routes from about 300 to 1500 requests a second.",
    ],
    topics: ["go", "docker", "ctf", "infra"],
    link: { label: "Source on GitHub", href: "https://github.com/sdslabs/beast" },
  },
  {
    id: "gbemu",
    name: "GBEmu",
    lang: "C++",
    status: "shipped",
    statusLabel: "Shipped",
    summary: "A Nintendo Game Boy emulator in C++ and SDL2, with CPU and PPU cycles built from the official spec.",
    body: "Comes with a memory map and pixel map debugger that can trap the emulator's state mid-frame.",
    points: [
      "A Nintendo Game Boy emulator written in C++, using SDL2 for graphics, input and audio.",
      "Engineered the core CPU and PPU cycles from the official Game Boy spec.",
      "Built a memory map and pixel map debugger that traps the emulator's state.",
    ],
    topics: ["emulation", "c++", "sdl2"],
  },
  {
    id: "mycelia",
    name: "Mycelia",
    lang: "TS",
    status: "shipped",
    statusLabel: "Ended",
    summary: "A user-owned Persona Vault: one encrypted context layer that every AI agent can read from.",
    body: "Attach your data, preferences and history once, and every AI app gets the context automatically.",
    points: [
      "Built a user-owned Persona Vault that acts as a universal, encrypted context layer for AI agents.",
      "Designed RAG pipelines and a knowledge graph so personal data, preferences and conversation history give automatic context to queries across different AI apps.",
      "Designed multi-level access control, so users decide exactly who can read what.",
    ],
    topics: ["rag", "knowledge graph", "encryption", "agents"],
    link: { label: "Source on GitHub", href: "https://github.com/sukhman-sukh/Mycelia" },
  },
  {
    id: "optimal-storage",
    name: "Optimal Storage",
    lang: "Shell",
    status: "won",
    statusLabel: "Top 5, ONDC",
    summary: "30,000+ pin codes across 10M merchants with lookups around 1ms. Top 5 of 100+ at ONDC Build for Bharat.",
    body: "Geo-sharded databases and caching layers, deployed to Azure with Ansible and Docker.",
    points: [
      "Built for the ONDC Build for Bharat hackathon, sponsored by Google. Top 5 among 100+ prototypes.",
      "Designed storage for 30,000+ pin codes across 10M merchants with real-time retrieval (round trip around 1ms), using geo-sharded databases and caching layers.",
      "Automated deployment to Azure with Ansible playbooks and Docker.",
    ],
    topics: ["geo-sharding", "caching", "azure", "ansible"],
  },
  {
    id: "addao",
    name: "AdDao",
    lang: "TS",
    status: "won",
    statusLabel: "Won ETH-Singapore",
    summary: "A privacy-first, agentic ad platform on AirDAO. Won the AirDAO track at ETH-Singapore.",
    body: "Ads without the middleman: a decentralized take on AdSense, governed on-chain.",
    points: [
      "Won the AirDAO track at ETH-Singapore 2024.",
      "A privacy-first, agentic advertising platform built on AirDAO.",
    ],
    topics: ["web3", "airdao", "agents", "privacy"],
    link: { label: "See it on ETHGlobal", href: "https://ethglobal.com/showcase/aegis-ukp3p" },
  },
  {
    id: "onchain-persona",
    name: "onchain-persona",
    lang: "TS",
    status: "won",
    statusLabel: "Won ETH-India",
    summary: "An AI persona that replicates you on-chain. Won the Lit Protocol and CDP tracks at ETH-India.",
    body: "Your persona as an agent that lives on-chain and can act the way you would.",
    points: [
      "Won the Lit Protocol and CDP tracks at ETH-India 2024.",
      "An AI persona that replicates you on-chain.",
    ],
    topics: ["lit protocol", "cdp", "ai"],
    link: { label: "See it on Devfolio", href: "https://devfolio.co/projects/aiavatar-caa2" },
  },
];

/* ── Helpers ──────────────────────────────────────────────────────────── */

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const monthIndex = (ym: string) => {
  const [y, m] = ym.split("-").map(Number);
  return y * 12 + (m - 1);
};

export const fuseFrac = (ym: string) => {
  const a = monthIndex(FUSE_RANGE.from);
  const b = monthIndex(FUSE_RANGE.to);
  return (monthIndex(ym) - a) / (b - a);
};

export const fmtMonth = (ym: string) => {
  const [y, m] = ym.split("-").map(Number);
  return `${MONTHS[m - 1]} ${y}`;
};

export const fmtPeriod = (s: Stop) =>
  `${fmtMonth(s.start)} to ${s.end === "now" ? "now" : fmtMonth(s.end)}`;

export const isBurning = (s: Stop) => s.end === "now";
