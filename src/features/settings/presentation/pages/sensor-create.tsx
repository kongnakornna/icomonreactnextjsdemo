'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SensorCreatePage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [unit, setUnit] = useState('');
  const [minThreshold, setMinThreshold] = useState(0);
  const [maxThreshold, setMaxThreshold] = useState(100);
  const [saving, setSaving] = useState(false);

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      router.push('/settings/sensors');
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">เพิ่มเซ็นเซอร์ใหม่</h1>
        <p className="text-muted-foreground">กรอกข้อมูลเซ็นเซอร์เพื่อสร้างรายการใหม่</p>
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
              <input type="text" className="form-control" value={type} onChange={(e) => setType(e.target.value)} placeholder="เช่น Temperature, Humidity" />
            </div>
            <div className="col-md-6">
              <label className="form-label">หน่วย</label>
              <input type="text" className="form-control" value={unit} onChange={(e) => setUnit(e.target.value)} placeholder="เช่น °C, %, ppm" />
            </div>
            <div className="col-md-3">
              <label className="form-label">Min Threshold</label>
              <input type="number" className="form-control" value={minThreshold} onChange={(e) => setMinThreshold(Number(e.target.value))} />
            </div>
            <div className="col-md-3">
              <label className="form-label">Max Threshold</label>
              <input type="number" className="form-control" value={maxThreshold} onChange={(e) => setMaxThreshold(Number(e.target.value))} />
            </div>
          </div>
        </div>
        <div className="card-footer d-flex gap-2">
          <button type="submit" className="btn btn-primary" disabled={saving || !name}>
            {saving && <span className="spinner-border spinner-border-sm me-2" />}
            บันทึก
          </button>
          <a href="/settings/sensors" className="btn btn-ghost">ยกเลิก</a>
        </div>
      </form>
    </div>
  );
}
