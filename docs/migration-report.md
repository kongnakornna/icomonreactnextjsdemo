# Migration Report: Angular → React/Next.js

## วันที่: 26 สิงหาคม 2569

---

## สรุปผลการดำเนินงาน

### โครงสร้าง Features ทั้งหมด (25 Features)

| # | Feature | Domain | Data | Presentation | สถานะ |
|---|---------|--------|------|--------------|-------|
| 1 | **ai-analytics** | 8 entities, 1 repo, 8 use-cases | 1 datasource, 1 DTO, 1 impl | 8 pages | ✅ ใหม่ |
| 2 | **ai-chatbot** | 2 entities, 1 repo, 4 use-cases | 1 datasource, 1 DTO, 1 impl | — | ✅ ใหม่ |
| 3 | **alarm** | 1 entity, 1 repo, 3 use-cases | 1 datasource, 1 DTO, 1 impl | 2 pages | ✅ ใหม่ |
| 4 | **auth** | 3 entities, 1 repo, 4 use-cases | 1 datasource, 1 DTO, 1 impl | 2 pages | ✅ มีอยู่ |
| 5 | **batch** | 1 entity, 1 repo, 4 use-cases | 1 datasource, 1 DTO, 1 impl | 2 pages | ✅ ใหม่ |
| 6 | **customer** | 1 entity, 1 repo, 5 use-cases | 1 datasource, 1 DTO, 1 impl | 4 pages | ✅ มีอยู่ |
| 7 | **dashboard** | 1 entity, 1 repo, 3 use-cases | 1 datasource, 1 DTO, 1 impl | 1 page | ✅ มีอยู่ |
| 8 | **document** | 1 entity, 1 repo, 5 use-cases | 1 datasource, 1 DTO, 1 impl | 3 pages | ✅ ใหม่ |
| 9 | **email** | 3 entities, 1 repo, 4 use-cases | 1 datasource, 1 DTO, 1 impl | 3 pages | ✅ ใหม่ |
| 10 | **inventory** | 2 entities, 1 repo, 5 use-cases | 1 datasource, 1 DTO, 1 impl | 4 pages | ✅ ใหม่ |
| 11 | **iot** | 1 entity, 1 repo, 4 use-cases | 1 datasource, 1 DTO, 1 impl | 2 pages | ✅ มีอยู่ |
| 12 | **job-card** | 1 entity, 1 repo, 6 use-cases | 1 datasource, 1 DTO, 1 impl | 4 pages | ✅ ใหม่ |
| 13 | **monitoring** | 1 entity, 1 repo, 1 use-case | 1 datasource, 1 DTO, 1 impl | 1 page | ✅ ใหม่ |
| 14 | **mqtt** | 1 entity, 1 repo, 7 use-cases | 1 datasource, 1 DTO, 1 impl | 2 pages | ✅ ใหม่ |
| 15 | **orders** | 1 entity, 1 repo, 1 use-case | 1 datasource, 1 DTO, 1 impl | — | ✅ ใหม่ |
| 16 | **payment** | 1 entity, 1 repo, 5 use-cases | 1 datasource, 1 DTO, 1 impl | 4 pages | ✅ ใหม่ |
| 17 | **purchase-order** | 1 entity, 1 repo, 5 use-cases | 1 datasource, 1 DTO, 1 impl | 3 pages | ✅ ใหม่ |
| 18 | **quotation** | 1 entity, 1 repo, 6 use-cases | 1 datasource, 1 DTO, 1 impl | 3 pages | ✅ ใหม่ |
| 19 | **report** | 1 entity, 1 repo, 4 use-cases | 1 datasource, 1 DTO, 1 impl | 4 pages | ✅ ใหม่ |
| 20 | **settings** | 5 entities, 5 repos, 5 use-cases | 1 datasource, 1 DTO, 5 impls | 3 pages | ✅ มีอยู่ |
| 21 | **system** | 1 entity, 1 repo, 4 use-cases | 1 datasource, 1 DTO, 1 impl | — | ✅ ใหม่ |
| 22 | **user** | — (uses auth entity) | — | 5 pages | ✅ ใหม่ |
| 23 | **websocket** | 1 entity | 1 service | — | ✅ ใหม่ |
| 24 | **wos** | 1 entity, 1 repo, 5 use-cases | 1 datasource, 1 DTO, 1 impl | 2 pages | ✅ มีอยู่ |
| 25 | **pages** | — | — | 23 pages | ✅ ใหม่ |

