'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function ScheduleDataPage() {
  const params = useParams();
  const id = params.id as string;
  const [loading, setLoading] = useState(true);

  useEffect(() => { setLoading(false); }, [id]);

  if (loading) return <div className="flex items-center justify-center h-64">กำลังโหลด...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold">ข้อมูล Schedule</h1><p className="text-muted-foreground">Schedule Device Data</p></div>
        <a href="/settings/schedule" className="btn btn-ghost">กลับ</a>
      </div>
      <div className="card"><div className="card-body"><p className="text-muted">ไม่มีข้อมูล</p></div></div>
    </div>
  );
}
