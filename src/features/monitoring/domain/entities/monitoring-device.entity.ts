export interface MonitoringDevice {
  id: string;
  name: string;
  module: string;
  status: boolean;
  location: string;
}

export type DashboardModule = 'smarthome' | 'smartcity' | 'smartmonitor' | 'industry' | 'smartsolarfarm';

export interface DashboardModuleInfo {
  key: DashboardModule;
  label: string;
  description: string;
}

export const DASHBOARD_MODULES: DashboardModuleInfo[] = [
  { key: 'smarthome', label: 'Smart Home', description: 'Home automation and monitoring devices' },
  { key: 'smartcity', label: 'Smart City', description: 'City infrastructure and IoT sensors' },
  { key: 'smartmonitor', label: 'Smart Monitor', description: 'Environmental monitoring systems' },
  { key: 'industry', label: 'Industry', description: 'Industrial IoT and factory automation' },
  { key: 'smartsolarfarm', label: 'Smart Solar Farm', description: 'Solar energy monitoring and management' },
];
