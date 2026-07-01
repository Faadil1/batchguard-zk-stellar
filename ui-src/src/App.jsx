// BatchGuard Settlement Console
// All data sourced from real evidence files:
//   evidence/gate-3-final-result.yaml   -> invoice_batch proof
//   evidence/gate-4-rollup-result.yaml  -> batchguard_rollup proof
// Evidence labels: LOCAL_ONLY (Stellar Standalone Network, Google Cloud Shell)

const SINGLE = {
  contractId: 'CAEQOYLJA2CAUMOX5KMRV27TAQDRGB2JR3AFVTI6KSNOBXKXNEF4KI3I',
  proofSize: '14,592',
  publicInputsSize: '128',
  cpuPct: '78.1',
  minFee: '881,756',
  txHash: 'f5d12685edcb63edc5d89cf64b93b219feea1933a20858ad1c6addbcd721805f',
  policy: { perInvoiceLimit: '2,500', batchTotalLimit: '7,000', maxVendorRisk: '5', batchCommitment: '5,042,103,274' },
};

const ROLLUP = {
  contractId: 'CDHTB4YVDV4Q4HZOMSN25URDWVCJI37F6QZMFACYH7YCVWAXOEET5NBY',
  proofSize: '14,592',
  txHash: 'e7e1cee2b8359665d21a82a5e1afddbf3366bd6fec556dba08738bdd2e0e6f91',
  policy: { perInvoiceLimit: '2,500', batchTotalLimit: '7,000', maxVendorRisk: '5', rollupCommitment: '4,799,043,355,065,008' },
};

function NavBar() {
  return (
    <nav className="nav">
      <div className="nav-logo">
        <div className="nav-mark">
          <svg viewBox="0 0 14 14" fill="none">
            <rect x="1" y="1" width="5" height="5" rx="1" fill="#050505"/>
            <rect x="8" y="1" width="5" height="5" rx="1" fill="#050505"/>
            <rect x="1" y="8" width="5" height="5" rx="1" fill="#050505"/>
            <path d="M8 10.5 L10.5 8 L13 10.5" stroke="#050505" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span className="nav-wordmark">BatchGuard ZK</span>
      </div>
      <div className="nav-links">
        <a href="#proofs" className="nav-link">Proofs</a>
        <a href="#visibility" className="nav-link">Visibility</a>
        <a href="#trust" className="nav-link">Evidence</a>
        <a href="https://github.com/Faadil1/batchguard-zk-stellar" target="_blank" rel="noopener" className="nav-github">
          <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
          </svg>
          GitHub
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-eyebrow">
        <span className="hero-eyebrow-dot"/>
        Stellar Hacks: Real-World ZK · Spicy Track — Private RWA Settlement
      </div>
      <h1 className="hero-title">
        Private settlement.<br/>
        <span className="hero-title-accent">Zero exposure.</span>
      </h1>
      <p className="hero-sub">
        Businesses settle invoices on Stellar without exposing amounts or vendor
        risk scores. A Noir ZK proof guarantees the batch satisfies policy rules,
        and a Soroban smart contract verifies it on-chain — no data leaks, no
        trust assumptions, just math.
      </p>
      <div className="hero-meta">
        <span className="hero-pill"><span className="hero-pill-icon">⬡</span> Stellar Soroban</span>
        <span className="hero-pill"><span className="hero-pill-icon">◈</span> Noir + UltraHonk</span>
        <span className="hero-pill"><span className="hero-pill-icon">◉</span> Real-World ZK</span>
        <span className="hero-pill"><span className="hero-pill-icon">☁</span> Localnet proven</span>
      </div>

      <div className="flow-strip">
        <div className="flow-step">
          <div className="flow-step-num">1</div>
          <div className="flow-step-title">Private batch</div>
          <div className="flow-step-body">4 invoices with amounts and vendor risk scores — never touch the chain</div>
        </div>
        <div className="flow-arrow">→</div>
        <div className="flow-step">
          <div className="flow-step-num">2</div>
          <div className="flow-step-title">ZK proof</div>
          <div className="flow-step-body">Noir circuit proves the batch satisfies policy rules without revealing data</div>
        </div>
        <div className="flow-arrow">→</div>
        <div className="flow-step">
          <div className="flow-step-num">3</div>
          <div className="flow-step-title">Soroban gate</div>
          <div className="flow-step-body">Smart contract verifies the proof on-chain — accept or reject settlement</div>
        </div>
      </div>
    </section>
  );
}

