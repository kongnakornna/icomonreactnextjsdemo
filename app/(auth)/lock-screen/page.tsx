'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function LockScreenPage() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePassword = () => setPasswordVisible(!passwordVisible);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <>
      <form className="card card-md" onSubmit={onSubmit} autoComplete="off">
        <div className="card-body">
          <div className="text-center mb-4">
            <span className="avatar avatar-xl mb-3">A</span>
            <h2 className="card-title">ผู้ดูแลระบบ</h2>
            <p className="text-secondary">กรอกรหัสผ่านเพื่อปลดล็อก</p>
          </div>
          {error && <div className="alert alert-danger mb-3">{error}</div>}
          <div className="mb-3">
            <div className="input-group input-group-flat">
              <input
                type={passwordVisible ? 'text' : 'password'}
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="รหัสผ่าน"
                required
                autoComplete="current-password"
              />
              <span className="input-group-text">
                <a
                  href="javascript:void(0)"
                  className="link-secondary"
                  title="Toggle password"
                  onClick={togglePassword}
                >
                  {passwordVisible ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-sm">
                      <path d="M10.585 10.585a2 2 0 0 0 2.829 2.829" />
                      <path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" />
                      <path d="M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-sm">
                      <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                      <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                    </svg>
                  )}
                </a>
              </span>
            </div>
          </div>
          <div className="form-footer">
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading && <span className="spinner-border spinner-border-sm me-2" />}
              ปลดล็อก
            </button>
          </div>
        </div>
      </form>
      <div className="text-center text-secondary mt-3">
        <Link href="/sign-in">เข้าสู่ระบบด้วยบัญชีอื่น</Link>
      </div>
    </>
  );
}
