'use client';

import { useState } from 'react';

export default function EmailSettingsPage() {
  const [provider, setProvider] = useState('smtp');
  const [smtpHost, setSmtpHost] = useState('');
  const [smtpPort, setSmtpPort] = useState(587);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fromAddress, setFromAddress] = useState('');
  const [fromName, setFromName] = useState('');
  const [encryption, setEncryption] = useState('tls');
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
        <h1 className="text-2xl font-bold">ตั้งค่าอีเมล</h1>
        <p className="text-muted-foreground">กำหนดค่าการส่งอีเมล (SMTP)</p>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">การตั้งค่า SMTP</h3>
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Provider</label>
              <select className="form-select" value={provider} onChange={(e) => setProvider(e.target.value)}>
                <option value="smtp">SMTP</option>
                <option value="sendgrid">SendGrid</option>
                <option value="ses">Amazon SES</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">SMTP Host</label>
              <input type="text" className="form-control" value={smtpHost} onChange={(e) => setSmtpHost(e.target.value)} placeholder="smtp.gmail.com" />
            </div>
            <div className="col-md-4">
              <label className="form-label">SMTP Port</label>
              <input type="number" className="form-control" value={smtpPort} onChange={(e) => setSmtpPort(Number(e.target.value))} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Username</label>
              <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Encryption</label>
              <select className="form-select" value={encryption} onChange={(e) => setEncryption(e.target.value)}>
                <option value="none">None</option>
                <option value="ssl">SSL</option>
                <option value="tls">TLS</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">From Address</label>
              <input type="email" className="form-control" value={fromAddress} onChange={(e) => setFromAddress(e.target.value)} placeholder="noreply@example.com" />
            </div>
            <div className="col-md-6">
              <label className="form-label">From Name</label>
              <input type="text" className="form-control" value={fromName} onChange={(e) => setFromName(e.target.value)} placeholder="iCmon IoT" />
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
          ส่งอีเมลทดสอบ
        </button>
      </div>
    </div>
  );
}
