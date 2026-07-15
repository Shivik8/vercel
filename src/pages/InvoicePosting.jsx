import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, FileText, CreditCard, Receipt, Shield,
  Landmark, SplitSquareHorizontal, BookOpen, Calendar,
  Hash, DollarSign, Building2, CheckSquare, User,
  Banknote, Scale, Info, CircleDot, ChevronUp, ChevronDown,
  ExternalLink, Calculator, Eye, MessageSquare, LayoutDashboard,
  Settings, Loader2
} from 'lucide-react';
import { invoices, vendorDetails, recipientData, lineItems, processOptions } from '../data/invoiceData';

const topTabs = [
  { id: 'detail', label: 'Show Detail Pane', icon: Eye },
  { id: 'comments', label: 'Create/Edit Comments', icon: MessageSquare },
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
];

const tabList = [
  { id: 'basic', label: 'Basic Data' },
  { id: 'payment', label: 'Payment' },
  { id: 'details', label: 'Details' },
  { id: 'tax', label: 'Tax' },
  { id: 'withholding', label: 'Withholding tax' },
  { id: 'amountSplit', label: 'Amount Split' },
  { id: 'conta', label: 'Conta' },
];

export default function InvoicePosting() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTopTab, setActiveTopTab] = useState('detail');
  const [activeTab, setActiveTab] = useState('basic');
  const [calculateTax, setCalculateTax] = useState(true);
  const [showHeaderData, setShowHeaderData] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [referGroup, setReferGroup] = useState('');
  const [loading, setLoading] = useState(true);

  const invoice = invoices.find(i => i.id === id) || invoices[1];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);
  const vendor = vendorDetails[invoice.vendorNum] || vendorDetails['100015200'];

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const invoiceDate = invoice.creationDate || '26.06.2026';
  const postingDate = '01.07.2026';
  const baseAmount = 91996.04;
  const taxAmount = 16559.32;
  const totalLineItemAmount = lineItems.reduce((sum, item) => sum + item.netPrice, 0);

  const sesNumber = '300001245';
  const vendorGstin = '27AABCA1234F1ZP';
  const companyGstin = '27AAACT2727Q1ZV';

  const amountSplitRows = [
    { glAccount: '4000100', amount: invoice.amount * 0.6, taxCode: 'G1', costCenter: '1000-CC-OPS', description: 'Service charges - Operations' },
    { glAccount: '4000200', amount: invoice.amount * 0.25, taxCode: 'G1', costCenter: '1000-CC-MNT', description: 'Maintenance charges' },
    { glAccount: '4000300', amount: invoice.amount * 0.15, taxCode: 'G1', costCenter: '1000-CC-ADM', description: 'Administrative overhead' },
  ];

  const contaRows = [
    { docNo: invoice.id, postingKey: '31', account: vendor.vendorNumber, amount: invoice.amount, tax: '', description: 'Vendor - ' + vendor.vendorName },
    { docNo: invoice.id, postingKey: '86', account: '4000100', amount: invoice.amount * 0.6, tax: 'G1', description: 'Service charges - Operations' },
    { docNo: invoice.id, postingKey: '86', account: '4000200', amount: invoice.amount * 0.25, tax: 'G1', description: 'Maintenance charges' },
    { docNo: invoice.id, postingKey: '86', account: '4000300', amount: invoice.amount * 0.15, tax: 'G1', description: 'Administrative overhead' },
    { docNo: invoice.id, postingKey: '86', account: '1754100', amount: taxAmount, tax: 'G1', description: 'Input Tax - CGST + SGST' },
  ];

  if (loading) {
    return (
      <div className="detail-page page-enter">
        {/* SAP-style Display Invoice Document loading screen */}
        <div style={{
          background: 'var(--gradient-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          backdropFilter: 'blur(12px)',
          boxShadow: 'var(--shadow-card)',
        }}>
          {/* Title bar */}
          <div style={{
            background: 'linear-gradient(90deg, rgba(0, 78, 146, 0.25), rgba(0, 78, 146, 0.12))',
            padding: '12px 22px',
            borderBottom: '1px solid var(--border-subtle)',
          }}>
            <h2 style={{
              fontSize: 16,
              fontWeight: 700,
              fontStyle: 'italic',
              color: 'var(--text-white)',
              margin: 0,
            }}>
              Display Invoice Document
            </h2>
          </div>

          {/* Sub-header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 22px',
            borderBottom: '1px solid var(--border-subtle)',
            background: 'rgba(0, 78, 146, 0.05)',
          }}>
            <Settings size={14} style={{ color: 'var(--text-muted)' }} />
            <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500 }}>
              Display Document
            </span>
          </div>

          {/* Form fields */}
          <div style={{ padding: '20px 22px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 12 }}>
              <span style={{
                width: 160,
                fontSize: 13,
                color: 'var(--text-secondary)',
                fontWeight: 500,
              }}>
                Invoice Document No.
              </span>
              <input
                className="form-input"
                readOnly
                value={invoice.id}
                style={{
                  width: 180,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 600,
                  color: 'var(--cyan-accent)',
                }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <span style={{
                width: 160,
                fontSize: 13,
                color: 'var(--text-secondary)',
                fontWeight: 500,
              }}>
                Fiscal Year
              </span>
              <input
                className="form-input"
                readOnly
                value={invoice.fiscalYear}
                style={{
                  width: 180,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 600,
                }}
              />
            </div>
          </div>

          {/* Loading area */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px 20px',
          }}>
            <Loader2
              size={28}
              style={{
                color: 'var(--cyan-accent)',
                animation: 'spin 1s linear infinite',
              }}
            />
          </div>

          {/* SAP footer */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '12px 22px',
            borderTop: '1px solid var(--border-subtle)',
            background: 'rgba(0, 78, 146, 0.03)',
          }}>
            <span style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 2,
              color: 'var(--text-muted)',
            }}>
              SAP
            </span>
          </div>
        </div>

        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="detail-page page-enter">
      {/* Header */}
      <div className="detail-header">
        <div className="detail-title-row">
          <button className="back-btn" onClick={() => navigate(`/approval/${invoice.id}`)}>
            <ArrowLeft size={18} />
          </button>
          <div className="detail-title">
            <h1>Change Parked Invoice Document {invoice.id} {invoice.fiscalYear}</h1>
            <p>Stage 5 — Invoice Posting &middot; Company Code {invoice.companyCode}</p>
          </div>
        </div>
        <div className="detail-actions">
          <button className="btn btn-gold">
            <FileText size={16} />
            Post
          </button>
          <button className="btn btn-outline">
            <CheckSquare size={16} />
            Simulate
          </button>
          <button className="btn btn-outline">
            <Receipt size={16} />
            Park
          </button>
          <button
            className="btn btn-outline"
            onClick={() => setShowHeaderData(!showHeaderData)}
          >
            {showHeaderData ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            {showHeaderData ? 'Hide Header Data' : 'Show Header Data'}
          </button>
        </div>
      </div>

      {/* Top-level Tabs: Show Detail Pane / Create/Edit Comments / Dashboard */}
      <div className="tabs" style={{ marginBottom: 20 }}>
        {topTabs.map(tab => (
          <button
            key={tab.id}
            className={`tab ${activeTopTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTopTab(tab.id)}
          >
            <tab.icon size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* ==================== COMMENTS TAB ==================== */}
      {activeTopTab === 'comments' && (
        <div className="info-card">
          <div className="info-card-header">
            <MessageSquare size={18} />
            <h3>Approval Comments</h3>
          </div>
          <div className="info-card-body">
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>
                Add Comment
              </label>
              <textarea
                className="form-input"
                rows={4}
                placeholder="Enter your comment here..."
                style={{ resize: 'vertical', minHeight: 80 }}
              />
            </div>
            <button className="btn btn-gold" style={{ marginBottom: 24 }}>
              <MessageSquare size={16} />
              Submit Comment
            </button>
            <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>
              <MessageSquare size={32} style={{ opacity: 0.2, marginBottom: 8, display: 'block', margin: '0 auto 8px' }} />
              No Entry
              <br />
              <span style={{ fontSize: 11 }}>No approval comments have been added yet.</span>
            </div>
          </div>
        </div>
      )}

      {/* ==================== DASHBOARD TAB ==================== */}
      {activeTopTab === 'dashboard' && (
        <>
          <div className="info-grid">
            <div className="info-card">
              <div className="info-card-header">
                <FileText size={18} />
                <h3>Parked Document Information</h3>
              </div>
              <div className="info-card-body">
                <div className="info-row">
                  <span className="info-label">Document Number</span>
                  <span className="info-value mono gold">{invoice.id}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Company Code</span>
                  <span className="info-value">{invoice.companyCode}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Invoice Amount</span>
                  <span className="info-value large">{formatAmount(invoice.amount)} INR</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Reference Doc #</span>
                  <span className="info-value mono">{invoice.refDoc}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Vendor</span>
                  <span className="info-value">
                    <span style={{ color: 'var(--cyan-accent)', fontFamily: "'JetBrains Mono', monospace", marginRight: 8 }}>
                      {invoice.vendorNum}
                    </span>
                    {invoice.vendorName}
                  </span>
                </div>
              </div>
            </div>

            <div className="info-card">
              <div className="info-card-header">
                <FileText size={18} />
                <h3>Additional Details</h3>
              </div>
              <div className="info-card-body">
                <div className="info-row">
                  <span className="info-label">Document Type</span>
                  <span className="info-value">
                    <span className="status-badge in-review" style={{ fontSize: 12 }}>
                      <span className="dot"></span>
                      RE
                    </span>
                    <span style={{ marginLeft: 8, color: 'var(--text-secondary)' }}>Invoice - Gross</span>
                  </span>
                </div>
                <div className="info-row">
                  <span className="info-label">Fiscal Year</span>
                  <span className="info-value mono">{invoice.fiscalYear}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Header Text</span>
                  <span className="info-value mono">{invoice.headerText}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Purchase Doc #</span>
                  <span
                    className="info-value mono gold"
                    style={{ cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: 3 }}
                    onClick={() => navigate(`/po-verify/${invoice.id}`)}
                  >
                    {invoice.purchaseDoc}
                  </span>
                </div>
                <div className="info-row">
                  <span className="info-label">Refer Group</span>
                  <select className="form-select" value={referGroup} onChange={e => setReferGroup(e.target.value)}>
                    <option value="">Select refer group...</option>
                    <option value="AP_PROC">AP Processor</option>
                    <option value="INFO_PROV">Info Provider</option>
                    <option value="REQUISI">Requisitioner</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="process-options">
            <div className="process-options-header">
              <h3>Process Options for A/P Processor — THE TATA POWER</h3>
              <p>Select an action to process this invoice</p>
            </div>
            {processOptions.map((opt, i) => (
              <div
                key={i}
                className="process-option-item"
                style={{
                  background: selectedOption === i ? 'rgba(0, 212, 255, 0.06)' : undefined,
                  borderLeft: selectedOption === i ? '3px solid var(--cyan-accent)' : '3px solid transparent',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setSelectedOption(i);
                  if (opt.option === 'Change/Post (PO)') {
                    setActiveTopTab('detail');
                  }
                }}
              >
                <span className="process-option-name">{opt.option}</span>
                <span className="process-option-desc">{opt.description}</span>
                <span className="process-option-actor">{opt.receivingActor}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ==================== SHOW DETAIL PANE TAB ==================== */}
      {activeTopTab === 'detail' && (
      <>
      {/* Sub-Tabs */}
      <div className="tabs">
        {tabList.map(tab => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Two-column layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '16px' }}>
        {/* LEFT: Main form area */}
        <div>

          {/* ======================== BASIC DATA TAB ======================== */}
          {activeTab === 'basic' && (
            <>
              {showHeaderData && (
                <>
                  {/* Top form row - 3 columns */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: 12 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>
                        Invoice Date
                      </label>
                      <input className="form-input" defaultValue={invoiceDate} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>
                        Posting Date
                      </label>
                      <input className="form-input" defaultValue={postingDate} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>
                        Reference
                      </label>
                      <input className="form-input" defaultValue={invoice.refDoc} />
                    </div>
                  </div>

                  {/* Second form row - 3 columns */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: 12 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>
                        Amount
                      </label>
                      <input
                        className="form-input"
                        readOnly
                        value={formatAmount(invoice.amount) + ' INR'}
                        style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 16, fontWeight: 700, color: 'var(--cyan-accent)' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>
                        Tax Amount
                      </label>
                      <input className="form-input" defaultValue={formatAmount(taxAmount)} style={{ fontFamily: "'JetBrains Mono', monospace" }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>
                        Tax Code
                      </label>
                      <input className="form-input" defaultValue="G1 (Domestic Non Setoff)" readOnly style={{ fontFamily: "'JetBrains Mono', monospace" }} />
                    </div>
                  </div>

                  {/* Third form row */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: 12 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>
                        Bus.Place / Sectn
                      </label>
                      <input className="form-input" defaultValue="1001 / 1001" />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>
                        Paymt Terms
                      </label>
                      <input className="form-input" defaultValue="P45 — 45 Days net" readOnly style={{ fontFamily: "'JetBrains Mono', monospace" }} />
                    </div>
                  </div>

                  {/* Text field */}
                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>
                      Text
                    </label>
                    <input className="form-input" defaultValue="ATTND CBL FAULT BY EXCAVN TRENCH<=10M" style={{ width: '100%' }} />
                  </div>
                  <div style={{ marginBottom: 20 }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-secondary)', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={calculateTax}
                        onChange={() => setCalculateTax(!calculateTax)}
                        style={{ accentColor: 'var(--cyan-accent)', width: 16, height: 16 }}
                      />
                      Calculate Tax
                    </label>
                  </div>
                </>
              )}

              {/* PO Reference section */}
              <div className="info-card">
                <div className="info-card-header">
                  <Receipt size={18} />
                  <h3>PO Reference</h3>
                </div>
                <div style={{ padding: 0 }}>
                  <table className="line-items-table">
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>PO Number</th>
                        <th>PO Item</th>
                        <th>G/L Acct</th>
                        <th>Material</th>
                        <th>SES Number</th>
                        <th>Description</th>
                        <th>Qty</th>
                        <th>Unit</th>
                        <th style={{ textAlign: 'right' }}>Amount</th>
                        <th>Tax</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lineItems.map((item) => (
                        <tr key={item.item}>
                          <td style={{ fontFamily: "'JetBrains Mono', monospace" }}>{item.item}</td>
                          <td
                            style={{
                              fontFamily: "'JetBrains Mono', monospace",
                              color: 'var(--cyan-accent)',
                              cursor: 'pointer',
                              textDecoration: 'underline',
                              textUnderlineOffset: 3,
                            }}
                            onClick={() => navigate(`/po-verify/${invoice.id}`)}
                          >
                            {item.poNumber}
                          </td>
                          <td style={{ fontFamily: "'JetBrains Mono', monospace" }}>{item.poItem}</td>
                          <td style={{ fontFamily: "'JetBrains Mono', monospace", color: 'var(--cyan-accent)' }}>{item.glAccount}</td>
                          <td style={{ fontSize: 11 }}>{item.material}</td>
                          <td style={{ fontFamily: "'JetBrains Mono', monospace" }}>{sesNumber}</td>
                          <td style={{ color: 'var(--text-primary)', fontSize: 12 }}>{item.description}</td>
                          <td style={{ fontFamily: "'JetBrains Mono', monospace" }}>{item.quantity}</td>
                          <td>{item.unit}</td>
                          <td style={{ textAlign: 'right', fontFamily: "'JetBrains Mono', monospace" }}>
                            {formatAmount(item.netPrice)}
                          </td>
                          <td>{item.taxCode}</td>
                        </tr>
                      ))}
                      <tr className="total-row">
                        <td colSpan={9} style={{ textAlign: 'right' }}>Total</td>
                        <td style={{ textAlign: 'right' }}>{formatAmount(totalLineItemAmount)}</td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="table-footer">
                  <span>{lineItems.length} line items</span>
                  <span>Total: <strong>{formatAmount(totalLineItemAmount)} INR</strong></span>
                </div>
              </div>
            </>
          )}

          {/* ======================== PAYMENT TAB ======================== */}
          {activeTab === 'payment' && (
            <div className="info-card">
              <div className="info-card-header">
                <Banknote size={18} />
                <h3>Payment Information</h3>
              </div>
              <div className="info-card-body">
                <div className="info-row">
                  <span className="info-label">Baseline Date</span>
                  <span className="info-value mono">19.06.2026</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Payment Terms</span>
                  <span className="info-value">P45 — 45 Days net</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Due On</span>
                  <span className="info-value mono">03.08.2026</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Payment Method</span>
                  <span className="info-value">T — Bank Transfer</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Payment Block</span>
                  <span className="info-value" style={{ color: 'var(--text-muted)' }}>---</span>
                </div>
                <div className="info-row">
                  <span className="info-label">House Bank</span>
                  <span className="info-value" style={{ color: 'var(--text-muted)' }}>---</span>
                </div>
              </div>
            </div>
          )}

          {/* ======================== DETAILS TAB ======================== */}
          {activeTab === 'details' && (
            <div className="info-card">
              <div className="info-card-header">
                <Info size={18} />
                <h3>Document Details</h3>
              </div>
              <div className="info-card-body">
                <div className="info-row">
                  <span className="info-label">Header Text</span>
                  <span className="info-value mono">{invoice.headerText}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Reference Doc</span>
                  <span className="info-value mono">{invoice.refDoc}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Document Type</span>
                  <span className="info-value">
                    <span className="status-badge in-review" style={{ fontSize: 12 }}>
                      <span className="dot"></span>
                      RE
                    </span>
                    <span style={{ marginLeft: 8, color: 'var(--text-secondary)' }}>Invoice - Gross</span>
                  </span>
                </div>
                <div className="info-row">
                  <span className="info-label">Company Code</span>
                  <span className="info-value">{invoice.companyCode} — The Tata Power Co.</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Business Place</span>
                  <span className="info-value">1001</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Section Code</span>
                  <span className="info-value">1001</span>
                </div>
              </div>
            </div>
          )}

          {/* ======================== TAX TAB ======================== */}
          {activeTab === 'tax' && (
            <>
              <div className="info-card" style={{ marginBottom: 16 }}>
                <div className="info-card-header">
                  <Scale size={18} />
                  <h3>Tax Data</h3>
                </div>
                <div style={{ padding: 0 }}>
                  <table className="line-items-table">
                    <thead>
                      <tr>
                        <th>D/C</th>
                        <th>Tax Doc</th>
                        <th style={{ textAlign: 'right' }}>Currency Base Amount</th>
                        <th>Tax Code</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ fontFamily: "'JetBrains Mono', monospace" }}>8</td>
                        <td style={{ fontFamily: "'JetBrains Mono', monospace" }}>{formatAmount(taxAmount)}</td>
                        <td style={{
                          textAlign: 'right',
                          fontFamily: "'JetBrains Mono', monospace",
                          fontWeight: 700,
                          fontSize: 15,
                          color: 'var(--cyan-accent)',
                        }}>
                          {formatAmount(baseAmount)}
                        </td>
                        <td>G1 (Dome...)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="info-card" style={{ marginBottom: 16 }}>
                <div className="info-card-header">
                  <Info size={18} />
                  <h3>Tax Details</h3>
                </div>
                <div className="info-card-body">
                  <div className="info-row">
                    <span className="info-label">Tax Code</span>
                    <span className="info-value mono gold">G1</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Tax Description</span>
                    <span className="info-value">Domestic Non Setoff — CGST 9% + SGST 9%</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Base Amount</span>
                    <span className="info-value mono" style={{ fontSize: 15, fontWeight: 700 }}>{formatAmount(baseAmount)} INR</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Tax Amount</span>
                    <span className="info-value mono">{formatAmount(taxAmount)} INR</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Vendor GSTIN</span>
                    <span className="info-value mono">{vendorGstin}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Company GSTIN</span>
                    <span className="info-value mono">{companyGstin}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">HSN/SAC Code</span>
                    <span className="info-value mono">998731</span>
                  </div>
                  <div style={{ marginTop: 12 }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-secondary)', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={calculateTax}
                        onChange={() => setCalculateTax(!calculateTax)}
                        style={{ accentColor: 'var(--cyan-accent)', width: 16, height: 16 }}
                      />
                      Calculate Tax
                    </label>
                  </div>
                </div>
              </div>

              {/* Navigate to Retention Calculator */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '14px 20px',
                  background: 'rgba(0, 78, 146, 0.08)',
                  border: '1px solid var(--border-subtle)',
                  borderLeft: '3px solid var(--cyan-accent)',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onClick={() => navigate(`/retention/${invoice.id}`)}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0, 78, 146, 0.14)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0, 78, 146, 0.08)'; }}
              >
                <Calculator size={20} style={{ color: 'var(--cyan-accent)' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
                    Navigate to Retention Calculator
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                    Copy the base amount ({formatAmount(baseAmount)}) and calculate CPBG & Safety Retention
                  </div>
                </div>
                <ExternalLink size={16} style={{ color: 'var(--text-muted)' }} />
              </div>
            </>
          )}

          {/* ======================== WITHHOLDING TAX TAB ======================== */}
          {activeTab === 'withholding' && (
            <div className="info-card">
              <div className="info-card-header">
                <Shield size={18} />
                <h3>Withholding Tax</h3>
              </div>
              <div className="info-card-body">
                <div className="info-row">
                  <span className="info-label">W/tax Type</span>
                  <span className="info-value">C1 — TDS on Contractor</span>
                </div>
                <div className="info-row">
                  <span className="info-label">W/tax Code</span>
                  <span className="info-value mono">C0</span>
                </div>
                <div className="info-row">
                  <span className="info-label">W/tax Base</span>
                  <span className="info-value mono">{formatAmount(invoice.amount)} INR</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Exempt</span>
                  <span className="info-value">
                    <span style={{
                      display: 'inline-block',
                      padding: '3px 10px',
                      borderRadius: 10,
                      fontSize: 11,
                      fontWeight: 600,
                      background: 'rgba(248, 113, 113, 0.1)',
                      color: 'var(--status-rejected)'
                    }}>
                      No
                    </span>
                  </span>
                </div>
                <div className="info-row">
                  <span className="info-label">TDS Section</span>
                  <span className="info-value">194C — Payment to Contractor</span>
                </div>
              </div>
            </div>
          )}

          {/* ======================== AMOUNT SPLIT TAB ======================== */}
          {activeTab === 'amountSplit' && (
            <div className="info-card">
              <div className="info-card-header">
                <SplitSquareHorizontal size={18} />
                <h3>Amount Split across G/L Accounts</h3>
              </div>
              <div style={{ padding: 0 }}>
                <table className="line-items-table">
                  <thead>
                    <tr>
                      <th>G/L Account</th>
                      <th style={{ textAlign: 'right' }}>Amount</th>
                      <th>Tax Code</th>
                      <th>Cost Center</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {amountSplitRows.map((row, i) => (
                      <tr key={i}>
                        <td style={{ fontFamily: "'JetBrains Mono', monospace", color: 'var(--cyan-accent)' }}>{row.glAccount}</td>
                        <td style={{ textAlign: 'right', fontFamily: "'JetBrains Mono', monospace" }}>{formatAmount(row.amount)}</td>
                        <td>{row.taxCode}</td>
                        <td style={{ fontFamily: "'JetBrains Mono', monospace" }}>{row.costCenter}</td>
                        <td style={{ color: 'var(--text-primary)' }}>{row.description}</td>
                      </tr>
                    ))}
                    <tr className="total-row">
                      <td style={{ textAlign: 'right' }}>Total</td>
                      <td style={{ textAlign: 'right' }}>{formatAmount(invoice.amount)}</td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="table-footer">
                <span>{amountSplitRows.length} split entries</span>
                <span>Total: <strong>{formatAmount(invoice.amount)} INR</strong></span>
              </div>
            </div>
          )}

          {/* ======================== CONTA TAB ======================== */}
          {activeTab === 'conta' && (
            <div className="info-card">
              <div className="info-card-header">
                <BookOpen size={18} />
                <h3>Accounting Entry Preview</h3>
              </div>
              <div style={{ padding: 0 }}>
                <table className="line-items-table">
                  <thead>
                    <tr>
                      <th>Document No</th>
                      <th>Posting Key</th>
                      <th>Account</th>
                      <th style={{ textAlign: 'right' }}>Amount</th>
                      <th>Tax</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contaRows.map((row, i) => (
                      <tr key={i}>
                        <td style={{ fontFamily: "'JetBrains Mono', monospace" }}>{row.docNo}</td>
                        <td style={{ fontFamily: "'JetBrains Mono', monospace" }}>{row.postingKey}</td>
                        <td style={{ fontFamily: "'JetBrains Mono', monospace", color: 'var(--cyan-accent)' }}>{row.account}</td>
                        <td style={{ textAlign: 'right', fontFamily: "'JetBrains Mono', monospace" }}>
                          {formatAmount(row.amount)}
                        </td>
                        <td>{row.tax}</td>
                        <td style={{ color: 'var(--text-primary)', whiteSpace: 'normal', maxWidth: 220 }}>{row.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="table-footer">
                <span>{contaRows.length} accounting entries</span>
                <span>Debit / Credit balanced</span>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT SIDEBAR - always visible */}
        <div>
          {/* Vendor Info card */}
          <div className="info-card" style={{ marginBottom: 12 }}>
            <div className="info-card-header">
              <User size={18} />
              <h3>Vendor Info</h3>
            </div>
            <div className="info-card-body">
              <div className="info-row">
                <span className="info-label" style={{ width: 100 }}>Vendor No.</span>
                <span className="info-value mono" style={{ color: 'var(--cyan-accent)' }}>{vendor.vendorNumber}</span>
              </div>
              <div className="info-row">
                <span className="info-label" style={{ width: 100 }}>Name</span>
                <span className="info-value" style={{ fontSize: 12 }}>{vendor.vendorName}</span>
              </div>
              <div className="info-row">
                <span className="info-label" style={{ width: 100 }}>Address</span>
                <span className="info-value" style={{ fontSize: 12 }}>{vendor.street}</span>
              </div>
              <div className="info-row">
                <span className="info-label" style={{ width: 100 }}>City</span>
                <span className="info-value">{vendor.city} - {vendor.postalCode}</span>
              </div>
              <div className="info-row">
                <span className="info-label" style={{ width: 100 }}>Bank</span>
                <span className="info-value" style={{ fontSize: 12 }}>{vendor.bankName}</span>
              </div>
              <div className="info-row">
                <span className="info-label" style={{ width: 100 }}>GSTIN</span>
                <span className="info-value mono" style={{ fontSize: 11 }}>{vendorGstin}</span>
              </div>
            </div>
          </div>

          {/* Balance card */}
          <div className="info-card" style={{ marginBottom: 12 }}>
            <div className="info-card-header">
              <DollarSign size={18} />
              <h3>Balance</h3>
            </div>
            <div className="info-card-body">
              <div className="info-row">
                <span className="info-label" style={{ width: 120 }}>Invoice Amount</span>
                <span className="info-value mono" style={{ fontWeight: 700 }}>{formatAmount(invoice.amount)}</span>
              </div>
              <div className="info-row">
                <span className="info-label" style={{ width: 120 }}>Previous Pmts</span>
                <span className="info-value mono">0.00</span>
              </div>
              <div className="info-row">
                <span className="info-label" style={{ width: 120 }}>Balance</span>
                <span className="info-value mono" style={{ color: 'var(--status-approved)', fontWeight: 700, fontSize: 15 }}>
                  0.00
                </span>
              </div>
            </div>
          </div>

          {/* Quick navigation */}
          <div className="info-card" style={{ marginBottom: 12 }}>
            <div className="info-card-header">
              <ExternalLink size={18} />
              <h3>Quick Navigation</h3>
            </div>
            <div className="info-card-body" style={{ padding: '8px 16px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '10px 6px',
                  borderBottom: '1px solid var(--border-subtle)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                onClick={() => navigate(`/po-verify/${invoice.id}`)}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--cyan-accent)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = ''; }}
              >
                <CreditCard size={14} style={{ color: 'var(--blue-bright)', flexShrink: 0 }} />
                <span style={{ fontSize: 12, fontWeight: 500 }}>PO {invoice.purchaseDoc}</span>
                <ExternalLink size={12} style={{ marginLeft: 'auto', color: 'var(--text-muted)' }} />
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '10px 6px',
                  borderBottom: '1px solid var(--border-subtle)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                onClick={() => navigate(`/retention/${invoice.id}`)}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--cyan-accent)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = ''; }}
              >
                <Calculator size={14} style={{ color: 'var(--blue-bright)', flexShrink: 0 }} />
                <span style={{ fontSize: 12, fontWeight: 500 }}>Retention Calculator</span>
                <ExternalLink size={12} style={{ marginLeft: 'auto', color: 'var(--text-muted)' }} />
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '10px 6px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                onClick={() => navigate(`/review/${invoice.id}`)}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--cyan-accent)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = ''; }}
              >
                <CheckSquare size={14} style={{ color: 'var(--blue-bright)', flexShrink: 0 }} />
                <span style={{ fontSize: 12, fontWeight: 500 }}>Final Review & Post</span>
                <ExternalLink size={12} style={{ marginLeft: 'auto', color: 'var(--text-muted)' }} />
              </div>
            </div>
          </div>

          {/* Status indicators */}
          <div className="info-card">
            <div className="info-card-header">
              <CircleDot size={18} />
              <h3>Status Indicators</h3>
            </div>
            <div className="info-card-body" style={{ padding: '12px 22px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 500 }}>BG Applicable</span>
                <span style={{
                  display: 'inline-block',
                  padding: '3px 12px',
                  borderRadius: 10,
                  fontSize: 11,
                  fontWeight: 600,
                  background: 'rgba(74, 222, 128, 0.1)',
                  color: 'var(--status-approved)'
                }}>
                  Yes
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 500 }}>LD / SLA</span>
                <span style={{
                  display: 'inline-block',
                  padding: '3px 12px',
                  borderRadius: 10,
                  fontSize: 11,
                  fontWeight: 600,
                  background: 'rgba(74, 222, 128, 0.1)',
                  color: 'var(--status-approved)'
                }}>
                  Yes-LD
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0' }}>
                <span style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 500 }}>SES Approved</span>
                <span style={{
                  display: 'inline-block',
                  padding: '3px 12px',
                  borderRadius: 10,
                  fontSize: 11,
                  fontWeight: 600,
                  background: 'rgba(74, 222, 128, 0.1)',
                  color: 'var(--status-approved)'
                }}>
                  Yes
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
      )}
    </div>
  );
}
