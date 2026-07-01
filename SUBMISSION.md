# BatchGuard ZK — Submission Summary

BatchGuard ZK is a private invoice settlement gate for Stellar.

It lets a business prove that a hidden batch of invoices satisfies payment policy before settlement, without revealing individual invoice amounts or vendor risk scores.

## Challenge fit

Primary inspiration category: Spicy — Private RWA settlement.

Secondary inspiration category: Medium — Confidential payroll or invoicing.

Invoices are real-world financial obligations. BatchGuard shows how a private invoice batch can be checked against public payment rules before settlement.

## Demo result

- Product circuit: invoice_batch
- Valid proof: accepted on Stellar Soroban localnet
- Tampered proof: rejected by the same contract
- Contract ID: CAEQOYLJA2CAUMOX5KMRV27TAQDRGB2JR3AFVTI6KSNOBXKXNEF4KI3I

## Public policy

- Per-invoice limit: 2500
- Batch total limit: 7000
- Max vendor risk: 5
- Batch commitment: 5042103274

## Scope note

The prototype does not claim to be a full shielded payment system. It proves the core settlement gate: a Stellar Soroban contract verifies a ZK proof that a hidden invoice batch satisfies policy.

## Evidence

See evidence/TECHNICAL-PROOF-SUMMARY.md.
