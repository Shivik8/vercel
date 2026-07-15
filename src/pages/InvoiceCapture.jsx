import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, FileText, CheckCircle, AlertCircle,
  ClipboardCheck, Eye, XCircle
} from 'lucide-react';
import { invoices, invoiceChecklist } from '../data/invoiceData';

export default function InvoiceCapture() {
  const { id } = useParams();
  const navigate = useNavigate();

  const invoice = invoices.find(i => i.id === id) || invoices[0];

  const extractedCount = invoiceChecklist.filter(item => item.value !== 'NA').length;
  const pendingCount = invoiceChecklist.filter(item => item.value === 'NA').length;

  return (
    <div className="detail-page page-enter">
      {/* Header */}
      <div className="detail-header">
        <div className="detail-title-row">
          <button className="back-btn" onClick={() => navigate(`/approval/${id}`)}>
            <ArrowLeft size={18} />
          </button>
          <div className="detail-title">
            <h1>Invoice Data Extraction — Stage 2</h1>
            <p>OCR-extracted fields from scanned invoice {invoice.id}</p>
          </div>
        </div>
      </div>

      {/* Two-column layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 400px',
        gap: 16
      }}>
        {/* LEFT SIDE */}
        <div>
          {/* Data Extraction Checklist */}
          <div className="info-card" style={{ marginBottom: 16 }}>
            <div className="info-card-header">
              <ClipboardCheck size={18} />
              <h3>Data Extraction Checklist</h3>
            </div>
            <div className="info-card-body" style={{ padding: 0 }}>
              {invoiceChecklist.map((item) => (
                <div
                  key={item.srNo}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '12px 22px',
                    borderBottom: '1px solid var(--border-subtle)',
                    transition: 'background 0.2s ease'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(0, 78, 146, 0.04)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    color: 'var(--cyan-accent)',
                    fontSize: 13,
                    fontWeight: 600,
                    width: 40,
                    flexShrink: 0
                  }}>
                    {String(item.srNo).padStart(2, '0')}
                  </span>
                  <span style={{
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: '0.5px',
                    width: 180,
                    flexShrink: 0
                  }}>
                    {item.title}
                  </span>
                  <span style={{
                    flex: 1,
                    color: 'var(--text-primary)',
                    fontSize: 13,
                    fontWeight: 500
                  }}>
                    {item.value}
                  </span>
                  {item.value !== 'NA' ? (
                    <CheckCircle size={18} style={{ color: 'var(--status-approved)', flexShrink: 0 }} />
                  ) : (
                    <AlertCircle size={18} style={{ color: 'var(--status-pending)', flexShrink: 0 }} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Extraction Summary */}
          <div className="info-card">
            <div className="info-card-header">
              <FileText size={18} />
              <h3>Extraction Summary</h3>
            </div>
            <div className="info-card-body">
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 12
              }}>
                <div style={{
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '16px 14px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: 24,
                    fontWeight: 800,
                    fontFamily: "'JetBrains Mono', monospace",
                    color: 'var(--text-primary)'
                  }}>
                    8
                  </div>
                  <div style={{
                    fontSize: 10,
                    textTransform: 'uppercase',
                    letterSpacing: '0.8px',
                    color: 'var(--text-muted)',
                    marginTop: 4,
                    fontWeight: 600
                  }}>
                    Total Fields
                  </div>
                </div>

                <div style={{
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '16px 14px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: 24,
                    fontWeight: 800,
                    fontFamily: "'JetBrains Mono', monospace",
                    color: 'var(--status-approved)'
                  }}>
                    {extractedCount}
                  </div>
                  <div style={{
                    fontSize: 10,
                    textTransform: 'uppercase',
                    letterSpacing: '0.8px',
                    color: 'var(--text-muted)',
                    marginTop: 4,
                    fontWeight: 600
                  }}>
                    Extracted
                  </div>
                </div>

                <div style={{
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '16px 14px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: 24,
                    fontWeight: 800,
                    fontFamily: "'JetBrains Mono', monospace",
                    color: 'var(--status-pending)'
                  }}>
                    {pendingCount}
                  </div>
                  <div style={{
                    fontSize: 10,
                    textTransform: 'uppercase',
                    letterSpacing: '0.8px',
                    color: 'var(--text-muted)',
                    marginTop: 4,
                    fontWeight: 600
                  }}>
                    Pending
                  </div>
                </div>

                <div style={{
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '16px 14px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: 24,
                    fontWeight: 800,
                    fontFamily: "'JetBrains Mono', monospace",
                    color: 'var(--cyan-accent)'
                  }}>
                    98.5%
                  </div>
                  <div style={{
                    fontSize: 10,
                    textTransform: 'uppercase',
                    letterSpacing: '0.8px',
                    color: 'var(--text-muted)',
                    marginTop: 4,
                    fontWeight: 600
                  }}>
                    Confidence
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div>
          {/* Invoice Preview */}
          <div className="info-card" style={{ marginBottom: 16 }}>
            <div className="info-card-header">
              <Eye size={18} />
              <h3>Invoice Preview</h3>
            </div>
            <div className="info-card-body" style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '48px 22px'
            }}>
              <div style={{
                width: 64,
                height: 64,
                borderRadius: 'var(--radius-lg)',
                background: 'var(--bg-input)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 16
              }}>
                <FileText size={28} style={{ color: 'var(--text-muted)' }} />
              </div>
              <p style={{
                color: 'var(--text-muted)',
                fontSize: 13,
                marginBottom: 20,
                textAlign: 'center'
              }}>
                Scanned invoice PDF preview
              </p>
              <button className="btn btn-outline" style={{ fontSize: 12 }}>
                <Eye size={14} />
                View Full Document
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="info-card">
            <div className="info-card-header">
              <ClipboardCheck size={18} />
              <h3>Quick Actions</h3>
            </div>
            <div className="info-card-body" style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 10
            }}>
              <button className="btn btn-gold" style={{ width: '100%', justifyContent: 'center' }}>
                <CheckCircle size={16} />
                Validate & Proceed
              </button>
              <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }}>
                <AlertCircle size={16} />
                Flag for Review
              </button>
              <button
                className="btn btn-outline"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  borderColor: 'rgba(248, 113, 113, 0.3)',
                  color: 'var(--status-rejected)'
                }}
              >
                <XCircle size={16} />
                Reject Extraction
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
