'use client';

import { useEffect, useState } from 'react';

interface Token {
  id: string;
  name: string;
  token: string;
  permissions: string;
  expiresAt: string;
  lastUsedAt: string;
  isActive: boolean;
}

export default function TokenListPage() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">จัดการ Token</h1>
          <p className="text-muted-foreground">จัดการ API Access Tokens</p>
        </div>
        <a href="/settings/tokens/create" className="btn btn-primary">
          สร้าง Token
        </a>
      </div>

      <div className="card">
        <div className="card-body">
          <table className="table table-vcenter">
            <thead>
              <tr>
                <th>ชื่อ</th>
                <th>Token</th>
                <th>สิทธิ์</th>
                <th>หมดอายุ</th>
                <th>ใช้ล่าสุด</th>
                <th>สถานะ</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {tokens.length === 0 ? (
                <tr><td colSpan={7} className="text-center text-muted py-4">ไม่มี Token</td></tr>
              ) : (
                tokens.map((t) => (
                  <tr key={t.id}>
                    <td className="fw-bold">{t.name}</td>
                    <td><code>{t.token.substring(0, 20)}...</code></td>
                    <td>{t.permissions}</td>
                    <td>{t.expiresAt}</td>
                    <td>{t.lastUsedAt || '-'}</td>
                    <td>
                      <span className={`badge ${t.isActive ? 'bg-green-lt' : 'bg-red-lt'}`}>
                        {t.isActive ? 'ใช้งาน' : 'เพิกถอน'}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-ghost btn-sm text-red">เพิกถอน</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
