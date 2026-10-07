'use client';

import { useState } from 'react';

export default function IotSettingsPage() {
  const [refreshInterval, setRefreshInterval] = useState(5000);
  const [dataRetention, setDataRetention] = useState(90);
  const [autoRegister, setAutoRegister] = useState(true);
  const [heartbeatInterval, setHeartbeatInterval] = useState(60);
  const [offlineTimeout, setOfflineTimeout] = useState(180);
  const [defaultTimezone, setDefaultTimezone] = useState('Asia/Bangkok');
  const [enableGeolocation, setEnableGeolocation] = useState(false);
  const [saving, setSaving] = useState(false);

  const onSave = async () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">ตั้งค่า IoT</h1>
        <p className="text-muted-foreground">กำหนดค่าเริ่มต้นสำหรับอุปกรณ์ IoT</p>
      </div>

      <div className="card">
        <div className="card-header"><h3 className="card-title">การตั้งค่าทั่วไป</h3></div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Refresh Interval (ms)</label>
              <input type="number" className="form-control" value={refreshInterval} onChange={(e) => setRefreshInterval(Number(e.target.value))} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Data Retention (วัน)</label>
              <input type="number" className="form-control" value={dataRetention} onChange={(e) => setDataRetention(Number(e.target.value))} />
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
              <label className="form-label">Timezone</label>
              <select className="form-select" value={defaultTimezone} onChange={(e) => setDefaultTimezone(e.target.value)}>
                <option value="Asia/Bangkok">Asia/Bangkok</option>
                <option value="Asia/Tokyo">Asia/Tokyo</option>
                <option value="Asia/Shanghai">Asia/Shanghai</option>
                <option value="UTC">UTC</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">&nbsp;</label>
              <div>
                <label className="form-check form-switch"><input className="form-check-input" type="checkbox" checked={autoRegister} onChange={(e) => setAutoRegister(e.target.checked)} /><span className="form-check-label">Auto Register</span></label>
                <label className="form-check form-switch"><input className="form-check-input" type="checkbox" checked={enableGeolocation} onChange={(e) => setEnableGeolocation(e.target.checked)} /><span className="form-check-label">Geolocation</span></label>
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
