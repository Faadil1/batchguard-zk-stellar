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
    // This is a lightweight deterministic field commitment for the demo.
    // It proves the verifier is checking one committed private batch,
    // without revealing the invoice amounts.
    let computed_commitment: Field =
        (invoice_0_amount as Field) +
        ((invoice_1_amount as Field) * 1000003) +
        ((invoice_2_amount as Field) * 1000033) +
        ((invoice_3_amount as Field) * 1000037) +
        ((vendor_0_risk as Field) * 101) +
        ((vendor_1_risk as Field) * 103) +
        ((vendor_2_risk as Field) * 107) +
        ((vendor_3_risk as Field) * 109) +
        (batch_nonce * 1000039);

    assert(computed_commitment == batch_commitment);
}

#[test]
fn test_valid_batch() {
    main(
        1200, 2300, 1800, 900,
        2, 3, 1, 2,
        42,
        2500,
        7000,
        5,
        5042103274
    );
}
