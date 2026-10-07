# ReadmeArchitecture.md — React/Next.js Clean Architecture

## สารบัญ

1. [Architecture Overview](#1-architecture-overview)
2. [โครงสร้าง Folder](#2-โครงสร้าง-folder)
3. [Flow การทำงาน](#3-flow-การทำงาน)
4. [การติดตั้ง](#4-การติดตั้ง)
5. [การ Test](#5-การ-test)
6. [การ Build](#6-การ-build)
7. [การ Deploy Docker](#7-การ-deploy-docker)

---

## 1. Architecture Overview

โปรเจคนี้ใช้แนวคิด **Clean Architecture** ร่วมกับ **Next.js App Router** โดยแบ่งความรับผิดชอบเป็น Layer ที่ชัดเจน

### Dependency Rule

```
+----------------------------------------------+
|          Presentation Layer                  |
|  app/  - Pages, Components, Server Actions   |
+----------------------+-------------------+---+
                       | depends on
                       v
+----------------------------------------------+
|        Interface Adapters Layer              |
|  src/interface-adapters/ - Controllers,      |
|  Presenters, BFF, API adapters               |
+----------------------+-----------------------+
                       | depends on
                       v
+----------------------------------------------+
|          Application Layer                   |
|  src/application/ - Use Cases,               |
|  Repository/Service Interfaces               |
+----------------------+-----------------------+
                       | depends on
                       v
+----------------------------------------------+
|            Entities Layer                    |
|  src/entities/ - Domain Models (Zod),        |
|  Error Classes                               |
+----------------------------------------------+

+----------------------------------------------+
|          Infrastructure Layer                |
|  src/infrastructure/ - Repository/Service    |
|  Implementations (SQLite, in-file)           |
+----------------------------------------------+

+----------------------------------------------+
|        Dependency Injection (DI)             |
|  di/ - Container, Modules, Symbols           |
|  (wires all layers together)                 |
+----------------------------------------------+
```

### Layer Responsibilities

| Layer | ตำแหน่ง | หน้าที่ |
|-------|---------|---------|
| **Presentation** | `app/` | Pages, Components, Server Actions, API Routes |
| **Interface Adapters** | `src/interface-adapters/` | Controllers, Presenters, BFF, E2E adapters |
| **Application** | `src/application/` | Use Cases, Repository/Service Interfaces |
| **Entities** | `src/entities/` | Domain Models (Zod schemas), Error classes |
| **Infrastructure** | `src/infrastructure/` | SQLite/in-file Repository implementations |
| **Features** | `src/features/` | Feature-based modules (domain + data + presentation) |
| **Core** | `src/core/` | Config, constants, shared utils |
| **DI** | `di/` | IoC container with `@evyweb/ioctopus` |

### Tech Stack

| เทคโนโลยี | วัตถุประสงค์ |
|-----------|------------|
| Next.js 14 (App Router) | Framework หลัก, Server Components |
| React 18 | UI layer |
| TypeScript | Static typing ทั้งโปรเจค |
| Zod | Schema validation + Domain model types |
| Drizzle ORM + libsql | Database ORM + SQLite/Turso |
| Lucia Auth | Session-based authentication |
| Tailwind CSS + shadcn/ui | UI styling + component library |
| @evyweb/ioctopus | Dependency Injection container |
| Vitest | Unit testing |
| Playwright | E2E testing |

### Dual Persistence Mode

```
PERSISTENCE=in-file   ->  ใช้ InFile repositories (JSON files, ไม่ต้องมี DB)
PERSISTENCE=sqlite    ->  ใช้ SQLite repositories ผ่าน Drizzle ORM
```

---

## 2. โครงสร้าง Folder

```
icmon-react-nextjs/
|
+-- app/                              # Next.js App Router (Presentation Layer)
|   +-- (auth)/                       # Auth route group
|   |   +-- sign-in/
|   |   +-- sign-up/
|   +-- (dashboard)/                  # Protected route group
|   |   +-- layout.tsx                # Layout with sidebar + header
|   |   +-- dashboard/
|   |   +-- customers/
|   |   +-- wos/
|   |   +-- iot/
|   |   +-- settings/
|   |   +-- ...
|   +-- _components/                  # Shared UI components
|   |   +-- ui/                       # shadcn/ui base components
|   |   +-- layout/                   # Sidebar, header, footer
|   +-- api/                          # REST API routes
|   +-- layout.tsx                    # Root layout
|   +-- globals.css
|   +-- global-error.tsx
|
+-- src/                              # Clean Architecture Core
|   +-- core/                         # Shared Infrastructure
|   |   +-- config/                   # App config, menu, route permissions
|   |   +-- constants/                # Constants, enums
|   |   +-- contracts/                # Abstract contracts (Mapper, Usecase)
|   |   +-- services/                 # Permission, logger, layout services
|   |   +-- types/                    # Shared TypeScript types
|   |   +-- utils/                    # Utility functions
|   |
|   +-- features/                     # Feature Modules
|   |   +-- auth/                     # Authentication feature
|   |   |   +-- domain/               # Entities, repository interfaces, use-cases
|   |   |   +-- data/                 # DTOs, datasources, repository impls
|   |   |   +-- presentation/         # Pages, components
|   |   +-- customer/
|   |   +-- iot/
|   |   +-- dashboard/
|   |   +-- orders/
|   |   +-- report/
|   |   +-- settings/
|   |   +-- user/
|   |   +-- websocket/
|   |   +-- mqtt/
|   |   +-- ai-analytics/
|   |   +-- ai-chatbot/
|   |   +-- alarm/
|   |   +-- job-card/
|   |   +-- system/
|   |
|   +-- entities/                     # Shared Entities
|   |   +-- models/                   # Zod schemas + inferred types
|   |   |   +-- user.ts
|   |   |   +-- customer.ts
|   |   |   +-- session.ts
|   |   |   +-- todo.ts
|   |   |   +-- ...
|   |   +-- errors/                   # Error classes
|   |
|   +-- application/                  # Shared Application Layer
|   |   +-- repositories/             # Repository interfaces
|   |   +-- services/                 # Service interfaces
|   |   +-- use-cases/                # Shared use-cases
|   |       +-- auth/
|   |       +-- customers/
|   |       +-- iot/
|   |       +-- todos/
|   |       +-- wos/
|   |
|   +-- infrastructure/               # Shared Infrastructure
|   |   +-- repositories/             # SQLite + in-file implementations
|   |   +-- services/                 # Service implementations
|   |
|   +-- interface-adapters/           # Interface Adapters
|       +-- api/                      # REST API controllers
|       +-- bff/                      # Backend-for-Frontend controllers
|       +-- e2e/                      # E2E test helpers
|
+-- di/                               # Dependency Injection
|   +-- container.ts                  # IoC container setup + getInjection()
|   +-- types.ts                      # DI_SYMBOLS + DI_RETURN_TYPES
|   +-- persistence.ts                # USE_IN_FILE flag
|   +-- modules/
|       +-- authentication.module.ts
|       +-- users.module.ts
|       +-- todos.module.ts
|       +-- database.module.ts
|
+-- drizzle/                          # Database
|   +-- schema.ts                     # Drizzle table definitions
|   +-- migrations/                   # Auto-generated migrations
|   +-- index.ts
|
+-- tests/                            # Test Suite
|   +-- unit/                         # Unit tests (Vitest)
|   +-- e2e/                          # E2E tests (Playwright)
|
+-- docs/                             # Documentation
|   +-- architecture-guide.md
|   +-- design/
|   +-- plan/
|
+-- scripts/                          # Helper scripts
+-- public/                           # Static assets
+-- config.ts                         # App constants
+-- middleware.ts                     # Auth guard middleware
+-- drizzle.config.ts
+-- next.config.mjs
+-- tailwind.config.ts
+-- tsconfig.json
+-- vitest.config.ts
+-- playwright.config.in-file.ts
+-- playwright.config.sqlite.ts
+-- package.json
```

---

## 3. Flow การทำงาน

### 3.1 Request Flow (Server Component + BFF)

```
Browser Request
      |
      v
middleware.ts  ---- ตรวจสอบ session / auth guard ---> redirect /sign-in
      |
      v (authenticated)
app/(dashboard)/[feature]/page.tsx  (Server Component)
      |
      |  getInjection('I[Feature]BffController')
      v
di/container.ts  ---- resolve DI graph --->
      |
      +-- Interface Adapters (BFF Controller)
      |      src/interface-adapters/bff/[feature]/controller.ts
      |             |
      |             v
      +-- Application Layer (Use Case)
      |      src/application/use-cases/[feature]/[action].use-case.ts
      |             |
      |             +-- Repository Interface
      |             |      src/application/repositories/[feature].repository.interface.ts
      |             |
      |             v
      +-- Infrastructure Layer (Repository Impl)
      |      src/infrastructure/repositories/[feature].repository.sqlite.ts
      |             |
      |             v  Drizzle ORM
      |      SQLite / Turso Database
      |
      +-- Presenter (transform output -> ViewModel)
             src/interface-adapters/bff/[feature]/presenter.ts
                    |
                    v
      Page Component receives ViewModel
             |
             v
      Render React Server Components + Client Components
             |
             v
      HTML Response -> Browser
```

### 3.2 API Request Flow (REST)

```
Client (fetch/axios)
      |
      v
app/api/[feature]/route.ts   (Next.js API Route)
      |
      |  getInjection('I[Feature]ApiController')
      v
Interface Adapters (API Controller)
      src/interface-adapters/api/[feature]/controller.ts
      |
      v
Application Use Case -> Repository -> Database
      |
      v
JSON Response
```

### 3.3 Authentication Flow

```
User submits sign-in form
      |
      v
app/(auth)/sign-in/  (Server Action)
      |
      v
BFF Controller -> signInUseCase
      |
      +-- Validate input (Zod)
      +-- IUsersRepository.getByUsername()
      +-- Verify password (bcrypt-ts)
      +-- Lucia.createSession()
             |
             v
      Set session cookie
             |
             v
      redirect /dashboard
```

### 3.4 Dependency Injection Flow

```
di/container.ts
      |
      +-- createDatabaseModule()       -> binds DB connection
      +-- createAuthenticationModule() -> binds Lucia auth
      +-- createUsersModule()          -> binds UsersRepository + UseCases
      +-- createTodosModule()          -> binds TodosRepository + UseCases
      +-- [feature].module.ts          -> binds Feature dependencies
             |
             v
      getInjection(DI_SYMBOLS.I[Feature]BffController)
             |
             v  auto-resolves dependency graph
      Returns fully-wired controller instance
```

---

## 4. การติดตั้ง

### Requirements

- Node.js >= 22
- npm >= 10

### Steps

```bash
# 1. Clone repository
git clone https://github.com/kongnakornna/icmon-react-nextjs.git
cd icmon-react-nextjs

# 2. ติดตั้ง dependencies
npm install

# 3. ตั้งค่า environment variables
cp .env.example .env
# แก้ไข .env ตามต้องการ

# 4. (สำหรับ SQLite mode) สร้าง database schema
npm run db:push

# 5. รัน development server

# In-file mode (ไม่ต้องมี DB, เหมาะสำหรับ dev/test)
npm run dev:in-file

# SQLite mode
npm run dev:sqlite
```

เปิด browser ที่ `http://localhost:3000`

### Environment Variables

```env
# .env
PERSISTENCE=in-file   # หรือ sqlite

# สำหรับ SQLite/Turso
DATABASE_URL=file:./local.db

# Auth secret
AUTH_SECRET=your-secret-key
```

---

## 5. การ Test

### Unit Tests (Vitest)

```bash
# รัน unit tests ครั้งเดียว
npm run test:unit

# รัน watch mode (auto re-run เมื่อแก้ไขไฟล์)
npm run test:unit:watch

# รัน พร้อม coverage report
npm run test:unit:coverage
```

### Static Tests (Type + Lint + Format)

```bash
# รัน static checks ทั้งหมด
npm run test:static

# รัน type checking เฉพาะ
npm run test:types

# รัน ESLint เฉพาะ
npm run test:lint

# รัน Prettier check เฉพาะ
npm run test:format

# Auto-format โค้ด
npm run format
```

### E2E Tests (Playwright)

```bash
# รัน e2e ทั้งหมด (in-file + sqlite)
npm run test:e2e

# รัน e2e เฉพาะ in-file mode
npm run test:e2e:in-file

# รัน e2e เฉพาะ sqlite mode
npm run test:e2e:sqlite
```

### รัน Test ทั้งหมด

```bash
# รัน static + unit + e2e
npm run test:full

# รัน static + unit เท่านั้น (ไม่มี e2e)
npm run test
```

---

## 6. การ Build

### Build สำหรับ Production

```bash
# Build แบบ SQLite (default production)
npm run build

# หรือระบุ persistence mode
npm run build:sqlite     # PERSISTENCE=sqlite
npm run build:in-file    # PERSISTENCE=in-file

# Start production server (หลัง build)
npm start
```

### Build Output

```
.next/
+-- server/      # Server-side bundles
+-- static/      # Static assets + client bundles
+-- cache/       # Build cache
```

---

## 7. การ Deploy Docker

### Dockerfile

```dockerfile
FROM node:22-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV PERSISTENCE=sqlite
RUN npm run build

# Production runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PERSISTENCE=sqlite

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["node", "server.js"]
```

### next.config.mjs (เพิ่ม standalone output)

```js
// next.config.mjs
const nextConfig = {
  output: 'standalone',
};
export default nextConfig;
```

### Docker Compose

```yaml
# docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - '3000:3000'
    environment:
      - NODE_ENV=production
      - PERSISTENCE=sqlite
      - DATABASE_URL=file:/data/local.db
      - AUTH_SECRET=your-secret-key
    volumes:
      - db-data:/data
    restart: unless-stopped

volumes:
  db-data:
```

### Deploy Commands

```bash
# Build Docker image
docker build -t icmon-react-nextjs .

# รัน container
docker run -p 3000:3000 \
  -e PERSISTENCE=sqlite \
  -e DATABASE_URL=file:/data/local.db \
  -e AUTH_SECRET=your-secret \
  -v $(pwd)/data:/data \
  icmon-react-nextjs

# หรือใช้ Docker Compose
docker compose up -d

# ดู logs
docker compose logs -f app

# หยุด
docker compose down
```

---

*Last updated: 2026-08-26 | Stack: Next.js 14 + Clean Architecture + TypeScript*
