'use client';

import Link from 'next/link';
import { useState } from 'react';

const countries = [
  { code: 'US', name: 'United States', dial: '+1' },
  { code: 'TH', name: 'Thailand', dial: '+66' },
  { code: 'GB', name: 'United Kingdom', dial: '+44' },
  { code: 'JP', name: 'Japan', dial: '+81' },
  { code: 'KR', name: 'South Korea', dial: '+82' },
  { code: 'CN', name: 'China', dial: '+86' },
  { code: 'DE', name: 'Germany', dial: '+49' },
  { code: 'FR', name: 'France', dial: '+33' },
  { code: 'AU', name: 'Australia', dial: '+61' },
  { code: 'SG', name: 'Singapore', dial: '+65' },
];

export default function TwoStepVerificationPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+66');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <form className="card card-md" onSubmit={onSubmit} autoComplete="off">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">การยืนยันตัวตน 2 ขั้นตอน</h2>
          <div className="mb-3">
            <label className="form-label">ประเทศ</label>
            <select
              className="form-select"
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
            >
              {countries.map((c) => (
                <option key={c.code} value={c.dial}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="form-label">เบอร์โทรศัพท์</label>
            <div className="input-group">
              <span className="input-group-text">{countryCode}</span>
              <input
                type="text"
                className="form-control"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="กรอกเบอร์โทรศัพท์"
              />
            </div>
          </div>
          <div className="text-secondary mb-3">
            เพื่อความปลอดภัยของบัญชีคุณ เราจะส่งรหัสยืนยันทาง SMS เมื่อคุณเข้าสู่ระบบจากอุปกรณ์ใหม่
          </div>
          <div className="form-footer">
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading && <span className="spinner-border spinner-border-sm me-2" />}
              ส่งรหัสยืนยัน
            </button>
          </div>
        </div>
      </form>
      <div className="text-center text-secondary mt-3">
        <Link href="/sign-in">กลับเข้าสู่ระบบ</Link>
      </div>
    </>
  );
}
