'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || searchParams.get('code') || '';
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('รหัสผ่านไม่ตรงกัน');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: token, newPassword: password, confirmPassword }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'เกิดข้อผิดพลาด กรุณาลองอีกครั้ง');
      }
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'เกิดข้อผิดพลาด กรุณาลองอีกครั้ง');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="card card-md">
        <div className="card-body">
          <h2 className="h2 text-center mb-4">ตั้งรหัสผ่านใหม่</h2>
          {error && <div className="alert alert-danger mb-3">{error}</div>}
          {success && (
            <div className="alert alert-success mb-3">
              ตั้งรหัสผ่านสำเร็จแล้ว <Link href="/sign-in">เข้าสู่ระบบ</Link>
            </div>
          )}
          <form onSubmit={onSubmit} autoComplete="off">
            <div className="mb-3">
              <label className="form-label">รหัสผ่านใหม่</label>
              <div className="input-group input-group-flat">
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="รหัสผ่านใหม่"
                  required
                  autoComplete="new-password"
                />
                <span className="input-group-text">
                  <a
                    href="javascript:void(0)"
                    className="link-secondary"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
                        <path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0-6.6-2-9-6c1.272-2.12 2.712-3.678 4.32-4.674m2.86-1.146a9.055 9.055 0 0 1 1.82-.18c3.6 0 6.6 2 9 6c-.666 1.11-1.462 2.067-2.388 2.87" />
                        <path d="M3 3l18 18" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                        <path d="M21 12c-2.4 4-5.4 6-9 6c-3.6 0-6.6-2-9-6c2.4-4 5.4-6 9-6c3.6 0 6.6 2 9 6" />
                      </svg>
                    )}
                  </a>
                </span>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">ยืนยันรหัสผ่านใหม่</label>
              <div className="input-group input-group-flat">
                <input
                  type={confirmVisible ? 'text' : 'password'}
                  className="form-control"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="ยืนยันรหัสผ่านใหม่"
                  required
                  autoComplete="new-password"
                />
                <span className="input-group-text">
                  <a
                    href="javascript:void(0)"
                    className="link-secondary"
                    onClick={() => setConfirmVisible(!confirmVisible)}
                  >
                    {confirmVisible ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
                        <path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0-6.6-2-9-6c1.272-2.12 2.712-3.678 4.32-4.674m2.86-1.146a9.055 9.055 0 0 1 1.82-.18c3.6 0 6.6 2 9 6c-.666 1.11-1.462 2.067-2.388 2.87" />
                        <path d="M3 3l18 18" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                        <path d="M21 12c-2.4 4-5.4 6-9 6c-3.6 0-6.6-2-9-6c2.4-4 5.4-6 9-6c3.6 0 6.6 2 9 6" />
                      </svg>
                    )}
                  </a>
                </span>
              </div>
            </div>
            <div className="form-footer">
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading || !password || !confirmPassword || password !== confirmPassword}
              >
                {loading && <span className="spinner-border spinner-border-sm me-2" />}
                ตั้งรหัสผ่าน
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
