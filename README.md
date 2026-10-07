# ICMon React + Next.js — IoT Monitoring Web Application

## React
React คือ **JavaScript library** สำหรับสร้างส่วนติดต่อผู้ใช้ (UI) โดยมีหลักการทำงานสำคัญดังนี้

### 1. Declarative (การเขียนแบบประกาศ)
React ใช้แนวคิด **Declarative**  "เด็ค-แคล-ระ-ทิฝ" หมายถึงคุณเขียนโค้ดบอกว่าต้องการให้ UI เป็นอย่างไร แล้ว React จะเป็นคนจัดการขั้นตอนการทำงานกับ DOM ทั้งหมดให้เอง ช่วยให้โค้ดคาดเดาได้ง่ายและดีบักง่ายขึ้น

### 2. Component-Based (การทำงานแบบคอมโพเนนต์)
React แบ่ง UI ออกเป็น **คอมโพเนนต์** ย่อยๆ ที่สามารถนำกลับมาใช้ใหม่ได้ แต่ละคอมโพเนนต์มี **state** (ข้อมูลภายใน) ของตัวเอง และมีเมธอด `render()` ที่รับข้อมูลแล้วคืนค่าสิ่งที่จะแสดงบนหน้าจอ

### 3. Virtual DOM
React **ไม่ไปยุ่งกับ Real DOM โดยตรง** แต่สร้าง **Virtual DOM** ขึ้นมาในหน่วยความจำ ซึ่งเป็นตัวแทนของ UI ในรูปแบบ JavaScript Object

**ขั้นตอนการทำงานของ Virtual DOM:**
1. เมื่อ state หรือ data เปลี่ยนแปลง React จะสร้าง **Virtual DOM tree** ใหม่
2. นำ Virtual DOM tree ใหม่ไป **เปรียบเทียบ (Diff)** กับ Virtual DOM tree เก่า
3. คำนวณหาส่วนที่ **เปลี่ยนแปลงน้อยที่สุด (minimal changes)**
4. อัปเดตเฉพาะส่วนที่เปลี่ยนแปลงลงใน **Real DOM** จริง

ทำให้การอัปเดต UI มีประสิทธิภาพสูง เพราะไม่ต้อง rerender ทั้งหน้า

### 4. กระบวนการ Render และ Commit
การแสดงผลของ React ประกอบด้วย **3 ขั้นตอน**:

| ขั้นตอน | คำอธิบาย |
|---------|----------|
| **Trigger** | เกิดจากการ render ครั้งแรก หรือ state/props เปลี่ยนแปลง |
| **Render** | React เรียกใช้คอมโพเนนต์เพื่อกำหนดว่าจะแสดงอะไรบนหน้าจอ |
| **Commit** | React นำผลลัพธ์ไปอัปเดต DOM จริง |

---

## Next.js

Next.js คือ **React framework** ที่เพิ่มความสามารถในการทำ **Server-Side Rendering (SSR)** และ **Static Site Generation (SSG)** เข้ามาใน React

### 1. Pre-rendering (การเรนเดอร์ล่วงหน้า)
โดยค่าเริ่มต้น Next.js จะ **pre-render** ทุกหน้า หมายถึงสร้าง HTML ของแต่ละหน้าล่วงหน้า **แทนที่จะให้ JavaScript บนฝั่ง Client เป็นคนสร้างทั้งหมด**

Pre-rendering ช่วยเพิ่ม **ประสิทธิภาพ** และ **SEO**

### 2. กลยุทธ์การ Rendering

| กลยุทธ์ | เวลาที่สร้าง HTML | เหมาะกับ |
|---------|-------------------|----------|
| **SSG (Static Site Generation)** | ตอน **Build Time** | เนื้อหาที่ไม่ค่อยเปลี่ยนแปลง เช่น บทความ หน้าโปรไฟล์บริษัท |
| **SSR (Server-Side Rendering)** | **ทุกครั้ง**ที่มี Request | เนื้อหาที่เปลี่ยนแปลงบ่อย ต้องการความ实时 |
| **ISR (Incremental Static Regeneration)** | Build Time + อัปเดตแบบ ** | เนื้อหาที่มีการอัปเดตเป็นครั้งคราว เช่น บล็อก ข่าวสาร |
| **CSR (Client-Side Rendering)** | ที่ **Browser** โดย JS | หน้า dashboard หรือส่วนที่ต้องการ Interactivity สูง |

> 💡 จุดแข็งของ Next.js คือสามารถ **ผสมผสาน** กลยุทธ์เหล่านี้ในโปรเจกต์เดียวกันได้

### 3. App Router (ใหม่ใน Next.js 13)
App Router คือระบบ Routing ใหม่ที่สร้างบนพื้นฐานของ **React Server Components**

**ลักษณะสำคัญ:**
- ใช้ **File-System based routing** คือโฟลเดอร์คือเส้นทาง URL
- แต่ละโฟลเดอร์ใน `app/` คือ **route segment**
- ไฟล์ `page.tsx` ทำให้ segment นั้นกลายเป็นหน้าเว็บที่เข้าถึงได้
- รองรับ `layout.tsx`, `loading.tsx`, `error.tsx`

### 4. Server Components และ Client Components
| ประเภท | การทำงาน | การใช้งาน |
|--------|----------|----------|
| **Server Component** | Render บน Server เป็น RSC Payload | ดึงข้อมูลจาก DB/API ใช้ Secret |
| **Client Component** | ทำงานใน Browser | ใช้ State, Event Handler, Browser API |

> 📌 **Layout และ Page ใน App Router เป็น Server Components โดยค่าเริ่มต้น**

