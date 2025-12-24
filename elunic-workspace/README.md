# Elunic Developer Framework (Replit Template) 🚀

A standardized "Plug & Play" template designed to mirror the company's main ERP architecture (**ShopfloorGPT / "The Villa"**). This POC proves that high-end enterprise code can be developed in Replit and integrated into the main monorepo with **Zero DevOps overhead**.

## 🏗️ Architecture Strategy
- **Mono-Repo Structure:** Managed via **Nx** to ensure scalability and shared logic between API and Frontend.
- **Plug & Play:** Designed as a seamless plugin; the entire `apps/` directory can be moved to the main company monorepo without code changes.
- **Zero DevOps:** Pre-configured proxy and build targets to work instantly in cloud environments like Replit.

## 🛠️ Tech Stack
- **Frontend:** Angular 18+ (Standalone Components) + **PrimeNG 18** (Aura Theme).
- **Backend:** **NestJS** (Enterprise Node.js Framework).
- **Workspace:** **Nx Monorepo**.

## 🚀 Getting Started
```bash
npm install
npx nx run-many -t serve -p api frontend --parallel -- --host=0.0.0.0
```

---
**Status:** Internal POC - Testing Phase.
**Author:** Elunic Hybrid Tech Lead Team.
