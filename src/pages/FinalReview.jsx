import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, CheckCircle, XCircle, AlertTriangle,
  FileText, Send, RotateCcw, Printer, Clock,
  Shield, CreditCard, Receipt, Calculator,
  Paperclip, Building2
} from 'lucide-react';
import { invoices, poDetails } from '../data/invoiceData';

export default function FinalReview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [posted, setPosted] = useState(false);

  const invoice = invoices.find(i => i.id === id) || invoices[0];
  const po = poDetails[invoice.purchaseDoc] || poDetails['8200231868'];

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const today = new Date();
  const postingDate = `${String(today.getDate()).padStart(2, '0')}.${String(today.getMonth() + 1).padStart(2, '0')}.${today.getFullYear()}`;

  const hasWarnings = po.bgStatus === 'Expiring Soon' || po.ldStatus === 'Under Review';
  const allPassed = !hasWarnings;

  const leftChecks = [
    {
      label: 'Invoice Date',
      value: invoice.creationDate,
      status: 'verified',
      icon: Clock
    },
    {
      label: 'Invoice Number',
      value: invoice.refDoc,
      status: 'verified',
      icon: FileText
    },
    {
      label: 'PO Number',
      value: invoice.purchaseDoc,
      status: 'verified',
      icon: Receipt
    },
    {
      label: 'Amount',
      value: `${formatAmount(invoice.amount)} INR`,
      status: 'verified',
      icon: Calculator
    },
    {
      label: 'GST Validation',
      value: po.taxCode,
      status: 'verified',
      icon: Shield
    },
    {
      label: 'TDS/WHT',
      value: 'Applied — Section 194C',
      status: 'verified',
      icon: CreditCard
    }
  ];

  const rightChecks = [
    {
      label: 'Tax Code',
      value: po.taxCode,
      status: 'verified',
      icon: Calculator
    },
    {
      label: 'Bank Guarantee',
      value: po.bgStatus === 'Expiring Soon'
        ? `Expiring ${po.bgExpiry}`
        : po.bgStatus,
      status: po.bgStatus === 'Expiring Soon' ? 'warning' : 'verified',
      icon: Building2
    },
    {
      label: 'Retention Applied',
      value: po.retentionPct > 0
        ? `${po.retentionPct}% — ${formatAmount(po.retentionAmt)} INR`
        : 'Not Applicable',
      status: 'verified',
      icon: CreditCard
    },
    {
      label: 'LD/SLA Check',
      value: po.ldStatus,
      status: po.ldStatus === 'Under Review' ? 'warning' : 'verified',
      icon: AlertTriangle
    },
    {
      label: 'Payment Terms',
      value: po.paymentTerms,
      status: 'verified',
      icon: Clock
    },
    {
      label: 'Attachments',
      value: `${po.attachments} document${po.attachments !== 1 ? 's' : ''} attached`,
      status: 'verified',
      icon: Paperclip
    }
  ];

  const getStatusIcon = (status) => {
    if (status === 'verified') return <CheckCircle size={20} />;
    if (status === 'warning') return <AlertTriangle size={20} />;
    return <XCircle size={20} />;
  };

  const getStatusColor = (status) => {
    if (status === 'verified') return 'var(--status-approved)';
    if (status === 'warning') return 'var(--status-pending)';
    return 'var(--status-rejected)';
  };

  const getStatusBadge = (status) => {
    if (status === 'verified') return { text: 'Verified', className: 'approved' };
    if (status === 'warning') return { text: 'Warning', className: 'pending' };
    return { text: 'Failed', className: 'in-review' };
  };

  const renderCheckCard = (check, index) => {
    const badge = getStatusBadge(check.status);
    return (
      <div
        key={index}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          padding: '14px 18px',
          background: 'var(--gradient-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: 'default',
          backdropFilter: 'blur(12px)',
          borderLeft: `3px solid ${getStatusColor(check.status)}`
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-primary)';
          e.currentTarget.style.boxShadow = 'var(--shadow-glow)';
          e.currentTarget.style.transform = 'translateX(4px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-subtle)';
          e.currentTarget.style.borderLeftColor = getStatusColor(check.status);
          e.currentTarget.style.boxShadow = 'none';
          e.currentTarget.style.transform = 'translateX(0)';
        }}
      >
        {/* Status Icon */}
        <div style={{ color: getStatusColor(check.status), flexShrink: 0 }}>
          {getStatusIcon(check.status)}
        </div>

        {/* Check Name & Value */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: '13px',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '2px'
          }}>
            {check.label}
          </div>
          <div style={{
            fontSize: '12px',
            color: 'var(--text-secondary)',
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 500,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>
            {check.value}
          </div>
        </div>

        {/* Badge */}
        <span className={`status-badge ${badge.className}`} style={{ flexShrink: 0 }}>
          <span className="dot"></span>
          {badge.text}
        </span>
      </div>
    );
  };

  // Posted success state
  if (posted) {
    return (
      <div className="detail-page page-enter">
        {/* Header */}
        <div className="detail-header">
          <div className="detail-title-row">
            <button className="back-btn" onClick={() => navigate('/')}>
              <ArrowLeft size={18} />
            </button>
            <div className="detail-title">
              <h1>Invoice {invoice.id} — Posted</h1>
              <p>OpenText Vendor Invoice Management for SAP Solutions</p>
            </div>
          </div>
        </div>

        {/* Success Banner */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(74, 222, 128, 0.12), rgba(74, 222, 128, 0.04))',
          border: '1px solid rgba(74, 222, 128, 0.3)',
          borderRadius: 'var(--radius-lg)',
          padding: '48px 40px',
          textAlign: 'center',
          marginBottom: '24px',
          animation: 'cardEnter 0.5s cubic-bezier(0.16, 1, 0.3, 1) both'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'rgba(74, 222, 128, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            animation: 'cardEnter 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both'
          }}>
            <CheckCircle size={40} style={{ color: 'var(--status-approved)' }} />
          </div>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 800,
            color: 'var(--status-approved)',
            marginBottom: '8px',
            letterSpacing: '-0.3px'
          }}>
            Invoice Posted Successfully
          </h2>
          <p style={{
            fontSize: '14px',
            color: 'var(--text-secondary)',
            maxWidth: '480px',
            margin: '0 auto'
          }}>
            The invoice has been posted to SAP and is now available for payment processing.
          </p>
        </div>

        {/* Posting Details */}
        <div className="info-card" style={{
          animation: 'cardEnter 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both'
        }}>
          <div className="info-card-header">
            <FileText />
            <h3>Posting Details</h3>
          </div>
          <div className="info-card-body">
            <div className="info-row">
              <span className="info-label">Document Number</span>
              <span className="info-value mono gold">{invoice.id}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Posting Date</span>
              <span className="info-value">{postingDate}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Company Code</span>
              <span className="info-value mono">{invoice.companyCode}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Fiscal Year</span>
              <span className="info-value mono">{invoice.fiscalYear}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Vendor</span>
              <span className="info-value">{invoice.vendorName}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Amount</span>
              <span className="info-value mono" style={{ color: 'var(--status-approved)' }}>
                {formatAmount(invoice.amount)} INR
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">Status</span>
              <span className="status-badge approved">
                <span className="dot"></span>
                Posted
              </span>
            </div>
          </div>
        </div>

        {/* Action after posting */}
        <div style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'center',
          marginTop: '24px',
          animation: 'cardEnter 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both'
        }}>
          <button className="btn btn-gold" onClick={() => navigate('/')}>
            <ArrowLeft size={16} />
            Back to Dashboard
          </button>
          <button className="btn btn-outline" onClick={() => window.print()}>
            <Printer size={16} />
            Print Confirmation
          </button>
        </div>
      </div>
    );
  }

  // Main review state
  return (
    <div className="detail-page page-enter">
      {/* Header */}
      <div className="detail-header">
        <div className="detail-title-row">
          <button className="back-btn" onClick={() => navigate(`/retention/${invoice.id}`)}>
            <ArrowLeft size={18} />
          </button>
          <div className="detail-title">
            <h1>Invoice {invoice.id} — Final Review & Post</h1>
            <p>OpenText Vendor Invoice Management for SAP Solutions</p>
          </div>
        </div>
        <div className="detail-actions">
          <button className="btn btn-outline" onClick={() => navigate(`/document/${invoice.id}`)}>
            <FileText size={16} />
            View Invoice
          </button>
        </div>
      </div>

      {/* Review Status Banner */}
      <div style={{
        background: allPassed
          ? 'linear-gradient(135deg, rgba(74, 222, 128, 0.10), rgba(74, 222, 128, 0.03))'
          : 'linear-gradient(135deg, rgba(255, 179, 71, 0.10), rgba(255, 179, 71, 0.03))',
        border: `1px solid ${allPassed ? 'rgba(74, 222, 128, 0.25)' : 'rgba(255, 179, 71, 0.25)'}`,
        borderRadius: 'var(--radius-lg)',
        padding: '20px 28px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        marginBottom: '24px',
        animation: 'cardEnter 0.4s cubic-bezier(0.16, 1, 0.3, 1) both'
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: 'var(--radius-md)',
          background: allPassed
            ? 'rgba(74, 222, 128, 0.12)'
            : 'rgba(255, 179, 71, 0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <Shield size={24} style={{
            color: allPassed ? 'var(--status-approved)' : 'var(--status-pending)'
          }} />
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: 800,
            color: allPassed ? 'var(--status-approved)' : 'var(--status-pending)',
            marginBottom: '4px',
            letterSpacing: '-0.3px'
          }}>
            {allPassed
              ? 'Final Review — Ready for Posting'
              : 'Final Review — Issues Found'}
          </h2>
          <p style={{
            fontSize: '13px',
            color: 'var(--text-secondary)',
            fontWeight: 500
          }}>
            {allPassed
              ? 'All verification checks have passed. This invoice is cleared for posting.'
              : 'Some items require attention before posting. Review warnings below.'}
          </p>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px',
          background: allPassed
            ? 'rgba(74, 222, 128, 0.1)'
            : 'rgba(255, 179, 71, 0.1)',
          borderRadius: 'var(--radius-sm)',
          border: `1px solid ${allPassed ? 'rgba(74, 222, 128, 0.2)' : 'rgba(255, 179, 71, 0.2)'}`,
          flexShrink: 0
        }}>
          {allPassed
            ? <CheckCircle size={16} style={{ color: 'var(--status-approved)' }} />
            : <AlertTriangle size={16} style={{ color: 'var(--status-pending)' }} />
          }
          <span style={{
            fontSize: '12px',
            fontWeight: 700,
            color: allPassed ? 'var(--status-approved)' : 'var(--status-pending)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            {allPassed ? '12 / 12 Passed' : `${leftChecks.concat(rightChecks).filter(c => c.status === 'verified').length} / 12 Passed`}
          </span>
        </div>
      </div>

      {/* Checklist Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px',
        marginBottom: '24px'
      }}>
        {/* Left Column */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          animation: 'cardEnter 0.45s cubic-bezier(0.16, 1, 0.3, 1) 0.08s both'
        }}>
          {leftChecks.map((check, i) => renderCheckCard(check, i))}
        </div>

        {/* Right Column */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          animation: 'cardEnter 0.45s cubic-bezier(0.16, 1, 0.3, 1) 0.14s both'
        }}>
          {rightChecks.map((check, i) => renderCheckCard(check, i + 6))}
        </div>
      </div>

      {/* Post Confirmation Card */}
      <div className="info-card" style={{
        animation: 'cardEnter 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both'
      }}>
        <div className="info-card-header">
          <Send />
          <h3>Post Confirmation</h3>
        </div>
        <div className="info-card-body">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            marginBottom: '24px'
          }}>
            <div>
              <div className="info-row">
                <span className="info-label">Document Number</span>
                <span className="info-value" style={{
                  fontSize: '20px',
                  fontWeight: 800,
                  fontFamily: "'JetBrains Mono', monospace",
                  color: 'var(--cyan-accent)',
                  textShadow: '0 0 12px rgba(0, 212, 255, 0.2)'
                }}>
                  {invoice.id}
                </span>
              </div>
              <div className="info-row">
                <span className="info-label">Company Code</span>
                <span className="info-value mono">{invoice.companyCode}</span>
              </div>
            </div>
            <div>
              <div className="info-row">
                <span className="info-label">Fiscal Year</span>
                <span className="info-value mono">{invoice.fiscalYear}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Posting Date</span>
                <span className="info-value">{postingDate}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            gap: '12px',
            paddingTop: '16px',
            borderTop: '1px solid var(--border-subtle)'
          }}>
            <button
              className="btn btn-gold"
              onClick={() => setPosted(true)}
              style={{ flex: 'none' }}
            >
              <Send size={16} />
              Post Invoice
            </button>
            <button
              className="btn btn-outline"
              onClick={() => window.print()}
            >
              <Printer size={16} />
              Print Preview
            </button>
            <button
              className="btn btn-outline"
              onClick={() => navigate(-1)}
            >
              <RotateCcw size={16} />
              Send Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
