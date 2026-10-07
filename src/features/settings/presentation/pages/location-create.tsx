'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LocationCreatePage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [type, setType] = useState('office');
  const [saving, setSaving] = useState(false);

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => { setSaving(false); router.push('/settings/locations'); }, 1000);
  };

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold">สร้าง Location ใหม่</h1></div>
      <form className="card" onSubmit={onSave}>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6"><label className="form-label">ชื่อ Location</label><input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required /></div>
            <div className="col-md-6"><label className="form-label">ประเภท</label><select className="form-select" value={type} onChange={(e) => setType(e.target.value)}><option value="office">Office</option><option value="warehouse">Warehouse</option><option value="factory">Factory</option><option value="site">Site</option></select></div>
            <div className="col-md-12"><label className="form-label">ที่อยู่</label><textarea className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} rows={3} /></div>
          </div>
        </div>
        <div className="card-footer d-flex gap-2">
          <button type="submit" className="btn btn-primary" disabled={saving || !name}>{saving && <span className="spinner-border spinner-border-sm me-2" />}บันทึก</button>
          <a href="/settings/locations" className="btn btn-ghost">ยกเลิก</a>
        </div>
      </form>
    </div>
  );
}
