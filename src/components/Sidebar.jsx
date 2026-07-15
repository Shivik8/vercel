import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Inbox, FileText, GitBranch, Clock, AlertCircle,
  Send, RotateCcw, FolderLock, Users, Bookmark,
  Trash2, ChevronRight, LayoutDashboard, FileCheck,
  FileMinus, FileSpreadsheet
} from 'lucide-react';

const workflowTasks = [
  { name: 'DP Document Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Non-PO Invoice Dashboard', path: '/dashboard', icon: FileMinus },
  { name: 'PO Invoice Dashboard (Line Level)', path: '/dashboard', icon: FileSpreadsheet },
  { name: 'PO Parked Invoice Dashboard', path: '/', icon: FileCheck, active: true },
];

const workflowStages = [
  { name: 'Invoice Capture', path: '/capture/5100034388', icon: FileText },
  { name: 'Auto Park Validation', path: '/validation/5100034388', icon: FileCheck },
  { name: 'Invoice Posting', path: '/posting/5100034388', icon: FileSpreadsheet },
  { name: 'PO Verification', path: '/po-verify/5100034388', icon: LayoutDashboard },
  { name: 'Retention Calculator', path: '/retention/5100034388', icon: FileMinus },
  { name: 'Final Review', path: '/review/5100034388', icon: FileCheck },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState({
    inbox: true,
    workflow: true,
    grouped: true,
    stages: false,
  });

  const toggle = (key) => {
    setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-user">
          <div className="sidebar-user-avatar">PS</div>
          <div className="sidebar-user-info">
            <h3>Parag Surve</h3>
            <p>A/P Processor</p>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="sidebar-section-label">Workspace</div>

        {/* Inbox */}
        <div
          className="sidebar-item"
          onClick={() => toggle('inbox')}
        >
          <span className={`sidebar-toggle ${expandedSections.inbox ? 'open' : ''}`}>
            <ChevronRight size={12} />
          </span>
          <Inbox size={16} />
          <span>Inbox</span>
        </div>

        {expandedSections.inbox && (
          <div className="sidebar-children">
            <div className="sidebar-item">
              <FileText size={16} />
              <span>Unread Documents</span>
              <span className="count">0</span>
            </div>
            <div className="sidebar-item">
              <FileText size={16} />
              <span>Documents</span>
              <span className="count">0</span>
            </div>

            {/* Workflow */}
            <div className="sidebar-item" onClick={() => toggle('workflow')}>
              <span className={`sidebar-toggle ${expandedSections.workflow ? 'open' : ''}`}>
                <ChevronRight size={12} />
              </span>
              <GitBranch size={16} />
              <span>Workflow</span>
              <span className="count">1,682</span>
            </div>

            {expandedSections.workflow && (
              <div className="sidebar-children">
                <div className="sidebar-item" onClick={() => toggle('grouped')}>
                  <span className={`sidebar-toggle ${expandedSections.grouped ? 'open' : ''}`}>
                    <ChevronRight size={12} />
                  </span>
                  <span>Grouped by task</span>
                </div>

                {expandedSections.grouped && (
                  <div className="sidebar-children">
                    {workflowTasks.map((task) => (
                      <div
                        key={task.name}
                        className={`sidebar-item ${location.pathname === task.path && task.active ? 'active' : ''}`}
                        onClick={() => navigate(task.path)}
                      >
                        <task.icon size={16} />
                        <span>{task.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="sidebar-item">
              <AlertCircle size={16} />
              <span>Overdue entries</span>
              <span className="count">0</span>
            </div>
            <div className="sidebar-item">
              <Clock size={16} />
              <span>Deadline Messages</span>
              <span className="count">0</span>
            </div>
            <div className="sidebar-item">
              <AlertCircle size={16} />
              <span>Entries with Errors</span>
              <span className="count">0</span>
            </div>
          </div>
        )}

        <div className="sidebar-section-label" style={{ marginTop: '12px' }}>Processing Stages</div>

        <div className="sidebar-item" onClick={() => toggle('stages')}>
          <span className={`sidebar-toggle ${expandedSections.stages ? 'open' : ''}`}>
            <ChevronRight size={12} />
          </span>
          <GitBranch size={16} />
          <span>Workflow Stages</span>
          <span className="count">6</span>
        </div>

        {expandedSections.stages && (
          <div className="sidebar-children">
            {workflowStages.map((stage) => (
              <div
                key={stage.name}
                className={`sidebar-item ${location.pathname.startsWith(stage.path.split('/').slice(0, -1).join('/')) ? 'active' : ''}`}
                onClick={() => navigate(stage.path)}
              >
                <stage.icon size={16} />
                <span>{stage.name}</span>
              </div>
            ))}
          </div>
        )}

        <div className="sidebar-section-label" style={{ marginTop: '12px' }}>Folders</div>

        <div className="sidebar-item">
          <Send size={16} />
          <span>Outbox</span>
        </div>
        <div className="sidebar-item">
          <RotateCcw size={16} />
          <span>Resubmission</span>
        </div>
        <div className="sidebar-item">
          <FolderLock size={16} />
          <span>Private folders</span>
        </div>
        <div className="sidebar-item">
          <Users size={16} />
          <span>Shared folders</span>
        </div>
        <div className="sidebar-item">
          <Bookmark size={16} />
          <span>Subscribed Folders</span>
        </div>
        <div className="sidebar-item">
          <Trash2 size={16} />
          <span>Trash</span>
        </div>
        <div className="sidebar-item">
          <Trash2 size={16} />
          <span>Shared trash</span>
        </div>
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-footer-info">
          <span className="dot"></span>
          <span>System Online</span>
          <span style={{ marginLeft: 'auto', fontFamily: "'JetBrains Mono', monospace" }}>
            Time Zone: INDIA
          </span>
        </div>
      </div>
    </aside>
  );
}
