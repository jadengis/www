#!/usr/bin/env bash
# Driver for the `www` React Router v7 (SSR) app.
# Builds, serves, screenshots with headless Chrome, and asserts on the
# server-rendered HTML. No extra deps: uses the system google-chrome.
# Run from anywhere:  bash .claude/skills/run-www/smoke.sh
set -euo pipefail

# cd to the unit root (www/) regardless of where this is invoked from.
cd "$(dirname "$0")/../../.."

PORT="${PORT:-3000}"
URL="http://localhost:${PORT}"
SHOT="${SHOT:-/tmp/www-home.png}"
CHROME="${CHROME:-$(command -v google-chrome || command -v google-chrome-stable)}"

# --- Build + serve in background -------------------------------------------
pnpm build
PORT="$PORT" pnpm start &
APP_PID=$!
trap 'kill $APP_PID 2>/dev/null || true' EXIT

# Poll the port instead of sleeping; fail loudly if it never comes up.
for i in $(seq 1 30); do
  curl -sf "$URL" >/dev/null 2>&1 && break
  sleep 1
  [ "$i" = 30 ] && { echo "FAIL: server never came up on $URL"; exit 1; }
done

# --- Drive: screenshot (real browser) -------------------------------------
"$CHROME" --headless=new --no-sandbox --disable-gpu --hide-scrollbars \
  --window-size=1280,720 --screenshot="$SHOT" "$URL" >/dev/null 2>&1
echo "screenshot -> $SHOT ($(stat -c %s "$SHOT") bytes)"

# --- Assert: SSR HTML contains the Welcome markers ------------------------
# NB: the "What's next?" heading is rendered as "What&apos;s next?" in the
# server HTML, so match on "next?" rather than the apostrophe form.
html=$(curl -s "$URL")
for needle in "next?" "React Router Docs" "Join Discord"; do
  echo "$html" | grep -qF "$needle" || { echo "FAIL: missing '$needle'"; exit 1; }
done

echo "PASS"
