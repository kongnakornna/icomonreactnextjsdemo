'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LineCreatePage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [channelAccessToken, setChannelAccessToken] = useState('');
  const [userId, setUserId] = useState('');
  const [saving, setSaving] = useState(false);

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => { setSaving(false); router.push('/settings/line'); }, 1000);
  };

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold">เพิ่ม LINE Notification</h1><p className="text-muted-foreground">กรอกข้อมูลการตั้งค่า LINE</p></div>
      <form className="card" onSubmit={onSave}>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-12"><label className="form-label">ชื่อการตั้งค่า</label><input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required /></div>
            <div className="col-md-6"><label className="form-label">Channel Access Token</label><input type="text" className="form-control" value={channelAccessToken} onChange={(e) => setChannelAccessToken(e.target.value)} required /></div>
            <div className="col-md-6"><label className="form-label">User ID</label><input type="text" className="form-control" value={userId} onChange={(e) => setUserId(e.target.value)} required /></div>
          </div>
        </div>
        <div className="card-footer d-flex gap-2">
          <button type="submit" className="btn btn-primary" disabled={saving || !name}>{saving && <span className="spinner-border spinner-border-sm me-2" />}บันทึก</button>
          <a href="/settings/line" className="btn btn-ghost">ยกเลิก</a>
        </div>
      </form>
    </div>
  );
}
