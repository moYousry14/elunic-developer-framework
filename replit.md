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

### Single Port Architecture
- **Port**: 5000 (NestJS serves both API and static frontend)
- **Static Files**: Angular production build served from `dist/apps/frontend/`
- **API Routes**: All `/api/*` routes handled by NestJS controllers
- **Static Module**: `@nestjs/serve-static` configured to exclude `/api/*`

### Frontend Architecture
- **Framework**: Angular 18+ with standalone components (no NgModules required)
- **UI Library**: PrimeNG 18 with Aura theme
- **Build Tool**: Webpack-based `@angular-devkit/build-angular:browser` (not Vite, to avoid WebSocket issues in Replit)
- **HMR/LiveReload**: Disabled for Replit compatibility
- **State Management**: Angular Signals for reactive state
- **Dependency Injection**: `inject()` function pattern (no constructor injection)
- **CSS**: Tailwind CSS with `tw-` prefix (preflight: false to not conflict with PrimeNG)

### Styling & Theme (sioDefault Palette)
- **Primary Color**: `#0090D4`
- **Body Background**: `#ececec`
- **Font Family**: Oxygen (Google Fonts)
- **CSS Layers**: primeng, primeflex, tailwind (organized in styles.scss)

### Backend Architecture
- **Framework**: NestJS (enterprise Node.js framework)
- **Build Tool**: Webpack with `@nx/webpack/app-plugin`
- **API Prefix**: All routes prefixed with `/api`
- **Port**: Runs on port 5000 (via `PORT` environment variable)
- **Static Serving**: Serves Angular frontend via `@nestjs/serve-static`

### Shared Libraries

#### shared-types
- **Location**: `libs/shared-types`
- **Purpose**: End-to-end type safety between frontend and backend
- **Types Defined**: `UserProfile`, `AuthResponse`, `LoginPayload`
- **Import Path**: `@elunic-workspace/shared-types`

#### api-interfaces
- **Location**: `libs/api-interfaces`
- **Purpose**: API response contracts and DTOs
- **Types Defined**: `DataResponse<T>`, `UserMeDto`
- **Import Path**: `@elunic-workspace/api-interfaces`
- **DataResponse Pattern**: All API responses wrapped in `{ data: T, meta: Record<string, unknown> }`

#### sio-common
- **Location**: `libs/sio-common`
- **Purpose**: Shared Angular components and services (ShopfloorGPT pattern)
- **Exports**: `SharedSessionService`, `AuthInterceptor`, `HeaderComponent`
- **Import Path**: `@elunic-workspace/sio-common`
- **SharedSessionService**: Uses Angular Signals (`currentUser`, `isLoggedIn`, `initializeService`)
- **AuthInterceptor**: Handles 401/403 responses and redirects to login

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

### Production Orders
- **Endpoint**: `GET /api/production/orders`
- **Response Format**: Returns `DataResponse<ProductionOrder[]>` with mock orders
- **ProductionOrder Fields**: id (string), name (string), status ('Running' | 'Idle' | 'Error'), progress (number)
- **Dashboard Display**: PrimeNG Knob for overall efficiency, ProgressBars for individual orders

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

# Build frontend for production
npx nx build frontend --configuration=production

# Run API (serves both API and static frontend on port 5000)
PORT=5000 npx nx serve api --configuration=development

# Or build and run in one command
npx nx build frontend --configuration=production && PORT=5000 npx nx serve api --configuration=development
```