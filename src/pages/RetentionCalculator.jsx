import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Calculator, Percent, DollarSign,
  Shield, AlertTriangle, CheckCircle, FileText
} from 'lucide-react';
import { invoices, retentionConfig, poDetails } from '../data/invoiceData';

export default function RetentionCalculator() {
  const { id } = useParams();
  const navigate = useNavigate();

  const invoice = invoices.find(i => i.id === id) || invoices[0];
  const po = poDetails[invoice.purchaseDoc] || poDetails[Object.keys(poDetails)[0]];

  const defaultRates = {};
  retentionConfig.forEach(r => {
    defaultRates[r.code] = r.rate;
  });
  const [rates, setRates] = useState(defaultRates);

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const handleRateChange = (code, value) => {
    const parsed = parseFloat(value);
    setRates(prev => ({
      ...prev,
      [code]: isNaN(parsed) ? 0 : parsed,
    }));
  };

  const resetRates = () => {
    setRates(defaultRates);
  };

  const baseAmount = invoice.amount;

  const getRetentionAmount = (row) => {
    if (row.applicable === false) return 0;
    if (row.applicable === 'conditional') {
      if (!po.ldSlaFlag) return 0;
      return baseAmount * (rates[row.code] / 100);
    }
    if (row.code === 'Z010') return 0;
    return baseAmount * (rates[row.code] / 100);
  };

  const cpbgRetention = baseAmount * (rates['Z005'] / 100);
  const safetyRetention = baseAmount * (rates['Z006'] / 100);
  const ldDeduction = po.ldSlaFlag ? baseAmount * (rates['Z007'] / 100) : 0;
  const tdsAmount = baseAmount * (po.tdsRate / 100);

  const totalRetention = retentionConfig.reduce((sum, row) => sum + getRetentionAmount(row), 0);
  const netPayable = baseAmount - cpbgRetention - safetyRetention - ldDeduction - tdsAmount;

  const currentInvoiceHold = Math.min(cpbgRetention, po.remainingToDeduct);

  return (
    <div className="detail-page page-enter">
      {/* Header */}
      <div className="detail-header">
        <div className="detail-title-row">
          <button className="back-btn" onClick={() => navigate(`/posting/${invoice.id}`)}>
            <ArrowLeft size={18} />
          </button>
          <div className="detail-title">
            <h1>Retention & BG Calculator — {invoice.id}</h1>
            <p>Stage 8: Retention Calculation Sheet for SERVICE PO Processing</p>
          </div>
        </div>
        <div className="detail-actions">
          <button className="btn btn-outline" onClick={() => navigate(`/posting/${invoice.id}`)}>
            <FileText size={16} />
            Back to Invoice
          </button>
        </div>
      </div>

      {/* Section 1: Retention Matrix */}
      <div className="info-card" style={{ marginBottom: 20 }}>
        <div className="info-card-header">
          <Calculator size={18} />
          <h3>Retention Calculation Matrix</h3>
          <span style={{
            marginLeft: 'auto',
            fontSize: 11,
            fontFamily: "'JetBrains Mono', monospace",
            color: 'var(--text-muted)',
          }}>
            PO: {po.poNumber} | Base: INR {formatAmount(baseAmount)}
          </span>
        </div>
        <div style={{ padding: 0, overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: 13,
          }}>
            <thead>
              <tr>
                {['Type Code', 'Retention Type', 'Applicable', 'Rate (%)', 'Base Amount', 'Retention Amount', 'Status'].map(col => (
                  <th key={col} style={{
                    padding: '12px 16px',
                    textAlign: col === 'Base Amount' || col === 'Retention Amount' || col === 'Rate (%)' ? 'right' : 'left',
                    fontSize: 10,
                    fontWeight: 700,
                    color: 'var(--blue-soft)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.8px',
                    borderBottom: '1px solid var(--border-primary)',
                    background: 'rgba(0, 78, 146, 0.06)',
                    whiteSpace: 'nowrap',
                  }}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {retentionConfig.map((row, idx) => {
                const retentionAmt = getRetentionAmount(row);
                const isApplicable = row.applicable === true;
                const isConditional = row.applicable === 'conditional';
                const isNotApplicable = row.applicable === false;

                return (
                  <tr key={row.code} style={{
                    background: idx % 2 === 1 ? 'rgba(0, 78, 146, 0.04)' : 'transparent',
                    transition: 'all 0.2s ease',
                  }}>
                    {/* Type Code */}
                    <td style={{
                      padding: '11px 16px',
                      borderBottom: '1px solid var(--border-subtle)',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontWeight: 600,
                      fontSize: 12,
                      color: 'var(--cyan-accent)',
                    }}>
                      {row.code}
                    </td>

                    {/* Retention Type */}
                    <td style={{
                      padding: '11px 16px',
                      borderBottom: '1px solid var(--border-subtle)',
                      color: 'var(--text-primary)',
                      fontWeight: 500,
                    }}>
                      {row.type}
                    </td>

                    {/* Applicable */}
                    <td style={{
                      padding: '11px 16px',
                      borderBottom: '1px solid var(--border-subtle)',
                    }}>
                      {isApplicable && (
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 5,
                          padding: '3px 10px',
                          borderRadius: 20,
                          fontSize: 11,
                          fontWeight: 600,
                          background: 'rgba(74, 222, 128, 0.1)',
                          color: 'var(--status-approved)',
                        }}>
                          <CheckCircle size={12} />
                          Yes
                        </span>
                      )}
                      {isNotApplicable && (
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 5,
                          padding: '3px 10px',
                          borderRadius: 20,
                          fontSize: 11,
                          fontWeight: 600,
                          background: 'rgba(0, 78, 146, 0.08)',
                          color: 'var(--text-muted)',
                        }}>
                          No
                        </span>
                      )}
                      {isConditional && (
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 5,
                          padding: '3px 10px',
                          borderRadius: 20,
                          fontSize: 11,
                          fontWeight: 600,
                          background: 'rgba(255, 179, 71, 0.1)',
                          color: 'var(--status-pending)',
                        }}>
                          <AlertTriangle size={12} />
                          Conditional
                        </span>
                      )}
                    </td>

                    {/* Rate (%) */}
                    <td style={{
                      padding: '11px 16px',
                      borderBottom: '1px solid var(--border-subtle)',
                      textAlign: 'right',
                      fontFamily: "'JetBrains Mono', monospace",
                    }}>
                      {(isApplicable || (isConditional && po.ldSlaFlag)) && row.code !== 'Z010' ? (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 4 }}>
                          <input
                            type="number"
                            step="0.1"
                            min="0"
                            max="100"
                            value={rates[row.code]}
                            onChange={e => handleRateChange(row.code, e.target.value)}
                            style={{
                              width: 64,
                              padding: '5px 8px',
                              background: 'var(--bg-input)',
                              border: '1px solid var(--border-subtle)',
                              borderRadius: 'var(--radius-xs)',
                              color: 'var(--text-primary)',
                              fontFamily: "'JetBrains Mono', monospace",
                              fontSize: 12,
                              textAlign: 'right',
                              outline: 'none',
                            }}
                          />
                          <Percent size={12} style={{ color: 'var(--text-muted)' }} />
                        </div>
                      ) : (
                        <span style={{ color: 'var(--text-muted)' }}>
                          {isNotApplicable && row.code === 'Z004' ? '0%' : '—'}
                        </span>
                      )}
                    </td>

                    {/* Base Amount */}
                    <td style={{
                      padding: '11px 16px',
                      borderBottom: '1px solid var(--border-subtle)',
                      textAlign: 'right',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 12,
                      color: (isApplicable || (isConditional && po.ldSlaFlag)) && row.code !== 'Z010'
                        ? 'var(--text-primary)' : 'var(--text-muted)',
                    }}>
                      {(isApplicable || (isConditional && po.ldSlaFlag)) && row.code !== 'Z010'
                        ? formatAmount(baseAmount)
                        : '—'}
                    </td>

                    {/* Retention Amount */}
                    <td style={{
                      padding: '11px 16px',
                      borderBottom: '1px solid var(--border-subtle)',
                      textAlign: 'right',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 12,
                      fontWeight: retentionAmt > 0 ? 600 : 400,
                      color: retentionAmt > 0 ? 'var(--status-rejected)' : 'var(--text-muted)',
                    }}>
                      {retentionAmt > 0 ? formatAmount(retentionAmt) : '—'}
                    </td>

                    {/* Status */}
                    <td style={{
                      padding: '11px 16px',
                      borderBottom: '1px solid var(--border-subtle)',
                    }}>
                      {row.status === 'Active' && (
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 5,
                          padding: '3px 10px',
                          borderRadius: 20,
                          fontSize: 11,
                          fontWeight: 600,
                          background: 'rgba(74, 222, 128, 0.1)',
                          color: 'var(--status-approved)',
                        }}>
                          <span style={{
                            width: 6, height: 6, borderRadius: '50%',
                            background: 'var(--status-approved)',
                          }} />
                          Active
                        </span>
                      )}
                      {row.status === 'N/A' && (
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 5,
                          padding: '3px 10px',
                          borderRadius: 20,
                          fontSize: 11,
                          fontWeight: 600,
                          background: 'rgba(0, 78, 146, 0.08)',
                          color: 'var(--text-muted)',
                        }}>
                          N/A
                        </span>
                      )}
                      {row.status === 'Conditional' && (
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 5,
                          padding: '3px 10px',
                          borderRadius: 20,
                          fontSize: 11,
                          fontWeight: 600,
                          background: 'rgba(255, 179, 71, 0.1)',
                          color: 'var(--status-pending)',
                        }}>
                          <span style={{
                            width: 6, height: 6, borderRadius: '50%',
                            background: 'var(--status-pending)',
                          }} />
                          Conditional
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Total Retention Row */}
        <div style={{
          padding: '14px 22px',
          borderTop: '2px solid var(--border-primary)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'rgba(0, 78, 146, 0.06)',
        }}>
          <span style={{
            fontSize: 13,
            fontWeight: 700,
            color: 'var(--text-primary)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}>
            Total Retention
          </span>
          <span style={{
            fontSize: 18,
            fontWeight: 800,
            fontFamily: "'JetBrains Mono', monospace",
            color: 'var(--status-rejected)',
            textShadow: '0 0 12px rgba(248, 113, 113, 0.2)',
          }}>
            INR {formatAmount(totalRetention)}
          </span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>

        {/* Section 2: CPBG Calculation Details */}
        <div className="info-card">
          <div className="info-card-header">
            <Shield size={18} />
            <h3>CPBG Calculation Details</h3>
          </div>
          <div className="info-card-body">
            <div className="info-row">
              <span className="info-label">BG Calculated On</span>
              <span className="info-value">{po.bgCalculatedOn}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Order Value</span>
              <span className="info-value mono" style={{ fontSize: 15, fontWeight: 700 }}>
                INR {formatAmount(po.orderValue)}
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">5% of Order Value</span>
              <span className="info-value mono">{formatAmount(po.fivePercentOfOrder)}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Previous CPBG Deducted</span>
              <span className="info-value mono">{formatAmount(po.previousCPBGDeducted)}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Current Invoice Hold</span>
              <span className="info-value mono" style={{ color: 'var(--status-pending)', fontWeight: 600 }}>
                {formatAmount(currentInvoiceHold)}
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">Remaining to Deduct</span>
              <span className="info-value mono">{formatAmount(po.remainingToDeduct)}</span>
            </div>
            <div className="info-row">
              <span className="info-label">CBG %</span>
              <span className="info-value mono">{po.cbgPercent}%</span>
            </div>
          </div>
        </div>

        {/* Section 3: Net Payable Summary */}
        <div className="info-card">
          <div className="info-card-header">
            <DollarSign size={18} />
            <h3>Net Payable Summary</h3>
          </div>
          <div className="info-card-body">
            <div className="info-row">
              <span className="info-label">Gross Invoice Amount</span>
              <span className="info-value mono" style={{ fontWeight: 600 }}>
                {formatAmount(baseAmount)}
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">Less: CPBG Retention</span>
              <span className="info-value mono" style={{ color: 'var(--status-rejected)' }}>
                - {formatAmount(cpbgRetention)}
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">Less: Safety Retention</span>
              <span className="info-value mono" style={{ color: 'var(--status-rejected)' }}>
                - {formatAmount(safetyRetention)}
              </span>
            </div>
            {po.ldSlaFlag && (
              <div className="info-row">
                <span className="info-label">Less: LD Deduction</span>
                <span className="info-value mono" style={{ color: 'var(--status-rejected)' }}>
                  - {formatAmount(ldDeduction)}
                </span>
              </div>
            )}
            <div className="info-row">
              <span className="info-label">Less: TDS ({po.tdsRate}%)</span>
              <span className="info-value mono" style={{ color: 'var(--status-rejected)' }}>
                - {formatAmount(tdsAmount)}
              </span>
            </div>
            <div style={{
              marginTop: 12,
              padding: '16px 0 4px',
              borderTop: '2px solid var(--border-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <span style={{
                fontSize: 13,
                fontWeight: 700,
                color: 'var(--text-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                Net Payable Amount
              </span>
              <span style={{
                fontSize: 22,
                fontWeight: 800,
                fontFamily: "'JetBrains Mono', monospace",
                color: 'var(--cyan-accent)',
                textShadow: '0 0 16px rgba(0, 212, 255, 0.25)',
              }}>
                INR {formatAmount(netPayable)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{
        display: 'flex',
        gap: 12,
        justifyContent: 'flex-end',
        paddingTop: 8,
        paddingBottom: 20,
      }}>
        <button className="btn btn-outline" onClick={resetRates}>
          <AlertTriangle size={16} />
          Reset to Default
        </button>
        <button className="btn btn-gold" onClick={() => navigate(`/review/${invoice.id}`)}>
          <Calculator size={16} />
          Apply &amp; Proceed to Final Review
        </button>
      </div>
    </div>
  );
}
