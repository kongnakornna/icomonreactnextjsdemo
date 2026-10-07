# Architecture Migration Plan: icmonangular → react-nextjs-clean-architecture

## สารบัญ

1. [ภาพรวม](#ภาพรวม)
2. [Phase 1: Structure Document](#phase-1-structure-document)
3. [Phase 2: Theme & Styling](#phase-2-theme--styling)
4. [Phase 3: Core Infrastructure](#phase-3-core-infrastructure)
5. [Phase 4: Layout System](#phase-4-layout-system)
6. [Phase 5: Feature Modules (25 modules)](#phase-5-feature-modules-25-modules)
7. [Phase 6: Routing & Navigation](#phase-6-routing--navigation)
8. [Phase 7: Shared Components](#phase-7-shared-components)
9. [Mapping Table: Angular → React/Next.js](#mapping-table-angular--reactnextjs)

---

## ภาพรวม

### เป้าหมาย
Copy โครงสร้าง Clean Architecture จาก `icmonangular` (Angular 21) มาใช้ใน `react-nextjs-clean-architecture` (Next.js 14) ทั้ง 25 modules พร้อม theme Tabler + shadcn/ui

### หลักการออกแบบ

**Angular Pattern → React/Next.js Pattern:**

| Angular | React/Next.js |
|---------|---------------|
| `@NgModule` | Next.js App Router route groups |
| `@Injectable` / `InjectionToken` | `ioctopus` DI container (`Symbol.for()`) |
| `@Component` | React component (page.tsx / .tsx) |
| Template (HTML) | JSX |
| `@Input()` / `@Output()` | Props / Callbacks |
| HTTP Interceptor | Next.js Middleware / fetch wrapper |
| Route Guard | Next.js Middleware |
| RxJS Observable | async/await / React state |
| `signal()` / `computed()` | React state / useMemo |
| SCSS + Tabler | Tailwind + shadcn/ui + Tabler CSS |

### โครงสร้างเป้าหมาย

```
react-nextjs-clean-architecture/
├── app/                              # Next.js App Router (Presentation Layer)
│   ├── _components/                  # Shared UI components (shadcn/ui)
│   │   ├── ui/                       # shadcn/ui components
│   │   ├── layout/                   # Layout components (sidebar, header, footer)
│   │   └── theme-provider.tsx
│   │
│   ├── (auth)/                       # Auth route group
│   │   ├── sign-in/
│   │   ├── sign-up/
│   │   ├── forgot-password/
│   │   └── lock-screen/
│   │
│   ├── (dashboard)/                  # Main app route group
│   │   ├── layout.tsx                # AppLayout with sidebar + header
│   │   ├── dashboard/
│   │   ├── customers/
│   │   ├── quotations/
│   │   ├── purchase-orders/
│   │   ├── products/
│   │   ├── payments/
│   │   ├── documents/
│   │   ├── email/
│   │   ├── batch/
│   │   ├── iot/
│   │   ├── mqtt/
│   │   ├── wos/
│   │   ├── jobs/
│   │   ├── user/
│   │   ├── monitoring/
│   │   ├── settings/
│   │   ├── reports/
│   │   ├── ai-analytics/
│   │   └── ai-chatbot/
│   │
│   ├── api/                          # REST API routes
│   │   ├── auth/
│   │   ├── customers/
│   │   ├── quotations/
│   │   └── ...
│   │
│   ├── layout.tsx                    # Root layout
│   ├── globals.css                   # Tailwind + Tabler + shadcn/ui
│   └── global-error.tsx
│
├── src/                              # Clean Architecture Layers
│   ├── entities/                     # Domain entities (shared across all modules)
│   │   ├── models/                   # Zod schemas + types
│   │   └── errors/                   # Error classes
│   │
│   ├── application/                  # Application Layer
│   │   ├── repositories/             # Repository interfaces (ports)
│   │   ├── services/                 # Service interfaces (ports)
│   │   └── use-cases/                # Use cases (one folder per feature)
│   │       ├── auth/
│   │       ├── customers/
│   │       ├── dashboard/
│   │       └── ...
│   │
│   ├── infrastructure/               # Infrastructure Layer
│   │   ├── repositories/             # Repository implementations
│   │   └── services/                 # Service implementations
│   │
│   └── interface-adapters/           # Interface Adapters Layer
│       ├── api/                      # REST API adapters
│       ├── bff/                      # BFF (Server Action) adapters
│       └── e2e/                      # E2E test adapters
│
├── di/                               # Dependency Injection
│   ├── container.ts                  # IoC container setup
│   ├── types.ts                      # DI_SYMBOLS + DI_RETURN_TYPES
│   └── modules/                      # Feature modules
│       ├── authentication.module.ts
│       ├── customers.module.ts
│       ├── dashboard.module.ts
│       └── ...
│
├── drizzle/                          # Database (existing)
├── tests/                            # Tests (existing)
├── config.ts                         # App constants
├── middleware.ts                      # Next.js middleware (auth guard)
└── package.json
```

---

## Phase 1: Structure Document

**สร้างเอกสารโครงสร้างarchitecture ในโปรเจค**

### Files to create:
1. `docs/architecture-guide.md` — คู่มือ architecture (Thai) คล้าย `icmonangular/docs/architecture-guide.md`
2. `docs/module-map.md` — แผนที่ modules ทั้ง 25
3. `docs/theme-guide.md` — คู่มือ theme/styling

---

## Phase 2: Theme & Styling

### 2.1 Install Tabler

```bash
npm install @tabler/core
```

### 2.2 Update `globals.css`

```css
/* Tabler CSS */
@import '@tabler/core/dist/css/tabler.min.css';
@import '@tabler/core/dist/css/tabler-vendors.min.css';

/* Tailwind CSS */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* shadcn/ui CSS variables (existing) */
@layer base { ... }
```

### 2.3 Update `tailwind.config.ts`

- ปิด `corePlugins.visibility` (กัน collision กับ Bootstrap `.collapse`)
- เพิ่ม typography plugin
- เพิ่ม Tabler color tokens

### 2.4 Update `app/layout.tsx`

- เพิ่ม Tabler CSS link tag
- เพิ่ม Inter font (เหมือน icmonangular)
- เพิ่ม Tabler JS script (ถ้าจำเป็น)

### 2.5 Create Theme Service

สร้าง `src/core/services/theme.service.ts` สำหรับจัดการ dark/light mode + theme settings

---

## Phase 3: Core Infrastructure

### 3.1 Core Module Structure

```
src/core/                              # Core layer (shared across all features)
├── config/
│   ├── app.config.ts                  # AppConfig constants
│   ├── menu.config.ts                 # Sidebar menu structure
│   ├── route-permission.config.ts     # Route-to-permission mapping
│   └── index.ts
├── constants/
│   ├── app.constants.ts               # localStorage keys, cache TTLs
│   └── enums.ts                       # UserRole, JobStatus, JobPriority, etc.
├── contracts/
│   ├── mapper.contract.ts             # Mapper<E,R> abstract
│   └── usecase.contract.ts            # Usecase<T,R> interface
├── di/
│   ├── tokens.ts                      # InjectionTokens (Symbol.for)
│   └── providers.ts                   # Centralized DI provider arrays
├── services/
│   ├── layout.service.ts              # Theme/layout state
│   ├── permission.service.ts          # RBAC permission checking
│   ├── logger.service.ts              # Multi-format logger
│   └── index.ts
├── types/
│   └── types.ts                       # Shared types
├── utils/
│   ├── formatters.ts                  # Date/number formatters
│   ├── helpers.ts                     # Utility functions
│   └── validators.ts                  # Zod validation helpers
└── index.ts
```

### 3.2 Files to create:

| File | Purpose | Source (icmonangular) |
|------|---------|----------------------|
| `src/core/config/app.config.ts` | App config constants | `core/config/app.config.ts` |
| `src/core/config/menu.config.ts` | Sidebar menu items | `core/config/menu.config.ts` |
| `src/core/config/route-permission.config.ts` | Route-permission mapping | `core/config/route-permission.config.ts` |
| `src/core/constants/app.constants.ts` | localStorage keys, cache TTLs | `core/constants/app.constants.ts` |
| `src/core/constants/enums.ts` | UserRole, JobStatus, etc. | `core/constants/enums.ts` |
| `src/core/contracts/mapper.contract.ts` | Abstract Mapper | `core/contracts/mapper.contract.ts` |
| `src/core/contracts/usecase.contract.ts` | Usecase interface | `core/contracts/usecase.contract.ts` |
| `src/core/services/permission.service.ts` | RBAC permission | `core/services/permission.service.ts` |
| `src/core/services/logger.service.ts` | Logger | `core/services/logger.service.ts` |
| `src/core/types/types.ts` | Shared types | `core/types/types.ts` |
| `src/core/utils/formatters.ts` | Formatters | `core/utils/formatters.ts` |
| `src/core/utils/helpers.ts` | Helpers | `core/utils/helpers.ts` |
| `src/core/utils/validators.ts` | Validators | `core/utils/validators.ts` |

### 3.3 Adapt to React/Next.js Pattern

- Angular `@Injectable` → Plain functions or classes instantiated via DI container
- Angular `InjectionToken` → `Symbol.for()` in `di/tokens.ts`
- Angular `signal()` / `computed()` → React `useState` / `useMemo` / Zustand

---

## Phase 4: Layout System

### 4.1 Layout Components

```
app/_components/layout/
├── app-layout/
│   ├── app-layout.tsx                # Main layout (sidebar + header + footer)
│   └── app-layout.test.tsx
├── sidebar/
│   ├── sidebar.tsx                   # Permission-filtered sidebar
│   ├── sidebar-menu-item.tsx         # Menu item with children
│   └── sidebar.test.tsx
├── header/
│   ├── header.tsx                    # Top header bar
│   └── header.test.tsx
├── footer/
│   ├── footer.tsx
│   └── footer.test.tsx
├── page-header/
│   ├── page-header.tsx               # Page title + breadcrumbs
│   └── page-header.test.tsx
├── layout-settings/
│   ├── layout-settings.tsx           # Theme settings flyout
│   └── layout-settings.test.tsx
└── index.ts                          # Barrel exports
```

### 4.2 Files to create:

| File | Source (icmonangular) |
|------|----------------------|
| `app/_components/layout/app-layout/app-layout.tsx` | `layouts/app-layout/app-layout.component.ts` |
| `app/_components/layout/sidebar/sidebar.tsx` | `layouts/sidebar/sidebar.component.ts` |
| `app/_components/layout/sidebar/sidebar-menu-item.tsx` | `layouts/sidebar/sidebar.component.html` (menu item template) |
| `app/_components/layout/header/header.tsx` | `layouts/header/header.component.ts` |
| `app/_components/layout/footer/footer.tsx` | `layouts/footer/footer.component.ts` |
| `app/_components/layout/page-header/page-header.tsx` | `layouts/page-header/page-header.component.ts` |
| `app/_components/layout/layout-settings/layout-settings.tsx` | `layouts/layout-settings/layout-settings.component.ts` |

### 4.3 Route Group Layout

```tsx
// app/(dashboard)/layout.tsx
import { AppLayout } from '@/app/_components/layout';

export default function DashboardLayout({ children }) {
  return <AppLayout>{children}</AppLayout>;
}
```

---

## Phase 5: Feature Modules (25 modules)

### 5.1 Module List

| # | Module | Route | Priority |
|---|--------|-------|----------|
| 1 | auth | `/sign-in`, `/sign-up`, `/forgot-password`, `/lock-screen` | Existing |
| 2 | dashboard | `/dashboard` | High |
| 3 | customer | `/customers` | High |
| 4 | quotation | `/quotations` | High |
| 5 | purchase-order | `/purchase-orders` | High |
| 6 | inventory | `/products` | High |
| 7 | payment | `/payments` | High |
| 8 | document | `/documents` | High |
| 9 | email | `/email` | High |
| 10 | batch | `/batch` | Medium |
| 11 | job-card | `/jobs` | Medium |
| 12 | user | `/user` | High |
| 13 | wos | `/wos` | Medium |
| 14 | iot | `/iot` | Medium |
| 15 | mqtt | `/mqtt` | Medium |
| 16 | monitoring | `/monitoring` | Medium |
| 17 | settings | `/settings` | Medium |
| 18 | report | `/reports` | Medium |
| 19 | ai-analytics | `/ai-analytics` | Low |
| 20 | ai-chatbot | `/ai-chatbot` | Low |
| 21 | alarm | (data/domain only) | Low |
| 22 | orders | (data/domain only) | Low |
| 23 | system | (data/domain only) | Low |
| 24 | websocket | (data/domain only) | Low |
| 25 | pages | (legacy/demo) | Low |

### 5.2 Per-Module Structure (Clean Architecture)

Each feature module follows this pattern:

```
src/application/use-cases/{feature}/     # Use cases
src/application/repositories/            # Repository interfaces (shared)
src/infrastructure/repositories/         # Repository implementations (shared)
src/infrastructure/services/             # Service implementations (shared)
src/interface-adapters/api/{feature}/    # API adapters (controller/presenter/contract)
src/interface-adapters/bff/{feature}/    # BFF adapters (controller/presenter/contract)
src/interface-adapters/e2e/{feature}/    # E2E adapters (controller/presenter/contract)
di/modules/{feature}.module.ts           # DI module
app/(dashboard)/(feature)/               # Route group
app/api/(feature)/                       # API routes
```

### 5.3 Example: Customer Module

**Entities** (`src/entities/models/`):
- `customer.ts` — Zod schema: id, name, email, phone, address, createdAt, updatedAt
- `customer.factory.ts` — factory-t test factory

**Application Layer**:
- `src/application/repositories/customers.repository.interface.ts` — ICustomersRepository
- `src/application/use-cases/customers/list-customers.use-case.ts`
- `src/application/use-cases/customers/create-customer.use-case.ts`
- `src/application/use-cases/customers/get-customer.use-case.ts`
- `src/application/use-cases/customers/update-customer.use-case.ts`
- `src/application/use-cases/customers/delete-customer.use-case.ts`
- `src/application/use-cases/customers/search-customers.use-case.ts`

**Infrastructure Layer**:
- `src/infrastructure/repositories/customers.repository.in-file.ts`
- `src/infrastructure/repositories/customers.repository.sqlite.ts`
- `src/infrastructure/repositories/customers.repository.mock.ts`

**Interface Adapters**:
- `src/interface-adapters/api/customers/list-customers/{contract,controller,presenter}.ts`
- `src/interface-adapters/api/customers/create-customer/{contract,controller,presenter}.ts`
- `src/interface-adapters/api/customers/get-customer/{contract,controller,presenter}.ts`
- `src/interface-adapters/api/customers/update-customer/{contract,controller,presenter}.ts`
- `src/interface-adapters/api/customers/delete-customer/{contract,controller,presenter}.ts`
- `src/interface-adapters/bff/customers/...` (same structure)
- `src/interface-adapters/e2e/customers/...` (same structure)

**DI Module**:
- `di/modules/customers.module.ts` — Register all bindings

**Presentation**:
- `app/(dashboard)/customers/page.tsx` — Customer list (Server Component)
- `app/(dashboard)/customers/create/page.tsx` — Create form
- `app/(dashboard)/customers/[id]/page.tsx` — Detail view

**API Routes**:
- `app/api/customers/route.ts` — GET (list), POST (create)
- `app/api/customers/[id]/route.ts` — GET (detail), PATCH (update), DELETE

### 5.4 Module Implementation Order

**Phase 5a: Core modules (first batch)**
1. `core` — Core infrastructure (config, constants, services)
2. `layout` — Layout system (sidebar, header, footer)
3. `auth` — Already exists, extend with forgot-password, lock-screen
4. `dashboard` — Main dashboard
5. `customer` — Simple CRUD example

**Phase 5b: Business modules (second batch)**
6. `quotation`
7. `purchase-order`
8. `inventory`
9. `payment`
10. `document`
11. `email`
12. `batch`
13. `job-card`

**Phase 5c: User & Work Order modules**
14. `user` — User management + roles
15. `wos` — Work Order System
16. `orders` — Data/domain only

**Phase 5d: IoT & Monitoring modules**
17. `iot`
18. `mqtt`
19. `monitoring`
20. `settings`

**Phase 5e: Report & AI modules**
21. `report`
22. `ai-analytics`
23. `ai-chatbot`
24. `alarm`
25. `system`
26. `websocket`

---

## Phase 6: Routing & Navigation

### 6.1 Route Structure

```
/ (root redirect → /dashboard)
/sign-in
/sign-up
/forgot-password
/lock-screen
/dashboard
/customers
/customers/create
/customers/[id]
/quotations
/quotations/create
/purchase-orders
/purchase-orders/create
/products
/products/create
/payments
/documents
/email/templates
/email/compose
/email/logs
/batch/jobs
/jobs
/user/listdata
/user/create
/user/[id]
/user/roles
/wos/orders
/iot/devices
/iot/settings
/iot/reports
/mqtt/dashboard
/mqtt/flows
/monitoring/smarthome
/monitoring/smartcity
/monitoring/smartmonitor
/monitoring/industry
/monitoring/smartsolarfarm
/settings/schedule
/settings/alarm
/settings/influxdb
/settings/devices
/settings/locations
/settings/hardware
/settings/sensors
/settings/nodered
/settings/mqtt
/settings/email
/settings/line
/settings/sms
/settings/hosts
/settings/api
/settings/api-health
/settings/tokens
/reports/schedule
/reports/alarm
/reports/logs-control
/reports/device
/ai-analytics/command-center
/ai-analytics/dashboard
/ai-analytics/reports
/ai-analytics/logs
/ai-analytics/workflow
/ai-analytics/schedule
/ai-analytics/alerts
/ai-analytics/analyst
```

### 6.2 Middleware (Auth Guard)

Update `middleware.ts` to check session cookie for all routes except:
- `/api/*`
- `/_next/*`
- `/sign-in`, `/sign-up`, `/forgot-password`, `/lock-screen`
- Static assets

### 6.3 Permission-based Navigation

- `middleware.ts` checks permissions from session
- Sidebar filters menu items by permission
- Route-level permission check in page components

---

## Phase 7: Shared Components

### 7.1 Shared UI Components

```
app/_components/ui/
├── avatar.tsx           (existing)
├── button.tsx           (existing)
├── card.tsx             (existing)
├── checkbox.tsx         (existing)
├── dropdown-menu.tsx    (existing)
├── input.tsx            (existing)
├── label.tsx            (existing)
├── separator.tsx        (existing)
├── sonner.tsx           (existing)
├── modal.tsx            (NEW — ConfirmModalComponent)
├── toast.tsx            (NEW — ToastComponent)
├── badge.tsx            (NEW — StatusBadgeComponent)
├── table.tsx            (NEW — DataTableComponent)
├── pagination.tsx       (NEW — PaginationComponent)
├── tabs.tsx             (NEW — TabsComponent)
├── select.tsx           (NEW — SelectComponent)
├── textarea.tsx         (NEW — TextareaComponent)
├── skeleton.tsx         (NEW — LoadingSkeleton)
├── access-denied.tsx    (NEW — AccessDeniedComponent)
└── welcome-illustration.tsx (NEW)
```

### 7.2 Shared Pipes (React equivalent → utility functions)

```
src/core/utils/
├── formatters.ts        # fileSize, statusLabel, translate
└── validators.ts        # Custom validators
```

### 7.3 Shared Directives (React equivalent → custom hooks)

```
app/_hooks/
├── click-outside.ts     # Click outside detection hook
└── use-permission.ts    # Permission checking hook
```

---

## Mapping Table: Angular → React/Next.js

### DI Mapping

| Angular | React/Next.js |
|---------|---------------|
| `@Injectable({ providedIn: 'root' })` | `createModule()` in `di/modules/*.module.ts` |
| `@Inject(AUTH_REPOSITORY)` | `getInjection('ICustomersRepository')` |
| `InjectionToken<IAuthRepository>` | `Symbol.for('ICustomersRepository')` |
| `providers: [...]` | `container.bind(...)` |

### Component Mapping

| Angular | React/Next.js |
|---------|---------------|
| `@Component({ standalone: true })` | Function component |
| `@Input()` | Props |
| `@Output() + EventEmitter` | Callback props |
| `OnInit` | `useEffect([], ...)` |
| `OnDestroy` | `useEffect(() => { return cleanup }, ...)` |
| `changeDetection: OnPush` | `React.memo()` |
| Template syntax (`*ngFor`, `@if`) | JSX map, ternary/&& |
| `inject(Service)` | `useInjection('ServiceSymbol')` hook |

### Service Mapping

| Angular | React/Next.js |
|---------|---------------|
| `BehaviorSubject<T>` | `useState<T>` or Zustand |
| `signal<T>` | `useState<T>` |
| `computed<T>` | `useMemo<T>` |
| `Observable<T>` | `Promise<T>` / async data |
| `HttpClient` | `fetch()` / Server Actions |

### Route Mapping

| Angular | React/Next.js |
|---------|---------------|
| `RouterModule.forRoot(routes)` | Next.js App Router file-based routing |
| `loadChildren(() => Module)` | Route groups `(feature)/layout.tsx` |
| `loadComponent(() => Component)` | `page.tsx` files |
| `canActivate: [AuthGuard]` | `middleware.ts` |
| `PreloadAllModules` | Next.js automatic code splitting |

---

## Implementation Checklist

### Phase 1: Structure Document
- [ ] Create `docs/architecture-guide.md`
- [ ] Create `docs/module-map.md`
- [ ] Create `docs/theme-guide.md`

### Phase 2: Theme & Styling
- [ ] Install `@tabler/core`
- [ ] Update `globals.css` with Tabler imports
- [ ] Update `tailwind.config.ts` (disable visibility plugin)
- [ ] Update `app/layout.tsx` with Tabler CSS + Inter font
- [ ] Create `src/core/services/theme.service.ts`

### Phase 3: Core Infrastructure
- [ ] Create `src/core/config/` (app.config, menu.config, route-permission.config)
- [ ] Create `src/core/constants/` (app.constants, enums)
- [ ] Create `src/core/contracts/` (mapper, usecase)
- [ ] Create `src/core/services/` (permission, logger, layout)
- [ ] Create `src/core/types/` (shared types)
- [ ] Create `src/core/utils/` (formatters, helpers, validators)

### Phase 4: Layout System
- [ ] Create `app/_components/layout/app-layout/`
- [ ] Create `app/_components/layout/sidebar/`
- [ ] Create `app/_components/layout/header/`
- [ ] Create `app/_components/layout/footer/`
- [ ] Create `app/_components/layout/page-header/`
- [ ] Create `app/_components/layout/layout-settings/`
- [ ] Create `app/(dashboard)/layout.tsx`

### Phase 5: Feature Modules
- [ ] auth (extend existing)
- [ ] dashboard
- [ ] customer
- [ ] quotation
- [ ] purchase-order
- [ ] inventory
- [ ] payment
- [ ] document
- [ ] email
- [ ] batch
- [ ] job-card
- [ ] user
- [ ] wos
- [ ] orders (data/domain only)
- [ ] iot
- [ ] mqtt
- [ ] monitoring
- [ ] settings
- [ ] report
- [ ] ai-analytics
- [ ] ai-chatbot
- [ ] alarm (data/domain only)
- [ ] system (data/domain only)
- [ ] websocket (data/domain only)

### Phase 6: Routing & Navigation
- [ ] Update `middleware.ts` for auth guard
- [ ] Create all route groups
- [ ] Create all API routes
- [ ] Set up permission-based navigation

### Phase 7: Shared Components
- [ ] Create modal, toast, badge, table, pagination, tabs, select, textarea, skeleton components
- [ ] Create custom hooks (click-outside, use-permission)
- [ ] Create utility functions (formatters, validators)

### Phase 8: Testing
- [ ] Unit tests for all use cases
- [ ] Unit tests for all repositories
- [ ] Integration tests for adapters
- [ ] E2E tests for critical flows

---

## Estimated Effort

| Phase | Estimated Files | Estimated Time |
|-------|----------------|---------------|
| Phase 1: Structure Document | 3 docs | 30 min |
| Phase 2: Theme & Styling | 5 files | 1 hour |
| Phase 3: Core Infrastructure | 15 files | 2 hours |
| Phase 4: Layout System | 12 files | 2 hours |
| Phase 5: Feature Modules (25) | ~300+ files | 15-20 hours |
| Phase 6: Routing | 50+ route files | 3 hours |
| Phase 7: Shared Components | 15 files | 2 hours |
| Phase 8: Testing | 100+ test files | 5 hours |
| **Total** | **~500+ files** | **~30-35 hours** |

---

*Plan created: 2026-08-26*
