'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TokenCreatePage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [permissions, setPermissions] = useState('read');
  const [expiresIn, setExpiresIn] = useState('30');
  const [saving, setSaving] = useState(false);
  const [generatedToken, setGeneratedToken] = useState('');

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setGeneratedToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' + Math.random().toString(36).substring(7));
    }, 1000);
  };

  if (generatedToken) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">สร้าง Token สำเร็จ</h1>
        <div className="card">
          <div className="card-body">
            <div className="alert alert-warning mb-3">
              กรุณาคัดลอก Token นี้ไว้ จะไม่แสดงอีกครั้ง
            </div>
            <div className="input-group mb-3">
              <input type="text" className="form-control font-monospace" value={generatedToken} readOnly />
              <button className="btn btn-primary" onClick={() => navigator.clipboard.writeText(generatedToken)}>
                คัดลอก
              </button>
            </div>
            <button className="btn btn-ghost" onClick={() => router.push('/settings/tokens')}>
              กลับ
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">สร้าง Token ใหม่</h1>
        <p className="text-muted-foreground">สร้าง API Access Token ใหม่</p>
      </div>

      <form className="card" onSubmit={onSave}>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">ชื่อ Token</label>
              <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required placeholder="ชื่อ Token" />
            </div>
            <div className="col-md-3">
              <label className="form-label">สิทธิ์</label>
              <select className="form-select" value={permissions} onChange={(e) => setPermissions(e.target.value)}>
                <option value="read">Read Only</option>
                <option value="readwrite">Read & Write</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label">อายุการใช้งาน (วัน)</label>
              <select className="form-select" value={expiresIn} onChange={(e) => setExpiresIn(e.target.value)}>
                <option value="7">7 วัน</option>
                <option value="30">30 วัน</option>
                <option value="90">90 วัน</option>
                <option value="365">365 วัน</option>
                <option value="0">ไม่หมดอายุ</option>
              </select>
            </div>
          </div>
        </div>
        <div className="card-footer d-flex gap-2">
          <button type="submit" className="btn btn-primary" disabled={saving || !name}>
            {saving && <span className="spinner-border spinner-border-sm me-2" />}
            สร้าง Token
          </button>
          <a href="/settings/tokens" className="btn btn-ghost">ยกเลิก</a>
        </div>
      </form>
    </div>
  );
}
