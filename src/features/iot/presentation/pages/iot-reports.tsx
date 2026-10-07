'use client';

import { useState } from 'react';

export default function IotReportsPage() {
  const [reportType, setReportType] = useState('device-status');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [deviceId, setDeviceId] = useState('');
  const [generating, setGenerating] = useState(false);

  const onGenerate = async () => {
    setGenerating(true);
    setTimeout(() => setGenerating(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">รายงาน IoT</h1>
        <p className="text-muted-foreground">สร้างและจัดการรายงานอุปกรณ์ IoT</p>
      </div>

      <div className="card">
        <div className="card-header"><h3 className="card-title">สร้างรายงาน</h3></div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">ประเภทรายงาน</label>
              <select className="form-select" value={reportType} onChange={(e) => setReportType(e.target.value)}>
                <option value="device-status">Device Status</option>
                <option value="sensor-data">Sensor Data</option>
                <option value="alarm-history">Alarm History</option>
                <option value="data-usage">Data Usage</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Device ID</label>
              <input type="text" className="form-control" value={deviceId} onChange={(e) => setDeviceId(e.target.value)} placeholder="ทั้งหมด" />
            </div>
            <div className="col-md-2">
              <label className="form-label">วันที่เริ่ม</label>
              <input type="date" className="form-control" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div className="col-md-2">
              <label className="form-label">วันที่สิ้นสุด</label>
              <input type="date" className="form-control" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
          </div>
        </div>
        <div className="card-footer d-flex gap-2">
          <button className="btn btn-primary" onClick={onGenerate} disabled={generating}>
            {generating && <span className="spinner-border spinner-border-sm me-2" />}
            สร้างรายงาน
          </button>
          <button className="btn btn-outline-primary" disabled={generating}>ส่งออกข้อมูล</button>
        </div>
      </div>

      <div className="card">
        <div className="card-header"><h3 className="card-title">ประวัติรายงาน</h3></div>
        <div className="card-body">
          <table className="table table-vcenter">
            <thead><tr><th>ชื่อ</th><th>ประเภท</th><th>วันที่</th><th></th></tr></thead>
            <tbody>
              <tr><td colSpan={4} className="text-center text-muted py-4">ยังไม่มีรายงาน</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
