---
name: run-www
description: Build, run, serve, and screenshot the `www` React Router v7 SSR site. Use when asked to run, start, serve, build, typecheck, smoke-test, or screenshot this app / website / dev server.
---

# run-www

`www` is the standard **React Router v7** full-stack template (SSR on): a single
index route rendering the "Welcome" page. It's a web app, so the driver is a
headless browser. [`smoke.sh`](smoke.sh) builds it, serves it, screenshots it
with the system Chrome, and asserts the page rendered.

> Paths below are relative to the unit root (`www/`). The driver lives at
> `.claude/skills/run-www/smoke.sh`.

## Run (agent path) — the driver

One command: build → serve → screenshot → assert → clean up.

```bash
bash .claude/skills/run-www/smoke.sh
```

Prints `PASS` and writes a full-page screenshot to `/tmp/www-home.png`. Override
with env vars: `PORT=4000 SHOT=/tmp/x.png bash .claude/skills/run-www/smoke.sh`.
The driver kills its own server on exit (trap), so it's safe to re-run.

To just shoot the page while a server is already up (see Build), use the system
Chrome directly:

```bash
google-chrome --headless=new --no-sandbox --disable-gpu --hide-scrollbars \
  --window-size=1280,720 --screenshot=/tmp/www-home.png http://localhost:3000
```

Then **open `/tmp/www-home.png`** — you should see a white page with the React
Router logo and a "What's next?" card linking to "React Router Docs" and
"Join Discord".

## Prerequisites

This is a **Fedora** box (`dnf`/`rpm`, no `apt-get`) running as a non-root user.
Everything needed is already present:

- `node` (v24) and `pnpm` (v10), both via asdf shims.
- `google-chrome` / `google-chrome-stable` at `/usr/bin/` — the driver uses
  this; no Playwright/Puppeteer download required.

## Build

```bash
pnpm install            # only if node_modules is missing
pnpm build              # -> ./build/ (client + SSR bundles)
PORT=3000 pnpm start &  # production server on http://localhost:3000
# wait for it:
for i in $(seq 1 30); do curl -sf http://localhost:3000 >/dev/null && break; sleep 1; done
```

`pnpm start` runs `react-router-serve ./build/server/index.js`. Stop it with
`kill %1`, by PID, or `fuser -k 3000/tcp` — **not** `pkill -f react-router-serve`
(see Gotchas).

## Run (human path)

Dev server with HMR — only useful with a real browser, pointless headless:

```bash
pnpm dev    # http://localhost:5173
```

## Typecheck

```bash
pnpm typecheck   # react-router typegen && tsc
```

## Gotchas

- **Never use `pkill -f react-router-serve` in this environment — it kills the
  caller with exit 144 (signal 16).** Stop the server with `kill %1`, by PID, or
  `fuser -k 3000/tcp`. The driver's own cleanup uses `kill $APP_PID` (by PID),
  which is safe.
- **The Bash sandbox kills the driver with exit 144** because it terminates the
  listening server `pnpm start` spawns from inside the script. Run the
  integrated `smoke.sh` with `dangerouslyDisableSandbox: true` (launching a
  local server is exactly what the sandbox blocks); individual stages run fine
  at the top level. In a normal shell, neither caveat applies.
- **No `chromium-cli`, no Playwright browsers needed.** The system
  `google-chrome` is installed, so the driver shoots the page with
  `google-chrome --headless=new --screenshot=...`. Don't reach for
  `pnpm dlx playwright` — it works, but it pointlessly downloads a ~110 MB
  headless-shell when Chrome is already here.
- **`--no-sandbox` is required.** Chrome's sandbox needs privileges this
  unprivileged container doesn't grant; without the flag the screenshot run
  hangs/fails.
- **This is Fedora, not Ubuntu.** Any "run `apt-get install ...`" advice from
  React Router / Playwright docs does not apply — there's no `apt-get` and no
  sudo. The libs Chrome needs are already on the system.
- **Content assertion uses the SSR HTML, not the live DOM.** `chrome
  --screenshot` gives a picture but no DOM query. Because the app is
  server-rendered, the marker text ("React Router Docs", "Join Discord") is
  already in `curl http://localhost:3000`, so the driver greps that. For real
  click/type flows you'd add Playwright as a project dep.
- **The "What's next?" heading is `What&apos;s next?` in the HTML.** It's
  authored as `What&apos;s` in `welcome.tsx`, so grepping the raw SSR HTML for
  the literal `What's` fails. The driver matches on `next?` instead.
- **The "Welcome" page's only links are external** (reactrouter.com, Discord);
  there's no in-app navigation to drive yet.

## Troubleshooting

- **`curl` never connects / `FAIL: server never came up`** → port already in
  use. Free it with `fuser -k 3000/tcp` (avoid `pkill`, see Gotchas) or run with
  a different `PORT`.
- **Screenshot is 0 bytes / Chrome errors** → confirm `command -v google-chrome`
  resolves, and that `--no-sandbox` is present in the invocation.
