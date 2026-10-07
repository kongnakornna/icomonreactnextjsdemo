'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HostCreatePage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [ipAddress, setIpAddress] = useState('');
  const [port, setPort] = useState(22);
  const [type, setType] = useState('server');
  const [saving, setSaving] = useState(false);

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      router.push('/settings/hosts');
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">เพิ่ม Host ใหม่</h1>
        <p className="text-muted-foreground">กรอกข้อมูล Host</p>
      </div>

      <form className="card" onSubmit={onSave}>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">ชื่อ Host</label>
              <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">IP Address</label>
              <input type="text" className="form-control" value={ipAddress} onChange={(e) => setIpAddress(e.target.value)} placeholder="192.168.1.100" required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Port</label>
              <input type="number" className="form-control" value={port} onChange={(e) => setPort(Number(e.target.value))} />
            </div>
            <div className="col-md-6">
              <label className="form-label">ประเภท</label>
              <select className="form-select" value={type} onChange={(e) => setType(e.target.value)}>
                <option value="server">Server</option>
                <option value="gateway">Gateway</option>
                <option value="device">Device</option>
              </select>
            </div>
          </div>
        </div>
        <div className="card-footer d-flex gap-2">
          <button type="submit" className="btn btn-primary" disabled={saving || !name || !ipAddress}>
            {saving && <span className="spinner-border spinner-border-sm me-2" />}
            บันทึก
          </button>
          <a href="/settings/hosts" className="btn btn-ghost">ยกเลิก</a>
        </div>
      </form>
    </div>
  );
}
