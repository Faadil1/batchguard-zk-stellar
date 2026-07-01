# GATE 1 — Soroban ZK Verifier Spike — Full Attempt Log

**Project:** BatchGuard ZK — Stellar Hacks: Real-World ZK
**Loop:** `technical_spike_repair`
**Max attempts:** 3
**Attempts used:** 3
**Classification:** `BLOCKED_TECHNICAL`
**Date:** 2026-06-29
**Environment:** Claude sandboxed bash tool, Ubuntu 24.04.4 LTS

---

## 1. Environment Survey

Performed before any installation or clone attempt.

```bash
$ which cargo rustc nargo bb docker soroban stellar
# (all commands returned empty — none pre-installed)

$ node --version
(via which node /usr/bin/node — present)

$ npm --version
(via which npm /usr/bin/npm — present)

$ cat /etc/os-release | head -3
PRETTY_NAME="Ubuntu 24.04.4 LTS"
NAME="Ubuntu"
VERSION_ID="24.04"
```

**Findings:** Only Node and npm pre-installed. No Rust, no Docker, no Soroban
CLI, no Noir, no Barretenberg.

---

## 2. G2 Connectivity Probe

Performed before committing to any full installation path.

```bash
# GitHub source access
$ curl -sS -o /dev/null -w "HTTP_STATUS:%{http_code}\n" --max-time 8 \
    https://github.com/NethermindEth/rs-soroban-ultrahonk
HTTP_STATUS:200  ✓

# Tarball download endpoint
$ curl -sS -o /dev/null -w "HTTP_STATUS:%{http_code}\n" --max-time 8 \
    https://codeload.github.com/NethermindEth/rs-soroban-ultrahonk/tar.gz/refs/heads/main
HTTP_STATUS:200  ✓

# Raw file access
$ curl -sS -o /dev/null -w "HTTP_STATUS:%{http_code}\n" --max-time 8 \
    https://raw.githubusercontent.com/NethermindEth/rs-soroban-ultrahonk/main/README.md
HTTP_STATUS:200  ✓

# crates.io (no User-Agent — 403 is a UA enforcement, not a true block)
$ curl -sS -o /dev/null -w "HTTP_STATUS:%{http_code}\n" --max-time 8 \
    https://crates.io/api/v1/crates/soroban-sdk
HTTP_STATUS:403  (false alarm — resolved below)

# crates.io with User-Agent (cargo sends its own; this simulates real cargo behavior)
$ curl -sS -A "Mozilla/5.0" -o /dev/null -w "HTTP_STATUS:%{http_code}\n" --max-time 8 \
    https://crates.io/api/v1/crates/soroban-sdk
HTTP_STATUS:200  ✓ (crates.io is reachable for real cargo builds)

# static.crates.io (crate download endpoint)
$ curl -sS -o /dev/null -w "HTTP_STATUS:%{http_code}\n" --max-time 8 \
    https://static.crates.io/
HTTP_STATUS:200  ✓

# rustup / Rust toolchain installer — BLOCKED
$ curl -sS -o /dev/null -w "HTTP_STATUS:%{http_code}\n" --max-time 8 \
    https://static.rust-lang.org/rustup/rustup-init.sh
HTTP_STATUS:403  ✗ NOT IN ALLOWLIST

# noirup binary download — follows redirect to blocked CDN
$ curl -sSL -o /tmp/noirup \
    -w "FINAL_HTTP_STATUS:%{http_code}\nFINAL_URL:%{url_effective}\n" \
    "https://github.com/noir-lang/noirup/releases/latest/download/noirup"
FINAL_HTTP_STATUS:403
FINAL_URL:https://release-assets.githubusercontent.com/...  ✗ NOT IN ALLOWLIST

# Stellar testnet RPC
$ curl -sS -o /dev/null -w "HTTP_STATUS:%{http_code}\n" --max-time 8 \
    https://soroban-testnet.stellar.org
HTTP_STATUS:403  ✗ NOT IN ALLOWLIST

# Stellar Horizon testnet
$ curl -sS -o /dev/null -w "HTTP_STATUS:%{http_code}\n" --max-time 8 \
    https://horizon-testnet.stellar.org
HTTP_STATUS:403  ✗ NOT IN ALLOWLIST

# Stellar friendbot
$ curl -sS -o /dev/null -w "HTTP_STATUS:%{http_code}\n" --max-time 8 \
    https://friendbot.stellar.org
HTTP_STATUS:403  ✗ NOT IN ALLOWLIST
```

**Probe summary:** GitHub source/clone + crates.io package infrastructure are
reachable. Everything Stellar-network-specific and all GitHub release-asset
binary downloads are hard-blocked.

---

## 3. Repo Inspection

```bash
$ git clone --depth 1 https://github.com/NethermindEth/rs-soroban-ultrahonk.git
Cloning into 'rs-soroban-ultrahonk'...
```

