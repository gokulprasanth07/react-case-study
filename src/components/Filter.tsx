import React, { useContext, useState, useMemo } from 'react';
import { IssuesContext } from '../context/IssuesContext';


interface FilterProps {
  onFilter: (filters: { assignee: string; severity: number | null; search: string }) => void;
}

export const Filter: React.FC<FilterProps> = ({ onFilter }) => {
  const { issues } = useContext(IssuesContext);
  const [assignee, setAssignee] = useState('');
  const [severity, setSeverity] = useState<number | ''>('');
  const [search, setSearch] = useState('');

  // Get unique assignees from issues
  const assignees = useMemo(() => {
    const set = new Set<string>();
    issues.forEach(issue => {
      if (issue.assignee) set.add(issue.assignee);
    });
    return Array.from(set);
  }, [issues]);

  // Call onFilter on every change for live search
  React.useEffect(() => {
    onFilter({ assignee, severity: severity === '' ? null : Number(severity), search });
    // eslint-disable-next-line
  }, [assignee, severity, search]);
  return (
    <div className="filter-bar" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: 16, padding: '0.7rem 1.2rem', borderRadius: 8, background: 'var(--filter-bg, #f4f6fa)', boxShadow: '0 1px 4px #0001' }}>
      <input
        type="text"
        placeholder="Search by title or tags..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ padding: '0.45rem 0.9rem', borderRadius: 8, border: '1.5px solid #bbb', minWidth: 200, fontSize: 15, background: 'var(--input-bg, #fff)', color: 'inherit' }}
      />
      <div style={{ display: 'flex', gap: '1.2rem' }}>
        <label style={{ fontWeight: 500, fontSize: 15, color: 'var(--filter-label, #222)', marginRight: 4, display: 'flex', alignItems: 'center' }}>
          Assignee:
          <select
            value={assignee}
            onChange={e => setAssignee(e.target.value)}
            style={{ marginLeft: 6, padding: '0.35rem 1.1rem', borderRadius: 8, border: '1.5px solid #bbb', minWidth: 90, fontSize: 15, background: 'var(--input-bg, #fff)', color: 'inherit' }}
          >
            <option value="">All</option>
            {assignees.map(a => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </label>
        <label style={{ fontWeight: 500, fontSize: 15, color: 'var(--filter-label, #222)', marginRight: 4, display: 'flex', alignItems: 'center' }}>
          Severity:
          <select
            value={severity}
            onChange={e => setSeverity(e.target.value === '' ? '' : Number(e.target.value))}
            style={{ marginLeft: 6, padding: '0.35rem 1.1rem', borderRadius: 8, border: '1.5px solid #bbb', minWidth: 90, fontSize: 15, background: 'var(--input-bg, #fff)', color: 'inherit' }}
          >
            <option value="">All</option>
            {[1, 2, 3, 4, 5].map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
};
