# Elunic Developer Framework (Replit Template)

## Overview

This is an enterprise-grade monorepo POC designed as a "Plug & Play" template that mirrors Elunic's main ERP architecture (ShopfloorGPT / "The Villa"). The project demonstrates that high-end enterprise code can be developed in Replit with zero DevOps configuration.

The architecture consists of:
- **Frontend**: Angular 18+ application with PrimeNG UI components
- **Backend**: NestJS API server
- **Shared Library**: TypeScript types shared between frontend and backend
- **Workspace**: Nx monorepo for scalability and shared logic

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Monorepo Structure (Nx)
- **Problem**: Need scalable code sharing between frontend and backend while maintaining separation
- **Solution**: Nx workspace with apps in `apps/` directory and libraries in `libs/`
- **Rationale**: The entire `apps/` directory can be moved to the company's main monorepo without code changes

### Frontend Architecture
- **Framework**: Angular 18+ with standalone components (no NgModules required)
- **UI Library**: PrimeNG 18 with Aura theme
- **Build Tool**: Angular CLI with Vite for development
- **API Proxy**: Configured in `proxy.conf.json` to forward `/api` requests to backend on port 3000

### Backend Architecture
- **Framework**: NestJS (enterprise Node.js framework)
- **Build Tool**: Webpack with `@nx/webpack/app-plugin`
- **API Prefix**: All routes prefixed with `/api`
- **Port**: Runs on port 3000 (or `PORT` environment variable)

### Shared Types Library
- **Location**: `libs/shared-types`
- **Purpose**: End-to-end type safety between frontend and backend
- **Types Defined**: `UserProfile`, `AuthResponse`, `LoginPayload`
- **Import Path**: `@elunic-workspace/shared-types`

### Database Layer
- **ORM**: TypeORM
- **Database**: Replit PostgreSQL (configured via PGHOST, PGPORT, PGUSER, PGPASSWORD, PGDATABASE)
- **Entity Location**: `apps/api/src/app/user.entity.ts`
- **Auto-Sync**: Schema synchronization enabled (`synchronize: true`)
- **SSL**: Disabled (Replit PostgreSQL doesn't require SSL)
- **Seeding**: Default admin user (admin/password123) created on application startup

### Default Credentials
- **Username**: admin
- **Password**: password123

### Authentication
- **Current Implementation**: Simple username-based login (no password hashing)
- **Endpoint**: `POST /api/login`
- **Response Format**: Returns `AuthResponse` with user profile and access token

## External Dependencies

### Database
- **PostgreSQL**: Primary database
- Environment variables required:
  - `PGHOST`: Database host
  - `PGPORT`: Database port (default: 5432)
  - `PGUSER`: Database username
  - `PGPASSWORD`: Database password
  - `PGDATABASE`: Database name

### Key NPM Packages
- **Frontend**: `@angular/core`, `primeng`, `@primeng/themes`
- **Backend**: `@nestjs/core`, `@nestjs/typeorm`, `typeorm`, `pg`
- **Workspace**: `nx`, `@nx/angular`, `@nx/nest`

### Development Commands
```bash
# Install dependencies
npm install

# Run both frontend and backend in parallel
npx nx run-many -t serve -p api frontend --parallel -- --host=0.0.0.0

# Build specific project
npx nx build api
npx nx build frontend
```