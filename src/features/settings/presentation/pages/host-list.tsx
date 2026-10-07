'use client';

import { useEffect, useState } from 'react';

interface Host {
  id: string;
  name: string;
  ipAddress: string;
  port: number;
  type: string;
  isActive: boolean;
}

export default function HostListPage() {
  const [hosts, setHosts] = useState<Host[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">ตั้งค่า Host</h1>
          <p className="text-muted-foreground">จัดการการตั้งค่า Server และ Host</p>
        </div>
        <a href="/settings/hosts/create" className="btn btn-primary">
          เพิ่ม Host
        </a>
      </div>

      <div className="card">
        <div className="card-body">
          <table className="table table-vcenter">
            <thead>
              <tr>
                <th>ชื่อ</th>
                <th>IP Address</th>
                <th>Port</th>
                <th>ประเภท</th>
                <th>สถานะ</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {hosts.length === 0 ? (
                <tr><td colSpan={6} className="text-center text-muted py-4">ไม่มีข้อมูล Host</td></tr>
              ) : (
                hosts.map((h) => (
                  <tr key={h.id}>
                    <td className="fw-bold">{h.name}</td>
                    <td><code>{h.ipAddress}</code></td>
                    <td>{h.port}</td>
                    <td>{h.type}</td>
                    <td>
                      <span className={`badge ${h.isActive ? 'bg-green-lt' : 'bg-red-lt'}`}>
                        {h.isActive ? 'ใช้งาน' : 'ปิด'}
                      </span>
                    </td>
                    <td><button className="btn btn-ghost btn-sm">แก้ไข</button></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
