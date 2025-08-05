import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Issue } from '../types';
import issuesData from '../data/issues.json';


interface IssuesContextType {
  issues: Issue[];
  moveIssue: (id: string, newStatus: Issue['status']) => void;
  loading: boolean;
  error: string | null;
}

export const IssuesContext = createContext<IssuesContextType>({
  issues: [],
  moveIssue: () => {},
  loading: false,
  error: null,
});

export const IssuesProvider = ({ children }: { children: ReactNode }) => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      // Add userDefinedRank to each issue for demo
      const demoIssues = (issuesData as any[]).map((issue, idx) => ({
        ...issue,
        description: issue.description || 'No description provided.',
        userDefinedRank: typeof issue.userDefinedRank === 'number' ? issue.userDefinedRank : idx
      }));
      setIssues(demoIssues);
      setLoading(false);
    }, 500);
  }, []);

  const moveIssue = (id: string, newStatus: Issue['status']) => {
    setIssues(prev => prev.map(issue => issue.id === id ? { ...issue, status: newStatus } : issue));
    // TODO: Replace with real API call
    setTimeout(() => {}, 500);
  };

  return (
    <IssuesContext.Provider value={{ issues, moveIssue, loading, error }}>
      {children}
    </IssuesContext.Provider>
  );
};
