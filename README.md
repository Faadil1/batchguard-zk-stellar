# BatchGuard ZK — Private Settlement Gate for Real-World Invoices on Stellar

Stellar is a settlement network for financial institutions and tokenized assets. BatchGuard ZK is a private settlement gate: it lets a business prove that a hidden batch of real-world invoices satisfies payment-policy rules without revealing invoice amounts or vendor risk scores, and a Stellar Soroban smart contract accepts or rejects settlement based only on the proof.

No invoice data touches the chain. Only the proof, public policy parameters, and a public batch commitment do.

## Why this matters for real-world assets

Invoices are real-world financial obligations. When they are tokenized or settled on Stellar, settlement decisions often require either full disclosure or trusted off-chain checks. BatchGuard replaces that trust assumption with a ZK proof verified by Soroban.

## Challenge fit

Primary: Spicy — Private RWA Settlement.

Invoices are receivables. Proving a private invoice batch satisfies policy before Stellar settlement is a direct real-world asset use case: private, verifiable, and chain-enforced.

Secondary: Medium — Confidential Payroll / Invoicing.

The same pattern applies to any private batch of financial obligations with threshold constraints.

## What the proof guarantees

For a private batch of 4 invoices, the Noir circuit proves that:

1. Every invoice is below a public per-invoice approval ceiling.
2. The total batch exposure is below a public batch limit.
3. Every vendor risk score is below a public risk threshold.
4. The private batch matches a public commitment.

The policy parameters are public inputs. The invoice amounts and vendor risk scores are private witnesses.

## Demo policy

| Parameter | Value |
|---|---:|
| per_invoice_limit | 2500 |
| batch_total_limit | 7000 |
| max_vendor_risk | 5 |
| batch_commitment | 5042103274 |

## Technical stack

| Component | Value |
|---|---|
| ZK system | Noir + UltraHonk / Barretenberg |
| On-chain verifier | Stellar Soroban smart contract |
| Circuit | circuits/invoice_batch |
| Network | Stellar localnet in Google Cloud Shell |
| Contract ID | CAEQOYLJA2CAUMOX5KMRV27TAQDRGB2JR3AFVTI6KSNOBXKXNEF4KI3I |
| Proof size | 14,592 bytes |
| Public inputs | 128 bytes |
| CPU instructions | 78,110,594 |
| Min resource fee | 881,756 stroops |

## Proven result

Valid invoice_batch proof accepted by Soroban:

Proof successfully verified on-chain!

Tampered invoice_batch proof rejected by the same contract:

transaction simulation failed: HostError: Error(Contract, #4)

## Honest scope notes

- Executed on Stellar localnet, not public testnet or mainnet.
- Evidence is labeled LOCAL.
- The batch commitment is a field-arithmetic weighted sum. It is demo-suitable, not production collision-resistant. A production version should use a ZK-friendly hash such as Poseidon or Pedersen.
- No recursion, no true proof aggregation, no cross-chain bridge, and no full shielded wallet are claimed.

## Evidence files

| File | Contents |
|---|---|
| evidence/TECHNICAL-PROOF-SUMMARY.md | High-level proof summary |
| evidence/gate-2-final-result.yaml | Circuit proof generation and invalid witness rejection |
| evidence/gate-3-final-result.yaml | Soroban verification summary |
| evidence/gate3-valid-invoice-batch-onchain.log | Valid proof accepted |
| evidence/gate3-invalid-invoice-batch-onchain.log | Tampered proof rejected |
| evidence/artifacts/invoice_batch/ | proof, vk, public inputs, generated fields |


## Wild-adjacent extension: BatchGuard Rollup

BatchGuard Rollup is an additive extension that proves two private invoice batches in one proof.

This is not recursive proof aggregation and not a zkRollup. It is an aggregation-inspired multi-batch settlement proof: one Noir circuit checks two private batches, one UltraHonk proof is generated, and one Stellar Soroban verifier call accepts or rejects that proof.

Gate 4 result:

| Claim | Status |
|---|---|
| batchguard_rollup circuit test | PASS / LOCAL |
| rollup proof generated | PASS / LOCAL |
| invalid rollup witness rejected | PASS / LOCAL |
| valid rollup proof accepted by Soroban | PASS / LOCAL |
| tampered rollup proof rejected by Soroban | PASS / LOCAL |

Rollup contract ID:

CDHTB4YVDV4Q4HZOMSN25URDWVCJI37F6QZMFACYH7YCVWAXOEET5NBY

Evidence:

- evidence/gate-4-rollup-result.yaml
- evidence/gate4-rollup-nargo-test.log
- evidence/gate4-rollup-build.log
- evidence/gate4-rollup-invalid-witness.log
- evidence/gate4-rollup-valid-onchain-2.log
- evidence/gate4-rollup-invalid-onchain.log
- evidence/artifacts/batchguard_rollup/

## Wild roadmap

| Feature | Status |
|---|---|
| Multi-batch settlement proof | ROADMAP_ONLY unless implemented in circuits/batchguard_rollup |
| Production hash commitment | ROADMAP_ONLY |
| Testnet/mainnet deployment | ROADMAP_ONLY |
| Auditor selective disclosure | ROADMAP_ONLY |

## Reproduce locally

Requirements: Stellar CLI, Rust/Cargo, Noir nargo, Barretenberg bb, Docker, Node.js/npm, just.

Run:

1. just setup
2. just build-circuits invoice_batch
3. docker rm -f stellar-local 2>/dev/null || true
4. just start
5. just fund
6. just deploy
7. just verify "$(cat .contract_id)"

DATASET_DIR defaults to circuits/invoice_batch/target, so deploy and verify use the BatchGuard circuit artifacts automatically.