**Repo structure (confirmed real):**
```
rs-soroban-ultrahonk/
├── Cargo.toml / Cargo.lock
├── README.md
├── justfile
├── circuits/
│   ├── simple_circuit/  (src/main.nr, Nargo.toml, Prover.toml — NO target/ dir)
│   ├── small_circuit/
│   ├── fib_chain/
│   ├── identity/
│   ├── lookup_heavy/
│   ├── many_pubs/
│   ├── range_heavy/
│   ├── tornado/
│   └── scripts/
├── contracts/
│   ├── rs-soroban-ultrahonk/   ← the Soroban verifier contract
│   ├── identity/
│   └── tornado_classic/
├── crates/
│   ├── ultrahonk-soroban-verifier/
│   └── test-utils/
└── scripts/
    ├── run_localnet_e2e.sh
    ├── run_testnet_e2e.sh
    ├── start_stellar.sh / stop_stellar.sh
    ├── deploy.sh / verify.sh / fund_account.sh
    └── invoke_ultrahonk/ (Node.js helper)
```

**Key finding:** No pre-built circuit artifacts exist (`target/` directories
absent under any `circuits/` subdirectory). The README explicitly states:
"You must build the circuits first before running tests: `just build-circuits`".
There is no bypass for the Noir/Barretenberg toolchain requirement.

**Documented requirements (from README):**
1. Rust via `rustup` + `rustup target add wasm32v1-none`
2. `cargo install --locked stellar-cli@^3.2.0`
3. Noir `1.0.0-beta.9` via `noirup`
4. Barretenberg `0.87.0` via `bbup`
5. Docker (for `stellar container start` Standalone Network)
6. `just` task runner
7. Node.js + npm (for `scripts/invoke_ultrahonk`)

---

## 4. Attempt 1 — Noir/UltraHonk, Primary Documented Localnet Path

### 4a. Rust toolchain — apt fallback

```bash
# rustup blocked → fall back to apt
$ apt-get install -y rustc cargo
# ... (dependency installs) ...
Setting up rustc (1.75.0+dfsg0ubuntu1-0ubuntu7.4) ...
Setting up cargo (1.75.0+dfsg0ubuntu1-0ubuntu7.4) ...

$ cargo --version && rustc --version
cargo 1.75.0
rustc 1.75.0 (82e1608df 2023-12-21) (built from a source tarball)
```

### 4b. wasm32v1-none target — ABSENT

```bash
$ rustc --print target-list | grep wasm32v1
(empty output)
```

`wasm32v1-none` was introduced after Rust 1.75. It cannot be added without
`rustup`, which is blocked. This target is mandatory for building Soroban
contracts (`cargo build --target wasm32v1-none`).

### 4c. stellar-cli — version conflict then compile timeout

```bash
# README's pinned version does not exist on crates.io
$ cargo install --locked stellar-cli@^3.2.0
error: could not find `stellar-cli` in registry `crates-io` with version `^3.2.0`

# Latest version requires a newer Rust compiler
$ cargo install --locked stellar-cli
error: cannot install package `stellar-cli 27.0.0`, it requires rustc 1.93.0 or
newer, while the currently active rustc version is 1.75.0
`stellar-cli 21.1.1` supports rustc 1.74.0

# Compatible version — compiles (crates.io reachable) but exceeds per-call time limit
$ cargo install --locked stellar-cli@21.1.1
   Compiling stellar-xdr v21.1.0
   Compiling darling v0.20.9
   Compiling stellar-strkey v0.0.8
   # ... (hundreds of crates) ...
   # TOOL EXECUTION TIMEOUT — process killed by sandbox wall-clock limit
```

Retried twice more with incremental cache (761+ rlibs accumulated total).
Build was progressing genuinely, not stuck, but never completed within any
single tool-call execution window. No background process survives between
calls in this sandbox.

### 4d. Noir binary (noirup) — BLOCKED

```bash
# Installer script itself is reachable (raw.githubusercontent.com is allowlisted)
$ curl -sS https://raw.githubusercontent.com/noir-lang/noirup/main/install | head -10
#!/usr/bin/env bash
NOIRUP_BIN_URL="https://github.com/noir-lang/noirup/releases/latest/download/noirup"
# ...

# Actual binary download follows redirect to blocked CDN
$ curl -sSL -o /tmp/noirup \
    -w "FINAL_HTTP_STATUS:%{http_code}\nFINAL_URL:%{url_effective}\n" \
    "https://github.com/noir-lang/noirup/releases/latest/download/noirup"
FINAL_HTTP_STATUS:403
FINAL_URL:https://release-assets.githubusercontent.com/github-production-release-asset/...
```

### 4e. Barretenberg binary (bbup) — BLOCKED (same mechanism)

```bash
# Confirmed by reading bbup source script:
$ curl -sS https://raw.githubusercontent.com/AztecProtocol/aztec-packages/master/barretenberg/cpp/installation/bbup | grep RELEASE_URL
RELEASE_URL="https://github.com/${BBUP_REPO}/releases/download/${BBUP_TAG}"
BIN_TARBALL_URL="${RELEASE_URL}/barretenberg-${ARCHITECTURE}-${PLATFORM}.tar.gz"
# Same blocked CDN path — download would fail identically to noirup
```

