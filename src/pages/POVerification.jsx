import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, FileText, Package, Truck, FileCheck, Shield,
  Paperclip, CreditCard, Building2, Calendar, ClipboardList, Eye,
  Printer, ExternalLink, Calculator
} from 'lucide-react';
import { invoices, poDetails, vendorDetails } from '../data/invoiceData';

const tabsList = [
  { id: 'overview', label: 'Overview', icon: FileText },
  { id: 'serviceEntries', label: 'Service Entries', icon: ClipboardList },
  { id: 'delivery', label: 'Delivery', icon: Truck },
  { id: 'conditions', label: 'Conditions', icon: CreditCard },
  { id: 'bankGuarantee', label: 'Bank Guarantee', icon: Shield },
  { id: 'attachments', label: 'Attachments', icon: Paperclip },
  { id: 'gst', label: 'GST', icon: Building2 },
  { id: 'printPreview', label: 'Print Preview', icon: Printer },
];

const defaultItems = [
  { sNo: 10, itemType: 'Service', category: 'F D', shortText: '33kV Dharavi to Raheja Hospital Cable Route', poQuantity: 1, unit: 'AU', deliveryDate: '18.08.2026', netPrice: 91996.04, currency: 'INR' },
];

const defaultServiceEntries = [
  { materialDoc: '5001580513', mvt: '101', shText: 'ATTND CBL FAULT BY EXCAVN TRENCH<=10M', item: '00010', entrySheet: '1000234567', quantity: 1, amount: 41085.00, unit: 'EA', entryDate: '28.06.2026', itemPostingDate: '01.07.2026', companyCode: '1000' },
  { materialDoc: '5001580513', mvt: '101', shText: 'Debris Removal by mech means', item: '00020', entrySheet: '1000234567', quantity: 3.800, amount: 12412.81, unit: 'M3', entryDate: '28.06.2026', itemPostingDate: '01.07.2026', companyCode: '1000' },
  { materialDoc: '5001580513', mvt: '101', shText: 'Cbl Laying u/g in existing trench', item: '00030', entrySheet: '1000234567', quantity: 8, amount: 4896.40, unit: 'M', entryDate: '28.06.2026', itemPostingDate: '01.07.2026', companyCode: '1000' },
  { materialDoc: '5001580513', mvt: '101', shText: 'Backfilling with Earth/Sand', item: '00040', entrySheet: '1000234567', quantity: 11.400, amount: 5362.53, unit: 'M3', entryDate: '28.06.2026', itemPostingDate: '01.07.2026', companyCode: '1000' },
  { materialDoc: '5001580513', mvt: '101', shText: 'Earth berming/dressing of Cable Rte', item: '00050', entrySheet: '1000234567', quantity: 400, amount: 8964.00, unit: 'BAG', entryDate: '29.06.2026', itemPostingDate: '01.07.2026', companyCode: '1000' },
  { materialDoc: '5001580514', mvt: '101', shText: 'TRANS SER CHARGES FOR CABLE WORK', item: '00060', entrySheet: '1000234568', quantity: 3, amount: 7843.50, unit: 'TP', entryDate: '29.06.2026', itemPostingDate: '01.07.2026', companyCode: '1000' },
  { materialDoc: '5001580514', mvt: '101', shText: 'PROV DG SET & DIESEL FOR CBL WORK', item: '00070', entrySheet: '1000234568', quantity: 5, amount: 7470.00, unit: 'SFT', entryDate: '29.06.2026', itemPostingDate: '01.07.2026', companyCode: '1000' },
  { materialDoc: '5001580514', mvt: '101', shText: 'TRIAL PIT FOR CABLE ROUTE SURVEY', item: '00080', entrySheet: '1000234568', quantity: 1, amount: 1643.40, unit: 'EA', entryDate: '30.06.2026', itemPostingDate: '01.07.2026', companyCode: '1000' },
  { materialDoc: '5001580514', mvt: '101', shText: 'Services for DG Set Operation', item: '00090', entrySheet: '1000234568', quantity: 2, amount: 2318.40, unit: 'SFT', entryDate: '30.06.2026', itemPostingDate: '01.07.2026', companyCode: '1000' },
  { materialDoc: '5001580515', mvt: 'WE', shText: 'Goods Receipt - Cable laying work', item: '00010', entrySheet: '1000234569', quantity: 1, amount: 91996.04, unit: 'AU', entryDate: '30.06.2026', itemPostingDate: '01.07.2026', companyCode: '1000' },
];

