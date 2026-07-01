# BatchGuard ZK — Submission

## Project in one sentence

BatchGuard ZK is a private settlement gate for real-world invoices on Stellar: a Soroban smart contract enforces payment policy by verifying a ZK proof, not by reading invoice amounts.

## Challenge fit

Primary: Spicy — Private RWA Settlement.

Invoices are real-world financial obligations. BatchGuard shows how they can be settled or approved on Stellar without revealing amounts on-chain.

Secondary: Medium — Confidential Payroll / Invoicing.

## What is proven

A private batch of 4 invoices satisfies payment policy rules — per-invoice ceiling, batch total cap, and vendor risk threshold — and matches a public commitment, without the Soroban contract or any on-chain observer seeing the invoice amounts.

## Technical result

| Claim | Status | Evidence |
|---|---|---|
| Noir circuit compiles and test passes | IMPLEMENTED_AND_TESTED | evidence/gate-2-final-result.yaml |
| Invalid witness rejected at circuit level | IMPLEMENTED_AND_TESTED | evidence/gate-2-final-result.yaml |
| Soroban verifier deployed on localnet | LOCAL_ONLY | evidence/gate-3-final-result.yaml |
| Valid proof accepted by Soroban | LOCAL_ONLY | evidence/gate3-valid-invoice-batch-onchain.log |
| Tampered proof rejected by Soroban | LOCAL_ONLY | evidence/gate3-invalid-invoice-batch-onchain.log |
| Public testnet or mainnet deployment | ROADMAP_ONLY | — |
| Recursive or aggregated proofs | ROADMAP_ONLY | — |

## Public inputs

- per_invoice_limit: 2500
- batch_total_limit: 7000
- max_vendor_risk: 5
- batch_commitment: 5042103274
- Contract ID: CAEQOYLJA2CAUMOX5KMRV27TAQDRGB2JR3AFVTI6KSNOBXKXNEF4KI3I

## Honest scope

BatchGuard is a hackathon proof-of-concept. The commitment scheme, deployment environment, and batch size are demo-appropriate. The core technical claim is real: a Stellar Soroban contract verifies a Noir UltraHonk proof that a private invoice batch satisfies payment policy.

## Wild extension path

The next additive upgrade is BatchGuard Rollup: an aggregation-inspired multi-batch circuit where one proof covers two private invoice batches. This is not claimed unless implemented and tested.


## Wild-adjacent extension implemented: BatchGuard Rollup

BatchGuard Rollup extends the core invoice settlement gate from one private invoice batch to two private invoice batches in one proof.

This is honestly framed as an aggregation-inspired multi-batch proof, not recursion and not a zkRollup.

Implemented result:

- New circuit: circuits/batchguard_rollup
- One proof covers two private invoice batches
- Invalid rollup witness rejected during proof generation
- Valid rollup proof accepted by Stellar Soroban localnet
- Tampered rollup proof rejected by the same Soroban contract
- Rollup contract ID: CDHTB4YVDV4Q4HZOMSN25URDWVCJI37F6QZMFACYH7YCVWAXOEET5NBY

Evidence: evidence/gate-4-rollup-result.yaml


## Live UI

BatchGuard Settlement Console: https://faadil1.github.io/batchguard-zk-stellar/
