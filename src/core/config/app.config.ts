export const APP_CONFIG = {
  name: 'ICMon Web App',
  version: '1.0.0',
  description: 'IoT Monitoring Dashboard',
} as const;

export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
  timeout: 30000,
} as const;

export const AUTH_CONFIG = {
  sessionMaxAge: 60 * 60 * 24 * 30, // 30 days
  cookieName: 'session',
} as const;
