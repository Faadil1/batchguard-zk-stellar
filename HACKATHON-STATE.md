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
- Valid rollup proof accepted by Soroban localnet.
- Tampered rollup proof rejected by the same Soroban contract.
- Contract ID: CDHTB4YVDV4Q4HZOMSN25URDWVCJI37F6QZMFACYH7YCVWAXOEET5NBY.
- Framing: aggregation-inspired multi-batch proof.
- Not claimed: recursive proof aggregation, zkRollup, production rollup, full shielded wallet.
