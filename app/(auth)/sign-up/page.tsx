'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthRepositoryImpl } from '../../../src/features/auth/data/repositories/auth.repository.impl';
import { signUpUseCase } from '../../../src/features/auth/domain/use-cases/sign-up.use-case';

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });

  const togglePassword = () => setPasswordVisible(!passwordVisible);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('รหัสผ่านไม่ตรงกัน');
      return;
    }
    if (!formData.agreeTerms) {
      setError('กรุณายอมรับข้อกำหนด');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const repository = new AuthRepositoryImpl();
      const signUp = signUpUseCase(repository);
      await signUp({
        username: formData.username,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        email: formData.email,
        firstName: formData.fullName.split(' ')[0] || formData.fullName,
        lastName: formData.fullName.split(' ').slice(1).join(' ') || '',
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        mobileNumber: formData.phoneNumber,
        lineId: '',
        locationId: '',
        roleId: 2,
      });
      router.push('/sign-in');
    } catch (err: any) {
      setError(err.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="card card-md">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">สมัครสมาชิก</h2>
          {error && <div className="alert alert-danger mb-3">{error}</div>}
          <form onSubmit={onSubmit} autoComplete="off">
            <div className="mb-3">
              <label className="form-label">ชื่อ-นามสกุล</label>
              <input type="text" className="form-control" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="ชื่อ-นามสกุล" required />
            </div>
            <div className="mb-3">
              <label className="form-label">ชื่อผู้ใช้</label>
              <input type="text" className="form-control" name="username" value={formData.username} onChange={handleChange} placeholder="ชื่อผู้ใช้" required />
            </div>
            <div className="mb-3">
              <label className="form-label">อีเมล</label>
              <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" required />
            </div>
            <div className="mb-3">
              <label className="form-label">เบอร์โทรศัพท์</label>
              <input type="text" className="form-control" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="เบอร์โทรศัพท์" />
            </div>
            <div className="mb-3">
              <label className="form-label">รหัสผ่าน</label>
              <div className="input-group input-group-flat">
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  className="form-control"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="รหัสผ่าน"
                  required
                  autoComplete="new-password"
                />
                <span className="input-group-text">
                  <a href="javascript:void(0)" className="link-secondary" title="Toggle password" onClick={togglePassword}>
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
            <div className="mb-3">
              <label className="form-label">ยืนยันรหัสผ่าน</label>
              <input type="password" className="form-control" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="ยืนยันรหัสผ่าน" required autoComplete="new-password" />
            </div>
            <div className="mb-3">
              <label className="form-check">
                <input type="checkbox" className="form-check-input" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} />
                <span className="form-check-label">
                  ยอมรับ <a href="javascript:void(0)">ข้อกำหนดการใช้งาน</a>
                </span>
              </label>
            </div>
            <div className="form-footer">
              <button type="submit" className="btn btn-primary w-100" disabled={loading || !formData.agreeTerms}>
                {loading && <span className="spinner-border spinner-border-sm me-2" />}
                สมัครสมาชิก
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="text-center text-secondary mt-3">
        มีบัญชีอยู่แล้ว? <Link href="/sign-in">เข้าสู่ระบบ</Link>
      </div>
    </>
  );
}
