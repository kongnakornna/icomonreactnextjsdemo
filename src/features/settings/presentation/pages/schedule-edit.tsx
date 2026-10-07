'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function ScheduleEditPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [name, setName] = useState('');
  const [cronExpression, setCronExpression] = useState('');
  const [event, setEvent] = useState('ON');
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => { setLoading(false); }, [id]);

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => { setSaving(false); router.push('/settings/schedule'); }, 1000);
  };

  if (loading) return <div className="flex items-center justify-center h-64">กำลังโหลด...</div>;

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold">แก้ไข Schedule</h1></div>
      <form className="card" onSubmit={onSave}>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6"><label className="form-label">ชื่อ Schedule</label><input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required /></div>
            <div className="col-md-6"><label className="form-label">Cron Expression</label><input type="text" className="form-control font-monospace" value={cronExpression} onChange={(e) => setCronExpression(e.target.value)} /></div>
            <div className="col-md-6">
              <label className="form-label">Event</label>
              <select className="form-select" value={event} onChange={(e) => setEvent(e.target.value)}>
                <option value="ON">ON</option>
                <option value="OFF">OFF</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-check form-switch mt-4"><input className="form-check-input" type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} /><span className="form-check-label">เปิดใช้งาน</span></label>
            </div>
          </div>
        </div>
        <div className="card-footer d-flex gap-2">
          <button type="submit" className="btn btn-primary" disabled={saving}>{saving && <span className="spinner-border spinner-border-sm me-2" />}บันทึก</button>
          <a href="/settings/schedule" className="btn btn-ghost">ยกเลิก</a>
        </div>
      </form>
    </div>
  );
}
