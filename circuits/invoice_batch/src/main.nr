use dep::poseidon::poseidon2::Poseidon2;

fn compute_batch_commitment(
    invoice_0_amount: u32,
    invoice_1_amount: u32,
    invoice_2_amount: u32,
    invoice_3_amount: u32,
    vendor_0_risk: u32,
    vendor_1_risk: u32,
    vendor_2_risk: u32,
    vendor_3_risk: u32,
    batch_nonce: Field
) -> Field {
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
    invoice_0_amount: u32,
    invoice_1_amount: u32,
    invoice_2_amount: u32,
    invoice_3_amount: u32,

    vendor_0_risk: u32,
    vendor_1_risk: u32,
    vendor_2_risk: u32,
    vendor_3_risk: u32,

    batch_nonce: Field,

    per_invoice_limit: pub u32,
    batch_total_limit: pub u32,
    max_vendor_risk: pub u32,
    batch_commitment: pub Field
) {
    // Rule 1: no single invoice exceeds the public approval limit.
    assert(invoice_0_amount <= per_invoice_limit);
    assert(invoice_1_amount <= per_invoice_limit);
    assert(invoice_2_amount <= per_invoice_limit);
    assert(invoice_3_amount <= per_invoice_limit);

    // Rule 2: total batch exposure stays under the public batch limit.
    let total: u64 =
        (invoice_0_amount as u64) +
        (invoice_1_amount as u64) +
        (invoice_2_amount as u64) +
        (invoice_3_amount as u64);

    assert(total <= (batch_total_limit as u64));

    // Rule 3: all vendor risk scores are under the public risk threshold.
    assert(vendor_0_risk <= max_vendor_risk);
    assert(vendor_1_risk <= max_vendor_risk);
    assert(vendor_2_risk <= max_vendor_risk);
    assert(vendor_3_risk <= max_vendor_risk);

    // Rule 4: public commitment binds the hidden batch values.
    // Poseidon2 is a ZK-friendly cryptographic hash commitment.
    let computed_commitment: Field = compute_batch_commitment(
        invoice_0_amount,
        invoice_1_amount,
        invoice_2_amount,
        invoice_3_amount,
        vendor_0_risk,
        vendor_1_risk,
        vendor_2_risk,
        vendor_3_risk,
        batch_nonce
    );

    assert(computed_commitment == batch_commitment);
}
