'use client';

import { useEffect, useState } from 'react';

interface Device {
  id: string;
  name: string;
  status: string;
  latitude?: number;
  longitude?: number;
}

export default function DeviceMapPage() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { setLoading(false); }, []);

  if (loading) return <div className="flex items-center justify-center h-64">กำลังโหลด...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">แผนที่อุปกรณ์</h1>
        <p className="text-muted-foreground">แสดงตำแหน่งอุปกรณ์ IoT ทั้งหมด</p>
      </div>
      <div className="card">
        <div className="card-body" style={{ minHeight: 500 }}>
          <div className="d-flex align-items-center justify-content-center h-100">
            <div className="text-center text-muted">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon mb-2"><path d="M9 20l-5.447 -2.724a1 1 0 0 1 -.553 -.894v-6.552a1 1 0 0 1 .553 -.894l4.887 -2.443a1 1 0 0 1 .894 0l4.887 2.443a1 1 0 0 1 .553 .894v6.552a1 1 0 0 1 -.553 .894l-4.887 2.443a1 1 0 0 1 -.894 0z" /><path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M12 2l0 3" /><path d="M18.36 6.64l-1.06 1.06" /><path d="M21 12h-3" /><path d="M18.36 17.36l-1.06 -1.06" /><path d="M12 17l0 3" /><path d="M5.64 17.36l1.06 -1.06" /><path d="M3 12h3" /><path d="M5.64 6.64l1.06 1.06" /></svg>
              <p>แผนที่จะแสดงตำแหน่งอุปกรณ์ IoT<br />เมื่อมีการเชื่อมต่อ Google Maps หรือ OpenStreetMap API</p>
              <p className="mt-2"><strong>{devices.length}</strong> อุปกรณ์ทั้งหมด</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
