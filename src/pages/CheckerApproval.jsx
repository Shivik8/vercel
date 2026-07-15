import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, FileText, Eye, ShoppingCart,
  MoreVertical, GitBranch, Play, Archive,
  FileSearch, LayoutDashboard, ChevronDown,
  ClipboardCheck, Shield, CreditCard, Package, Calculator, CheckCircle
} from 'lucide-react';
import { invoices, processOptions } from '../data/invoiceData';

export default function CheckerApproval() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showWorkflowMenu, setShowWorkflowMenu] = useState(false);
  const [referGroup, setReferGroup] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowWorkflowMenu(false);
      }
    }
    if (showWorkflowMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showWorkflowMenu]);

  const invoice = invoices.find(i => i.id === id) || invoices[1];

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const workflowMenuItems = [
    { icon: GitBranch, label: 'Current workflow task' },
    { icon: Eye, label: 'Workflow overview' },
    { icon: Archive, label: 'Archived workflows' },
    { icon: Play, label: 'Start Workflow' },
    { divider: true },
    { icon: FileSearch, label: 'Open Text DP Document' },
    { icon: LayoutDashboard, label: 'Open Text Dashboard' },
  ];

  return (
    <div className="detail-page page-enter">
      {/* Header */}
      <div className="detail-header">
        <div className="detail-title-row">
          <button className="back-btn" onClick={() => navigate('/')}>
            <ArrowLeft size={18} />
          </button>
          <div className="detail-title">
            <h1>Dashboard {invoice.id} — Checker Approval</h1>
            <p>OpenText Vendor Invoice Management for SAP Solutions</p>
          </div>
        </div>
        <div className="detail-actions">
          <button className="btn btn-gold" onClick={() => navigate(`/document/${invoice.id}`)}>
            <FileText size={16} />
            SAP Invoice
          </button>
          <button className="btn btn-outline" onClick={() => navigate(`/document/${invoice.id}`)}>
            <Eye size={16} />
            Orig. Invoice
          </button>
          <button className="btn btn-outline" onClick={() => navigate(`/po-verify/${invoice.id}`)}>
            <ShoppingCart size={16} />
            Purchase Order
          </button>
          <div className="dropdown-container" ref={dropdownRef}>
            <button
              className="btn btn-dark"
              onClick={() => setShowWorkflowMenu(!showWorkflowMenu)}
            >
              <MoreVertical size={16} />
              Workflow
              <ChevronDown size={14} />
            </button>
            {showWorkflowMenu && (
              <div className="dropdown-menu">
                {workflowMenuItems.map((item, i) =>
                  item.divider ? (
                    <div key={i} className="dropdown-divider" />
                  ) : (
                    <div
                      key={i}
                      className="dropdown-item"
                      onClick={() => {
                        setShowWorkflowMenu(false);
                        if (item.label === 'Open Text DP Document') {
                          navigate(`/document/${invoice.id}`);
                        } else if (item.label === 'Open Text Dashboard') {
                          navigate('/');
                        }
                      }}
                    >
                      <item.icon size={15} />
                      {item.label}
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Document Info */}
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

      {/* Process Options */}
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
              cursor: opt.option === 'Change/Post (PO)' ? 'pointer' : undefined,
            }}
            onClick={() => {
              setSelectedOption(i);
              if (opt.option === 'Change/Post (PO)') {
                navigate(`/posting/${invoice.id}`);
              }
            }}
          >
            <span className="process-option-name">{opt.option}</span>
            <span className="process-option-desc">{opt.description}</span>
            <span className="process-option-actor">{opt.receivingActor}</span>
          </div>
        ))}
      </div>

      {/* Workflow Stages */}
      <div className="info-card" style={{ marginTop: 24 }}>
        <div className="info-card-header">
          <GitBranch size={18} />
          <h3>Invoice Processing Workflow</h3>
        </div>
        <div style={{ padding: '12px 16px' }}>
          <div className="workflow-stages-grid">
            {[
              { icon: ClipboardCheck, label: 'Invoice Capture', desc: 'Stage 2 — Data Extraction', path: `/capture/${invoice.id}` },
              { icon: Shield, label: 'Auto Park Validation', desc: 'Stage 3 — Rule Validation', path: `/validation/${invoice.id}` },
              { icon: FileText, label: 'Service PO Processing', desc: 'Stage 4 — Document View', path: `/document/${invoice.id}` },
              { icon: CreditCard, label: 'Invoice Posting', desc: 'Stage 5 — Change Parked Doc', path: `/posting/${invoice.id}` },
              { icon: Package, label: 'PO Verification', desc: 'Stage 6 — Contract Details', path: `/po-verify/${invoice.id}` },
              { icon: Calculator, label: 'Retention Calculator', desc: 'Stage 8 — BG & Retention', path: `/retention/${invoice.id}` },
              { icon: CheckCircle, label: 'Final Review & Post', desc: 'Stage 10 — Post Invoice', path: `/review/${invoice.id}` },
            ].map((stage, i) => (
              <div
                key={i}
                className="workflow-stage-item"
                onClick={() => navigate(stage.path)}
              >
                <div className="workflow-stage-icon">
                  <stage.icon size={20} />
                </div>
                <div className="workflow-stage-info">
                  <span className="workflow-stage-label">{stage.label}</span>
                  <span className="workflow-stage-desc">{stage.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
