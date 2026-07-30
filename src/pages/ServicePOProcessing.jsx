import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, User, Building2, FileText, CreditCard,
  History, MessageSquare, Image, Calculator, Receipt,
  Scale, GitBranch, MoreHorizontal
} from 'lucide-react';
import { invoices, vendorDetails, recipientData, workflowHistory, lineItems, poDetails } from '../data/invoiceData';

const tabs = [
  { id: 'basic', label: 'Basic Data', icon: FileText },
  { id: 'lineItems', label: 'Line Items', icon: Receipt },
  { id: 'accounting', label: 'Accounting', icon: Calculator },
  { id: 'tax', label: 'Tax', icon: Scale },
  { id: 'process', label: 'Process', icon: GitBranch },
  { id: 'other', label: 'Other Data', icon: MoreHorizontal },
];

export default function ServicePOProcessing() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('basic');
  const [activePanel, setActivePanel] = useState('history');

  const invoice = invoices.find(i => i.id === id) || invoices[1];
  const vendor = vendorDetails[invoice.vendorNum] || vendorDetails['100015200'];

  const [transEvent, setTransEvent] = useState('invoice');
  const origAmount = invoice.id === '5100034388' ? 10855.32 : invoice.amount;
  const origRefDoc = invoice.id === '5100034388' ? 'TPCL-27/32' : invoice.refDoc;
  const [invoiceAmount, setInvoiceAmount] = useState(origAmount);
  const [invoiceAmountText, setInvoiceAmountText] = useState('');
  const [isAmountFocused, setIsAmountFocused] = useState(false);
  const [refDoc, setRefDoc] = useState(origRefDoc);
  const [purchaseDoc, setPurchaseDoc] = useState(invoice.purchaseDoc);

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const totalLineItemAmount = lineItems.reduce((sum, item) => sum + item.netPrice, 0);

  return (
    <div className="detail-page page-enter">
      {/* Header */}
      <div className="detail-header">
        <div className="detail-title-row">
          <button className="back-btn" onClick={() => navigate(`/approval/${invoice.id}`)}>
            <ArrowLeft size={18} />
          </button>
          <div className="detail-title">
            <h1>Display SERVICE PO Processing for TATA POWER — {invoice.headerText}</h1>
            <p>OpenText Vendor Invoice Management for SAP Solutions</p>
          </div>
        </div>
        <div className="detail-actions">
          <button className="btn btn-gold" onClick={() => navigate(`/posting/${invoice.id}`)}>
            <CreditCard size={16} />
            Change/Post
          </button>
          <button className="btn btn-outline">
            <Image size={16} />
            Display Image
          </button>
          <button className="btn btn-outline">
            <MessageSquare size={16} />
            Open Comments
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} />
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '16px' }}>
        {/* Main Content */}
        <div>
          {activeTab === 'basic' && (
            <>
              {/* Vendor Data */}
              <div className="info-card" style={{ marginBottom: 16 }}>
                <div className="info-card-header">
                  <User size={18} />
                  <h3>Vendor Data</h3>
                </div>
                <div className="info-card-body">
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 40px' }}>
                    <div>
                      <div className="info-row">
                        <span className="info-label">Vendor Number</span>
                        <span className="info-value mono gold">{vendor.vendorNumber}</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">Vendor Name</span>
                        <span className="info-value">{vendor.vendorName}</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">Street / House No</span>
                        <span className="info-value">{vendor.street}</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">Postal Code / City</span>
                        <span className="info-value">{vendor.postalCode} &nbsp; {vendor.city}</span>
                      </div>
                    </div>
                    <div>
                      <div className="info-row">
                        <span className="info-label">Part. Bank Type</span>
                        <span className="info-value">&mdash;</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">Bank Name</span>
                        <span className="info-value">{vendor.bankName}</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">Bank Account</span>
                        <span className="info-value mono">{vendor.bankAccount}</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">Bank Number</span>
                        <span className="info-value mono">{vendor.bankNumber}</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">Country / Region</span>
                        <span className="info-value">{vendor.country} &nbsp; {vendor.region}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recipient Data */}
              <div className="info-card" style={{ marginBottom: 16 }}>
                <div className="info-card-header">
                  <Building2 size={18} />
                  <h3>Recipient Data</h3>
                </div>
                <div className="info-card-body">
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 40px' }}>
                    <div>
                      <div className="info-row">
                        <span className="info-label">Company Code</span>
                        <span className="info-value">{recipientData.companyCode} &nbsp; {recipientData.companyName}</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">Street / House No</span>
                        <span className="info-value">{recipientData.street}</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">Postal Code / City</span>
                        <span className="info-value">{recipientData.postalCode} &nbsp; {recipientData.city}</span>
                      </div>
                    </div>
                    <div>
                      <div className="info-row">
                        <span className="info-label">Country / Region</span>
                        <span className="info-value">{recipientData.country} &nbsp; {recipientData.region}</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">PO Box</span>
                        <span className="info-value">&mdash;</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Invoice Data */}
              <div className="info-card">
                <div className="info-card-header">
                  <CreditCard size={18} />
                  <h3>Invoice Data</h3>
                </div>
                <div className="info-card-body">
                  <div className="info-row">
                    <span className="info-label">Trans./event</span>
                    <span className="info-value">
                      <select className="form-select" style={{ width: 200 }} value={transEvent} onChange={e => setTransEvent(e.target.value)}>
                        <option value="invoice">Invoice</option>
                        <option value="credit">Credit Memo</option>
                      </select>
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Invoice Amount</span>
                    <span className="info-value">
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <input
                          className="form-input"
                          type="text"
                          value={isAmountFocused ? invoiceAmountText : formatAmount(invoiceAmount)}
                          onFocus={e => {
                            setIsAmountFocused(true);
                            setInvoiceAmountText(String(invoiceAmount));
                          }}
                          onBlur={e => {
                            setIsAmountFocused(false);
                            const num = parseFloat(invoiceAmountText);
                            if (!isNaN(num) && num > 0) setInvoiceAmount(num);
                            else setInvoiceAmountText(String(invoiceAmount));
                          }}
                          onChange={e => {
                            const val = e.target.value.replace(/[^0-9.]/g, '');
                            setInvoiceAmountText(val);
                            const num = parseFloat(val);
                            if (!isNaN(num)) setInvoiceAmount(num);
                          }}
                          style={{
                            width: 200,
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: 16,
                            fontWeight: 700,
                            color: 'var(--cyan-accent)',
                          }}
                        />
                        <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--cyan-accent)' }}>INR</span>
                      </div>
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Reference Doc #</span>
                    <span className="info-value">
                      <input
                        className="form-input"
                        type="text"
                        value={refDoc}
                        onChange={e => setRefDoc(e.target.value)}
                        style={{
                          width: 200,
                          fontFamily: "'JetBrains Mono', monospace",
                        }}
                      />
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Purchase Doc #</span>
                    <span className="info-value">
                      <input
                        className="form-input"
                        type="text"
                        value={purchaseDoc}
                        onChange={e => setPurchaseDoc(e.target.value)}
                        style={{
                          width: 200,
                          fontFamily: "'JetBrains Mono', monospace",
                          color: 'var(--cyan-accent)',
                        }}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'lineItems' && (
            <div className="info-card">
              <div className="info-card-header">
                <Receipt size={18} />
                <h3>Line Items</h3>
              </div>
              <div style={{ padding: 0 }}>
                <table className="line-items-table">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>PO Number</th>
                      <th>PO Item</th>
                      <th>Material</th>
                      <th>Description</th>
                      <th>Qty</th>
                      <th>Unit</th>
                      <th style={{ textAlign: 'right' }}>Net Price</th>
                      <th>Currency</th>
                      <th>Tax Code</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lineItems.map((item) => (
                      <tr key={item.item}>
                        <td style={{ fontFamily: "'JetBrains Mono', monospace" }}>{item.item}</td>
                        <td style={{ fontFamily: "'JetBrains Mono', monospace", color: 'var(--cyan-accent)' }}>{item.poNumber}</td>
                        <td>{item.poItem}</td>
                        <td>{item.material}</td>
                        <td style={{ color: 'var(--text-primary)' }}>{item.description}</td>
                        <td>{item.quantity}</td>
                        <td>{item.unit}</td>
                        <td style={{ textAlign: 'right', fontFamily: "'JetBrains Mono', monospace" }}>
                          {formatAmount(item.netPrice)}
                        </td>
                        <td>{item.currency}</td>
                        <td>{item.taxCode}</td>
                      </tr>
                    ))}
                    <tr className="total-row">
                      <td colSpan={7} style={{ textAlign: 'right' }}>Total</td>
                      <td style={{ textAlign: 'right' }}>{formatAmount(totalLineItemAmount)}</td>
                      <td>INR</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="table-footer">
                <span>Ln 1 — Ln {lineItems.length} of {lineItems.length} lines</span>
                <span>Total: <strong>{formatAmount(totalLineItemAmount)} INR</strong></span>
              </div>
            </div>
          )}

          {activeTab === 'accounting' && (
            <div className="info-card">
              <div className="info-card-header">
                <Calculator size={18} />
                <h3>Accounting Information</h3>
              </div>
              <div className="info-card-body">
                <div className="info-row">
                  <span className="info-label">G/L Account</span>
                  <span className="info-value mono">4000100</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Cost Center</span>
                  <span className="info-value mono">1000-CC-ADM</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Profit Center</span>
                  <span className="info-value mono">PC-TATA-001</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Business Area</span>
                  <span className="info-value">1000 — Administration</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Payment Terms</span>
                  <span className="info-value">Z030 — 30 days net</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tax' && (
            <div className="info-card">
              <div className="info-card-header">
                <Scale size={18} />
                <h3>Tax Information</h3>
              </div>
              <div className="info-card-body">
                <div className="info-row">
                  <span className="info-label">Tax Code</span>
                  <span className="info-value">V1 — Input Tax 18%</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Tax Amount</span>
                  <span className="info-value mono">{formatAmount(invoice.amount * 0.18)} INR</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Base Amount</span>
                  <span className="info-value mono">{formatAmount(invoice.amount)} INR</span>
                </div>
                <div className="info-row">
                  <span className="info-label">GST Number</span>
                  <span className="info-value mono">{vendor.gstin || '—'}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">HSN/SAC Code</span>
                  <span className="info-value mono">{(poDetails[invoice.purchaseDoc]?.gstDetails?.hsnCode) || '998731'}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'process' && (
            <div className="info-card">
              <div className="info-card-header">
                <GitBranch size={18} />
                <h3>Process Information</h3>
              </div>
              <div className="info-card-body">
                <div className="info-row">
                  <span className="info-label">Workflow Status</span>
                  <span className="info-value">
                    <span className={`status-badge ${invoice.status.toLowerCase().replace(' ', '-')}`}>
                      <span className="dot"></span>
                      {invoice.status}
                    </span>
                  </span>
                </div>
                <div className="info-row">
                  <span className="info-label">Current Processor</span>
                  <span className="info-value">PO_AP_PROC_TP</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Parked By</span>
                  <span className="info-value">{invoice.parkedBy}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Created On</span>
                  <span className="info-value mono">{invoice.creationDate}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Scan Location</span>
                  <span className="info-value">{invoice.scanLocation}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'other' && (
            <div className="info-card">
              <div className="info-card-header">
                <MoreHorizontal size={18} />
                <h3>Additional Data</h3>
              </div>
              <div className="info-card-body">
                <div className="info-row">
                  <span className="info-label">Document Type</span>
                  <span className="info-value">{invoice.docType} — Invoice - Gross</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Currency</span>
                  <span className="info-value">INR — Indian Rupee</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Exchange Rate</span>
                  <span className="info-value mono">1.000000</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Payment Method</span>
                  <span className="info-value">T — Bank Transfer</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Baseline Date</span>
                  <span className="info-value mono">{invoice.creationDate}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel */}
        <div>
          {/* Panel Tabs */}
          <div style={{ display: 'flex', gap: 4, marginBottom: 12 }}>
            {[
              { id: 'image', label: 'Image', icon: Image },
              { id: 'history', label: 'History', icon: History },
              { id: 'comments', label: 'Comments', icon: MessageSquare },
            ].map(panel => (
              <button
                key={panel.id}
                className={`tab ${activePanel === panel.id ? 'active' : ''}`}
                style={{ flex: 1, justifyContent: 'center', display: 'flex', alignItems: 'center', gap: 6 }}
                onClick={() => setActivePanel(panel.id)}
              >
                <panel.icon size={14} />
                {panel.label}
              </button>
            ))}
          </div>

          {activePanel === 'history' && (
            <div className="workflow-panel">
              <div className="workflow-panel-header">
                <h3>Change History</h3>
              </div>
              {workflowHistory.map((entry, i) => (
                <div key={i} className="workflow-entry">
                  <div className="workflow-dot-line">
                    <div className="workflow-dot" />
                    {i < workflowHistory.length - 1 && <div className="workflow-line" />}
                  </div>
                  <div className="workflow-entry-content">
                    <div className="workflow-entry-action">{entry.action}</div>
                    <div className="workflow-entry-user">{entry.user}</div>
                    <div className="workflow-entry-time">{entry.date} &nbsp; {entry.time}</div>
                    <div className="workflow-entry-status">{entry.status}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activePanel === 'image' && (
            <div className="info-card">
              <div className="info-card-header">
                <Image size={18} />
                <h3>Invoice Image</h3>
              </div>
              <div style={{
                padding: '60px 20px',
                textAlign: 'center',
                color: 'var(--text-muted)',
                fontSize: 13
              }}>
                <Image size={48} style={{ opacity: 0.2, marginBottom: 12, display: 'block', margin: '0 auto 12px' }} />
                Invoice image preview would appear here.
                <br />
                <span style={{ fontSize: 11 }}>Click "Display Image" to view the scanned invoice.</span>
              </div>
            </div>
          )}

          {activePanel === 'comments' && (
            <div className="comments-section">
              <div className="comments-header">
                <h3>Approval Comments</h3>
              </div>
              <div className="comment-empty">
                <MessageSquare size={32} style={{ opacity: 0.2, marginBottom: 8, display: 'block', margin: '0 auto 8px' }} />
                No Entry
                <br />
                <span style={{ fontSize: 11 }}>No approval comments have been added yet.</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
