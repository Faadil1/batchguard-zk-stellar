# BatchGuard ZK — Technical Proof Summary

## Result

BatchGuard ZK successfully verifies a private invoice batch proof on Stellar Soroban localnet.

## What was proven

A private batch of 4 invoices satisfies public payment policy rules without revealing invoice amounts:

- each invoice amount is below the public per-invoice limit;
- total batch exposure is below the public batch limit;
- each vendor risk score is below the public risk threshold;
- the private batch matches a public commitment.

## Public policy

- per_invoice_limit: 2500
- batch_total_limit: 7000
- max_vendor_risk: 5
- batch_commitment: 5042103274

## Local Soroban verifier

- Contract ID: CAEQOYLJA2CAUMOX5KMRV27TAQDRGB2JR3AFVTI6KSNOBXKXNEF4KI3I
- Dataset: circuits/invoice_batch/target
- Public inputs size: 128 bytes
- Proof size: 14,592 bytes

## Valid proof result

The valid BatchGuard proof was accepted by the Soroban contract:

Proof successfully verified on-chain.

Performance report:

- CPU Instructions: 78,110,594
- Min Resource Fee: 881756 stroops
- Tx Envelope Size: 15,084 bytes

## Invalid proof result

A tampered BatchGuard proof was rejected by the same Soroban contract.

Tamper method:

- flipped the first byte of the proof file

Hashes:

- valid proof sha256: 4df740d112b97fc9acbe24a0e6b86d5f84bd4f145eeaf459c9f36e096e19d2f9
- tampered proof sha256: 121e68f26ab77b3466c032dff2f0df44e2ca9c57a9b810b671cc3755af7429d0

Observed rejection:

transaction simulation failed: HostError: Error(Contract, #4)

## Evidence label

LOCAL — executed in Google Cloud Shell against Stellar localnet.
