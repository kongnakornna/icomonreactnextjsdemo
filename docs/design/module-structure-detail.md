# Module Structure Detail - โครงสร้าง Modules แบบละเอียด

## สารบัญ

1. [Core Module](#core-module)
2. [Feature Module Template](#feature-module-template)
3. [Auth Module](#auth-module)
4. [Dashboard Module](#dashboard-module)
5. [Customer Module](#customer-module)
6. [WOS Module](#wos-module)
7. [Settings Module](#settings-module)
8. [IoT Module](#iot-module)

---

## Core Module

```
src/core/
├── config/
│   ├── app.config.ts              # App configuration
│   ├── api.config.ts              # API endpoints config
│   └── menu.config.ts             # Sidebar menu structure
│
├── constants/
│   ├── index.ts                   # Barrel export
│   ├── roles.constant.ts          # User roles enum
│   ├── order-status.constant.ts   # Order status enum
│   └── device-type.constant.ts    # IoT device types
│
├── contracts/
│   ├── index.ts
│   ├── mapper.contract.ts         # Mapper interface
│   ├── use-case.contract.ts       # UseCase interface
│   └── repository.contract.ts     # Base repository interface
│
├── services/
│   ├── index.ts
│   ├── theme.service.ts           # Theme management (useTheme hook)
│   ├── logger.service.ts          # Logging service
│   ├── permission.service.ts      # Permission checking
│   ├── seo.service.ts             # SEO metadata generation
│   └── api-fallback.service.ts    # API fallback handling
│
├── types/
│   ├── index.ts
│   ├── pagination.type.ts         # Pagination types
│   ├── api-response.type.ts       # API response wrapper
│   └── common.types.ts            # Shared types
│
├── utils/
│   ├── index.ts
│   ├── formatters.ts              # Date, number formatters
│   ├── validators.ts              # Common validators
│   └── helpers.ts                 # Utility functions
│
└── index.ts                       # Barrel export
```

---

## Feature Module Template

### Angular Structure (Reference)

```
features/{module}/
├── domain/
│   ├── entities/
│   │   └── {entity}.entity.ts
│   ├── repositories/
│   │   └── {entity}.repository.ts
│   └── use-cases/
│       ├── create-{entity}.use-case.ts
│       ├── get-{entity}.use-case.ts
│       ├── list-{entities}.use-case.ts
│       ├── update-{entity}.use-case.ts
│       └── delete-{entity}.use-case.ts
│
├── data/
│   ├── datasources/
│   │   └── {module}.api.datasource.ts
│   ├── dtos/
│   │   ├── {entity}-response.dto.ts
│   │   └── create-{entity}-request.dto.ts
│   ├── mappers/
│   │   └── {entity}.mapper.ts
│   └── repositories/
│       └── {entity}.repository.impl.ts
│
└── presentation/
    ├── pages/
    │   └── {page-name}/
    │       ├── {page-name}.component.ts
    │       ├── {page-name}.component.html
    │       └── {page-name}.component.scss
    └── components/
        └── {component-name}/
            └── ...
```

### React/Next.js Structure (Target)

```
# Entity (shared across all modules)
src/entities/models/{entity}.ts            # Zod schema

# Repository Interface
src/application/repositories/{entities}.repository.interface.ts

# Use Cases
src/application/use-cases/{module}/
├── create-{entity}.use-case.ts
├── get-{entity}.use-case.ts
├── list-{entities}.use-case.ts
├── update-{entity}.use-case.ts
└── delete-{entity}.use-case.ts

# Repository Implementation
src/infrastructure/repositories/{entities}.repository.{type}.ts

# Interface Adapters
src/interface-adapters/bff/{module}/
├── create-{entity}/
│   ├── controller.ts
│   ├── presenter.ts
│   └── contract.ts
└── ...

# API Routes
app/api/{module}/
├── route.ts                       # GET (list), POST (create)
└── [id]/
    └── route.ts                   # GET (one), PUT (update), DELETE

# Pages
app/(dashboard)/(module)/
├── page.tsx                       # List page
├── [id]/
│   └── page.tsx                   # Detail page
└── create/
    └── page.tsx                   # Create page

# DI Module
di/modules/{module}.module.ts

# Tests
tests/unit/application/use-cases/{module}/
tests/unit/infrastructure/repositories/
```

---

## Auth Module

### Angular Structure

```
features/auth/
├── domain/
│   ├── entities/
│   │   ├── user.entity.ts
│   │   ├── role.entity.ts
│   │   └── permission.entity.ts
│   ├── repositories/
│   │   └── auth.repository.ts
│   └── use-cases/
│       ├── login.use-case.ts
│       ├── logout.use-case.ts
│       ├── sign-in.use-case.ts
│       └── sign-up.use-case.ts
│
├── data/
│   ├── datasources/
│   │   └── auth.api.datasource.ts
│   ├── dtos/
│   │   ├── login-request.dto.ts
│   │   ├── login-response.dto.ts
│   │   └── user-response.dto.ts
│   ├── mappers/
│   │   └── auth.mapper.ts
│   └── repositories/
│       └── auth.repository.impl.ts
│
└── presentation/
    ├── pages/
    │   ├── sign-in/
    │   │   ├── sign-in.component.ts
    │   │   ├── sign-in.component.html
    │   │   └── sign-in.component.scss
    │   └── sign-up/
    │       ├── sign-up.component.ts
    │       ├── sign-up.component.html
    │       └── sign-up.component.scss
    └── components/
        └── auth-layout/
            ├── auth-layout.component.ts
            └── auth-layout.component.html
```

### React/Next.js Structure

```
# Entities
src/entities/models/
├── user.ts                        # userSchema, User type
├── role.ts                        # roleSchema, Role type
└── permission.ts                  # permissionSchema, Permission type

# Repository Interface
src/application/repositories/
└── auth.repository.interface.ts   # IAuthRepository

# Use Cases
src/application/use-cases/auth/
├── login.use-case.ts
├── logout.use-case.ts
├── sign-in.use-case.ts
└── sign-up.use-case.ts

# Repository Implementation
src/infrastructure/repositories/
└── auth.repository.{type}.ts

# Interface Adapters
src/interface-adapters/bff/auth/
├── login/
│   ├── controller.ts
│   ├── presenter.ts
│   └── contract.ts
└── sign-up/
    ├── controller.ts
    ├── presenter.ts
    └── contract.ts

# API Routes
app/api/auth/
├── login/route.ts
├── logout/route.ts
├── sign-in/route.ts
└── sign-up/route.ts

# Pages
app/(auth)/
├── sign-in/
│   └── page.tsx
├── sign-up/
│   └── page.tsx
├── layout.tsx                     # AuthLayout (blank, centered)
└── layout.tsx

# DI Module
di/modules/auth.module.ts

# Tests
tests/unit/application/use-cases/auth/
tests/unit/infrastructure/repositories/auth/
```

---

## Dashboard Module

### Angular Structure

```
features/dashboard/
├── domain/
│   ├── entities/
│   │   ├── dashboard-stats.entity.ts
│   │   ├── revenue-data.entity.ts
│   │   └── job-status-summary.entity.ts
│   ├── repositories/
│   │   └── dashboard.repository.ts
│   └── use-cases/
│       ├── get-stats.use-case.ts
│       ├── get-revenue-chart.use-case.ts
│       └── get-job-status.use-case.ts
│
├── data/
│   ├── datasources/
│   │   └── dashboard.api.datasource.ts
│   ├── dtos/
│   │   ├── dashboard-stats-response.dto.ts
│   │   └── revenue-data-response.dto.ts
│   ├── mappers/
│   │   └── dashboard.mapper.ts
│   └── repositories/
│       └── dashboard.repository.impl.ts
│
└── presentation/
    ├── pages/
    │   └── dashboard/
    │       ├── dashboard.component.ts
    │       ├── dashboard.component.html
    │       └── dashboard.component.scss
    └── components/
        ├── stats-card/
        ├── revenue-chart/
        └── job-status-list/
```

### React/Next.js Structure

```
# Entities
src/entities/models/
├── dashboard-stats.ts
├── revenue-data.ts
└── job-status-summary.ts

# Repository Interface
src/application/repositories/
└── dashboard.repository.interface.ts

# Use Cases
src/application/use-cases/dashboard/
├── get-stats.use-case.ts
├── get-revenue-chart.use-case.ts
└── get-job-status.use-case.ts

# Repository Implementation
src/infrastructure/repositories/
└── dashboard.repository.{type}.ts

# Interface Adapters
src/interface-adapters/bff/dashboard/
├── get-stats/
│   ├── controller.ts
│   ├── presenter.ts
│   └── contract.ts
└── get-revenue-chart/
    ├── controller.ts
    ├── presenter.ts
    └── contract.ts

# API Routes
app/api/dashboard/
├── stats/route.ts
└── revenue/route.ts

# Pages
app/(dashboard)/dashboard/
├── page.tsx                       # Dashboard page
└── components/
    ├── stats-card.tsx
    ├── revenue-chart.tsx
    └── job-status-list.tsx

# DI Module
di/modules/dashboard.module.ts
```

---

## Customer Module

### Angular Structure

```
features/customer/
├── domain/
│   ├── entities/
│   │   ├── customer.entity.ts
│   │   └── customer-contact.entity.ts
│   ├── repositories/
│   │   └── customer.repository.ts
│   └── use-cases/
│       ├── list-customers.use-case.ts
│       ├── create-customer.use-case.ts
│       ├── get-customer.use-case.ts
│       ├── update-customer.use-case.ts
│       └── delete-customer.use-case.ts
│
├── data/
│   ├── datasources/
│   │   └── customer.api.datasource.ts
│   ├── dtos/
│   │   ├── customer-response.dto.ts
│   │   └── create-customer-request.dto.ts
│   ├── mappers/
│   │   └── customer.mapper.ts
│   └── repositories/
│       └── customer.repository.impl.ts
│
└── presentation/
    ├── pages/
    │   ├── customer-list/
    │   ├── customer-detail/
    │   └── customer-create/
    └── components/
        ├── customer-form/
        └── customer-table/
```

### React/Next.js Structure

```
# Entities
src/entities/models/
├── customer.ts                    # customerSchema, Customer type
└── customer-contact.ts

# Repository Interface
src/application/repositories/
└── customers.repository.interface.ts

# Use Cases
src/application/use-cases/customers/
├── list-customers.use-case.ts
├── create-customer.use-case.ts
├── get-customer.use-case.ts
├── update-customer.use-case.ts
└── delete-customer.use-case.ts

# Repository Implementation
src/infrastructure/repositories/
└── customers.repository.{type}.ts

# Interface Adapters
src/interface-adapters/bff/customers/
├── list-customers/
│   ├── controller.ts
│   ├── presenter.ts
│   └── contract.ts
├── create-customer/
│   ├── controller.ts
│   ├── presenter.ts
│   └── contract.ts
└── get-customer/
    ├── controller.ts
    ├── presenter.ts
    └── contract.ts

# API Routes
app/api/customers/
├── route.ts                       # GET (list), POST (create)
└── [id]/
    └── route.ts                   # GET (one), PUT (update), DELETE

# Pages
app/(dashboard)/customers/
├── page.tsx                       # Customer list
├── [id]/
│   └── page.tsx                   # Customer detail
├── create/
│   └── page.tsx                   # Customer create
└── components/
    ├── customer-form.tsx
    ├── customer-table.tsx
    └── customer-card.tsx

# DI Module
di/modules/customers.module.ts
```

---

## WOS Module (Work Order System)

### Angular Structure

```
features/wos/
├── domain/
│   ├── entities/
│   │   ├── web-order.entity.ts
│   │   └── order-item.entity.ts
│   ├── repositories/
│   │   └── web-order.repository.ts
│   └── use-cases/
│       ├── list-web-orders.use-case.ts
│       ├── create-web-order.use-case.ts
│       ├── get-web-order.use-case.ts
│       ├── update-web-order-status.use-case.ts
│       └── cancel-web-order.use-case.ts
│
├── data/
│   ├── datasources/
│   │   └── wos.api.datasource.ts
│   ├── dtos/
│   │   ├── web-order-response.dto.ts
│   │   └── create-web-order-request.dto.ts
│   ├── mappers/
│   │   └── web-order.mapper.ts
│   └── repositories/
│       └── web-order.repository.impl.ts
│
└── presentation/
    ├── pages/
    │   ├── order-list/
    │   ├── order-detail/
    │   └── order-create/
    └── components/
        ├── order-status-badge/
        └── order-items-table/
```

### React/Next.js Structure

```
# Entities
src/entities/models/
├── web-order.ts                   # webOrderSchema, WebOrder type
└── order-item.ts

# Repository Interface
src/application/repositories/
└── web-orders.repository.interface.ts

# Use Cases
src/application/use-cases/wos/
├── list-web-orders.use-case.ts
├── create-web-order.use-case.ts
├── get-web-order.use-case.ts
├── update-web-order-status.use-case.ts
└── cancel-web-order.use-case.ts

# Repository Implementation
src/infrastructure/repositories/
└── web-orders.repository.{type}.ts

# Interface Adapters
src/interface-adapters/bff/wos/
├── list-web-orders/
│   ├── controller.ts
│   ├── presenter.ts
│   └── contract.ts
├── create-web-order/
│   ├── controller.ts
│   ├── presenter.ts
│   └── contract.ts
└── get-web-order/
    ├── controller.ts
    ├── presenter.ts
    └── contract.ts

# API Routes
app/api/wos/
├── orders/
│   ├── route.ts                   # GET (list), POST (create)
│   └── [id]/
│       └── route.ts               # GET (one), PUT (update), DELETE

# Pages
app/(dashboard)/wos/
├── page.tsx                       # Order list
├── [id]/
│   └── page.tsx                   # Order detail
├── create/
│   └── page.tsx                   # Order create
└── components/
    ├── order-status-badge.tsx
    ├── order-items-table.tsx
    └── order-form.tsx

# DI Module
di/modules/wos.module.ts
```

---

## Settings Module

### Angular Structure

```
features/settings/
├── domain/
│   ├── entities/
│   │   ├── schedule.entity.ts
│   │   ├── alarm-config.entity.ts
│   │   ├── device-config.entity.ts
│   │   ├── location.entity.ts
│   │   ├── hardware.entity.ts
│   │   ├── sensor.entity.ts
│   │   ├── mqtt-config.entity.ts
│   │   ├── email-config.entity.ts
│   │   └── token.entity.ts
│   ├── repositories/
│   │   ├── schedule.repository.ts
│   │   ├── location.repository.ts
│   │   ├── hardware.repository.ts
│   │   └── sensor.repository.ts
│   └── use-cases/
│       ├── schedule/
│       │   ├── list-schedules.use-case.ts
│       │   ├── create-schedule.use-case.ts
│       │   └── ...
│       ├── location/
│       │   ├── list-locations.use-case.ts
│       │   └── ...
│       └── ...
│
├── data/
│   ├── datasources/
│   │   └── settings.api.datasource.ts
│   ├── dtos/
│   │   └── ...
│   ├── mappers/
│   │   └── settings.mapper.ts
│   └── repositories/
│       └── settings.repository.impl.ts
│
└── presentation/
    ├── pages/
    │   ├── schedule-list/
    │   ├── schedule-create/
    │   ├── alarm-settings/
    │   ├── device-settings/
    │   ├── location-list/
    │   ├── hardware-list/
    │   ├── sensor-list/
    │   ├── mqtt-settings/
    │   ├── email-settings/
    │   └── token-list/
    └── components/
        ├── schedule-form/
        ├── device-form/
        └── ...
```

### React/Next.js Structure

```
# Entities
src/entities/models/
├── schedule.ts
├── alarm-config.ts
├── device-config.ts
├── location.ts
├── hardware.ts
├── sensor.ts
├── mqtt-config.ts
├── email-config.ts
└── token.ts

# Repository Interfaces
src/application/repositories/
├── schedules.repository.interface.ts
├── locations.repository.interface.ts
├── hardware.repository.interface.ts
├── sensors.repository.interface.ts
└── tokens.repository.interface.ts

# Use Cases
src/application/use-cases/settings/
├── schedules/
│   ├── list-schedules.use-case.ts
│   ├── create-schedule.use-case.ts
│   └── ...
├── locations/
│   ├── list-locations.use-case.ts
│   └── ...
├── hardware/
│   └── ...
├── sensors/
│   └── ...
└── tokens/
    └── ...

# Repository Implementations
src/infrastructure/repositories/
├── schedules.repository.{type}.ts
├── locations.repository.{type}.ts
├── hardware.repository.{type}.ts
├── sensors.repository.{type}.ts
└── tokens.repository.{type}.ts

# Interface Adapters
src/interface-adapters/bff/settings/
├── schedules/
│   ├── list-schedules/
│   │   ├── controller.ts
│   │   ├── presenter.ts
│   │   └── contract.ts
│   └── create-schedule/
│       └── ...
└── ...

# API Routes
app/api/settings/
├── schedules/
│   ├── route.ts
│   └── [id]/route.ts
├── locations/
│   ├── route.ts
│   └── [id]/route.ts
├── hardware/
│   ├── route.ts
│   └── [id]/route.ts
├── sensors/
│   ├── route.ts
│   └── [id]/route.ts
├── mqtt/
│   └── route.ts
├── email/
│   └── route.ts
└── tokens/
    ├── route.ts
    └── [id]/route.ts

# Pages
app/(dashboard)/settings/
├── page.tsx                       # Settings overview
├── schedule/
│   ├── page.tsx                   # Schedule list
│   └── create/
│       └── page.tsx
├── alarm/
│   └── page.tsx                   # Alarm settings
├── devices/
│   └── page.tsx                   # Device settings
├── locations/
│   ├── page.tsx                   # Location list
│   └── create/
│       └── page.tsx
├── hardware/
│   ├── page.tsx                   # Hardware list
│   └── create/
│       └── page.tsx
├── sensors/
│   ├── page.tsx                   # Sensor list
│   └── create/
│       └── page.tsx
├── mqtt/
│   └── page.tsx                   # MQTT settings
├── email/
│   └── page.tsx                   # Email settings
└── tokens/
    ├── page.tsx                   # Token list
    └── create/
        └── page.tsx

# DI Module
di/modules/settings.module.ts
```

---

## IoT Module

### Angular Structure

```
features/iot/
├── domain/
│   ├── entities/
│   │   ├── device.entity.ts
│   │   ├── gps-data.entity.ts
│   │   ├── sensor-data.entity.ts
│   │   ├── device-group.entity.ts
│   │   └── device-config.entity.ts
│   ├── repositories/
│   │   └── iot.repository.ts
│   └── use-cases/
│       ├── list-devices.use-case.ts
│       ├── register-device.use-case.ts
│       ├── get-device-location.use-case.ts
│       ├── get-sensor-data.use-case.ts
│       └── get-device-config.use-case.ts
│
├── data/
│   ├── datasources/
│   │   └── iot.api.datasource.ts
│   ├── dtos/
│   │   ├── device-response.dto.ts
│   │   └── sensor-data-response.dto.ts
│   ├── mappers/
│   │   └── iot.mapper.ts
│   └── repositories/
│       └── iot.repository.impl.ts
│
└── presentation/
    ├── pages/
    │   ├── device-list/
    │   ├── device-detail/
    │   ├── device-settings/
    │   └── sensor-data/
    └── components/
        ├── device-card/
        ├── sensor-chart/
        └── gps-map/
```

### React/Next.js Structure

```
# Entities
src/entities/models/
├── device.ts
├── gps-data.ts
├── sensor-data.ts
├── device-group.ts
└── device-config.ts

# Repository Interface
src/application/repositories/
└── iot.repository.interface.ts

# Use Cases
src/application/use-cases/iot/
├── list-devices.use-case.ts
├── register-device.use-case.ts
├── get-device-location.use-case.ts
├── get-sensor-data.use-case.ts
└── get-device-config.use-case.ts

# Repository Implementation
src/infrastructure/repositories/
└── iot.repository.{type}.ts

# Interface Adapters
src/interface-adapters/bff/iot/
├── list-devices/
│   ├── controller.ts
│   ├── presenter.ts
│   └── contract.ts
└── ...

# API Routes
app/api/iot/
├── devices/
│   ├── route.ts
│   └── [id]/
│       ├── route.ts
│       ├── location/route.ts
│       ├── sensor-data/route.ts
│       └── config/route.ts

# Pages
app/(dashboard)/iot/
├── page.tsx                       # Device list
├── [id]/
│   └── page.tsx                   # Device detail
├── settings/
│   └── page.tsx                   # Device settings
└── components/
    ├── device-card.tsx
    ├── sensor-chart.tsx
    └── gps-map.tsx

# DI Module
di/modules/iot.module.ts
```

---

*Last updated: 2026-08-26 | Version: 1.0.0*
