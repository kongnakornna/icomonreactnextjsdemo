'use client';

import { useState } from 'react';

export default function AlarmSettingsPage() {
  const [enabled, setEnabled] = useState(true);
  const [cooldownMinutes, setCooldownMinutes] = useState(5);
  const [escalateAfterMinutes, setEscalateAfterMinutes] = useState(15);
  const [maxAlertsPerHour, setMaxAlertsPerHour] = useState(10);
  const [warningMin, setWarningMin] = useState(0);
  const [warningMax, setWarningMax] = useState(30);
  const [alertMin, setAlertMin] = useState(30);
  const [alertMax, setAlertMax] = useState(50);
  const [saving, setSaving] = useState(false);

  const onSave = async () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">ตั้งค่าระบบแจ้งเตือน</h1>
        <p className="text-muted-foreground">กำหนดค่ากฎและช่องทางการแจ้งเตือน</p>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">การตั้งค่าทั่วไป</h3>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <label className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                checked={enabled}
                onChange={(e) => setEnabled(e.target.checked)}
              />
              <span className="form-check-label">เปิดระบบแจ้งเตือน</span>
            </label>
          </div>
          <div className="row g-3">
            <div className="col-md-3">
              <label className="form-label">Cooldown (นาที)</label>
              <input
                type="number"
                className="form-control"
                value={cooldownMinutes}
                onChange={(e) => setCooldownMinutes(Number(e.target.value))}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Escalate After (นาที)</label>
              <input
                type="number"
                className="form-control"
                value={escalateAfterMinutes}
                onChange={(e) => setEscalateAfterMinutes(Number(e.target.value))}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">แจ้งเตือนสูงสุด/ชม.</label>
              <input
                type="number"
                className="form-control"
                value={maxAlertsPerHour}
                onChange={(e) => setMaxAlertsPerHour(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">ค่าเริ่มต้น</h3>
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-3">
              <label className="form-label">Warning Min</label>
              <input type="number" className="form-control" value={warningMin} onChange={(e) => setWarningMin(Number(e.target.value))} />
            </div>
            <div className="col-md-3">
              <label className="form-label">Warning Max</label>
              <input type="number" className="form-control" value={warningMax} onChange={(e) => setWarningMax(Number(e.target.value))} />
            </div>
            <div className="col-md-3">
              <label className="form-label">Alert Min</label>
              <input type="number" className="form-control" value={alertMin} onChange={(e) => setAlertMin(Number(e.target.value))} />
            </div>
            <div className="col-md-3">
              <label className="form-label">Alert Max</label>
              <input type="number" className="form-control" value={alertMax} onChange={(e) => setAlertMax(Number(e.target.value))} />
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex gap-2">
        <button className="btn btn-primary" onClick={onSave} disabled={saving}>
          {saving && <span className="spinner-border spinner-border-sm me-2" />}
          บันทึก
        </button>
      </div>
    </div>
  );
}
