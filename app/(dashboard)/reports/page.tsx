import Link from 'next/link';

export default function ReportsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Reports</h1>
      <ul className="space-y-3">
        <li>
          <Link href="/reports/schedule" className="text-blue-600 hover:underline">
            Schedule Reports
          </Link>
        </li>
        <li>
          <Link href="/reports/alarm" className="text-blue-600 hover:underline">
            Alarm Reports
          </Link>
        </li>
        <li>
          <Link href="/reports/logs-control" className="text-blue-600 hover:underline">
            Logs Control Reports
          </Link>
        </li>
        <li>
          <Link href="/reports/device" className="text-blue-600 hover:underline">
            Device Reports
          </Link>
        </li>
      </ul>
    </div>
  );
}
