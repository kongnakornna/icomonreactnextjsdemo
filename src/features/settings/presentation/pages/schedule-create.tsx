'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ScheduleCreatePage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [cronExpression, setCronExpression] = useState('');
  const [event, setEvent] = useState('ON');
  const [daysOfWeek, setDaysOfWeek] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const toggleDay = (day: string) => {
    setDaysOfWeek((prev) => prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]);
  };

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => { setSaving(false); router.push('/settings/schedule'); }, 1000);
  };

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold">สร้าง Schedule ใหม่</h1><p className="text-muted-foreground">กำหนดค่า Schedule สำหรับอุปกรณ์</p></div>
      <form className="card" onSubmit={onSave}>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6"><label className="form-label">ชื่อ Schedule</label><input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required /></div>
            <div className="col-md-6"><label className="form-label">Cron Expression</label><input type="text" className="form-control font-monospace" value={cronExpression} onChange={(e) => setCronExpression(e.target.value)} placeholder="0 8 * * 1-5" /></div>
            <div className="col-md-6">
              <label className="form-label">Event</label>
              <select className="form-select" value={event} onChange={(e) => setEvent(e.target.value)}>
                <option value="ON">ON</option>
                <option value="OFF">OFF</option>
              </select>
            </div>
            <div className="col-md-12">
              <label className="form-label">วันในสัปดาห์</label>
              <div className="d-flex gap-2">
                {days.map((day) => (
                  <label key={day} className="form-check">
                    <input type="checkbox" className="form-check-input" checked={daysOfWeek.includes(day)} onChange={() => toggleDay(day)} />
                    <span className="form-check-label">{day}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer d-flex gap-2">
          <button type="submit" className="btn btn-primary" disabled={saving || !name}>{saving && <span className="spinner-border spinner-border-sm me-2" />}บันทึก</button>
          <a href="/settings/schedule" className="btn btn-ghost">ยกเลิก</a>
        </div>
      </form>
    </div>
  );
}