const defaultDeliveryMilestones = [
  { label: 'PO Created', date: '15.03.2026', status: 'completed' },
  { label: 'Material Ordered', date: '20.03.2026', status: 'completed' },
  { label: 'Work Started', date: '01.04.2026', status: 'completed' },
  { label: 'Goods Receipt', date: '01.07.2026', status: 'completed' },
  { label: 'Invoice Verification', date: '01.07.2026', status: 'active' },
  { label: 'Payment', date: 'Pending', status: 'pending' },
];

const defaultConditions = [
  { conditionType: 'PB00', description: 'Basic Price', rate: '100%', currency: 'INR', amount: 4523500.00 },
  { conditionType: 'JICG', description: 'CGST 9%', rate: '9%', currency: 'INR', amount: 407115.00 },
  { conditionType: 'JISG', description: 'SGST 9%', rate: '9%', currency: 'INR', amount: 407115.00 },
  { conditionType: 'JTCS', description: 'TCS 0.1%', rate: '0.1%', currency: 'INR', amount: 4523.50 },
];

const defaultAttachmentFiles = [
  { id: 1, title: '8200231872_20260617_145545.pdf', createdOn: '17.06.2026', creator: 'Arvind Hanumant Pophale', createdAt: '14:55:45' },
  { id: 2, title: 'Service Entry Sheet.pdf', createdOn: '28.06.2026', creator: 'Site Engineer', createdAt: '16:20:45' },
  { id: 3, title: 'Work Completion Certificate.pdf', createdOn: '30.06.2026', creator: 'Site Engineer', createdAt: '11:05:30' },
];

const defaultGst = {
  hsnCode: '998731',
  supplyPlace: 'Maharashtra (27)',
  taxCodeGst: 'V1 — Input Tax 18%',
  cgstRate: '9%',
  sgstRate: '9%',
  igstRate: '0%',
};

