# Module Map - แผนที่ Modules ทั้ง 25

## สารบัญ

1. [Overview](#overview)
2. [Core Modules](#core-modules)
3. [Feature Modules](#feature-modules)
4. [Module Status](#module-status)

---

## Overview

This document maps all 25 feature modules from `icmonangular` to the React/Next.js project.

---

## Core Modules

| Module | Location | Purpose |
|--------|----------|---------|
| config | `src/core/config/` | App config, menu, route permissions |
| constants | `src/core/constants/` | App constants, enums |
| contracts | `src/core/contracts/` | Abstract Mapper, Usecase interfaces |
| services | `src/core/services/` | Permission, logger, layout services |
| types | `src/core/types/` | Shared type definitions |
| utils | `src/core/utils/` | Formatters, helpers, validators |
| di | `di/` | Dependency injection container + modules |

---

## Feature Modules

### 1. auth
- **Route**: `/sign-in`, `/sign-up`, `/forgot-password`, `/lock-screen`
- **Entities**: User, Role, Permission, LoginCredentials, AuthResponse
- **Use Cases**: login, logout, sign-in, sign-up, forgot-password, reset-password, list-roles, create-role, update-role, delete-role, list-users, create-user, update-user, delete-user
- **Repository**: IAuthRepository
- **Status**: Partially exists (sign-in, sign-up)

### 2. dashboard
- **Route**: `/dashboard`
- **Entities**: DashboardStats, RevenueData, JobStatusSummary, TopPartData, Report
- **Use Cases**: get-stats, get-revenue-chart, get-job-status, get-top-parts, get-reports, generate-report
- **Repository**: IDashboardRepository
- **Status**: New

### 3. customer
- **Route**: `/customers`, `/customers/create`, `/customers/[id]`
- **Entities**: Customer, CustomerContact
- **Use Cases**: list-customers, create-customer, get-customer, update-customer, delete-customer, search-customers
- **Repository**: ICustomersRepository
- **Status**: New

### 4. quotation
- **Route**: `/quotations`, `/quotations/create`
- **Entities**: Quotation, QuotationItem
- **Use Cases**: list-quotations, create-quotation, get-quotation, update-quotation, delete-quotation
- **Repository**: IQuotationsRepository
- **Status**: New

### 5. purchase-order
- **Route**: `/purchase-orders`, `/purchase-orders/create`
- **Entities**: PurchaseOrder, PurchaseOrderItem
- **Use Cases**: list-purchase-orders, create-purchase-order, get-purchase-order, update-purchase-order, delete-purchase-order
- **Repository**: IPurchaseOrdersRepository
- **Status**: New

### 6. inventory
- **Route**: `/products`, `/products/create`
- **Entities**: Product, ProductCategory
- **Use Cases**: list-products, create-product, get-product, update-product, delete-product
- **Repository**: IProductsRepository
- **Status**: New

### 7. payment
- **Route**: `/payments`
- **Entities**: Payment, Invoice
- **Use Cases**: list-payments, create-payment, get-payment, get-invoice
- **Repository**: IPaymentsRepository
- **Status**: New

### 8. document
- **Route**: `/documents`
- **Entities**: Document
- **Use Cases**: list-documents, upload-document, get-document, delete-document
- **Repository**: IDocumentsRepository
- **Status**: New

### 9. email
- **Route**: `/email/templates`, `/email/compose`, `/email/logs`
- **Entities**: EmailTemplate, EmailLog
- **Use Cases**: list-templates, create-template, send-email, get-email-logs
- **Repository**: IEmailsRepository
- **Status**: New

### 10. batch
- **Route**: `/batch/jobs`
- **Entities**: BatchJob
- **Use Cases**: list-batch-jobs, create-batch-job, get-batch-job, cancel-batch-job
- **Repository**: IBatchJobsRepository
- **Status**: New

### 11. job-card
- **Route**: `/jobs`
- **Entities**: JobCard, JobCardItem
- **Use Cases**: list-job-cards, create-job-card, get-job-card, update-job-card, delete-job-card
- **Repository**: IJobCardsRepository
- **Status**: New

### 12. user
- **Route**: `/user/listdata`, `/user/create`, `/user/[id]`, `/user/roles`
- **Entities**: User, UserRole
- **Use Cases**: list-users, create-user, get-user, update-user, delete-user, list-roles, assign-role
- **Repository**: IUsersRepository
- **Status**: New

### 13. wos (Work Order System)
- **Route**: `/wos/orders`
- **Entities**: WebOrder, OrderItem
- **Use Cases**: list-orders, create-order, get-order, update-order-status, cancel-order
- **Repository**: IWebOrdersRepository
- **Status**: New

### 14. orders
- **Route**: (data/domain only)
- **Entities**: Order
- **Repository**: IOrdersRepository
- **Status**: Data/Domain only

### 15. iot
- **Route**: `/iot/devices`, `/iot/settings`, `/iot/reports`
- **Entities**: Device, GPSData, SensorData, DeviceGroup, DeviceConfig, etc.
- **Use Cases**: list-devices, register-device, get-device-location, get-sensor-data, get-device-config, update-device-config
- **Repository**: IIoTRepository
- **Status**: New

### 16. mqtt
- **Route**: `/mqtt/dashboard`, `/mqtt/flows`
- **Entities**: MqttMessage, MqttFlow
- **Use Cases**: get-mqtt-status, publish-message, subscribe-topic, get-flows
- **Repository**: IMqttRepository
- **Status**: New

### 17. monitoring
- **Route**: `/monitoring/smarthome`, `/monitoring/smartcity`, `/monitoring/smartmonitor`, `/monitoring/industry`, `/monitoring/smartsolarfarm`
- **Entities**: MonitoringDevice
- **Use Cases**: list-devices-by-module
- **Repository**: IMonitoringDeviceRepository
- **Status**: New

### 18. settings
- **Route**: `/settings/schedule`, `/settings/alarm`, `/settings/influxdb`, `/settings/devices`, `/settings/locations`, `/settings/hardware`, `/settings/sensors`, `/settings/nodered`, `/settings/mqtt`, `/settings/email`, `/settings/line`, `/settings/sms`, `/settings/hosts`, `/settings/api`, `/settings/api-health`, `/settings/tokens`
- **Entities**: Schedule, AlarmConfig, InfluxConfig, DeviceConfig, Location, Hardware, Sensor, NodeRed, MqttConfig, EmailConfig, LineConfig, SmsConfig, Host, ApiSetting, Token
- **Repositories**: IScheduleRepository, ILocationRepository, IHardwareRepository, ISensorRepository, INodeRedRepository, ILineNotificationRepository, ISmsNotificationRepository, IHostRepository, IApiSettingRepository, ITokenRepository
- **Status**: New

### 19. report
- **Route**: `/reports/schedule`, `/reports/alarm`, `/reports/logs-control`, `/reports/device`
- **Entities**: Report
- **Use Cases**: list-reports, generate-report
- **Repository**: IReportsRepository
- **Status**: New

### 20. ai-analytics
- **Route**: `/ai-analytics/command-center`, `/ai-analytics/dashboard`, `/ai-analytics/reports`, `/ai-analytics/logs`, `/ai-analytics/workflow`, `/ai-analytics/schedule`, `/ai-analytics/alerts`, `/ai-analytics/analyst`
- **Entities**: AIReport, AIWorkflow, AIAlert
- **Repository**: IAIAnalyticsRepository
- **Status**: New

### 21. ai-chatbot
- **Route**: `/ai-chatbot`
- **Entities**: ChatMessage, ChatSession
- **Repository**: IChatbotRepository
- **Status**: New

### 22. alarm
- **Route**: (data/domain only)
- **Entities**: Alarm
- **Repository**: IAlarmsRepository
- **Status**: Data/Domain only

### 23. system
- **Route**: (data/domain only)
- **Entities**: SystemConfig
- **Repository**: ISystemRepository
- **Status**: Data/Domain only

### 24. websocket
- **Route**: (data/domain only)
- **Entities**: WebSocketMessage
- **Repository**: IWebSocketRepository
- **Status**: Data/Domain only

### 25. pages
- **Route**: (legacy/demo)
- **Status**: Legacy demo pages

---

## Module Status

| Status | Description |
|--------|-------------|
| ✅ Existing | Already implemented |
| 🆕 New | To be created |
| 🔧 Partial | Partially implemented |
| 📦 Data/Domain | Data + Domain layers only (no presentation) |

| Module | Status |
|--------|--------|
| auth | 🔧 Partial (sign-in, sign-up exist) |
| dashboard | 🆕 New |
| customer | 🆕 New |
| quotation | 🆕 New |
| purchase-order | 🆕 New |
| inventory | 🆕 New |
| payment | 🆕 New |
| document | 🆕 New |
| email | 🆕 New |
| batch | 🆕 New |
| job-card | 🆕 New |
| user | 🆕 New |
| wos | 🆕 New |
| orders | 📦 Data/Domain |
| iot | 🆕 New |
| mqtt | 🆕 New |
| monitoring | 🆕 New |
| settings | 🆕 New |
| report | 🆕 New |
| ai-analytics | 🆕 New |
| ai-chatbot | 🆕 New |
| alarm | 📦 Data/Domain |
| system | 📦 Data/Domain |
| websocket | 📦 Data/Domain |
| pages | 🆕 New (legacy) |

---

*Last updated: 2026-08-26*