### 4f. Docker — NOT AVAILABLE

```bash
$ which docker
(empty)
$ docker ps
/bin/sh: docker: not found
```

Docker is not installed and cannot be started as a daemon in this sandboxed
tool environment. This eliminates the localnet path entirely.

**Attempt 1 verdict: BLOCKED_TECHNICAL.** Multiple independent causes:
Docker absent, Noir/Barretenberg blocked by CDN, stellar-cli compile
doesn't complete, testnet endpoints all blocked.

---

## 5. Attempt 2 — Repair / Simplified Variant of Noir Path

**Question asked:** Can we skip proof generation using pre-built circuit
artifacts from the repo, and test only the verification step?

**Finding:** No — the repo ships only source files. The `target/` directories
(containing compiled proof, VK, and witness artifacts) do not exist in the
repo. The README and integration tests explicitly require running
`just build-circuits` first, which invokes `nargo` and `bb` — both blocked.

**Secondary question:** Is there any other Soroban ZK verifier example repo
that ships pre-built proof artifacts we could use?

**Conclusion:** Not found via inspection. Any Soroban verifier execution
(regardless of which proof system generated the proof) still requires
deploying a compiled `.wasm` contract, which requires `wasm32v1-none` +
`stellar-cli` — both blocked. This path is independently blocked from the
contract-execution side even if proof artifacts existed.

**Attempt 2 verdict: BLOCKED_TECHNICAL.** Simplified path does not exist;
the terminal blocker is on the contract-execution side, not the
proof-generation side.

---

## 6. Attempt 3 — Circom + Groth16 Fallback Analysis

Per the gate's loop allocation (Attempt 3 → Circom/Groth16 fallback).

```bash
# snarkjs (Groth16 proof generation, JS) — reachable
$ npm view snarkjs version
0.7.6  ✓

# circom npm package — old deprecated JS implementation, not modern 2.x
$ npm view circom version
0.5.46 (old version — not the Circom 2.x compiler)

# Modern Circom 2.x — not on crates.io
$ curl -A "Mozilla/5.0" https://crates.io/api/v1/crates/circom
{"errors":[{"detail":"crate `circom` does not exist"}]}

# Circom 2.x source is buildable from git (github.com is allowlisted)
$ curl -o /dev/null -w "HTTP_STATUS:%{http_code}\n" https://github.com/iden3/circom.git
HTTP_STATUS:301  ✓ (git clone would work)
# BUT: cargo install --git https://github.com/iden3/circom.git would have
# the same compile-time-exceeds-tool-window problem as stellar-cli
```

**Critical finding:** Even if Circom 2.x were installed and snarkjs used to
generate a Groth16 proof, the Circom path shares the **identical terminal
blocker** as the Noir path: the final step is submitting the proof to a
Soroban verifier contract, which requires Docker (localnet) or testnet
(blocked) or stellar-cli + wasm32v1-none (blocked). Switching from
Noir/UltraHonk to Circom/Groth16 changes the proof format but does not
change the Soroban execution requirement at the end.

**Attempt 3 verdict: BLOCKED_TECHNICAL.** Fallback path shares the same
root-cause blocker. Confirmed by analysis rather than full installation
attempt, per evidence discipline (continuing to attempt an install that
leads to the same confirmed dead end would not produce new evidence).

---

## 7. Root Cause Diagram

```
Noir/UltraHonk  ──────┐
                      │  Both paths converge here:
Circom/Groth16  ──────┤  Soroban contract deploy + invoke
                      │
                      ▼
         Requires ONE of the following:
         ┌─────────────────────────────────────────────┐
         │ (a) Docker daemon                           │
         │     → NOT AVAILABLE (no docker binary)      │
         │                                             │
         │ (b) Public Stellar testnet                  │
         │     RPC / Horizon / friendbot               │
         │     → HTTP 403 (not in network allowlist)   │
         │                                             │
         │ (c) stellar-cli + wasm32v1-none target      │
         │     → stellar-cli: compile timeout          │
         │     → wasm32v1-none: not in apt rustc 1.75  │
         │     → rustup: HTTP 403 (not allowlisted)    │
         └─────────────────────────────────────────────┘
         All three paths independently blocked.
         This is a sandboxed environment constraint only.
```

---

## 8. Final Classification

```yaml
gate_1_result:
  path_used: NOIR_ULTRAHONK       # attempted as primary per gate instruction
  fallback_evaluated: CIRCOM_GROTH16  # shares same terminal blocker — see Section 6
  attempts_used: 3
  classification: BLOCKED_TECHNICAL
  environment_constraint: true    # not a project or toolchain defect
  fabricated_evidence: NONE
  valid_proof_result: NOT_IMPLEMENTED
  invalid_proof_result: NOT_IMPLEMENTED
  contract_id: NONE
  tx_hash: NONE
  recommended_next_action: >
    Re-run in Google Cloud Shell (Docker available, unrestricted egress).
    Use scripts/preflight_cloudshell.sh to verify environment, then
    scripts/run_gate1_cloudshell.sh for the full automated spike.
```
