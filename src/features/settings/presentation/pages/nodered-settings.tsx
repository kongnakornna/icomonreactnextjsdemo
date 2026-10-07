'use client';

import { useState } from 'react';

interface NodeRedConfig {
  id: string;
  name: string;
  url: string;
  adminUrl: string;
  status: 'connected' | 'disconnected';
}

export default function NodeRedSettingsPage() {
  const [configs, setConfigs] = useState<NodeRedConfig[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [url, setUrl] = useState('http://localhost:1880');
  const [adminUrl, setAdminUrl] = useState('http://localhost:1880');
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);

  const onTest = async () => {
    setTesting(true);
    setTimeout(() => setTesting(false), 2000);
  };

  const onSave = async () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setName('');
      setUrl('http://localhost:1880');
      setAdminUrl('http://localhost:1880');
      setEditingId(null);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">ตั้งค่า Node-RED</h1>
        <p className="text-muted-foreground">กำหนดค่าการเชื่อมต่อ Node-RED Flow Integration</p>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">การเชื่อมต่อ</h3>
          <div className="card-actions">
            <button className="btn btn-primary btn-sm" onClick={() => { setEditingId(null); setName(''); setUrl('http://localhost:1880'); setAdminUrl('http://localhost:1880'); }}>
              เพิ่มการตั้งค่า
            </button>
          </div>
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">ชื่อ</label>
              <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="ชื่อการตั้งค่า" />
            </div>
            <div className="col-md-4">
              <label className="form-label">URL</label>
              <input type="text" className="form-control" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="http://localhost:1880" />
            </div>
            <div className="col-md-4">
              <label className="form-label">Admin URL</label>
              <input type="text" className="form-control" value={adminUrl} onChange={(e) => setAdminUrl(e.target.value)} placeholder="http://localhost:1880" />
            </div>
          </div>
          <div className="d-flex gap-2 mt-3">
            <button className="btn btn-outline-primary btn-sm" onClick={onTest} disabled={testing}>
              {testing && <span className="spinner-border spinner-border-sm me-2" />}
              ทดสอบการเชื่อมต่อ
            </button>
            <button className="btn btn-primary btn-sm" onClick={onSave} disabled={saving || !name}>
              {saving && <span className="spinner-border spinner-border-sm me-2" />}
              บันทึก
            </button>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <table className="table table-vcenter">
            <thead>
              <tr>
                <th>ชื่อ</th>
                <th>URL</th>
                <th>สถานะ</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {configs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center text-muted py-4">
                    ไม่มีการตั้งค่า Node-RED
                  </td>
                </tr>
              ) : (
                configs.map((c) => (
                  <tr key={c.id}>
                    <td>{c.name}</td>
                    <td><code>{c.url}</code></td>
                    <td>
                      <span className={`badge ${c.status === 'connected' ? 'bg-green-lt' : 'bg-red-lt'}`}>
                        {c.status === 'connected' ? 'เชื่อมต่อแล้ว' : 'ไม่เชื่อมต่อ'}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-ghost btn-sm" onClick={() => { setEditingId(c.id); setName(c.name); setUrl(c.url); setAdminUrl(c.adminUrl); }}>
                        แก้ไข
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
