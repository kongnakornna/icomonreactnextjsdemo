'use client';

import { useEffect, useState } from 'react';

interface SmsConfig {
  id: string;
  name: string;
  gatewayUrl: string;
  apiKey: string;
  phone: string;
  isActive: boolean;
}

export default function SmsListPage() {
  const [configs, setConfigs] = useState<SmsConfig[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { setLoading(false); }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">SMS Notification</h1>
          <p className="text-muted-foreground">กำหนดค่าการแจ้งเตือนผ่าน SMS</p>
        </div>
        <a href="/settings/sms/create" className="btn btn-primary">เพิ่มการตั้งค่า</a>
      </div>
      <div className="card">
        <div className="card-body">
          <table className="table table-vcenter">
            <thead><tr><th>ชื่อ</th><th>Gateway URL</th><th>เบอร์โทร</th><th>สถานะ</th><th></th></tr></thead>
            <tbody>
              {configs.length === 0 ? (
                <tr><td colSpan={5} className="text-center text-muted py-4">ไม่มีการตั้งค่า SMS</td></tr>
              ) : configs.map((c) => (
                <tr key={c.id}>
                  <td className="fw-bold">{c.name}</td>
                  <td><code>{c.gatewayUrl}</code></td>
                  <td>{c.phone}</td>
                  <td><span className={`badge ${c.isActive ? 'bg-green-lt' : 'bg-red-lt'}`}>{c.isActive ? 'ใช้งาน' : 'ปิด'}</span></td>
                  <td><button className="btn btn-ghost btn-sm">แก้ไข</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
