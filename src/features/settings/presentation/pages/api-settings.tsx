'use client';

import { useState } from 'react';

export default function ApiSettingsPage() {
  const [name, setName] = useState('');
  const [endpoint, setEndpoint] = useState('');
  const [method, setMethod] = useState('GET');
  const [headers, setHeaders] = useState('');
  const [saving, setSaving] = useState(false);

  const onSave = async () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">ตั้งค่า API</h1>
        <p className="text-muted-foreground">กำหนดค่า API Endpoints</p>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">API Settings</h3>
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">ชื่อ API</label>
              <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="ชื่อ API" />
            </div>
            <div className="col-md-6">
              <label className="form-label">HTTP Method</label>
              <select className="form-select" value={method} onChange={(e) => setMethod(e.target.value)}>
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
                <option value="PATCH">PATCH</option>
              </select>
            </div>
            <div className="col-md-12">
              <label className="form-label">Endpoint URL</label>
              <input type="text" className="form-control" value={endpoint} onChange={(e) => setEndpoint(e.target.value)} placeholder="https://api.example.com/v1/data" />
            </div>
            <div className="col-md-12">
              <label className="form-label">Headers (JSON)</label>
              <textarea className="form-control" value={headers} onChange={(e) => setHeaders(e.target.value)} rows={4} placeholder='{"Authorization": "Bearer token", "Content-Type": "application/json"}' />
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex gap-2">
        <button className="btn btn-primary" onClick={onSave} disabled={saving || !name || !endpoint}>
          {saving && <span className="spinner-border spinner-border-sm me-2" />}
          บันทึกการตั้งค่า
        </button>
      </div>
    </div>
  );
}
