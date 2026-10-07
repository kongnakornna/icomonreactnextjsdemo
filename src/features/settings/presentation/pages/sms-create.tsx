'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SmsCreatePage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [gatewayUrl, setGatewayUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [phone, setPhone] = useState('');
  const [saving, setSaving] = useState(false);

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => { setSaving(false); router.push('/settings/sms'); }, 1000);
  };

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold">เพิ่ม SMS Notification</h1><p className="text-muted-foreground">กรอกข้อมูลการตั้งค่า SMS</p></div>
      <form className="card" onSubmit={onSave}>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6"><label className="form-label">ชื่อการตั้งค่า</label><input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required /></div>
            <div className="col-md-6"><label className="form-label">Gateway URL</label><input type="text" className="form-control" value={gatewayUrl} onChange={(e) => setGatewayUrl(e.target.value)} placeholder="https://api.sms-gateway.com/send" required /></div>
            <div className="col-md-6"><label className="form-label">API Key</label><input type="text" className="form-control" value={apiKey} onChange={(e) => setApiKey(e.target.value)} required /></div>
            <div className="col-md-6"><label className="form-label">เบอร์โทรศัพท์</label><input type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="0812345678" required /></div>
          </div>
        </div>
        <div className="card-footer d-flex gap-2">
          <button type="submit" className="btn btn-primary" disabled={saving || !name}>{saving && <span className="spinner-border spinner-border-sm me-2" />}บันทึก</button>
          <a href="/settings/sms" className="btn btn-ghost">ยกเลิก</a>
        </div>
      </form>
    </div>
  );
}
