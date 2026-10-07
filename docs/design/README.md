# Design Documents Index

## สารบัญ

1. [Overview](#overview)
2. [Design Documents](#design-documents)
3. [Migration Checklist](#migration-checklist)

---

## Overview

เอกสารการออกแบบสำหรับการย้ายโครงสร้างจาก Angular Clean Architecture ไปยัง React/Next.js Clean Architecture

---

## Design Documents

| # | Document | Description |
|---|----------|-------------|
| 1 | [Angular to React Migration Design](./angular-to-react-migration-design.md) | แผนผังภาพรวมการย้ายโครงสร้าง, Layer Mapping, Feature Modules |
| 2 | [Module Structure Detail](./module-structure-detail.md) | โครงสร้าง Modules แบบละเอียด (Core, Auth, Dashboard, Customer, WOS, Settings, IoT) |
| 3 | [Theme Migration Guide](./theme-migration-guide.md) | การย้ายระบบ Theme จาก Angular ไป React |

---

## Migration Checklist

### Phase 1: Core Infrastructure
- [ ] Create `src/core/` structure
- [ ] Implement `config/`, `constants/`, `types/`
- [ ] Create `contracts/` interfaces
- [ ] Implement core services (theme, logger, permission)
- [ ] Set up `di/` container with ioctopus

### Phase 2: Entities & Application
- [ ] Create `src/entities/models/` with Zod schemas
- [ ] Create `src/entities/errors/` error classes
- [ ] Implement `src/application/repositories/` interfaces
- [ ] Implement `src/application/use-cases/` for each module
- [ ] Create `src/application/services/` interfaces

### Phase 3: Infrastructure
- [ ] Implement `src/infrastructure/repositories/` (SQLite + InFile)
- [ ] Implement `src/infrastructure/services/` (API clients)
- [ ] Set up Drizzle ORM schemas
- [ ] Create database migrations

### Phase 4: Interface Adapters
- [ ] Implement `src/interface-adapters/api/` REST adapters
- [ ] Implement `src/interface-adapters/bff/` Server Action adapters
- [ ] Create API routes in `app/api/`
- [ ] Set up E2E test adapters

### Phase 5: Presentation Layer
- [ ] Create layout components (`app/_components/layout/`)
- [ ] Implement feature pages (`app/(dashboard)/*/`)
- [ ] Add shadcn/ui components as needed
- [ ] Implement theme settings page

### Phase 6: Feature Modules
- [ ] auth (enhance existing)
- [ ] dashboard
- [ ] customer
- [ ] wos (Work Order System)
- [ ] job-card
- [ ] settings
- [ ] iot
- [ ] Other modules as needed

### Phase 7: Testing & Polish
- [ ] Unit tests for use cases
- [ ] Integration tests for repositories
- [ ] E2E tests for critical flows
- [ ] Performance optimization
- [ ] Documentation updates

---

*Last updated: 2026-08-26*
