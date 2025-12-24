
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
- **Icons:** `ng-icons`.

## 🚀 Getting Started

### Prerequisites
Ensure you have `Node.js` installed and run:
```bash
npm install

```

### Running the System

To run both the Frontend and the Backend (API) simultaneously with proxy support:

```bash
npx nx run-many -t serve -p api frontend --parallel -- --host=0.0.0.0

```

## 🎯 POC Milestones Achieved

* [x] **Enterprise UI:** Implemented a Login screen using PrimeNG Aura theme matching the corporate UI/UX.
* [x] **Full-Stack Connection:** Established a secure connection between Angular and NestJS via a local Proxy configuration.
* [x] **Environment Parity:** Verified that the Replit "Workshop" environment can host complex Nx workspaces.

## 📅 Next Steps

* Integrate external Postgres/MySQL database.
* Add JWT Authentication logic.
* Implement Business Logic triggers for ERP modules.

---

**Status:** Internal POC - Testing Phase.
**Author:** Elunic Hybrid Tech Lead Team.

```

