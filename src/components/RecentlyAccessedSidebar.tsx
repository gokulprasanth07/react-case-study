
import React, { useContext } from 'react';
import { useRecentlyAccessed } from '../context/RecentlyAccessedContext';
import { IssuesContext } from '../context/IssuesContext';
import { useNavigate } from 'react-router-dom';
import './RecentlyAccessedSidebar.css';

export const RecentlyAccessedSidebar: React.FC = () => {
  const { recentIds } = useRecentlyAccessed();
  const { issues } = useContext(IssuesContext);
  const recentIssues = recentIds
    .map(id => issues.find(issue => issue.id === id))
    .filter(Boolean);

  const navigate = useNavigate();
  return (
    <aside className="recently-accessed-sidebar">
      <h3 className="recently-accessed-title">Recently Accessed</h3>
      {recentIssues.length === 0 ? (
        <div className="recently-accessed-empty">No recent issues</div>
      ) : (
        <ul className="recently-accessed-list">
          {recentIssues.map(issue => (
            <li key={issue!.id} className="recently-accessed-item">
              <div
                className="recently-accessed-link"
                onClick={() => navigate(`/issue/${issue!.id}`)}
                tabIndex={0}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') navigate(`/issue/${issue!.id}`); }}
                role="button"
                aria-label={`Go to issue ${issue!.title}`}
              >
                <div className="recently-accessed-issue-title">{issue!.title}</div>
                <div className="recently-accessed-issue-meta">{issue!.status} &middot; Severity {issue!.severity}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
};