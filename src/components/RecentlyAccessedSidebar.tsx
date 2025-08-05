
import React, { useContext } from 'react';
import { useRecentlyAccessed } from '../context/RecentlyAccessedContext';
import { IssuesContext } from '../context/IssuesContext';
import { Link } from 'react-router-dom';

export const RecentlyAccessedSidebar: React.FC = () => {
  const { recentIds } = useRecentlyAccessed();
  const { issues } = useContext(IssuesContext);
  const recentIssues = recentIds
    .map(id => issues.find(issue => issue.id === id))
    .filter(Boolean);

  return (
    <aside style={{ width: 260, background: '#f4f6fa', padding: '1rem', borderRight: '1px solid #e0e0e0', minHeight: '100vh' }}>
      <h3 style={{ marginTop: 0 }}>Recently Accessed</h3>
      {recentIssues.length === 0 ? (
        <div style={{ color: '#888' }}>No recent issues</div>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {recentIssues.map(issue => (
            <li key={issue!.id} style={{ marginBottom: 16 }}>
              <Link to={`/issue/${issue!.id}`} style={{ textDecoration: 'none', color: '#333' }}>
                <div style={{ fontWeight: 500 }}>{issue!.title}</div>
                <div style={{ fontSize: 12, color: '#666' }}>{issue!.status} &middot; Severity {issue!.severity}</div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
};