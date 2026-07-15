import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Shield, CheckCircle, XCircle,
  AlertTriangle, Clock, RefreshCw, FileText
} from 'lucide-react';
import { invoices, validationRules } from '../data/invoiceData';

// Deterministic seed based on rule id to keep results stable across renders
function seedFromId(id) {
  let h = 0;
  for (let i = 0; i < id.length; i++) {
    h = ((h << 5) - h + id.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function generateResults(rules) {
  const warningIds = new Set(['VC-003', 'PM-003', 'AV-003']);
  const failIds = new Set(['DD-002']);

  return rules.map((cat) => ({
    category: cat.category,
    rules: cat.rules.map((rule) => {
      let status = 'pass';
      if (warningIds.has(rule.id)) status = 'warning';
      if (failIds.has(rule.id)) status = 'fail';
      const seed = seedFromId(rule.id);
      const duration = (0.08 + (seed % 40) / 100).toFixed(2);
      return { ...rule, status, duration: `${duration}s` };
    }),
  }));
}

export default function AutoParkValidation() {
  const { id } = useParams();
  const navigate = useNavigate();

  const invoice = invoices.find((i) => i.id === id) || invoices[0];

  const [results] = useState(() => generateResults(validationRules));
  const [expandedSections, setExpandedSections] = useState(() => {
    const initial = {};
    validationRules.forEach((cat) => { initial[cat.category] = true; });
    return initial;
  });

  const toggleSection = (category) => {
    setExpandedSections((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  // Counts
  const allRules = results.flatMap((c) => c.rules);
  const totalCount = allRules.length;
  const passCount = allRules.filter((r) => r.status === 'pass').length;
  const warnCount = allRules.filter((r) => r.status === 'warning').length;
  const failCount = allRules.filter((r) => r.status === 'fail').length;

  const statusColor = {
    pass: 'var(--status-approved)',
    warning: 'var(--status-pending)',
    fail: 'var(--status-rejected)',
  };

  const statusLabel = { pass: 'PASS', warning: 'WARN', fail: 'FAIL' };

  const StatusIcon = ({ status, size = 15 }) => {
    if (status === 'pass') return <CheckCircle size={size} style={{ color: statusColor.pass }} />;
    if (status === 'warning') return <AlertTriangle size={size} style={{ color: statusColor.warning }} />;
    return <XCircle size={size} style={{ color: statusColor.fail }} />;
  };

  return (
    <div className="detail-page page-enter">
      {/* Header */}
      <div className="detail-header">
        <div className="detail-title-row">
          <button className="back-btn" onClick={() => navigate(`/approval/${id}`)}>
            <ArrowLeft size={18} />
          </button>
          <div className="detail-title">
            <h1>Auto Park Validation — Stage 3</h1>
            <p>Invoice {invoice.id} &middot; {invoice.vendorName}</p>
          </div>
        </div>
        <div className="detail-actions">
          <button className="btn btn-outline" style={{ gap: 6 }}>
            <FileText size={16} />
            Doc {invoice.id}
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="stats-grid">
        {/* Total Rules */}
        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-card-icon">
              <Shield size={20} />
            </div>
          </div>
          <div className="stat-card-value">{totalCount}</div>
          <div className="stat-card-label">Total Rules</div>
        </div>

        {/* Passed */}
        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-card-icon" style={{ background: 'rgba(74, 222, 128, 0.12)', color: 'var(--status-approved)' }}>
              <CheckCircle size={20} />
            </div>
          </div>
          <div className="stat-card-value" style={{ color: 'var(--status-approved)' }}>{passCount}</div>
          <div className="stat-card-label">Passed</div>
        </div>

        {/* Warnings */}
        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-card-icon" style={{ background: 'rgba(255, 179, 71, 0.12)', color: 'var(--status-pending)' }}>
              <AlertTriangle size={20} />
            </div>
          </div>
          <div className="stat-card-value" style={{ color: 'var(--status-pending)' }}>{warnCount}</div>
          <div className="stat-card-label">Warnings</div>
        </div>

        {/* Failed */}
        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-card-icon" style={{ background: 'rgba(248, 113, 113, 0.12)', color: 'var(--status-rejected)' }}>
              <XCircle size={20} />
            </div>
          </div>
          <div className="stat-card-value" style={{ color: 'var(--status-rejected)' }}>{failCount}</div>
          <div className="stat-card-label">Failed</div>
        </div>
      </div>

      {/* Validation Category Cards */}
      {results.map((cat) => {
        const catPass = cat.rules.filter((r) => r.status === 'pass').length;
        const isExpanded = expandedSections[cat.category];

        return (
          <div
            key={cat.category}
            className="info-card"
            style={{ marginBottom: 16 }}
          >
            {/* Category Header */}
            <div
              className="info-card-header"
              style={{ cursor: 'pointer', userSelect: 'none' }}
              onClick={() => toggleSection(cat.category)}
            >
              <Shield size={18} />
              <h3 style={{ flex: 1 }}>{cat.category}</h3>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  padding: '3px 10px',
                  borderRadius: 20,
                  background: catPass === cat.rules.length
                    ? 'rgba(74, 222, 128, 0.1)'
                    : 'rgba(255, 179, 71, 0.1)',
                  color: catPass === cat.rules.length
                    ? 'var(--status-approved)'
                    : 'var(--status-pending)',
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {catPass}/{cat.rules.length}
              </span>
              <span
                style={{
                  marginLeft: 8,
                  transition: 'transform 0.25s ease',
                  transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                  color: 'var(--text-muted)',
                  fontSize: 10,
                }}
              >
                &#9660;
              </span>
            </div>

            {/* Rules List */}
            {isExpanded && (
              <div className="info-card-body" style={{ padding: 0 }}>
                {cat.rules.map((rule) => (
                  <div
                    key={rule.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '12px 22px',
                      borderBottom: '1px solid var(--border-subtle)',
                      transition: 'background 0.2s ease',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0, 78, 146, 0.04)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                  >
                    <StatusIcon status={rule.status} />

                    {/* Rule ID */}
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 11,
                        color: 'var(--text-muted)',
                        width: 52,
                        flexShrink: 0,
                      }}
                    >
                      {rule.id}
                    </span>

                    {/* Rule Name */}
                    <span style={{ flex: 1, fontSize: 13, color: 'var(--text-primary)', fontWeight: 500 }}>
                      {rule.name}
                    </span>

                    {/* Status Badge */}
                    <span
                      className="status-badge"
                      style={{
                        background: `${statusColor[rule.status]}15`,
                        color: statusColor[rule.status],
                        fontSize: 10,
                        padding: '3px 10px',
                        minWidth: 52,
                        justifyContent: 'center',
                      }}
                    >
                      {statusLabel[rule.status]}
                    </span>

                    {/* Duration */}
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 11,
                        color: 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                        width: 56,
                        justifyContent: 'flex-end',
                      }}
                    >
                      <Clock size={12} />
                      {rule.duration}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}

      {/* Bottom Actions */}
      <div style={{ display: 'flex', gap: 12, marginTop: 24, justifyContent: 'flex-end' }}>
        <button
          className="btn btn-outline"
          onClick={() => {
            /* placeholder for re-run */
          }}
          style={{ gap: 6 }}
        >
          <RefreshCw size={16} />
          Re-run Validation
        </button>
        <button
          className="btn btn-gold"
          onClick={() => navigate(`/approval/${id}`)}
        >
          Proceed to Finance Inbox
        </button>
      </div>
    </div>
  );
}