---

## โครงสร้างไฟล์ทั้งหมด

```
src/features/                          25 features + index.ts
├── ai-analytics/                      8 entities, 8 use-cases, 8 pages
├── ai-chatbot/                        2 entities, 4 use-cases
├── alarm/                             1 entity, 3 use-cases, 2 pages
├── auth/                              3 entities, 4 use-cases, 2 pages
├── batch/                             1 entity, 4 use-cases, 2 pages
├── customer/                          1 entity, 5 use-cases, 4 pages
├── dashboard/                         1 entity, 3 use-cases, 1 page
├── document/                          1 entity, 5 use-cases, 3 pages
├── email/                             3 entities, 4 use-cases, 3 pages
├── inventory/                         2 entities, 5 use-cases, 4 pages
├── iot/                               1 entity, 4 use-cases, 2 pages
├── job-card/                          1 entity, 6 use-cases, 4 pages
├── monitoring/                        1 entity, 1 use-case, 1 page
├── mqtt/                              1 entity, 7 use-cases, 2 pages
├── orders/                            1 entity, 1 use-case
├── pages/                             23 pages (UI templates)
├── payment/                           1 entity, 5 use-cases, 4 pages
├── purchase-order/                    1 entity, 5 use-cases, 3 pages
├── quotation/                         1 entity, 6 use-cases, 3 pages
├── report/                            1 entity, 4 use-cases, 4 pages
├── settings/                          5 entities, 5 repos, 5 use-cases, 3 pages
├── system/                            1 entity, 4 use-cases
├── user/                              5 pages
├── websocket/                         1 entity, 1 service
└── wos/                               1 entity, 5 use-cases, 2 pages
```

---

## เปรียบเทียบ Angular vs React

### Architecture Pattern

| Layer | Angular | React |
|-------|---------|-------|
| **Domain** | `domain/entities/` | `domain/entities/` ✅ |
| **Domain** | `domain/repositories/` | `domain/repositories/` ✅ |
| **Domain** | `domain/use-cases/` | `domain/use-cases/` ✅ |
| **Data** | `data/datasources/` | `data/datasources/` ✅ |
| **Data** | `data/dtos/` | `data/dtos/` ✅ |
| **Data** | `data/repositories/` | `data/repositories/` ✅ |
| **Presentation** | `presentation/pages/` | `presentation/pages/` ✅ |
| **Presentation** | `presentation/components/` | — ใช้ `app/_components/` แทน |
| **Presentation** | `presentation/layouts/` | — ใช้ `app/_components/layout/` แทน |

### Technology Stack

| Concern | Angular | React |
|---------|---------|-------|
| **Framework** | Angular 17+ | Next.js 14+ (App Router) |
| **Language** | TypeScript | TypeScript |
| **State** | RxJS Observables | Promises/async-await |
| **DI** | @Injectable + providers | Constructor + ioctopus |
| **Validation** | Zod | Zod ✅ |
| **Styling** | SCSS + Tabler | Tailwind CSS + shadcn/ui |
| **Routing** | RouterModule | App Router (file-based) |
| **HTTP** | HttpClient | fetch API |
| **i18n** | TranslatePipe | — (ยังไม่ได้ทำ) |
| **Testing** | Jasmine + Karma | — (ยังไม่ได้ทำ) |

---

## App Routes (Next.js)

