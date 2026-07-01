# BatchGuard ZK — Private Invoice Settlement Gate on Stellar

BatchGuard ZK proves that a private batch of invoices satisfies payment policy rules without revealing invoice amounts or vendor risk scores, then verifies that proof with a Stellar Soroban smart contract.

## Challenge fit

Primary fit: Spicy — Private RWA settlement.

Secondary fit: Medium — Confidential payroll or invoicing.

Invoices are real-world financial obligations. BatchGuard shows how a private invoice batch can be checked against public payment rules before settlement, without exposing sensitive business data.

## What it proves

For a private batch of 4 invoices, BatchGuard proves:

- each invoice is below a public per-invoice approval limit;
- total batch exposure is below a public batch limit;
- each vendor risk score is below a public risk threshold;
- the hidden batch matches a public commitment;
- invoice amounts and vendor risk scores remain private.

## Public policy used in the demo

- per_invoice_limit: 2500
- batch_total_limit: 7000
- max_vendor_risk: 5
- batch_commitment: 5042103274

## Technical result

Executed locally in Google Cloud Shell against Stellar localnet.

- ZK stack: Noir + UltraHonk / Barretenberg
- Verifier: Stellar Soroban smart contract
- Product circuit: circuits/invoice_batch
- Contract ID: CAEQOYLJA2CAUMOX5KMRV27TAQDRGB2JR3AFVTI6KSNOBXKXNEF4KI3I
- Proof size: 14,592 bytes
- Public inputs size: 128 bytes
- CPU instructions: 78,110,594
- Min resource fee: 881756 stroops

## Evidence

Valid BatchGuard proof accepted on-chain:

Proof successfully verified on-chain!

Tampered BatchGuard proof rejected by the same contract:

transaction simulation failed: HostError: Error(Contract, #4)

Evidence files:

- evidence/TECHNICAL-PROOF-SUMMARY.md
- evidence/gate-1-final-result.yaml
- evidence/gate-2-final-result.yaml
- evidence/gate-3-final-result.yaml
- evidence/gate3-valid-invoice-batch-onchain.log
- evidence/gate3-invalid-invoice-batch-onchain.log
- evidence/artifacts/invoice_batch/
- evidence/artifacts/contracts/rs_soroban_ultrahonk.wasm

## Run locally

Required tools:

- Stellar CLI
- Rust / Cargo
- Noir nargo
- Barretenberg bb
- Docker
- Node.js / npm
- just

Run:

1. just setup
2. just build-circuits invoice_batch
3. docker rm -f stellar-local 2>/dev/null || true
4. just start
5. just fund
6. just deploy
7. just verify "$(cat .contract_id)"

The project defaults DATASET_DIR to circuits/invoice_batch/target, so deploy and verify use the BatchGuard circuit artifacts.

## Scope note

This is a hackathon proof-of-concept, not production audit software. It demonstrates the core real-world ZK path: private invoice batch policy proof verified by a Stellar Soroban smart contract.
