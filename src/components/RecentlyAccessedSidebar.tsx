
import React, { useContext } from 'react';
import { useRecentlyAccessed } from '../context/RecentlyAccessedContext';
import { IssuesContext } from '../context/IssuesContext';
import { useNavigate } from 'react-router-dom';

export const RecentlyAccessedSidebar: React.FC = () => {
  const { recentIds } = useRecentlyAccessed();
  const { issues } = useContext(IssuesContext);
  const recentIssues = recentIds
    .map(id => issues.find(issue => issue.id === id))
    .filter(Boolean);

  const navigate = useNavigate();
  return (
    <aside style={{ width: 260, background: '#f4f6fa', padding: '1rem', borderRight: '1px solid #e0e0e0', minHeight: '100vh' }}>
      <h3 style={{ marginTop: 0 }}>Recently Accessed</h3>
      {recentIssues.length === 0 ? (
        <div style={{ color: '#888' }}>No recent issues</div>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {recentIssues.map(issue => (
            <li key={issue!.id} style={{ marginBottom: 16 }}>
              <div
                style={{ textDecoration: 'none', color: '#333', cursor: 'pointer' }}
                onClick={() => navigate(`/issue/${issue!.id}`)}
                tabIndex={0}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') navigate(`/issue/${issue!.id}`); }}
                role="button"
                aria-label={`Go to issue ${issue!.title}`}
              >
                <div style={{ fontWeight: 500 }}>{issue!.title}</div>
                <div style={{ fontSize: 12, color: '#666' }}>{issue!.status} &middot; Severity {issue!.severity}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
};