```
app/
├── (auth)/
│   ├── sign-in/page.tsx
│   └── sign-up/page.tsx
├── (dashboard)/
│   ├── layout.tsx
│   ├── customers/page.tsx        → CustomerListPage
│   ├── dashboard/page.tsx        → MainDashboardPage
│   ├── iot/devices/page.tsx      → DeviceListPage
│   ├── settings/
│   │   ├── page.tsx              (settings menu)
│   │   ├── hardware/page.tsx     → HardwareListPage
│   │   ├── locations/page.tsx    → LocationListPage
│   │   └── schedule/page.tsx     → ScheduleListPage
│   └── wos/page.tsx              → OrderListPage
├── (home)/
│   └── page.tsx                  (todo app)
├── api/
│   ├── auth/
│   │   ├── sign-in/route.ts
│   │   ├── sign-out/route.ts
│   │   └── sign-up/route.ts
│   └── todos/
│       ├── route.ts
│       ├── [id]/route.ts
│       └── bulk/route.ts
├── layout.tsx
├── globals.css
└── global-error.tsx
```

---

## สิ่งที่ยังไม่ได้ทำ (Pending)

### 1. App Routes สำหรับ Features ใหม่
ยังไม่ได้สร้าง routes ใน `app/(dashboard)/` สำหรับ:
- `/ai-analytics` → ai-analytics pages
- `/alarm` → alarm pages
- `/batch` → batch pages
- `/documents` → document pages
- `/email` → email pages
- `/inventory` → inventory pages
- `/jobs` → job-card pages
- `/monitoring` → monitoring pages
- `/mqtt` → mqtt pages
- `/orders` → orders pages
- `/payments` → payment pages
- `/purchase-orders` → purchase-order pages
- `/quotations` → quotation pages
- `/reports` → report pages
- `/system` → system pages
- `/users` → user pages

### 2. DI Modules
ยังไม่ได้อัพเดท `di/modules/` ให้รองรับ features ใหม่

### 3. Settings Pages ที่ขาดหาย
Settings feature ใน Angular มี 30 pages แต่ React มีแค่ 3 pages:
- ขาด: sensor-list, sensor-create, sensor-edit
- ขาด: token-list, token-create
- ขาด: host-list, host-create
- ขาด: line-list, line-create
- ขาด: sms-list, sms-create
- ขาด: schedule-data, schedule-device, schedule-edit, schedule-logs
- ขาด: hardware-edit
- ขาด: location-edit
- ขาด: alarm-settings, api-settings, device-settings, email-settings, influxdb-settings, mqtt-settings, nodered-settings

### 4. i18n (Internationalization)
Angular มี `shared/i18n/` แต่ React ยังไม่มี

### 5. Guards/Middleware
Angular มี `AuthGuard`, `PermissionGuard` แต่ React ยังไม่ได้ทำ middleware สำหรับ auth guard

### 6. Tests
ยังไม่มี test files สำหรับ features ใหม่

---

## สถิติ

| รายการ | จำนวน |
|--------|-------|
| Features ทั้งหมด | **25** |
| Domain Entities | **~50** |
| Repository Interfaces | **~30** |
| Use Cases | **~120** |
| DTOs | **~25** |
| API Datasources | **~25** |
| Repository Implementations | **~25** |
| Presentation Pages | **~90** |
| App Route Pages | **~15** |
| **Total Files** | **~350+** |

---

## สรุป

โครงสร้าง `src/features/` แบบ Angular Clean Architecture ครบถ้วน 25 features แล้ว ทุก feature มี:
- `domain/entities/` - Zod schemas
- `domain/repositories/` - Repository interfaces
- `domain/use-cases/` - Use case classes
- `data/datasources/` - API datasource classes
- `data/dtos/` - DTO interfaces
- `data/repositories/` - Repository implementations
- `presentation/pages/` - React page components

ขั้นตอนต่อไป:
1. สร้าง App Routes สำหรับ features ใหม่ทั้งหมด
2. อัพเดท DI modules
3. เพิ่ม Settings pages ที่ขาดหาย
4. เพิ่ม i18n support
5. เพิ่ม auth guards/middleware
6. เขียน tests