### 5. กระบวนการ Rendering ใน Next.js
1. Next.js ใช้ **React API** ในการจัดการ Rendering บน Server
2. **Server Components** ถูก Render เป็น **RSC Payload** (รูปแบบข้อมูล React Server Component tree)
3. **Client Components** และ RSC Payload ถูกนำไปใช้ **Pre-render เป็น HTML**
4. เมื่อ Browser โหลดหน้าเสร็จ **JavaScript** จะทำงานเพื่อทำให้หน้า **Interactive** (กระบวนการนี้เรียกว่า **Hydration**)

---

## สรุปภาพรวม

```
React = ไลบรารีสำหรับสร้าง UI
├── ทำงานแบบ Declarative "เด็ค-แคล-ระ-ทิฝ" 
├── แบ่งเป็น Component
├── ใช้ Virtual DOM + Diff Algorithm เพื่ออัปเดต UI อย่างมีประสิทธิภาพ
└── กระบวนการ Trigger → Render → Commit

Next.js = Framework ที่สร้างบน React
├── Pre-render ทุกหน้า (SSG/SSR)
├── รองรับ ISR สำหรับอัปเดตเนื้อหาแบบ incremental
├── App Router + React Server Components (ใหม่)
└── เลือกกลยุทธ์ Rendering ได้ตามความเหมาะสมของแต่ละหน้า
```

**React Clean Architecture + Next.js App Router + Tabler UI (SCSS) + Tailwind CSS + shadcn/ui**

