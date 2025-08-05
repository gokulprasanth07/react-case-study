
import React, { useEffect, useContext, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { IssuesContext } from '../context/IssuesContext';
import { UserContext } from '../context/UserContext';
import { useRecentlyAccessed } from '../context/RecentlyAccessedContext';

export const IssueDetailPage = () => {
    const { id } = useParams();
    const { issues, moveIssue } = useContext(IssuesContext);
    const { currentUser } = useContext(UserContext);
    const { addRecent } = useRecentlyAccessed();
    const navigate = useNavigate();
    const [resolving, setResolving] = useState(false);

    const issue = issues.find(issue => issue.id === id);

    useEffect(() => {
        if (id) addRecent(id);
    }, [id, addRecent]);

    if (!issue) {
        return <div style={{ padding: '1rem' }}>Issue not found.</div>;
    }

    const handleResolve = () => {
        setResolving(true);
        moveIssue(issue.id, 'Done');
        setTimeout(() => {
            setResolving(false);
        }, 600);
    };

    return (
        <div style={{ maxWidth: 600, margin: '2rem auto', background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #0001', padding: '2rem' }}>
            <div style={{ marginBottom: 16 }}>
                <Link to="/board" style={{ textDecoration: 'none', color: '#1976d2', fontWeight: 500 }}>&larr; Back to Board</Link>
            </div>
            <h2 style={{ marginTop: 0 }}>{issue.title}</h2>
            <div style={{ color: '#666', marginBottom: 8 }}>ID: {issue.id}</div>
            <div style={{ marginBottom: 12 }}>{issue.description}</div>
            <div style={{ marginBottom: 8 }}><b>Status:</b> {issue.status}</div>
            <div style={{ marginBottom: 8 }}><b>Severity:</b> {issue.severity}</div>
            <div style={{ marginBottom: 8 }}><b>Assignee:</b> {issue.assignee}</div>
            <div style={{ marginBottom: 8 }}><b>Tags:</b> {issue.tags && issue.tags.length > 0 ? issue.tags.join(', ') : 'None'}</div>
            <div style={{ marginBottom: 16 }}><b>Created At:</b> {new Date(issue.createdAt).toLocaleString()}</div>
            {currentUser.role === 'admin' && issue.status !== 'Done' && (
                <button
                    onClick={handleResolve}
                    disabled={resolving}
                    style={{
                        background: '#1976d2',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 4,
                        padding: '0.5rem 1.5rem',
                        fontSize: 16,
                        cursor: resolving ? 'not-allowed' : 'pointer',
                        opacity: resolving ? 0.7 : 1
                    }}
                >
                    {resolving ? 'Marking as Resolved...' : 'Mark as Resolved'}
                </button>
            )}
            {currentUser.role !== 'admin' && (
                <div style={{ color: '#888', marginTop: 16 }}><i>Read-only view (contributor)</i></div>
            )}
        </div>
    );
};
