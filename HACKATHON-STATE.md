# BatchGuard ZK — Hackathon State

## Status

SUBMITTED_READY / TECHNICAL_CORE_FROZEN

## Product

BatchGuard ZK — Private Settlement Gate for Real-World Invoices on Stellar.

## Current positioning

Primary: Spicy — Private RWA Settlement.

Secondary: Medium — Confidential Payroll / Invoicing.

## Core proof

BatchGuard proves that a private batch of 4 invoices satisfies public payment policy rules without revealing invoice amounts or vendor risk scores.

## Gates

### Gate 1 — Soroban ZK verifier spike

PASS / LOCAL.

### Gate 2 — Product circuit

PASS / LOCAL.

### Gate 3 — Product proof on Soroban

PASS / LOCAL.

- Contract ID: CAEQOYLJA2CAUMOX5KMRV27TAQDRGB2JR3AFVTI6KSNOBXKXNEF4KI3I.
- Valid BatchGuard proof accepted on-chain.
- Tampered BatchGuard proof rejected on-chain.

## Freeze rule

The invoice_batch technical proof core is frozen. Any Wild upgrade must be additive and must not modify the proven core.


## Gate 4 — BatchGuard Rollup

PASS / LOCAL.

- Additive circuit: circuits/batchguard_rollup.
- One proof covers two private invoice batches.
- Valid rollup proof accepted by Soroban localnet and public Stellar testnet.
- Tampered rollup proof rejected by the same Soroban contract.
- Contract ID: CDHTB4YVDV4Q4HZOMSN25URDWVCJI37F6QZMFACYH7YCVWAXOEET5NBY.
- Framing: aggregation-inspired multi-batch proof.
- Not claimed: recursive proof aggregation, zkRollup, production rollup, full shielded wallet.


## Gate 5 — Public Stellar testnet

Status: PASS_TESTNET

Evidence commits:
- `61f0df9` — Add invoice batch public testnet evidence
- `0fb296b` — Add rollup public testnet evidence

Results:
- `invoice_batch` deployed to Stellar public testnet.
- `invoice_batch` valid proof accepted on Stellar public testnet.
- `invoice_batch` tampered proof rejected during Soroban testnet simulation with `HostError: Error(Contract, #4)`.
- `batchguard_rollup` deployed to Stellar public testnet.
- `batchguard_rollup` valid proof accepted on Stellar public testnet.
- `batchguard_rollup` tampered proof rejected during Soroban testnet simulation with `HostError: Error(Contract, #4)`.

Contract IDs:
- `invoice_batch`: `CDK5EJ3N6OROZL45PYGAAJLS53DUV2CZ7MXVUTF3PEAKMPU223UT6FG3`
- `batchguard_rollup`: `CDAKRLEFLMGUZAJST4Q6DR7PQYTFITXF42IXG3PFRNCCLLNZALAQWDCW`

Scope:
- Public Stellar testnet evidence, not mainnet.
- Hackathon proof-of-concept, not production readiness.
- BatchGuard Rollup is aggregation-inspired multi-batch verification, not recursive proof aggregation and not a zkRollup.
