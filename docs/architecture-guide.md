# React/Next.js Clean Architecture - คู่มือการพัฒนาและบำรุงรักษา

## สารบัญ

1. [ภาพรวมโครงสร้าง](#ภาพรวมโครงสร้าง)
2. [หลักการออกแบบ Clean Architecture](#หลักการออกแบบ-clean-architecture)
3. [โครงสร้างโปรเจคโดยละเอียด](#โครงสร้างโปรเจคโดยละเอียด)
4. [แนวทางการพัฒนา](#แนวทางการพัฒนา)
5. [การบำรุงรักษา](#การบำรุงรักษา)
6. [Best Practices & Patterns](#best-practices--patterns)
7. [Troubleshooting & FAQ](#troubleshooting--faq)

---

## ภาพรวมโครงสร้าง

```
react-nextjs-clean-architecture/
├── app/                              # Next.js App Router (Presentation Layer)
│   ├── _components/                  # Shared UI components
│   │   ├── ui/                       # shadcn/ui components
│   │   ├── layout/                   # Layout components (sidebar, header, footer)
│   │   └── theme-provider.tsx
│   ├── (auth)/                       # Auth route group
│   ├── (dashboard)/                  # Main app route group
│   │   ├── layout.tsx                # AppLayout with sidebar + header
│   │   ├── dashboard/
│   │   ├── customers/
│   │   ├── wos/
│   │   ├── settings/
│   │   ├── iot/
│   │   └── ...
│   ├── api/                          # REST API routes
│   ├── layout.tsx                    # Root layout
│   ├── globals.css                   # Tailwind + Tabler + shadcn/ui
│   └── global-error.tsx
│
├── src/                              # Clean Architecture Layers
│   ├── core/                         # Core Infrastructure
│   │   ├── config/                   # App config, menu, route permissions
│   │   ├── constants/                # Constants, enums
│   │   ├── contracts/                # Abstract contracts (Mapper, Usecase)
│   │   ├── services/                 # Core services (permission, logger, layout)
│   │   ├── types/                    # Shared types
│   │   └── utils/                    # Utility functions
│   │
│   ├── features/                     # Feature Modules (เหมือน Angular)
│   │   ├── customer/
│   │   │   ├── domain/               # Domain Layer (Pure TS)
│   │   │   │   ├── entities/
│   │   │   │   ├── repositories/
│   │   │   │   └── use-cases/
│   │   │   └── data/                 # Data Layer (Implementation)
│   │   │       ├── datasources/
│   │   │       ├── dtos/
│   │   │       └── repositories/
│   │   │
│   │   ├── wos/
│   │   │   ├── domain/
│   │   │   └── data/
│   │   │
│   │   ├── dashboard/
│   │   │   ├── domain/
│   │   │   └── data/
│   │   │
│   │   ├── iot/
│   │   │   ├── domain/
│   │   │   └── data/
│   │   │
│   │   └── settings/
│   │       ├── domain/
│   │       └── data/
│   │
│   ├── entities/                     # Shared Entities (Auth, User, Todo)
│   │   ├── models/
│   │   └── errors/
│   │
│   ├── application/                  # Shared Application Layer
│   │   ├── repositories/
│   │   ├── services/
│   │   └── use-cases/
│   │
│   ├── infrastructure/               # Shared Infrastructure Layer
│   │   ├── repositories/
│   │   └── services/
│   │
│   └── interface-adapters/           # Interface Adapters Layer
│       ├── api/
│       ├── bff/
│       └── e2e/
│
├── di/                               # Dependency Injection
│   ├── container.ts                  # IoC container setup
│   ├── types.ts                      # DI_SYMBOLS + DI_RETURN_TYPES
│   └── modules/                      # Feature modules
│
├── drizzle/                          # Database migrations + schema
├── tests/                            # Test suite
├── config.ts                         # App constants
├── middleware.ts                      # Next.js middleware (auth guard)
└── package.json
```

---

## หลักการออกแบบ Clean Architecture

### Dependency Rule (กติกาหลัก)

```
┌─────────────────────────────────────┐
│         Presentation Layer          │  ← Pages, Components, Server Actions
│        (app/)                       │
└─────────────────┬───────────────────┘
                  │ depends on
                  ▼
┌─────────────────────────────────────┐
│      Interface Adapters Layer       │  ← Controllers, Presenters, Contracts
│   (src/interface-adapters/)         │
└─────────────────┬───────────────────┘
                  │ depends on
                  ▼
┌─────────────────────────────────────┐
│        Application Layer            │  ← Use Cases, Repository/Service Interfaces
│      (src/application/)             │
└─────────────────┬───────────────────┘
                  │ depends on
                  ▼
┌─────────────────────────────────────┐
│          Entities Layer             │  ← Domain Models (Zod), Error Classes
│      (src/entities/)                │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│        Infrastructure Layer         │  ← Repository/Service Implementations
│      (src/infrastructure/)          │  ← Implements interfaces from Application Layer
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│      Dependency Injection           │  ← Wires all layers together
│      (di/)                          │  ← Can import everything
└─────────────────────────────────────┘
```

### Layer Responsibilities

| Layer | ตำแหน่ง | หน้าที่ | ตัวอย่าง |
|-------|---------|---------|---------|
| **Presentation** | `app/` | Pages, Components, Server Actions, API Routes | `app/(dashboard)/customers/page.tsx` |
| **Interface Adapters** | `src/interface-adapters/` | Controllers, Presenters, Contracts | `bff/todos/create-todo/controller.ts` |
| **Application** | `src/application/` | Use Cases, Repository/Service Interfaces | `use-cases/customers/create-customer.use-case.ts` |
| **Entities** | `src/entities/` | Domain Models (Zod schemas), Error Classes | `models/customer.ts` |
| **Infrastructure** | `src/infrastructure/` | Repository/Service Implementations | `repositories/customers.repository.sqlite.ts` |
| **DI** | `di/` | Container, Modules, Symbol definitions | `modules/customers.module.ts` |

---

## โครงสร้าง Feature Module แบบละเอียด

```
features/customers/
├── domain/                            # Domain Layer (Pure TS)
│   ├── entities/
│   │   └── customer.ts               # Zod schema + type
│   ├── repositories/
│   │   └── customers.repository.ts   # Interface (Contract)
│   └── use-cases/
│       ├── create-customer.use-case.ts
│       ├── get-customer.use-case.ts
│       ├── list-customers.use-case.ts
│       ├── update-customer.use-case.ts
│       └── delete-customer.use-case.ts
│
├── data/                              # Data Layer (Implementation)
│   ├── datasources/
│   │   └── customers.api.datasource.ts
│   ├── dtos/
│   │   ├── customer-response.dto.ts
│   │   └── create-customer-request.dto.ts
│   └── repositories/
│       └── customers.repository.impl.ts
│
└── presentation/                      # Presentation Layer
    ├── pages/
    │   ├── customer-list/
    │   ├── customer-detail/
    │   └── customer-create/
    └── components/
```

---

## แนวทางการพัฒนา

### 1. สร้าง Feature ใหม่ (Checklist)

```bash
# 1. สร้าง Entity (Zod schema)
# src/entities/models/{feature}.ts

# 2. สร้าง Repository Interface
# src/application/repositories/{feature}.repository.interface.ts

# 3. สร้าง Use Cases
# src/application/use-cases/{feature}/

# 4. สร้าง Repository Implementation
# src/infrastructure/repositories/{feature}.repository.{in-file,sqlite,mock}.ts

# 5. สร้าง Interface Adapters (API + BFF + E2E)
# src/interface-adapters/api/{feature}/
# src/interface-adapters/bff/{feature}/
# src/interface-adapters/e2e/{feature}/

# 6. สร้าง DI Module
# di/modules/{feature}.module.ts

# 7. สร้าง API Routes
# app/api/{feature}/route.ts

# 8. สร้าง Pages
# app/(dashboard)/(feature)/page.tsx

# 9. สร้าง Tests
# tests/unit/application/use-cases/{feature}/
# tests/unit/infrastructure/repositories/{feature}/
```

### 2. Naming Conventions

| Type | Convention | ตัวอย่าง |
|------|------------|---------|
| **Entity (Zod)** | kebab-case + `.ts` | `customer.ts` |
| **Entity Factory** | kebab-case + `.factory.ts` | `customer.factory.ts` |
| **Repository Interface** | kebab-case + `.repository.interface.ts` | `customers.repository.interface.ts` |
| **Repository Impl** | kebab-case + `.repository.{type}.ts` | `customers.repository.sqlite.ts` |
| **Use Case** | kebab-case + `.use-case.ts` | `create-customer.use-case.ts` |
| **Controller** | kebab-case + `.controller.ts` | `create-customer.controller.ts` |
| **Presenter** | kebab-case + `.presenter.ts` | `create-customer.presenter.ts` |
| **Contract** | kebab-case + `.contract.ts` | `create-customer.contract.ts` |
| **Page Component** | `page.tsx` | `app/(dashboard)/customers/page.tsx` |
| **API Route** | `route.ts` | `app/api/customers/route.ts` |
| **DI Module** | kebab-case + `.module.ts` | `customers.module.ts` |

### 3. Use Case Pattern (Higher-Order Function)

```typescript
// src/application/use-cases/customers/create-customer.use-case.ts
import { z } from 'zod';
import { InputParseError, UnknownError } from '@/src/entities/errors/common';
import { Customer } from '@/src/entities/models/customer';
import type { ICustomersRepository } from '@/src/application/repositories/customers.repository.interface';

export type CreateCustomerInputData = Partial<{
  companyName: string;
  email: string;
  phone: string;
}>;

export type CreateCustomerOutputData = Customer | InputParseError | UnknownError;

export type ICreateCustomerUseCase<VM> = (input: CreateCustomerInputData) => Promise<VM>;

export type ICreateCustomerPresenter<VM> = (output: CreateCustomerOutputData) => Promise<VM>;

const inputSchema = z.object({
  companyName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
});

export const createCustomerUseCase =
  <VM>(
    customersRepository: ICustomersRepository,
    presenter: ICreateCustomerPresenter<VM>
  ): ICreateCustomerUseCase<VM> =>
  async (input: CreateCustomerInputData): Promise<VM> => {
    try {
      const { data, error: inputParseError } = inputSchema.safeParse(input);
      if (inputParseError) {
        return presenter(new InputParseError('Invalid data', { cause: inputParseError }));
      }

      const customer = await customersRepository.create({
        companyName: data.companyName,
        email: data.email,
        phone: data.phone,
      });

      return presenter(customer);
    } catch (err) {
      return presenter(new UnknownError('Unknown error', { cause: err }));
    }
  };
```

### 4. Repository Pattern

```typescript
// src/application/repositories/customers.repository.interface.ts (Interface)
import { Customer } from '@/src/entities/models/customer';

export interface ICustomersRepository {
  list(params?: { search?: string; page?: number; pageSize?: number }): Promise<{ data: Customer[]; total: number }>;
  getById(id: string): Promise<Customer>;
  create(customer: Partial<Customer>): Promise<Customer>;
  update(id: string, customer: Partial<Customer>): Promise<Customer>;
  delete(id: string): Promise<void>;
  search(query: string): Promise<Customer[]>;
}

// src/infrastructure/repositories/customers.repository.sqlite.ts (Implementation)
import { ICustomersRepository } from '@/src/application/repositories/customers.repository.interface';
import { Customer } from '@/src/entities/models/customer';

export class SqliteCustomersRepository implements ICustomersRepository {
  async list(params?: any): Promise<{ data: Customer[]; total: number }> {
    // Drizzle ORM implementation
  }
  // ... other methods
}
```

### 5. Dependency Injection Setup

```typescript
// di/types.ts
export const DI_SYMBOLS = {
  ICustomersRepository: Symbol.for('ICustomersRepository'),
  ICreateCustomerBffUseCase: Symbol.for('ICreateCustomerBffUseCase'),
  ICreateCustomerBffController: Symbol.for('ICreateCustomerBffController'),
  // ...
};

// di/modules/customers.module.ts
import { createModule } from '@evyweb/ioctopus';
import { SqliteCustomersRepository } from '@/src/infrastructure/repositories/customers.repository.sqlite';
import { InFileCustomersRepository } from '@/src/infrastructure/repositories/customers.repository.in-file';
import { createCustomerUseCase } from '@/src/application/use-cases/customers/create-customer.use-case';
import { DI_SYMBOLS } from '@/di/types';
import { USE_IN_FILE } from '@/di/persistence';

export function createCustomersModule() {
  const module = createModule();

  if (USE_IN_FILE) {
    module.bind(DI_SYMBOLS.ICustomersRepository).toClass(InFileCustomersRepository);
  } else {
    module.bind(DI_SYMBOLS.ICustomersRepository).toClass(SqliteCustomersRepository);
  }

  module
    .bind(DI_SYMBOLS.ICreateCustomerBffPresenter)
    .toHigherOrderFunction(createCustomerBffPresenter, []);

  module
    .bind(DI_SYMBOLS.ICreateCustomerBffUseCase)
    .toHigherOrderFunction(createCustomerUseCase, [
      DI_SYMBOLS.ICustomersRepository,
      DI_SYMBOLS.ICreateCustomerBffPresenter,
    ]);

  return module;
}
```

---

## การบำรุงรักษา

### 1. Code Quality Gates

```bash
npm run test:static    # Format check + Types + Lint
npm run test:types     # TypeScript type check
npm run test:lint      # ESLint
npm run test:format    # Prettier check
npm run test:unit      # Unit tests
npm run test:full      # Everything including e2e
npm run format         # Auto-format
```

### 2. Architecture Boundary Enforcement

ESLint `boundaries` plugin enforces the dependency rule:
- `web` can only import `entities` + `di`
- `api/bff/e2e` can import `entities` + `use-cases` + `service-interfaces` + `repository-interfaces`
- `use-cases` can import `entities` + `service-interfaces` + `repository-interfaces`
- `infrastructure` can import `service-interfaces` + `repository-interfaces` + `entities`
- `entities` can only import `entities`

### 3. Dependency Updates

```bash
npm outdated                    # Check outdated
npm update                      # Minor/patch updates
npm run test:static             # Verify
npm run build                   # Verify build
```

---

## Best Practices & Patterns

### 1. Server Components vs Client Components

```tsx
// Server Component (default) — fetch data, call DI
// app/(dashboard)/customers/page.tsx
import { getInjection } from '@/di/container';

export default async function CustomersPage() {
  const customers = await getInjection('IGetCustomersForUserBffController')();
  return <CustomerList customers={customers} />;
}

// Client Component — interactive UI
// app/(dashboard)/customers/customer-list.tsx
'use client';
export function CustomerList({ customers }) {
  // Interactive UI logic
}
```

### 2. Error Handling Pattern (Error-as-Value)

```typescript
// Use cases return errors as values, not exceptions
export const createCustomerUseCase = <VM>(...) => async (input) => {
  try {
    // business logic
    return presenter(customer);
  } catch (err) {
    return presenter(new UnknownError('Error', { cause: err }));
  }
};

// Presenter interprets errors into view models
export const createCustomerBffPresenter = async (output) => {
  if (output instanceof InputParseError) {
    return { status: 'failure' as const, code: 'invalid_data' as const };
  }
  if (output instanceof UnauthenticatedError) {
    return { status: 'failure' as const, code: 'unauthenticated' as const };
  }
  return { status: 'success' as const };
};
```

### 3. Zod Validation

```typescript
// All domain models use Zod schemas
import { z } from 'zod';

export const customerSchema = z.object({
  id: z.string(),
  companyName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Customer = z.infer<typeof customerSchema>;
```

### 4. Dual Persistence Mode

```typescript
// di/persistence.ts
export const USE_IN_FILE = process.env.PERSISTENCE === 'in-file';

// di/modules/customers.module.ts
if (USE_IN_FILE) {
  module.bind(DI_SYMBOLS.ICustomersRepository).toClass(InFileCustomersRepository);
} else {
  module.bind(DI_SYMBOLS.ICustomersRepository).toClass(SqliteCustomersRepository);
}
```

---

## Troubleshooting & FAQ

### Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| `Cannot find module` | Path alias not configured | Check `tsconfig.json` `paths` config |
| `Boundary error` | Architecture violation | Check import direction in ESLint rules |
| `DI not found` | Symbol not registered | Check `di/modules/*.module.ts` registration |
| `Server/Client mismatch` | Using client code in server component | Move to `'use client'` component |

### Debug Commands

```bash
npm run test:types       # Type check
npm run test:lint        # Lint check
npm run test:format      # Format check
npm run dev              # Start dev server
npm run build            # Production build
```

---

*Last updated: 2026-08-26 | Version: 1.0.0*
