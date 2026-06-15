import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const dataPath = path.join(root, "data", "ecosystem.json");
const assetsDir = path.join(root, "assets");

const data = JSON.parse(await fs.readFile(dataPath, "utf8"));

await fs.mkdir(assetsDir, { recursive: true });

const esc = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const mdLink = (node) =>
  node.url ? `[${node.name}](${node.url})` : node.name;

function generateSvg(theme) {
  const isDark = theme === "dark";

  const bg = isDark ? "#0d1117" : "#f8fafc";
  const title = isDark ? "#e5e7eb" : "#020617";
  const muted = isDark ? "#94a3b8" : "#475569";
  const weak = isDark ? "#64748b" : "#64748b";
  const accent = isDark ? "#38bdf8" : "#0284c7";

  return `<svg width="1200" height="280" viewBox="0 0 1200 280" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="280" fill="${bg}"/>

  <g opacity="0.76">
    <line x1="735" y1="75" x2="825" y2="118" stroke="${accent}" stroke-opacity="0.32"/>
    <line x1="825" y1="118" x2="935" y2="90" stroke="${accent}" stroke-opacity="0.28"/>
    <line x1="825" y1="118" x2="955" y2="168" stroke="${accent}" stroke-opacity="0.28"/>
    <line x1="735" y1="75" x2="670" y2="158" stroke="${accent}" stroke-opacity="0.22"/>
    <line x1="670" y1="158" x2="825" y2="118" stroke="${accent}" stroke-opacity="0.22"/>
    <line x1="955" y1="168" x2="1045" y2="128" stroke="${accent}" stroke-opacity="0.2"/>
  </g>

  <circle cx="735" cy="75" r="5" fill="${accent}"/>
  <circle cx="825" cy="118" r="8" fill="${accent}"/>
  <circle cx="935" cy="90" r="4" fill="${weak}"/>
  <circle cx="955" cy="168" r="5" fill="${weak}"/>
  <circle cx="670" cy="158" r="4" fill="${weak}"/>
  <circle cx="1045" cy="128" r="4" fill="${weak}"/>

  <text x="80" y="112" fill="${title}" font-family="Inter, Arial, sans-serif" font-size="42" font-weight="700" letter-spacing="1">
    ${esc(data.name)}
  </text>

  <text x="82" y="151" fill="${muted}" font-family="Inter, Arial, sans-serif" font-size="17" letter-spacing="1.4">
    ${esc(data.title.toUpperCase())}
  </text>

  <text x="82" y="192" fill="${accent}" font-family="Inter, Arial, sans-serif" font-size="15" letter-spacing="1">
    ${esc(data.thesis)}
  </text>

  <text x="82" y="226" fill="${weak}" font-family="Inter, Arial, sans-serif" font-size="13" letter-spacing="1">
    each mind a node · each node a system · each system a living ecosystem
  </text>
</svg>
`;
}

function generateMermaid() {
  return `flowchart LR
    P[NEO-PROTOCOL] --> C[Chat-as-a-Protocol]
    P --> F[NEO-FlowOFF]
    P --> G[NEO-Growth-System]
    P --> FP[FlowPay-Core]
    P --> S[neo-smart-factory]
    P --> D[FluxxDAO]
    P --> A[Neo Avatar Project]

    C --> G
    G --> F
    F --> FP
    FP --> P
    S --> D
    A --> C

    classDef core fill:#0f172a,stroke:#38bdf8,stroke-width:2px,color:#e0f2fe;
    classDef node fill:#111827,stroke:#475569,stroke-width:1px,color:#e5e7eb;
    classDef payment fill:#111827,stroke:#22c55e,stroke-width:1px,color:#dcfce7;
    classDef identity fill:#111827,stroke:#ec4899,stroke-width:1px,color:#fce7f3;
    classDef chain fill:#111827,stroke:#eab308,stroke-width:1px,color:#fef9c3;

    class P core;
    class C,F,G,D node;
    class FP payment;
    class S chain;
    class A identity;`;
}

