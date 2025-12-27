# Elunic Developer Framework (Replit Template)

Standardized **"Plug & Play"** framework designed to mirror **"The Villa"** (ShopfloorGPT Monorepo) architecture for zero-overhead feature migration.

## 🏛️ Architectural Strategy: The Workshop Concept
This repository acts as **"The Workshop"**, a rapid R&D sandbox where new modules are built under strict Elunic Golden Stack governance. 
* **Mirroring:** Folder structures, library paths, and naming conventions match the main Monorepo.
* **Isolation:** Strict usage of CSS prefixing and modular logic to ensure seamless "Copy/Paste" into production.

## 🚀 Project Status: Milestone 1 - Plug & Play Success
We have successfully proven that AI-governed development can produce enterprise-ready modules that integrate with zero configuration changes .

### ✅ Completed Milestones
* **Nx Monorepo Architecture:** Standardized `apps/` and `libs/` structure for scalable development.
* **Styling Governance:** Mandatory **`tw-` prefix** for Tailwind CSS to prevent global style collisions in "The Villa".
* **Modern Angular Standards:** 100% implementation of **Signals** and the **`inject()` pattern** (Functional DI).
* **Plug & Play Proof:** Successfully generated and integrated the **`system-health`** module alongside existing apps using shared libraries .
* **Data Integrity:** Global implementation of the **`DataResponse<T>`** wrapper for consistent API communication.

### 🛠 Tech Stack (The Golden Stack)
* **Frontend:** Angular 18+ (Standalone Components), PrimeNG (Aura Theme), ng-icons.
* **Backend:** NestJS (Enterprise Node.js Framework).
* **Monorepo Tools:** Nx Build System.
* **Core Principles:** Prefixed Tailwind, Signal-based State, Functional DI, Shared API Interfaces.

### 📖 How to Run (Nx Commands)
To serve the **Production Monitoring** suite:
```bash
# Force reset and serve backend (which serves the frontend static files)
npx nx reset && npx nx serve production-monitoring-backend

To serve the System Health POC:

Bash

# Verify independent module execution
npx nx reset && npx nx serve system-health-backend
