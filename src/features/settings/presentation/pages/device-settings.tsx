'use client';

import { useState } from 'react';

export default function DeviceSettingsPage() {
  const [refreshInterval, setRefreshInterval] = useState(5000);
  const [pageSize, setPageSize] = useState(20);
  const [autoRegister, setAutoRegister] = useState(true);
  const [retentionDays, setRetentionDays] = useState(90);
  const [heartbeatInterval, setHeartbeatInterval] = useState(60);
  const [offlineTimeout, setOfflineTimeout] = useState(180);
  const [saving, setSaving] = useState(false);

  const onSave = async () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">ตั้งค่าอุปกรณ์</h1>
        <p className="text-muted-foreground">กำหนดค่าเริ่มต้นสำหรับอุปกรณ์ IoT</p>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">การตั้งค่าเริ่มต้น</h3>
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Refresh Interval (ms)</label>
              <input type="number" className="form-control" value={refreshInterval} onChange={(e) => setRefreshInterval(Number(e.target.value))} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Page Size</label>
              <input type="number" className="form-control" value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Data Retention (วัน)</label>
              <input type="number" className="form-control" value={retentionDays} onChange={(e) => setRetentionDays(Number(e.target.value))} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Heartbeat Interval (วินาที)</label>
              <input type="number" className="form-control" value={heartbeatInterval} onChange={(e) => setHeartbeatInterval(Number(e.target.value))} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Offline Timeout (วินาที)</label>
              <input type="number" className="form-control" value={offlineTimeout} onChange={(e) => setOfflineTimeout(Number(e.target.value))} />
            </div>
            <div className="col-md-4">
              <label className="form-label">&nbsp;</label>
              <div>
                <label className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" checked={autoRegister} onChange={(e) => setAutoRegister(e.target.checked)} />
                  <span className="form-check-label">เปิด Auto Register</span>
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
      </div>
    </div>
  );
}
