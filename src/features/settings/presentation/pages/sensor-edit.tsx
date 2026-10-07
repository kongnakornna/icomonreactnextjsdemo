'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function SensorEditPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [unit, setUnit] = useState('');
  const [minThreshold, setMinThreshold] = useState(0);
  const [maxThreshold, setMaxThreshold] = useState(100);
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [id]);

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      router.push('/settings/sensors');
    }, 1000);
  };

  if (loading) return <div className="flex items-center justify-center h-64">กำลังโหลด...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">แก้ไขเซ็นเซอร์</h1>
        <p className="text-muted-foreground">แก้ไขข้อมูลเซ็นเซอร์</p>
      </div>

      <form className="card" onSubmit={onSave}>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">ชื่อเซ็นเซอร์</label>
              <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">ประเภท</label>
              <input type="text" className="form-control" value={type} onChange={(e) => setType(e.target.value)} />
            </div>
            <div className="col-md-6">
              <label className="form-label">หน่วย</label>
              <input type="text" className="form-control" value={unit} onChange={(e) => setUnit(e.target.value)} />
            </div>
            <div className="col-md-3">
              <label className="form-label">Min Threshold</label>
              <input type="number" className="form-control" value={minThreshold} onChange={(e) => setMinThreshold(Number(e.target.value))} />
            </div>
            <div className="col-md-3">
              <label className="form-label">Max Threshold</label>
              <input type="number" className="form-control" value={maxThreshold} onChange={(e) => setMaxThreshold(Number(e.target.value))} />
            </div>
            <div className="col-md-12">
              <label className="form-check form-switch">
                <input className="form-check-input" type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
                <span className="form-check-label">เปิดใช้งาน</span>
              </label>
            </div>
          </div>
        </div>
        <div className="card-footer d-flex gap-2">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving && <span className="spinner-border spinner-border-sm me-2" />}
            บันทึก
          </button>
          <a href="/settings/sensors" className="btn btn-ghost">ยกเลิก</a>
        </div>
      </form>
    </div>
  );
}
