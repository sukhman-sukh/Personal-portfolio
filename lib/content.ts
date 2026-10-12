// All site copy and data lives here. Edit this file, not the components.
// Role and project details come from the 1-page resume (Dev_Resume_1Page_Sukhman_.pdf).
// Lines marked TODO(sukhman) are guesses or gaps. Dates get checked against the newer resume.

export const PERSON = {
  name: "Sukhman Singh",
  short: "Sukhman",
  email: "sukhmansinghsaluja@gmail.com", // TODO(sukhman): swap if you want an address without "saluja"
};

export const LINKS: { label: string; href: string }[] = [
  { label: "Book 30 minutes", href: "https://calendly.com/sukhmansinghsaluja/30min" },
  { label: "GitHub", href: "https://github.com/sukhman-sukh" },
  { label: "X", href: "https://x.com/SinghSukhman_/" },
  // TODO(sukhman): add LinkedIn, e.g. { label: "LinkedIn", href: "https://www.linkedin.com/in/..." }
];

export const QUOTE = {
  tail: "and let it kill you",
  by: "Charles Bukowski, probably",
};

export const INTRO =
  "I'm Sukhman Singh, an engineer from IIT Roorkee. I take systems apart until I understand them, then build my own. Right now that's Revoca.";

export const ABOUT = {
  title: "The short version",
  lead: "I'm Sukhman, and I've never been able to leave a working system alone. If something runs, I want to know why, and the fastest way I know to find out is to break it and build it back myself. It's the thing I'd do even if nobody paid me, which is probably why most of my best work started at 2am.",
  rangeIntro: "That habit has dragged me all over the stack.",
  range: [
    { domain: "Low-level systems", detail: "A Game Boy emulator in C++, with the CPU and PPU built cycle by cycle from the spec." },
    { domain: "Edge networking", detail: "packetXpress, a load balancer that filters and routes packets inside the Linux kernel with eBPF and XDP." },
    { domain: "Network engineering", detail: "NAT traversal and WebRTC transports for py-libp2p, and a Bluetooth mesh for qaul that works without the internet." },
    { domain: "Cloud and scale", detail: "CTF infrastructure for 1000+ players, pushed from 300 to 1500 requests a second, and lookups in about 1ms across 10M merchants." },
    { domain: "AI and agents", detail: "Where I am now: JARVIS, memory layers for LLMs, and Revoca.", now: true },
  ],
  facts: [
    { term: "Studied", detail: "B.Tech in Computer Science and Engineering at IIT Roorkee, 2022 to 2026." },
    { term: "JEE Advanced", detail: "Top 0.05% of 1.2 million students." },
    { term: "Usually writing", detail: "Rust, Go, Python and C++, with Docker, Kubernetes, Cilium and eBPF close by. On Arch, by the way." },
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
    end: "2026-06", // TODO(sukhman): confirm from the newer resume
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
    end: "now",
    kind: "job",
    summary: "Maintaining and scaling the lab's core infrastructure: internal CI pipelines and production deploys.",
    points: [
      "Maintained and scaled SDSLabs' core infrastructure, including internal CI pipelines and production deployments.",
      "Maintainer of Beast, the platform the lab uses to run national and intra-institute CTFs for 1000+ players.",
      "Took part in hackathons and CTFs, and contributed to the lab's open-source projects.",
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
    link: { label: "qaul on GitHub", href: "https://github.com/qaul/qaul.net" },
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
    role: "ML Platform Engineer Intern",
    start: "2026-02", // TODO(sukhman): confirm from the newer resume
    end: "2026-04",
    kind: "job",
    summary: "ML platform work on Abacus.AI's enterprise stack: training, serving and scaling LLM workloads.",
    points: [
      "Worked on the ML platform behind Abacus.AI's enterprise products.",
      "Training, serving and scaling LLM workloads.",
    ], // TODO(sukhman): replace with the bullets from the newer resume
    worked: ["ML infrastructure", "LLM serving", "Python"],
  },
  {
    id: "revoca",
    org: "Revoca",
    role: "Founder", // TODO(sukhman): confirm title
    start: "2026-05", // TODO(sukhman): confirm start month
    end: "now",
    kind: "venture",
    summary: "Company memory that doesn't walk out the door. Still iterating.",
    points: [
      "When people leave, the reasoning behind decisions goes with them. Revoca pulls context from GitHub, Slack, Discord and docs and stores it somewhere you can actually search.",
      "Agents run inside Slack and Discord, and an MCP server brings the same memory into your IDE.",
    ],
    worked: ["Agents", "Retrieval", "MCP", "Slack and Discord"],
    link: { label: "Visit revocaai.xyz", href: "https://revocaai.xyz/" },
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
    summary: "Company memory that doesn't walk out the door. Context from GitHub, Slack and docs, searchable.",
    body: "Pulls context from GitHub, Slack, Discord and docs, and runs agents inside the tools your team already uses.",
    points: [
      "Ingests GitHub, Slack, Discord and docs into one searchable memory.",
      "Agents answer inside Slack and Discord, where the questions already get asked.",
      "MCP-enabled, so the same memory is available from your IDE.",
    ],
    topics: ["agents", "retrieval", "mcp"],
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
    lang: "C",
    status: "shipped",
    statusLabel: "Shipped",
    summary: "An eBPF/XDP cluster gateway that filters and balances packets before the network stack sees them.",
    body: "Started because I wanted to know if the kernel datapath was actually faster. It was.",
    points: [
      "An eBPF/XDP based cluster gateway that does packet filtering and load balancing.",
      "Runs at the XDP hook, so packets are handled before they reach the kernel's network stack.",
    ],
    topics: ["ebpf", "xdp", "kernel", "load balancing"],
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
    link: { label: "Source on GitHub", href: "https://github.com/sukhman-sukh/AdDao" },
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
