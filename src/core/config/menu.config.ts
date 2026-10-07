export interface MenuItem {
  id: string;
  label: string;
  icon?: string;
  href?: string;
  permission?: string;
  children?: MenuItem[];
}

export const MENU_CONFIG: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'LayoutDashboard',
    href: '/dashboard',
    permission: 'dashboard.view',
  },
  {
    id: 'customers',
    label: 'Customers',
    icon: 'Users',
    href: '/customers',
    permission: 'customer.view',
  },
  {
    id: 'quotations',
    label: 'Quotations',
    icon: 'FileText',
    href: '/quotations',
    permission: 'quotation.view',
  },
  {
    id: 'purchase-orders',
    label: 'Purchase Orders',
    icon: 'ShoppingCart',
    href: '/purchase-orders',
    permission: 'purchase_order.view',
  },
  {
    id: 'inventory',
    label: 'Products',
    icon: 'Package',
    href: '/products',
    permission: 'inventory.view',
  },
  {
    id: 'payments',
    label: 'Payments',
    icon: 'CreditCard',
    href: '/payments',
    permission: 'payment.view',
  },
  {
    id: 'documents',
    label: 'Documents',
    icon: 'Folder',
    href: '/documents',
    permission: 'document.view',
  },
  {
    id: 'email',
    label: 'Email',
    icon: 'Mail',
    href: '/email/templates',
    permission: 'email.view',
  },
  {
    id: 'batch',
    label: 'Batch Jobs',
    icon: 'Layers',
    href: '/batch/jobs',
    permission: 'batch.view',
  },
  {
    id: 'iot',
    label: 'IoT',
    icon: 'Cpu',
    permission: 'iot.view',
    children: [
      { id: 'iot-devices', label: 'Devices', icon: 'Monitor', href: '/iot/devices', permission: 'iot.view' },
      { id: 'iot-map', label: 'Device Map', icon: 'Map', href: '/iot/map', permission: 'iot.view' },
      { id: 'iot-settings', label: 'IoT Settings', icon: 'Settings', href: '/iot/settings', permission: 'iot.view' },
      { id: 'iot-reports', label: 'IoT Reports', icon: 'BarChart', href: '/iot/reports', permission: 'iot.view' },
      { id: 'iot-mqtt-dash', label: 'MQTT Dashboard', icon: 'Radio', href: '/mqtt/dashboard', permission: 'iot.view' },
      { id: 'iot-mqtt-flows', label: 'MQTT Flows', icon: 'Workflow', href: '/mqtt/flows', permission: 'iot.view' },
    ],
  },
  {
    id: 'wos',
    label: 'Work Orders',
    icon: 'ClipboardList',
    href: '/wos/orders',
    permission: 'wos.view',
  },
  {
    id: 'jobs',
    label: 'Job Cards',
    icon: 'Briefcase',
    href: '/jobs',
    permission: 'job_card.view',
  },
  {
    id: 'monitoring',
    label: 'Monitoring',
    icon: 'Eye',
    permission: 'monitoring.view',
    children: [
      { id: 'mon-smarthome', label: 'SmartHome', icon: 'Home', href: '/monitoring/smarthome', permission: 'monitoring.view' },
      { id: 'mon-smartcity', label: 'SmartCity', icon: 'Building2', href: '/monitoring/smartcity', permission: 'monitoring.view' },
      { id: 'mon-smartmonitor', label: 'SmartMonitor', icon: 'Activity', href: '/monitoring/smartmonitor', permission: 'monitoring.view' },
      { id: 'mon-industry', label: 'Industry', icon: 'Factory', href: '/monitoring/industry', permission: 'monitoring.view' },
      { id: 'mon-solar', label: 'SmartSolarFarm', icon: 'Sun', href: '/monitoring/smartsolarfarm', permission: 'monitoring.view' },
    ],
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: 'BarChart3',
    permission: 'report.view',
    children: [
      { id: 'rpt-schedule', label: 'Schedule', href: '/reports/schedule', permission: 'report.view' },
      { id: 'rpt-alarm', label: 'Alarm', href: '/reports/alarm', permission: 'report.view' },
      { id: 'rpt-logs', label: 'Logs Control', href: '/reports/logs-control', permission: 'report.view' },
      { id: 'rpt-device', label: 'Device', href: '/reports/device', permission: 'report.view' },
    ],
  },
  {
    id: 'ai',
    label: 'AI Analytics',
    icon: 'Bot',
    permission: 'ai_analytics.view',
    children: [
      { id: 'ai-dashboard', label: 'Dashboard', href: '/ai-analytics', permission: 'ai_analytics.view' },
      { id: 'ai-chatbot', label: 'Chatbot', href: '/ai-chatbot', permission: 'ai_analytics.view' },
    ],
  },
  {
    id: 'users',
    label: 'Users',
    icon: 'UserCog',
    permission: 'user.view',
    children: [
      { id: 'user-list', label: 'User List', href: '/user/listdata', permission: 'user.view' },
      { id: 'user-roles', label: 'Roles', href: '/user/roles', permission: 'role.view' },
    ],
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: 'Settings',
    permission: 'settings.view',
    children: [
      { id: 'set-schedule', label: 'Schedule', href: '/settings/schedule', permission: 'settings.view' },
      { id: 'set-alarm', label: 'Alarm', href: '/settings/alarm', permission: 'settings.view' },
      { id: 'set-influxdb', label: 'InfluxDB', href: '/settings/influxdb', permission: 'settings.view' },
      { id: 'set-devices', label: 'Devices', href: '/settings/devices', permission: 'settings.view' },
      { id: 'set-locations', label: 'Locations', href: '/settings/locations', permission: 'settings.view' },
      { id: 'set-hardware', label: 'Hardware', href: '/settings/hardware', permission: 'settings.view' },
      { id: 'set-sensors', label: 'Sensors', href: '/settings/sensors', permission: 'settings.view' },
      { id: 'set-nodered', label: 'Node-RED', href: '/settings/nodered', permission: 'settings.view' },
      { id: 'set-mqtt', label: 'MQTT', href: '/settings/mqtt', permission: 'settings.view' },
      { id: 'set-email', label: 'Email', href: '/settings/email', permission: 'settings.view' },
      { id: 'set-line', label: 'LINE', href: '/settings/line', permission: 'settings.view' },
      { id: 'set-sms', label: 'SMS', href: '/settings/sms', permission: 'settings.view' },
      { id: 'set-hosts', label: 'Hosts', href: '/settings/hosts', permission: 'settings.view' },
      { id: 'set-api', label: 'API', href: '/settings/api', permission: 'settings.view' },
      { id: 'set-tokens', label: 'Tokens', href: '/settings/tokens', permission: 'settings.view' },
    ],
  },
];