export default function POVerification() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const invoice = invoices.find(i => i.id === id) || invoices[0];
  const poKeys = Object.keys(poDetails);
  const po = poDetails[invoice.purchaseDoc] || poDetails[poKeys[0]];

  const items = po.items || defaultItems;
  const serviceEntries = po.serviceEntries || defaultServiceEntries;
  const milestones = po.deliveryMilestones || defaultDeliveryMilestones;
  const rawConditions = po.conditions || defaultConditions;
  const attachmentFiles = po.attachmentFiles || defaultAttachmentFiles;
  const vendor = vendorDetails[invoice.vendorNum] || {};
  const rawGst = po.gstDetails || po.gst || defaultGst;
  const deliveryInfo = po.deliveryInfo || {};

  const gst = {
    vendorGstin: rawGst.vendorGSTIN || rawGst.vendorGstin || vendor.gstin || '—',
    companyGstin: rawGst.companyGSTIN || rawGst.companyGstin || '27AAACT0054A1Z1',
    hsnCode: rawGst.hsnCode || '—',
    supplyPlace: rawGst.supplyPlace || '—',
    taxCodeGst: rawGst.taxCodeGst || po.taxCode || '—',
    cgstRate: rawGst.cgstRate != null ? `${rawGst.cgstRate}%` : '—',
    sgstRate: rawGst.sgstRate != null ? `${rawGst.sgstRate}%` : '—',
    igstRate: rawGst.igstRate != null ? `${rawGst.igstRate}%` : '—',
  };

  const conditions = rawConditions.map(c => ({
    conditionType: c.conditionType || c.type || '—',
    description: c.description || '—',
    rate: c.rate || '—',
    currency: c.currency || 'INR',
    amount: c.amount || 0,
  }));

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const getSeAmount = (se) => se.amount || se.amtInLocCur || 0;
  const getSeUnit = (se) => se.unit || se.oUn || 'AU';
  const getSeItem = (se) => se.item || se.itemPostingDate || '—';
  const seTotalAmount = serviceEntries.reduce((sum, se) => sum + getSeAmount(se), 0);
  const conditionsTotalAmount = conditions.reduce((sum, c) => sum + c.amount, 0);

  const delivDate = deliveryInfo.deliveryDate || po.deliveryDate || '30.06.2026';
  const delivStatus = deliveryInfo.deliveryStatus || po.deliveryStatus || 'On Track';
  const grNum = deliveryInfo.grNumber || po.grNumber || '—';
  const grDt = deliveryInfo.grDate || po.grDate || '—';

  const getAttCreator = (att) => att.creator || att.creatorName || '—';

  return (
    <div className="detail-page page-enter">
      {/* Header */}
      <div className="detail-header">
        <div className="detail-title-row">
          <button className="back-btn" onClick={() => navigate(`/posting/${invoice.id}`)}>
            <ArrowLeft size={18} />
          </button>
          <div className="detail-title">
            <h1>Contract Release Ord {po.poNumber}</h1>
            <p>Created by {po.createdBy || 'Deepak Kumbhar'} &middot; PO Verification for invoice {invoice.id}</p>
          </div>
        </div>
        <div className="detail-actions">
          <button className="btn btn-outline" onClick={() => setActiveTab('serviceEntries')}>
            <ClipboardList size={16} />
            Item Detail
          </button>
          <button className="btn btn-outline" onClick={() => setActiveTab('printPreview')}>
            <Printer size={16} />
            Print Preview
          </button>
          <button className="btn btn-outline" onClick={() => navigate(`/posting/${invoice.id}`)}>
            <FileText size={16} />
            Back to Invoice
          </button>
          <button className="btn btn-gold" onClick={() => navigate(`/retention/${invoice.id}`)}>
            <Calculator size={16} />
            Retention Calc
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        {tabsList.map(tab => (
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

      {/* =========== OVERVIEW TAB =========== */}
      {activeTab === 'overview' && (
        <>
          {/* BG & EMD Details banner */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 12,
            marginBottom: 16,
          }}>
            <div style={{
              padding: '14px 18px',
              background: 'rgba(0, 78, 146, 0.08)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
            }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Department</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{po.department || '058'}</div>
            </div>
            <div style={{
              padding: '14px 18px',
              background: 'rgba(0, 78, 146, 0.08)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
            }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>LD & SLA</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: po.ldSlaFlag ? 'var(--status-approved)' : 'var(--text-muted)' }}>
                {po.ldSlaFlag ? '1 Yes-LD' : 'No'}
              </div>
            </div>
            <div style={{
              padding: '14px 18px',
              background: 'rgba(0, 78, 146, 0.08)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
            }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>BG</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: (po.bgFlag || po.bgRequired) ? 'var(--status-approved)' : 'var(--text-muted)' }}>
                {(po.bgFlag || po.bgRequired) ? 'Yes' : 'No'}
              </div>
            </div>
          </div>

          <div className="info-grid">
            <div className="info-card">
              <div className="info-card-header">
                <Package size={18} />
                <h3>Purchase Order Details</h3>
              </div>
              <div className="info-card-body">
                <div className="info-row">
                  <span className="info-label">PO Number</span>
                  <span className="info-value mono gold">{po.poNumber}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Contract Type</span>
                  <span className="info-value">{po.contractType || 'Service Contract'}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Created By</span>
                  <span className="info-value">{po.createdBy || 'Deepak Kumbhar'}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Supplier</span>
                  <span className="info-value">
                    <span style={{ color: 'var(--cyan-accent)', fontFamily: "'JetBrains Mono', monospace", marginRight: 8 }}>
                      {po.vendorNum}
                    </span>
                    {po.vendorName}
                  </span>
                </div>
                <div className="info-row">
                  <span className="info-label">Document Date</span>
                  <span className="info-value mono">{po.documentDate || po.docDate || invoice.creationDate}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Department</span>
                  <span className="info-value">{po.department || '058 — Distribution'}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">OLA Ref No</span>
                  <span className="info-value mono">{po.olaRefNo || '—'}</span>
                </div>
              </div>
            </div>

            <div className="info-card">
              <div className="info-card-header">
                <CreditCard size={18} />
                <h3>Order Summary</h3>
              </div>
              <div className="info-card-body">
                <div className="info-row">
                  <span className="info-label">Order Value</span>
                  <span className="info-value large">{formatAmount(po.orderValue)} INR</span>
                </div>
                <div className="info-row">
                  <span className="info-label">LD/SLA Flag</span>
                  <span className="info-value">
                    <span className={`status-badge ${po.ldSlaFlag ? 'approved' : 'pending'}`} style={{ fontSize: 11 }}>
                      <span className="dot"></span>
                      {po.ldSlaFlag ? 'Yes-LD' : 'No'}
                    </span>
                  </span>
                </div>
                <div className="info-row">
                  <span className="info-label">BG Flag</span>
                  <span className="info-value">
                    <span className={`status-badge ${po.bgFlag || po.bgRequired ? 'approved' : 'pending'}`} style={{ fontSize: 11 }}>
                      <span className="dot"></span>
                      {po.bgFlag || po.bgRequired ? 'Yes' : 'No'}
                    </span>
                  </span>
                </div>
                <div className="info-row">
                  <span className="info-label">EMD Details</span>
                  <span className="info-value" style={{ color: 'var(--text-muted)' }}>N/A</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Segment</span>
                  <span className="info-value">{po.segment || '—'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Item Details Table */}
          <div className="info-card">
            <div className="info-card-header">
              <ClipboardList size={18} />
              <h3>Item Details</h3>
              <button
                className="btn btn-outline"
                style={{ marginLeft: 'auto', padding: '5px 14px', fontSize: 11 }}
                onClick={() => setActiveTab('serviceEntries')}
              >
                <ClipboardList size={13} />
                View Service Entries
              </button>
            </div>
            <div style={{ padding: 0 }}>
              <table className="line-items-table">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Type</th>
                    <th>Cat.</th>
                    <th>Short Text</th>
                    <th>Qty</th>
                    <th>Unit</th>
                    <th>Delivery Date</th>
                    <th style={{ textAlign: 'right' }}>Net Price</th>
                    <th>Currency</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.sNo}>
                      <td style={{ fontFamily: "'JetBrains Mono', monospace" }}>{item.sNo}</td>
                      <td>{item.itemType}</td>
                      <td>{item.category}</td>
                      <td style={{ color: 'var(--text-primary)' }}>{item.shortText}</td>
                      <td>{item.poQuantity}</td>
                      <td>{item.unit || 'AU'}</td>
                      <td style={{ fontFamily: "'JetBrains Mono', monospace" }}>{item.deliveryDate || item.delivDate || '—'}</td>
                      <td style={{ textAlign: 'right', fontFamily: "'JetBrains Mono', monospace" }}>
                        {formatAmount(item.netPrice)}
                      </td>
                      <td>{item.currency}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="table-footer">
              <span>{items.length} item(s)</span>
              <span>Total: <strong>{formatAmount(items.reduce((s, i) => s + i.netPrice, 0))} INR</strong></span>
            </div>
          </div>
        </>
      )}

      {/* =========== SERVICE ENTRIES TAB =========== */}
      {activeTab === 'serviceEntries' && (
        <div className="info-card">
          <div className="info-card-header">
            <ClipboardList size={18} />
            <h3>Service Entry Sheets</h3>
          </div>
          <div style={{ padding: 0 }}>
            <table className="line-items-table">
              <thead>
                <tr>
                  <th>Material Doc</th>
                  <th>Mvt</th>
                  <th>Sh.Text</th>
                  <th>Item</th>
                  <th>Entry Sheet</th>
                  <th>Qty</th>
                  <th style={{ textAlign: 'right' }}>Amount</th>
                  <th>Unit</th>
                  <th>Entry Date</th>
                  <th>Item Posting Date</th>
                  <th>CoCd</th>
                </tr>
              </thead>
              <tbody>
                {serviceEntries.map((se, idx) => (
                  <tr key={idx}>
                    <td style={{ fontFamily: "'JetBrains Mono', monospace", color: 'var(--cyan-accent)' }}>
                      {se.materialDoc}
                    </td>
                    <td>{se.mvt}</td>
                    <td style={{ color: 'var(--text-primary)', fontSize: 12 }}>{se.shText}</td>
                    <td style={{ fontFamily: "'JetBrains Mono', monospace" }}>{getSeItem(se)}</td>
                    <td style={{ fontFamily: "'JetBrains Mono', monospace" }}>{se.entrySheet}</td>
                    <td>{se.quantity}</td>
                    <td style={{ textAlign: 'right', fontFamily: "'JetBrains Mono', monospace" }}>
                      {formatAmount(getSeAmount(se))}
                    </td>
                    <td>{getSeUnit(se)}</td>
                    <td style={{ fontFamily: "'JetBrains Mono', monospace" }}>{se.entryDate}</td>
                    <td style={{ fontFamily: "'JetBrains Mono', monospace" }}>{se.itemPostingDate || '—'}</td>
                    <td>{se.companyCode}</td>
                  </tr>
                ))}
                <tr className="total-row">
                  <td colSpan={6} style={{ textAlign: 'right' }}>Total</td>
                  <td style={{ textAlign: 'right' }}>{formatAmount(seTotalAmount)}</td>
                  <td colSpan={4}></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="table-footer">
            <span>{serviceEntries.length} service entry sheet(s)</span>
            <span>Total: <strong>{formatAmount(seTotalAmount)} INR</strong></span>
          </div>
        </div>
      )}

      {/* =========== DELIVERY TAB =========== */}
      {activeTab === 'delivery' && (
        <>
          <div className="info-card" style={{ marginBottom: 16 }}>
            <div className="info-card-header">
              <Truck size={18} />
              <h3>Delivery Schedule</h3>
            </div>
            <div className="info-card-body">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 40px' }}>
                <div>
                  <div className="info-row">
                    <span className="info-label">Delivery Date</span>
                    <span className="info-value mono">{delivDate}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Delivery Status</span>
                    <span className="info-value">
                      <span className={`status-badge ${delivStatus === 'On Track' ? 'approved' : 'pending'}`} style={{ fontSize: 11 }}>
                        <span className="dot"></span>
                        {delivStatus}
                      </span>
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Goods Receipt</span>
                    <span className="info-value">
                      <span className="status-badge approved" style={{ fontSize: 11 }}>
                        <span className="dot"></span>
                        Received
                      </span>
                    </span>
                  </div>
                </div>
                <div>
                  <div className="info-row">
                    <span className="info-label">GR Number</span>
                    <span className="info-value mono gold">{grNum}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">GR Date</span>
                    <span className="info-value mono">{grDt}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="info-card">
            <div className="info-card-header">
              <Calendar size={18} />
              <h3>Delivery Milestones</h3>
            </div>
            <div style={{ padding: '20px 22px' }}>
              {milestones.map((ms, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, paddingTop: 4 }}>
                    <div style={{
                      width: 12, height: 12, borderRadius: '50%',
                      background: ms.status === 'completed' ? 'var(--status-approved)' : ms.status === 'active' ? 'var(--cyan-accent)' : 'var(--text-muted)',
                      flexShrink: 0,
                      boxShadow: ms.status === 'active' ? '0 0 10px rgba(0, 212, 255, 0.5)' : ms.status === 'completed' ? '0 0 8px rgba(74, 222, 128, 0.4)' : 'none',
                    }} />
                    {idx < milestones.length - 1 && (
                      <div style={{ width: 2, height: 32, background: ms.status === 'completed' ? 'rgba(74, 222, 128, 0.3)' : 'var(--border-subtle)' }} />
                    )}
                  </div>
                  <div style={{ flex: 1, paddingBottom: idx < milestones.length - 1 ? 12 : 0 }}>
                    <div style={{
                      fontSize: 13, fontWeight: 600,
                      color: ms.status === 'active' ? 'var(--cyan-accent)' : ms.status === 'completed' ? 'var(--text-primary)' : 'var(--text-muted)',
                    }}>{ms.label}</div>
                    <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: 'var(--text-muted)', marginTop: 3 }}>{ms.date}</div>
                  </div>
                  <div style={{ paddingTop: 2 }}>
                    {ms.status === 'completed' && <span className="status-badge approved" style={{ fontSize: 10 }}><span className="dot"></span>Done</span>}
                    {ms.status === 'active' && <span className="status-badge in-review" style={{ fontSize: 10 }}><span className="dot"></span>In Progress</span>}
                    {ms.status === 'pending' && <span className="status-badge pending" style={{ fontSize: 10 }}><span className="dot"></span>Pending</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* =========== CONDITIONS TAB =========== */}
      {activeTab === 'conditions' && (
        <div className="info-card">
          <div className="info-card-header">
            <CreditCard size={18} />
            <h3>Pricing Conditions</h3>
          </div>
          <div style={{ padding: 0 }}>
            <table className="line-items-table">
              <thead>
                <tr>
                  <th>Condition Type</th>
                  <th>Description</th>
                  <th>Rate</th>
                  <th>Currency</th>
                  <th style={{ textAlign: 'right' }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {conditions.map((cond, idx) => (
                  <tr key={idx}>
                    <td style={{ fontFamily: "'JetBrains Mono', monospace", color: 'var(--cyan-accent)' }}>{cond.conditionType}</td>
                    <td style={{ color: 'var(--text-primary)' }}>{cond.description}</td>
                    <td style={{ fontFamily: "'JetBrains Mono', monospace" }}>{cond.rate}</td>
                    <td>{cond.currency}</td>
                    <td style={{ textAlign: 'right', fontFamily: "'JetBrains Mono', monospace" }}>{formatAmount(cond.amount)}</td>
                  </tr>
                ))}
                <tr className="total-row">
                  <td colSpan={4} style={{ textAlign: 'right' }}>Total</td>
                  <td style={{ textAlign: 'right' }}>{formatAmount(conditionsTotalAmount)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="table-footer">
            <span>{conditions.length} condition(s)</span>
            <span>Total: <strong>{formatAmount(conditionsTotalAmount)} INR</strong></span>
          </div>
        </div>
      )}

      {/* =========== BANK GUARANTEE TAB =========== */}
      {activeTab === 'bankGuarantee' && (
        <>
          <div className="info-card" style={{ marginBottom: 16 }}>
            <div className="info-card-header">
              <Shield size={18} />
              <h3>CPBG Calculation</h3>
            </div>
            <div className="info-card-body">
              <div className="info-row">
                <span className="info-label">BG Calculated On</span>
                <span className="info-value">{po.bgCalculatedOn || 'Annualized OLA Value Without GST'}</span>
              </div>
              <div className="info-row">
                <span className="info-label">BG Percentage</span>
                <span className="info-value mono">{po.bgPercentage || 10}%</span>
              </div>
              <div className="info-row">
                <span className="info-label">CBG %</span>
                <span className="info-value mono">{po.cbgPercent || 1.32}%</span>
              </div>
              <div className="info-row">
                <span className="info-label">Tenure</span>
                <span className="info-value">{po.bgTenure || po.tenure || '42 Months'}</span>
              </div>
              <div className="info-row">
                <span className="info-label">5% of Order Value</span>
                <span className="info-value mono">{formatAmount(po.fivePercentOfOrder)} INR</span>
              </div>
              <div className="info-row">
                <span className="info-label">Previous CPBG Deducted</span>
                <span className="info-value mono">{formatAmount(po.previousCPBGDeducted)} INR</span>
              </div>
              <div className="info-row">
                <span className="info-label">Remaining to Deduct</span>
                <span className="info-value mono" style={{ color: 'var(--status-pending)' }}>
                  {formatAmount(po.remainingToDeduct)} INR
                </span>
              </div>
            </div>
          </div>

          <div className="info-card">
            <div className="info-card-header">
              <FileCheck size={18} />
              <h3>Bank Guarantee Clauses</h3>
            </div>
            <div className="info-card-body">
              <div style={{
                background: 'rgba(0, 78, 146, 0.08)',
                border: '1px solid var(--border-subtle)',
                borderLeft: '3px solid var(--cyan-accent)',
                borderRadius: 'var(--radius-sm)',
                padding: '16px 20px',
                marginBottom: 16,
                fontSize: 13,
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
              }}>
                {po.bankGuaranteeText || 'The contractor shall furnish a Contract Performance Bank Guarantee (CPBG) equivalent to 10% of the total order value. CPBG of 10% of order value to be provided within 30 days from date of LOA.'}
              </div>

              <div style={{
                background: 'rgba(0, 78, 146, 0.05)',
                border: '1px solid var(--border-subtle)',
                borderLeft: '3px solid var(--blue-bright)',
                borderRadius: 'var(--radius-sm)',
                padding: '16px 20px',
                marginBottom: 16,
                fontSize: 13,
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
              }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--blue-soft)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>
                  Payment Terms
                </div>
                {po.paymentTermsText || 'Payment shall be made within 45 days from the date of receipt of invoice subject to submission of all required documents.'}
              </div>

              <div style={{
                background: 'rgba(0, 78, 146, 0.05)',
                border: '1px solid var(--border-subtle)',
                borderLeft: '3px solid var(--status-pending)',
                borderRadius: 'var(--radius-sm)',
                padding: '16px 20px',
                fontSize: 13,
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
              }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--blue-soft)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>
                  Safety Retention
                </div>
                {po.safetyRetentionText || 'A safety retention of 2.5% shall be deducted from each running account bill and shall be released after successful completion of the defect liability period.'}
              </div>
            </div>
          </div>
        </>
      )}

      {/* =========== ATTACHMENTS TAB =========== */}
      {activeTab === 'attachments' && (
        <>
          {/* PBG Status */}
          <div style={{
            padding: '14px 20px',
            marginBottom: 16,
            background: 'rgba(248, 113, 113, 0.06)',
            border: '1px solid rgba(248, 113, 113, 0.15)',
            borderLeft: '3px solid var(--status-rejected)',
            borderRadius: 'var(--radius-sm)',
            fontSize: 13,
            color: 'var(--text-secondary)',
          }}>
            <strong style={{ color: 'var(--status-rejected)' }}>PBG Status:</strong> No BJ available (No Bank Guarantee document uploaded)
          </div>

          <div className="info-card">
            <div className="info-card-header">
              <Paperclip size={18} />
              <h3>Attachments</h3>
            </div>
            <div style={{ padding: '4px 0' }}>
              {attachmentFiles.map((att, attIdx) => (
                <div
                  key={att.id || attIdx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    padding: '14px 22px',
                    borderBottom: '1px solid var(--border-subtle)',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0, 78, 146, 0.06)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                >
                  <div style={{
                    width: 40, height: 40,
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(0, 78, 146, 0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <FileText size={18} style={{ color: 'var(--blue-bright)' }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 3 }}>
                      {att.title}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                      Created on {att.createdOn} by {getAttCreator(att)} at {att.createdAt}
                    </div>
                  </div>
                  <button className="btn btn-outline" style={{ padding: '6px 14px', fontSize: 12 }}>
                    <Eye size={14} />
                    View
                  </button>
                </div>
              ))}
            </div>
            <div className="table-footer">
              <span>{attachmentFiles.length} attachment(s)</span>
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  className="btn btn-outline"
                  style={{ padding: '5px 14px', fontSize: 11 }}
                  onClick={() => setActiveTab('printPreview')}
                >
                  <Printer size={13} />
                  Print Preview
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* =========== GST TAB =========== */}
      {activeTab === 'gst' && (
        <div className="info-card">
          <div className="info-card-header">
            <Building2 size={18} />
            <h3>GST Details</h3>
          </div>
          <div className="info-card-body">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 40px' }}>
              <div>
                <div className="info-row">
                  <span className="info-label">Vendor GSTIN</span>
                  <span className="info-value mono">{gst.vendorGstin}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Company GSTIN</span>
                  <span className="info-value mono">{gst.companyGstin}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">HSN Code</span>
                  <span className="info-value mono gold">{gst.hsnCode}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Supply Place</span>
                  <span className="info-value">{gst.supplyPlace}</span>
                </div>
              </div>
              <div>
                <div className="info-row">
                  <span className="info-label">Tax Code</span>
                  <span className="info-value">{gst.taxCodeGst || po.taxCode}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">CGST Rate</span>
                  <span className="info-value mono">{gst.cgstRate}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">SGST Rate</span>
                  <span className="info-value mono">{gst.sgstRate}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">IGST Rate</span>
                  <span className="info-value mono">{gst.igstRate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========== PRINT PREVIEW TAB =========== */}
      {activeTab === 'printPreview' && (
        <div className="info-card">
          <div style={{
            background: '#fff',
            color: '#000',
            padding: '40px 50px',
            fontFamily: 'serif',
            lineHeight: 1.6,
            minHeight: 600,
          }}>
            {/* Tata Power Header */}
            <div style={{ textAlign: 'center', borderBottom: '3px solid #000', paddingBottom: 16, marginBottom: 24 }}>
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, letterSpacing: 1 }}>THE TATA POWER COMPANY LIMITED</h2>
              <p style={{ margin: '4px 0 0', fontSize: 12, color: '#555' }}>Registered Office: Bombay House, 24 Homi Mody Street, Fort, Mumbai - 400 001</p>
            </div>

            {/* PO Title */}
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, textDecoration: 'underline' }}>PURCHASE ORDER</h3>
            </div>

            {/* PO Details Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 40px', fontSize: 13, marginBottom: 24 }}>
              <div><strong>PO Number:</strong> {po.poNumber}</div>
              <div><strong>PO Date:</strong> {po.documentDate || po.docDate || invoice.creationDate}</div>
              <div><strong>Vendor:</strong> {po.vendorName}</div>
              <div><strong>Vendor No:</strong> {po.vendorNum}</div>
              <div><strong>Created By:</strong> {po.createdBy || 'Deepak Kumbhar'}</div>
              <div><strong>Department:</strong> {po.department || '058 — Distribution'}</div>
              <div><strong>OLA Ref No:</strong> {po.olaRefNo || '—'}</div>
              <div><strong>Contract Type:</strong> {po.contractType || 'Service Contract'}</div>
            </div>

            {/* Description */}
            <div style={{ marginBottom: 24, fontSize: 13 }}>
              <strong>Description:</strong> {items[0]?.shortText || '33kV Dharavi to Raheja Hospital Cable Route'}
            </div>

            {/* Order Value */}
            <div style={{ marginBottom: 24, padding: '12px 16px', background: '#f5f5f5', border: '1px solid #ddd', fontSize: 14 }}>
              <strong>Total Order Value:</strong> INR {formatAmount(po.orderValue)}
            </div>

            {/* Payment Terms Section */}
            <div style={{ marginBottom: 20 }}>
              <h4 style={{ fontSize: 14, fontWeight: 700, borderBottom: '1px solid #ccc', paddingBottom: 6, marginBottom: 10 }}>
                Payment Terms
              </h4>
              <p style={{ fontSize: 12, margin: 0 }}>
                {po.paymentTermsText || 'Payment shall be made within 45 days from the date of receipt of invoice. P45 — 45 Days net.'}
              </p>
            </div>

            {/* Safety Retention Section */}
            <div style={{ marginBottom: 20 }}>
              <h4 style={{ fontSize: 14, fontWeight: 700, borderBottom: '1px solid #ccc', paddingBottom: 6, marginBottom: 10 }}>
                Safety Retention
              </h4>
              <p style={{ fontSize: 12, margin: 0 }}>
                {po.safetyRetentionText || 'A safety retention of 2.5% shall be deducted from each running account bill and shall be released after successful completion of the defect liability period of 12 months from the date of completion.'}
              </p>
            </div>

            {/* Bank Guarantee Section */}
            <div style={{ marginBottom: 20 }}>
              <h4 style={{ fontSize: 14, fontWeight: 700, borderBottom: '1px solid #ccc', paddingBottom: 6, marginBottom: 10 }}>
                Bank Guarantee
              </h4>
              <p style={{ fontSize: 12, margin: 0 }}>
                {po.bankGuaranteeText || 'The contractor shall furnish a Contract Performance Bank Guarantee (CPBG) equivalent to 10% of the total order value.'}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 30px', fontSize: 12, marginTop: 12, padding: '10px 14px', background: '#f9f9f9', border: '1px solid #eee' }}>
                <div><strong>CBG:</strong> {po.cbgPercent || 1.32}%</div>
                <div><strong>Tenure:</strong> {po.bgTenure || po.tenure || '42 Months'}</div>
                <div><strong>BG Value Calculated On:</strong> {po.bgCalculatedOn || 'Annualized OLA Value Without GST'}</div>
                <div><strong>CPBG:</strong> {po.bgPercentage || 10}%</div>
              </div>
            </div>

            {/* Footer */}
            <div style={{ marginTop: 40, borderTop: '1px solid #ccc', paddingTop: 12, fontSize: 11, color: '#888', textAlign: 'center' }}>
              This is a system-generated document. The Tata Power Company Limited.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