Ported from [icmonangular](https://github.com/kongnakorn/icmonangular) (Angular 21 + Tabler UI) to React 18 + Next.js 14 with strict Clean Architecture boundaries.

---

## 1. Architecture

### 1.1 Clean Architecture Overview

ทุก module ยึดหลัก **Clean Architecture** (Dependency Rule) — ชั้นในสุดไม่รู้จักชั้นนอก ทุกอย่างพึ่งพา Interface ไม่พึ่งพา Implementation

```
┌──────────────────────────────────────────────────────────┐
│  WEB (app/)                                              │
│  Next.js App Router — Pages, Layouts, Server Actions     │
│  เรียก BFF Use Cases ผ่าน DI Container                    │
└─────────────────────────┬────────────────────────────────┘
                          ▼
┌──────────────────────────────────────────────────────────┐
│  INTERFACE ADAPTERS (src/interface-adapters/)             │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐                  │
│  │   API   │  │   BFF   │  │   E2E   │                  │
│  │ /api/*  │  │ Server  │  │  Test   │                  │
│  │ Routes  │  │ Actions │  │ Adapters│                  │
│  └────┬────┘  └────┬────┘  └────┬────┘                  │
│       └─────────────┼───────────┘                        │
│                     ▼                                    │
│            Contract → Controller → Presenter             │
└─────────────────────────┬────────────────────────────────┘
                          ▼
┌──────────────────────────────────────────────────────────┐
│  APPLICATION (src/application/)                           │
│  Use Cases ← Repository Interfaces ← Service Interfaces  │
│  Business Logic บริสุทธิ์ ไม่รู้จัก HTTP/DB/Framework    │
└─────────────────────────┬────────────────────────────────┘
                          ▲
┌─────────────────────────┴────────────────────────────────┐
│  INFRASTRUCTURE (src/infrastructure/)                     │
│  Repository Implementations, Auth Service, DB Adapters    │
│  implements interfaces จาก Application layer              │
└─────────────────────────┬────────────────────────────────┘
                          │
┌─────────────────────────┴────────────────────────────────┐
│  EXTERNAL — Go Backend (port 5000), SQLite/Turso, etc.   │
└──────────────────────────────────────────────────────────┘
```

### 1.2 Dependency Injection

ใช้ `@evyweb/ioctopus` (IoC Container) แทน Angular DI:

```
di/
├── container.ts          # Container setup + getInjection()
├── types.ts              # 68 DI Symbols (Services, Repos, UseCases, Controllers)
├── persistence.ts        # Switch in-file ↔ sqlite
└── modules/
    ├── authentication.module.ts
    ├── database.module.ts
    ├── todos.module.ts
    └── users.module.ts
```

### 1.3 Angular → React Mapping

| Angular | React + Next.js | Notes |
|---------|----------------|-------|
| `proxy.conf.json` | `next.config.mjs` rewrites / Server Actions | API proxy |
| `environment.ts` | `.env` + `process.env` | Environment config |
| `app.module.ts` | `di/container.ts` | DI registration |
| `app-routing.module.ts` | `app/` folder routing (App Router) | File-based routing |
| `AuthGuard` | `middleware.ts` | Auth guard |
| `PermissionGuard` | `ROUTE_PERMISSIONS` config | RBAC |
| `HttpClient` + Interceptors | `fetch()` + BFF layer | HTTP client |
| `@ngx-translate` | `public/i18n/*.json` + client-side | i18n |
| `RxJS BehaviorSubject` | React `useState` / `useReducer` | State management |
| Angular Signals | React state + custom hooks | Reactivity |
| `Tabler UI` (SCSS) | `Tabler UI` (SCSS) + `shadcn/ui` + Tailwind CSS | UI framework |
| `angular-tabler-icons` | `lucide-react` | Icons |
| `NgModules` (lazy) | Next.js dynamic imports | Code splitting |

### 1.4 Dual Architecture Patterns

โปรเจกต์มี 2 patterns ทำงานร่วมกัน:

**Pattern A: Legacy (src/application/, src/infrastructure/, src/interface-adapters/)**
```
src/
├── entities/                    # Domain Entities
├── application/
│   ├── repositories/            # Repository Interfaces (ports)
│   ├── services/                # Service Interfaces (auth, transaction)
│   └── use-cases/               # Use Cases
├── infrastructure/
│   ├── repositories/            # in-file, sqlite, mock implementations
│   └── services/                # auth, transaction implementations
└── interface-adapters/
    ├── api/                     # REST API adapters (/api/*)
    ├── bff/                     # Backend-for-Frontend adapters
    └── e2e/                     # E2E test adapters
```

**Pattern B: Feature Modules (src/features/)**
```
src/features/
├── auth/
├── customer/
├── dashboard/
├── iot/
├── job-card/
├── mqtt/
├── settings/
├── ... (16 modules total)
│
├── {feature}/
│   ├── index.ts
│   ├── domain/
│   │   ├── entities/            # Feature entities
│   │   ├── repositories/        # Repository interfaces
│   │   └── use-cases/           # Business logic
│   ├── data/
│   │   ├── datasources/         # API data sources
│   │   ├── dtos/                # Request/Response DTOs
│   │   └── repositories/        # Repository implementations
│   └── presentation/
│       └── pages/               # Page components
```

### 1.5 API Proxy Strategy

Angular ใช้ `proxy.conf.json` proxy `/api` → Go backend (port 5000)
React+Next.js ใช้ 2 วิธี:

**วิธีที่ 1: Next.js Rewrites (proxy ไป Go backend ภายนอก)**
```js
// next.config.mjs
const nextConfig = {
  async rewrites() {
    return [
      { source: '/api/:path*', destination: 'http://localhost:5000/api/:path*' },
      { source: '/ws', destination: 'http://localhost:5000/ws' },
    ];
  },
};
```

**วิธีที่ 2: Server Actions + BFF (ปัจจุบัน)**
```
Browser → Next.js Server Action → Use Case → Repository → fetch() → Go Backend
```

### 1.6 Role-Based Access Control

| Role | Permissions |
|------|-------------|
| **Admin** | ทุกโมดูล + จัดการผู้ใช้ + Settings |
| **User** | Dashboard, Customers, IoT, Reports |

Route permissions กำหนดใน `src/core/config/route-permissions.config.ts`
Middleware ตรวจสอบ session cookie (`auth_session`) ก่อนเข้าทุกหน้า

---

## 2. Folder Structure

```
icmon-react-nextjs/
├── app/                                    # Next.js App Router (Presentation Layer)
│   ├── layout.tsx                          # Root layout (fonts, theme, toasts)
│   ├── globals.css                         # Tabler UI (SCSS) + Tailwind CSS + shadcn/ui CSS variables
│   ├── global-error.tsx                    # Global error boundary
│   │
│   ├── _components/                        # Shared UI Components
│   │   ├── utils.ts                        # cn() utility (clsx + tailwind-merge)
│   │   ├── theme-provider.tsx              # next-themes ThemeProvider
│   │   ├── ui/                             # shadcn/ui components
│   │   │   ├── avatar.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── separator.tsx
│   │   │   └── sonner.tsx
│   │   └── layout/                         # App Shell
│   │       ├── index.ts
│   │       ├── app-layout.tsx              # Sidebar + Header + Content
│   │       ├── sidebar.tsx                 # Dynamic sidebar from MENU_CONFIG
│   │       ├── header.tsx                  # Sticky header with ThemeToggle + UserNav
│   │       ├── theme-toggle.tsx            # Dark/Light toggle
│   │       └── user-nav.tsx                # User avatar dropdown
│   │
│   ├── (auth)/                             # Public Auth Routes
│   │   ├── sign-in/
│   │   │   ├── page.tsx
│   │   │   ├── actions.ts
│   │   │   ├── reducer.ts
│   │   │   └── gateway.types.ts
│   │   └── sign-up/
│   │       ├── page.tsx
│   │       ├── actions.ts
│   │       ├── reducer.ts
│   │       ├── hooks/
│   │       │   ├── use-controller.ts
│   │       │   └── use-presenter.ts
│   │       └── gateway.types.ts
│   │
│   ├── (home)/                             # Home/Todos
│   │   ├── page.tsx
│   │   ├── context.tsx
│   │   ├── actions/
│   │   │   ├── create-todo.action.ts
│   │   │   ├── toggle-todo.action.ts
│   │   │   ├── bulk-update.action.ts
│   │   │   └── sign-out.action.ts
│   │   ├── todos/
│   │   │   ├── todos.tsx
│   │   │   ├── use-controller.ts
│   │   │   ├── use-presenter.ts
│   │   │   └── todo-item/
│   │   └── add-todo/
│   │
│   ├── (dashboard)/                        # Protected Dashboard Routes
│   │   ├── layout.tsx                      # AppLayout wrapper
│   │   ├── dashboard/page.tsx
│   │   ├── customers/page.tsx
│   │   ├── iot/devices/page.tsx
│   │   └── settings/
│   │       ├── page.tsx
│   │       ├── hardware/page.tsx
│   │       ├── locations/page.tsx
│   │       └── schedule/page.tsx
│   │
│   └── api/                                # REST API Routes
│       ├── auth/
│       │   ├── sign-in/route.ts
│       │   ├── sign-out/route.ts
│       │   └── sign-up/route.ts
│       └── todos/
│           ├── route.ts
│           ├── [id]/route.ts
│           └── bulk/route.ts
│
├── src/                                    # Clean Architecture Source
│   ├── core/                               # Core Infrastructure (shared)
│   │   ├── config/
│   │   │   ├── app.config.ts               # APP_CONFIG, API_CONFIG, AUTH_CONFIG
│   │   │   ├── environment.ts              # Environment config (production, demo, api, logger, ollama)
│   │   │   ├── menu.config.ts              # Sidebar MENU_CONFIG
│   │   │   └── route-permissions.config.ts # RBAC route map
│   │   ├── constants/
│   │   │   ├── device-type.constant.ts
│   │   │   ├── job-status.constant.ts
│   │   │   ├── order-status.constant.ts
│   │   │   └── roles.constant.ts
│   │   ├── contracts/
│   │   │   ├── mapper.contract.ts
│   │   │   ├── repository.contract.ts
│   │   │   └── use-case.contract.ts
│   │   ├── services/
│   │   │   ├── logger.service.ts
│   │   │   ├── permission.service.ts
│   │   │   ├── seo.service.ts
│   │   │   └── theme.service.ts
│   │   ├── types/
│   │   │   ├── api-response.type.ts
│   │   │   ├── common.types.ts
│   │   │   └── pagination.type.ts
│   │   └── utils/
│   │       ├── formatters.ts
│   │       ├── helpers.ts
│   │       ├── number-formatters.ts
│   │       └── validators.ts
│   │
│   ├── entities/                           # Domain Entities (global)
│   │   ├── errors/
│   │   │   ├── auth.ts
│   │   │   └── common.ts
│   │   └── models/
│   │       ├── user.ts / user.factory.ts
│   │       ├── customer.ts
│   │       ├── device.ts
│   │       ├── hardware.ts
│   │       ├── location.ts
│   │       ├── schedule.ts
│   │       ├── sensor.ts
│   │       ├── session.ts / session.factory.ts
│   │       ├── token.ts
│   │       ├── todo.ts / todo.factory.ts
│   │       └── web-order.ts
│   │
│   ├── application/                        # Application Layer
│   │   ├── repositories/                   # Repository Interfaces (ports)
│   │   │   ├── customers.repository.interface.ts
│   │   │   ├── dashboard.repository.interface.ts
│   │   │   ├── devices.repository.interface.ts
│   │   │   ├── hardware.repository.interface.ts
│   │   │   ├── locations.repository.interface.ts
│   │   │   ├── schedules.repository.interface.ts
│   │   │   ├── sensors.repository.interface.ts
│   │   │   ├── todos.repository.interface.ts
│   │   │   ├── tokens.repository.interface.ts
│   │   │   ├── users.repository.interface.ts
│   │   │   └── web-orders.repository.interface.ts
│   │   ├── services/                       # Service Interfaces
│   │   │   ├── authentication.service.interface.ts
│   │   │   └── transaction-manager.service.interface.ts
│   │   └── use-cases/                      # Use Cases
│   │       ├── auth/                       # sign-in, sign-out, sign-up
│   │       ├── customers/                  # create, get, list
│   │       ├── dashboard/                  # get-dashboard-stats
│   │       ├── iot/                        # list-devices
│   │       ├── todos/                      # create, delete, toggle, bulk-update
│   │       └── wos/                        # create, list
│   │
│   ├── infrastructure/                     # Infrastructure Implementations
│   │   ├── repositories/                   # Multiple backends
│   │   │   ├── *.repository.in-file.ts     # JSON file persistence
│   │   │   ├── *.repository.sqlite.ts      # Turso/LibSQL (Drizzle ORM)
│   │   │   └── *.repository.mock.ts        # Mock for testing
│   │   └── services/
│   │       ├── authentication.service.*.ts
│   │       └── transaction-manager.service.*.ts
│   │
│   ├── interface-adapters/                 # Interface Adapters
│   │   ├── api/                            # REST API adapters
│   │   │   ├── auth/                       # sign-in, sign-out, sign-up
│   │   │   └── todos/                      # CRUD operations
│   │   ├── bff/                            # Backend-for-Frontend
│   │   │   ├── auth/
│   │   │   ├── customers/
│   │   │   ├── dashboard/
│   │   │   ├── iot/
│   │   │   ├── todos/
│   │   │   └── wos/
│   │   └── e2e/                            # E2E test adapters
│   │
│   └── features/                           # Feature Modules (vertical slices)
│       ├── ai-analytics/
│       ├── ai-chatbot/
│       ├── alarm/
│       ├── auth/
│       ├── batch/
│       ├── customer/
│       ├── dashboard/
│       ├── document/
│       ├── email/
│       ├── inventory/
│       ├── iot/
│       ├── job-card/
│       ├── monitoring/
│       ├── mqtt/
│       ├── orders/
│       ├── payment/
│       ├── purchase-order/
│       ├── quotation/
│       ├── report/
│       ├── settings/
│       ├── system/
│       ├── user/
│       ├── websocket/
│       └── wos/
│
├── di/                                     # Dependency Injection
│   ├── container.ts                        # IoC Container + getInjection()
│   ├── types.ts                            # 68 DI Symbols
│   ├── persistence.ts                      # in-file / sqlite switch
│   └── modules/                            # Module registrations
│       ├── authentication.module.ts
│       ├── database.module.ts
│       ├── todos.module.ts
│       └── users.module.ts
│
├── public/                                 # Static Assets
│   ├── assets/
│   │   ├── appcss/                        # Inter font CSS + woff2 files
│   │   ├── flags/                         # Country flag images
│   │   ├── img/                           # Static images (thai.png)
│   │   ├── users/                         # User avatars (avatar1.png, etc.)
│   │   ├── tabler/                        # Tabler UI assets
│   │   │   ├── dist/css/                  # tabler-flags, tabler-socials, etc.
│   │   │   ├── dist/fonts/geist-sans/     # Geist Sans font family
│   │   │   ├── dist/libs/typed.js/        # Typed.js library
│   │   │   └── scss/                      # Tabler SCSS customization
│   │   └── favicon.ico
│   ├── i18n/                               # 10 language files
│   │   ├── en.json / th.json / zh.json
│   │   ├── ja.json / ko.json / vi.json
│   │   └── my.json / ms.json / km.json / lo.json
│   ├── flags/                              # Country flag SVGs (duplicate)
│   ├── img/                                # Images
│   └── images/                             # Login/register screenshots
│
├── assets/                                 # Project Assets
│   └── clean-architecture-diagram.jpg
│
├── middleware.ts                            # Next.js Auth Middleware
├── config.ts                               # SESSION_COOKIE, PASSWORD_SALT_ROUNDS
├── drizzle.config.ts                       # Drizzle ORM (Turso/SQLite)
├── drizzle/                                # DB Schema & Migrations
├── next.config.mjs                         # Next.js Config (rewrites, SCSS, standalone)
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── vitest.config.ts                        # Unit Test Config
├── playwright.config.base.ts               # E2E Test Config
├── .eslintrc.json                          # Architecture Boundary Rules
├── .prettierrc
├── .env                                    # Environment Variables
├── .dockerignore                           # Docker ignore rules
├── Dockerfile                              # Multi-stage Docker build (dev + production)
├── docker-compose.yml                      # Docker Compose (dev on port 3010:1003, prod on 3010:3000)
├── docker-entrypoint.sh                    # Docker entrypoint with backend detection
│
├── docs/                                   # Documentation
│   ├── architecture-guide.md
│   ├── module-map.md
│   ├── migration-report.md
│   ├── theme-guide.md
│   └── design/                             # Design docs
│
├── scripts/                                # Build Scripts
└── tests/                                  # E2E Test Suite
```

---

## 3. Flow การทำงาน

### 3.1 Authentication Flow

```
┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│  Browser  │────▶│  Next.js  │────▶│   BFF    │────▶│ Use Case │────▶│   Auth   │
│  /sign-in │     │  Action   │     │Controller│     │ Sign-In  │     │  Service │
└──────────┘     └──────────┘     └──────────┘     └──────────┘     └──────────┘
                                                              │
                                                         ┌────▼────┐
                                                         │ SQLite / │
                                                         │ in-file  │
                                                         └─────────┘
                                                         │
                                                    ┌────▼────┐
                                                    │  Lucia  │
                                                    │ Session │
                                                    └────┬────┘
                                                         │
                                                    Set-Cookie: auth_session
                                                         │
                                                    ┌────▼────┐
                                                    │Redirect │
                                                    │  /home  │
                                                    └─────────┘
```

### 3.2 Data Fetching Flow (Feature Module)

```
┌──────────┐    ┌──────────┐    ┌───────────┐    ┌──────────┐    ┌──────────┐
│  Page     │───▶│Use Case  │───▶│Repository │───▶│DataSource│───▶│Go Backend│
│Component  │    │          │    │Interface  │    │(fetch)   │    │(port5000)│
└──────────┘    └──────────┘    └─────┬─────┘    └──────────┘    └──────────┘
                                      │
                                ┌─────▼──────┐
                                │Repository  │
                                │  Impl      │
                                │(in-file/   │
                                │ sqlite)    │
                                └────────────┘
```

### 3.3 Request Lifecycle (Full)

```
1. User clicks link / submits form
         │
2. middleware.ts checks auth_session cookie
         │
3. Next.js Router matches route → app/(dashboard)/{path}/page.tsx
         │
4. Server Component or Server Action executes
         │
5. getInjection('ISomeUseCase') resolves from DI container
         │
6. Use Case calls Repository Interface method
         │
7. Repository Implementation (selected by persistence.ts)
   ├── in-file: reads/writes JSON files
   └── sqlite: queries via Drizzle ORM → Turso/LibSQL
         │
8. For external API calls: DataSource uses fetch() → Go backend
         │
9. Result flows back: Repository → Use Case → Controller → Presenter → React Component
         │
10. UI renders with Tailwind CSS + shadcn/ui components
```

### 3.4 Feature Module Internal Flow

```
domain/entities/          ← Pure TypeScript interfaces (no imports from outside)
       │
domain/repositories/      ← Interface contracts (I*Repository)
       │
domain/use-cases/         ← Business logic, depends only on entities + interfaces
       │
data/datasources/         ← HTTP/fetch calls to external APIs
data/dtos/                ← API request/response shapes
data/repositories/        ← Implements I*Repository, maps DTOs ↔ Entities
       │
presentation/pages/       ← React components, calls use cases via DI
```

### 3.5 Multi-Persistence Strategy

```
                    ┌──────────────────────┐
                    │   PERSISTENCE env     │
                    │   "in-file" / "sqlite"│
                    └──────────┬───────────┘
                               │
                    ┌──────────▼───────────┐
                    │  di/persistence.ts    │
                    │  Selects module       │
                    └──────────┬───────────┘
                               │
              ┌────────────────┼────────────────┐
              ▼                ▼                ▼
     ┌────────────────┐ ┌────────────┐ ┌────────────┐
     │  in-file        │ │  sqlite    │ │   mock     │
     │  JSON files     │ │  Turso/    │ │  In-memory │
     │  (*.local.json) │ │  LibSQL    │ │  for tests │
     └────────────────┘ └────────────┘ └────────────┘
```

---

## 4. การติดตั้ง

### 4.1 Prerequisites

- **Node.js** >= 22
- **npm** >= 10
- **Go Backend** running on port 5000 (optional — for full API)

### 4.2 Install

```bash
# Clone
git clone <repo-url>
cd icmon-react-nextjs

# Install dependencies (includes Tabler UI, icons, SCSS)
npm install
```

### 4.2.1 Assets (from icmonangular)

โปรเจกต์คัดลอก assets จาก `icmonangular` มาไว้ที่ `public/assets/`:

| ที่มา | ไปที่ | รายละเอียด |
|-------|-------|-----------|
| `src/assets/appcss/` | `public/assets/appcss/` | Inter font CSS + woff2 files |
| `src/assets/flags/` | `public/assets/flags/` | Country flag images |
| `src/assets/img/` | `public/assets/img/` | thai.png |
| `src/assets/tabler/` | `public/assets/tabler/` | Tabler CSS, SCSS, fonts (Geist), libs |
| `src/users/` | `public/assets/users/` | User avatars |
| `images/` | `public/images/` | Login/register screenshots |
| `src/assets/i18n/` | `public/i18n/` | 10 language translation files |

### 4.3 Environment Variables

```bash
# Copy and edit .env
cp .env .env.local
```

`.env` (default):
```env
# --- API Proxy (like icmonangular proxy.conf.json) ---
API_TARGET_URL=http://localhost:5000
NEXT_PUBLIC_API_TARGET_URL=http://localhost:5000
NEXT_PUBLIC_USE_PROXY=true
NEXT_PUBLIC_API_PRIMARY=http://localhost:5000

PERSISTENCE=in-file
DATABASE_URL=file:sqlite.local.db
DATABASE_AUTH_TOKEN=local-dev-placeholder
IN_FILE_USERS_FILE=in-file-users.local.json
IN_FILE_TODOS_FILE=in-file-todos.local.json

# --- AI / Chatbot ---
NEXT_PUBLIC_OLLAMA_URL=http://localhost:11434
NEXT_PUBLIC_OLLAMA_MODEL=llama3
NEXT_PUBLIC_CHATBOT_ENABLED=true

# --- Logging ---
NEXT_PUBLIC_LOG_LEVEL=debug
NEXT_PUBLIC_DEMO=false
```

### 4.4 Development Server

```bash
# Default (in-file persistence)
npm run dev
# → http://localhost:3000

# With SQLite persistence
npm run dev:sqlite

# With in-file persistence (explicit)
npm run dev:in-file
```

### 4.5 API Proxy (ไป Go Backend)

Proxy ถูกกำหนดค่าใน `next.config.mjs` ใช้ `API_TARGET_URL` จาก environment variable:

```js
// next.config.mjs
const API_TARGET = process.env.API_TARGET_URL || 'http://localhost:5000';

const nextConfig = {
  output: 'standalone',
  async rewrites() {
    return [
      { source: '/api/:path*', destination: `${API_TARGET}/api/:path*` },
      { source: '/ws/:path*', destination: `${API_TARGET}/ws/:path*` },
    ];
  },
  sassOptions: {
    includePaths: ['./public/assets', './node_modules'],
  },
};
```

---

## 5. การ Test

### 5.1 คำสั่ง Test

```bash
# Static analysis (format + types + lint)
npm run test:static

# Unit tests (Vitest)
npm run test:unit

# Unit tests with watch mode
npm run test:unit:watch

# Unit tests with coverage
npm run test:unit:coverage

# Full test suite (static + unit + e2e)
npm run test:full

# E2E tests (Playwright)
npm run test:e2e

# Individual checks
npm run test:format     # Prettier check
npm run test:types      # TypeScript check
npm run test:lint       # ESLint check
```

### 5.2 Test Structure

```
tests/
├── e2e/                        # Playwright E2E tests
│   ├── auth.setup.ts           # Auth setup
│   ├── sign-in.spec.ts
│   └── todos.spec.ts

# Unit tests are colocated with source files:
src/
├── features/auth/.../sign-in.use-case.spec.ts
├── interface-adapters/bff/.../*.test.ts
├── core/utils/formatters.spec.ts
└── ...
```

### 5.3 Architecture Boundary Testing

`eslint-plugin-boundaries` บังคับ dependency rules อัตโนมัติ:

```
web → entities, di
api → entities, use-cases, repository-interfaces
bff → entities, use-cases
use-cases → entities, repository-interfaces, service-interfaces
infrastructure → repository-interfaces, service-interfaces, entities
entities → entities (self only)
```

ถ้ามี import ที่ละเมิด boundaries → ESLint จะ error ทันที

### 5.4 Test Technologies

| Tool | Purpose |
|------|---------|
| **Vitest** | Unit testing + coverage (istanbul) |
| **Playwright** | E2E browser testing |
| **factory-t** | Test data factories |
| **ESLint boundaries** | Architecture compliance |

---

## 6. การ Build

### 6.1 Build Commands

```bash
# Production build (SQLite persistence)
npm run build
# or
npm run build:sqlite

# Production build (in-file persistence)
npm run build:in-file

# Production server
npm start
# → http://localhost:3000
```

### 6.2 Build Output

```
.next/                    # Next.js build output
├── server/               # Server-side code
├── static/               # Static assets (JS, CSS)
└── ...
```

### 6.3 Build Scripts (package.json)

```json
{
  "dev": "npm run dev:in-file",
  "dev:sqlite": "PERSISTENCE=sqlite next dev",
  "dev:in-file": "PERSISTENCE=in-file next dev",
  "build": "npm run build:sqlite",
  "build:sqlite": "PERSISTENCE=sqlite next build",
  "build:in-file": "PERSISTENCE=in-file next build",
  "start": "next start",
  "db:push": "drizzle-kit push",
  "format": "prettier --write ."
}
```

### 6.4 Database Migration (SQLite/Turso)

```bash
# Push schema changes to database
npm run db:push
```

---

## 7. การ Deploy Docker

### 7.1 Dockerfile (Multi-Stage)

```dockerfile
# ---- Stage 1: Build ----
FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ENV PERSISTENCE=sqlite
ENV NODE_ENV=production
RUN npm run build

# ---- Stage 2: Production (standalone) ----
FROM node:22-alpine AS production

WORKDIR /app

COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]

# ---- Stage 3: Development (node) ----
FROM node:22-alpine AS development

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

EXPOSE 1003

CMD ["npm", "run", "dev"]
```

### 7.2 docker-compose.yml

```yaml
services:
  dev:
    build:
      context: .
      dockerfile: Dockerfile
      target: development
    container_name: icmonweb-react-dev
    env_file:
      - .env
    ports:
      - "3010:1003"
    extra_hosts:
      - "host.docker.internal:host-gateway"
    volumes:
      - ./app:/app/app
      - ./src:/app/src
      - ./public:/app/public
    develop:
      watch:
        - action: sync
          path: ./app
          target: /app/app
        - action: sync
          path: ./src
          target: /app/src
        - action: sync
          path: ./public
          target: /app/public
        - action: rebuild
          path: ./package.json

  production:
    build:
      context: .
      dockerfile: Dockerfile
      target: production
    container_name: icmonweb-react
    ports:
      - "3010:3000"
    extra_hosts:
      - "host.docker.internal:host-gateway"
    environment:
      - NODE_ENV=production
      - PORT=3000
```

### 7.3 docker-entrypoint.sh

```bash
#!/bin/sh

echo "[Docker] Checking backend connectivity..."

TARGET="http://host.docker.internal:5000"
FALLBACK="http://localhost:5000"

if nc -z -w2 host.docker.internal 5000 2>/dev/null; then
  echo "[Docker] host.docker.internal:5000 is reachable"
  TARGET="http://host.docker.internal:5000"
elif nc -z -w2 localhost 5000 2>/dev/null; then
  echo "[Docker] localhost:5000 is reachable"
  TARGET="http://localhost:5000"
else
  echo "[Docker] No backend reachable, defaulting to host.docker.internal:5000"
  TARGET="http://host.docker.internal:5000"
fi

export API_TARGET_URL="${TARGET}"
export NEXT_PUBLIC_API_TARGET_URL="${TARGET}"

echo "[Docker] API Target: ${TARGET}"
echo "[Docker] Starting Next.js dev server..."

exec npm run dev
```

### 7.4 .dockerignore

```
node_modules
.next
.git
.env.local
*.local
docs/
scripts/
tests/
```

### 7.5 Deploy Commands

```bash
# Development with Docker
docker compose up dev

# Production with Docker
docker compose up -d production

# Rebuild
docker compose build --no-cache production

# View logs
docker compose logs -f production

# Stop
docker compose down
```

### 7.6 Environment Variables for Docker

```bash
# .env (for Docker)
API_TARGET_URL=http://host.docker.internal:5000
NEXT_PUBLIC_API_TARGET_URL=http://host.docker.internal:5000
NEXT_PUBLIC_USE_PROXY=true
PERSISTENCE=sqlite
DATABASE_URL=file:sqlite.docker.db
DATABASE_AUTH_TOKEN=local-dev-placeholder
```

---

## 8. Feature Modules (25 modules)

| Module | Entities | Use Cases | Pages |
|--------|----------|-----------|-------|
| **Auth** | User, Permission, Role | sign-in, sign-out, sign-up, get-current-user | sign-in, sign-up |
| **Customer** | Customer, CustomerContact | create, get, list, update, delete | list, detail, create, edit |
| **Dashboard** | DashboardStats, Report | get-dashboard-stats, get-job-status, get-revenue-chart | main-dashboard |
| **IoT** | Device | 20+ use cases | device-list, device-detail, device-map |
| **Job Card** | JobCard | create, get, list, update, assign, update-status | job-list, job-detail, job-create, job-board |
| **MQTT** | Flow | list, save, delete, deploy, get-broker-config | mqtt-dashboard, mqtt-flow-editor |
| **Settings** | Hardware, Location, Schedule, Sensor, Token, etc. | 30+ use cases | 30+ settings pages |
| **Report** | Report | get-alarm-logs, get-device-report, get-logs-control, get-schedule-logs | alarm-report, device-report, logs-control-report, schedule-report |
| **AI Analytics** | Alert, Dashboard, Log, Report, Schedule, Workflow | get-alerts, get-dashboard-stats, get-insights, get-logs, get-reports | dashboard, reports, alerts, command-center |
| **AI Chatbot** | ChatMessage, Tool | send-message, get-context, get-models, execute-action | chatbot components |
| **Alarm** | Alarm | validate, acknowledge, get, list | alarm validation |
| **Batch** | BatchJob | list, get, create, trigger, get-history | batch-list, batch-create |
| **Document** | Document | list, get, upload, delete, share | document-list, document-detail, document-upload |
| **Email** | EmailTemplate | send, send-bulk, get-logs, create-template | email-templates, email-compose, email-logs |
| **Inventory** | Product | list, get, create, update, adjust-stock, get-movements | product-list, product-detail, product-create, stock-adjustment |
| **Monitoring** | MonitoringDevice | list, get | smarthome, smartcity, smartmonitor, industry, smartsolarfarm dashboards |
| **Orders** | Order | (data-only) | (data-only) |
| **Payment** | Payment | list, get, create, verify, generate-invoice | payment-list, payment-detail, payment-create, invoice-view |
| **Purchase Order** | PurchaseOrder | list, get, create, update, approve | po-list, po-detail, po-create |
| **Quotation** | Quotation | list, get, create, update, approve, reject | quotation-list, quotation-detail, quotation-create |
| **System** | System | ping, get-health, get-metrics, get-api-metric | (data-only) |
| **User** | User | (presentation only) | user-list, user-create, user-edit, profile, role-list |
| **WebSocket** | WebSocketEntity | (data service) | (real-time support) |
| **WOS** | WebOrder | list, get, create, update-status, cancel | order-list, order-detail, order-create |

---

## 9. Technology Stack

| Component | Technology |
|-----------|-----------|
| **Framework** | Next.js 14.2.5 (App Router) |
| **UI** | React 18, shadcn/ui, Radix UI, Tabler UI |
| **Styling** | Tabler UI (SCSS) + Tailwind CSS 3, dark mode via next-themes |
| **Icons** | @tabler/icons-react + lucide-react |
| **Architecture** | Clean Architecture + eslint-plugin-boundaries |
| **DI Container** | @evyweb/ioctopus |
| **Auth** | Lucia v3 (cookie-based sessions) |
| **ORM** | Drizzle ORM |
| **Database** | Turso/LibSQL (SQLite) or in-file JSON |
| **Validation** | Zod |
| **Testing** | Vitest (unit), Playwright (E2E) |
| **i18n** | 10 languages (en, th, zh, ja, ko, vi, my, ms, km, lo) |
| **Backend Proxy** | Next.js rewrites → Go (port 5000) |
| **Node** | >= 22 |

---

## 10. Proxy Configuration (เหมือน icmonangular)

### Angular (เดิม)

```json
// proxy.conf.json
{
  "/api": { "target": "http://localhost:5000", "secure": false, "changeOrigin": true },
  "/ws":  { "target": "http://localhost:5000", "secure": false, "changeOrigin": true, "ws": true }
}
```

### React + Next.js (ปัจจุบัน)

**วิธีที่ 1: Next.js Rewrites** (ใน `next.config.mjs` — ใช้ environment variable)
```js
const API_TARGET = process.env.API_TARGET_URL || 'http://localhost:5000';

async rewrites() {
  return [
    { source: '/api/:path*', destination: `${API_TARGET}/api/:path*` },
    { source: '/ws/:path*', destination: `${API_TARGET}/ws/:path*` },
  ];
}
```

**Environment Variables:**
```env
API_TARGET_URL=http://localhost:5000
NEXT_PUBLIC_API_TARGET_URL=http://localhost:5000
NEXT_PUBLIC_USE_PROXY=true
NEXT_PUBLIC_API_PRIMARY=http://localhost:5000
```

**วิธีที่ 2: Server Actions + BFF** (ปัจจุบัน — ไม่ต้อง proxy)
```
Browser → Next.js Server → Use Case → Repository → fetch('http://localhost:5000/api/...')
```

**วิธีที่ 3: nginx.conf** (Docker production)
```nginx
location /api/ {
    proxy_pass http://host.docker.internal:5000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
}
```

---

## 11. สิทธิ์ผู้ใช้ (RBAC)

| Route | Admin | User |
|-------|-------|------|
| `/dashboard` | ✅ | ✅ |
| `/customers` | ✅ | ✅ |
| `/iot/devices` | ✅ | ✅ |
| `/reports` | ✅ | ✅ |
| `/jobs` | ✅ | ✅ |
| `/wos` | ✅ | ✅ |
| `/settings` | ✅ | ❌ |
| `/user` | ✅ | ❌ |
| `/ai-analytics` | ✅ | ❌ |
| `/mqtt` | ✅ | ❌ |
| `/batch` | ✅ | ❌ |

---

## 12. เพิ่ม Feature Module ใหม่

```bash
# 1. สร้างโครงสร้าง
mkdir -p src/features/{name}/domain/{entities,repositories,use-cases}
mkdir -p src/features/{name}/data/{datasources,dtos,repositories}
mkdir -p src/features/{name}/presentation/pages

# 2. สร้างไฟล์ตาม pattern
# domain/entities/{name}.entity.ts          ← Pure interfaces
# domain/repositories/{name}.repository.ts  ← Interface contract
# domain/use-cases/*.use-case.ts            ← Business logic
# data/datasources/{name}.api.datasource.ts ← fetch() calls
# data/dtos/{name}.dto.ts                   ← Request/Response types
# data/repositories/{name}.repository.impl.ts ← implements interface
# presentation/pages/*.tsx                  ← React components

# 3. Barrel export
# index.ts

# 4. Register in di/container.ts (ถ้าใช้ DI pattern)
# 5. Add route in app/(dashboard)/
# 6. Add menu item in src/core/config/menu.config.ts
# 7. Add permissions in src/core/config/route-permissions.config.ts
```

---

## 13. เปรียบเทียบ Angular กับ React+Next.js

| Aspect | icmonangular | icmon-react-nextjs |
|--------|-------------|-------------------|
| Framework | Angular 21 | React 18 + Next.js 14 |
| UI Library | Tabler UI (SCSS) | Tabler UI (SCSS) + shadcn/ui + Tailwind |
| Icons | angular-tabler-icons | @tabler/icons-react + lucide-react |
| DI | Angular DI (@Injectable) | @evyweb/ioctopus |
| Routing | RouterModule + guards | App Router + middleware |
| State | RxJS + Signals | React state + hooks |
| HTTP | HttpClient + Interceptors | fetch + BFF layer |
| i18n | @ngx-translate | Client-side JSON |
| Auth | JWT + Refresh Token | Lucia v3 (cookie) |
| DB | External Go backend | Turso/SQLite + in-file |
| Proxy | proxy.conf.json | Next.js rewrites + env variable |
| Test | Karma/Jasmine | Vitest + Playwright |
| Build | ng build | next build |
| Docker | nginx:alpine | node:22-alpine (standalone) |
| Port | 4200 (dev) / 80 (prod) | 3000 |
| Features | 25 modules | 25 modules |

---

*Developed by Kongnakorn Jantakun — IoT Monitoring Platform*

---

## 📄 เอกสารเพิ่มเติม

| ไฟล์ | รายละเอียด |
|------|-----------|
| [ReadmeArchitecture.md](./ReadmeArchitecture.md) | Architecture deep-dive: Layer diagram, Folder tree, Flow การทำงาน, การติดตั้ง, Test, Build, Docker |
| [docs/architecture-guide.md](./docs/architecture-guide.md) | คู่มือการพัฒนาและบำรุงรักษา Clean Architecture |
| [docs/module-map.md](./docs/module-map.md) | Module dependency map |
| [docs/migration-report.md](./docs/migration-report.md) | รายงาน migration จาก Angular |
| [docs/theme-guide.md](./docs/theme-guide.md) | คู่มือ theme + dark mode |
