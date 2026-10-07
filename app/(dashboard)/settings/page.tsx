import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/_components/ui/card';

const settingsGroups = [
  {
    title: 'Automation',
    items: [
      { href: '/settings/schedule', label: 'Schedule', description: 'Manage scheduled tasks' },
    ],
  },
  {
    title: 'Alerting',
    items: [
      { href: '/settings/alarm', label: 'Alarm Settings', description: 'Configure alarm rules' },
    ],
  },
  {
    title: 'Data Storage',
    items: [
      { href: '/settings/influxdb', label: 'InfluxDB', description: 'Configure InfluxDB connection' },
    ],
  },
  {
    title: 'Device Management',
    items: [
      { href: '/settings/devices', label: 'Devices', description: 'Configure IoT devices' },
      { href: '/settings/locations', label: 'Locations', description: 'Manage locations' },
      { href: '/settings/hardware', label: 'Hardware', description: 'Manage hardware inventory' },
      { href: '/settings/sensors', label: 'Sensors', description: 'Configure sensors' },
    ],
  },
  {
    title: 'Connectivity',
    items: [
      { href: '/settings/nodered', label: 'Node-RED', description: 'Configure Node-RED' },
      { href: '/settings/mqtt', label: 'MQTT', description: 'Configure MQTT broker' },
    ],
  },
  {
    title: 'Notifications',
    items: [
      { href: '/settings/email', label: 'Email', description: 'Configure email (SMTP)' },
      { href: '/settings/line', label: 'LINE', description: 'Configure LINE notifications' },
      { href: '/settings/sms', label: 'SMS', description: 'Configure SMS gateway' },
    ],
  },
  {
    title: 'System',
    items: [
      { href: '/settings/hosts', label: 'Hosts', description: 'Manage server hosts' },
      { href: '/settings/api', label: 'API Settings', description: 'Configure API endpoints' },
      { href: '/settings/tokens', label: 'Tokens', description: 'Manage API tokens' },
    ],
  },
];

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-muted-foreground">Manage system settings</p>
      </div>

      {settingsGroups.map((group) => (
        <div key={group.title}>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{group.title}</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {group.items.map((item) => (
              <Link key={item.href} href={item.href}>
                <Card className="hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors">
                  <CardHeader>
                    <CardTitle>{item.label}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
