# GATE 1 Escalation Runbook — Soroban ZK Verifier Spike

**Project:** BatchGuard ZK — Stellar Hacks: Real-World ZK
**Trigger:** BLOCKED_TECHNICAL in Claude sandbox — Docker + testnet egress unavailable
**Purpose:** Reproduce the spike in an environment that has Docker and unrestricted
network egress. Stop at the first rung that achieves PASS.

---

## Prerequisite Understanding

The spike requires, at minimum, these three things to work in the target environment:

1. **Docker daemon** — for `stellar container start` (Standalone Network localnet)
2. **Unrestricted outbound HTTPS** to:
   - `sh.rustup.rs` and `static.rust-lang.org` (Rust toolchain)
   - `release-assets.githubusercontent.com` (Noir/Barretenberg binaries)
   - `soroban-testnet.stellar.org` / `horizon-testnet.stellar.org` / `friendbot.stellar.org`
     (testnet alternative if Docker is slow to set up)
3. **A persistent shell** where long-running `cargo install` can complete uninterrupted

---

## Rung 1 — Google Cloud Shell (Recommended First)

**Why first:** Docker is pre-installed, persistent `$HOME`, unrestricted HTTPS egress.
Already in active use for other Faadil Labs projects (P6/CitePay, P8).

### Open Cloud Shell

```
https://shell.cloud.google.com
```

Or via `gcloud` locally:
```bash
gcloud cloud-shell ssh
```

### Upload this package

```bash
# From your local machine:
gcloud cloud-shell scp batchguard-zk-gate1-export.zip cloudshell:~
# Then in Cloud Shell:
unzip batchguard-zk-gate1-export.zip
cd batchguard-zk-gate1
```

### Run the spike

```bash
chmod +x scripts/preflight_cloudshell.sh scripts/run_gate1_cloudshell.sh
./scripts/preflight_cloudshell.sh | tee evidence/cloudshell-preflight.log
./scripts/run_gate1_cloudshell.sh 2>&1 | tee evidence/cloudshell-run.log
```

**Expected time:** 20–45 minutes for a cold run (Rust toolchain + Noir + Barretenberg
install is slow; subsequent runs use the Cargo cache).

---

## Rung 2 — GitHub Codespaces

**Why second:** Docker is available in most devcontainer images; persistent workspace;
no Google account dependency.

### Launch a Codespace

```
https://github.com/features/codespaces
```

Use any public repo as the base (e.g. create a blank one), or use the
`rs-soroban-ultrahonk` repo directly:

```
https://github.com/NethermindEth/rs-soroban-ultrahonk
→ Code → Codespaces → Create codespace on main
```

### Confirm Docker is available

```bash
docker --version
docker ps
```

If `docker ps` returns a permission error (some devcontainer configs restrict
nested Docker), switch to Rung 3.

### Upload and run

```bash
# Upload via Codespace file upload UI, or clone and copy
chmod +x scripts/preflight_cloudshell.sh scripts/run_gate1_cloudshell.sh
./scripts/preflight_cloudshell.sh | tee evidence/cloudshell-preflight.log
./scripts/run_gate1_cloudshell.sh 2>&1 | tee evidence/cloudshell-run.log
```

---

## Rung 3 — Local Machine with Docker Desktop (HP ProBook or equivalent)

**Why third:** Requires local Docker Desktop installation if not already present.
Zero network restrictions once running locally.

### Requirements

