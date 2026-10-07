'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function HardwareEditPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [model, setModel] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => { setLoading(false); }, [id]);

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => { setSaving(false); router.push('/settings/hardware'); }, 1000);
  };

  if (loading) return <div className="flex items-center justify-center h-64">กำลังโหลด...</div>;

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold">แก้ไข Hardware</h1></div>
      <form className="card" onSubmit={onSave}>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6"><label className="form-label">ชื่อ</label><input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required /></div>
            <div className="col-md-6"><label className="form-label">ประเภท</label><input type="text" className="form-control" value={type} onChange={(e) => setType(e.target.value)} /></div>
            <div className="col-md-6"><label className="form-label">Model</label><input type="text" className="form-control" value={model} onChange={(e) => setModel(e.target.value)} /></div>
            <div className="col-md-6"><label className="form-label">ราคา</label><input type="number" className="form-control" value={price} onChange={(e) => setPrice(Number(e.target.value))} /></div>
            <div className="col-md-12"><label className="form-label">รายละเอียด</label><textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} /></div>
          </div>
        </div>
        <div className="card-footer d-flex gap-2">
          <button type="submit" className="btn btn-primary" disabled={saving}>{saving && <span className="spinner-border spinner-border-sm me-2" />}บันทึก</button>
          <a href="/settings/hardware" className="btn btn-ghost">ยกเลิก</a>
        </div>
      </form>
    </div>
  );
}
