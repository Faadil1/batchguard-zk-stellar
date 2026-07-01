// BatchGuard Rollup - aggregation-inspired multi-batch settlement proof.
// This is NOT recursive aggregation and NOT a zkRollup.
// It proves two private invoice batches satisfy policy in one proof.

use dep::poseidon::poseidon2::Poseidon2;

fn batch_commitment(
    invoice_0_amount: u32,
    invoice_1_amount: u32,
    invoice_2_amount: u32,
    invoice_3_amount: u32,
    vendor_0_risk: u32,
    vendor_1_risk: u32,
    vendor_2_risk: u32,
    vendor_3_risk: u32,
    batch_nonce: Field,
    per_invoice_limit: u32,
    batch_total_limit: u32,
    max_vendor_risk: u32
) -> Field {
    assert(invoice_0_amount <= per_invoice_limit);
    assert(invoice_1_amount <= per_invoice_limit);
    assert(invoice_2_amount <= per_invoice_limit);
    assert(invoice_3_amount <= per_invoice_limit);

    let total: u64 =
        (invoice_0_amount as u64) +
        (invoice_1_amount as u64) +
        (invoice_2_amount as u64) +
        (invoice_3_amount as u64);

    assert(total <= (batch_total_limit as u64));

    assert(vendor_0_risk <= max_vendor_risk);
    assert(vendor_1_risk <= max_vendor_risk);
    assert(vendor_2_risk <= max_vendor_risk);
    assert(vendor_3_risk <= max_vendor_risk);

    Poseidon2::hash([
        invoice_0_amount as Field,
        invoice_1_amount as Field,
        invoice_2_amount as Field,
        invoice_3_amount as Field,
        vendor_0_risk as Field,
        vendor_1_risk as Field,
        vendor_2_risk as Field,
        vendor_3_risk as Field,
        batch_nonce
    ], 9)
}

fn main(
    a_invoice_0_amount: u32,
    a_invoice_1_amount: u32,
    a_invoice_2_amount: u32,
    a_invoice_3_amount: u32,
    a_vendor_0_risk: u32,
    a_vendor_1_risk: u32,
    a_vendor_2_risk: u32,
    a_vendor_3_risk: u32,
    a_batch_nonce: Field,

    b_invoice_0_amount: u32,
    b_invoice_1_amount: u32,
    b_invoice_2_amount: u32,
    b_invoice_3_amount: u32,
    b_vendor_0_risk: u32,
    b_vendor_1_risk: u32,
    b_vendor_2_risk: u32,
    b_vendor_3_risk: u32,
    b_batch_nonce: Field,

    per_invoice_limit: pub u32,
    batch_total_limit: pub u32,
    max_vendor_risk: pub u32,
    rollup_commitment: pub Field
) {
    let a_commitment: Field = batch_commitment(
        a_invoice_0_amount,
        a_invoice_1_amount,
        a_invoice_2_amount,
        a_invoice_3_amount,
        a_vendor_0_risk,
        a_vendor_1_risk,
        a_vendor_2_risk,
        a_vendor_3_risk,
        a_batch_nonce,
        per_invoice_limit,
        batch_total_limit,
        max_vendor_risk
    );

    let b_commitment: Field = batch_commitment(
        b_invoice_0_amount,
        b_invoice_1_amount,
        b_invoice_2_amount,
        b_invoice_3_amount,
        b_vendor_0_risk,
        b_vendor_1_risk,
        b_vendor_2_risk,
        b_vendor_3_risk,
        b_batch_nonce,
        per_invoice_limit,
        batch_total_limit,
        max_vendor_risk
    );

    let computed_rollup: Field = Poseidon2::hash([a_commitment, b_commitment], 2);
    assert(computed_rollup == rollup_commitment);
}
