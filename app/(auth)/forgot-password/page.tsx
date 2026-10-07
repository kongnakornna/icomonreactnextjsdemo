'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'ไม่สามารถส่งอีเมลได้ กรุณาลองอีกครั้ง');
      }
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'ไม่สามารถส่งอีเมลได้ กรุณาลองอีกครั้ง');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="card card-md">
        <div className="card-body">
          <h2 className="h2 text-center mb-4">ลืมรหัสผ่าน</h2>
          <p className="text-secondary mb-4">กรอกอีเมลของคุณ แล้วเราจะส่งลิงก์สำหรับรีเซ็ตรหัสผ่านให้</p>
          {error && <div className="alert alert-danger mb-3">{error}</div>}
          {success && (
            <div className="alert alert-success mb-3">
              ส่งลิงก์รีเซ็ตรหัสผ่านไปที่อีเมลของคุณแล้ว
            </div>
          )}
          <form onSubmit={onSubmit} autoComplete="off">
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />
            </div>
            <div className="form-footer">
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading || !email}
              >
                {loading && <span className="spinner-border spinner-border-sm me-2" />}
                ส่งลิงก์รีเซ็ตรหัสผ่าน
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="text-center text-secondary mt-3">
        <Link href="/sign-in">กลับเข้าสู่ระบบ</Link>
      </div>
    </>
  );
}
