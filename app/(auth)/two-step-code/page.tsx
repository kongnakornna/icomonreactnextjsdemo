'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

export default function TwoStepCodePage() {
  const [codes, setCodes] = useState<string[]>(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [dontAskAgain, setDontAskAgain] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newCodes = [...codes];
    newCodes[index] = value;
    setCodes(newCodes);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !codes[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

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
          <h2 className="card-title card-title-lg text-center mb-4">ยืนยันตัวตน</h2>
          <p className="my-4 text-center">
            กรอกรหัสยืนยันที่ส่งไปที่ <strong>+66 856-672-8552</strong>
          </p>
          <div className="my-5">
            <div className="row g-4">
              <div className="col">
                <div className="row g-2">
                  {[0, 1, 2].map((i) => (
                    <div className="col" key={i}>
                      <input
                        ref={(el) => { inputRefs.current[i] = el; }}
                        type="text"
                        className="form-control form-control-lg text-center px-3 py-3"
                        maxLength={1}
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={codes[i]}
                        onChange={(e) => handleCodeChange(i, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(i, e)}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="col">
                <div className="row g-2">
                  {[3, 4, 5].map((i) => (
                    <div className="col" key={i}>
                      <input
                        ref={(el) => { inputRefs.current[i] = el; }}
                        type="text"
                        className="form-control form-control-lg text-center px-3 py-3"
                        maxLength={1}
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={codes[i]}
                        onChange={(e) => handleCodeChange(i, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(i, e)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="my-4">
            <label className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                checked={dontAskAgain}
                onChange={(e) => setDontAskAgain(e.target.checked)}
              />
              ไม่ต้องขอรหัสยืนยันบนอุปกรณ์นี้อีก
            </label>
          </div>
          <div className="form-footer">
            <div className="btn-list flex-nowrap">
              <Link href="/two-step-verification" className="btn w-100">
                ยกเลิก
              </Link>
              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading && <span className="spinner-border spinner-border-sm me-2" />}
                ยืนยัน
              </button>
            </div>
          </div>
        </div>
      </form>
      <div className="text-center text-secondary mt-3">
        ไม่ได้รับรหัส? <a href="javascript:void(0)">ส่งรหัสใหม่</a>
      </div>
    </>
  );
}
