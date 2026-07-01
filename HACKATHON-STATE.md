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