function SingleBatchCard() {
  return (
    <div className="card-shell anim-1">
      <div className="card-inner">
        <div className="proof-card-header">
          <div>
            <div className="proof-card-title">Single Batch Proof</div>
            <div className="proof-card-sub">4 invoices · 3 policy rules · 1 Soroban call</div>
          </div>
          <span className="status-badge pass">Verified on Soroban</span>
        </div>

        <div className="policy-grid">
          {[
            ['Per-invoice ceiling', SINGLE.policy.perInvoiceLimit],
            ['Batch total cap', SINGLE.policy.batchTotalLimit],
            ['Max vendor risk', SINGLE.policy.maxVendorRisk],
            ['Batch commitment', SINGLE.policy.batchCommitment],
          ].map(([label, val], i) => (
            <div className="policy-row" key={i}>
              <div className="policy-row-label">{label}</div>
              <div className="policy-row-value" style={i === 3 ? {fontSize: '12px'} : {}}>{val}</div>
            </div>
          ))}
        </div>

        <div className="proof-result">
          <div className="proof-result-header">
            <span className="proof-result-title">Valid proof submitted</span>
            <span className="evidence-label">LOCAL_ONLY</span>
          </div>
          <div className="proof-result-body accepted">
            ✓ Proof successfully verified on-chain!
            <div className="mono-sm">tx: {SINGLE.txHash}</div>
          </div>
        </div>

        <div className="proof-result">
          <div className="proof-result-header">
            <span className="proof-result-title">Tampered proof submitted</span>
            <span className="evidence-label">LOCAL_ONLY</span>
          </div>
          <div className="proof-result-body rejected-txt">
            ✗ HostError: Error(Contract, #4) — rejected
            <div className="mono-sm">tamper: first byte XOR 0xFF · sha256 mismatch confirmed</div>
          </div>
        </div>

        <div className="divider"/>
        <div className="contract-strip">
          <span className="contract-strip-label">Contract</span>
          <span className="contract-id">{SINGLE.contractId}</span>
        </div>

        <div className="metrics-bar">
          <div className="metric">
            <div className="metric-value">{SINGLE.proofSize} <span>B</span></div>
            <div className="metric-label">Proof size</div>
          </div>
          <div className="metric">
            <div className="metric-value">{SINGLE.cpuPct}<span>%</span></div>
            <div className="metric-label">CPU budget used</div>
          </div>
          <div className="metric">
            <div className="metric-value">881k<span> str</span></div>
            <div className="metric-label">Min resource fee</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RollupCard() {
  return (
    <div className="card-shell anim-2">
      <div className="card-inner">
        <div className="proof-card-header">
          <div>
            <div className="proof-card-title">Rollup Proof</div>
            <div className="proof-card-sub">8 invoices · 2 batches · 1 Soroban call</div>
          </div>
          <span className="status-badge pass">Verified on Soroban</span>
        </div>

        <div className="rollup-visual">
          {['Batch A', 'Batch B'].map((label, idx) => (
            <div key={idx} style={{display:'flex',alignItems:'center',gap:8,flex:1}}>
              <div className="rollup-batch" style={{flex:1}}>
                <div className="rollup-batch-label">{label}</div>
                <div className="rollup-batch-invoices">
                  {[...Array(4)].map((_, i) => <div key={i} className="invoice-dot"/>)}
                </div>
              </div>
              <div className="rollup-arrow">{idx === 0 ? '+' : '→'}</div>
            </div>
          ))}
          <div className="rollup-proof-box">
            <div className="rollup-proof-label">One proof</div>
            <div className="rollup-proof-size">14,592 B</div>
          </div>
        </div>

        <div className="proof-result">
          <div className="proof-result-header">
            <span className="proof-result-title">Valid rollup proof submitted</span>
            <span className="evidence-label">LOCAL_ONLY</span>
          </div>
          <div className="proof-result-body accepted">
            ✓ Proof successfully verified on-chain!
            <div className="mono-sm">tx: {ROLLUP.txHash}</div>
          </div>
        </div>

        <div className="proof-result">
          <div className="proof-result-header">
            <span className="proof-result-title">Tampered rollup proof submitted</span>
            <span className="evidence-label">LOCAL_ONLY</span>
          </div>
          <div className="proof-result-body rejected-txt">
            ✗ HostError: Error(Contract, #4) — rejected
          </div>
        </div>

        <div className="divider"/>
        <div className="contract-strip">
          <span className="contract-strip-label">Contract</span>
          <span className="contract-id">{ROLLUP.contractId}</span>
        </div>

        <div style={{marginTop:'16px',padding:'12px 16px',background:'var(--surface)',borderRadius:'var(--radius-sm)',border:'1px solid var(--border)'}}>
          <div style={{fontSize:'10px',letterSpacing:'0.1em',textTransform:'uppercase',color:'var(--text-3)',marginBottom:'6px'}}>Framing</div>
          <div style={{fontSize:'11px',color:'var(--text-2)',lineHeight:1.6}}>
            <strong style={{color:'var(--text-1)'}}>Aggregation-inspired multi-batch proof</strong> — one Noir circuit,
            two private batches, one proof, one Soroban verification. Not recursive proof aggregation.
          </div>
        </div>
      </div>
    </div>
  );
}

function VisibilityCard() {
  const priv = [
    ['Invoice 1 amount','1,200'],['Invoice 2 amount','2,300'],
    ['Invoice 3 amount','1,800'],['Invoice 4 amount','900'],
    ['Vendor 1 risk score','2/10'],['Vendor 2 risk score','3/10'],
    ['Vendor 3 risk score','1/10'],['Vendor 4 risk score','2/10'],
    ['Batch nonce','42'],
  ];
  const pub = [
    ['Per-invoice limit','2,500'],['Batch total cap','7,000'],
    ['Max vendor risk','5'],['Batch commitment','5,042,103,274'],
    ['ZK proof','14,592 B'],['Public inputs','128 B'],
    ['Contract ID','CAEQ…4KI3I'],['Verification result','PASS / FAIL'],
  ];

  return (
    <div className="card-shell bento-span anim-3" id="visibility">
      <div className="card-inner">
        <div className="proof-card-header" style={{marginBottom:'20px'}}>
          <div>
            <div className="proof-card-title">Settlement Visibility</div>
            <div className="proof-card-sub">What the chain sees vs. what stays in the ZK circuit</div>
          </div>
          <span className="evidence-label">Invoice Batch · Localnet</span>
        </div>

        <div className="split-grid">
          <div>
            <div className="split-col-header">
              <span className="status-badge rejected">Private</span>
              <span className="split-col-title">Inside the ZK circuit only</span>
            </div>
            {priv.map(([label, blurred], i) => (
              <div className="split-row" key={i}>
                <span className="split-icon">🔒</span>
                <span className="split-row-text">{label}</span>
                <span className="split-row-blurred">{blurred}</span>
                <span className="private-tag">hidden</span>
              </div>
            ))}
          </div>
          <div>
            <div className="split-col-header">
              <span className="status-badge pass">Public</span>
              <span className="split-col-title">On Stellar / Soroban</span>
            </div>
            {pub.map(([label, value], i) => (
              <div className="split-row" key={i}>
                <span className="split-icon">◎</span>
                <span className="split-row-text">{label}</span>
                <span style={{marginLeft:'auto',fontSize:'11px',color:'var(--accent)',fontFamily:'var(--font-mono)'}}>{value}</span>
                <span className="public-tag">public</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TrustPanel() {
  const cells = [
    { icon: '◈', title: 'ZK Circuit', body: 'Noir + UltraHonk. Invoice amounts and vendor risk scores are private witnesses. Policy rules are public inputs verified on-chain by Soroban.' },
    { icon: '⬡', title: 'Stellar Soroban', body: 'UltraHonk verifier contract. Protocol 25/26 BN254 host functions make on-chain proof verification possible and affordable.' },
    { icon: '◉', title: 'Reject Path', body: 'Tampered proof (single byte XOR 0xFF) rejected with HostError(Contract, #4). Forgery fails deterministically without revealing anything.' },
    { icon: '↯', title: 'All Evidence Real', body: 'Every result from real executions in Google Cloud Shell against Stellar Standalone Network. No simulated outputs in evidence files.' },
  ];

  const gates = [
    { name: 'Noir circuit build + nargo test', file: 'gate-2-final-result.yaml' },
    { name: 'Invoice batch proof on Soroban', file: 'gate-3-final-result.yaml' },
    { name: 'Rollup circuit build + nargo test', file: 'gate-4-rollup-result.yaml' },
    { name: 'Valid invoice_batch proof accepted', file: 'gate3-valid-invoice-batch-onchain.log' },
    { name: 'Tampered invoice_batch proof rejected', file: 'gate3-invalid-invoice-batch-onchain.log' },
    { name: 'Valid rollup proof accepted on-chain', file: 'gate4-rollup-valid-onchain-2.log' },
    { name: 'Tampered rollup proof rejected', file: 'gate4-rollup-invalid-onchain.log' },
  ];

  return (
    <section id="trust" style={{marginTop:'48px'}}>
      <div className="section-label anim-4">Evidence & Trust</div>

      <div className="trust-grid anim-4">
        {cells.map((c, i) => (
          <div className="trust-cell" key={i}>
            <div className="trust-cell-icon">{c.icon}</div>
            <div className="trust-cell-title">{c.title}</div>
            <div className="trust-cell-body">{c.body}</div>
          </div>
        ))}
      </div>

      <div className="card-shell" style={{marginTop:'12px'}}>
        <div className="card-inner">
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'16px'}}>
            <div className="proof-card-title">Verification Gates</div>
            <a href="https://github.com/Faadil1/batchguard-zk-stellar/tree/main/evidence"
               target="_blank" rel="noopener"
               style={{fontSize:'11px',color:'var(--accent)',textDecoration:'none',letterSpacing:'0.06em'}}>
              View all evidence →
            </a>
          </div>
          <div className="gate-list">
            {gates.map((g, i) => (
              <div className="gate-row" key={i}>
                <span className="gate-icon">✓</span>
                <span className="gate-name">{g.name}</span>
                <span className="gate-file">evidence/{g.file}</span>
                <span className="gate-status"><span className="status-badge pass">PASS</span></span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="scope-notice">
        <div className="scope-notice-title">Honest scope — evidence labels</div>
        <div className="scope-notice-body">
          All results are labeled <strong>LOCAL_ONLY</strong> — executed on Stellar Standalone Network in Google Cloud Shell,
          not public testnet or mainnet. The commitment scheme is a field-arithmetic weighted sum (demo-appropriate;
          not a collision-resistant cryptographic hash). The rollup proof is an aggregation-inspired single-circuit proof
          covering two private batches — not recursive proof aggregation. No claims of production readiness,
          live settlement, or wallet functionality are made.
        </div>
      </div>
    </section>
  );
}

function RoadmapSection() {
  const items = [
    { label: 'ROADMAP_ONLY', text: <><strong>Poseidon commitment</strong> — replace the demo field-arithmetic commitment with a ZK-native hash for production collision resistance.</> },
    { label: 'ROADMAP_ONLY', text: <><strong>Stellar testnet deployment</strong> — fund via friendbot and deploy to public Stellar testnet. No technical gap; requires unrestricted network egress.</> },
    { label: 'ROADMAP_ONLY', text: <><strong>Dynamic batch input API</strong> — businesses submit invoice batches and receive a commitment + proof, rather than hardcoded witness values.</> },
    { label: 'ROADMAP_ONLY', text: <><strong>N-batch rollup</strong> — extend the multi-batch circuit to N batches via a Merkle commitment over batch commitments.</> },
    { label: 'ROADMAP_ONLY', text: <><strong>Auditor selective disclosure</strong> — encrypted batch packet for authorized auditors; ZK proof guarantees the disclosed data matches the on-chain commitment.</> },
  ];

  return (
    <section style={{marginTop:'48px'}}>
      <div className="section-label">Production Roadmap</div>
      <div className="card-shell">
        <div className="card-inner">
          {items.map((item, i) => (
            <div className="roadmap-row" key={i}>
              <span className="roadmap-label">{item.label}</span>
              <span className="roadmap-text">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <div style={{fontFamily:'var(--font-display)',fontSize:'13px',fontWeight:700,color:'var(--text-1)',marginBottom:'8px'}}>
          BatchGuard ZK
        </div>
        Stellar Hacks: Real-World ZK · 2026<br/>
        Stellar Standalone Network (localnet) · Google Cloud Shell<br/>
        Noir + UltraHonk / Barretenberg · Soroban UltraHonk verifier
      </div>
      <div className="footer-right">
        {[
          ['GitHub repository', 'https://github.com/Faadil1/batchguard-zk-stellar'],
          ['Evidence files', 'https://github.com/Faadil1/batchguard-zk-stellar/tree/main/evidence'],
          ['invoice_batch circuit', 'https://github.com/Faadil1/batchguard-zk-stellar/blob/main/circuits/invoice_batch/src/main.nr'],
          ['batchguard_rollup circuit', 'https://github.com/Faadil1/batchguard-zk-stellar/blob/main/circuits/batchguard_rollup/src/main.nr'],
        ].map(([label, href], i) => (
          <a key={i} href={href} target="_blank" rel="noopener" className="footer-link">{label} →</a>
        ))}
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <div className="bg-glow"/>
      <div className="app">
        <NavBar/>
        <Hero/>
        <section id="proofs">
          <div className="section-label anim-0">Settlement Proofs</div>
          <p className="section-intro anim-0">
            Each proof was generated from a real Noir circuit, submitted to a Stellar Soroban
            smart contract on localnet, and verified on-chain. Tampered proofs were rejected.
          </p>
          <div className="bento">
            <VisibilityCard/>
            <SingleBatchCard/>
            <RollupCard/>
          </div>
        </section>
        <TrustPanel/>
        <RoadmapSection/>
        <Footer/>
      </div>
    </>
  );
}
