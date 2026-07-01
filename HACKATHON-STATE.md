# BatchGuard ZK — Hackathon State

## Status

SUBMITTED_READY / TECHNICAL_CORE_FROZEN

## Product

BatchGuard ZK — Private Invoice Settlement Gate on Stellar.

## Core proof

BatchGuard proves that a private batch of 4 invoices satisfies public payment policy rules without revealing invoice amounts or vendor risk scores.

## Gates

### Gate 1 — Soroban ZK verifier spike

PASS / LOCAL

- UltraHonk proof accepted by Stellar Soroban localnet.
- Tampered proof rejected by the same contract.

### Gate 2 — Product circuit

PASS / LOCAL

- Circuit: invoice_batch.
- Valid batch proof generated.
- Noir test passed.
- Invalid invoice amount rejected during witness/proof generation.

### Gate 3 — Product proof on Soroban

PASS / LOCAL

- Contract ID: CAEQOYLJA2CAUMOX5KMRV27TAQDRGB2JR3AFVTI6KSNOBXKXNEF4KI3I.
- Valid BatchGuard proof accepted on-chain.
- Tampered BatchGuard proof rejected on-chain.

## Freeze rule

The technical proof core is frozen. Only README, evidence packaging, demo script, and submission materials should be changed unless a blocking issue is found.
