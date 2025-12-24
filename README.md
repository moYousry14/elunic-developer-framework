# Elunic Developer Framework (Replit Template)

Standardized "Plug & Play" template for rapid ERP development, mirroring **"The Villa"** architecture.

## 🚀 Project Status: Day 2 - Foundations & Connectivity Proof

Currently, the framework is in the **POC (Proof of Concept)** stage, focusing on establishing a secure, scalable link between Angular 18 and NestJS.

### ✅ Completed Milestones
- **Nx Monorepo Setup:** Unified workspace for `frontend` (Angular) and `api` (NestJS).
- **UI/UX Standard:** Integrated **PrimeNG v18 (Aura Theme)** with standalone components.
- **Shared Type Safety:** Implemented `@elunic-workspace/shared-types` library to ensure data integrity across the stack.
- **API Proxy:** Configured seamless communication between the client (4200) and server (3000).
- **Mock Authentication:** Fully functional login flow with consistent business logic.

### 🛠 Tech Stack
- **Frontend:** Angular 18+, PrimeNG, ng-icons.
- **Backend:** NestJS (Enterprise Node.js Framework).
- **Monorepo:** Nx Tools.
- **Persistence:** Ready for PostgreSQL (via TypeORM).

### 📖 How to Run
1. Install dependencies: `npm install`
2. Start both apps: 
   ```bash
   npx nx run-many -t serve -p api frontend --parallel -- --host=0.0.0.0
