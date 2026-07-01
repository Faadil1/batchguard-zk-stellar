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
| Soroban verifier deployed on Stellar public testnet for invoice_batch | TESTNET_VERIFIED | evidence/gate-5-testnet/invoice-batch-testnet-result.yaml |
| Valid invoice_batch proof accepted by Soroban public testnet | TESTNET_VERIFIED | evidence/gate-5-testnet/invoice-batch-testnet.log |
| Tampered invoice_batch proof rejected during Soroban public testnet simulation | TESTNET_VERIFIED | evidence/gate-5-testnet/invoice-batch-testnet.log |
| BatchGuard Rollup proof accepted by Soroban public testnet | TESTNET_VERIFIED | evidence/gate-5-testnet/rollup-testnet-result.yaml |
| Tampered BatchGuard Rollup proof rejected during Soroban public testnet simulation | TESTNET_VERIFIED | evidence/gate-5-testnet/rollup-testnet.log |
| Mainnet deployment | ROADMAP_ONLY | — |
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
- Valid rollup proof accepted by Stellar Soroban public testnet
- Tampered rollup proof rejected by the same Soroban contract
- Rollup contract ID: CDAKRLEFLMGUZAJST4Q6DR7PQYTFITXF42IXG3PFRNCCLLNZALAQWDCW

Evidence: evidence/gate-5-testnet/rollup-testnet-result.yaml


## Live UI

BatchGuard Settlement Console: https://faadil1.github.io/batchguard-zk-stellar/


## Gate 5 — Public Stellar testnet evidence

BatchGuard ZK now includes public Stellar testnet evidence for both proof paths:

- Core `invoice_batch`: valid proof accepted by Soroban public testnet.
- Core `invoice_batch`: tampered proof rejected during Soroban public testnet simulation.
- BatchGuard Rollup: valid multi-batch proof accepted by Soroban public testnet.
- BatchGuard Rollup: tampered rollup proof rejected during Soroban public testnet simulation.

Contract IDs:

- `invoice_batch`: `CDK5EJ3N6OROZL45PYGAAJLS53DUV2CZ7MXVUTF3PEAKMPU223UT6FG3`
- `batchguard_rollup`: `CDAKRLEFLMGUZAJST4Q6DR7PQYTFITXF42IXG3PFRNCCLLNZALAQWDCW`

Scope:

- Public testnet, not mainnet.
- Hackathon proof-of-concept, not production readiness.
- BatchGuard Rollup is aggregation-inspired multi-batch verification, not recursive proof aggregation and not a zkRollup.
