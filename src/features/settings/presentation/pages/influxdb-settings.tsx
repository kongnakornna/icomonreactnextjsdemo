'use client';

import { useState } from 'react';

export default function InfluxDBSettingsPage() {
  const [url, setUrl] = useState('http://localhost:8086');
  const [org, setOrg] = useState('');
  const [bucket, setBucket] = useState('');
  const [token, setToken] = useState('');
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);

  const onSave = async () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 1000);
  };

  const onTest = async () => {
    setTesting(true);
    setTimeout(() => setTesting(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">ตั้งค่า InfluxDB</h1>
        <p className="text-muted-foreground">กำหนดค่าการเชื่อมต่อ InfluxDB Time-Series Database</p>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">การเชื่อมต่อ</h3>
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">InfluxDB URL</label>
              <input type="text" className="form-control" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="http://localhost:8086" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Organization</label>
              <input type="text" className="form-control" value={org} onChange={(e) => setOrg(e.target.value)} placeholder="my-org" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Bucket</label>
              <input type="text" className="form-control" value={bucket} onChange={(e) => setBucket(e.target.value)} placeholder="my-bucket" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Token</label>
              <input type="password" className="form-control" value={token} onChange={(e) => setToken(e.target.value)} placeholder="InfluxDB token" />
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex gap-2">
        <button className="btn btn-primary" onClick={onSave} disabled={saving}>
          {saving && <span className="spinner-border spinner-border-sm me-2" />}
          บันทึกการตั้งค่า
        </button>
        <button className="btn btn-outline-primary" onClick={onTest} disabled={testing}>
          {testing && <span className="spinner-border spinner-border-sm me-2" />}
          ทดสอบการเชื่อมต่อ
        </button>
      </div>
    </div>
  );
}
