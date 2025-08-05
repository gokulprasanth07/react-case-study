import React, { useEffect } from 'react';
import { Issue } from '../types';

interface IssueModalProps {
  issue: Issue;
  onClose: () => void;
  onResolve?: () => void;
  canResolve?: boolean;
  resolving?: boolean;
}

export const IssueModal: React.FC<IssueModalProps> = ({ issue, onClose, onResolve, canResolve, resolving }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(0,0,0,0.25)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{
        background: '#fff', borderRadius: 8, boxShadow: '0 2px 16px #0002', padding: '2rem', minWidth: 400, maxWidth: 600, position: 'relative'
      }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 12, right: 12, background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#888' }} aria-label="Close">&times;</button>
        <h2 style={{ marginTop: 0 }}>{issue.title}</h2>
        <div style={{ color: '#666', marginBottom: 8 }}>ID: {issue.id}</div>
        <div style={{ marginBottom: 12 }}>{issue.description}</div>
        <div style={{ marginBottom: 8 }}><b>Status:</b> {issue.status}</div>
        <div style={{ marginBottom: 8 }}><b>Severity:</b> {issue.severity}</div>
        <div style={{ marginBottom: 8 }}><b>Assignee:</b> {issue.assignee}</div>
        <div style={{ marginBottom: 8 }}><b>Tags:</b> {issue.tags && issue.tags.length > 0 ? issue.tags.join(', ') : 'None'}</div>
        <div style={{ marginBottom: 16 }}><b>Created At:</b> {new Date(issue.createdAt).toLocaleString()}</div>
        {canResolve && issue.status !== 'Done' && (
          <button
            onClick={onResolve}
            disabled={resolving}
            style={{
              background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4,
              padding: '0.5rem 1.5rem', fontSize: 16, cursor: resolving ? 'not-allowed' : 'pointer', opacity: resolving ? 0.7 : 1
            }}
          >
            {resolving ? 'Marking as Resolved...' : 'Mark as Resolved'}
          </button>
        )}
      </div>
    </div>
  );
};
