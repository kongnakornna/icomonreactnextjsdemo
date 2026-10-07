# Angular to React/Next.js Migration Design

## สารบัญ

1. [ภาพรวม](#ภาพรวม)
2. [โครงสร้าง Angular (ต้นฉบับ)](#โครงสร้าง-angular-ต้นฉบับ)
3. [โครงสร้าง React/Next.js (เป้าหมาย)](#โครงสร้าง-reactnextjs-เป้าหมาย)
4. [Mapping Layers](#mapping-layers)
5. [Feature Modules Migration](#feature-modules-migration)
6. [Theme System Migration](#theme-system-migration)
7. [Layout Migration](#layout-migration)
8. [Core Services Migration](#core-services-migration)
9. [Implementation Plan](#implementation-plan)

---

## ภาพรวม

เอกสารนี้แผนผังการย้ายโครงสร้างจาก **Angular Clean Architecture** (`icmonangular`) ไปยัง **React/Next.js Clean Architecture** (`icmon-react-nextjs`) โดยรักษาหลักการออกแบบเดิมแต่ปรับให้เหมาะกับ React ecosystem

---

## โครงสร้าง Angular (ต้นฉบับ)

```
icmonangular/src/app/
├── core/                           # Core Module (Singleton)
│   ├── adapters/
│   ├── config/                     # App config, API config
│   ├── constants/                  # Enums, constants
│   ├── contracts/                  # Interfaces (UseCase, Mapper)
│   ├── di/                         # DI tokens & providers
│   ├── interceptors/               # HTTP interceptors
│   ├── params/                     # Parameter objects
│   ├── services/                   # Core services (layout, logger, permission)
│   ├── types/                      # Shared types
│   └── utils/                      # Pure utility functions
│
├── shared/                         # Shared Module (Reusable UI)
│   ├── components/                 # Dumb/Presentation components
│   ├── directives/                 # Custom directives
│   ├── guards/                     # Route guards
│   ├── i18n/                       # Internationalization
│   ├── models/                     # Shared models
│   ├── pipes/                      # Custom pipes
│   └── services/                   # Shared services (toast, i18n)
│
├── features/                       # Feature Modules (25 modules)
│   ├── auth/                       # Authentication
│   ├── dashboard/                  # Dashboard
│   ├── customer/                   # Customer management
│   ├── wos/                        # Web Order System
│   ├── job-card/                   # Job cards
│   ├── document/                   # Document management
│   ├── quotation/                  # Quotations
│   ├── purchase-order/             # Purchase orders
│   ├── inventory/                  # Inventory/Products
│   ├── payment/                    # Payments
│   ├── batch/                      # Batch jobs
│   ├── email/                      # Email system
│   ├── iot/                        # IoT devices
│   ├── mqtt/                       # MQTT integration
│   ├── monitoring/                 # Monitoring dashboards
│   ├── settings/                   # System settings
│   ├── report/                     # Reports
│   ├── ai-analytics/               # AI Analytics
│   ├── ai-chatbot/                 # AI Chatbot
│   ├── alarm/                      # Alarm system
│   ├── user/                       # User management
│   ├── orders/                     # Orders
│   ├── system/                     # System config
│   ├── websocket/                  # WebSocket
│   └── pages/                      # Legacy pages
│
└── layouts/                        # Layout components
    ├── app-layout/
    ├── header/
    ├── sidebar/
    ├── footer/
    └── layout-settings/
```

### Feature Module Structure (Angular)

```
features/wos/
├── domain/                         # Domain Layer (Pure TS, no Angular)
│   ├── entities/
│   │   └── web-order.entity.ts
│   ├── repositories/
│   │   └── web-order.repository.ts  # Interface
│   └── use-cases/
│       ├── create-web-order.use-case.ts
│       └── ...
│
├── data/                           # Data Layer (Implementation)
│   ├── datasources/
│   │   └── wos.api.datasource.ts
│   ├── dtos/
│   │   └── web-order-response.dto.ts
│   ├── mappers/
│   │   └── web-order.mapper.ts
│   └── repositories/
│       └── web-order.repository.impl.ts
│
└── presentation/                   # Presentation Layer
    ├── pages/
    │   └── order-list/
    │       ├── order-list.component.ts
    │       ├── order-list.component.html
    │       └── order-list.component.scss
    └── components/
```

---

## โครงสร้าง React/Next.js (เป้าหมาย)

```
icmon-react-nextjs/
├── app/                            # Next.js App Router (Presentation)
│   ├── _components/                # Shared UI components
│   │   ├── ui/                     # shadcn/ui components
│   │   ├── layout/                 # Layout components
│   │   └── theme-provider.tsx
│   ├── (auth)/                     # Auth route group
│   ├── (dashboard)/                # Main app route group
│   │   ├── layout.tsx              # AppLayout
│   │   ├── dashboard/
│   │   ├── customers/
│   │   ├── wos/
│   │   ├── settings/
│   │   └── ...
│   └── api/                        # REST API routes
│
├── src/                            # Clean Architecture Layers
│   ├── core/                       # Core Infrastructure
│   │   ├── config/
│   │   ├── constants/
│   │   ├── contracts/
│   │   ├── services/
│   │   ├── types/
│   │   └── utils/
│   │
│   ├── entities/                   # Domain Entities (shared)
│   │   ├── models/                 # Zod schemas + types
│   │   └── errors/                 # Error classes
│   │
│   ├── application/                # Application Layer
│   │   ├── repositories/           # Repository interfaces
│   │   ├── services/               # Service interfaces
│   │   └── use-cases/              # Use cases
│   │
│   ├── infrastructure/             # Infrastructure Layer
│   │   ├── repositories/           # Repository implementations
│   │   └── services/               # Service implementations
│   │
│   └── interface-adapters/         # Interface Adapters
│       ├── api/                    # REST API adapters
│       ├── bff/                    # BFF (Server Action)
│       └── e2e/                    # E2E test adapters
│
├── di/                             # Dependency Injection
│   ├── container.ts
│   ├── types.ts
│   └── modules/
│
└── tests/                          # Test suite
```

---

## Mapping Layers

### Angular → React Layer Mapping

| Angular Layer | React/Next.js Layer | Location |
|---------------|---------------------|----------|
| `core/` | `src/core/` | Same structure |
| `shared/components/` | `app/_components/ui/` | shadcn/ui |
| `shared/services/` | `src/core/services/` | Core services |
| `shared/pipes/` | `src/core/utils/` | Utility functions |
| `shared/directives/` | React hooks | Custom hooks |
| `shared/guards/` | `middleware.ts` | Next.js middleware |
| `features/*/domain/` | `src/entities/` + `src/application/` | Split domain |
| `features/*/data/` | `src/infrastructure/` | Repository impls |
| `features/*/presentation/` | `app/(dashboard)/*/` | Next.js pages |
| `layouts/` | `app/_components/layout/` | Layout components |

### Domain Layer Split

| Angular (per feature) | React (shared) |
|-----------------------|----------------|
| `features/*/domain/entities/` | `src/entities/models/` |
| `features/*/domain/repositories/` | `src/application/repositories/` |
| `features/*/domain/use-cases/` | `src/application/use-cases/` |
| `features/*/data/datasources/` | `src/infrastructure/services/` |
| `features/*/data/dtos/` | `src/entities/models/` (Zod) |
| `features/*/data/mappers/` | `src/interface-adapters/` |
| `features/*/data/repositories/` | `src/infrastructure/repositories/` |

---

## Feature Modules Migration

### Module Status

| # | Module | Angular Routes | React Routes | Status |
|---|--------|---------------|--------------|--------|
| 1 | auth | `/sign-in`, `/sign-up` | `/sign-in`, `/sign-up` | 🔧 Partial |
| 2 | dashboard | `/dashboard` | `/dashboard` | 🆕 New |
| 3 | customer | `/customers` | `/customers` | 🆕 New |
| 4 | quotation | `/quotations` | `/quotations` | 🆕 New |
| 5 | purchase-order | `/purchase-orders` | `/purchase-orders` | 🆕 New |
| 6 | inventory | `/products` | `/products` | 🆕 New |
| 7 | payment | `/payments` | `/payments` | 🆕 New |
| 8 | document | `/documents` | `/documents` | 🆕 New |
| 9 | email | `/email` | `/email` | 🆕 New |
| 10 | batch | `/batch` | `/batch` | 🆕 New |
| 11 | job-card | `/jobs` | `/jobs` | 🆕 New |
| 12 | user | `/user` | `/user` | 🆕 New |
| 13 | wos | `/wos` | `/wos` | 🆕 New |
| 14 | iot | `/iot` | `/iot` | 🆕 New |
| 15 | mqtt | `/mqtt` | `/mqtt` | 🆕 New |
| 16 | monitoring | `/monitoring` | `/monitoring` | 🆕 New |
| 17 | settings | `/settings` | `/settings` | 🆕 New |
| 18 | report | `/reports` | `/reports` | 🆕 New |
| 19 | ai-analytics | `/ai-analytics` | `/ai-analytics` | 🆕 New |
| 20 | ai-chatbot | `/ai-chatbot` | `/ai-chatbot` | 🆕 New |
| 21 | alarm | (data only) | (data only) | 📦 Data/Domain |
| 22 | user | `/user` | `/user` | 🆕 New |
| 23 | system | (data only) | (data only) | 📦 Data/Domain |
| 24 | websocket | (data only) | (data only) | 📦 Data/Domain |
| 25 | pages | (legacy) | (legacy) | 🆕 New |

### Entity Mapping (Angular → React/Zod)

```typescript
// Angular: web-order.entity.ts
export interface WebOrder {
  id: string;
  orderNo: string;
  customerId: string;
  status: OrderStatus;
  items: OrderItem[];
  createdAt: Date;
}

// React: src/entities/models/web-order.ts (Zod)
import { z } from 'zod';

export const webOrderSchema = z.object({
  id: z.string(),
  orderNo: z.string(),
  customerId: z.string(),
  status: z.enum(['pending', 'confirmed', 'shipped', 'delivered']),
  items: z.array(orderItemSchema),
  createdAt: z.date(),
});

export type WebOrder = z.infer<typeof webOrderSchema>;
```

### Repository Interface Mapping

```typescript
// Angular: web-order.repository.ts
export interface WebOrderRepository {
  findById(id: string): Promise<WebOrder | null>;
  findAll(params: ListParams): Promise<PaginatedResult<WebOrder>>;
  create(order: WebOrder): Promise<WebOrder>;
}

// React: src/application/repositories/web-orders.repository.interface.ts
import { WebOrder } from '@/src/entities/models/web-order';

export interface IWebOrdersRepository {
  list(params?: { search?: string; page?: number }): Promise<{ data: WebOrder[]; total: number }>;
  getById(id: string): Promise<WebOrder>;
  create(order: Partial<WebOrder>): Promise<WebOrder>;
  update(id: string, order: Partial<WebOrder>): Promise<WebOrder>;
  delete(id: string): Promise<void>;
}
```

### Use Case Mapping

```typescript
// Angular: create-web-order.use-case.ts (Class-based)
@Injectable({ providedIn: 'root' })
export class CreateWebOrderUseCase {
  constructor(private readonly repository: WebOrderRepository) {}
  
  async execute(dto: CreateWebOrderDto): Promise<WebOrder> {
    this.validate(dto);
    return this.repository.create(this.mapper.toEntity(dto));
  }
}

// React: create-web-order.use-case.ts (Higher-Order Function)
export const createWebOrderUseCase =
  <VM>(repository: IWebOrdersRepository, presenter: Presenter<VM>) =>
  async (input: CreateWebOrderInput): Promise<VM> => {
    try {
      const { data, error } = inputSchema.safeParse(input);
      if (error) return presenter(new InputParseError('Invalid', { cause: error }));
      
      const order = await repository.create(data);
      return presenter(order);
    } catch (err) {
      return presenter(new UnknownError('Error', { cause: err }));
    }
  };
```

---

## Theme System Migration

### Angular Theme System

- **State**: `LayoutService` (signals)
- **Storage**: localStorage `tabler-*` keys
- **CSS**: Tabler SCSS + `data-bs-theme` attributes
- **Components**: ThemeBuilder, LayoutSettings

### React Theme System

- **State**: `useTheme` hook (React state)
- **Storage**: localStorage `tabler-*` keys (same)
- **CSS**: Tailwind CSS + shadcn/ui CSS variables
- **Components**: ThemeProvider (next-themes)

### Theme Settings Mapping

| Angular Setting | React Setting | Storage Key |
|-----------------|---------------|-------------|
| `theme` (light/dark) | `theme` | `tabler-theme` |
| `themeBase` (gray/slate) | `themeBase` | `tabler-theme-base` |
| `themeFont` | `themeFont` | `tabler-theme-font` |
| `themePrimary` | `themePrimary` | `tabler-theme-primary` |
| `themeRadius` | `themeRadius` | `tabler-theme-radius` |

### CSS Variables Migration

```css
/* Angular: Tabler SCSS */
@use '@tabler/core/scss/tabler';
@use '@tabler/core/scss/tabler-themes';

/* React: Tailwind + shadcn/ui */
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  /* ... */
}
```

---

## Layout Migration

### Angular Layouts

```
layouts/
├── app-layout/         # Main layout with sidebar
├── header/             # Top navigation
├── sidebar/            # Side navigation
├── footer/             # Footer
├── layout-settings/    # Theme settings panel
└── page-header/        # Page header component
```

### React Layouts

```
app/_components/layout/
├── app-layout.tsx      # Main layout with sidebar
├── header.tsx          # Top navigation
├── sidebar.tsx         # Side navigation
├── footer.tsx          # Footer
└── layout-settings.tsx # Theme settings panel
```

### Layout Component Mapping

| Angular Component | React Component | Notes |
|-------------------|-----------------|-------|
| `AppLayoutComponent` | `AppLayout` | Server Component |
| `HeaderComponent` | `Header` | Client Component |
| `SidebarComponent` | `Sidebar` | Client Component |
| `FooterComponent` | `Footer` | Server Component |
| `LayoutSettingsComponent` | `LayoutSettings` | Client Component |

---

## Core Services Migration

### Angular Services

```typescript
// core/services/layout.service.ts
@Injectable({ providedIn: 'root' })
export class LayoutService {
  private _state = signal<LayoutSettings>(DEFAULTS);
  
  update(key: string, value: any) {
    this._state.update(s => ({ ...s, [key]: value }));
    this.saveSettings();
    this.applySettings();
  }
}
```

### React Services/Hooks

```typescript
// src/core/services/theme.service.ts
'use client';

export function useTheme() {
  const [settings, setSettings] = useState<ThemeSettings>(DEFAULTS);
  
  const update = (key: keyof ThemeSettings, value: string) => {
    setSettings(s => ({ ...s, [key]: value }));
    localStorage.setItem(STORAGE_PREFIX + key, value);
    applySettings({ ...settings, [key]: value });
  };
  
  return { settings, update, reset };
}
```

### Service Mapping

| Angular Service | React Hook/Service | Location |
|-----------------|-------------------|----------|
| `LayoutService` | `useTheme` | `src/core/services/theme.service.ts` |
| `LoggerService` | `logger` | `src/core/services/logger.service.ts` |
| `PermissionService` | `usePermission` | `src/core/services/permission.service.ts` |
| `PageSeoService` | `generateMetadata` | `src/core/services/seo.service.ts` |
| `ApiFallbackService` | `apiClient` | `src/infrastructure/services/api.service.ts` |

---

## Implementation Plan

### Phase 1: Core Infrastructure (Week 1)

- [ ] Create `src/core/` structure
- [ ] Implement `config/`, `constants/`, `types/`
- [ ] Create `contracts/` (Mapper, UseCase interfaces)
- [ ] Implement core services (theme, logger, permission)
- [ ] Set up `di/` container with ioctopus

### Phase 2: Entities & Application (Week 2)

- [ ] Create `src/entities/models/` with Zod schemas
- [ ] Create `src/entities/errors/` error classes
- [ ] Implement `src/application/repositories/` interfaces
- [ ] Implement `src/application/use-cases/` for each module
- [ ] Create `src/application/services/` interfaces

### Phase 3: Infrastructure (Week 3)

- [ ] Implement `src/infrastructure/repositories/` (SQLite + InFile)
- [ ] Implement `src/infrastructure/services/` (API clients)
- [ ] Set up Drizzle ORM schemas
- [ ] Create database migrations

### Phase 4: Interface Adapters (Week 4)

- [ ] Implement `src/interface-adapters/api/` REST adapters
- [ ] Implement `src/interface-adapters/bff/` Server Action adapters
- [ ] Create API routes in `app/api/`
- [ ] Set up E2E test adapters

### Phase 5: Presentation Layer (Week 5-6)

- [ ] Create layout components (`app/_components/layout/`)
- [ ] Implement feature pages (`app/(dashboard)/*/`)
- [ ] Add shadcn/ui components as needed
- [ ] Implement theme settings page

### Phase 6: Feature Modules (Week 7-12)

- [ ] auth (enhance existing)
- [ ] dashboard
- [ ] customer
- [ ] wos (Work Order System)
- [ ] job-card
- [ ] settings
- [ ] iot
- [ ] Other modules as needed

### Phase 7: Testing & Polish (Week 13-14)

- [ ] Unit tests for use cases
- [ ] Integration tests for repositories
- [ ] E2E tests for critical flows
- [ ] Performance optimization
- [ ] Documentation updates

---

## Naming Conventions

| Type | Angular Convention | React Convention |
|------|-------------------|------------------|
| Entity | `*.entity.ts` | `*.ts` (Zod schema) |
| Repository Interface | `*.repository.ts` | `*.repository.interface.ts` |
| Repository Impl | `*.repository.impl.ts` | `*.repository.{type}.ts` |
| Use Case | `*.use-case.ts` | `*.use-case.ts` |
| DTO | `*.dto.ts` | Zod schema in entity |
| Mapper | `*.mapper.ts` | Presenter function |
| Component | `*.component.ts` | `*.tsx` |
| Service | `*.service.ts` | `*.service.ts` or hook |
| Page | `*-page.component.ts` | `page.tsx` |

---

*Last updated: 2026-08-26 | Version: 1.0.0*
