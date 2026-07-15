import { useLocation, useNavigate } from 'react-router-dom';
import { Search, Bell, Settings, ChevronRight } from 'lucide-react';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const getBreadcrumbs = () => {
    const crumbs = [{ label: 'Workspace', path: '/' }];
    const p = location.pathname;
    if (p === '/') {
      crumbs.push({ label: 'PO Parked Invoice Dashboard', active: true });
    } else if (p.startsWith('/approval/')) {
      crumbs.push({ label: 'Dashboard', path: '/' });
      crumbs.push({ label: 'Checker Approval', active: true });
    } else if (p.startsWith('/document/')) {
      crumbs.push({ label: 'Dashboard', path: '/' });
      crumbs.push({ label: 'Service PO Processing', active: true });
    } else if (p.startsWith('/capture/')) {
      crumbs.push({ label: 'Dashboard', path: '/' });
      crumbs.push({ label: 'Invoice Capture', active: true });
    } else if (p.startsWith('/validation/')) {
      crumbs.push({ label: 'Dashboard', path: '/' });
      crumbs.push({ label: 'Auto Park Validation', active: true });
    } else if (p.startsWith('/posting/')) {
      crumbs.push({ label: 'Dashboard', path: '/' });
      crumbs.push({ label: 'Invoice Posting', active: true });
    } else if (p.startsWith('/po-verify/')) {
      crumbs.push({ label: 'Dashboard', path: '/' });
      crumbs.push({ label: 'PO Verification', active: true });
    } else if (p.startsWith('/retention/')) {
      crumbs.push({ label: 'Dashboard', path: '/' });
      crumbs.push({ label: 'Retention Calculator', active: true });
    } else if (p.startsWith('/review/')) {
      crumbs.push({ label: 'Dashboard', path: '/' });
      crumbs.push({ label: 'Final Review', active: true });
    }
    return crumbs;
  };

  return (
    <header className="header">
      <div className="header-left">
        <div className="header-brand">
          <div className="header-logo">TP</div>
          <div>
            <div className="header-title">TATA POWER</div>
            <div className="header-subtitle">Vendor Invoice Management</div>
          </div>
        </div>

        <div className="header-breadcrumb">
          {getBreadcrumbs().map((crumb, i) => (
            <span key={i}>
              {i > 0 && <ChevronRight size={12} className="separator" style={{ marginRight: 8 }} />}
              <span
                className={crumb.active ? 'active' : ''}
                onClick={() => crumb.path && navigate(crumb.path)}
                style={{ cursor: crumb.path ? 'pointer' : 'default' }}
              >
                {crumb.label}
              </span>
            </span>
          ))}
        </div>
      </div>

      <div className="header-right">
        <div className="header-search">
          <Search size={14} />
          <input type="text" placeholder="Search invoices, vendors..." />
        </div>

        <button className="header-icon-btn">
          <Bell size={16} />
          <span className="badge">3</span>
        </button>
        <button className="header-icon-btn">
          <Settings size={16} />
        </button>
        <div className="header-avatar">PS</div>
      </div>
    </header>
  );
}
