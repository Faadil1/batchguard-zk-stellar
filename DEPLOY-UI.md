# BatchGuard Settlement Console — UI Deployment

## What this is

A static React UI (Vite build) showing BatchGuard ZK's settlement proofs,
public vs private data split, evidence gates, and roadmap.

All data is **hardcoded from real evidence files** — no backend, no live
proof generation, no network calls. This is intentional: the UI amplifies
the story of already-proven work; it does not replace the proof.

Evidence labels in the UI are all `LOCAL_ONLY` — consistent with the
actual evidence files in `evidence/`.

## Files

```
ui/             ← production build (serve this)
  index.html
  assets/
    index-*.js
    index-*.css
ui-src/         ← full source (rebuild or audit here)
  src/App.jsx
  src/index.css
  src/main.jsx
  package.json
  vite.config.js
  index.html
```

## Option 1: Serve the pre-built UI immediately

```bash
# Any static file server works. Fastest options:
npx serve ui/
# or
python3 -m http.server 5173 --directory ui/
# or
cd ui && npx http-server -p 5173
```

Then open http://localhost:5173

## Option 2: Rebuild from source

```bash
cd ui-src
npm install
npm run dev      # development server with hot reload
npm run build    # production build → dist/
cp -r dist/* ../ui/   # update ui/ with new build
```

## Option 3: Deploy to GitHub Pages (recommended for demo/submission)

```bash
# From the repo root, if you have gh-pages installed:
npx gh-pages -d ui

# OR: push ui/ to a gh-pages branch manually
git subtree push --prefix ui origin gh-pages
```

The UI uses relative asset paths (`/assets/...`) — if deploying to a
subdirectory, update `vite.config.js` with `base: '/batchguard-zk-stellar/'`
and rebuild.

## Option 4: Netlify / Vercel drag-and-drop

Drag the `ui/` folder into Netlify Drop or Vercel Deploy.
No build step required — it is already built.

## Serve command for demo recording

```bash
npx serve ui/ -p 5173 &
# wait 2 seconds, then open browser to http://localhost:5173
```

## Rollback

The UI is entirely additive. To remove:
```bash
rm -rf ui/ ui-src/
git add -A && git commit -m "Remove UI (rollback)"
```

This does not affect any circuit, evidence, or proof file.

## What the UI shows

| Section | Source |
|---|---|
| Single Batch Proof card | evidence/gate-3-final-result.yaml |
| Rollup Proof card | evidence/gate-4-rollup-result.yaml |
| Settlement Visibility split | circuits/invoice_batch/src/main.nr (public/private inputs) |
| Verification Gates list | evidence/ (all 7 gate files) |
| Contract IDs | Hardcoded from gate results (not fetched live) |
| Proof sizes / CPU stats | Hardcoded from gate-3-final-result.yaml |
| Roadmap | ROADMAP_ONLY items — clearly labeled, no false claims |

## Evidence discipline

- No claim in the UI is stronger than its source evidence file
- `LOCAL_ONLY` is used consistently (not LIVE, not SIMULATED)
- Framing note on the rollup card explicitly states "aggregation-inspired
  multi-batch proof — not recursive proof aggregation"
- Scope notice at the bottom of the Trust section discloses the
  commitment scheme's nature (field-arithmetic weighted sum, not a hash)