function generateReadme() {
  const rows = data.nodes
    .map((node) => `| ${mdLink(node)} | ${node.layer} |`)
    .join("\n");

  return `<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./assets/neo-banner-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="./assets/neo-banner-light.svg">
  <img alt="NEØ Protocol · Digital Systems Architecture" src="./assets/neo-banner-dark.svg" width="100%">
</picture>

<div align="center">

# ${data.name}

**${data.title}**

\`${data.thesis}\`

<br>

![Status](https://img.shields.io/badge/status-${encodeURIComponent(data.status)}-000?style=flat-square&labelColor=000000&color=38bdf8)
![Ecosystem](https://img.shields.io/badge/ecosystem-${data.nodes.length}_nodes-000?style=flat-square&labelColor=000000&color=38bdf8)
![Projects](https://img.shields.io/badge/projects-${encodeURIComponent(data.projects)}-000?style=flat-square&labelColor=000000&color=38bdf8)
![Protocol](https://img.shields.io/badge/protocol-NEØ-000?style=flat-square&labelColor=000000&color=38bdf8)

<br><br>

> Each mind a node.  
> Each node, a system.  
> Each system, a living ecosystem.

</div>

---

## ◧ Current Focus

Building a distributed ecosystem where **AI agents, payment events, CRM flows, dashboards, webhooks and on-chain infrastructure** operate as connected systems.

Not isolated tools.  
Not content layers.  
Infrastructure.

---

## ░ Ecosystem Nodes

| Node | Layer |
| --- | --- |
${rows}

---

## ◨ Protocol Map

\`\`\`mermaid
${generateMermaid()}
\`\`\`

---

<details>
<summary>░ What I Build</summary>

<br>

\`\`\`txt
+--------------------------------------------------+
| SYSTEMS I BUILD                                  |
+--------------------------------------------------+
| 01 | AI agents for sales, support and operations |
| 02 | CRM + SDR + growth automation engines       |
| 03 | Payment layers connected to business events |
| 04 | Dashboards and operational interfaces       |
| 05 | Webhooks, APIs and agent runtimes           |
| 06 | Smart contract and token infrastructure     |
| 07 | Digital ecosystems with functional nodes    |
+--------------------------------------------------+
\`\`\`

</details>

---

<details>
<summary>◨ Stack Signals</summary>

<br>

\`\`\`txt
NEO_PROTOCOL
|
+-- runtime
|   +-- agents
|   +-- APIs
|   +-- orchestration
|   +-- memory
|
+-- growth
|   +-- CRM
|   +-- SDR
|   +-- automation
|   +-- dashboards
|
+-- payments
|   +-- PIX
|   +-- ledger
|   +-- webhooks
|   +-- business events
|
+-- chain
|   +-- smart contracts
|   +-- tokens
|   +-- governance
|
+-- interfaces
    +-- webapps
    +-- chat
    +-- avatars
    +-- operational UI
\`\`\`

</details>

---

<details>
<summary>◧ Origin</summary>

<br>

I spent more than a year and a half studying in silence.

Learning new technologies.  
Rebuilding marketing systems.  
Testing agents, APIs, dashboards, payment flows, CRM structures, apps, automations and infrastructure.

At some point, I stopped planning too much.

And started building.

One system per day.

What looked like isolated repositories became a distributed architecture.

Not projects.  
Nodes.

Not tools.  
Systems.

Not content.  
Infrastructure.

</details>

---

<div align="center">

## ░ Connect

[![X](https://img.shields.io/badge/@node_mello-000?style=flat-square&logo=x&logoColor=38bdf8)](https://x.com/node_mello)
[![Instagram](https://img.shields.io/badge/@neoprotocol.eth-000?style=flat-square&logo=instagram&logoColor=38bdf8)](https://www.instagram.com/neoprotocol.eth/)
[![ENS](https://img.shields.io/badge/neomello.eth-000?style=flat-square&logo=ethereum&logoColor=38bdf8)](https://etherscan.io/enslookup-search?search=neomello.eth)
[![Site](https://img.shields.io/badge/neoprotocol.space-000?style=flat-square&logo=vercel&logoColor=38bdf8)](https://neoprotocol.space)

<br><br>

↳ © NΞØ PROTOCOL  
↳ neoprotocol.space

</div>
`;
}

await fs.writeFile(
  path.join(assetsDir, "neo-banner-dark.svg"),
  generateSvg("dark"),
  "utf8"
);

await fs.writeFile(
  path.join(assetsDir, "neo-banner-light.svg"),
  generateSvg("light"),
  "utf8"
);

await fs.writeFile(path.join(root, "README.md"), generateReadme(), "utf8");

console.log("Generated README.md and SVG banners.");
