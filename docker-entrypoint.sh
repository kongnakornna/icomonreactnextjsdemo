#!/bin/sh

echo "[Docker] Checking backend connectivity..."

TARGET="http://host.docker.internal:5000"
FALLBACK="http://localhost:5000"

if nc -z -w2 host.docker.internal 5000 2>/dev/null; then
  echo "[Docker] host.docker.internal:5000 is reachable"
  TARGET="http://host.docker.internal:5000"
elif nc -z -w2 localhost 5000 2>/dev/null; then
  echo "[Docker] localhost:5000 is reachable"
  TARGET="http://localhost:5000"
else
  echo "[Docker] No backend reachable, defaulting to host.docker.internal:5000"
  TARGET="http://host.docker.internal:5000"
fi

export API_TARGET_URL="${TARGET}"
export NEXT_PUBLIC_API_TARGET_URL="${TARGET}"

echo "[Docker] API Target: ${TARGET}"
echo "[Docker] Starting Next.js dev server..."

exec npm run dev