- Docker Desktop installed and running (https://www.docker.com/products/docker-desktop/)
- WSL2 on Windows recommended for best Rust/Linux toolchain compatibility

### Confirm Docker

```bash
docker --version
docker run hello-world
```

### Run the spike

```bash
chmod +x scripts/preflight_cloudshell.sh scripts/run_gate1_cloudshell.sh
./scripts/preflight_cloudshell.sh | tee evidence/cloudshell-preflight.log
./scripts/run_gate1_cloudshell.sh 2>&1 | tee evidence/cloudshell-run.log
```

**WSL2 note:** Run from inside WSL2 (Ubuntu), not from Windows PowerShell/CMD,
since the Rust/Noir toolchain expects a POSIX shell environment.

---

## Rung 4 — Other Linux VM or VPS

Use if Rungs 1–3 all fail for environment reasons unrelated to the commands
themselves (e.g. an unexpected corporate network filter that also blocks
`release-assets.githubusercontent.com` outside the Claude sandbox).

Any standard Ubuntu 22.04 or 24.04 VPS with Docker Engine installed will work:

```bash
# Install Docker Engine on Ubuntu
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
newgrp docker
docker --version
```

Then follow the same run steps as Rung 1.

---

## What Counts as PASS / PARTIAL / FAIL

### PASS (required for BatchGuard build work to begin)

All of the following must be true:
- [ ] `just e2e` (or equivalent manual steps) completes without error
- [ ] A Soroban contract is deployed — `.contract_id` file exists with a real contract ID
- [ ] A valid proof is submitted and the verifier contract returns a verification success
- [ ] A tampered/invalid proof is submitted to the same contract and the verifier returns rejection
- [ ] All four items above have real terminal output (not summarized, not paraphrased)
- [ ] Evidence label: `LOCAL` (localnet via Docker) or `LIVE` (public testnet)

### PARTIAL

- The verifier contract deploys but only the valid-proof path works (rejection not confirmed)
- OR the rejection path works but the acceptance path doesn't
- OR toolchain installs complete but `just e2e` fails with a recoverable error
- **Action on PARTIAL:** report it, attempt one repair iteration, then re-classify

### FAIL / BLOCKED_TECHNICAL

- Toolchain installation fails with a non-recoverable error
- OR Docker cannot be started in this environment (try Rung 2/3)
- OR Stellar testnet is unreachable AND Docker localnet also fails
- **Action on FAIL:** escalate to next rung; do not begin BatchGuard business logic

---

## Evidence to Capture and Paste Back

After running, paste back this block (fill in the real values):

```yaml
gate_1_escalation_result:
  rung_used: "Google Cloud Shell | GitHub Codespaces | Local Machine | Other"
  environment: "(e.g. Cloud Shell, Ubuntu 22.04, Docker 24.x)"
  classification: "PASS | PARTIAL | BLOCKED_TECHNICAL"
  evidence_label: "LOCAL | LIVE | LOCAL_STUB | BLOCKED"

  valid_proof:
    commands_run: |
      # paste the exact commands that produced the valid proof verification
    contract_id: "(value from .contract_id, e.g. CABC...1234)"
    tx_or_invocation_output: |
      # paste the stellar/soroban CLI invocation output
      # e.g. stellar contract invoke ... output showing verification success
    raw_output_excerpt: |
      # paste relevant lines from cloudshell-run.log

  invalid_proof:
    commands_run: |
      # paste the exact commands that tested the invalid/tampered proof
    tx_or_invocation_output: |
      # paste the contract invocation output showing rejection
    raw_output_excerpt: |
      # paste relevant lines

  blockers:
    # if PARTIAL or BLOCKED_TECHNICAL, list what failed and exact error output:
    - blocker: ""
      exact_error: ""

  preflight_log_summary: |
    # paste the last 20 lines of evidence/cloudshell-preflight.log
```

---

## After PASS — What Comes Next

Once a rung returns PASS, do NOT immediately begin coding BatchGuard's invoice
or payment-policy circuit. The OS requires this sequence:

1. Record the rung, commands, contract ID, and log excerpt in `HACKATHON-STATE.md`
   (delta-only, per evidence discipline)
2. Return the `gate_1_escalation_result` block to Claude OS for verification
3. Claude OS will run the DISTINCTION GATE (HACKATHON-DISTINCTION.md) to define
   and approve the BatchGuard ZK proof design before circuit implementation begins
4. Only after DISTINCTION GATE passes does circuit development begin

Do not merge any BatchGuard-specific code or modify the example circuits until
these steps are confirmed.
