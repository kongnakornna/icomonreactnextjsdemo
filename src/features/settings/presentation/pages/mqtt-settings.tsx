'use client';

import { useState } from 'react';

export default function MqttSettingsPage() {
  const [host, setHost] = useState('localhost');
  const [port, setPort] = useState(1883);
  const [protocol, setProtocol] = useState('mqtt');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [clientId, setClientId] = useState('');
  const [keepalive, setKeepalive] = useState(60);
  const [reconnectPeriod, setReconnectPeriod] = useState(1000);
  const [qos, setQos] = useState(0);
  const [clean, setClean] = useState(true);
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
        <h1 className="text-2xl font-bold">ตั้งค่า MQTT</h1>
        <p className="text-muted-foreground">กำหนดค่าการเชื่อมต่อ MQTT Broker</p>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">การเชื่อมต่อ Broker</h3>
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Host</label>
              <input type="text" className="form-control" value={host} onChange={(e) => setHost(e.target.value)} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Port</label>
              <input type="number" className="form-control" value={port} onChange={(e) => setPort(Number(e.target.value))} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Protocol</label>
              <select className="form-select" value={protocol} onChange={(e) => setProtocol(e.target.value)}>
                <option value="mqtt">mqtt</option>
                <option value="mqtts">mqtts</option>
                <option value="ws">ws</option>
                <option value="wss">wss</option>
              </select>
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
              <label className="form-label">Client ID</label>
              <input type="text" className="form-control" value={clientId} onChange={(e) => setClientId(e.target.value)} placeholder="Auto generate" />
            </div>
            <div className="col-md-3">
              <label className="form-label">Keepalive (วินาที)</label>
              <input type="number" className="form-control" value={keepalive} onChange={(e) => setKeepalive(Number(e.target.value))} />
            </div>
            <div className="col-md-3">
              <label className="form-label">Reconnect Period (ms)</label>
              <input type="number" className="form-control" value={reconnectPeriod} onChange={(e) => setReconnectPeriod(Number(e.target.value))} />
            </div>
            <div className="col-md-3">
              <label className="form-label">QoS Level</label>
              <select className="form-select" value={qos} onChange={(e) => setQos(Number(e.target.value))}>
                <option value={0}>0</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label">&nbsp;</label>
              <div>
                <label className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" checked={clean} onChange={(e) => setClean(e.target.checked)} />
                  <span className="form-check-label">Clean Session</span>
                </label>
              </div>
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
