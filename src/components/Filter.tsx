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
    <div className="filter-bar" style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: 16 }}>
      <input
        type="text"
        placeholder="Search by title or tags..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ padding: '0.4rem 0.7rem', borderRadius: 6, border: '1px solid #ccc', minWidth: 180 }}
      />
      <label>
        Assignee:
        <select value={assignee} onChange={e => setAssignee(e.target.value)}>
          <option value="">All</option>
          {assignees.map(a => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
      </label>
      <label>
        Severity:
        <select value={severity} onChange={e => setSeverity(e.target.value === '' ? '' : Number(e.target.value))}>
          <option value="">All</option>
          {[1,2,3,4,5].map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </label>
    </div>
  );
};
