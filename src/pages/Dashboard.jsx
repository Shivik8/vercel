import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText, Clock, CheckCircle, AlertTriangle,
  Filter, Download, RefreshCw, TrendingUp, TrendingDown
} from 'lucide-react';
import { invoices } from '../data/invoiceData';

export default function Dashboard() {
  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const totalAmount = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const pendingCount = invoices.filter(i => i.status === 'Pending').length;
  const reviewCount = invoices.filter(i => i.status === 'In Review').length;
  const approvedCount = invoices.filter(i => i.status === 'Approved').length;

  const filteredInvoices = filterStatus === 'all'
    ? invoices
    : invoices.filter(i => i.status === filterStatus);

  const handleRowClick = (invoice) => {
    setSelectedRow(invoice.id);
    navigate(`/approval/${invoice.id}`);
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="page-enter">
      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-card-icon">
              <FileText size={20} />
            </div>
            <div className="stat-card-trend up">
              <TrendingUp size={12} />
              +12%
            </div>
          </div>
          <div className="stat-card-value">{invoices.length}</div>
          <div className="stat-card-label">Total Invoices</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-card-icon">
              <Clock size={20} />
            </div>
            <div className="stat-card-trend down">
              <TrendingDown size={12} />
              -5%
            </div>
          </div>
          <div className="stat-card-value">{pendingCount}</div>
          <div className="stat-card-label">Pending Approval</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-card-icon">
              <AlertTriangle size={20} />
            </div>
            <div className="stat-card-trend up">
              <TrendingUp size={12} />
              +8%
            </div>
          </div>
          <div className="stat-card-value">{reviewCount}</div>
          <div className="stat-card-label">In Review</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-card-icon">
              <CheckCircle size={20} />
            </div>
            <div className="stat-card-trend up">
              <TrendingUp size={12} />
              +23%
            </div>
          </div>
          <div className="stat-card-value">{approvedCount}</div>
          <div className="stat-card-label">Approved</div>
        </div>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <div className="table-header">
          <h2>
            PO Parked Invoice Dashboard
            <span className="table-count">{filteredInvoices.length} records</span>
          </h2>
          <div className="table-actions">
            <select
              className="form-select"
              style={{ width: '150px' }}
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="Pending">Pending</option>
              <option value="In Review">In Review</option>
              <option value="Approved">Approved</option>
            </select>
            <button className="table-filter-btn">
              <Filter size={14} />
              Filters
            </button>
            <button className="table-filter-btn">
              <Download size={14} />
              Export
            </button>
            <button className="table-filter-btn">
              <RefreshCw size={14} />
              Refresh
            </button>
          </div>
        </div>

        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th>Document No.</th>
                <th>Comp. Code</th>
                <th>Scan Location</th>
                <th>Parked By</th>
                <th>Invoice Type</th>
                <th>Vendor No.</th>
                <th>Vendor Name</th>
                <th style={{ textAlign: 'right' }}>Amount (INR)</th>
                <th>Status</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((inv) => (
                <tr
                  key={inv.id}
                  className={selectedRow === inv.id ? 'selected' : ''}
                  onClick={() => handleRowClick(inv)}
                >
                  <td className="doc-number">{inv.id}</td>
                  <td>{inv.companyCode}</td>
                  <td>{inv.scanLocation}</td>
                  <td>{inv.parkedBy}</td>
                  <td>{inv.invoiceType}</td>
                  <td style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px' }}>{inv.vendorNum}</td>
                  <td className="vendor-name">{inv.vendorName}</td>
                  <td className="amount">{formatAmount(inv.amount)}</td>
                  <td>
                    <span className={`status-badge ${inv.status.toLowerCase().replace(' ', '-')}`}>
                      <span className="dot"></span>
                      {inv.status}
                    </span>
                  </td>
                  <td>{inv.creationDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="table-footer">
          <span>
            Total Amount: <strong>INR {formatAmount(totalAmount)}</strong>
          </span>
          <span>Showing {filteredInvoices.length} of {invoices.length} entries</span>
        </div>
      </div>
    </div>
  );
}
