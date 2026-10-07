'use client';

import { useEffect, useState } from 'react';

interface Sensor {
  id: string;
  name: string;
  type: string;
  unit: string;
  minThreshold: number;
  maxThreshold: number;
  isActive: boolean;
}

export default function SensorListPage() {
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">ตั้งค่าเซ็นเซอร์</h1>
          <p className="text-muted-foreground">กำหนดค่าประเภทและ阈値ของเซ็นเซอร์</p>
        </div>
        <a href="/settings/sensors/create" className="btn btn-primary">
          เพิ่มเซ็นเซอร์
        </a>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="input-group input-group-flat" style={{ maxWidth: 300 }}>
            <input type="text" className="form-control" placeholder="ค้นหาเซ็นเซอร์..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>
        <div className="card-body">
          <table className="table table-vcenter">
            <thead>
              <tr>
                <th>ชื่อ</th>
                <th>ประเภท</th>
                <th>หน่วย</th>
                <th>Min</th>
                <th>Max</th>
                <th>สถานะ</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {sensors.length === 0 ? (
                <tr><td colSpan={7} className="text-center text-muted py-4">ไม่มีข้อมูลเซ็นเซอร์</td></tr>
              ) : (
                sensors.map((s) => (
                  <tr key={s.id}>
                    <td className="fw-bold">{s.name}</td>
                    <td>{s.type}</td>
                    <td>{s.unit}</td>
                    <td>{s.minThreshold}</td>
                    <td>{s.maxThreshold}</td>
                    <td>
                      <span className={`badge ${s.isActive ? 'bg-green-lt' : 'bg-gray-lt'}`}>
                        {s.isActive ? 'ใช้งาน' : 'ปิด'}
                      </span>
                    </td>
                    <td><a href={`/settings/sensors/${s.id}/edit`} className="btn btn-ghost btn-sm">แก้ไข</a></td>
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
