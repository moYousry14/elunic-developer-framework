Elunic Developer Framework (Replit Template)
Standardized "Plug & Play" framework designed to mirror "The Villa" (ShopfloorGPT Monorepo) for zero-overhead feature migration [cite: 2025-12-24].

🏛️ Architectural Strategy: The Workshop Concept
This repository acts as "The Workshop", a sandbox where new modules are built under strict Elunic Golden Stack governance [cite: 2025-12-24].

Mirroring: Folder structures and library paths match the main Monorepo [cite: 2025-12-24].

Isolation: Using CSS prefixing and modular logic for seamless "Copy/Paste" into production.

🚀 Project Status: Milestone 1 - Plug & Play Success
We have successfully proven that AI-governed development can produce enterprise-ready modules that integrate with zero configuration changes [cite: 2025-12-24].

✅ Completed Milestones
Nx Monorepo Architecture: Standardized apps/ and libs/ structure.

Styling Governance: Mandatory tw- prefix for Tailwind to prevent CSS collisions in "The Villa".

Modern Angular Standards: 100% usage of Signals and inject() pattern (Functional DI).

Plug & Play Proof: Successfully generated and integrated the system-health module alongside existing apps [cite: 2025-12-24].

Data Integrity: Global implementation of the DataResponse<T> wrapper for all API communications.

🛠 Tech Stack (The Golden Stack)
Frontend: Angular 18+, PrimeNG (Aura Theme), ng-icons.

Backend: NestJS (Enterprise Node.js).

Monorepo Tools: Nx (Build System).

Standards: Tailwind CSS (Prefixed), Functional DI, Shared API Interfaces.

📖 How to Run (Nx Commands)
To run the Production Monitoring suite:

Bash

# Force reset and serve (Recommended for Replit environment)
npx nx reset && npx nx serve production-monitoring-backend
To run the System Health suite (POC Proof):

Bash

npx nx reset && npx nx serve system-health-backend
